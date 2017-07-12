#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2011-11-08 21:39:19 
* 文件名：Activity 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.Utils;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoIBLL.IActivity;
using WanerDao2.WanerDaoModel.Activity.Common;
using WanerDao2.WanerDaoModel.Activity;
using System.Data.Common;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoModule.ExtensionObject;
using WanerDao2.WanerDaoModel.Activity.ActivityCreate;
using Newtonsoft.Json;
using WanerDao2.WanerDaoModule.Config;
using WanerDao2.WanerDaoBLL.Person;
using WanerDao2.WanerDaoModel.Activity.ActivitySignUp;
using WanerDao2.WanerDaoBLL.Common;
using System.Collections;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoCacheManager;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoModel.Activity.ActivitySetting;
using WanerDao2.WanerDaoModel.Activity.ActivityManage;
using WanerDao2.WanerDaoModel.Activity.ActivityBase;
using WanerDao2.WanerDaoModule.Validation;
using System.Xml;
using System.Net;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoComponent;
using WanerDao2.WanerDaoBLL.Relation;
using WanerDao2.WanerDaoModel.Activity.ActivitySearch;
using WanerDao2.WanerDaoModule.GoogleMap;
using WanerDao2.WanerDaoIBLL.IFollow;
using WanerDao2.WanerDaoBLL.Follow;
using WanerDao2.WanerDaoModule.Weather;
using WanerDao2.WanerDaoIBLL.IMessage;
using WanerDao2.WanerDaoBLL.Message;
using WanerDao2.WanerDaoIBLL.ICommon;
using GMap.NET;
using GMap.NET.MapProviders;

namespace WanerDao2.WanerDaoBLL.Activity
{
    public class WanerDaoActivity:IWanerDaoActivity
    {

        public WanerDaoDbWrapper DBAccess;
        public readonly static string ActivityConfigName = "ActivitySQL";
        public static object objLock = new object();

        private static ICacheStrategy ics = WanerDaoCacheFactory.SingleInstance().GetStrategy(CacheType.CacheHashtable);
        private IWanerDaoCommon common;
      
        #region 缓存键名
        private readonly static string key_ActivityPlaceCategoryName="key_ActivityPlaceCategoryName";
        private readonly static string key_ActivityCategorySettingsName = "key_ActivityCategorySettingsName";
        #endregion

        public WanerDaoActivity()
        {
            DBAccess = DbHelperFactory.SingleInstance();
            common = new WanerdaoCommon();
        }

        #region 活动查询
        /// <summary>
        /// 描述：通过活动ID获取某活动的详细信息
        /// 作者:徐兵
        /// 时间：2011-10-22
        /// </summary>
        /// <param name="dic">里面包含这些元素：id
        /// </param>
        /// <returns>JSON格式的数据{msg:活动信息}</returns>
        public string WanerDaoGetActivityDetailsInfoByID(Dictionary<string, object> dic)
        {
            DataSet ds = DBAccess.GetDataSet(ActivityConfigName, "SearchActivityDetailsInfoByID", dic);
            string json = string.Empty;
            Dictionary<string, object> result = new Dictionary<string, object>();
            if (ds != null)
            {
                if (ds.Tables.Count > 0 && ds.Tables[0] != null && ds.Tables[0].Rows.Count>0)
                {
                    DataRow dr = ds.Tables[0].Rows[0];
                    foreach (DataColumn dc in ds.Tables[0].Columns)
                    {
                        result.Add(dc.ColumnName, dr[dc.ColumnName]);
                    }
                    json = WanerDaoJSON.GetSuccessJson(result);
                }
                else
                {
                    json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NotFindANotFindActivityParamsctivity"));
                }
            }
            else
            {
                json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NotFindANotFindActivityParamsctivity"));
            }
            return json;
        }
        /// <summary>
        /// 根据指定的日期查询每日活动数目
        /// </summary>
        /// <param name="beginDate"></param>
        /// <param name="lenth"></param>
        /// <returns></returns>
        public string SelectActivityCountByDate(DateTime beginDate, int length)
        {
            beginDate = beginDate.Date;
            DateTime endDate = beginDate.AddDays(length);
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("begindatetime", beginDate);
            _dic.Add("enddatetime", endDate);
            _dic.Add("user_id", GetCurrentUserID());
            DataTable _dt=GetDataTable(_dic, "SelectActivityCountByDate", false);
            int[] _countList = new int[length];
            if (_dt != null && _dt.Rows.Count > 0)
            {
                for (int _index = 0; _index < length; _index++)
                {
                    DataRow[] _drs = _dt.Select("date='" + beginDate.AddDays(_index).ToShortDateString() + "'");
                    if (_drs != null && _drs.Length > 0)
                    {
                        _countList[_index] =int.Parse( _drs[0]["count"].ToString());
                    }
                }
            }
            return ReturnResultMessage(_countList);
        }
        /// <summary>
        /// 返回指定数量最新、距离最近的活动
        /// </summary>
        /// <param name="count"></param>
        /// <returns></returns>
        public string GetNewestAndNearestActivity(int count)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("count", count);
            _dic.Add("userid", GetCurrentUserID());
            return GetDataJosn(_dic, "GetNewestAndNearestActivity", false);
        }

        #endregion

        #region 活动地图
        /// <summary>
        /// 地图活动查找（2012-11-24 徐蓓修改）
        /// </summary>
        /// <param name="search">查找参数</param>
        /// <returns></returns>
        public string SearchActivityMap(MapSearch search)
        {
            //离家距离
            string distance = string.Empty;
            if (search.FromHomeDistance > 0)
                distance = " and f_GetDistance(" + search.CurrLatLng.Lng + "," + search.CurrLatLng.Lat + ",a.lng,a.lat)<=" + search.FromHomeDistance / 1000;

            //分类
            string category = string.Empty;
            if (!string.IsNullOrEmpty(search.Category))
                category = " and exists (select 1 from activitycategory c where c.active=1 and a.id=c.activity_id and FIND_IN_SET(c.category_id,'" + search.Category + "')>0)";
            
            //过滤去过的地方
            string beenPlace = string.Empty;
            if (search.FilterBeenPlace)
                beenPlace = " and not exists (select 1 from activity b,activitymember m where b.active=1 and m.active=1 and b.id=m.activity_id and user_id='" + search.UserId + "'  and a.address=b.address)";

            //好友
            string friend = string.Empty;
            if (search.AllFriendAttend)//选择了所有好友或者自定义好友为空
                friend = "exists (select 1 from ActivityMember am,personalfriends f where am.active=1 and f.active=1 and am.activity_id= a.id and (am.user_id=f.relation_from_id and f.relation_to_id='" + search.UserId + "') or (am.user_id=f.relation_to_id and f.relation_from_id='" + search.UserId + "') ) ";
            else if(!string.IsNullOrEmpty(search.FriendAttend))
                friend = "exists (select 1 from activitymember m where m.active=1 and a.id=m.activity_id and FIND_IN_SET(m.user_id,'" + search.FriendAttend + "')>0)";

            //圈子
            string group = string.Empty;
            if (search.AllGroupAttend)//选择了所有圈子或者自定义圈子为空
                group = "a.create_type_id='02fbb8fc-599c-11e1-9350-101f74b66417' and exists (select 1 from groupmember gm where gm.active=1 and gm.user_id='" + GetCurrentUserID() + "' and a.create_id=gm.group_id)";
            else if (!string.IsNullOrEmpty(search.GroupAttend))
                group = "a.create_type_id='02fbb8fc-599c-11e1-9350-101f74b66417' and FIND_IN_SET(a.create_id,'" + search.GroupAttend + "')>0 ";

            //剩下的或关系的查询条件
            string unite = string.Empty;
            if (string.IsNullOrEmpty(friend))
            {
                if (!string.IsNullOrEmpty(group))
                    unite = " and (" + group + ")";
            }
            else
            {
                if (!string.IsNullOrEmpty(group))
                    unite = " and ((" + friend + ") or (" + group + "))";
                else
                    unite = " and (" + friend + ")";
            }

            int pageCurrent = 1;
            int pageSize = 10;

            string baseWhere = "a.active=1 and a.is_create=1 and a.is_visible=1 and  f_JudgeCanSignUpActivity(a.id,'" + search.UserId + "')=1";
            string where = baseWhere + " " + distance + " " + category + " " + beenPlace + " " + unite;

            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("tableName", "activity a");
            param.Add("fldName", "a.id as activityId,a.activity_name as activityName,a.address as activityAddress,CONCAT(a.lat,',',a.lng) as latLng");
            param.Add("where", string.Format(" and {0} ", where));
            param.Add("fldSortId", "a.activity_name");
            param.Add("sort", 1);
            param.Add("pageCurrent", pageCurrent);
            param.Add("pageSize", pageSize);
            string result = common.WanerDaoPagination(param);

            return result;
        }

        //public void GetMapDataTable(DataTable table,place address,double route)
        //{
        //    if (table == null || table.Rows.Count < 1)
        //    {
        //        return;
        //    }
        //    string _errrorMsg=string.Empty;
            
        //    if (address==null)
        //    {
        //        return;
        //    }
        //    MapPoint _homePoint = new MapPoint
        //    {
        //        Lat = address.lat,
        //        Lng = address.Lng
        //    };
        //    List<DataRow> _removeRows = new List<DataRow>();
        //    foreach (DataRow _dr in table.Rows)
        //    {
        //        MapPoint? _rowPoint= MapHelper.GetMapPoint(_dr["activityAddress"].ToString());
        //        if (!_rowPoint.HasValue)
        //        {
        //            _removeRows.Add(_dr);
        //            continue;
        //        }
        //        if (!GetIsMapRange(_homePoint, _rowPoint.Value, route))
        //        {
        //            _removeRows.Add(_dr);
        //            continue;
        //        }
        //        _dr["latLng"] = _rowPoint.Value.Lat + ":" + _rowPoint.Value.Lng;
        //    }
        //    foreach (DataRow _dr in _removeRows)
        //    {
        //        table.Rows.Remove(_dr);
        //    }

        //}
        //private bool GetIsMapRange(MapPoint pointA, MapPoint pointB, double range)
        //{
        //    double? _route = MapHelper.DistanceOfTwoPoints(pointA, pointB);
        //    if (!_route.HasValue)
        //        return false;
        //    return range >= _route.Value;
        //}
        #endregion

        #region 对应页面查询的方法

        public string GetActivityIndexPage(Dictionary<string, object> dic)
        {
            string pageJson = string.Empty;

            dic.Add("user_id", GetCurrentUserID());
            Dictionary<string, object> activityDic = this.GetDicFirstRowFromDataTable("SearchActivityMainInfoByID", dic);
            if (activityDic != null && activityDic.Count > 0)
            {
                string activity_id = dic["id"].ToString();
                List<Dictionary<string, object>> planDic = this.GetDictionary("activity_id", activity_id, "SelectActivityPlanByActivityID");
                activityDic.Add("ActivityPlan", planDic);

                List<Dictionary<string, object>> budgetDic = this.GetDictionary("activity_id", activity_id, "SelectActivityBudgetByActivityID");
                activityDic.Add("ActivityBudget", budgetDic);

                List<ActivityPayMethods> _payList=this.SelectActivityPayMethodsByActivityID(activity_id);

                if (_payList != null && _payList.Count > 0)
                {
                    var _varPayList = from _item in _payList
                                      where _item != null
                                      group _item by _item.pay_type_id into g
                                      where g!=null
                                      select new { pay_type_id = g.First().pay_type_id, g.First().pay_type_name };
                    activityDic.Add("PayMethods", _varPayList);
                }
                else
                {
                    activityDic.Add("PayMethods", null);
                }
                

                List<activityjoinconditions> _conditions = this.SelectActivityJoinconditionsByActivityID(activity_id);
                object _objCon = null;
                if (_conditions != null && _conditions.Count > 0)
                {
                    var _varC = from _item in _conditions
                                where _item != null
                                select new { name = _item.condition_name, value = _item.value };
                    _objCon= _varC;
                }
                activityDic.Add("JoinConditions", _objCon);
                activityDic.Add("language_id", LanguageGuid);
                activityDic.Add("rootimgpath", WannerDaoImageAndFolderManage.GetWebRootImagePath());

                pageJson = ReturnResultMessage(activityDic);
            }
            else
            {
                pageJson = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NotFindActivity"));
            }

            //DbHelperFactory.SingleInstance().GetDataTable("","",null);

            return pageJson;
        }

        /// <summary>
        ///查找活动预算
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string SearchActivityBudgetbyActivityid(Dictionary<string, object> dic)
        {
            string json = "";
            string activity_id = dic["id"].ToString();
            Dictionary<string, object> activityDic = new Dictionary<string, object>();
            List<Dictionary<string, object>> budgetDic = this.GetDictionary("activity_id", activity_id, "SelectActivityBudgetByActivityID");
            activityDic.Add("ActivityBudget", budgetDic);
            json = WanerDaoJSON.GetSuccessJson(activityDic);
            return json;
        }
        /// <summary>
        /// 获取活动分类活动数（近期活动，开放活动）
        /// 作者：王渝友  日期：2012-2-26
        /// update by xubing at 2012-5-13
        /// </summary>
        /// <param name="id"> </param>
        /// <returns></returns>
        public string GetActivityDefineTotalPage(string id)
        {
            activitysectionpage asp = SelectActivitySectionPageByID(id);
            if (asp == null)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NoDataInfoCn"));
            }
            Dictionary<string, object> _DBdic = new Dictionary<string, object>();
            _DBdic.Add("sectionpageid", asp.category_id);
            _DBdic.Add("user_id", GetCurrentUserID());

            Dictionary<string, string> _replaceDic = new Dictionary<string, string>();
            _replaceDic.Add("?section_type", asp.section_type_id.ToString());
            DataTable dt= DBAccess.GetDataTable(ActivityConfigName, "SelectActivityCategoryActivityCount", _replaceDic, _DBdic);
            if (dt == null || dt.Rows.Count < 1)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NoDataInfoCn"));
            }
            dt.Rows[0]["name"] = asp.section_name;
            dt.Rows[0]["logo_path"] = WannerDaoImageAndFolderManage.GetWebRootImagePath() + asp.logo_path;
            return ReturnResultMessage(dt);

             //Dictionary<string, object> activityDic = new Dictionary<string, object>();
             //IEnumerator ie = dic.Keys.GetEnumerator();
             //string sqlFiletext = "SelectActivityCategoryActivityCount";
             //while (ie.MoveNext())
             //{
               
             //    string currentKey = ie.Current.ToString().ToLower();
             //    if (currentKey == "type")
             //    {
             //        string currentValue = dic[ie.Current.ToString()].ToString().ToLower();
             //        if (currentValue.Equals("3"))
             //        {
             //            sqlFiletext = "SelectActivityCategoryActivityCount2"; break;
             //        }
             //    }
             //}
             //activityDic = this.GetDicFirstRowFromDataTable(sqlFiletext, dic);
             //string json = "";
             //if (activityDic != null && activityDic.Count > 0)
             //{
             //     activityDic.Add("rootimgpath", WannerDaoImageAndFolderManage.GetWebRootImagePath());
             //     json = WanerDaoJSON.GetSuccessJson(activityDic);
             //}
             //else
             //{
             //    json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn"));
             //}
             //return json;

        }

        #endregion 

        #region 活动
        //活动 简单值
        public string GetKeyValueActivityParamByUserID()
        {
            int _max = 6;

            int.TryParse(WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoMaxActivityShowParamCount").Trim(), out _max);
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("limitmax", _max);
            string original_id = GetCurrentUserID();
            dic.Add("user_id", original_id);

            IList<activity> list = DBAccess.GetGenericModel<activity>(ActivityConfigName, "GetKeyValueActivityParamByUserID", dic) as List<activity>;            
            if (list != null)
            {
                var value = from item in list
                            where item != null
                            select new { id = item.id, value = item.activity_name };
                return ReturnResultMessage(value);
            }
            else
            {
                return ReturnResultMessage(null);
            }
        }
        public string GetActivityParamByPersonActivityarchivesID(string personActivityarchivesId)
        {
            personalactivityarchives item = SelectPersonalActivityArchivesByID(personActivityarchivesId);
            if (item == null)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NotFindANotFindActivityParamsctivity"));
            }
            return GetActivityParamByActivityID(item.activity_id);
        }
        public string GetActivityParamByActivityID(string activityId)
        {
            string strJson = string.Empty;
            activity activity = this.GetModel<activity>(activityId, "GetActivityParamByActivityID");
            if (activity == null)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NotFindActivity"));
            }
            ActivityCreateMain activityCreateMain = GetActivityCreateMain(activity);
            activityCreateMain.activityschedule = GetActivitySchedule(activity);
            activityCreateMain.plan = GetPlans(activity);
            activityCreateMain.activitytags = GetActivitytags(activity);
            activityCreateMain.budget = Getbudgets(activity);
            activityCreateMain.limitcondition = Getlimitconditions(activity.id);
            activityCreateMain.vehicletype = GetVehicletype(activity.id);
            activityCreateMain.paymethodsinfo = Getpaymethods(activity.id, GetCurrentUserID());
            strJson = ReturnResultMessage(activityCreateMain);
            return strJson;
        }
        /// <summary>
        /// 效验授权
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string CheckAuthorization(Dictionary<string, object> dic)
        {
            string jsonResult = string.Empty;
            DataSet ds = DBAccess.GetDataSet("ActivitySQL", "CheckAuthorization", dic);
            if (ds.Tables[0].Rows.Count>0)
            {
                jsonResult = WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("CheckAuthorizationSuccess")); 
            } 
            else
            {
                jsonResult = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("CheckAuthorizationFail")); 
            }
            return jsonResult;
        }
        /// <summary>
        /// 活动创建
        /// </summary>
        /// <param name="activityCreateMain"></param>
        /// <returns></returns>
        public string AddActivity(ActivityCreateMain activityCreateMain)
        {
            //获取活动ID
            string jsonResult = string.Empty;
            if (activityCreateMain == null)
            {
                return RtnCreateActiviyErrorMessage(WanerDaoGlobalTip.GetInternationalizationTip("InformationIsIncomplete"));
            }
            activityCreateMain.activityid = WanerDaoGuid.GetGuid();
            string message = string.Empty;

            List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();
            
            //活动基础参数
            activity activity = GetActivity(activityCreateMain, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }

            //由于时间紧迫，为了保证解析地址的功能不影响活动创建，故先用try catch包裹。
            try
            {
                //根据活动地址解析出经纬度（2012-11-26 徐蓓添加）
                GeoCoderStatusCode status = GeoCoderStatusCode.Unknow;
                PointLatLng? latLngFromGeocoder = GMapProviders.GoogleMap.GetPoint(activity.address, out status);
                if (latLngFromGeocoder != null && latLngFromGeocoder.HasValue && status == GeoCoderStatusCode.G_GEO_SUCCESS)
                {
                    PointLatLng latLng = latLngFromGeocoder.Value;
                    if (latLng != null)
                    {
                        activity.lat = latLng.Lat;
                        activity.lng = latLng.Lng;
                    }
                    else
                        WriteGeoLog("google解析地址错误，地址详情为：" + activity.address);
                }
                else
                    WriteGeoLog("google解析地址错误，地址详情为：" + activity.address);
            }
            catch (Exception ex)
            {
                WriteGeoLog("google解析地址错误，地址详情为：" + activity.address + ",错误原因为：" + ex.Message);
            }

            listSqlParam.Add(GetInsertActivity(activity));

            //活动周期
            List<personalactivityschedule> _personalactivityschedules = GetPersonalActivitySchedule(activityCreateMain, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            listSqlParam.AddRange(GetInsertPersonalActivitySchedule(_personalactivityschedules));
            //活动参数保存
            personalactivityarchives personalactivityarchives = GetPersonalactivityarchives(activityCreateMain, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            listSqlParam.Add(GetInsertPersonalActivityArchives(personalactivityarchives));
            
            //活动计划
            List<activityplan> listPlan = GetActivityplan(activityCreateMain, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            listSqlParam.AddRange(GetInsertActivityPlan(listPlan));

            //活动财务
            List<activitybudget> listBudget = GetActivityBudget(activityCreateMain, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            listSqlParam.AddRange(GetInsertActivityBudget(listBudget));
            //活动分类
            List<activitycategory> listCategory = GetActivityCategory(activityCreateMain.activitytags,activityCreateMain.activityid, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            listSqlParam.AddRange(GetInsertActivityCategory(listCategory));
            //活动加入条件
            List<activityjoinconditions> listJoinConditong = GetActivityjoinconditions(activityCreateMain, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            listSqlParam.AddRange(GetInsertActivityJoinConditions(listJoinConditong));
            //活动付费
            List<ActivityPayMethods> listPayMet = GetActivityPayMethods(activityCreateMain.paymethodsinfo, activityCreateMain.activityid,GetCurrentUserID(), ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            listSqlParam.AddRange(GetInsertActivityPayMethods(listPayMet));
            //活动成员加入
            activitymember member = GetActivitymember(activityCreateMain, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            listSqlParam.Add(GetInsertActivityMember(member));

            //用户加入记录
            ActivityJoinInfo _joinMode = new ActivityJoinInfo
            {
                activity_id = activityCreateMain.activityid,
                flag = 1,
                update_date = DateTime.Now,
                user_id = GetCurrentUserID()
            };
            listSqlParam.Add(GetInsertActivityJoinInfo(_joinMode));

            //添加超级管理员角色
            listSqlParam.AddRange(GetAddMemberAdminRole(member));
            //更新活动增加人数
            listSqlParam.Add(GetUpdateActivityJoinMemberNbr(activity.id,1));
            bool isSuccess = false;
            //活动邀请
            if (activityCreateMain.invite!=null)
            {
                isSuccess = SendActivityInviter(activityCreateMain.invite, activity.id);
                if (!isSuccess)
                {
                    return jsonResult = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("ActivityCreateFail")); 
                }                
            }             
            isSuccess= this.CommonTransExecuteNonQuery(listSqlParam);
            if (isSuccess)
            {
                try
                {
                    WanerDaoExperience.heldActivityAdd(activity.original_id);
                    WanerDaoExperience.createActivityScoreAdd(activity.original_id, activity.id);
                    if (activity.create_type_id.Contains("|"))
                    {
                        WanerDaoExperience.groupCreateActivityScoreAdd(activity.create_id);
                    }
                    ActivityImageFolderModel imageFolder = new ActivityImageFolderModel();
                    imageFolder.id = WanerDaoGuid.GetGuid();
                    imageFolder.user_id = GetCurrentUserID();
                    imageFolder.activity_id = activityCreateMain.activityid;
                    imageFolder.folder_name = WanerDaoGlobalTip.GetInternationalizationTip("defaultblbum");
                    imageFolder.is_system = true;
                    imageFolder.is_block = false;
                    string ab = string.Empty;
                    if (!WanerdaoCommon.CreateActivityImageFolder(imageFolder, ref ab))
                    {
                        return jsonResult = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("PhotoAlbumCreateFail"));                        
                    }
                    IWanerDaoPersonalCalendar cal = new WanerDaoPersonalCalendar();
                    PersonalCalendarModal pc = new PersonalCalendarModal();
                    pc.record_event = activity.activity_name;
                    pc.begin_date = activity.begin_datetime;
                    pc.end_date = activity.end_datetime;
                    pc.user_id = imageFolder.user_id;
                    cal.CreateSimplePersonalCalendar(pc);
                }
                catch (Exception ex)
                {
                    return jsonResult = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("activityScoreFail")); 
                }
                return jsonResult = WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("ActivityCreateSuccess"));
            }
            else
            {
                return jsonResult = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("ActivityCreateFail")); 
            }
        }

        /// <summary>
        /// 记录地址解析的日志（2012-11-26 徐蓓添加）
        /// </summary>
        /// <param name="msg">日志信息</param>
        private void WriteGeoLog(string msg)
        { 
            
        }
        public bool AddSimpleActivity(activity activity)
        {
            return CommonExecuteNonQuery(GetInsertActivity(activity));
        }
        public activity SearchActivityByID(string id)
        {
            return GetModel<activity>(id, "SearchActivityByID");
        }
        public bool AddSimpleActivityMember(activitymember activityMember)
        {
            return CommonExecuteNonQuery(GetInsertActivityMember(activityMember));
        }

        #region KeyValuePair
        /// <summary>
        /// 获取活动创建执行语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertActivity(activity activity)
        {
            InitNameOfActivity(activity);
            return DBAccess.GetNonQueryDBParamBasedOnSql<activity>(ActivityConfigName, "InsertActivity", activity);
        }
        /// <summary>
        /// 获取活动创建执行语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetUpdateActivity(activity activity)
        {
            InitNameOfActivity(activity);
            return DBAccess.GetNonQueryDBParamBasedOnSql<activity>(ActivityConfigName, "UpdateActivity", activity);
        }
        /// <summary>
        /// 获取活动创建执行语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetDeleteActivity(string id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            return DBAccess.GetNonQueryDBParamBasedOnSql(ActivityConfigName, "DeleteActivity", dic);
        }
        /// <summary>
        /// 获取活动创建执行语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetUpdateActivityJoinMemberNbr(string id, int changeCount)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            dic.Add("changecount", changeCount);
            return DBAccess.GetNonQueryDBParamBasedOnSql(ActivityConfigName, "UpdateActivityJoinMemberNbr", dic);
        }
        private void InitNameOfActivity(activity activity)
        {
            if (activity == null)
            {
                return;
            }
            if (string.IsNullOrEmpty(activity.id))
            {
                activity.id = WanerDaoGuid.GetGuid();
            }
            if (string.IsNullOrEmpty(activity.apply_type_name))
            {
                activity.apply_type_name = SelectSignUpTypeNameById(activity.apply_type_id);
            }
        }

        #endregion

        #endregion

        #region 活动邀请
        /// <summary>
        /// 发送活动邀请
        /// </summary>
        /// <param name="_invite"></param>
        /// <param name="_activity_id"></param>
        /// <returns></returns>
        private bool SendActivityInviter(invite _invite,string _activity_id)
        {
            bool flg = false;
            IWanerDaoMessage inviteMsg = new WanerDaoMessage();
            if (_invite.isallfriend)
            {
                ActivityInvite ainvite1 = new ActivityInvite() { InviteUrl = "http://www.savorboard.com/activity/activity_index.html?id=" + _activity_id, FromUserId = GetCurrentUserID(), Range = SendRange.All, Type = InviteType.Friend };
                flg=inviteMsg.InviteActivityMessage(ainvite1);
                if (!flg)
                {
                    return flg;
                }
            }
            if (!_invite.isallfriend)
            {
                string[] frieds = _invite.friendinvite.Select(i => i.id).ToArray<string>();
                ActivityInvite ainvite2 = new ActivityInvite() { InviteUrl = "http://www.savorboard.com/activity/activity_index.html?id=" + _activity_id, FromUserId = GetCurrentUserID(), Range = SendRange.Part, Type = InviteType.Friend, ToFriend = frieds };
                flg = inviteMsg.InviteActivityMessage(ainvite2);
                if (!flg)
                {
                    return flg;
                }
            }
            if (_invite.isallgroup)
            {
                ActivityInvite ainvite3 = new ActivityInvite() { InviteUrl = "http://www.savorboard.com/activity/activity_index.html?id=" + _activity_id, FromUserId = GetCurrentUserID(), Range = SendRange.All, Type = InviteType.Group };
                flg = inviteMsg.InviteActivityMessage(ainvite3);
                if (!flg)
                {
                    return flg;
                }
            }
            if (!_invite.isallgroup)
            {
                string[] groups = _invite.groupinvite.Select(i => i.id).ToArray<string>();
                ActivityInvite ainvite = new ActivityInvite() { InviteUrl = "http://www.savorboard.com/activity/activity_index.html?id=" + _activity_id, FromUserId = GetCurrentUserID(), Range = SendRange.Part, Type = InviteType.Group, ToGroup = groups };
                flg = inviteMsg.InviteActivityMessage(ainvite);
                if (!flg)
                {
                    return flg;
                }
            }
            return flg;
        }
        #endregion

        #region 活动报名
        public string ActivitySignUp(signupmain _signupmain)
        {
            string jsonResult = string.Empty;
            if (_signupmain == null)
            {
                return RtnCreateActiviyErrorMessage(WanerDaoGlobalTip.GetInternationalizationTip("InformationIsIncomplete"));
            }
            activity _activity = SearchActivityByID(_signupmain.activityid);
            if (_activity == null)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NotFindActivity"));
            }

            _signupmain.id = WanerDaoGuid.GetGuid();
            if (string.IsNullOrEmpty(_signupmain.userid))
            {
                string original_id =GetCurrentUserID();
            }
            string message = string.Empty;
            List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

            activitymember _activitymember = GetActivityMember(_signupmain, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            listSqlParam.Add(GetInsertActivityMember(_activitymember));

            List<ActivityPayMethods> listPayMet = GetActivityPayMethods(_signupmain.paymethodsinfo, _signupmain.activityid, GetCurrentUserID(), ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            listSqlParam.AddRange(GetInsertActivityPayMethods(listPayMet));

            // 普通人员
            string _role_id = _signupmain.roleid;
            if (string.IsNullOrEmpty(_role_id))
            {
                _role_id = "868de60f-15fd-11e1-bb4e-000c295f9365";
            }
            listSqlParam.Add(GetInsertActivityMemberRole(_activitymember.activity_id, _activitymember.id, _role_id));

            List<autocarpool> _autocarpoollist = GetAutocarpools(_signupmain, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            listSqlParam.AddRange(GetInsertAutoCarPool(_autocarpoollist));

            //用户加入记录
            ActivityJoinInfo _joinMode = new ActivityJoinInfo
            {
                activity_id = _signupmain.activityid,
                flag = 1,
                update_date = DateTime.Now,
                user_id = GetCurrentUserID()
            };
            listSqlParam.Add(GetInsertActivityJoinInfo(_joinMode));

            listSqlParam.Add(GetUpdateActivityJoinMemberNbr(_signupmain.activityid, 1));

            bool isSuccess = this.CommonTransExecuteNonQuery(listSqlParam);
            //活动邀请
            if (_signupmain.invite != null)
            {
                isSuccess = SendActivityInviter(_signupmain.invite, _signupmain.activityid);
                if (!isSuccess)
                {
                    return jsonResult = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("ActivitySignupFail"));
                }
            } 
            if (isSuccess)
            {
                
                try
                {
                    if (_activitymember.carpool_type_id == "a0a72a90-599e-11e1-9350-101f74b66417" && _activitymember.is_auto)
                    {
                        WanerDaoExperience.shareCarScoreAdd(_activitymember.user_id);
                    }
                    WanerDaoExperience.joinActivityScoreAdd(_activitymember.user_id, _activitymember.activity_id);
                    
                }
                catch { }
                //给推荐人加积分
                try
                {
                    if(!string.IsNullOrEmpty(_signupmain.recommenduserid))
                    {

                    }
                }
                catch { }
                return jsonResult = WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("ActivitySignupSuccess"));
            }
            else
            {
                return jsonResult = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("ActivitySignupFail"));
            }
        }

        public string VerifyActivitySignUp(string activityid)
        {
            return VerifyActivitySignUp(activityid, GetCurrentUserID());
        }

        public string VerifyActivitySignUp(string activityid, string userid)
        {

            string jsonResult = string.Empty;
            activity _activity=SearchActivityByID(activityid);
            if (_activity == null)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NotFindActivity"));
            }
            PersonalProfileModel _personModel = SelectPersonalProfileModelByUserId(userid);
            if (_personModel == null)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NotFindPersonalInfo"));
            }
            if (_activity.is_kick_protected)
            {
                activitykicklist _kichList = SelectActivityKickListByActivityIDAndUserID(activityid, userid);
                if (_kichList != null)
                {
                    TimeSpan _ts = DateTime.Now - _kichList.kick_date;
                    if (_activity.kick_protected_duration < _ts.TotalDays)
                    {
                        return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("KickingInTime"));
                        
                    }
                }
            }

            List<activityjoinconditions> _activityJoin = SelectActivityJoinconditionsByActivityID(activityid);
            if (_activityJoin != null && _activityJoin.Count > 0)
            {
                List<joinconditions> _joinConditions = SelectAllJoinConditions();
                if (_joinConditions != null && _joinConditions.Count>0)
                {
                    foreach (joinconditions _joinItem in _joinConditions)
                    {
                        activityjoinconditions _activityJoinItems = _activityJoin.Find(i => i.condition_id == _joinItem.id);
                        if (_activityJoinItems != null)
                        {
                            switch (_joinItem.id)
                            {
                                case "1":
                                    try
                                    {
                                        if (Double.Parse(_activityJoinItems.value) <= _personModel.experience)
                                        {
                                            jsonResult = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("JoinAcitivityExperienceNotenough"));
                                            return jsonResult;
                                        }
                                    }
                                    catch
                                    {
                                    }
                                    break;
                                case "2":
                                    try
                                    {
                                        if (bool.Parse(_activityJoinItems.value) ==_personModel.gender)
                                        {
                                            jsonResult = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("JoinAcitivityAgeError"));
                                            return jsonResult;
                                        }
                                    }
                                    catch
                                    {
                                    }
                                    break;
                                case "3":
                                    try
                                    {
                                        if (Double.Parse(_activityJoinItems.value) <= (DateTime.Now.Year- _personModel.birthday_year))
                                        {
                                            jsonResult = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("JoinAcitivityGenderError"));
                                            return jsonResult;
                                        }
                                    }
                                    catch
                                    {
                                    }
                                    break;
                            }
                        }
                    }
                }
            }

            return WanerDaoJSON.GetSuccessJson("");
        }

        public string GetGroupCarpoolMoney(string activity_id)
        {
            return GetDataJosn("activity_id", activity_id, "GetGroupCarpoolMoney", false);
        }

        #endregion

        #region 活动管理

        public string GetActivityMainInfoForJson(string activityId)
        {
            string _jsonResult = string.Empty;
            string _message = string.Empty;

            activity _activity = SearchActivityByID(activityId);
            if (_activity == null)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NotFindActivity"));
            }

            ActivityMainInfo _mainInfo = GetActivityMainInfo(_activity);
            _jsonResult= ReturnResultMessage(_mainInfo);
            return _jsonResult;
        }

        public string UpdateActivityMainInfo(ActivityMainInfo activityMainInfo)
        {
            string _jsonResult = string.Empty;
            string _message = string.Empty;

            List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

            activity _activity = GetActivityUpdate(activityMainInfo, ref _message);
            if (!string.IsNullOrEmpty(_message))
            {
                return WanerDaoJSON.GetErrorJson(_message);
            }
            listSqlParam.Add(GetUpdateActivity(_activity));

            List<OperationManager> _operation = this.GetOperationManagers(activityMainInfo.activityid);
            List<OperationManager> _addOperation = new List<OperationManager>();
            List<OperationManager> _deleteOperation = new List<OperationManager>();
            CompareList<OperationManager>(activityMainInfo.operationmanager, _operation, ref _addOperation, ref _deleteOperation);

            listSqlParam.AddRange(GetUpdateActivityMemberRole(GetIDList<OperationManager>(_addOperation), "869d272f-15fd-11e1-bb4e-000c295f9365"));
            listSqlParam.AddRange(GetUpdateActivityMemberRole(GetIDList<OperationManager>(_deleteOperation), "868de60f-15fd-11e1-bb4e-000c295f9365"));

            List<FinancialManager> _financial = this.GetFinancialManagers(activityMainInfo.activityid);
            List<FinancialManager> _addFinancial = new List<FinancialManager>();
            List<FinancialManager> _deleteFinancial = new List<FinancialManager>();
            CompareList<FinancialManager>(activityMainInfo.financialmanager, _financial, ref _addFinancial, ref _deleteFinancial);
            listSqlParam.AddRange(GetUpdateActivityMemberRole(GetIDList<FinancialManager>(_addFinancial), "86715257-15fd-11e1-bb4e-000c295f9365"));
            listSqlParam.AddRange(GetUpdateActivityMemberRole(GetIDList<FinancialManager>(_deleteFinancial), "868de60f-15fd-11e1-bb4e-000c295f9365"));

            //分类
            List<activitytags> _origin = GetActivitytags(_activity);
            List<activitytags> _addTags = new List<activitytags>();
            List<activitytags> _deleteTags = new List<activitytags>();
            CompareList<activitytags>(activityMainInfo.activitytags, _origin, ref _addTags, ref _deleteTags);
            listSqlParam.AddRange(GetInsertActivityCategory(GetActivityCategory(_addTags, activityMainInfo.activityid, ref _message)));
            if (!string.IsNullOrEmpty(_message))
            {
                return WanerDaoJSON.GetErrorJson(_message);
            }
            listSqlParam.AddRange(GetDeleteActivityCategory(GetActivityCategory(_deleteTags, activityMainInfo.activityid, ref _message)));
            if (!string.IsNullOrEmpty(_message))
            {
                return WanerDaoJSON.GetErrorJson(_message);
            }

            if (this.CommonTransExecuteNonQuery(listSqlParam))
            {
                return _jsonResult = WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));
            }
            else
            {
                return _jsonResult = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
            }
        }

        public string GetActivityPlanManageForJson(string activityId)
        {
            string _jsonResult = string.Empty;
            string _message = string.Empty;

            activity _activity = SearchActivityByID(activityId);
            if (_activity == null)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NotFindActivity"));
            }

            ActivityPlanJson _mainInfo = GetActivityPlanJson(activityId);
            _jsonResult = ReturnResultMessage(_mainInfo);
            return _jsonResult;
        }

        public string UpdageActivityPlanJson(ActivityPlanJson activityPlanJson)
        {
            string _jsonResult = string.Empty;
            string _message = string.Empty;

            List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

            List<plan> _originPlan=GetPlans(activityPlanJson.AcitivtyId);
            List<plan> _addPlan=new List<plan>();
            List<plan> _updatePlan=new List<plan>();
            List<plan> _deletePlan=new List<plan>();
            CompareList<plan>(activityPlanJson.plans,_originPlan,ref _addPlan ,ref _updatePlan,ref _deletePlan);
            listSqlParam.AddRange(GetInsertActivityPlan( GetActivityplan(_addPlan,activityPlanJson.AcitivtyId, ref _message)));
            if (!string.IsNullOrEmpty(_message))
            {
                return WanerDaoJSON.GetErrorJson(_message);
            }
            listSqlParam.AddRange(GetUpdateActivityPlan( GetActivityplan(_updatePlan,activityPlanJson.AcitivtyId, ref _message)));
            if (!string.IsNullOrEmpty(_message))
            {
                return WanerDaoJSON.GetErrorJson(_message);
            }
            listSqlParam.AddRange(GetDeleteActivityPlan( GetActivityplan(_deletePlan,activityPlanJson.AcitivtyId, ref _message)));
            if (!string.IsNullOrEmpty(_message))
            {
                return WanerDaoJSON.GetErrorJson(_message);
            }

            if (this.CommonTransExecuteNonQuery(listSqlParam))
            {
                return _jsonResult = WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));
            }
            else
            {
                return _jsonResult = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
            }
        }

        public string GetActivityWeatherInfoJson(string activityId)
        {
            activity _activity = SearchActivityByID(activityId);
            if (_activity == null)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NotFindActivity"));
            }
            string _cityName = SelectCityEnglishNameByCityId(_activity.city_id);
            if (string.IsNullOrEmpty(_cityName))
            {
                return ReturnResultMessage(null);
            }
            return GetWeatherInfoJson(_cityName);
        }

        public string GetActivityVehicleInfo(string activityId)
        {
            string strJson = string.Empty;
            activity activity = this.GetModel<activity>(activityId, "GetActivityParamByActivityID");
            if (activity == null)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NotFindActivity"));
            }
            ActivityVehicleInfo _activityVehicleInfo = new ActivityVehicleInfo();
            _activityVehicleInfo.ActivityId = activity.id;
            _activityVehicleInfo.UserId = GetCurrentUserID();
            vehicletype _vehicletype = GetVehicletype(activity.id);
            _activityVehicleInfo.Vehicletype = _vehicletype;
            return ReturnResultMessage(_activityVehicleInfo);
        }
        public string UpdateGetActivityVehicleInfo(ActivityVehicleInfo activityVehicleInfo)
        {
            if (activityVehicleInfo == null || activityVehicleInfo.Vehicletype == null)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("InformationIsIncomplete"));
            }

            string jsonResult = string.Empty;
            activity _activity = SearchActivityByID(activityVehicleInfo.ActivityId);
            if (_activity == null)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NotFindActivity"));
            }

            if (string.IsNullOrEmpty(activityVehicleInfo.UserId))
            {
                activityVehicleInfo.UserId = GetCurrentUserID();
            }

            string message = string.Empty;
            List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

            activitymember _activitymember = GetActivitymemberUpdateVehicle(activityVehicleInfo, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            listSqlParam.Add(GetInsertActivityMember(_activitymember));


            bool isSuccess = this.CommonTransExecuteNonQuery(listSqlParam);
            if (isSuccess)
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));
            }
            else
            {
                return  WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
            }
        }
        

        #region private activity manage
        private ActivityMainInfo GetActivityMainInfo(activity _activity)
        {
            PersonalProfileModel _personModel = this.SelectPersonalProfileModelByUserId(_activity.original_id);
            if (_personModel == null)
                _personModel = new PersonalProfileModel();
            WanerDaoPersonInfoManager _personInfoBll=new WanerDaoPersonInfoManager();
            PersonalContactModel _personInfoModel=_personInfoBll.GetPersonalContactModel(_activity.original_id);
            if(_personInfoModel==null)
                _personInfoModel=new PersonalContactModel();
            ActivityMainInfo _mainInfo = new ActivityMainInfo
            {
                begintime = _activity.begin_datetime.ToString(),
                activityid = _activity.id,
                activityname = _activity.activity_name,
                creategroupid = _activity.create_id,
                createuserid = _activity.original_id,
                endtime = _activity.end_datetime.ToString(),
                iskick = _activity.is_kick_protected,
                kickduration = _activity.kick_protected_duration,
                createdatetime = _activity.datetime.ToString(),
                createusername = _personModel.name,
                createuseremail = _activity.create_email,
                createuserphone = _activity.create_phone,
                join_member_nbr = _activity.join_member_nbr,
                max_nbr = _activity.max_nbr,
                reportenddatetime = _activity.report_datetime.ToString(),
                reportdatetime = _activity.datetime.ToString(),
                desc = _activity.description

            };

            ActivitySignUpInfo _signUpInfo = new ActivitySignUpInfo
            {
                cost = _activity.prepay_nbr,
                pass = _activity.apply_pass,
                typeid = _activity.apply_type_id,
                typename = _activity.apply_type_name,
                pay_nbr=_activity.pay_nbr,
                is_pay_need=_activity.is_pay_need,
                pay_description = _activity.pay_description,
                paymethodsinfo = Getpaymethods(_activity.id, GetCurrentUserID())
            };

            _mainInfo.SignupInfo = _signUpInfo;

            _mainInfo.activitytags = GetActivitytags(_activity);

            _mainInfo.placeset = GetPlaceset(_activity);

            _mainInfo.limitcondition=Getlimitconditions(_activity.id);

            _mainInfo.operationmanager = GetOperationManagers(_activity.id);
            _mainInfo.financialmanager = GetFinancialManagers(_activity.id);
            _mainInfo.isfollow = IsFollowActivity(_activity.id) ? 1 : 0;
            return _mainInfo;

        }
        private bool IsFollowActivity(string activity_id)
        {
            try
            {
                IWanerDaoPersonalActivityFollow _iFollow = new WanerDaoPersonalActivityFollow();
                return _iFollow.HasPersonalActivityFollow(GetCurrentUserID(), activity_id);
            }
            catch(Exception _e)
            {
                
            }
            return false;
        }

        private List<OperationManager> GetOperationManagers(string  activityId)
        {
            List<activitymember> _manager = GetActivityMemberOperationManager(activityId);
            if (_manager == null || _manager.Count < 1)
            {
                return null;
            }
            var _list = from _item in _manager
                        where _item != null
                        select new OperationManager
                        {
                            id = _item.id,
                            name = _item.user_name,
                            email = _item.email,
                            phone = _item.phone
                        };
            return _list.ToList();
        }
        private List<FinancialManager> GetFinancialManagers(string activityId)
        {
            List<activitymember> _manager = GetActivityMemberFinancial(activityId);
            if (_manager == null || _manager.Count < 1)
            {
                return null;
            }
            var _list = from _item in _manager
                        where _item != null
                        select new FinancialManager
                        {
                            id = _item.id,
                            name = _item.user_name,
                            email = _item.email,
                            phone = _item.phone
                        };
            return _list.ToList();
        }

        private activity GetActivityUpdate(ActivityMainInfo activityMainInfo, ref string message)
        {
            activity _activity = SearchActivityByID(activityMainInfo.activityid);
            if (_activity == null)
            {
                message = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NotFindActivity"));
                return null;
            }
            _activity.address = activityMainInfo.placeset.addr;
            _activity.country_id = activityMainInfo.placeset.countryid;
            _activity.province_id = activityMainInfo.placeset.provinceid;
            _activity.city_id = activityMainInfo.placeset.cityid;
            _activity.zip = activityMainInfo.placeset.zip;

            _activity.begin_datetime = DateTime.Parse(activityMainInfo.begintime);
            _activity.end_datetime = DateTime.Parse(activityMainInfo.endtime);
            _activity.report_datetime = DateTime.Parse(activityMainInfo.reportenddatetime);
            _activity.id = activityMainInfo.activityid;
            _activity.activity_name = activityMainInfo.activityname;
            _activity.create_id = activityMainInfo.creategroupid;
            _activity.original_id = activityMainInfo.createuserid;
            
            _activity.is_kick_protected = activityMainInfo.iskick;
            _activity.kick_protected_duration = activityMainInfo.kickduration;
            _activity.description = activityMainInfo.desc;

            _activity.prepay_nbr= activityMainInfo.SignupInfo.cost  ;
            _activity.apply_pass = activityMainInfo.SignupInfo.pass;
            _activity.apply_type_id = activityMainInfo.SignupInfo.typeid;
            _activity.apply_type_name = activityMainInfo.SignupInfo.typename;
            _activity.is_pay_need = activityMainInfo.SignupInfo.is_pay_need;
            _activity.pay_nbr = activityMainInfo.SignupInfo.pay_nbr;
            _activity.pay_description = activityMainInfo.SignupInfo.pay_description;

            return _activity;

        }

        private ActivityPlanJson GetActivityPlanJson(string activityId)
        {
            List<plan> _plans = GetPlans(activityId);

            return new ActivityPlanJson { AcitivtyId = activityId, plans = _plans };
        }

        private List<KeyValuePair<string, DbParameter[]>> GetAutoCarpoolDBParameterUpdateVehicle(ActivityVehicleInfo activityVehicleInfo)
        {
            activitymember _member = GetActivityMember(activityVehicleInfo.ActivityId, activityVehicleInfo.UserId);
            return null;
        }
        #endregion

        #endregion

        #region  活动评价
        public bool IsEvaluateActivity(string activityId)
        {
            string userId = this.GetCurrentUserID();
            activitymember _member = GetActivityMember(activityId, userId);
            if (_member.like_nbr != 0 || _member.dislike_nbr != 0 || _member.soso_nbr != 0)
            {
                return true;
            }
            return false;
        }
        /// <summary>
        /// 评价活动
        /// </summary>
        /// <param name="activityId"></param>
        /// <param name="evaluateflag">1;喜欢,2:一般般,3:不喜欢</param>
        /// <returns></returns>
        public bool EvaluateActivity(string activityId, int evaluateflag)
        {
            return UpdateActivityMemberEvaluate(activityId, GetCurrentUserID(), evaluateflag);
        }
        /// <summary>
        /// 统计活动评价
        /// </summary>
        /// <param name="activityId"></param>
        /// <returns></returns>
        public string GetActivityEvaluateTotal(string activityId)
        {
            Dictionary<string,object> _dic=new Dictionary<string,object>();
            _dic.Add("activity_id", activityId);
            return GetJsonFirstRowFromDataTable("GetActivityEvaluateTotal", _dic);
        }

        /// <summary>
        /// 活动评价
        /// </summary>
        /// <param name="activityId"></param>
        /// <param name="user_id"></param>
        /// <param name="evaluateFlag">1;喜欢,2:一般般,3:不喜欢</param>
        /// <returns></returns>
        public bool UpdateActivityMemberEvaluate(string activityId, string user_id, int evaluateFlag)
        {
            int like_nbr = 0, soso_nbr = 0, dislike_nbr = 0;

            switch (evaluateFlag)
            {
                case 1:
                    like_nbr = 1;
                    break;
                case 2:
                    soso_nbr = 1;
                    break;
                case 3:
                    dislike_nbr = 1;
                    break;

            }

            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("activity_id", activityId);
            dic.Add("user_id", user_id);
            dic.Add("like_nbr", like_nbr);
            dic.Add("soso_nbr", soso_nbr);
            dic.Add("dislike_nbr", dislike_nbr);
            return DBAccess.ExecuteNonQueryBasedOnSql(ActivityConfigName, "UpdateActivityMemberEvaluate", dic) >= 0;
        }
        #endregion

        #region 活动参数设置 

        public string UpdatePersongActivitySettings(PersonActivitySettingsJson _settingJson)
        {
            string _jsonResult=string.Empty;
            string _message = string.Empty;

            List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

            personalactivitysettings _setting = GetPersonalActivitySettings(_settingJson,ref _message);
            if (!string.IsNullOrEmpty(_message))
            {
                return WanerDaoJSON.GetErrorJson(_message);
            }
            listSqlParam.Add(GetUpdatePersonalActivitySettings(_setting));

            List<activitymsgexceptionlist> _addMsgList=new List<activitymsgexceptionlist>();
            List<activitymsgexceptionlist> _deleteMsgList=new List<activitymsgexceptionlist>();
            GetActivityMsgExceptionListUpdate(_settingJson, ref _message,ref _addMsgList,ref _deleteMsgList);
            if (!string.IsNullOrEmpty(_message))
            {
                return WanerDaoJSON.GetErrorJson(_message);
            }
            listSqlParam.AddRange(GetInsertActivityMsgExceptionList(_addMsgList));
            listSqlParam.AddRange(GetDeleteActivityMsgExceptionList(_deleteMsgList));

            if (this.CommonTransExecuteNonQuery(listSqlParam))
            {
                return _jsonResult = WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));
            }
            else
            {
                return _jsonResult = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
            }
        }

        public string GetPersongActivitySettingsJosnForJson(string activityId, string userId)
        {
            string _message = string.Empty;
            PersonActivitySettingsJson _settingJson = GetPersonActivitySettingsJson(activityId, userId, ref _message);
            if (!string.IsNullOrEmpty(_message))
            {
                return WanerDaoJSON.GetErrorJson(_message);
            }
            List<PersonJson> _personJson = GetPersonJsonList(activityId, userId);
            _settingJson.persons = _personJson;
            return ReturnResultMessage(_settingJson);
        }
        public string GetPersongActivitySettingsPeriod()
        {
            var value = new List<object> { 
                new { id = "2", name = "按月" },
                new { id = "1", name = "按日" }, 
                new { id = "3", name = "按季" },
                new { id = "4", name = "按年" }
            };
            return ReturnResultMessage(value);
        }

        #endregion

        #region 活动成员

        #region 业务
        /// <summary>
        /// 获取活动成员键值对 id:活动成员主键ID， name:成员名字
        /// </summary>
        /// <param name="activityId"></param>
        /// <returns></returns>
        public string GetActivityMemberKeyValue(string activityId)
        {
            List<activitymember> _list = GetActivityMemberByActivityID(activityId);
            if (_list == null || _list.Count < 1)
            {
                return ReturnResultMessage(null);
            }
            var vValue = from _item in _list
                        where _item != null
                        select new { id = _item.id, name = _item.user_name };
            return ReturnResultMessage(vValue);
        }
        /// <summary>
        /// 获取活动成员键值对 id:成员用户ID， name:成员名字
        /// </summary>
        /// <param name="activityId"></param>
        /// <returns></returns>
        public string GetActivityMemberUserKeyValue(string activityId)
        {
            List<activitymember> _list = GetActivityMemberByActivityID(activityId);
            if (_list == null || _list.Count < 1)
            {
                return ReturnResultMessage(null);
            }
            var vValue = from _item in _list
                         where _item != null
                         select new { id = _item.user_id, name = _item.user_name };
            return ReturnResultMessage(vValue);
        }

        public string GetUserJoinActivityPath(string acitivtyid)
        {
            return GetUserJoinActivityPath(GetCurrentUserID(), acitivtyid);
        }
        public string GetUserJoinActivityPath( string acitivtyid,string userid)
        {
            activitymember _member = GetActivityMember(acitivtyid, userid);
            activity _activity=SearchActivityByID(acitivtyid);
            if (_member == null||_activity==null)
                return  ReturnResultMessage(null);
            var _var = new { sourcepath = _member.address, destpath = _activity.address };
            return ReturnResultMessage(_var);
        }
        
        /// <summary>
        /// 活动退出
        /// </summary>
        /// <param name="activityID">活动ID</param>
        /// <param name="userID">用户ID</param>
        /// <param name="reason">原因</param>
        /// <param name="superUserID">接班人</param>
        /// <param name="optType">optType 0:退出，1：解散</param>
        /// <returns></returns>
        public string SignOutActivity(string activityID, string userID, string reason, string superUserID, string optType)
        {
            activitymember _am = GetActivityMember(activityID, userID);
            if (_am == null)
            {
                return RtnCreateActiviyErrorMessage(WanerDaoGlobalTip.GetInternationalizationTip("NoJoinAcitivity"));
            }

            List<activitymemberrole> _roleList = SelectActivityMemberRoleByMemberID(_am.id);
            activitymemberrole _adminRol= null;
            if (_roleList != null && _roleList.Count > 0)
            {
                _adminRol = _roleList.Find(i => i.role_id == "867e7daf-15fd-11e1-bb4e-000c295f9365");
            }

            List<KeyValuePair<string, DbParameter[]>> _listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

            _listSqlParam.Add(GetUpdateActivityJoinMemberNbr(activityID, -1));
            if (_adminRol == null)
            {
                _listSqlParam.Add(GetDeleteActivityMember(_am.activity_id, _am.user_id));
                _listSqlParam.Add(GetDeleteActivityMemberRoleByMemberID(_am.id));
                if (CommonTransExecuteNonQuery(_listSqlParam))
                {
                    return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("SignOutAcitivitySuccess"));
                }
                else
                {
                    return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("SignOutAcitivityFail"));
                }

            }
            if (optType == "0")
            {
                if (string.IsNullOrEmpty(superUserID))
                {
                    return RtnCreateActiviyErrorMessage(WanerDaoGlobalTip.GetInternationalizationTip("NoAcitivitySuperRole"));
                }
                activitymember _amSuper = GetActivityMember(activityID, superUserID);
                if (_amSuper == null)
                {
                    return RtnCreateActiviyErrorMessage(WanerDaoGlobalTip.GetInternationalizationTip("NoExistAcitivitySuperRole"));
                }

                _listSqlParam.Add(GetDeleteActivityMember(_am.activity_id, _am.user_id));
                _listSqlParam.Add(GetDeleteActivityMemberRoleByMemberID(_am.id));
                _listSqlParam.Add(GetDeleteActivityMemberRoleByMemberID(_amSuper.id));
                _listSqlParam.AddRange(GetAddMemberAdminRole(_amSuper));
                if (CommonTransExecuteNonQuery(_listSqlParam))
                {
                    return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("SignOutAcitivitySuccess"));
                }
                else
                {
                    return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("SignOutAcitivityFail"));
                }
            }

            //用户加入记录
            ActivityJoinInfo _joinMode = new ActivityJoinInfo
            {
                activity_id = activityID,
                flag = 0,
                update_date = DateTime.Now,
                user_id = GetCurrentUserID(),
                remark = reason
            };
            _listSqlParam.Add(GetInsertActivityJoinInfo(_joinMode));

            if (optType == "1")
            {
                if (CommonExecuteNonQuery(GetDeleteActivity(activityID)))
                {
                    SendSignOutMessage(userID, activityID, reason);
                    return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("DissolveAcitivitySuccess"));
                }
                else
                {
                    return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("DissolveAcitivityFail"));
                }
            }

            return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("SignOutAcitivityFail"));
        }

        /// <summary>
        /// 发送退出站内信息 待接口
        /// </summary>
        /// <param name="user_id"></param>
        /// <param name="activity_id"></param>
        /// <param name="reason"></param>
        public void SendSignOutMessage(string user_id, string activity_id, string reason)
        {

        }

        /// <summary>
        /// 获取某车主搭车信息统计
        /// </summary>
        /// <param name="user_id"></param>
        /// <param name="activity_id"></param>
        /// <returns></returns>
        public string GetCarOwerCustomTotal(string user_id, string activity_id)
        {
            activitymember _am = GetActivityMember(activity_id, user_id);
            if (_am == null)
                _am = new activitymember();

            var _varObj = new { _am.carpool_nbr, _am.current_carpool_nbr };
            return ReturnResultMessage(_varObj);
        }
        #endregion

        #region common
        public activitymember GetActivityMember(string activityId, string user_id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("activity_id", activityId);
            dic.Add("user_id", user_id);
            return this.GetModel<activitymember>(dic, "GetActivitymemberParamByActivityidAndUserid");
        }
        public List<activitymember> GetActivityMemberByActivityID(string activityId)
        {
            return GetListModel<activitymember>("activity_id", activityId, "GetActivityMemberByActivityID");
        }
        public List<activitymember> GetActivityMemberOperationManager(string activityId)
        {
            return GetActivityMemberByRoleId(activityId, "869d272f-15fd-11e1-bb4e-000c295f9365");
        }
        public List<activitymember> GetActivityMemberFinancial(string activityId)
        {
            return GetActivityMemberByRoleId(activityId, "86715257-15fd-11e1-bb4e-000c295f9365");
        }
        public List<activitymember> GetActivityMemberByRoleId(string activityId, string roleId)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("activity_id", activityId);
            dic.Add("role_id", roleId);
            return this.GetListModel<activitymember>(dic, "GetActivityMemberByRoleId");
        }
        public bool DeleteActivityMember(string activityId, string user_id)
        {
            return CommonExecuteNonQuery(GetDeleteActivityMember(activityId, user_id));
        }

        #endregion

        

        #region KeyValuePair
        /// <summary>
        /// 获取活动人员添加执行语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertActivityMember(activitymember activityMember)
        {
            if (activityMember == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activityMember.id))
            {
                activityMember.id = WanerDaoGuid.GetGuid();
            }

            return DBAccess.GetNonQueryDBParamBasedOnSql<activitymember>(ActivityConfigName, "Insertactivitymember", activityMember);
        }
        /// <summary>
        /// 获取活动角色更换执行语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetUpdateActivityMemberRole(List<string> listId, string roleId)
        {

            List<KeyValuePair<string, DbParameter[]>> _paramList = new List<KeyValuePair<string, DbParameter[]>>();
            if (listId == null || listId.Count < 1)
            {
                return _paramList;
            }
            foreach (string _item in listId)
            {
                _paramList.Add(GetUpdateActivityMemberRole(_item, roleId));
            }
            return _paramList;
        }
        /// <summary>
        /// 获取活动角色更换执行语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetUpdateActivityMemberRole(string id, string roleId)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("id", id);
            _dic.Add("role_id", roleId);
            return DBAccess.GetNonQueryDBParamBasedOnSql(ActivityConfigName, "UpdateActivityMemberRole", _dic);
        }
        public KeyValuePair<string, DbParameter[]> GetDeleteActivityMember(string activityId, string user_id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("activity_id", activityId);
            dic.Add("user_id", user_id);
            return DBAccess.GetNonQueryDBParamBasedOnSql(ActivityConfigName, "DeleteActivityMember", dic);
        }
        #endregion
        #endregion

        #region 活动成员角色
        
        #region 业务
        public string GetActivityMemberRoleKeyValueJson(string activityID)
        {
            return GetActivityMemberRoleKeyValueJson(activityID, GetCurrentUserID());
        }
        public string GetActivityMemberRoleKeyValueJson(string activityID, string userID)
        {
            activitymember am = GetActivityMember(activityID, userID);
            if (am == null)
            {
                return ReturnResultMessage(null);
            }
            List<activitymemberrole> _roles = SelectActivityMemberRoleByMemberID(am.id);
            if (_roles == null || _roles.Count < 1)
            {
                return ReturnResultMessage(null);
            }
            var _rv = from _item in _roles
                      where _roles != null
                      select new { id = _item.role_id, name = _item.role_name };
            return ReturnResultMessage(_rv);
        }
        public List<KeyValuePair<string, DbParameter[]>> GetAddMemberAdminRole(activitymember activityMember)
        {
            if (activityMember == null)
            {
                new List<KeyValuePair<string, DbParameter[]>>();
            }
            List<activitymemberrole> _roleList = new List<activitymemberrole>();
            // 超级管理员
            _roleList.Add(new activitymemberrole
            {
                active = true,
                activity_id = activityMember.activity_id,
                member_id = activityMember.id,
                role_id = "867e7daf-15fd-11e1-bb4e-000c295f9365"
            });
            // 财务员
            _roleList.Add(new activitymemberrole
            {
                active = true,
                activity_id = activityMember.activity_id,
                member_id = activityMember.id,
                role_id = "86715257-15fd-11e1-bb4e-000c295f9365"
            });
            // 出纳员
            _roleList.Add(new activitymemberrole
            {
                active = true,
                activity_id = activityMember.activity_id,
                member_id = activityMember.id,
                role_id = "8682b6c9-15fd-11e1-bb4e-000c295f9365"
            });
            // 会计员
            _roleList.Add(new activitymemberrole
            {
                active = true,
                activity_id = activityMember.activity_id,
                member_id = activityMember.id,
                role_id = "86870ea5-15fd-11e1-bb4e-000c295f9365"
            });
            // 审计员
            _roleList.Add(new activitymemberrole
            {
                active = true,
                activity_id = activityMember.activity_id,
                member_id = activityMember.id,
                role_id = "8695ffad-15fd-11e1-bb4e-000c295f9365"
            });
            // 执行管理员
            _roleList.Add(new activitymemberrole
            {
                active = true,
                activity_id = activityMember.activity_id,
                member_id = activityMember.id,
                role_id = "869d272f-15fd-11e1-bb4e-000c295f9365"
            });
            // 普通人员
            _roleList.Add(new activitymemberrole
            {
                active = true,
                activity_id = activityMember.activity_id,
                member_id = activityMember.id,
                role_id = "868de60f-15fd-11e1-bb4e-000c295f9365"
            });
            return GetInsertActivityMemberRole(_roleList);
        }
        #endregion

        public bool AddActivityMemberRole(activitymemberrole activityMemberRole)
        {
            return CommonExecuteNonQuery(GetInsertActivityMemberRole(activityMemberRole));
        }

        public List<activitymemberrole> SelectActivityMemberRoleByMemberID(string memberid)
        {
            return GetListModel<activitymemberrole>("member_id", memberid, "SelectActivityMemberRoleByMemberID",true);
        }

        #region KeyValuePair
        /// <summary>
        /// 获取活动成员角色建人插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertActivityMemberRole(activitymemberrole activityMemberRole)
        {
            if (activityMemberRole == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activityMemberRole.id))
            {
                activityMemberRole.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitymemberrole>(ActivityConfigName, "InsertActivityMemberRole", activityMemberRole);
        }

        /// <summary>
        /// 获取活动成员角色创建人插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetInsertActivityMemberRole(List<activitymemberrole> activityMemberRoles)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();

            if (activityMemberRoles == null || activityMemberRoles.Count < 1)
            {
                return list;
            }

            foreach (activitymemberrole _item in activityMemberRoles)
            {
                list.Add(GetInsertActivityMemberRole(_item));
            }
            return list;
        }
        public KeyValuePair<string, DbParameter[]> GetInsertActivityMemberRole(string activityID, string memberID, string roleID)
        {
            activitymemberrole _role = new activitymemberrole { role_id = roleID, active = true, activity_id = activityID, member_id = memberID };
            return GetInsertActivityMemberRole(_role);
        }
        /// <summary>
        /// 获取活动成员角色删除插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetDeleteActivityMemberRoleByID(activitymoneyflowope activityMoneyFlowOpe)
        {
            if (activityMoneyFlowOpe == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitymoneyflowope>(ActivityConfigName, "DeleteActivityMemberRoleByID", activityMoneyFlowOpe);
        }

        /// <summary>
        /// 获取活动成员角色删除插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetDeleteActivityMemberRoleByMemberID(string memberID)
        {
            Dictionary<string,object> _dic=new Dictionary<string,object>();
            _dic.Add("member_id",memberID);
            return  DBAccess.GetNonQueryDBParamBasedOnSql(ActivityConfigName, "DeleteActivityMemberRoleByMemberID", _dic);
        }

        #endregion
        #endregion

        #region 活动支付方式

        #region 业务
        public string GetActivityPayMethodsByIDForJson(string id)
        {
            ActivityPayMethods _model = SelectActivityPayMethods(id);
            return ReturnResultMessage(_model);
        }
        public string GetActivityPayMethodsJson(string activityID)
        {
            return GetGetActivityPayMethodsJson(activityID, GetCurrentUserID());
        }
        public string GetGetActivityPayMethodsJson(string activityID, string userID)
        {
            List<ActivityPayMethods> _list = SelectActivityPayMethods(activityID, userID);
            if (_list == null || _list.Count < 1)
            {
                return ReturnResultMessage(null);
            }
            return ReturnResultMessage(_list);
        }
        
        #endregion

        public bool AddActivityPayMethods(ActivityPayMethods activityPayMethods)
        {
            return CommonExecuteNonQuery(GetInsertActivityPayMethods(activityPayMethods));
        }

        public List<ActivityPayMethods> SelectActivityPayMethods(string activityID,string userID)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("activity_id", activityID);
            _dic.Add("user_id", userID);
            return GetListModel<ActivityPayMethods>(_dic, "SelectActivityPayMethodsByActivityIDAndUserID", true);
        }
        public List<ActivityPayMethods> SelectActivityPayMethodsByActivityID(string activityID)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("activity_id", activityID);
            return GetListModel<ActivityPayMethods>(_dic, "SelectActivityPayMethodsByActivityID", true);
        }
        public ActivityPayMethods SelectActivityPayMethods(string id)
        {
            return GetModel<ActivityPayMethods>(id, "SelectActivityPayMethodsByID", true);
        }

        #region KeyValuePair
        /// <summary>
        /// 获取活动支付方式插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertActivityPayMethods(ActivityPayMethods activityPayMethods)
        {
            if (activityPayMethods == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activityPayMethods.id))
            {
                activityPayMethods.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<ActivityPayMethods>(ActivityConfigName, "InsertActivityPayMethods", activityPayMethods);
        }
        /// <summary>
        /// 获取活动支付方式插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetInsertActivityPayMethods(List<ActivityPayMethods> activityPayMethodsList)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();

            if (activityPayMethodsList == null || activityPayMethodsList.Count < 1)
            {
                return list;
            }

            foreach (ActivityPayMethods _item in activityPayMethodsList)
            {
                list.Add(GetInsertActivityPayMethods(_item));
            }
            return list;
        }

        /// <summary>
        /// 获取活动支付方式删除插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetDeleteActivityPayMethodsByID(string id)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("id", id);
            return DBAccess.GetNonQueryDBParamBasedOnSql(ActivityConfigName, "DeleteActivityPayMethodsByID", _dic);
        }

        #endregion
        #endregion

        #region 活动周期

        public personalactivityschedule SelectPersonalActivityScheduleByActivityID(string activityId)
        {
            return GetModel<personalactivityschedule>("activity_id", activityId, "SelectPersonalActivityScheduleByActivityID");
        }

        #endregion

        #region 条件
        public bool AddActivityJoinConditions(activityjoinconditions activityJoinConditions)
        {
            return CommonExecuteNonQuery(GetInsertActivityJoinConditions(activityJoinConditions));
        }
        public bool AddActivityJoinConditions(List<activityjoinconditions> activityJoinConditions)
        {
            List<KeyValuePair<string, DbParameter[]>> list = GetInsertActivityJoinConditions(activityJoinConditions);
            return this.CommonTransExecuteNonQuery(list);
        }
        public List<activityjoinconditions> SelectActivityJoinconditionsByActivityID(string activityId)
        {
            return GetListModel<activityjoinconditions>("activity_id", activityId, "SelectActivityJoinconditionsByActivityID",true);
            
        }
        #endregion

        #region//计划

        

        public bool AddActivityPlan(activityplan activityPlan)
        {
            return CommonExecuteNonQuery(GetInsertActivityPlan(activityPlan));
        }

        public bool AddActivityPlan(List<activityplan> activityPlan)
        {
            List<KeyValuePair<string, DbParameter[]>> list = GetInsertActivityPlan(activityPlan);
            return this.CommonTransExecuteNonQuery(list);
        }
        public List<activityplan> SelectActivityPlanByActivityID(string activityId)
        {
            return GetListModel<activityplan>("activity_id", activityId, "SelectActivityPlanByActivityID");
        }
        #endregion

        #region// 活动加入退出情况
        public bool AddActivityJoinInfo(ActivityJoinInfo model)
        {
            return CommonExecuteNonQuery(GetInsertActivityJoinInfo(model));
        }
        public List<activityplan> SelectActivityJoinInfoByActivityID(string activityId)
        {
            return GetListModel<activityplan>("activity_id", activityId, "SelectActivityJoinInfoByActivityID");
        }
        public List<activityplan> SelectActivityJoinInfoByPerson(string activityId)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("update_date", GetPersonLogonDate());
            _dic.Add("user_id", GetCurrentUserID());
            return GetListModel<activityplan>(_dic, "SelectActivityJoinInfoByPerson");
        }
        /// <summary>
        /// 获取用户最近登录日期 待接口
        /// </summary>
        /// <returns></returns>
        public DateTime GetPersonLogonDate()
        {
            return DateTime.Now.AddDays(-1).Date;
        }
        #endregion


        #region //预算

        #region 业务
        /// <summary>
        /// 查询预算和收支额度统计
        /// </summary>
        /// <param name="activityid"></param>
        /// <returns></returns>
        public string SelectBudgetSumAndFlowSum(string activityid)
        {
            Dictionary<string,object> _dic=new  Dictionary<string,object>();
            _dic.Add("activity_id", activityid);
            return this.GetJsonFirstRowFromDataTable("SelectBudgetSumAndFlowSum", _dic);
        }
        /// <summary>
        /// 添加预算
        /// </summary>
        /// <param name="budgetManage"></param>
        /// <returns></returns>
        public string AddActivityBudget(ActivityBudgetManage budgetManage)
        {
            string message = string.Empty;
            budgetManage.id = WanerDaoGuid.GetGuid();
            List<KeyValuePair<string, DbParameter[]>> _listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

            activitybudget _ab = GetActivityBudget(budgetManage, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            _listSqlParam.Add(GetInsertActivityBudget(_ab));

            List<activitybudgetope> _abos = GetActivityBudgetOpe(budgetManage, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            _listSqlParam.AddRange(GetInsertActivityBudgetOpe(_abos));

            if (CommonTransExecuteNonQuery(_listSqlParam))
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("AddInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn")); 
            }
        }
        /// <summary>
        /// 查找某条预算
        /// </summary>
        /// <param name="budgetID"></param>
        /// <returns></returns>
        public string GetActivityBudgetManageForJson(string budgetID)
        {
            return  ReturnResultMessage(GetActivityBudgetManage(budgetID));
        }
        /// <summary>
        /// 修改某条预算
        /// </summary>
        /// <param name="budgetManage"></param>
        /// <returns></returns>
        public string UpdateActivityBudget(ActivityBudgetManage budgetManage)
        {
            string message = string.Empty;

            List<KeyValuePair<string, DbParameter[]>> _listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

            activitybudget _ab = GetActivityBudget(budgetManage, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            _listSqlParam.Add(GetUpdateActivityBudget(_ab));

            ActivityBudgetManage _HbudgetManage=GetActivityBudgetManage(budgetManage.id);
            List<BudgetOpt> _haveAbos = _HbudgetManage!=null?_HbudgetManage.budgetopts:null;
            List<BudgetOpt> _addAbo = new List<BudgetOpt>();
            List<BudgetOpt> _deleteAbo = new List<BudgetOpt>();
            CompareList<BudgetOpt>(budgetManage.budgetopts, _haveAbos, ref _addAbo, ref _deleteAbo);

            _listSqlParam.AddRange(GetInsertActivityBudgetOpe(ConvertToActivityBudgetOpe(budgetManage, _addAbo)));
            _listSqlParam.AddRange(GetDeleteActivityBudgetOpe(ConvertToActivityBudgetOpe(budgetManage, _deleteAbo)));

            if (CommonTransExecuteNonQuery(_listSqlParam))
            {
                return  WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
            }
        }

        #endregion

        #region private
        private activitybudget GetActivityBudget(ActivityBudgetManage bugdetManage,ref string message)
        {
            if (bugdetManage == null)
            {
                return null;
            }
            activitybudget _ab = new activitybudget
            {
                active = true,
                activity_id = bugdetManage.activity_id,
                budget_money = bugdetManage.budget_money,
                conver_unit = bugdetManage.conver_unit,
                cover_note = bugdetManage.cover_note,
                create_date = DateTime.Now,
                create_id = GetCurrentUserID(),
                is_in = bugdetManage.is_in,
                item_content = bugdetManage.item_content,
                item_description = bugdetManage.item_description,
                id = bugdetManage.id
            };
            if (string.IsNullOrEmpty(_ab.id))
            {
                _ab.id = WanerDaoGuid.GetGuid();
            }
            return _ab;
        }
        private List<activitybudgetope> GetActivityBudgetOpe(ActivityBudgetManage bugdetManage, ref string message)
        {
            if (bugdetManage == null || bugdetManage.budgetopts == null || bugdetManage.budgetopts.Count < 1)
            {
                return null;
            }
            var _varAdos = from _item in bugdetManage.budgetopts
                           where _item != null && !string.IsNullOrEmpty(_item.id)
                           select new activitybudgetope
                           {
                               active = true,
                               activity_id = bugdetManage.activity_id,
                               budget_id = bugdetManage.id,
                               ope_id = _item.id,
                               update_date = DateTime.Now
                           };
            return _varAdos.ToList();

        }
        private List<activitybudgetope> ConvertToActivityBudgetOpe(ActivityBudgetManage bugdetManage, List<BudgetOpt> opts)
        {
            if (opts == null || opts.Count < 1 || bugdetManage == null)
            {
                return null;
            }
            var _varAdos = from _item in opts
                           where _item != null && !string.IsNullOrEmpty(_item.id)
                           select new activitybudgetope
                           {
                               active = true,
                               activity_id = bugdetManage.activity_id,
                               budget_id = bugdetManage.id,
                               ope_id = _item.id,
                               update_date = DateTime.Now
                           };
            return _varAdos.ToList();
        }
        private ActivityBudgetManage GetActivityBudgetManage(string budgetID)
        {
            activitybudget _ab = SearchActivityBudgetByID(budgetID);
            if (_ab == null)
            {
                return null;
            }
            ActivityBudgetManage _abm = new ActivityBudgetManage
            {
                id = budgetID,
                activity_id = _ab.activity_id,
                budget_money = _ab.budget_money,
                conver_unit = _ab.conver_unit,
                cover_note = _ab.cover_note,
                create_date = _ab.create_date.ToString(),
                create_id = _ab.create_name,
                is_in = _ab.is_in,
                item_content = _ab.item_content,
                item_description = _ab.item_description
            };
            List<activitybudgetope> _abos = SelectActivityBudgetOpeByBudgetID(budgetID);
            if (_abos != null && _abos.Count > 0)
            {
                var _varOpt = from _item in _abos
                              where _item != null
                              select new BudgetOpt
                              {
                                  id = _item.ope_id,
                                  name = _item.opt_name,
                                  update_date = _item.update_date.ToString()
                              };

                _abm.budgetopts = _varOpt.ToList();
            }
            return _abm;
        }
        #endregion

        #region common
        public bool AddActivityBudget(activitybudget activityBudget, activitybudgetope activityBudgetOpe)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();

            list.Add(GetInsertActivityBudget(activityBudget));
            list.Add(GetInsertActivityBudgetOpe(activityBudgetOpe));

            return this.CommonTransExecuteNonQuery(list);
        }
        public bool AddActivityBudget(activitybudget activityBudget)
        {
            return CommonExecuteNonQuery(GetInsertActivityBudget(activityBudget));
        }
        public bool AddActivityBudget(List<activitybudget> listActivityBudget)
        {
            List<KeyValuePair<string, DbParameter[]>> list = GetInsertActivityBudget(listActivityBudget);
            return this.CommonTransExecuteNonQuery(list);
        }
        public bool DeleteActivityBudget(string id)
        {
            return this.CommonExecuteNonQuery(GetDeleteActivityBudget(id));
        }

        public List<activitybudget> SelectActivityBudgetByActivityID(string activityId)
        {
            return GetListModel<activitybudget>("activity_id", activityId, "SelectActivityBudgetByActivityID");
        }

        public activitybudget SearchActivityBudgetByID(string budgetID)
        {
            return GetModel<activitybudget>(budgetID, "SearchActivityBudgetByID");
        }

        #region KeyValuePair
        
        /// <summary>
        /// 获取活动预算插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertActivityBudget(activitybudget activityBudget)
        {
            if (activityBudget == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activityBudget.id))
            {
                activityBudget.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitybudget>(ActivityConfigName, "InsertActivityBudget", activityBudget);
        }
        /// <summary>
        /// 获取活动预算插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetInsertActivityBudget(List<activitybudget> activityBudgets)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();

            if (activityBudgets == null || activityBudgets.Count < 1)
            {
                return list;
            }

            foreach (activitybudget budget in activityBudgets)
            {
                list.Add(GetInsertActivityBudget(budget));
            }
            return list;
        }

        /// <summary>
        /// 获取活动预算插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetUpdateActivityBudget(activitybudget activityBudget)
        {
            if (activityBudget == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitybudget>(ActivityConfigName, "UpdateActivityBudget", activityBudget);
        }
        /// <summary>
        /// 获取活动预算插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetDeleteActivityBudget(string id)
        {
            Dictionary<string,object> _dic=new Dictionary<string,object>();
            _dic.Add("id",id);
            return DBAccess.GetNonQueryDBParamBasedOnSql(ActivityConfigName, "DeleteActivityBudget", _dic);
        }
        #endregion
       

        #endregion

        #endregion

        #region//预算执行人员

        #region 业务
        /// <summary>
        /// 预算项执行人员
        /// </summary>
        /// <param name="budgetID"></param>
        /// <returns></returns>
        public string GetBudgetOpeKeyValueByBudgetID(string budgetID)
        {
            List<activitybudgetope> _list = SelectActivityBudgetOpeByBudgetID(budgetID);
            if (_list == null || _list.Count < 1)
                ReturnResultMessage(null);
            var value = from _item in _list
                        where _item != null
                        select new { id = _item.ope_id, name = _item.opt_name};
            return ReturnResultMessage(value);
        }

        #endregion

        public bool AddActivityBudgetOpe(activitybudgetope activityBudgetOpe)
        {
            return CommonExecuteNonQuery(GetInsertActivityBudgetOpe(activityBudgetOpe));
        }
        public List<activitybudgetope> SelectActivityBudgetOpeByActivityID(string activityId)
        {
            return GetListModel<activitybudgetope>("activity_id", activityId, "SelectActivityBudgetOpeByActivityID");
        }
        public List<activitybudgetope> SelectActivityBudgetOpeByBudgetID(string budgetID)
        {
            return GetListModel<activitybudgetope>("budget_id", budgetID, "SelectActivityBudgetOpeByBudgetID");
        }

        #region KeyValuePair
        /// <summary>
        /// 获取活动预算创建人插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertActivityBudgetOpe(activitybudgetope activityBudgetOpe)
        {
            if (activityBudgetOpe == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activityBudgetOpe.id))
            {
                activityBudgetOpe.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitybudgetope>(ActivityConfigName, "InsertActivityBudgetOpe", activityBudgetOpe);
        }

        /// <summary>
        /// 获取活动预算创建人插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetInsertActivityBudgetOpe(List<activitybudgetope> activityBudgetOpes)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();

            if (activityBudgetOpes == null || activityBudgetOpes.Count < 1)
            {
                return list;
            }

            foreach (activitybudgetope _item in activityBudgetOpes)
            {
                list.Add(GetInsertActivityBudgetOpe(_item));
            }
            return list;
        }

        /// <summary>
        /// 获取活动预算创删除插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetDeleteActivityBudgetOpe(activitybudgetope activityBudgetOpe)
        {
            if (activityBudgetOpe == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activityBudgetOpe.id))
            {
                activityBudgetOpe.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitybudgetope>(ActivityConfigName, "DeleteActivityBudgetOpe", activityBudgetOpe);
        }

        /// <summary>
        /// 获取活动预算创删除插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetDeleteActivityBudgetOpe(List<activitybudgetope> activityBudgetOpes)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();

            if (activityBudgetOpes == null || activityBudgetOpes.Count < 1)
            {
                return list;
            }

            foreach (activitybudgetope _item in activityBudgetOpes)
            {
                list.Add(GetDeleteActivityBudgetOpe(_item));
            }
            return list;
        }

        #endregion

        #endregion

        #region 实际收支项

        #region 业务

        /// <summary>
        /// 添加实际收支项
        /// </summary>
        /// <param name="moneyFlowManage"></param>
        /// <returns></returns>
        public string AddActivityMoneyFlow(ActivityMoneyFlowManage moneyFlowManage)
        {
            string message = string.Empty;
            moneyFlowManage.id = WanerDaoGuid.GetGuid();
            List<KeyValuePair<string, DbParameter[]>> _listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

            activitymoneyflow _ab = GetActivityMoneyFlow(moneyFlowManage, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            _listSqlParam.Add(GetInsertActivityMoneyFlow(_ab));

            List<activitymoneyflowope> _abos = GetActivityMoneyFlowOpe(moneyFlowManage, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            _listSqlParam.AddRange(GetInsertActivityMoneyFlowOpe(_abos));

            List<activitymoneyflowpayer> _amfp = GetActivityMoneyFlowPayer(moneyFlowManage, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            _listSqlParam.AddRange(GetInsertActivityMoneyFlowPayer(_amfp));

            if (CommonTransExecuteNonQuery(_listSqlParam))
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("AddInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn"));
            }
        }
        /// <summary>
        /// 查找某条实际收支项
        /// </summary>
        /// <param name="budgetID"></param>
        /// <returns></returns>
        public string GetActivityMoneyFlowManageForJson(string budgetID)
        {
            return ReturnResultMessage(GetActivityMoneyFlowManage(budgetID));
        }
        /// <summary>
        /// 修改某条实际收支项
        /// </summary>
        /// <param name="moneyFlowManage"></param>
        /// <returns></returns>
        public string UpdateActivityMoneyFlow(ActivityMoneyFlowManage moneyFlowManage)
        {
            string message = string.Empty;

            List<KeyValuePair<string, DbParameter[]>> _listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

            activitymoneyflow _ab = GetActivityMoneyFlow(moneyFlowManage, ref message);
            if (!string.IsNullOrEmpty(message))
            {
                return RtnCreateActiviyErrorMessage(message);
            }
            _listSqlParam.Add(GetUpdateActivityMoneyFlow(_ab));

            ActivityMoneyFlowManage _HbudgetManage = GetActivityMoneyFlowManage(moneyFlowManage.id);
            //判断 实际收支项目人员增加或者删除
            List<MoneyFlowOpt> _haveAbos = _HbudgetManage != null ? _HbudgetManage.moneyflowopts : null;
            List<MoneyFlowOpt> _addAbo = new List<MoneyFlowOpt>();
            List<MoneyFlowOpt> _deleteAbo = new List<MoneyFlowOpt>();
            CompareList<MoneyFlowOpt>(moneyFlowManage.moneyflowopts, _haveAbos, ref _addAbo, ref _deleteAbo);

            _listSqlParam.AddRange(GetInsertActivityMoneyFlowOpe(ConvertToActivityMoneyFlowOpe(moneyFlowManage, _addAbo)));
            _listSqlParam.AddRange(GetDeleteActivityMoneyFlowOpe(ConvertToActivityMoneyFlowOpe(moneyFlowManage, _deleteAbo)));

            //判断 缴费人员增加或者删除
            List<MoneyFlowPayer> _haveMfps = _HbudgetManage != null ? _HbudgetManage.moneyflowpayers : null;
            List<MoneyFlowPayer> _addMfp = new List<MoneyFlowPayer>();
            List<MoneyFlowPayer> _deleteMfp = new List<MoneyFlowPayer>();
            CompareList<MoneyFlowPayer>(moneyFlowManage.moneyflowpayers, _haveMfps, ref _addMfp, ref _deleteMfp);

            _listSqlParam.AddRange(GetInsertActivityMoneyFlowPayer(ConvertToActivityMoneyFlowPayer(moneyFlowManage, _addMfp)));
            _listSqlParam.AddRange(GetDeleteActivityMoneyFlowPayer(ConvertToActivityMoneyFlowPayer(moneyFlowManage, _deleteMfp)));

            if (CommonTransExecuteNonQuery(_listSqlParam))
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
            }
        }

        #endregion

        #region private
        private activitymoneyflow GetActivityMoneyFlow(ActivityMoneyFlowManage moneyFlowManage, ref string message)
        {
            if (moneyFlowManage == null)
            {
                return null;
            }
            activitymoneyflow _ab = new activitymoneyflow
            {
                 active=true,
                 activity_id = moneyFlowManage.activity_id,
                 description = moneyFlowManage.description,
                 id = moneyFlowManage.id,
                 is_in = moneyFlowManage.is_in,
                 item_content = moneyFlowManage.item_content,
                 match_budget_id = moneyFlowManage.match_budget_id,
                 money_ope_id = moneyFlowManage.money_ope_id,
                 ope_date = DateTime.Now,
                 sum_cost = moneyFlowManage.sum_cost
            };
            return _ab;
        }
        private List<activitymoneyflowope> GetActivityMoneyFlowOpe(ActivityMoneyFlowManage moneyFlowManage, ref string message)
        {
            if (moneyFlowManage == null || moneyFlowManage.moneyflowopts == null || moneyFlowManage.moneyflowopts.Count < 1)
            {
                return null;
            }
            var _varAdos = from _item in moneyFlowManage.moneyflowopts
                           where _item != null && !string.IsNullOrEmpty(_item.id)
                           select new activitymoneyflowope
                           {
                                active=true,
                                activity_id = moneyFlowManage.activity_id,
                                money_flow_id = moneyFlowManage.id,
                                ope_date = DateTime.Now,
                                ope_id = _item.id
                           };
            return _varAdos.ToList();

        }
        private List<activitymoneyflowpayer> GetActivityMoneyFlowPayer(ActivityMoneyFlowManage moneyFlowManage, ref string message)
        {
            if (moneyFlowManage == null || moneyFlowManage.moneyflowpayers == null || moneyFlowManage.moneyflowpayers.Count < 1)
            {
                return null;
            }
            var _varAdos = from _item in moneyFlowManage.moneyflowpayers
                           where _item != null && !string.IsNullOrEmpty(_item.id)
                           select new activitymoneyflowpayer
                           {
                               active = true,
                               activity_id = moneyFlowManage.activity_id,
                               money_flow_id = moneyFlowManage.id,
                               add_date = DateTime.Now,
                               member_id = _item.id
                           };
            return _varAdos.ToList();

        }
        private List<activitymoneyflowope> ConvertToActivityMoneyFlowOpe(ActivityMoneyFlowManage moneyFlowManage, List<MoneyFlowOpt> opts)
        {
            if (opts == null || opts.Count < 1 || moneyFlowManage == null)
            {
                return null;
            }
            var _varAdos = from _item in opts
                           where _item != null && !string.IsNullOrEmpty(_item.id)
                           select new activitymoneyflowope
                           {
                               active = true,
                               activity_id = moneyFlowManage.activity_id,
                               money_flow_id = moneyFlowManage.id,
                               ope_date = DateTime.Now,
                               ope_id = _item.id
                           };
            return _varAdos.ToList();
        }
        private List<activitymoneyflowpayer> ConvertToActivityMoneyFlowPayer(ActivityMoneyFlowManage moneyFlowManage, List<MoneyFlowPayer> opts)
        {
            if (opts == null || opts.Count < 1 || moneyFlowManage == null)
            {
                return null;
            }
            var _varAdos = from _item in opts
                           where _item != null && !string.IsNullOrEmpty(_item.id)
                           select new activitymoneyflowpayer
                           {
                               active = true,
                               activity_id = moneyFlowManage.activity_id,
                               money_flow_id = moneyFlowManage.id,
                               add_date = DateTime.Now,
                               member_id = _item.id
                           };
            return _varAdos.ToList();
        }
        private ActivityMoneyFlowManage GetActivityMoneyFlowManage(string moneyFlowID)
        {
            activitymoneyflow _ab = SearchActivityMoneyFlowByID(moneyFlowID);
            if (_ab == null)
            {
                return null;
            }
            ActivityMoneyFlowManage _abm = new ActivityMoneyFlowManage
            {
                activity_id = _ab.activity_id,
                description = _ab.description,
                is_in = _ab.is_in,
                item_content = _ab.item_content,
                match_budget_id = _ab.match_budget_id,
                money_ope_id = _ab.money_ope_id,
                ope_date = _ab.ope_date.ToString(),
                sum_cost = _ab.sum_cost,
                id = _ab.id
            };
            List<activitymoneyflowope> _abos = SelectActivityMoneyFlowOpeByMoneyFlowID(moneyFlowID);
            if (_abos != null && _abos.Count > 0)
            {
                var _varOpt = from _item in _abos
                              where _item != null
                              select new MoneyFlowOpt
                              {
                                  id = _item.ope_id,
                                  name = _item.opt_name,
                                   ope_date = _item.ope_date.ToString()
                              };

                _abm.moneyflowopts = _varOpt.ToList();
            }

            List<activitymoneyflowpayer> _amfps = SelectActivityMoneyFlowPayerByMoneyFlowID(moneyFlowID);
            if (_abos != null && _abos.Count > 0)
            {
                var _varOpt = from _item in _amfps
                              where _item != null
                              select new MoneyFlowPayer
                              {
                                  id = _item.member_id,
                                  name = _item.member_name,
                                  add_date = _item.add_date.ToString()
                              };

                _abm.moneyflowpayers = _varOpt.ToList();
            }
            return _abm;
        }
        #endregion

        #region common
        public bool AddActivityMoneyFlow(activitymoneyflow activityMoneyFlow)
        {
            return CommonExecuteNonQuery(GetInsertActivityMoneyFlow(activityMoneyFlow));
        }
        public bool AddActivityMoneyFlow(List<activitymoneyflow> listActivityMoneyFlow)
        {
            List<KeyValuePair<string, DbParameter[]>> list = GetInsertActivityMoneyFlow(listActivityMoneyFlow);
            return this.CommonTransExecuteNonQuery(list);
        }

        public List<activitymoneyflow> SelectActivityMoneyFlowByActivityID(string activityId)
        {
            return GetListModel<activitymoneyflow>("activity_id", activityId, "SelectActivityMoneyFlowByActivityID");
        }

        public activitymoneyflow SearchActivityMoneyFlowByID(string moneyFlowID)
        {
            return GetModel<activitymoneyflow>(moneyFlowID, "SearchActivityMoneyFlowByID");
        }

        #region KeyValuePair

        /// <summary>
        /// 获取活动预算插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertActivityMoneyFlow(activitymoneyflow activityMoneyFlow)
        {
            if (activityMoneyFlow == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activityMoneyFlow.id))
            {
                activityMoneyFlow.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitymoneyflow>(ActivityConfigName, "InsertActivityMoneyFlow", activityMoneyFlow);
        }
        /// <summary>
        /// 获取活动预算插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetInsertActivityMoneyFlow(List<activitymoneyflow> activityMoneyFlows)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();

            if (activityMoneyFlows == null || activityMoneyFlows.Count < 1)
            {
                return list;
            }

            foreach (activitymoneyflow budget in activityMoneyFlows)
            {
                list.Add(GetInsertActivityMoneyFlow(budget));
            }
            return list;
        }

        /// <summary>
        /// 获取活动预算插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetUpdateActivityMoneyFlow(activitymoneyflow activityMoneyFlow)
        {
            if (activityMoneyFlow == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitymoneyflow>(ActivityConfigName, "UpdateActivityMoneyFlow", activityMoneyFlow);
        }
        #endregion


        #endregion

        #endregion

        #region 实际收支项执行人员

        #region 业务
        /// <summary>
        /// 实际收支项执行人员 键值对： id：人员ID name:用户名字
        /// </summary>
        /// <param name="moneyFlowID"></param>
        /// <returns></returns>
        public string GetMoneyFlowOpeKeyValueByMoneyFlowID(string moneyFlowID)
        {
            List<activitymoneyflowope> _list = SelectActivityMoneyFlowOpeByMoneyFlowID(moneyFlowID);
            if (_list == null || _list.Count < 1)
                ReturnResultMessage(null);
            var value = from _item in _list
                        where _item != null
                        select new { id = _item.ope_id, name = _item.opt_name };
            return ReturnResultMessage(value);
        }

        #endregion

        public bool AddActivityMoneyFlowOpe(activitymoneyflowope activityMoneyFlowOpe)
        {
            return CommonExecuteNonQuery(GetInsertActivityMoneyFlowOpe(activityMoneyFlowOpe));
        }
        public List<activitymoneyflowope> SelectActivityMoneyFlowOpeByActivityID(string activityId)
        {
            return GetListModel<activitymoneyflowope>("activity_id", activityId, "SelectActivityMoneyFlowOpeByActivityID");
        }
        public List<activitymoneyflowope> SelectActivityMoneyFlowOpeByMoneyFlowID(string MoneyFlowID)
        {
            return GetListModel<activitymoneyflowope>("money_flow_id", MoneyFlowID, "SelectActivityMoneyFlowOpeByMoneyFlowID");
        }

        #region KeyValuePair
        /// <summary>
        /// 获取实际收支项创建人插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertActivityMoneyFlowOpe(activitymoneyflowope activityMoneyFlowOpe)
        {
            if (activityMoneyFlowOpe == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activityMoneyFlowOpe.id))
            {
                activityMoneyFlowOpe.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitymoneyflowope>(ActivityConfigName, "InsertActivityMoneyFlowOpe", activityMoneyFlowOpe);
        }

        /// <summary>
        /// 获取实际收支项创建人插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetInsertActivityMoneyFlowOpe(List<activitymoneyflowope> activityMoneyFlowOpes)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();

            if (activityMoneyFlowOpes == null || activityMoneyFlowOpes.Count < 1)
            {
                return list;
            }

            foreach (activitymoneyflowope _item in activityMoneyFlowOpes)
            {
                list.Add(GetInsertActivityMoneyFlowOpe(_item));
            }
            return list;
        }

        /// <summary>
        /// 获取实际收支项创删除插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetDeleteActivityMoneyFlowOpe(activitymoneyflowope activityMoneyFlowOpe)
        {
            if (activityMoneyFlowOpe == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activityMoneyFlowOpe.id))
            {
                activityMoneyFlowOpe.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitymoneyflowope>(ActivityConfigName, "DeleteActivityMoneyFlowOpe", activityMoneyFlowOpe);
        }

        /// <summary>
        /// 获取实际收支项创删除插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetDeleteActivityMoneyFlowOpe(List<activitymoneyflowope> activityMoneyFlowOpes)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();

            if (activityMoneyFlowOpes == null || activityMoneyFlowOpes.Count < 1)
            {
                return list;
            }

            foreach (activitymoneyflowope _item in activityMoneyFlowOpes)
            {
                list.Add(GetDeleteActivityMoneyFlowOpe(_item));
            }
            return list;
        }

        #endregion
        #endregion

        #region 付款人员

        #region 业务
        /// <summary>
        /// 付款人员 键值对： id：成员表ID name:用户名字
        /// </summary>
        /// <param name="moneyFlowID"></param>
        /// <returns></returns>
        public string GetMoneyFlowPayerKeyValueByMoneyFlowID(string moneyFlowID)
        {
            List<activitymoneyflowpayer> _list = SelectActivityMoneyFlowPayerByMoneyFlowID(moneyFlowID);
            if (_list == null || _list.Count < 1)
                ReturnResultMessage(null);
            var value = from _item in _list
                        where _item != null
                        select new { id = _item.member_id, name = _item.member_name };
            return ReturnResultMessage(value);
        }

        #endregion

        public bool AddActivityMoneyFlowOpe(activitymoneyflowpayer activityMoneyFlowPayer)
        {
            return CommonExecuteNonQuery(GetInsertActivityMoneyFlowPayer(activityMoneyFlowPayer));
        }
        public List<activitymoneyflowpayer> SelectActivityMoneyFlowPayerByActivityID(string activityId)
        {
            return GetListModel<activitymoneyflowpayer>("activity_id", activityId, "SelectActivityMoneyFlowPayerByActivityID");
        }
        public List<activitymoneyflowpayer> SelectActivityMoneyFlowPayerByMoneyFlowID(string MoneyFlowID)
        {
            return GetListModel<activitymoneyflowpayer>("money_flow_id", MoneyFlowID, "SelectActivityMoneyFlowPayerByMoneyFlowID");
        }

        #region KeyValuePair
        /// <summary>
        /// 获取付款人创建插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertActivityMoneyFlowPayer(activitymoneyflowpayer activityMoneyFlowPayer)
        {
            if (activityMoneyFlowPayer == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activityMoneyFlowPayer.id))
            {
                activityMoneyFlowPayer.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitymoneyflowpayer>(ActivityConfigName, "InsertActivityMoneyFlowPayer", activityMoneyFlowPayer);
        }

        /// <summary>
        /// 获取付款人创建插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetInsertActivityMoneyFlowPayer(List<activitymoneyflowpayer> activityMoneyFlowPayers)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();

            if (activityMoneyFlowPayers == null || activityMoneyFlowPayers.Count < 1)
            {
                return list;
            }

            foreach (activitymoneyflowpayer _item in activityMoneyFlowPayers)
            {
                list.Add(GetInsertActivityMoneyFlowPayer(_item));
            }
            return list;
        }

        /// <summary>
        /// 获取付款人删除语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetDeleteActivityMoneyFlowPayer(activitymoneyflowpayer activityMoneyFlowPayer)
        {
            if (activityMoneyFlowPayer == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activityMoneyFlowPayer.id))
            {
                activityMoneyFlowPayer.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitymoneyflowpayer>(ActivityConfigName, "DeleteActivityMoneyFlowPayer", activityMoneyFlowPayer);
        }

        /// <summary>
        /// 获取付款人删除语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetDeleteActivityMoneyFlowPayer(List<activitymoneyflowpayer> activityMoneyFlowPayers)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();

            if (activityMoneyFlowPayers == null || activityMoneyFlowPayers.Count < 1)
            {
                return list;
            }

            foreach (activitymoneyflowpayer _item in activityMoneyFlowPayers)
            {
                list.Add(GetDeleteActivityMoneyFlowPayer(_item));
            }
            return list;
        }

        #endregion
        #endregion

        #region//搭车
        public bool AddAutoCarPool(autocarpool autoCarPool)
        {
            return CommonExecuteNonQuery(GetInsertAutoCarPool(autoCarPool));
        }
        public autocarpool SelectAutoCarPoolByActivityIdAndCarPoolId(string activityId,string carPoolId)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("active_id", activityId);
            _dic.Add("carpool_id", carPoolId);
            return GetModel<autocarpool>(_dic, "SelectAutoCarPoolByActivityIdAndCarPoolId");
        }
        public List<autocarpool> SelectAutoCarPoolByActivityIdAndOwnerId(string activityId, string OwnerId)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("active_id", activityId);
            _dic.Add("owner_id", OwnerId);
            return GetListModel<autocarpool>(_dic, "SelectAutoCarPoolByActivityIdAndOwnerId");
        }
        #endregion

        #region//活动分类
        public bool AddActivitycategory(activitycategory activitycategory)
        {
            return CommonExecuteNonQuery(GetInsertActivityCategory(activitycategory));
        }
        public bool AddActivitycategory(List<activitycategory> listActivityCategory)
        {
            List<KeyValuePair<string, DbParameter[]>> list = GetInsertActivityCategory(listActivityCategory);
            return this.CommonTransExecuteNonQuery(list);
        }
        public List<activitycategory> SelectActivitycategoryByActivityID(string activityId)
        {
            return GetListModel<activitycategory>("activity_id", activityId, "SelectActivitycategoryByActivityID");
        }
        #endregion

        #region//个人活动参数
        public bool AddPersonalActivityArchives(personalactivityarchives personalactivityarchives)
        {
            return CommonExecuteNonQuery(GetInsertPersonalActivityArchives(personalactivityarchives));
        }
        public List<personalactivityarchives> SelectPersonalActivityArchivesByActivityID(string activityId)
        {
            return GetListModel<personalactivityarchives>("activity_id", activityId, "SelectPersonalActivityArchivesByActivityID");
        }
        public string GetKeyValuePersonalActivityArchivesParam()
        {
            string user_id = GetCurrentUserID();

            IList<personalactivityarchives> list = this.GetListModel<personalactivityarchives>("user_id", user_id, "GetKeyValuePersonalActivityArchivesParam");
            if (list!=null)
            {
                var value = from item in list
                            where item != null
                            select new { id = item.activity_id, value = item.save_name };
                return ReturnResultMessage(value);
            }
            else
            {
                return ReturnResultMessage(null);
            }
            
        }
        public personalactivityarchives SelectPersonalActivityArchivesByID(string id)
        {
            return this.GetModel<personalactivityarchives>(id, "SelectPersonalActivityArchivesByID");
        }
        public int GetPersonalActivityArchivesCountByUserId(string user_id)
        {
            string value = GetFirstResult("user_id", user_id, "GetPersonalActivityArchivesCountByUserId",false);
            if (string.IsNullOrEmpty(value))
            {
                return 0;
            }
            else
            {
                int _count = 0;
                int.TryParse(value, out _count);
                return _count;
            }
        }
        public bool GetPersonalActivityArchivesRepeat(string user_id,string name)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("save_name", name);
            dic.Add("user_id", user_id);
            string value = GetFirstResult(dic, "GetPersonalActivityArchivesRepeat");
            if (string.IsNullOrEmpty(value))
            {
                return false ;
            }
            else
            {
                int _count = 0;
                int.TryParse(value, out _count);
                return _count>0;
            }
        }
        #endregion

        #region 用户个人活动设置

        public bool AddPersonalActivitySettings(personalactivitysettings _personalactivitysettings)
        {
            return CommonExecuteNonQuery(GetInsertPersonalActivitySettings(_personalactivitysettings));
        }

        public bool UpdatePersonalActivitySettings(personalactivitysettings _personalactivitysettings)
        {
            return CommonExecuteNonQuery(GetUpdatePersonalActivitySettings(_personalactivitysettings));
        }
        public personalactivitysettings GetPersonalActivitySettingsByActivityIDAndUserID(string _activityID, string _userID)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("activity_id", _activityID);
            dic.Add("user_id", _userID);
            return GetModel<personalactivitysettings>(dic, "GetPersonalActivitySettingsByActivityIDAndUserID");
        }

        public personalactivitysettings GetPersonalActivitySettingsByID(string _id)
        {
            return GetModel<personalactivitysettings>(_id, "GetPersonalActivitySettingsByID");
        }
        private PersonActivitySettingsJson GetPersonActivitySettingsJson(string _activityID, string _userID,ref string _message)
        {
            personalactivitysettings _setting = GetPersonalActivitySettingsByActivityIDAndUserID(_activityID, _userID);
            if (_setting == null)
            {
                _setting = new personalactivitysettings
                {
                    activity_id = _activityID,
                    user_id = _userID
                };

                if (!AddPersonalActivitySettings(_setting))
                {
                    _message = WanerDaoGlobalTip.GetInternationalizationTip("NotFindInfo");
                    return null;
                }
            }

            PersonActivitySettingsJson _settingJson = new PersonActivitySettingsJson
            {
                contact_email = _setting.contact_email,
                activity_id = _setting.activity_id,
                digest_duration = _setting.digest_duration,
                is_allow_msg = _setting.is_allow_msg,
                is_email_digest = _setting.is_email_digest,
                is_email_event = _setting.is_email_event,
                is_email_updates = _setting.is_email_updates,
                is_kick_protected = _setting.is_carpool_kick_protected,
                is_notice_digest = _setting.is_notice_digest,
                is_notice_event = _setting.is_notice_event,
                is_notice_updates = _setting.is_notice_updates,
                kick_carpool_duration = _setting.kick_carpool_duration,
                user_email = _setting.user_email,
                user_id = _setting.user_id,
                id = _setting.id
            };

            return _settingJson; 
        }
        private personalactivitysettings GetPersonalActivitySettings(PersonActivitySettingsJson _settingJson,ref string _message)
        {
            if (_settingJson == null)
            {
                _message = WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn");
                return null;
            }
            personalactivitysettings _setting = new personalactivitysettings
            {
                contact_email = _settingJson.contact_email,
                activity_id = _settingJson.activity_id,
                digest_duration = _settingJson.digest_duration,
                is_allow_msg = _settingJson.is_allow_msg,
                is_email_digest = _settingJson.is_email_digest,
                is_email_event = _settingJson.is_email_event,
                is_email_updates = _settingJson.is_email_updates,
                is_carpool_kick_protected = _settingJson.is_kick_protected,
                is_notice_digest = _settingJson.is_notice_digest,
                is_notice_event = _settingJson.is_notice_event,
                is_notice_updates = _settingJson.is_notice_updates,
                kick_carpool_duration = _settingJson.kick_carpool_duration,
                user_email = _settingJson.user_email,
                user_id = _settingJson.user_id,
                id = _settingJson.id,
                active=true
            };
            return _setting;
        }
        #endregion

        #region 例外名单

        public bool AddActivityMsgExceptionList(activitymsgexceptionlist _activitymsgexceptionlist)
        {
            return CommonExecuteNonQuery(GetInsertActivityMsgExceptionList(_activitymsgexceptionlist));
        }

        public bool DeleteActivityMsgExceptionList(activitymsgexceptionlist _activitymsgexceptionlist)
        {
            return CommonExecuteNonQuery(GetDeleteActivityMsgExceptionList(_activitymsgexceptionlist));
        }
        public List<activitymsgexceptionlist> GetActivityMsgExceptionListByActivityIDAndUserID(string _activityID, string _userID)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("activity_id", _activityID);
            dic.Add("user_id", _userID);
            return GetListModel<activitymsgexceptionlist>(dic, "GetActivityMsgExceptionListByActivityIDAndUserID");
        }
        private List<PersonJson> GetPersonJsonList(string _activityID, string _userID)
        {
            List<activitymsgexceptionlist> _listMsg = GetActivityMsgExceptionListByActivityIDAndUserID(_activityID, _userID);

            if (_listMsg == null || _listMsg.Count < 1)
            {
                return null;
            }

            var _list = from _item in _listMsg
                       where _item != null
                       select new PersonJson
                       {
                           id = _item.user_id,
                           name = _item.special_name
                       };

            return _list.ToList();
        }

        private bool GetActivityMsgExceptionListUpdate(PersonActivitySettingsJson _settingJson, ref string _message, ref List<activitymsgexceptionlist> _addList, ref  List<activitymsgexceptionlist> _deleteList)
        {
            if (_settingJson == null || _settingJson.persons==null||_settingJson.persons==null)
            {
                return true ;
            }
            List<activitymsgexceptionlist> _havinigList = GetActivityMsgExceptionListByActivityIDAndUserID(_settingJson.activity_id, _settingJson.user_id);
            if (_havinigList == null)
            {
                _havinigList = new List<activitymsgexceptionlist>();
                _deleteList = null;
            }
            else
            {
                var _listD = from _item in _havinigList
                            where (!_settingJson.persons.Exists(i => i.id == _item.special_id))
                            select _item;
                _deleteList= _listD.ToList();
            }

            var _listA = from _item in _settingJson.persons
                         where (!_havinigList.Exists(i => i.special_id == _item.id))
                        select new activitymsgexceptionlist
                        {
                            active = true,
                            activity_id = _settingJson.activity_id,
                            special_id = _item.id,
                            user_id = _settingJson.user_id,
                            special_name = _item.name
                        };
            _addList = _listA.ToList();

            return true;
        }
        #endregion

        #region //角色
        public string SelectRoleNameById(string id)
        {
            return GetFirstResult(id, "SelectRoleNameById",true);
        }

        public activityrole SelectActivityRoleById(string id)
        {
            return GetModel<activityrole>(id, "SelectActivityRoleById",true);
        }
        public List<activityrole> SelectAllActivityRole()
        {
            return GetListModel<activityrole>( "SelectAllActivityRole", true);
        }
        public string GetKeyValueJsonAllActivityRole()
        {
            string json = string.Empty;
            List<activityrole> list = SelectAllActivityRole();
            if (list == null)
            {
                ReturnResultMessage(null);
            }
            var value = from item in list
                        where item != null
                        select new { id = item.id, value=item.role_name };
            return ReturnResultMessage(value);
        }
        #endregion

        #region//报名方式
        public string SelectSignUpTypeNameById(string id)
        {
            return GetFirstResult(id, "SelectSignUpTypeNameById",true);
        }
        public activitysignuptype SelectSignUpTypeById(string id)
        {
            return GetModel<activitysignuptype>(id, "SelectSignUpTypeById",true);
        }

        public List<activitysignuptype> SelectAllSignUpType()
        {
            return GetListModel<activitysignuptype>( "SelectAllSignUpType", true);
        }
        public string GetKeyValueJsonAllSignUpType()
        {
            string json = string.Empty;
            List<activitysignuptype> list = SelectAllSignUpType();
            if (list == null)
            {
                return ReturnResultMessage(null);
            }
            var value = from item in list
                        where item != null
                        select new { id = item.id, value = item.type_name };
            return ReturnResultMessage(value);
        }
        #endregion

        #region 踢人保护
        /// <summary>
        /// 踢人保护时限  ActivityKickDuration
        /// </summary>
        /// <returns></returns>
        public string GetkeyvalueActivityKickDuration()
        {
            List<activitykickduration> list = SelectAllActivityKickDuration();
            var value = from item in list
                        where item != null
                        select new {  name = item.duration_name, id = item.unit_hour };//id = item.id,
            return ReturnResultMessage(value);
        }
        public List<activitykickduration> SelectAllActivityKickDuration()
        {
            return GetListModel<activitykickduration>("SelectAllActivityKickDuration", true);
        }

        public activitykicklist SelectActivityKickListByActivityIDAndUserID(string activityID,string userID)
        {
            Dictionary<string,object> dic=new Dictionary<string,object>();
            dic.Add("active_id", activityID);
            dic.Add("user_id", userID);
            return GetModel<activitykicklist>(dic,"SelectActivityKickListByActivityIDAndUserID",true);
        }

        #endregion

        #region  个人信息

        #region 用户地址
        public string GetUserAddressInfo()
        {
            IWanerDaoPersonInfoManager IPersonInfo =
                   new WanerDaoBLL.Person.WanerDaoPersonInfoManager();
            PersonalProfileModel m_ppModel = IPersonInfo.GetPersonalProfileModel();
            if (m_ppModel != null)
            {
                var _address = new
                {
                    address = m_ppModel.current_address,
                    country_id = m_ppModel.current_country_id,
                    country_name = SelectCountryNameByCountryId(m_ppModel.current_country_id),
                    state_id = m_ppModel.current_state_id,
                    state_name = SelectStateNameByStateId(m_ppModel.current_state_id),
                    city_id = m_ppModel.current_city_id,
                    city_name = SelectCityNameByCityId(m_ppModel.current_city_id),
                    zip = m_ppModel.current_zip
                };
                return  ReturnResultMessage(_address);
            }
            return ReturnResultMessage(null);
        }
        public string SetUserAddressInfo(Dictionary<string, object> dic)
        {

            IWanerDaoPersonInfoManager IPersonInfo =
                   new WanerDaoBLL.Person.WanerDaoPersonInfoManager();
            PersonalProfileModel m_ppModel = IPersonInfo.GetPersonalProfileModel();
            if (m_ppModel == null)
            {
                return WanerDaoJSON.GetFailJson(WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn"));
            }
            if (!string.IsNullOrEmpty(GetDicValue("address", dic)))
            {
                m_ppModel.current_address = GetDicValue("address", dic);
            }
            if (!string.IsNullOrEmpty(GetDicValue("country_id", dic)))
            {
                m_ppModel.current_country_id = GetDicValue("country_id", dic);
            }
            if (!string.IsNullOrEmpty(GetDicValue("state_id", dic)))
            {
                m_ppModel.current_state_id = GetDicValue("state_id", dic);
            }
            if (!string.IsNullOrEmpty(GetDicValue("city_id", dic)))
            {
                m_ppModel.current_city_id = GetDicValue("city_id", dic);
            }
            if (!string.IsNullOrEmpty(GetDicValue("zip", dic)))
            {
                m_ppModel.current_zip = GetDicValue("zip", dic);
            }
            if (IPersonInfo.UpdatePersonalProfile(m_ppModel))
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetFailJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
            }
        }
        public string SetUserContactInfo(Dictionary<string, object> dic)
        {
            IWanerDaoPersonInfoManager IPersonInfo =
                   new WanerDaoBLL.Person.WanerDaoPersonInfoManager();
            PersonalContactModel m_ppModel = IPersonInfo.GetPersonalContactModel(GetCurrentUserID());
            if (m_ppModel == null)
            {
                return WanerDaoJSON.GetFailJson(WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn"));
            }
            if (!string.IsNullOrEmpty(GetDicValue("email", dic)))
            {
                m_ppModel.email = GetDicValue("email", dic);
            }
            if (!string.IsNullOrEmpty(GetDicValue("phone", dic)))
            {
                m_ppModel.cell = GetDicValue("phone", dic);
            }           
            if (IPersonInfo.UpdatePersonalContact(m_ppModel))
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetFailJson(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
            }
        }
        #endregion

        public PersonalProfileModel SelectPersonalProfileModelByUserId(string userID)
        {
            IWanerDaoPersonInfoManager IPersonInfo =
                   new WanerDaoBLL.Person.WanerDaoPersonInfoManager();
            PersonalProfileModel m_ppModel = IPersonInfo.GetPersonalProfileModel(userID);
            return m_ppModel;
        }
        public string GetCurrentUserID()
        {
//#if DEBUG
//            return "11111";
//#endif 
            WanerDaoPersonSecurity ws = new WanerDaoPersonSecurity();
            return CommonContext.GetUserSecurityInfo() != null ? CommonContext.GetUserSecurityInfo().user_id : "1111";
        }
        #endregion

        #region 活动地址类型
        /// <summary>
        /// 活动地址类型  ActivityPlaceCategory
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public activityplacecategory SelectActivityPlaceCategoryByID(string id)
        {
            List<activityplacecategory> list = SelectAllActivityPlaceCategory();
            if (list != null && list.Count > 0)
            {
                return list.Find(i => i.id == id);
            }
            return null;
        }
        public List<activityplacecategory> SelectActivityPlaceCategoryTop()
        {
            List<activityplacecategory> list = SelectAllActivityPlaceCategory();
            if (list != null && list.Count > 0)
            {
                return list.FindAll(i => i.parent == null);
            }
            return null;
        }
        public activityplacecategory SelectActivityPlaceCategoryParent(string id)
        {
            List<activityplacecategory> list = SelectAllActivityPlaceCategory();
            if (list != null && list.Count > 0)
            {
                activityplacecategory item = list.Find(i => i.id == id);
                return item == null ? null : item.parent;
            }
            return null;
        }
        public string ConvertActivityPlaceCategoryToJson(List<activityplacecategory> _list)
        {
            string json = string.Empty;
            if (_list != null)
            {
                var _varChildList = from _item in _list
                                    where _item != null
                                    select new
                                    {
                                        id = _item.id,
                                        category_name = _item.category_name,
                                        parent_id = _item.parent_id,
                                        istop = _item.istop,
                                        isbottom = _item.isbottom
                                    };
                json = ReturnResultMessage(_varChildList);

            }
            else
            {
                json = ReturnResultMessage(null);
            }
            return json;
        }
        public List<activityplacecategory> SelectActivityPlaceCategoryUpperLayer(string id)
        {
            if (string.IsNullOrEmpty(id) || id == "-1")
            {
                return SelectActivityPlaceCategoryTop();
            }
            List<activityplacecategory> list = SelectAllActivityPlaceCategory();
            if (list != null && list.Count > 0)
            {
                activityplacecategory item = list.Find(i => i.id == id);
                item = item.parent;
                return item == null ? SelectActivityPlaceCategoryTop() : item.child;
            }
            return null;
        }
        public List<activityplacecategory> SelectActivityPlaceCategoryChild(string id)
        {
            if (string.IsNullOrEmpty(id) || id=="-1")
            {
                return SelectActivityPlaceCategoryTop();
            }
            List<activityplacecategory> list = SelectAllActivityPlaceCategory();
            if (list != null && list.Count > 0)
            {
                activityplacecategory item = list.Find(i => i.id == id);
                return item == null ? null : item.child;
            }
            return null;
        }
        public List<activityplacecategory> SelectAllActivityPlaceCategory()
        {
            if (!ics.ObjectIsExist(key_ActivityPlaceCategoryName))
            {
                lock (objLock)
                {
                    if (!ics.ObjectIsExist(key_ActivityPlaceCategoryName))
                    {
                        List<activityplacecategory> list = GetListModel<activityplacecategory>( "SelectAllActivityPlaceCategory", false);
                        if (list != null && list.Count > 1)
                        {
                            foreach (activityplacecategory item_f in list)
                            {
                                if (item_f == null)
                                    continue;
                                activityplacecategory parent = list.Find(i => i.id == item_f.parent_id && i.language_id == item_f.language_id);
                                if (parent != null)
                                {
                                    item_f.parent = parent;
                                    item_f.istop = false;
                                }
                                else
                                {
                                    item_f.istop = true;
                                }
                                var child = from item in list
                                            where item != null && item.parent_id == item_f.id && item.language_id == item_f.language_id
                                            select item;
                                if (child != null && child.ToList().Count > 0)
                                {
                                    item_f.child = child.ToList();
                                    item_f.isbottom = false;
                                }
                                else
                                {
                                    item_f.isbottom = true;
                                }

                            }
                        }
                        ics.AddObject(key_ActivityPlaceCategoryName, list);
                    }
                }
            }
            List<activityplacecategory> _list= ics.RetrieveObject(key_ActivityPlaceCategoryName) as List<activityplacecategory>;
            if (_list == null)
            {
                return null;
            }
            return _list.FindAll(i => i.language_id == LanguageGuid);

        }
        #endregion

        #region 活动地
        public string GetActivityPlaceByCategoryID(string categoryId)
        {
            activityplacecategory _activityplacecategory=SelectActivityPlaceCategoryByID(categoryId);
            string categoryTableName = _activityplacecategory == null ? "" : _activityplacecategory.map_table;
            if(string.IsNullOrEmpty(categoryTableName))
            {
                return ReturnResultMessage(null);
            }
            Dictionary<string, object> _DBdic = new Dictionary<string, object>();
            _DBdic.Add("language_id", LanguageGuid);
            Dictionary<string, string> _replaceDic = new Dictionary<string, string>();
            _replaceDic.Add("?placetablename", categoryTableName);
            return DBAccess.GetDataTableJson(ActivityConfigName, "SelectAllActivityPlace", _replaceDic, _DBdic);
        }
        #endregion

        #region 活动分类参数 ActivityCategorySettings

        /// <summary>
        /// 活动分类  ActivityCategorySettings
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public activitycategorysettings SelectActivityCategorySettingsByID(string id)
        {
            List<activitycategorysettings> list = SelectAllActivityCategorySettings();
            if (list != null && list.Count > 0)
            {
                return list.Find(i => i.id == id);
            }
            return null;
        }
        public List<activitycategorysettings> SelectActivityCategorySettingsTop()
        {
            List<activitycategorysettings> list = SelectAllActivityCategorySettings();
            if (list != null && list.Count > 0)
            {
                return list.FindAll(i => i.parent == null);
            }
            return null;
        }
        public activitycategorysettings SelectActivityCategorySettingsParent(string id)
        {
            List<activitycategorysettings> list = SelectAllActivityCategorySettings();
            if (list != null && list.Count > 0)
            {
                activitycategorysettings item = list.Find(i => i.id == id);
                return item == null ? null : item.parent;
            }
            return null;
        }
        public string ConvertActivityCategorySettingsToJson(List<activitycategorysettings> _list)
        {
            string json = string.Empty;
            if (_list != null)
            {
                var _varChildList = from _item in _list
                                    where _item != null
                                    select new
                                    {
                                        id = _item.id,
                                        category_name = _item.category_name,
                                        parent_id = _item.parent_id,
                                        istop = _item.istop,
                                        isbottom = _item.isbottom
                                    };
                json = ReturnResultMessage(_varChildList);

            }
            else
            {
                json = ReturnResultMessage(null);
            }
            return json;
        }
        public List<activitycategorysettings> SelectActivityCategorySettingsUpperLayer(string id)
        {
            if (string.IsNullOrEmpty(id) || id == "-1")
            {
                return SelectActivityCategorySettingsTop();
            }
            List<activitycategorysettings> list = SelectAllActivityCategorySettings();
            if (list != null && list.Count > 0)
            {
                activitycategorysettings item = list.Find(i => i.id == id);
                item = item.parent;
                return item == null ? SelectActivityCategorySettingsTop() : item.child;
            }
            return null;
        }
        //--------------------
        public List<activitycategorysettings> SelectActivityCategorySettingsChild(string id)
        {
            if (string.IsNullOrEmpty(id) || id == "-1")
            {
                return SelectActivityCategorySettingsTop();
            }
            List<activitycategorysettings> list = SelectAllActivityCategorySettings();
            if (list != null && list.Count > 0)
            {
                activitycategorysettings item = list.Find(i => i.id == id);
                return item == null ? null : item.child;
            }
            return null;
        }
        public List<activitycategorysettings> SelectAllActivityCategorySettings()
        {
            if (!ics.ObjectIsExist(key_ActivityCategorySettingsName))
            {
                lock (objLock)
                {
                    if (!ics.ObjectIsExist(key_ActivityCategorySettingsName))
                    {
                        List<activitycategorysettings> list = GetListModel<activitycategorysettings>("SelectAllActivityCategorySettings", false);
                        if (list != null && list.Count > 1)
                        {
                            foreach (activitycategorysettings item_f in list)
                            {
                                if (item_f == null)
                                    continue;
                                activitycategorysettings parent = list.Find(i => i.id == item_f.parent_id && i.language_id == item_f.language_id);
                                if (parent != null)
                                {
                                    item_f.parent = parent;
                                    item_f.istop = false;
                                }
                                else
                                {
                                    item_f.istop = true;
                                }
                                var child = from item in list
                                            where item != null && item.parent_id == item_f.id && item.language_id == item_f.language_id
                                            select item;
                                if (child != null && child.ToList().Count > 0)
                                {
                                    item_f.child = child.ToList();
                                    item_f.isbottom = false;
                                }
                                else
                                {
                                    item_f.isbottom = true;
                                }

                            }
                        }
                        ics.AddObject(key_ActivityCategorySettingsName, list);
                    }
                }
            }
            List<activitycategorysettings> _list = ics.RetrieveObject(key_ActivityCategorySettingsName) as List<activitycategorysettings>;
            if (_list == null)
            {
                return null;
            }
            return _list.FindAll(i => i.language_id == LanguageGuid);

        }

        #endregion

        #region//活动页面分类 activitysectionpage
        public activitysectionpage SelectActivitySectionPageByID(string id)
        {
            return GetModel<activitysectionpage>(id, "SelectActivitySectionPageByID", true);
        }
        #endregion

        #region 其他查询
        public string SelectCityNameByCityId(string cityID)
        {
            return GetFirstResult("city_id", cityID, "SelectCityNameByCityId",false);
        }
        public string SelectCityEnglishNameByCityId(string cityID)
        {
            return GetFirstResult("city_id", cityID, "SelectCityEnglishNameByCityId", false);
        }
        public string SelectCountryNameByCountryId(string country_id)
        {
            return GetFirstResult("country_id", country_id, "SelectCountryNameByCountryId", true);
        }
        public string SelectStateNameByStateId(string state_id)
        {
            return GetFirstResult("state_id", state_id, "SelectStateNameByStateId", false);
        }
        #endregion

        #region 活动创建报名其它键值信息 json
        /// <summary>
        /// 活动创建个人信息 
        /// </summary>
        /// <returns></returns>
        public string GetCreateactivityPersonalinfo()
        {
            string userid = GetCurrentUserID();
            PersonalProfileModel _personModel = this.SelectPersonalProfileModelByUserId(userid);
            if (_personModel == null)
                _personModel = new PersonalProfileModel();
            WanerDaoPersonInfoManager _personInfoBll = new WanerDaoPersonInfoManager();
            PersonalContactModel _personInfoModel = _personInfoBll.GetPersonalContactModel(userid);
            if (_personInfoModel == null)
                _personInfoModel = new PersonalContactModel();

            var value = new { id = userid, name = _personModel.name, gender = _personModel.gender, email = _personInfoModel.email, phone = _personInfoModel.cell, address = _personModel.current_address, distinctid = _personModel.current_distinct_id, zip = _personModel.current_zip, countryid = _personModel.current_country_id, stateid = _personModel.current_state_id, cityid = _personModel.current_city_id };
            return ReturnResultMessage(value);
        }
        /// <summary>
        /// 发起活动者类型 圈子或者个人  ActivityCreateType
        /// </summary>
        /// <returns></returns>
        public string GetActivityCreateType()
        {
            string json = string.Empty;
            List<activitycreatetype> list = SelectAllActivityCreateType();
            if (list == null)
            {
                return ReturnResultMessage(null);
            }
            var value = from item in list
                        where item != null
                        select new { id = item.id, value = item.type_name };
            return ReturnResultMessage(value);
        }
        public List<activitycreatetype> SelectAllActivityCreateType()
        {
            return GetListModel<activitycreatetype>("SelectAllActivityCreateType", true);
        }

        /// <summary>
        /// 以圈子名义发起活动获取圈子
        /// </summary>
        /// <returns></returns>
        public string GetkevaluecreateActivitybygroup() 
        {
            DataTable dt = new WanerDaoGroup().SelectAllGroupForActivity(GetCurrentUserID());
            //var value = new List<object> { new { id = "id1", value = "圈子1" }, new { id = "id2", value = "圈子2" } };
            return ReturnResultMessage(dt);
        }
        /// <summary>
        /// 活动周期定制  1: 一次性（默认） 2:订制固定周期 3:订制浮动周期
        /// </summary>
        /// <returns></returns>
        public string GetkeyvalueActivityduration()
        {
            var value = new List<object> { 
                new { id = "1", value = "一次性" }, 
                new { id = "2", value = "订制固定周期" },
                new { id = "3", value = "订制浮动周期" }
            };
            return ReturnResultMessage(value);
        }
        /// <summary>
        /// 间隔周期 每天，每周（默认），每月，每季度，每年
        /// </summary>
        /// <returns></returns>
        public string GetkeyvalueActivityIntervalDuration()
        {
            var value = new List<object> { 
                new { id = "2", value = "每周" },
                new { id = "1", value = "每天" }, 
                new { id = "3", value = "每月" },
                new { id = "4", value = "每季度" }, 
                new { id = "5", value = "每年" }
            };
            return ReturnResultMessage(value);
        }
        /// <summary>
        /// 创建形式 直接创建活动（默认）、通知创建人同意后，活动创建
        /// </summary>
        /// <returns></returns>
        public string GetkeyvalueCreateMode()
        {
            var value = new List<object> { 
                new { id = "1", value = "直接创建活动" }, 
                new { id = "2", value = "通知创建人同意后" }
            };
            return ReturnResultMessage(value);
        }
        /// <summary>
        /// 发送email周期性  ActivityEmailDuration
        /// </summary>
        /// <returns></returns>
        public string GetActivityEmailDuration()
        {
            string json = string.Empty;
            List<activityemailduration> list = SelectAllActivityEmailDuration();
            if (list == null)
            {
                return ReturnResultMessage(null);
            }
            var value = from item in list
                        where item != null
                        select new { name = item.duration_name, id = item.unit_hour };//id = item.id,
            return ReturnResultMessage(value);
        }

        public List<activityemailduration> SelectAllActivityEmailDuration()
        {
            return GetListModel<activityemailduration>( "SelectAllActivityEmailDuration", true);
        }
        
        #endregion

        #region 获取活动基础配置信息

        #region 交通方式

        public string SelectVehicleTypeNameById(string id)
        {
            return GetFirstResult(id, "SelectVehicleTypeNameById",true);
        }

        public activityvehicletype SelectVehicleTypeById(string id)
        {
            return GetModel<activityvehicletype>(id, "SelectVehicleTypeById",true);
        }

        public List<activityvehicletype> SelectAllVehicleType()
        {
            return GetListModel<activityvehicletype>("SelectAllVehicleType", true);
        }
        public string GetKeyValueJsonAllVehicleType()
        {
            string json = string.Empty;
            List<activityvehicletype> list = SelectAllVehicleType();
            if (list == null)
            {
                return ReturnResultMessage(null);
            }
            var value = from item in list
                        where item != null
                        select new { id = item.id, value = item.type_name };
            return ReturnResultMessage(value);
        }
        #endregion

        #region 支付方式
        public string SelectPayTypeNameById(string id)
        {
            return GetFirstResult(id, "SelectPayTypeNameById",true);
        }

        public paytype SelectPayTypeById(string id)
        {
            return GetModel<paytype>(id, "SelectPayTypeById",true);
        }

        public List<paytype> SelectAllPayType()
        {
            return GetListModel<paytype>(ActivityConfigName, "SelectAllPayType",true) as List<paytype>;
        }
        public string GetKeyValueJsonAllPayType()
        {
            string json = string.Empty;
            List<paytype> list = SelectAllPayType();
            if (list == null)
            {
                return ReturnResultMessage(null);
            }
            var value = from item in list
                        where item != null
                        select new { id = item.id, value = item.type_name, description=item.description };
            return ReturnResultMessage(value);
        }
        #endregion

        #region 搭车付费类型
        public string SelectCarPoolTypeNameById(string id)
        {
            return GetFirstResult(id, "SelectCarPoolTypeNameById",true);
        }

        public carpooltype SelectCarPoolTypeById(string id)
        {
            return GetModel<carpooltype>(id, "SelectCarPoolTypeById",true);
        }

        public List<carpooltype> SelectAllCarPoolType()
        {
            return GetListModel<carpooltype>("SelectAllCarPoolType", true);
        }
        public string GetKeyValueJsonAllCarPoolType()
        {
            string json = string.Empty;
            List<carpooltype> list = SelectAllCarPoolType();
            if (list == null)
            {
                return ReturnResultMessage(null);
            }
            var value = from item in list
                        where item != null
                        select new { id = item.id, value = item.type_name };
            return ReturnResultMessage(value);
        }
        #endregion

        #region 汽车品牌信息
        public string SelectAutoBrandNameById(string id)
        {
            return GetFirstResult(id, "SelectAutoBrandNameById",true);
        }
        public autobrand SelectAutoBrandById(string id)
        {
            return GetModel<autobrand>(id, "SelectAutoBrandById",true);
        }
        public List<autobrand> SelectAllAutoBrand()
        {
            return GetListModel<autobrand>("SelectAllAutoBrand", true);
        }
        public string GetKeyValueJsonAllAutoBrand()
        {
            string json = string.Empty;
            List<autobrand> list = SelectAllAutoBrand();
            if (list == null)
            {
                return ReturnResultMessage(null);
            }
            var value = from item in list
                        where item != null
                        select new { id = item.id, value = item.brand_name };
            return ReturnResultMessage(value);
        }
        #endregion

        #region 汽车型号
        public string SelectAutoModelNameById(string id)
        {
            return GetFirstResult(id, "SelectAutoModelNameById",true);
        }
        public automodel SelectAutoModelById(string id)
        {
            return GetModel<automodel>(id, "SelectAutoModelById",true);
        }
        public List<automodel> SelectAllAutoModelByBrandId(string id)
        {
            return GetListModel<automodel>("brand_id",id, "SelectAllAutoModelByBrandId",true);
        }
        public string GetKeyValueJsonAllAutoModelByBrandId(string id)
        {
            string json = string.Empty;
            List<automodel> list = SelectAllAutoModelByBrandId(id);
            if (list == null)
            {
                return ReturnResultMessage(null);
            }
            var value = from item in list
                        where item != null
                        select new { id = item.id, value = item.model_name };
            return ReturnResultMessage(value);
        }
        public List<automodel> SelectAllAutoModel()
        {
            return GetListModel<automodel>( "SelectAllAutoModel", true);
        }
        public string GetKeyValueJsonAllAutoModel()
        {
            string json = string.Empty;
            List<automodel> list = SelectAllAutoModel();
            if (list == null)
            {
                return ReturnResultMessage(null);
            }
            var value = from item in list
                        where item != null
                        select new { id = item.id, value = item.model_name };
            return ReturnResultMessage(value);
        }
        #endregion

        #region 加入条件
        public string SelectJoinConditionsNameById(string id)
        {
            return GetFirstResult(id, "SelectJoinConditionsNameById",true);
        }
        public joinconditions SelectJoinConditionsById(string id)
        {
            return GetModel<joinconditions>(id, "SelectJoinConditionsById",true);
        }
        public List<joinconditions> SelectAllJoinConditions()
        {
            return GetListModel<joinconditions>("SelectAllJoinConditions",true);
        }
        public string GetKeyValueJsonAllJoinConditions()
        {
            string json = string.Empty;
            List<joinconditions> list = SelectAllJoinConditions();
            if (list == null)
            {
                return ReturnResultMessage(null);
            }
            var value = from item in list
                        where item != null
                        select new { id = item.id, value = item.condition_name };
            return ReturnResultMessage(value);
        }
        #endregion

        #region 邮件发送周期
        public string SelectActivityemaildurationNameById(string id)
        {
            return GetFirstResult(id, "SelectActivityemaildurationNameById",true);
        }
        public activityemailduration SelectActivityemaildurationById(string id)
        {
            return GetModel<activityemailduration>(id, "SelectActivityemaildurationById",true);
        }
        public List<activityemailduration> SelectAllActivityemailduration()
        {
            return GetListModel<activityemailduration>("SelectAllJoinConditions", true) ;
        }
        public string GetKeyValueJsonAllActivityemailduration()
        {
            string json = string.Empty;
            List<activityemailduration> list = SelectAllActivityemailduration();
            if (list == null)
            {
                return ReturnResultMessage(null);
            }
            var value = from item in list
                        where item != null
                        select new { id = item.id, value = item.duration_name };
            return ReturnResultMessage(value);
        }
        #endregion

        #region 踢人保护时限
        public string SelectActivitykickdurationNameById(string id)
        {
            return GetFirstResult(id, "SelectActivitykickdurationNameById",true);
        }
        public activitykickduration SelectActivitykickdurationsById(string id)
        {
            return GetModel<activitykickduration>(id, "SelectActivitykickdurationById",true);
        }
        public List<activitykickduration> SelectAllActivitykickdurations()
        {
            return GetListModel<activitykickduration>("SelectAllActivitykickduration", true);
        }
        public string GetKeyValueJsonAllActivitykickdurations()
        {
            string json = string.Empty;
            List<activitykickduration> list = SelectAllActivitykickdurations();
            if (list == null)
            {
                return ReturnResultMessage(null);
            }
            var value = from item in list
                        where item != null
                        select new { id = item.unit_hour, value = item.duration_name };
            return ReturnResultMessage(value);
        }
        #endregion
        #endregion


        #region private

        #region 根据某列获值取数据
        /// <summary>
        /// 获取单个模型
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <param name="sqlKey"></param>
        /// <returns></returns>
        private T GetModel<T>(object value, string sqlKey) where T : class
        {
            return this.GetModel<T>("id", value,sqlKey);
        }
        private T GetModel<T>(object value, string sqlKey, bool isByLanguage) where T : class
        {
            return this.GetModel<T>("id", value, sqlKey, isByLanguage);
        }
        private T GetModel<T>(string name, object value, string sqlKey) where T : class
        {
            return GetModel<T>(name, value, sqlKey, false);
        }
        private T GetModel<T>(string name, object value, string sqlKey, bool isByLanguage) where T : class
        {
            IList<T> list = GetListModel<T>(name, value, sqlKey, isByLanguage);
            if (list == null || list.Count < 1)
            {
                return null;
            }
            return list[0];
        }
        private T GetModel<T>(Dictionary<string, object> dic, string sqlKey) where T : class
        {
            return  GetModel<T>( dic,  sqlKey,false);
        }
        private T GetModel<T>(Dictionary<string, object> dic, string sqlKey, bool isByLanguage) where T : class
        {
            if (isByLanguage)
            {
                dic.Add("language_id", LanguageGuid);
            }
            IList<T> list = GetListModel<T>(dic, sqlKey);
            if (list == null || list.Count < 1)
            {
                return null;
            }
            return list[0];
        }

        /// <summary>
        /// 获取多个模型
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <param name="sqlKey"></param>
        /// <returns></returns>
        private List<T> GetListModel<T>(object value, string sqlKey) where T : class
        {
            return this.GetListModel<T>("id", value, sqlKey);
        }
        private List<T> GetListModel<T>(object value, string sqlKey, bool isByLanguage) where T : class
        {
            return this.GetListModel<T>("id", value, sqlKey, isByLanguage);
        }
        private List<T> GetListModel<T>(string name, object value, string sqlKey) where T : class
        {
            return GetListModel<T>(name, value, sqlKey,false);
        }
        private List<T> GetListModel<T>(string sqlKey, bool isByLanguage) where T : class
        {
            if (!isByLanguage)
            {
                return  DBAccess.GetGenericModel<T>(ActivityConfigName, sqlKey) as List<T>;
            }
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("language_id", LanguageGuid);
            return DBAccess.GetGenericModel<T>(ActivityConfigName, sqlKey, dic) as List<T>;
        }
        private List<T> GetListModel<T>(string name, object value, string sqlKey, bool isByLanguage) where T : class
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add(name, value);
            if (isByLanguage)
            {
                dic.Add("language_id", LanguageGuid);
            }
            return GetListModel<T>(dic, sqlKey) as List<T>;
        }
        private List<T> GetListModel<T>(Dictionary<string, object> dic, string sqlKey) where T : class
        {
            return GetListModel<T>(dic, sqlKey, false);
        }
        private List<T> GetListModel<T>(Dictionary<string, object> dic, string sqlKey, bool isByLanguage) where T : class
        {
            if (isByLanguage)
            {
                dic.Add("language_id", LanguageGuid);
            }
            return DBAccess.GetGenericModel<T>(ActivityConfigName, sqlKey, dic) as List<T>;
        }
        /// <summary>
        /// 获取DataTable
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <param name="sqlKey"></param>
        /// <returns>DataTable</returns>
        private DataTable GetDataTable(object value, string sqlKey)
        {
            return GetDataTable(value, sqlKey, false);
        }
        private DataTable GetDataTable(object value, string sqlKey, bool isByLanguage)
        {
            return this.GetDataTable("id", value, sqlKey, isByLanguage);
        }
        private DataTable GetDataTable(string name, object value, string sqlKey)
        {
            return  GetDataTable( name,  value,  sqlKey,false);
        }
        private DataTable GetDataTable(string name, object value, string sqlKey, bool isByLanguage)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add(name, value);
            return GetDataTable(dic, sqlKey, isByLanguage);
        }
        private DataTable GetDataTable(Dictionary<string,object> dic, string sqlKey, bool isByLanguage)
        {
            if (isByLanguage)
            {
                dic.Add("language_id", LanguageGuid);
            }
            return DBAccess.GetDataTableBasedOnSql(ActivityConfigName, sqlKey, dic);
        }

        // json
        private string GetDataJosn(string sqlKey, bool isByLanguage)
        {
            if (!isByLanguage)
            {
                return DBAccess.GetDataTable(ActivityConfigName, sqlKey);
            }
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("language_id", LanguageGuid);
            return DBAccess.GetDataTable(ActivityConfigName, sqlKey, dic);
        }
        private string GetDataJosn(string name, object value, string sqlKey, bool isByLanguage)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add(name, value);
            return GetDataJosn(dic, sqlKey, isByLanguage);
        }
        private string GetDataJosn(Dictionary<string, object> dic, string sqlKey, bool isByLanguage)
        {
            if (isByLanguage)
            {
                dic.Add("language_id", LanguageGuid);
            }
            return DBAccess.GetDataTable(ActivityConfigName, sqlKey, dic);
        }
        /// <summary>
        /// 根据ID获取多行Dictionary集合数据，每Dictionary代表一行数据
        /// </summary>
        /// <param name="value">值</param>
        /// <param name="sqlKey">语句配置ID</param>
        /// <returns>List</returns>
        private List<Dictionary<string, object>> GetDictionary(object value, string sqlKey)
        {
            return this.GetDictionary("id", value, sqlKey);
        }
        /// <summary>
        /// 根据某列值获取多行Dictionary集合数据，每Dictionary代表一行数据
        /// </summary>
        /// <param name="name"></param>
        /// <param name="value">值</param>
        /// <param name="sqlKey">语句配置ID</param>
        /// <returns></returns>
        private List<Dictionary<string, object>> GetDictionary(string name, object value, string sqlKey)
        {
            List<Dictionary<string, object>> listRow= WanerDaoUtils.DataTableToList(GetDataTable(name, value, sqlKey));
            return listRow;
        }
        /// <summary>
        /// 根据ID获得首行第一个值
        /// </summary>
        /// <param name="value">值</param>
        /// <param name="sqlKey">语句配置ID</param>
        /// <returns></returns>
        private string GetFirstResult(object value, string sqlKey)
        {
            return this.GetFirstResult("id", value, sqlKey,false);
        }
        private string GetFirstResult(object value, string sqlKey, bool isByLanguage)
        {
            return this.GetFirstResult("id", value, sqlKey, isByLanguage);
        }
        /// <summary>
        /// 根据某一列值获得首行第一个值
        /// </summary>
        /// <param name="name">列明 如id</param>
        /// <param name="value">值</param>
        /// <param name="sqlKey">语句配置ID</param>
        /// <returns></returns>
        private string GetFirstResult(string name, object value, string sqlKey, bool isByLanguage)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add(name, value);
            return GetFirstResult(dic, sqlKey, isByLanguage);
            
        }
        private string GetFirstResult(Dictionary<string, object> dic, string sqlKey)
        {
            return GetFirstResult(dic,  sqlKey,false);
        }
        private string GetFirstResult(Dictionary<string, object> dic, string sqlKey, bool isByLanguage)
        {
            if (isByLanguage)
            {
                dic.Add("language_id", LanguageGuid);
            }
            DataSet ds = DBAccess.GetDataSet(ActivityConfigName, sqlKey, dic);
            if (ds.Tables.Count < 1)
            {
                return null;
            }
            DataTable dt = ds.Tables[0];
            if (dt == null || dt.Rows.Count < 1 || dt.Rows[0][0] == null)
            {
                return null;
            }

            return dt.Rows[0][0].ToString();
        }

        #endregion

        #region 执行SQL语句

        /// <summary>
        /// 单条执行
        /// </summary>
        /// <param name="keyValue"></param>
        /// <returns></returns>
        private bool CommonExecuteNonQuery(KeyValuePair<string, DbParameter[]> keyValue)
        {
            return DBAccess.CommonExecuteNonQuery(keyValue.Key, keyValue.Value) >= 0;
        }
        /// <summary>
        /// 各自执行
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        private bool CommonExecuteNonQuery(Dictionary<string, DbParameter[]> dic)
        {
            bool result = false;
            foreach (KeyValuePair<string, DbParameter[]> keyValue in dic)
            {
                if (DBAccess.CommonExecuteNonQuery(keyValue.Key, keyValue.Value) > 0)
                {
                    result = true;
                }
            }
            return result;
        }
        /// <summary>
        /// 事务性执行
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        private bool CommonTransExecuteNonQuery(List<KeyValuePair<string, DbParameter[]>> list)
        {
            return DBAccess.ExecuteNonQueryForTrans(list) > 0;
        }
        #endregion

        #region 返回首行
        /// <summary>
        /// 返回表格首行JSON值
        /// </summary>
        /// <param name="sqlKey"></param>
        /// <param name="dic"></param>
        /// <returns></returns>
        private string GetJsonFirstRowFromDataTable(string sqlKey, Dictionary<string, object> dic)
        {
            DataTable dt = DBAccess.GetDataTableBasedOnSql(ActivityConfigName, sqlKey, dic);
            return WanerDaoUtils.GetJsonFirstRowFromDataTable(dt);
        }

        /// <summary>
        /// 返回表格首行Dictionary值
        /// </summary>
        /// <param name="sqlKey"></param>
        /// <param name="dic"></param>
        /// <returns></returns>
        private Dictionary<string, object> GetDicFirstRowFromDataTable(string sqlKey, Dictionary<string, object> dic)
        {
            DataTable dt = DBAccess.GetDataTableBasedOnSql(ActivityConfigName, sqlKey, dic);
            return WanerDaoUtils.GetDicFirstRowFromDataTable(dt);
        }

        #endregion

        #region 获取插入语句参数 KeyValuePair<string, DbParameter[]>

        
        /// <summary>
        /// 获取活动创建执行语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertPersonalActivitySchedule(personalactivityschedule _item)
        {
            if (_item == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null,null);
            }
            if (string.IsNullOrEmpty(_item.id))
            {
                _item.id = WanerDaoGuid.GetGuid();
            }

            return DBAccess.GetNonQueryDBParamBasedOnSql<personalactivityschedule>(ActivityConfigName, "InsertPersonalActivitySchedule", _item);
        }
        /// <summary>
        /// 获取活动加入条件插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetInsertPersonalActivitySchedule(List<personalactivityschedule> list)
        {
            List<KeyValuePair<string, DbParameter[]>> _list = new List<KeyValuePair<string, DbParameter[]>>();
            if (list == null || list.Count < 1)
            {
                return _list;
            }
            foreach (personalactivityschedule item in list)
            {
                _list.Add(GetInsertPersonalActivitySchedule(item));
            }
            return _list;
        }

        

        /// <summary>
        /// 获取活动加入条件插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertActivityJoinConditions(activityjoinconditions activityJoinConditions)
        {
            if (activityJoinConditions == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activityJoinConditions.id))
            {
                activityJoinConditions.id = WanerDaoGuid.GetGuid();
            }
            if (string.IsNullOrEmpty(activityJoinConditions.condition_name))
            {
                activityJoinConditions.condition_name =SelectJoinConditionsNameById(activityJoinConditions.condition_id);
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activityjoinconditions>(ActivityConfigName, "InsertActivityJoinConditions", activityJoinConditions);
        }
        /// <summary>
        /// 获取活动加入条件插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetInsertActivityJoinConditions(List<activityjoinconditions> activityJoinConditions)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();
            if (activityJoinConditions == null || activityJoinConditions.Count < 1)
            {
                return list;
            }
            foreach (activityjoinconditions item in activityJoinConditions)
            {
                list.Add(GetInsertActivityJoinConditions(item));
            }
            return list;
        }
        /// <summary>
        /// 获取活动计划插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertActivityPlan(activityplan activityPlan)
        {
            if (activityPlan == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            //if (string.IsNullOrEmpty(activityPlan.id))
            //{
                activityPlan.id = WanerDaoGuid.GetGuid();
            //}
            return DBAccess.GetNonQueryDBParamBasedOnSql<activityplan>(ActivityConfigName, "InsertActivityPlan", activityPlan);
        }
        /// <summary>
        /// 获取活动计划插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetInsertActivityPlan(List<activityplan> activityPlans)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();

            if (activityPlans == null || activityPlans.Count < 1)
            {
                return list;
            }
            foreach (activityplan plan in activityPlans)
            {
                list.Add(GetInsertActivityPlan(plan));
            }
            return list;
        }

        /// <summary>
        /// 获取活动计划修改语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetUpdateActivityPlan(activityplan activityPlan)
        {
            if (activityPlan == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activityPlan.id))
            {
                activityPlan.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activityplan>(ActivityConfigName, "UpdateActivityPlan", activityPlan);
        }
        /// <summary>
        /// 获取活动计划改语语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetUpdateActivityPlan(List<activityplan> activityPlans)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();

            if (activityPlans == null || activityPlans.Count < 1)
            {
                return list;
            }
            foreach (activityplan plan in activityPlans)
            {
                list.Add(GetUpdateActivityPlan(plan));
            }
            return list;
        }
        /// <summary>
        /// 获取活动计划删除语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetDeleteActivityPlan(activityplan activityPlan)
        {
            if (activityPlan == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activityPlan.id))
            {
                activityPlan.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activityplan>(ActivityConfigName, "DeleteActivityPlan", activityPlan);
        }
        /// <summary>
        /// 获取活动计划删除语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetDeleteActivityPlan(List<activityplan> activityPlans)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();

            if (activityPlans == null || activityPlans.Count < 1)
            {
                return list;
            }
            foreach (activityplan plan in activityPlans)
            {
                list.Add(GetDeleteActivityPlan(plan));
            }
            return list;
        }

        /// <summary>
        /// 获取活动计划插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertActivityJoinInfo(ActivityJoinInfo activityJoinInfo)
        {
            if (activityJoinInfo == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            //if (string.IsNullOrEmpty(activityPlan.id))
            //{
            activityJoinInfo.id = WanerDaoGuid.GetGuid();
            //}
            return DBAccess.GetNonQueryDBParamBasedOnSql<ActivityJoinInfo>(ActivityConfigName, "InsertActivityJoinInfo", activityJoinInfo);
        }

        /// <summary>
        /// 获取活动搭车人插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertAutoCarPool(autocarpool autoCarPool)
        {
            if (autoCarPool == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(autoCarPool.id))
            {
                autoCarPool.id = WanerDaoGuid.GetGuid();
            }
            //if(string.IsNullOrEmpty(autoCarPool.)
            return DBAccess.GetNonQueryDBParamBasedOnSql<autocarpool>(ActivityConfigName, "InsertAutoCarPool", autoCarPool);
        }
        private List<KeyValuePair<string, DbParameter[]>> GetInsertAutoCarPool(List<autocarpool>  _autocarpools)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();
            if (_autocarpools == null || _autocarpools.Count < 1)
            {
                return list;
            }
            foreach (autocarpool item in _autocarpools)
            {
                list.Add(GetInsertAutoCarPool(item));
            }
            return list;
        }

        /// <summary>
        /// 获取活动分类插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertActivityCategory(activitycategory activitycategory)
        {
            if (activitycategory == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activitycategory.id))
            {
                activitycategory.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitycategory>(ActivityConfigName, "InsertActivityCategory", activitycategory);
        }
        /// <summary>
        /// 获取活动分类插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetInsertActivityCategory(List<activitycategory> activitycategorys)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();
            if (activitycategorys == null || activitycategorys.Count < 1)
            {
                return list;
            }
            foreach (activitycategory item in activitycategorys)
            {
                list.Add(GetInsertActivityCategory(item));
            }
            return list;
        }

        /// <summary>
        /// 获取活动分类删除语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetDeleteActivityCategory(activitycategory activitycategory)
        {
            if (activitycategory == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(activitycategory.id))
            {
                activitycategory.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitycategory>(ActivityConfigName, "DeleteActivityCategory", activitycategory);
        }
        /// <summary>
        /// 获取活动分类删除语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private List<KeyValuePair<string, DbParameter[]>> GetDeleteActivityCategory(List<activitycategory> activitycategorys)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();
            if (activitycategorys == null || activitycategorys.Count < 1)
            {
                return list;
            }
            foreach (activitycategory item in activitycategorys)
            {
                list.Add(GetDeleteActivityCategory(item));
            }
            return list;
        }

        /// <summary>
        /// 获取活动参数插入语句
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertPersonalActivityArchives(personalactivityarchives personalactivityarchives)
        {
            if (personalactivityarchives == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(personalactivityarchives.id))
            {
                personalactivityarchives.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<personalactivityarchives>(ActivityConfigName, "InsertPersonalActivityArchives", personalactivityarchives);
        }

        /// <summary>
        /// 获取用户活动设置
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertPersonalActivitySettings(personalactivitysettings _personalactivitysettings)
        {
            if (_personalactivitysettings == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(_personalactivitysettings.id))
            {
                _personalactivitysettings.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<personalactivitysettings>(ActivityConfigName, "InsertPersonalActivitySettings", _personalactivitysettings);
        }
        /// <summary>
        /// 修改用户活动设置
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetUpdatePersonalActivitySettings(personalactivitysettings _personalactivitysettings)
        {
            if (_personalactivitysettings == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<personalactivitysettings>(ActivityConfigName, "UpdatePersonalActivitySettings", _personalactivitysettings);
        }

        /// <summary>
        /// 获取例外名单
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetInsertActivityMsgExceptionList(activitymsgexceptionlist _activitymsgexceptionlist)
        {
            if (_activitymsgexceptionlist == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(_activitymsgexceptionlist.id))
            {
                _activitymsgexceptionlist.id = WanerDaoGuid.GetGuid();
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitymsgexceptionlist>(ActivityConfigName, "InsertActivityMsgExceptionList", _activitymsgexceptionlist);
        }
        private List<KeyValuePair<string, DbParameter[]>> GetInsertActivityMsgExceptionList(List<activitymsgexceptionlist> _activitymsgexceptionlists)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();
            if (_activitymsgexceptionlists == null || _activitymsgexceptionlists.Count < 1)
            {
                return list;
            }
            foreach (activitymsgexceptionlist item in _activitymsgexceptionlists)
            {
                list.Add(GetInsertActivityMsgExceptionList(item));
            }
            return list;
        }
        /// <summary>
        /// 删除例外名单
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        private KeyValuePair<string, DbParameter[]> GetDeleteActivityMsgExceptionList(activitymsgexceptionlist _activitymsgexceptionlist)
        {
            if (_activitymsgexceptionlist == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<activitymsgexceptionlist>(ActivityConfigName, "DeleteActivityMsgExceptionList", _activitymsgexceptionlist);
        }
        private List<KeyValuePair<string, DbParameter[]>> GetDeleteActivityMsgExceptionList(List<activitymsgexceptionlist> _activitymsgexceptionlists)
        {
            List<KeyValuePair<string, DbParameter[]>> list = new List<KeyValuePair<string, DbParameter[]>>();
            if (_activitymsgexceptionlists == null || _activitymsgexceptionlists.Count < 1)
            {
                return list;
            }
            foreach (activitymsgexceptionlist item in _activitymsgexceptionlists)
            {
                list.Add(GetDeleteActivityMsgExceptionList(item));
            }
            return list;
        }
        #endregion

        #region CompareList

        private bool CompareList<T>(List<T> _allList, List<T> _compareList, ref List<T> _addList, ref List<T> _deleteList) where T : Id
        {
            if (_allList == null || _allList.Count < 1)
            {
                if (_compareList != null && _compareList.Count > 0)
                {
                    _deleteList = _compareList;
                }
                return true;
            }

            if (_compareList == null)
            {
                _addList = _allList;
                return true;
            }

            var _listD = from _item in _compareList
                         where (!_allList.Exists(i => i.id == _item.id))
                            select _item;
            _deleteList = _listD.ToList();

            var _listA = from _item in _allList
                         where (!_compareList.Exists(i => i.id == _item.id))
                         select _item;
            _addList = _listA.ToList();

            return true;
        }
        private bool CompareList<T>(List<T> _allList, List<T> _compareList, ref List<T> _addList,ref List<T> _updateList, ref List<T> _deleteList) where T : Id
        {
            if (_allList == null || _allList.Count < 1)
            {
                if (_compareList != null && _compareList.Count > 0)
                {
                    _deleteList = _compareList;
                }
                return true;
            }

            if (_compareList == null)
            {
                _addList = _allList;
                return true;
            }

            var _listD = from _item in _compareList
                         where (!_allList.Exists(i => i.id == _item.id))
                         select _item;
            _deleteList = _listD.ToList();

            var _listA = from _item in _allList
                         where (!_compareList.Exists(i => i.id == _item.id))
                         select _item;
            _addList = _listA.ToList();

            var _listU = from _item in _allList
                         where (_compareList.Exists(i => i.id == _item.id))
                         select _item;
            _updateList = _listU.ToList();

            return true;
        }
        private List<string> GetIDList<T>(List<T> list) where T : Id
        {
            if (list == null || list.Count < 1)
            {
                return null;
            }
            var _rList = from _item in list where _item!=null
                         select _item.id;

            return _rList.ToList();
        }
        #endregion

        #region other
        private string LanguageGuid
        {
            get { return CommonContext.GetClientLanguage(); }
        }
        /// <summary>
        /// 从Dictionary中获取键值，并且删除键
        /// 添加人：徐兵 
        /// 时间：2011-11-22
        /// </summary>
        /// <param name="key">键名</param>
        /// <param name="dic">Dictionary</param>
        /// <returns></returns>
        private string GetAndRemoveDicValue(string key, Dictionary<string, object> dic)
        {
            string value = "";
            if (dic != null && dic.ContainsKey(key))
            {
                value = dic[key].ToString();
                dic.Remove(key);
            }
            return value;
        }
        private string GetDicValue(string key, Dictionary<string, object> dic)
        {
            string value = "";
            if (dic != null && dic.ContainsKey(key))
            {
                value = dic[key].ToString();
            }
            return value;
        }
        #endregion

        #endregion

        #region activityCreateMain signup
        private ActivityCreateMain GetActivityCreateMain(activity activity)
        {
            ActivityCreateMain activityCreateMain=new ActivityCreateMain();
            activityCreateMain.activityname=activity.activity_name;

            activityCreateMain.signuppass=activity.apply_pass;
            activityCreateMain.signuptype=activity.apply_type_id;

            PlaceSet placeset = new PlaceSet()
            {
                cityid = activity.city_id,
                countryid = activity.country_id,
                addr = activity.address,
                zip = activity.zip,
                provinceid = activity.province_id
            };
            activityCreateMain.placeset = placeset;

            activityCreateMain.activitybegintime=activity.begin_datetime.ToString();
            activityCreateMain.activityendtime=activity.end_datetime.ToString();
            activityCreateMain.email=activity.create_email;
            activityCreateMain.createtype = activity.create_type_id;
            if (!string.IsNullOrEmpty(activity.create_id))
            {
                activityCreateMain.createtype +="|" + activity.create_id;
            }

            activityCreateMain.telephone=activity.create_phone;
            activityCreateMain.activitydesc=activity.description;
            activityCreateMain.protectpeople = (int)activity.kick_protected_duration;
            activityCreateMain.activityvisible=activity.is_public=="1" ;
            activityCreateMain.activitylimit=activity.max_nbr;
            activityCreateMain.activitycost=activity.prepay_nbr;
            activityCreateMain.activityovertime=activity.report_datetime.ToString();
            ///activity.schedule_type = activityCreateMain.;

            return activityCreateMain;
        }
        /// <summary>
        /// 根据activityCreateMain信息获得活动信息
        /// </summary>
        /// <param name="activityCreateMain"></param>
        /// <returns></returns>
        private activity GetActivity(ActivityCreateMain activityCreateMain,ref string message)
        {
            message = string.Empty;
            activity activity = new activity();
            activity.id = activityCreateMain.activityid;
            activity.activity_name = activityCreateMain.activityname;
            if (string.IsNullOrEmpty(activity.activity_name))
            {
                message = WanerDaoGlobalTip.GetInternationalizationTip("ActivityNameIsNull");
                return activity;
            }
            activity.apply_type_id = activityCreateMain.signuptype;
            if (string.IsNullOrEmpty(activity.apply_type_id))
            {
                message = WanerDaoGlobalTip.GetInternationalizationTip("ActivityApplyTypeIsNull");
                return activity;
            }
            activity.apply_pass = activityCreateMain.signuppass;
            if (string.IsNullOrEmpty(activity.apply_type_id) && activity.apply_type_id == "6253420d-5a45-11e1-956c-101f74b66417")
            {
                message = WanerDaoGlobalTip.GetInternationalizationTip("ActivityApplyPassIsNull");
                return activity;
            }

            activity.apply_type_name = SelectSignUpTypeNameById(activityCreateMain.signuptype);
            if (activityCreateMain.placeset != null)
            {
                activity.city_id = activityCreateMain.placeset.cityid;
                activity.country_id = activityCreateMain.placeset.countryid;
                activity.address = activityCreateMain.placeset.addr;
                activity.zip = activityCreateMain.placeset.zip;
                activity.province_id = activityCreateMain.placeset.provinceid;
            }
            if (string.IsNullOrEmpty(activity.address))
            {
                message = WanerDaoGlobalTip.GetInternationalizationTip("ActivityAddressIsNull");
                return activity;
            }
            DateTime _begionDate = DateTime.MinValue;
            DateTime.TryParse( activityCreateMain.activitybegintime,out _begionDate);
            activity.begin_datetime = _begionDate;
            if (activity.begin_datetime == DateTime.MinValue)
            {
                message = WanerDaoGlobalTip.GetInternationalizationTip("ActivityBeginDateIsError");
                return activity;
            }

            DateTime _endDate = DateTime.MinValue;
            DateTime.TryParse(activityCreateMain.activityendtime, out _endDate);
            activity.end_datetime = _endDate;
            if (activity.end_datetime == DateTime.MinValue)
            {
                message = WanerDaoGlobalTip.GetInternationalizationTip("ActivityEndDateIsError");
                return activity;
            }
            if (activity.end_datetime <= activity.begin_datetime)
            {
                message = WanerDaoGlobalTip.GetInternationalizationTip("ActivityEndDateLessThenBegionDate");
                return activity;
            }

            activity.create_email = activityCreateMain.email;
            string Createtype = activityCreateMain.createtype;
            int index=Createtype.IndexOf('|');
            if (index > 0)
            {
                activity.original_id=GetCurrentUserID();
                activity.create_id = Createtype.Substring(index+1);
                activity.create_type_id = Createtype.Substring(0,index);
            }
            else
            {
                activity.original_id = GetCurrentUserID();
                activity.create_type_id = Createtype;
                //activity.create_id = activity.original_id;
            }
            activity.create_phone = activityCreateMain.telephone;
            activity.datetime = DateTime.Now;
            activity.description = activityCreateMain.activitydesc;
            activity.is_kick_protected = activityCreateMain.protectpeople > 0;
            activity.kick_protected_duration = activityCreateMain.protectpeople;
            activity.is_public = activityCreateMain.activityvisible?"1":"0";
            activity.is_visible = true;
            activity.max_nbr = activityCreateMain.activitylimit;
            if (activity.max_nbr<1)
            {
                message = WanerDaoGlobalTip.GetInternationalizationTip("ActivityMaxMebLessThenOne");
                return activity;
            }
            activity.prepay_nbr = activityCreateMain.activitycost;

            DateTime _reportEndDate = DateTime.MinValue;
            DateTime.TryParse(activityCreateMain.activityovertime, out _reportEndDate);
            activity.report_datetime = _reportEndDate;
            if (activity.report_datetime == DateTime.MinValue || activity.report_datetime > activity.end_datetime)
            {
                message = WanerDaoGlobalTip.GetInternationalizationTip("ActivityEndDateLessThenReportEndDate");
                return activity;
            }
            ///activity.schedule_type = activityCreateMain.;
            activity.active = true;
            activity.is_create = true;
            if (activityCreateMain.committype==1)
            {
                activity.is_create = false;
            }
            activity.pay_description = activityCreateMain.pay_description;
            activity.pay_nbr = activityCreateMain.pay_nbr;
            activity.is_pay_need = activityCreateMain.is_pay_need;

            return activity;
        }

        /// <summary>
        /// 根据activityCreateMain信息获得活动周期信息
        /// </summary>
        /// <param name="activityCreateMain"></param>
        /// <returns></returns>
        private List<personalactivityschedule> GetPersonalActivitySchedule(ActivityCreateMain activityCreateMain, ref string message)
        {
            
            if(activityCreateMain.activityschedule==null)
            {
                return null;
            }
            List<personalactivityschedule> _list = new List<personalactivityschedule>();
            activityschedule _schedule=activityCreateMain.activityschedule;
            personalactivityschedule _item = new personalactivityschedule();

            _item.user_id = GetCurrentUserID();
            _item.active = true;
            _item.activity_id = activityCreateMain.activityid;
            int email_pre_date = 0;
            int.TryParse(_schedule.emaildates, out email_pre_date);
            _item.email_pre_date = email_pre_date;
            _item.is_email = _schedule.tellemail;

            int notice_pre_date = 0;
            int.TryParse(_schedule.inboxdates, out notice_pre_date);
            _item.notice_pre_date = notice_pre_date;
            _item.is_notice = _schedule.tellinbox;
            _item.is_build_directly = _schedule.isdirectlybuild == "1" ? true : false;
            _item.fix_schedule = int.Parse(_schedule.gapperiod);

            //活动周期定制  1: 一次性（默认） 2:订制固定周期 3:订制浮动周期
            if (_schedule.typeid == "2")
            {
                _item.is_fixed_schedule =true ;
                int _period = 2;
                int.TryParse(_schedule.gapperiod, out _period);
                _item.fix_schedule = _period;
            }

            if (_schedule.typeid == "3")
            {
                string[] _strPeriod =string.IsNullOrEmpty(_schedule.gapperiod)?null: _schedule.gapperiod.Trim('，').Replace(",,",",").Split(',');
                if (_strPeriod != null && _strPeriod.Length > 0)
                {
                    foreach (string _strDate in _strPeriod)
                    {
                        if (string.IsNullOrEmpty(_strDate))
                            continue;
                        DateTime _dt = DateTime.Now;
                        if (!DateTime.TryParse(_strDate.Trim(), out _dt))
                        {
                            message = WanerDaoGlobalTip.GetInternationalizationTip("SchedulePeriodIsError");
                        }
                        if (_dt <= DateTime.Now)
                        {
                            message = WanerDaoGlobalTip.GetInternationalizationTip("SchedulePeriodLessThanCurrent");
                        }
                        personalactivityschedule _sche = _item.Clone() as personalactivityschedule;
                        _sche.begin_date = _dt;
                        _list.Add(_sche);
                    }
                    if (_list.Count < 1)
                    {
                        message = WanerDaoGlobalTip.GetInternationalizationTip("SchedulePeriodIsNull");
                    }
                }
                else
                {
                    message = WanerDaoGlobalTip.GetInternationalizationTip("SchedulePeriodIsNull");
                }
            }
            else
            {
                _list.Add(_item);
            }
            return _list;
        }

        private personalactivityarchives GetPersonalactivityarchives(ActivityCreateMain activityCreateMain, ref string message)
        {
            if (activityCreateMain.committype == 0)
            {
                return null;
            }
            string userid = GetCurrentUserID();

            int _allowMax = 10;
            int.TryParse(WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoMaxActivityCreateParamCount").Trim(), out _allowMax);
            if (string.IsNullOrEmpty(activityCreateMain.archivesname))
            {
                message = WanerDaoGlobalTip.GetInternationalizationTip("ParamNameIsNull");
                return null;
            }

            int _count = GetPersonalActivityArchivesCountByUserId(userid);
            if (_count >= _allowMax)
            {
                message = WanerDaoGlobalTip.GetInternationalizationTip("ParamCountOut");
                return null;
            }
            if (GetPersonalActivityArchivesRepeat(userid, activityCreateMain.archivesname))
            {
                message = WanerDaoGlobalTip.GetInternationalizationTip("ParamNameAlreadyExists");
                return null;
            }
            personalactivityarchives personalactivityarchives = new personalactivityarchives
            {
                active = true,
                activity_id = activityCreateMain.activityid,
                save_name = activityCreateMain.archivesname,
                user_id = userid
            };
            
            return personalactivityarchives;
        }
        private activitymember GetActivitymember(ActivityCreateMain activityCreateMain, ref string message)
        {
            activitymember _activitymember = new activitymember();
            string userid = GetCurrentUserID();
            _activitymember.user_id = userid;
            _activitymember.active = true;
            _activitymember.activity_id = activityCreateMain.activityid;
            if (activityCreateMain.vehicletype != null)
            {
                _activitymember.vehicle_type_id = activityCreateMain.vehicletype.vehicletypeid;
                _activitymember.is_auto = activityCreateMain.vehicletype.isauto;
                if (_activitymember.is_auto && activityCreateMain.vehicletype.providercar != null)
                {
                    providercar _providercar = activityCreateMain.vehicletype.providercar;
                    _activitymember.auto_brand_id = _providercar.autobrandid;
                    _activitymember.auto_model_id = _providercar.automodelid;
                    _activitymember.auto_plate = _providercar.autoplate;
                    _activitymember.auto_year = _providercar.autoyear;
                    _activitymember.carpool_money = _providercar.carpoolmoney;
                    _activitymember.carpool_nbr = _providercar.carpoolnbr;
                    _activitymember.carpool_type_id = _providercar.carpooltypeid;
                    _activitymember.is_permit_carpool = _providercar.ispermit;
                    _activitymember.is_need_carpool = false;
                }
                else if (!_activitymember.is_auto && activityCreateMain.vehicletype.bycar != null)
                {
                    bycar _bycar = activityCreateMain.vehicletype.bycar;
                    _activitymember.carpool_money = _bycar.carpoolmoney;
                    _activitymember.carpool_type_id = _bycar.carpooltypeid;
                    _activitymember.is_need_carpool = _bycar.isneedcarpool;
                }
            }
            if (activityCreateMain.placeset != null)
            {
                PlaceSet _startaddress = activityCreateMain.placeset;
                _activitymember.city_id = _startaddress.cityid;
                _activitymember.address = _startaddress.addr;
                _activitymember.state_id = _startaddress.provinceid;
                _activitymember.country_id = _startaddress.countryid;
                _activitymember.zip = _startaddress.zip;
            }
            _activitymember.phone = activityCreateMain.telephone;
            _activitymember.email = activityCreateMain.email;

            return _activitymember;
        }

        private activitymember GetActivityMember(signupmain _signupmain, ref string message)
        {
            message = string.Empty;
            activitymember activityMember = GetActivityMember(_signupmain.activityid, _signupmain.userid);
            if (activityMember != null)
            {
                message = WanerDaoGlobalTip.GetInternationalizationTip("AlreadyJoinActivity");
                return null;
            }

            activitymember _activitymember = new activitymember();
            _activitymember.id = _signupmain.id;
            _activitymember.user_id = _signupmain.userid;
            _activitymember.active = true;
            _activitymember.activity_id = _signupmain.activityid;
            
            if (_signupmain.vehicletype != null)
            {
                _activitymember.vehicle_type_id = _signupmain.vehicletype.vehicletypeid;
                _activitymember.is_auto = _signupmain.vehicletype.isauto;
                if (_activitymember.is_auto && _signupmain.vehicletype.providercar!=null)
                {
                    providercar _providercar=_signupmain.vehicletype.providercar;
                    _activitymember.auto_brand_id = _providercar.autobrandid;
                    _activitymember.auto_model_id = _providercar.automodelid;
                    _activitymember.auto_plate = _providercar.autoplate;
                    _activitymember.auto_year = _providercar.autoyear;
                    _activitymember.carpool_money = _providercar.carpoolmoney;
                    _activitymember.carpool_nbr = _providercar.carpoolnbr;
                    _activitymember.carpool_type_id = _providercar.carpooltypeid;
                    _activitymember.is_permit_carpool = _providercar.ispermit;
                    _activitymember.is_need_carpool = false;
                }
                else if (!_activitymember.is_auto && _signupmain.vehicletype.bycar != null)
                {
                    bycar _bycar = _signupmain.vehicletype.bycar;
                    activitymember _activityMemberOwner = GetActivityMember(_signupmain.activityid, _bycar.providercarpoolid);
                    if (_activityMemberOwner != null)
                    {
                        _activitymember.carpool_money = _activityMemberOwner.carpool_money;
                        _activitymember.carpool_type_id = _activityMemberOwner.carpool_type_id;
                        _activitymember.is_need_carpool = _bycar.isneedcarpool;
                    }
                }
            }
            if (_signupmain.startaddress != null)
            {
                startaddress _startaddress= _signupmain.startaddress;
                _activitymember.city_id = _startaddress.cityid;
                _activitymember.address = _startaddress.address;
                _activitymember.state_id = _startaddress.stateid;
                _activitymember.country_id = _startaddress.countryid;
                _activitymember.zip = _startaddress.zip;
            }
            if (_signupmain.contact != null)
            {
                contact _contact=_signupmain.contact;
                _activitymember.phone = _contact.phone;
                _activitymember.email = _contact.email;
            }

            return _activitymember;
        }
        private activitymember GetActivitymemberUpdateVehicle(ActivityVehicleInfo activityVehicleInfo, ref string message)
        {
            message = string.Empty;
            activitymember _activitymember = GetActivityMember(activityVehicleInfo.ActivityId, activityVehicleInfo.UserId);
            if (_activitymember == null)
            {
                message = WanerDaoGlobalTip.GetInternationalizationTip("NoJoinActivity");
                return null;
            }

            _activitymember.vehicle_type_id = activityVehicleInfo.Vehicletype.vehicletypeid;
            _activitymember.is_auto = activityVehicleInfo.Vehicletype.isauto;
            if (_activitymember.is_auto && activityVehicleInfo.Vehicletype.providercar != null)
            {
                providercar _providercar = activityVehicleInfo.Vehicletype.providercar;
                _activitymember.auto_brand_id = _providercar.autobrandid;
                _activitymember.auto_model_id = _providercar.automodelid;
                _activitymember.auto_plate = _providercar.autoplate;
                _activitymember.auto_year = _providercar.autoyear;
                _activitymember.carpool_money = _providercar.carpoolmoney;
                _activitymember.carpool_nbr = _providercar.carpoolnbr;
                _activitymember.carpool_type_id = _providercar.carpooltypeid;
                _activitymember.is_permit_carpool = _providercar.ispermit;
                _activitymember.is_need_carpool = false;
            }
            else if (!_activitymember.is_auto && activityVehicleInfo.Vehicletype.bycar != null)
            {
                bycar _bycar = activityVehicleInfo.Vehicletype.bycar;
                activitymember _activityMemberOwner = GetActivityMember(activityVehicleInfo.ActivityId, _bycar.providercarpoolid);
                if (_activityMemberOwner != null)
                {
                    _activitymember.carpool_money = _activityMemberOwner.carpool_money;
                    _activitymember.carpool_type_id = _activityMemberOwner.carpool_type_id;
                    _activitymember.is_need_carpool = _bycar.isneedcarpool;
                }
            }

            return _activitymember;
        }
        private List<autocarpool> GetAutocarpools(signupmain _signupmain, ref string message)
        {
            message = string.Empty;
            List<autocarpool> listAutoCarPoll = new List<autocarpool>();
            autocarpool _autocarpool = new autocarpool();
            _autocarpool.active = true;
            _autocarpool.active_id = _signupmain.activityid;
            if (_signupmain.vehicletype != null)
            {
                if (_signupmain.vehicletype.isauto && _signupmain.vehicletype.providercar != null && _signupmain.vehicletype.providercar.bycarusers != null)
                {
                    var list = from item in _signupmain.vehicletype.providercar.bycarusers
                               where item != null
                               select new autocarpool
                               {
                                   active = true,
                                   active_id = _signupmain.activityid,
                                   carpool_id = item.userid,
                                   is_pass = 1,
                                   owner_id = _signupmain.id
                               };
                    listAutoCarPoll = list.ToList();
                }
                else if (!_signupmain.vehicletype.isauto && _signupmain.vehicletype.bycar != null & _signupmain.vehicletype.bycar.isneedcarpool && !string.IsNullOrEmpty(_signupmain.vehicletype.bycar.providercarpoolid))
                {
                    bycar _bycar = _signupmain.vehicletype.bycar;
                    if (string.IsNullOrEmpty(_bycar.carpoolid))
                    {
                        _bycar.carpoolid = GetCurrentUserID();
                    }
                    listAutoCarPoll.Add(new autocarpool
                     {
                         active = true,
                         active_id = _signupmain.activityid,
                         carpool_id = _bycar.carpoolid,
                         is_pass = 0,
                         owner_id = _bycar.providercarpoolid
                     });

                }
                
            }
            return listAutoCarPoll;
        }

        private vehicletype GetVehicletype(string activityid)
        {
            WanerDaoPersonSecurity ws = new WanerDaoPersonSecurity();
            string original_id = GetCurrentUserID();
            activitymember activityMember = GetActivityMember(activityid, original_id);
            if (activityMember == null)
            {
                return null;
            }
            vehicletype _vehicletype = new vehicletype();
            _vehicletype.vehicletypeid = activityMember.vehicle_type_id;
            _vehicletype.isauto = activityMember.is_auto;
            if (_vehicletype.isauto)
            {
                _vehicletype.providercar = new providercar
                {
                    autobrandid = activityMember.auto_brand_id,
                    automodelid = activityMember.auto_model_id,
                    autoplate = activityMember.auto_plate,
                    autoyear = activityMember.auto_year,
                    carpoolmoney = activityMember.carpool_money,
                    carpoolnbr = activityMember.carpool_nbr,
                    carpooltypeid = activityMember.carpool_type_id,
                    ispermit = activityMember.is_permit_carpool,
                    currentcarpoolnbr = activityMember.current_carpool_nbr

                };
                List<autocarpool> _carPoolList=SelectAutoCarPoolByActivityIdAndOwnerId(activityMember.activity_id,activityMember.user_id);
                if(_carPoolList!=null&&_carPoolList.Count>0)
                {
                    var _varList = from _item in _carPoolList
                                   where _item != null
                                   select new bycaruser
                                   {
                                       ispass = _item.is_pass,
                                       userid = _item.carpool_id,
                                       username = _item.carpool_name
                                   };
                    _vehicletype.providercar.bycarusers = _varList.ToList();
                }
                
            }
            else
            {
                _vehicletype.bycar = new bycar();
                _vehicletype.bycar.isneedcarpool=activityMember.is_need_carpool;

                if(activityMember.is_need_carpool)
                {
                    _vehicletype.bycar.carpoolmoney = activityMember.carpool_money;
                    _vehicletype.bycar.carpooltypeid = activityMember.carpool_type_id;
                    _vehicletype.bycar.carpoolid = activityMember.user_id;
                    autocarpool _au = this.SelectAutoCarPoolByActivityIdAndCarPoolId(activityMember.activity_id, activityMember.user_id);
                    if (_au != null)
                    {
                        _vehicletype.bycar.providercarpoolid = _au.owner_id;
                        _vehicletype.bycar.providercarpoolname = _au.owner_name;
                    }

                };
            }
            return _vehicletype;
        }

        private activityschedule GetActivitySchedule(activity _activity)
        {
            if (_activity == null)
            {
                return null;
            }
            personalactivityschedule _personalactivityschedule = SelectPersonalActivityScheduleByActivityID(_activity.id);
            if (_personalactivityschedule == null)
            {
                return null;
            }
            activityschedule _item = new activityschedule();

            _item.gapperiod = _personalactivityschedule.fix_schedule.ToString();
            _item.emaildates = _personalactivityschedule.email_pre_date.ToString();
            _item.inboxdates = _personalactivityschedule.notice_pre_date.ToString();
            _item.isdirectlybuild = _personalactivityschedule.is_build_directly == true ? "1" : "2";
            _item.typeid = "1";

            return _item;
        }
        private List<activityplan> GetActivityplan(ActivityCreateMain activityCreateMain, ref string message)
        {
            return GetActivityplan(activityCreateMain.plan, activityCreateMain.activityid, ref message);
        }
        private List<activityplan> GetActivityplan(List<plan> listPlan,string activityId, ref string message)
        {
            message = string.Empty;
            if (listPlan == null || listPlan.Count < 1)
            {
                return null;
            }
            var list = from _item in listPlan
                       where _item != null
                       select new activityplan
                       {
                           id=_item.id,
                           end_date = DateTime.Parse(_item.endtime),
                           start_date = DateTime.Parse(_item.starttime),
                           note = _item.desc,
                           update_date = DateTime.Now,
                           plan_content = _item.title,
                           activity_id = activityId,
                           active =true
                       };
            return list.ToList();
        }
        private List<plan> GetPlans(activity activity)
        {
            return GetPlans(activity.id);
        }
        private List<plan> GetPlans(string  activityId)
        {
            List<activityplan> activityPlans = SelectActivityPlanByActivityID(activityId);
            if (activityPlans == null || activityPlans.Count < 1)
            {
                return null;
            }
            var plans = from item in activityPlans
                               where item != null
                               select new plan
                               {
                                    id=item.id,
                                   endtime = item.end_date.ToString(),
                                   starttime = item.start_date.ToString(),
                                   desc = item.note,
                                   title = item.plan_content
                               };
            return plans.ToList();
        }
        private List<activityjoinconditions> GetActivityjoinconditions(ActivityCreateMain activityCreateMain, ref string message)
        {
            message = string.Empty;
            List<limitcondition> listLimt = activityCreateMain.limitcondition;
            if (listLimt == null || listLimt.Count < 1)
            {
                return null;
            }
            var list = from item in listLimt
                       where item != null
                       select new activityjoinconditions
                       {
                           activity_id = activityCreateMain.activityid,
                           active = true,
                           condition_id = item.id,
                           condition_name = item.name,
                           value = item.value,
                           update_date = DateTime.Now

                       };
            return list.ToList();
        }
        private List<limitcondition> Getlimitconditions(string activityId)
        {
            List<activityjoinconditions> list = SelectActivityJoinconditionsByActivityID(activityId);
            if (list == null || list.Count < 1)
            {
                return null;
            }
            var rlist = from item in list
                        where item != null
                        select new limitcondition
                        {
                            id = item.condition_id,
                            name = item.condition_name,
                            value = item.value
                        };
            return rlist.ToList();
        }
        private List<activitybudget> GetActivityBudget(ActivityCreateMain activityCreateMain, ref string message)
        {
            message = string.Empty;
            List<budget> listLimt = activityCreateMain.budget;
            if (listLimt == null || listLimt.Count < 1)
            {
                return null;
            }
            string adminid = GetCurrentUserID();
            var list = from item in listLimt
                       where item != null
                       select new activitybudget
                       {
                           activity_id = activityCreateMain.activityid,
                           active = true,
                           activity_name = activityCreateMain.activityname,
                           budget_money = item.budgetcost,
                           create_date = DateTime.Now,
                           create_id = adminid,
                           item_content = item.receipt,
                           item_description = item.budgetdesc,
                           is_in = true
                       };
            return list.ToList();
        }
        private List<budget> Getbudgets(activity activity)
        {
            List<activitybudget> list = SelectActivityBudgetByActivityID(activity.id);
            if (list == null || list.Count < 1)
            {
                return null;
            }
            var rlist = from item in list
                        where item != null
                        select new budget
                        {
                            budgetcost = item.budget_money,
                            receipt = item.item_content,
                            budgetdesc = item.item_description,
                        };
            return rlist.ToList();
        }
        private List<activitycategory> GetActivityCategory(List<activitytags> listTags,string activity_id ,ref string message)
        {
            if (listTags == null || listTags.Count < 1)
            {
                return null;
            }
            var list = from item in listTags
                       where item != null
                       select new activitycategory
                       {
                           activity_id = activity_id,
                           active = true,
                           update_date = DateTime.Now,
                           category_id = item.id,
                           category_name = item.name
                       };
            return list.ToList();
        }
        private List<activitytags> GetActivitytags(activity activity)
        {
            List<activitycategory> list = SelectActivitycategoryByActivityID(activity.id);
            if (list == null || list.Count < 1)
            {
                return null;
            }
            var rlist = from item in list
                        where item != null
                        select new activitytags
                        {
                            id = item.category_id,
                            name = item.category_name
                        };
            return rlist.ToList();
        }
        private PlaceSet GetPlaceset(activity _activity)
        {
            PlaceSet _place = new PlaceSet
            {
                addr = _activity.address,
                cityid = _activity.city_id,
                 cityname=SelectCityNameByCityId(_activity.city_id),
                countryid = _activity.country_id,
                countryname=SelectCountryNameByCountryId(_activity.country_id),
                provinceid = _activity.province_id,
                 provincename=SelectStateNameByStateId(_activity.province_id),
                zip = _activity.zip
            };
            return _place;
        }

        private List<ActivityPayMethods> GetActivityPayMethods(List<paymethods> listPay, string activityID, string userID, ref string message)
        {
            message = string.Empty;
            if (listPay == null || listPay.Count < 1)
            {
                return null;
            }
            string adminid = GetCurrentUserID();
            var list = from item in listPay
                       where item != null
                       select new ActivityPayMethods
                       {
                           activity_id = activityID,
                           active = true,
                           id = item.id,
                           pay_address = item.pay_address,
                           user_id = userID,
                           pay_type_id = item.pay_type_id

                       };
            return list.ToList();
        }
        private List<paymethods> Getpaymethods(string activityID, string userID)
        {
            List<ActivityPayMethods> _list = SelectActivityPayMethods(activityID, userID);
            return Getpaymethods(_list);
        }
        private List<paymethods> Getpaymethods(List<ActivityPayMethods> payList)
        {
            if (payList == null || payList.Count < 1)
            {
                return null;
            }
            var rlist = from _item in payList
                        where _item != null
                        select new paymethods
                        {
                            id = _item.id,
                            pay_address = _item.pay_address,
                            pay_type_id = _item.pay_type_id,
                            pay_type_name = _item.pay_type_name
                        };
            return rlist.ToList();
        }
        #endregion

        #region message

        private string RtnCreateActiviyErrorMessage(string message)
        {
            return WanerDaoJSON.SerializeObject(false, message);
        }
        private string ReturnResultMessage(object obj)
        {
            if (obj == null)
            {
                return ReturnResultMessage(false, obj);
            }
            else
            {
                return ReturnResultMessage(true, obj);
            }
        }
        private string ReturnResultMessage(bool isSuccess, object obj)
        {
            return WanerDaoJSON.SerializeObject(isSuccess, obj);
        }
        #endregion

        #region 天气预报
        public WeatherInfo GetWeatherInfo(string cityName)
        {
            return WeatherDeal.GetWeatherInfo(cityName);
        }
        public string GetWeatherInfoJson(string cityName)
        {
            return  ReturnResultMessage(GetWeatherInfo(cityName));
        }
        
        #endregion

        #region 活动回复表-查询指定的记录数（用于展开活动回复留言）
        /// <summary>
        /// 活动回复表-查询指定的记录数
        /// 作者：王渝友 时间：2012-2-15
        /// </summary>
        /// <param name="dic">前台获取数据集合</param>
        /// <returns></returns>
        public string SearchAtivitycommentsGetlimit(Dictionary<string, object> dic)
        {
            Dictionary<string, object> result = new Dictionary<string, object>();
            string json = "";
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("ActivitySQL", "activitycommentsGetlimit", dic);
            if (ds != null)
            {
                if (ds.Tables.Count > 0 && ds.Tables[0] != null)
                {
                    result.Add("rows", WanerDaoUtils.DataTableToList(ds.Tables[0]));
                    json = WanerDaoJSON.GetSuccessJson(result);
                }
                else
                {
                    json = WanerDaoJSON.GetErrorJson("无记录信息");
                }
            }
            else
            {
                json = WanerDaoJSON.GetErrorJson("查询信息出错！");
            }
            return json;
        }
        #endregion

        #region  获取登录用户参加的历史活动数目
        /// <summary>
        /// 获取登录用户参加的历史活动数目
        /// 作者：王渝友
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string GetHistoryActivityCount(Dictionary<string, object> dic)
        {
            string json = string.Empty;


            Dictionary<string, object> activityDic = this.GetDicFirstRowFromDataTable("activityoldCount", dic);
            if (activityDic != null && activityDic.Count > 0)
            {

                json = WanerDaoJSON.GetSuccessJson(activityDic);

            }
            else
            {
                json = WanerDaoJSON.GetErrorJson("无活动信息");
            }
            return json;
        }
        #endregion

        #region  活动设置
        /// <summary>
        /// 活动设置
        /// 作者：王渝友
        /// </summary>
        /// <param name="dic">前台获取参数</param>
        /// <param name="sqlMapped">查询sql映射
        /// sqlMapped=ActivitySetting：活动设置查询
        /// sqlMapped=getjoinActivityUser：获取参加活动的用户
        /// sqlMapped=getActivityMsgExceptionList：获取活动的例外名单
        /// </param>
        /// <returns></returns>
        public string GetActivitySetting(Dictionary<string, object> dic, string sqlMapped)
        {
            string json = string.Empty;
            Dictionary<string, object> result = new Dictionary<string, object>();
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("ActivitySQL", sqlMapped, dic);
            if (ds != null)
            {
                if (ds.Tables.Count > 0 && ds.Tables[0] != null)
                {
                    result.Add("rows", WanerDaoUtils.DataTableToList(ds.Tables[0]));
                    // DataTable dtActivityUser = DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("ActivitySQL.xml", "getjoinActivityUser", dic);
                    //DataTable dtOther = DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("ActivitySQL.xml", "getActivityMsgExceptionList", dic);
                    result.Add("rowsUser", WanerDaoUtils.DataTableToList(ds.Tables[1]));
                    result.Add("rowsOther", WanerDaoUtils.DataTableToList(ds.Tables[2]));
                    json = WanerDaoJSON.GetSuccessJson(result);
                }
                else
                {
                    json = WanerDaoJSON.GetErrorJson("无记录信息");
                }
            }
            else
            {
                json = WanerDaoJSON.GetErrorJson("无记录信息");
            }
            return json;
        }




        /// <summary>
        /// 保存更新活动设置
        /// </summary>
        /// <param name="dic">前台获取参赛</param>
        public string SaveActivitySetting(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            Dictionary<string, object> result = new Dictionary<string, object>();
            DataTable dt = DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("ActivitySQL", "ActivitySettingCount", dic);
            bool isInsert = true;
            int iResut = 0;
            string sqlMapped = "updateActivitySetting";
            if (dt != null && dt.Rows.Count > 0)
            {
                if (WanerDaoValidation.ConvertToInt(dt.Rows[0][0]) > 0)
                {
                    isInsert = false;
                }
            }
            if (isInsert)
            {
                sqlMapped = "saveActivitySetting";
                dic.Add("id", WanerDaoGuid.GetGuid());
            }
            iResut = DbHelperFactory.SingleInstance().ExecuteNonQuery("ActivitySql", sqlMapped, dic);
            if (iResut > 0)
            {
                json = WanerDaoJSON.GetSuccessJson("恭喜，保存成功");
            }
            else
            {
                json = WanerDaoJSON.GetErrorJson("抱歉 保存失败");
            }
            return json; ;
        }

        #endregion

        #region 修改相片信息
        /// <summary>
        /// 修改相片信息
        /// 作者:王渝友
        /// </summary>
        /// <param name="dic">前台获取参赛</param>
        public string UpdateActivityImage(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            int iResut = DbHelperFactory.SingleInstance().ExecuteNonQuery("ActivitySql", "updatePhoto", dic);
            if (iResut > 0)
            {
                json = WanerDaoJSON.GetSuccessJson("恭喜，保存成功");
            }
            else
            {
                json = WanerDaoJSON.GetErrorJson("抱歉 保存失败");
            }
            return json; ;
        }

        #endregion

        #region 保存回复内容
        /// <summary>
        /// 保存回复内容
        /// 作者：王渝友
        /// </summary>
        /// <param name="dic">前台获取参赛</param>
        /// <returns></returns>
        public string InsertActivityComments(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            int iResut = DbHelperFactory.SingleInstance().ExecuteNonQuery("ActivitySql", "insertactivitycomments", dic);
            if (iResut > 0)
            {
                json = WanerDaoJSON.GetSuccessJson("恭喜，保存成功");
            }
            else
            {
                json = WanerDaoJSON.GetErrorJson("抱歉 保存失败");
            }
            return json; ;
        }

        #endregion

    }
}
