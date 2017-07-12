using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net;
using System.Web;
using System.Xml;
using Newtonsoft.Json.Linq;
using WanerDao2.WanerDaoBLL.Person;
using WanerDao2.WanerDaoComponent;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoIBLL.ICommon;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoModel.Activity;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoModule;
using WanerDao2.WanerDaoModule.Config;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoModule.Utils;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoModule.WanerDaoImage;
using Newtonsoft.Json;
using WanerDao2.WanerDaoModule.String;
using WanerDao2.WanerDaoModel;
using WanerDao2.WanerDaoCacheManager;
using WanerDao2.WanerDaoBLL.Index;
#region 【本类功能概述】
/* ======================================================================== *  
* 功能说明：本类实现所有插件或者控件所使用的函数
* 
* 作者：金广亮
* 时间：2011-10-12 23:09:07 
* 文件名：WanerdaoCommon 
* 版本：V0.0.1
* 
* 修改者： 时间： 修改说明： 
* 金广亮 2011-10-22 新增分页函数WanerDaoPagination(Dictionary<string, object> dic)
* ======================================================================== 
*/
#endregion
namespace WanerDao2.WanerDaoBLL.Common
{
    public class WanerdaoCommon : IWanerDaoCommon
    {
        readonly WanerDaoIBLL.IPerson.IWanerDaoPersonSecurity IPersonSec = null;
        WanerDaoModel.Person.PersonalSecurityProfileModel _pspmodel;

        public WanerdaoCommon()
        {
            if (IPersonSec == null)
                IPersonSec = new WanerDaoBLL.Person.WanerDaoPersonSecurity();
        }
        public PersonalSecurityProfileModel Pspmodel
        {
            get
            {
                if (_pspmodel == null)
                    //#if DEBUG
                    //                    _pspmodel = new PersonalSecurityProfileModel();
                    //                _pspmodel.user_id = "9f6c58f988cc4aff9c910504dce3edc2";
                    //                return _pspmodel;

                    //#endif
                    _pspmodel = CommonContext.GetUserSecurityInfo();

                return _pspmodel;
            }
        }

        #region 分页

        /// <summary>
        /// 描述：分页函数
        /// 作者:金广亮
        /// 时间：2011-10-22
        /// </summary>
        /// <param name="dic">里面包含这些元素：
        /// tablename 表名;fldName 查询字段，如果是多个字段请用英文的“,”分隔;where WHERE条件(不用传入WHERE关键字,可为空);
        /// fldSortId 排序条件(不用传入ORDER BY关键字,可为空);sort 1升序 0倒序;pagecurrent 当前页码;pageSize 每页记录数
        /// </param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        public string WanerDaoPagination(Dictionary<string, object> dic)
        {
            return WanerDaoPagination(WanerDaoPaginationDataSet(dic));
        }
        /// <summary>
        /// 描述：分页函数
        /// 作者:金广亮
        /// 时间：2012-5-16
        /// </summary>
        /// <param name="pager"></param>
        /// <returns></returns>
        public string WanerDaoPagination(PaginationModel pager)
        {
            return WanerDaoPagination(WanerDaoPaginationDataSet<PaginationModel>(pager));
        }

        /// <summary>
        /// 描述：分页函数
        /// 作者:王渝友
        /// 时间：2012-1-18
        /// </summary>
        /// <param name="dic">里面包含这些元素：
        /// tablename 表名;fldName 查询字段，如果是多个字段请用英文的“,”分隔;where WHERE条件(不用传入WHERE关键字,可为空);
        /// fldSortId 排序条件(不用传入ORDER BY关键字,可为空);sort 0升序 1倒序;pagecurrent 当前页码;pageSize 每页记录数
        /// </param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据},rootimgpath:图片的根路径}}</returns>
        public string WanerDaoPaginationToImage(Dictionary<string, object> dic)
        {
            return WanerDaoPaginationToImage(WanerDaoPaginationDataSet(dic));
        }
        /// <summary>
        /// 描述：分页函数
        /// 作者:金广亮
        /// 时间：2011-11-27
        /// </summary>
        /// <param name="ds">返回分页后的结果集</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        public string WanerDaoPagination(DataSet ds)
        {
            string json = string.Empty;
            Dictionary<string, object> result = new Dictionary<string, object>();
            if (ds != null)
            {
                if (ds.Tables.Count > 0 && ds.Tables[0] != null && ds.Tables[1] != null)
                {
                    result.Add("total", ds.Tables[0].Rows[0][0]);
                    result.Add("rows", WanerDaoUtils.DataTableToList(ds.Tables[1]));
                    json = WanerDaoJSON.GetSuccessJson(result);
                }
                else
                {
                    json = WanerDaoGlobalTip.GetInternationalizationTip("NoDataInfoCn", WanerDaoResultEnum.Failure);
                }
            }
            else
            {
                json = WanerDaoGlobalTip.GetInternationalizationTip("ReadOfErrorInfo", WanerDaoResultEnum.Failure);
            }
            return json;
        }
        /// <summary>
        /// 更新图片属性
        /// </summary>
        /// <param name="sqlkey">sql</param>
        /// <param name="dic">里面包含图片ID，以及要更新的条件</param>
        /// <returns></returns>
        public string WanerDaoUpdateImageProperty(string sqlkey,Dictionary<string, object> dic)
        {
            int i = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", sqlkey, dic);
            if (i>0)
            {
                return WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn", WanerDaoResultEnum.Success); 
            } 
            else
            {
                return WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn", WanerDaoResultEnum.Failure); 
            }
        }
        /// <summary>
        /// 描述：分页函数 增加额外参数
        /// 作者:徐兵
        /// 时间：2012-4-21
        /// </summary>
        /// <param name="ds">返回分页后的结果集</param>
        /// <param name="dic">额外键值对</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        public string WanerDaoPagination(DataSet ds, Dictionary<string, object> dic)
        {
            string json = string.Empty;
            Dictionary<string, object> result = new Dictionary<string, object>();
            if (ds != null)
            {
                if (ds.Tables.Count > 0 && ds.Tables[0] != null && ds.Tables[1] != null)
                {
                    result.Add("total", ds.Tables[0].Rows[0][0]);
                    result.Add("rows", WanerDaoUtils.DataTableToList(ds.Tables[1]));
                    if (dic != null && dic.Count > 0)
                    {
                        foreach (KeyValuePair<string, object> _key in dic)
                        {
                            result.Add(_key.Key, JsonConvert.SerializeObject(_key.Value));
                        }
                    }
                    json = WanerDaoJSON.GetSuccessJson(result);
                }
                else
                {
                    json = WanerDaoGlobalTip.GetInternationalizationTip("NoDataTypeInfo", WanerDaoResultEnum.Failure);
                }
            }
            else
            {
                json = WanerDaoGlobalTip.GetInternationalizationTip("ReadOfErrorInfo", WanerDaoResultEnum.Failure);
            }
            return json;
        }


        /// <summary>
        /// 描述：分页函数
        /// 作者:王渝友
        /// 时间：2012-1-18
        /// </summary>
        /// <param name="ds">返回分页后的结果集（结果集中含有图片信息的）</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据},rootimgpath:图片的根路径}</returns>
        public string WanerDaoPaginationToImage(DataSet ds)
        {
            string json = string.Empty;
            Dictionary<string, object> result = new Dictionary<string, object>();
            if (ds != null)
            {
                if (ds.Tables.Count > 0 && ds.Tables[0] != null && ds.Tables[1] != null)
                {
                    result.Add("total", ds.Tables[0].Rows[0][0]);
                    result.Add("rows", WanerDaoUtils.DataTableToList(ds.Tables[1]));
                    result.Add("rootimgpath", WannerDaoImageAndFolderManage.GetWebRootImagePath());
                    json = WanerDaoJSON.GetSuccessJson(result);
                }
                else
                {
                    json = WanerDaoGlobalTip.GetInternationalizationTip("NoDataTypeInfo", WanerDaoResultEnum.Failure);
                }
            }
            else
            {
                json = WanerDaoGlobalTip.GetInternationalizationTip("ReadOfErrorInfo", WanerDaoResultEnum.Failure);
            }
            return json;
        }
        /// <summary>
        /// 描述：分页结果集
        /// 作者:金广亮
        /// 时间：2011-11-27
        /// </summary>
        /// <param name="dic">里面包含这些元素：
        /// tablename 表名;fldName 查询字段，如果是多个字段请用英文的“,”分隔;where WHERE条件(不用传入WHERE关键字,可为空);
        /// fldSortId 排序条件(不用传入ORDER BY关键字,可为空);sort 0倒序 1升序;pagecurrent 当前页码;pageSize 每页记录数
        /// </param>
        /// <returns>分页后的结果集(总行数total：ds.Tables[0].Rows[0][0]；rows:{查询的数据}ds.Tables[1])</returns>
        public DataSet WanerDaoPaginationDataSet(Dictionary<string, object> dic)
        {
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "wanerdaoPagination", dic);
            return ds;
        }
        public DataSet WanerDaoPaginationDataSet<T>(T t)
        {
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet<T>("CommonSQL", "wanerdaoPagination", t);
            return ds;
        }
        #endregion

        #region 国家、省州、市县
        /*
        /// <summary>
        /// 描述：国家
        /// 作者：金广亮
        /// 时间：2011-11-04
        /// </summary>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(firstchar:'',id:'',name:'')}}</returns>
        public string WanerDaoCountry()
        {
            string json = string.Empty;
            if (WanerDaoGlobalTip.GetClientLanguage() == "en-us")
            {
                json = DbHelperFactory.SingleInstance().GetDataTable("CommonSQL", "wanerdaocountryen");
            }
            else
            {
                json = DbHelperFactory.SingleInstance().GetDataTable("CommonSQL", "wanerdaocountrycn");
            }

            return json;
        }
         
        /// <summary>
        /// 描述：省州
        /// 作者：金广亮
        /// 时间：2011-11-04
        /// </summary>
        /// <param name="countryid">国家ID</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(firstchar:'',id:'',name:'')}}</returns>
        public string WanerDaoState(Dictionary<string, object> countryid)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("country_id", countryid["id"]);
            string json = string.Empty;
            json = DbHelperFactory.SingleInstance().GetDataTable("CommonSQL", "wanerdaostate", dic);
            return json;
        }
        /// <summary>
        /// 描述：市县
        /// 作者：金广亮
        /// 时间：2011-11-04
        /// </summary>
        /// <param name="stateid">省州ID</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(firstchar:'',id:'',name:'')}}</returns>
        public string WanerDaoCity(Dictionary<string, object> stateid)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("state_id", stateid["id"]);
            string json = string.Empty;
            json = DbHelperFactory.SingleInstance().GetDataTable("CommonSQL", "wanerdaocity", dic);
            return json;
        }
         * * */
        /// <summary>
        /// 描述：根据最新设计获取国家省市等
        /// </summary>
        /// <param name="cityid">城市ID</param>
        /// <returns></returns>
        public string WanerDaoArea(Dictionary<string, object> cityid)
        {
            cityid.Add("language_id", CommonContext.GetClientLanguage());
            string json = string.Empty;
            json = DbHelperFactory.SingleInstance().GetDataTable("CommonSQL", "wanerdaocity", cityid);
            return json;
        }
        #region 注释地区信息
        ///// <summary>
        ///// 描述：英文状态的地区信息
        ///// 作者：金广亮
        ///// 时间：2011-11-13
        ///// </summary>
        ///// <param name="cid">国家ID</param>
        ///// <param name="sid">州ID</param>
        ///// <param name="id">市ID</param>
        ///// <returns>JSON格式的数据{result:false or true,country:{id:'222',name:'xxx'},state:{id:'',name:''},city:{id:'',name:''}}</returns>
        //public string WanerDaoArea(string cid, string sid, string id)
        //{
        //    return WanerDaoArea(GetAreaParams(cid, sid, id));
        //}
        ///// <summary>
        ///// 描述：英文状态的地区信息
        ///// 作者：金广亮
        ///// 时间：2011-11-13
        ///// </summary>
        ///// <param name="dic">cid:国家ID,sid:州ID,id:市ID</param>
        ///// <returns>JSON格式的数据{result:false or true,country:{id:'222',name:'xxx'},state:{id:'',name:''},city:{id:'',name:''}}</returns>
        //public string WanerDaoArea(Dictionary<string, object> dic)
        //{
        //    string lang = string.Empty;
        //    if (WanerDaoGlobalTip.GetClientLanguage() == "en-us")
        //    {
        //        lang = "wanerdaoareaen";
        //    }
        //    else
        //    {
        //        lang = "wanerdaoareacn";
        //    }
        //    return WanerDaoArea(lang, dic);
        //}
        ///// <summary>
        ///// 描述：构造地区查询参数
        ///// 作者：金广亮
        ///// 时间：2011-11-14
        ///// </summary>
        ///// <param name="cid">国家ID</param>
        ///// <param name="sid">州ID</param>
        ///// <param name="id">市ID</param>
        ///// <returns>地区查询参数</returns>
        //private Dictionary<string, object> GetAreaParams(string cid, string sid, string id)
        //{
        //    Dictionary<string, object> dic = new Dictionary<string, object>();
        //    dic.Add("cid", cid);
        //    dic.Add("sid", sid);
        //    dic.Add("id", id);
        //    return dic;
        //}
        ///// <summary>
        ///// 描述：通用地区查询
        ///// </summary>
        ///// <param name="sqlkey">SQLKey节点</param>
        ///// <param name="dic">地区查询参数</param>
        ///// <returns>JSON格式的数据{result:false or true,country:{id:'222',name:'xxx'},state:{id:'',name:''},city:{id:'',name:''}}</returns>
        //private string WanerDaoArea(string sqlkey, Dictionary<string, object> dic)
        //{
        //    DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", sqlkey, dic);
        //    string json = string.Empty;
        //    Dictionary<string, object> result = new Dictionary<string, object>();
        //    if (ds != null)
        //    {
        //        if (ds.Tables.Count > 0 && ds.Tables[0] != null && ds.Tables[1] != null && ds.Tables[2] != null)
        //        {
        //            result.Add("country", WanerDaoUtils.DataTableToList(ds.Tables[0]));
        //            result.Add("state", WanerDaoUtils.DataTableToList(ds.Tables[1]));
        //            result.Add("city", WanerDaoUtils.DataTableToList(ds.Tables[2]));
        //            json = WanerDaoJSON.GetSuccessJson(result);
        //        }
        //        else
        //        {
        //            json = WanerDaoGlobalTip.GetInternationalizationTip("NoDataInfoCn", WanerDaoResultEnum.Failure);//WanerDaoJSON.GetErrorJson("暂无信息");
        //        }
        //    }
        //    else
        //    {
        //        json = WanerDaoGlobalTip.GetInternationalizationTip("ReadOfErrorInfo", WanerDaoResultEnum.Failure);//WanerDaoJSON.GetErrorJson("获取出错！");
        //    }
        //    return json;
        //}
        #endregion

        #endregion

        #region 滑动按钮
        /// <summary>
        /// 描述：启动滑动按钮
        /// 作者：王薪杰
        /// 时间：2011-10-23
        /// </summary>
        /// <returns>JSON格式{result:是否成功，msg:消息}</returns>
        public string WanerDaoScrollButton()
        {
            HttpContext.Current.Session["iQaptcha"] = true;
            string json = string.Empty;
            if (Convert.ToBoolean(HttpContext.Current.Session["iQaptcha"]))
            {
                json =WanerDaoGlobalTip.GetInternationalizationTip("SuccessInfoCn", WanerDaoResultEnum.Success);;
            }
            else
            {
                json =  WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn", WanerDaoResultEnum.Failure);
            }
            return json;
        }
        #endregion

        #region 查询圈子
        /// <summary>
        /// 查询圈子
        /// </summary>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(id:'',group_name:'')}}</returns>
        public string WanerDaoSearchGroup()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", Pspmodel.user_id);
            string json = DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "SelectAll_UserGroup", dic);
            return json;
        }

        /// <summary>
        /// 查询好友
        /// </summary>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(user_id:'',name:'')}}</returns>
        public string WanerDaoSearchFriend()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", Pspmodel.user_id);
            string json = DbHelperFactory.SingleInstance().GetDataTable("RelationSQL", "SelectAll_UserGroup", dic);
            return json;
        }
        #endregion

        #region 查询好友和好友分组
        /// <summary>
        /// 根据名称查询好友当前用户好友
        /// 作者:杨晓东 时间:2011-11-25
        /// </summary>
        /// <param name="dic">string user_id,string fname</param>
        /// <returns></returns>
        public string WanerDaoGetPersonalFriendsByName(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            if (dic != null && dic.Keys.Count == 2 && dic.ContainsKey("user_id") && dic.ContainsKey("fname"))
            {
                json = DbHelperFactory.SingleInstance().GetDataTable("CommonSQL", "GetPersonalFriendsByName", dic);
            }
            else
            {
                json = WanerDaoGlobalTip.GetInternationalizationTip("ParameterError", WanerDaoResultEnum.Failure);
            }
            return json;
        }

        /// <summary>
        /// 获取当前登录用户的好友分组
        /// </summary>
        /// <returns></returns>
        public string WanerDaoGetPersonFriendGroup()
        {
            string json = string.Empty;
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", Pspmodel.user_id);
            json = DbHelperFactory.SingleInstance().GetDataTable("CommonSQL", "WanerDaoGetPersonFriendGroup", dic);
            if (!string.IsNullOrEmpty(json))
            {
                return json;
            }
            else
            {
                return WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn", WanerDaoResultEnum.Failure);
            }

        }
        /// <summary>
        /// 根据当前用户的好友分组id查询分组下的好友
        /// </summary>
        /// <param name="groupid"></param>
        ///  string groupid
        /// <returns></returns>
        public string WanerDaoGetPersonFriendByGroupId(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("groupid", dic["groupid"].ToString());
            mydic.Add("user_id", Pspmodel.user_id);
            json = DbHelperFactory.SingleInstance().GetDataTable("CommonSQL", "WanerDaoGetPersonFriendByGroupId", mydic);
            if (!string.IsNullOrEmpty(json))
            {
                return json;
            }
            else
            {
                return WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn", WanerDaoResultEnum.Failure);
            }
        }

        /// <summary>
        /// 获取当前用户的所有好友
        /// 杨晓东 2012年2月19日
        /// </summary>
        /// <returns></returns>
        public string WanerDaoGetAllPersonFriends()
        {
            string json = string.Empty;
            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("user_id", Pspmodel.user_id);
            json = DbHelperFactory.SingleInstance().GetDataTable("CommonSQL", "GetAllPersonFriends", mydic);
            if (!string.IsNullOrEmpty(json))
            {
                return json;
            }
            else
            {
                return WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn", WanerDaoResultEnum.Failure);
            }
        }

        #endregion

        #region 活动分类
        /// <summary>
        /// 描述：活动分类
        /// 作者：金广亮
        /// 时间：2011-11-14
        /// </summary>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(id:'',name:'')}}</returns>
        public string WanerDaoActivityCategory()
        {
            return WanerDaoPrivateData("activitysectionpage");
        }
        #endregion

        #region 活动景点
        /// <summary>
        /// 描述：活动景点
        /// 作者：金广亮
        /// 时间：2011-11-14
        /// </summary>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(id:'',name:'')}}</returns>
        public string WanerDaoActivityPlace()
        {
            return WanerDaoPrivateData("activitysight");
        }
        #endregion

        #region 活动
        /// <summary>
        /// 描述：多条件活动搜索函数（可用于分页）
        /// 作者:徐兵
        /// 时间：2011-11-13
        /// </summary>
        /// <param name="dic">里面包含这些元素：
        /// </param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        public string WanerDaoSearchActivityByManyCondition(Dictionary<string, object> dic)
        {
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "SearchActivityByManyConditions", dic);
            string json = string.Empty;
            Dictionary<string, object> result = new Dictionary<string, object>();
            if (ds != null)
            {
                if (ds.Tables.Count > 0 && ds.Tables[0] != null && ds.Tables[1] != null)
                {
                    result.Add("total", ds.Tables[0].Rows[0][0]);
                    result.Add("rows", WanerDaoUtils.DataTableToList(ds.Tables[1]));
                    result.Add("rootimgpath", WannerDaoImageAndFolderManage.GetWebRootImagePath());
                    json = WanerDaoJSON.GetSuccessJson(result);
                }
                else
                {
                    json = WanerDaoGlobalTip.GetInternationalizationTip("NoDataInfoCn", WanerDaoResultEnum.Failure);
                }
            }
            else
            {
                json = WanerDaoGlobalTip.GetInternationalizationTip("ReadOfErrorInfo", WanerDaoResultEnum.Failure);
            }
            return json;
        }

        public string WanerDaoSearchUserInterestsActivity(Dictionary<string, object> dic)
        {
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "SearchUserInterestsActivity", dic);
            string json = string.Empty;
            Dictionary<string, object> result = new Dictionary<string, object>();
            if (ds != null)
            {
                if (ds.Tables.Count > 0 && ds.Tables[0] != null && ds.Tables[1] != null)
                {
                    result.Add("total", ds.Tables[0].Rows[0][0]);
                    result.Add("rows", WanerDaoUtils.DataTableToList(ds.Tables[1]));
                    json = WanerDaoJSON.GetSuccessJson(result);
                }
                else
                {
                    json = WanerDaoGlobalTip.GetInternationalizationTip("NoDataInfoCn", WanerDaoResultEnum.Success);
                }
            }
            else
            {
                json = WanerDaoGlobalTip.GetInternationalizationTip("ReadOfErrorInfo", WanerDaoResultEnum.Failure);
            }
            return json;
        }

        #region 活动成员
        public string GetActivityMemberPaging(Dictionary<string, object> dic)
        {
            string _json = string.Empty;
            GetPaginationParams("activitymember m,paystatus pay,personalprofile pr", "activity_id,m.user_id,pr.name as user_name,pr.logo_small_path,pay_status,pay.type_name,is_auto,is_permit_carpool,is_need_carpool,distance,address,join_date, (select p.name from AutoCarpool c,personalprofile p where c.owner_id=p.user_id and c.carpool_id=m.user_id and c.active=1 limit 1) carpool_name", " and m.pay_status=pay.id and m.user_id=pr.user_id and  m.activity_id='" + GetAndRemoveValue("activityid", dic) + "' and m.active=1", "m.join_date", "0", ref dic);
            DataSet _ds = WanerDaoPaginationDataSet(dic);
            return WanerDaoPaginationToImage(_ds);
        }
        private string[] GetUserInfo(string userid)
        {
            string[] _nameAndImg = new string[2];
            IWanerDaoPersonInfoManager IPersonInfo =
                   new WanerDaoBLL.Person.WanerDaoPersonInfoManager();
            PersonalProfileModel m_ppModel = IPersonInfo.GetPersonalProfileModel(userid);
            if (m_ppModel != null)
            {
                _nameAndImg[0] = m_ppModel.name;
                _nameAndImg[1] = m_ppModel.logo_small_path;
            }
            return _nameAndImg;
        }
        #endregion


        #region privite
        /// <summary>
        /// 描述:构造分页查询参数
        /// </summary>
        /// <param name="_tablename">表名</param>
        /// <param name="_fldname">查询字段，如果是多个字段请用英文的“,”分隔</param>
        /// <param name="_where">where WHERE条件(不用传入WHERE关键字,可为空)</param>
        /// <param name="_fldSortId">排序条件(不用传入ORDER BY关键字,可为空)</param>
        /// <param name="_sort">0升序 1倒序</param>
        /// <param name="dic"></param>
        private void GetPaginationParams(string _tablename, string _fldname, string _where, string _fldSortId, string _sort, ref Dictionary<string, object> dic)
        {
            dic.Add("tablename", _tablename);
            dic.Add("fldName", _fldname);
            dic.Add("where", _where);
            dic.Add("fldSortId", _fldSortId);
            dic.Add("sort", _sort);
        }
        /// <summary>
        /// 从Dictionary中获取键值，并且删除键
        /// 添加人：徐兵 
        /// 时间：2011-11-22
        /// </summary>
        /// <param name="key">键名</param>
        /// <param name="dic">Dictionary</param>
        /// <returns></returns>
        private string GetAndRemoveValue(string key, Dictionary<string, object> dic)
        {
            string value = "";
            if (dic != null && dic.ContainsKey(key))
            {
                value = dic[key].ToString();
                dic.Remove(key);
            }
            return value;
        }
        #endregion

        #endregion

        #region 活动地图

        #endregion

        #region 玩儿道侧栏列表
        /// <summary>
        /// 描述:获取分页输入参数
        /// 作者：王渝友
        /// 日期：2011-12-2
        /// </summary>
        /// <param name="_tablename">表名</param>
        /// <param name="_fldname">查询字段，如果是多个字段请用英文的“,”分隔</param>
        /// <param name="_where">where WHERE条件(不用传入WHERE关键字,可为空)</param>
        /// <param name="_fldSortId">排序条件(不用传入ORDER BY关键字,可为空)</param>
        /// <param name="_sort">0升序 1倒序</param>
        /// <param name="dic"></param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        public string GetWanerDaoPageParameter(string _tablename, string _fldname, string _where, string _fldSortId, string _sort, Dictionary<string, object> dic)
        {
            dic.Add("tablename", _tablename);
            dic.Add("fldName", _fldname);
            dic.Add("where", _where);
            dic.Add("fldSortId", _fldSortId);
            dic.Add("sort", _sort);
            return WanerDaoPagination(dic);
        }

        /// <summary>
        /// 描述:玩儿道侧栏列表
        /// 作者：王渝友
        /// 日期：2012-1-13
        /// </summary>
        /// <param name="dic"></param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        public string GetWanerDaoSidebar(Dictionary<string, object> dic)
        {
            string json = "";
            string sidebarCategory = "";
            IEnumerator ie = dic.Keys.GetEnumerator();
            while (ie.MoveNext())
            {
                if (ie.Current.ToString().ToLower().Equals("sidebarcategory"))
                {
                    sidebarCategory = dic[ie.Current.ToString()].ToString().ToLower(); break;
                }
            }
            dic.Add("user_id", GetCurrentUserID());
            if (sidebarCategory.Length > 0)
            {
                switch (sidebarCategory)
                {
                    case "friendjoinactivity": //好友参加的活动
                        json = WanerDaoPagination(DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "myFriendJoinActivity", dic));
                        break;
                    case "newactivity": // 最新创建的活动
                        string strTalbeName = "activity";
                        string strFldname = "id,activity_name,begin_datetime,end_datetime,join_member_nbr,max_nbr,description,original_id,f_JudgeCanSignUpActivity(id,'" + GetCurrentUserID() + "') as cansingup, (select count(1) from activitymember am where activity.id=am.activity_id and am.user_id='" + GetCurrentUserID() + "' and am.active=1) issignup"; //侧栏显示数据的列名
                        string strWhere = "and is_visible=1 and active=1 and end_datetime>now()";//查询表的where 条件
                        string strFldSordId = "datetime "; //查询表的排序ID
                        string strSort = "0";
                        json = GetWanerDaoPageParameter(strTalbeName, strFldname, strWhere, strFldSordId, strSort, dic);
                        break;
                    case "interestactivity": //感兴趣的活动
                        json = WanerDaoPagination(DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "myInterestActivity", dic));
                        break;
                    default:
                        break;
                }
            }
            return json;
        }


        #endregion

        #region 留言板
        /// <summary>
        /// 添加相片评论
        /// </summary>
        /// <param name="dic">postid:相片ID,replayid：被回复评论ID，isreplay:0|1当为0时表示发布回复并且replayid为空，当1时replayid不允许为空，content：回复内容</param>
        /// <returns></returns>
        public string WanerDaoAddImageComments(Dictionary<string, object> dic)
        {
            dic.Add("user_id", GetCurrentUserID());
            dic.Add("id", WanerDaoGuid.GetGuid());
            int i = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "addImageComments", dic);
            if (i>0)
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("SaveInfoCn"));
            } 
            else
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn"));
            }
        }
        /// <summary>
        /// 删除相册评论
        /// </summary>
        /// <param name="dic">ID评论记录ID</param>
        /// <returns></returns>
        public string WanerDaoDeleteImageComments(Dictionary<string, object> dic)
        {
            int i = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "delImageComments", dic);
            if (i > 0)
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("DeleteInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("DeleteFailInfoCn"));
            }
        }
        /// <summary>
        /// 添加相片评论
        /// </summary>
        /// <param name="dic">postid:相片ID,replayid：被回复评论ID，isreplay:0|1当为0时表示发布回复并且replayid为空，当1时replayid不允许为空，content：回复内容</param>
        /// <returns></returns>
        public string WanerDaoAddBlogComments(Dictionary<string, object> dic)
        {
            dic.Add("user_id", GetCurrentUserID());
            dic.Add("id", WanerDaoGuid.GetGuid());
            int i = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "addBlogComments", dic);
            if (i > 0)
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("SaveInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn"));
            }
        }
        /// <summary>
        /// 删除相册评论
        /// </summary>
        /// <param name="dic">ID评论记录ID</param>
        /// <returns></returns>
        public string WanerDaoDeleteBlogComments(Dictionary<string, object> dic)
        {
            int i = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "delblogComments", dic);
            if (i > 0)
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("DeleteInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("DeleteFailInfoCn"));
            }
        }
        /// <summary>
        /// 添加视频评论
        /// </summary>
        /// <param name="dic">postid:视频ID,replayid：被回复评论ID，isreplay:0|1当为0时表示发布回复并且replayid为空，当1时replayid不允许为空，content：回复内容</param>
        /// <returns></returns>
        public string WanerDaoAddVideoComments(Dictionary<string, object> dic)
        {
            dic.Add("user_id", GetCurrentUserID());
            dic.Add("id", WanerDaoGuid.GetGuid());
            int i = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "addVideoComments", dic);
            if (i > 0)
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("SaveInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn"));
            }
        }
        /// <summary>
        /// 删除视频评论
        /// </summary>
        /// <param name="dic">ID评论记录ID</param>
        /// <returns></returns>
        public string WanerDaoDeleteVideoComments(Dictionary<string, object> dic)
        {
            int i = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "delvideoComments", dic);
            if (i > 0)
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("DeleteInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("DeleteFailInfoCn"));
            }
        }
        /// <summary>
        /// 添加状态评论
        /// </summary>
        /// <param name="dic">postid:状态ID,replayid：被回复评论ID，isreplay:0|1当为0时表示发布回复并且replayid为空，当1时replayid不允许为空，content：回复内容</param>
        /// <returns></returns>
        public string WanerDaoAddNewfeedComments(Dictionary<string, object> dic)
        {
            dic.Add("user_id", GetCurrentUserID());
            dic.Add("id", WanerDaoGuid.GetGuid());
            int i = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "addNewfeedComments", dic);
            if (i > 0)
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("SaveInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn"));
            }
        }
        /// <summary>
        /// 删除状态评论
        /// </summary>
        /// <param name="dic">评论记录ID</param>
        /// <returns></returns>
        public string WanerDaoDeleteNewfeedComments(Dictionary<string, object> dic)
        {
            int i = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "delNewfeedComments", dic);
            if (i > 0)
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("DeleteInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("DeleteFailInfoCn"));
            }
        }
        /// <summary>
        /// 添加留言评论
        /// </summary>
        /// <param name="dic">postid:留言ID,replayid：被回复评论ID，isreplay:0|1当为0时表示发布回复并且replayid为空，当1时replayid不允许为空，content：回复内容</param>
        /// <returns></returns>
        public string WanerDaoAddLeaveMessageComments(Dictionary<string, object> dic)
        {
            dic.Add("user_id", GetCurrentUserID());
            dic.Add("id", WanerDaoGuid.GetGuid());
            int i = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "addLeaveMessageComments", dic);
            if (i > 0)
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("SaveInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn"));
            }
        }
        /// <summary>
        /// 删除留言评论
        /// </summary>
        /// <param name="dic">留言记录ID</param>
        /// <returns></returns>
        public string WanerDaoDeleteLeaveMessageComments(Dictionary<string, object> dic)
        {
            int i = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "delLeaveMessageComments", dic);
            if (i > 0)
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("DeleteInfoCn"));
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("DeleteFailInfoCn"));
            }
        }
        /// <summary>
        /// 描述：留言板帖子列表
        /// 作者: 王渝友
        /// 时间：2011-11-10
        /// </summary>
        /// <param name="dic">前台参数集合</param>
        /// <param name="messagetype">回复信息类型：all:全部帖子回复信息，single：单一帖子信息</param>
        /// <param name="postTables">映射主表查询sql：如果是全部帖子，映射分页sql（wanerdaoPagination）</param>
        /// <param name="commentsTable">映射回复表查询SQL</param>
        /// <param name="PriTbId">留言板主表主键ID</param>     
        /// <param name="PriComId">留言板回复表主键ID</param>
        /// <param name="Pri_Sub_Id">留言板回复表中的字段,关联主表ID</param>
        /// <param name="Com_Sub_Id">留言板回复表中的字段,关联回复表ID，即回复贴号</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        public string WanerDaoLeaveMessage(Dictionary<string, object> dic, string messagetype, string postTables, string commentsTable, string PriTbId, string PriComId, string Pri_Sub_Id, string Com_Sub_Id)
        {

            DataSet ds = null;
            ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "wanerdaoPagination", dic);
            int SetLayer = 0;//获取前台设置显示层数
            int CommentCount = 0;//每一层回复显示个数
            IEnumerator ie = dic.Keys.GetEnumerator();
            while (ie.MoveNext())
            {
                if (ie.Current.ToString().ToLower().Equals("setlayer"))
                {
                    SetLayer = Convert.ToInt32(dic[ie.Current.ToString()].ToString().ToLower());
                }
                if (ie.Current.ToString().ToLower().Equals("commentcount"))
                {
                    CommentCount = Convert.ToInt32(dic[ie.Current.ToString()].ToString().ToLower());
                }
            }
            string json = string.Empty;
            Dictionary<string, object> result = new Dictionary<string, object>();
            if (ds != null)
            {
                if (ds.Tables.Count > 0 && ds.Tables[0] != null && ds.Tables[1] != null)
                {
                    result.Add("total", ds.Tables[0].Rows[0][0]);
                    if (SetLayer > 0)
                    {
                        result.Add("rows", GetLeavemessageList(ds.Tables[1], commentsTable, PriTbId, PriComId, Pri_Sub_Id, Com_Sub_Id, messagetype, SetLayer, CommentCount));
                    }
                    else
                    {
                        result.Add("rows", WanerDaoUtils.DataTableToList(ds.Tables[1]));
                    }
                    json = WanerDaoJSON.GetSuccessJson(result);
                }
                else
                {
                    json = WanerDaoJSON.GetErrorJson("无分页信息");
                }
            }
            else
            {
                json = WanerDaoJSON.GetErrorJson("获取分页信息出错！");
            }
            return json;
        }


        /// <summary>
        /// 留言板回复表数据集合（循环递归）
        /// 作者：王渝友
        /// 时间：2011-11-10
        /// </summary>
        /// <param name="dt">留言板回复表datatable</param>
        /// <param name="commentsTable">映射回复表查询SQL</param>
        /// <param name="Pri_Com_Id">留言板回复表主键ID</param>
        /// <param name="Pri_Sub_Id">留言板回复表中字段,关联主表ID</param>      
        /// <param name="Com_Sub_Id">留言板回复表中字段,关联回复表ID，即回复贴号</param>        
        /// <param name="currentCount">当前层数</param>
        /// <param name="setCount">设置显示层数</param>
        /// <returns>string json数据集合</returns>
        public string GetCommentsList(DataSet ds, string commentsTable, string Pri_Com_Id, string Pri_Sub_Id, string Com_Sub_Id, int currentCount, int setCount, int CommentCount)
        {
            int rowTotalCount = WanerDaoValidation.ConvertToInt(ds.Tables[0].Rows[0][0]);
            DataTable dt = ds.Tables[1];
            string json = "";
            if (currentCount < setCount)
            {
                currentCount++;
                Dictionary<string, object> result = new Dictionary<string, object>();
                List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
                foreach (DataRow dr in dt.Rows)
                {
                    string jsString = "";
                    Dictionary<string, object> dtJSON = new Dictionary<string, object>();
                    foreach (DataColumn dc in dt.Columns)
                    {
                        dtJSON.Add(dc.ColumnName, dr[dc.ColumnName]);
                    }
                    Dictionary<string, object> dic = new Dictionary<string, object>();
                    dic.Add(Com_Sub_Id, dr[Pri_Com_Id]);// strCom_Sub_Id = "follow_id";
                    dic.Add(Pri_Sub_Id, dr[Pri_Sub_Id]); //strPri_Sub_Id = "active_posts_id"                  
                    dic.Add("LimitCount", CommentCount);
                    DataSet dsNextComments = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", commentsTable, dic);
                    if (dsNextComments != null && dsNextComments.Tables[1].Rows.Count > 0)
                    {
                        jsString = GetCommentsList(dsNextComments, commentsTable, Pri_Com_Id, Pri_Sub_Id, Com_Sub_Id, currentCount, setCount, CommentCount);
                    }
                    dtJSON.Add("rows", jsString);
                    list.Add(dtJSON);
                }
                result.Add("data", list);
                result.Add("rowCount", rowTotalCount);

                json = WanerDaoJSON.GetSuccessJson(result);
            }
            return json;
        }


        /// <summary>
        /// 描述：留言板数据集合转换为List数据集合
        /// 作者：王渝友
        /// 时间：2011-11-10
        /// </summary>
        /// <param name="dt">数据表集合</param>
        /// <param name="commentsTable">映射回复表查询SQL</param>
        /// <param name="PriTbId">留言板主表主键ID</param>   
        /// <param name="PriComId">留言板回复表主键ID</param>
        /// <param name="Pri_Sub_Id">留言板回复表中,关联主表ID</param>
        /// <param name="Com_Sub_Id">留言板回复表中,关联回复表ID，即回复贴号</param>
        /// <param name="messagetype">回复信息类型：all:全部帖子回复信息，single：单一帖子信息</param>
        /// <param name="SetLayer">设置显示层数</param>
        /// <returns>List数据集合</returns>
        public List<Dictionary<string, object>> GetLeavemessageList(DataTable dt, string commentsTable, string PriTbId, string PriComId, string Pri_Sub_Id, string Com_Sub_Id, string messagetype, int SetLayer, int CommentCount)
        {
            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            foreach (DataRow dr in dt.Rows)
            {
                Dictionary<string, object> dtJSON = new Dictionary<string, object>();
                foreach (DataColumn dc in dt.Columns)
                {
                    dtJSON.Add(dc.ColumnName, dr[dc.ColumnName]);
                }
                Dictionary<string, object> dic = new Dictionary<string, object>();
                if (messagetype.Equals("all"))
                {
                    dic.Add(Com_Sub_Id, "-1");
                    dic.Add(Pri_Sub_Id, dr[PriTbId]);
                }
                else if (messagetype.Equals("single"))
                {
                    dic.Add(Com_Sub_Id, dr[PriComId]);// strCom_Sub_Id = "follow_id";
                    dic.Add(Pri_Sub_Id, dr[Pri_Sub_Id]);//strPri_Sub_Id = "active_posts_id"
                }
                dic.Add("LimitCount", CommentCount);
                DataSet dsComments = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", commentsTable, dic);

                if (dsComments != null && dsComments.Tables[1].Rows.Count > 0)
                {
                    string json = GetCommentsList(dsComments, commentsTable, PriComId, Pri_Sub_Id, Com_Sub_Id, 0, SetLayer, CommentCount);
                    dtJSON.Add("rows", json);
                }
                list.Add(dtJSON);
            }
            return list;
        }



        #endregion

        #region 文件上传
        /// <summary>
        /// 描述 上传文件
        /// 作者:徐兵
        /// 时间：2012-8-3
        /// </summary>
        /// <param name="httpPosteFile">上传文件请求流</param>
        /// <param name="batchId">批次ID
        /// </param>
        /// <returns></returns>
        public WanerDaoUploadImageResult WanerDaoUploadTempFile(HttpPostedFile postedImageFile, string batchId)
        {
            return null;
        }
        #endregion

        #region 活动相册相片处理
        #region 查询
        /// <summary>
        /// 用于获取相册管理数目以及相片管理数目
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string WanerDaoGetManageImageTotal(Dictionary<string, object> dic)
        {
            dic.Add("userIds", Pspmodel.user_id);
            dic.Add("languageid", CommonContext.GetClientLanguage());
            return DbHelperFactory.SingleInstance().GetDataTable("CommonSQL", "getmanageactivityimagetotal", dic);
        }
        /// <summary>
        /// 用于历史相册管理界面的左侧非管理员时候获取的相册操作函数
        /// </summary>
        /// <param name="dic">activity_id:活动ID；userid:用户ID</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        public string WanerDaoGetImageFolderWithGeneralStaff(Dictionary<string, object> dic)
        {
            dic.Add("userIds", Pspmodel.user_id);
            return DbHelperFactory.SingleInstance().GetDataTable("CommonSQL", "getleftmanageimagefolders", dic);
        }
        /// <summary>
        /// 获取相册中图片总数
        /// </summary>
        /// <param name="dic">根据活动相册ID来获取相册中的相片总数</param>
        /// <returns>根据相册ID获取相册中的图片总数</returns>
        public string WanerDaoGetImageCount(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("CommonSQL", "getactivityimagecount", dic);
        }
        /// <summary>
        /// 照片的点击排序
        /// </summary>
        /// <param name="dic">string image_id,string type(0或者1)  0为向上  1为向下</param>
        /// <returns></returns>
        public string ImageSortOrderOfClick(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string image_id = dic.ContainsKey("image_id") ? dic["image_id"].ToString() : null;
            int type = dic.ContainsKey("type") ? int.Parse(dic["type"].ToString()) : 0;
            if (!string.IsNullOrEmpty(image_id))
            {
                int ri = -1;
                if (type == 0)
                {
                    ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "SelectPrevImage", dic);
                    if (ri > 0) json = WanerDaoGlobalTip.GetInternationalizationTip("SuccessInfoCn", WanerDaoResultEnum.Success);
                    else json = WanerDaoGlobalTip.GetInternationalizationTip("CanNotModify", WanerDaoResultEnum.Failure);
                }
                else if (type == 1)
                {
                    ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "SelectNextImage", dic);
                    if (ri > 0) json = WanerDaoGlobalTip.GetInternationalizationTip("SuccessInfoCn", WanerDaoResultEnum.Success);
                    else json = WanerDaoGlobalTip.GetInternationalizationTip("CanNotModify", WanerDaoResultEnum.Failure);
                }
                else
                {
                    json = WanerDaoGlobalTip.GetInternationalizationTip("CanNotModify", WanerDaoResultEnum.Failure);
                }
                //DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "getactivityimagebyidnew", dic);                
                //if (ds!=null && ds.Tables[0].Rows.Count>0)
                //{
                //    Dictionary<string, object> dic_dir = new Dictionary<string, object>();
                //    dic_dir.Add("image_id", image_id);
                //    dic_dir.Add("fold_id", ds.Tables[0].Rows[0]["folder_id"]);
                //    int ri=-1;
                //    if (type == 0)
                //    {
                //        ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "SelectPrevImage", dic_dir);
                //        if (ri > 0) json = WanerDaoGlobalTip.GetInternationalizationTip("SuccessInfoCn", WanerDaoResultEnum.Success);
                //        else json = WanerDaoGlobalTip.GetInternationalizationTip("CanNotModify", WanerDaoResultEnum.Failure);
                //    }
                //    else if (type == 1)
                //    {
                //        ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "SelectNextImage", dic_dir);
                //        if (ri > 0) json = WanerDaoGlobalTip.GetInternationalizationTip("SuccessInfoCn", WanerDaoResultEnum.Success);
                //        else json = WanerDaoGlobalTip.GetInternationalizationTip("CanNotModify", WanerDaoResultEnum.Failure);
                //    }
                //    else
                //    {
                //        json = WanerDaoGlobalTip.GetInternationalizationTip("CanNotModify", WanerDaoResultEnum.Failure); 
                //    }
                //} 
                //else
                //{
                //    json = WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn", WanerDaoResultEnum.Failure);
                //}
            }
            else
            {
                json = WanerDaoGlobalTip.GetInternationalizationTip("ParameterError", WanerDaoResultEnum.Failure);
            }
            return json;
        }
        /// <summary>
        /// 描述 相册查询 存储过程(可用于分页)
        /// 作者:徐兵
        /// 时间：2011-11-26
        /// </summary>
        /// <param name="dic">里面包含这些元素: 
        /// searchType:查询类型 1*：查询个人相册(11:单个人相册，12：多个人)；
        ///                       2*：根据活动查询相册（21：个人相册+活动相册+好友相册，22：个人相册类型，23：活动相册类型，24：好友相册类型，25：活动的所有相册）
        /// userIds:#用户ID,可以多个用英文逗号分隔
        /// activityIds:活动名ID
        /// isSearchBlock:是否显示屏蔽相册 1：是 0：否 2:只显示被屏蔽的
        /// orderByFileds:排序字段，请填返回名称中的一个或者多个，用英文逗号分隔
        /// sort:0升序 1倒序
        /// pagecurrent:当前页
        /// pageSize:每页记录数
        /// </param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        public string WanerDaoSearchImageFolder(Dictionary<string, object> dic)
        {
            dic.Add("userIds", Pspmodel.user_id);
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "getactivityimagefolderinfo", dic);
            return WanerDaoCreateImageOrFolderJosn(ds);
        }

        /// <summary>
        /// 描述：相片分页函数
        /// 作者:徐兵
        /// 时间：2011-11-26
        /// </summary>
        /// <param name="dic">里面包含这些元素：
        /// tablename 表名;fldName 查询字段，如果是多个字段请用英文的“,”分隔;where WHERE条件(不用传入WHERE关键字,可为空);
        /// fldSortId 排序条件(不用传入ORDER BY关键字,可为空);sort 0升序 1倒序;pagecurrent 当前页码;pageSize 每页记录数
        /// </param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        public string WanerDaoSearchImagePagination(Dictionary<string, object> dic)
        {
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "wanerdaoPagination", dic);
            return WanerDaoCreateImageOrFolderJosn(ds);
        }

        /// <summary>
        /// 描述 根据创建人查询相片 
        /// 作者:徐兵
        /// 时间：2011-11-26
        /// </summary>
        /// <param name="dic">里面包含这些元素</param>
        /// <returns>>JSON格式的数据</returns>
        public string WanerDaoSearchImageByUserId(Dictionary<string, object> dic)
        {
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "getactivityimagebycreateid", dic);
            return WanerDaoCreateImageOrFolderJosn(ds);
        }

        /// <summary>
        /// 描述 根据相册ID查询 相片
        /// 作者:徐兵
        /// 时间：2011-11-26
        /// </summary>
        /// <param name="dic">里面包含这些元素</param>
        /// <returns>>JSON格式的数据</returns>
        public string WanerDaoSearchImageByFolderId(Dictionary<string, object> dic)
        {
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "getactivityimagebyfoldid", dic);
            return WanerDaoCreateImageOrFolderJosn(ds);
        }
        /// <summary>
        /// 描述 根据相册ID查询 相片
        /// 作者:徐兵
        /// 时间：2011-11-26
        /// </summary>
        /// <param name="dic">里面包含这些元素:id</param>
        /// <returns>>JSON格式的数据</returns>
        public string WanerDaoGetImageById(Dictionary<string, object> dic)
        {
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "getactivityimagebyid", dic);
            return WanerDaoCreateImageOrFolderJosn(ds);
        }
        /// <summary>
        /// 组织相片相册JSON返回 (单行)
        /// </summary>
        /// <param name="ds">数据集</param>
        /// <returns>JSON格式的数据{data:{查询的数据}}</returns>
        private string WanerDaoCreateImageOrFolderInfoJosn(DataSet ds)
        {
            string json = string.Empty;
            if (ds != null)
            {
                Dictionary<string, object> result = new Dictionary<string, object>();
                if (ds.Tables.Count > 0 && ds.Tables[0] != null)
                {
                    DataTable rowDt = ds.Tables[0];
                    List<Dictionary<string, object>> listRow = WanerDaoUtils.DataTableToList(rowDt);
                    Dictionary<string, object> _firstDic;
                    if (listRow != null && listRow.Count > 0)
                    {
                        _firstDic = listRow[0];
                        SpliceIamgeWebPath(_firstDic);

                        result.Add("data", _firstDic);
                        json = WanerDaoJSON.GetSuccessJson(result);
                        return json;
                    }

                }
                json = WanerDaoGlobalTip.GetInternationalizationTip("NoDataInfoCn", WanerDaoResultEnum.Failure);
            }
            else
            {
               json = WanerDaoGlobalTip.GetInternationalizationTip("ReadOfErrorInfo", WanerDaoResultEnum.Failure);
            }
            return json;
        }
        /// <summary>
        /// 组织相片相册JSON返回 (集合)
        /// </summary>
        /// <param name="ds">数据集</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据}}</returns>
        private string WanerDaoCreateImageOrFolderJosn(DataSet ds)
        {

            string json = string.Empty;
            Dictionary<string, object> result = new Dictionary<string, object>();
            if (ds != null)
            {
                if (ds.Tables.Count > 0 && ds.Tables[0] != null)
                {
                    DataTable rowDt = ds.Tables[0];
                    object _total = 0;
                    if (ds.Tables.Count > 1 && ds.Tables[1] != null&&ds.Tables[1].Columns.Count>1)
                    {
                        _total = ds.Tables[0].Rows[0][0];
                        rowDt = ds.Tables[1];
                    }
                    else
                    {
                        _total = rowDt.Rows.Count;
                    }
                    _total = rowDt.Rows.Count;
                    result.Add("total", _total);
                    if (ds.Tables[1].Rows.Count>0)
                    {
                        result.Add("foldername", ds.Tables[1].Rows[0][0]);
                    } 
                    else
                    {
                        result.Add("foldername", string.Empty);
                    }                    
                    List<Dictionary<string, object>> listRow = WanerDaoUtils.DataTableToList(rowDt);
                    if (listRow != null && listRow.Count > 0)
                    {
                        foreach (Dictionary<string, object> rContent in listRow)
                        {
                            SpliceIamgeWebPath(rContent);
                        }
                    }
                    result.Add("rows", listRow);
                    json = WanerDaoJSON.GetSuccessJson(result);
                }
                else
                {
                    json = WanerDaoGlobalTip.GetInternationalizationTip("NoDataInfoCn", WanerDaoResultEnum.Failure);
                }
            }
            else
            {
                json = WanerDaoGlobalTip.GetInternationalizationTip("ReadOfErrorInfo", WanerDaoResultEnum.Failure);
            }
            return json;
        }
        public void SpliceIamgeWebPath(Dictionary<string, object> dic)
        {
            //SpliceIamgeWebPath(dic, new string[] { "image_small_path", "image_path" });
        }
        public void SpliceIamgeWebPath(Dictionary<string, object> dic, string[] imageFileds)
        {

            foreach (string key in imageFileds)
            {
                if (dic.ContainsKey(key) && !string.IsNullOrEmpty(dic[key].ToString()))
                {
                    dic[key] = SpliceImageWebPath(dic[key].ToString());
                }
            }
        }
        public string SpliceImageWebPath(string imagePath)
        {
            string webRootPath = WannerDaoImageAndFolderManage.GetWebRootImagePath();
            return webRootPath + imagePath;
        }

        /// <summary>
        /// 根据用户id和相册id获取相册列表
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string GetActivityAlbumListByUser(Dictionary<string, object> dic)
        {
            string json = DbHelperFactory.SingleInstance().GetDataTable("ActivitySQL", "ActivityAlbumListByUser", dic);
            return json;
        }
        #endregion

        #region 操作
        /// <summary>
        /// 描述 上传相片
        /// 作者:徐兵
        /// 时间：2011-12-3
        /// </summary>
        /// <param name="httpPosteFile">上传文件请求流</param>
        /// <param name="dic">dic包含信息：
        /// fold_id：相册ID
        /// activity_id：活动ID
        /// </param>
        /// <returns></returns>
        public WanerDaoUploadImageResult WanerDaoUploadImageFile(HttpPostedFile postedImageFile, Dictionary<string, object> dic)
        {
            WanerDaoUploadImageResult uploadResult = WannerDaoImageAndFolderManage.MainUploadImageFile(postedImageFile, dic);
            return uploadResult;
        }

        /// <summary>
        /// 描述 确认上传
        /// 作者:徐兵
        /// 时间：2011-12-3
        /// </summary>
        /// <returns></returns>
        public string WanerDaoSubmitUploadImageFiles(string imageIds)
        {
            string json = string.Empty;
            Dictionary<string, object> jsonDic = new Dictionary<string, object>();
            int result = WannerDaoImageAndFolderManage.SubmitUpdateImageActivity(imageIds);
            jsonDic.Add("sucesscount", result);
            if (result > 0)
            {
                jsonDic.Add("msg", WanerDaoGlobalTip.GetInternationalizationTip("SuccessInfoCn"));
                json = WanerDaoJSON.GetSuccessJson(jsonDic);
            }
            else
            {
                jsonDic.Add("msg", WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn"));
                json = WanerDaoJSON.SerializeObject(false, jsonDic);
            }
            return json;
        }

        /// <summary>
        /// 创建活动相册
        /// </summary>
        /// </param>
        /// <returns></returns>
        public bool WanerDaoCreateActivityImageFolder(ActivityImageFolderModel activityImagefolder)
        {
            return WannerDaoImageAndFolderManage.CreateActivityImageFolder(activityImagefolder);
        }
        /// <summary>
        /// 修改活动相册
        /// </summary>
        /// <param name="dic">dic包含如下：
        ///  id:相册ID
        ///  folder_name:文件夹名字
        ///  description:描述
        /// </param>
        /// <returns></returns>
        public bool WanerDaoUpdateActivityImageFolder(Dictionary<string, object> dic)
        {
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "updateactivityimagefolder", dic);
            return ri > 0;
        }

        /// <summary>
        /// 屏蔽、恢复屏蔽相册，多个相册id
        /// </summary>
        /// <param name="ids">前台数据集合</param>
        /// <param name="mappedType">映射文件类型：0-屏蔽相册，1-恢复屏蔽相册</param>
        /// <returns></returns>
        public string WanerDaoBlockActivityImageFolderByMoreid(Dictionary<string, object> dic, int mappedType)
        {
            string json = "";
            string mappedFile = "blockactivityimagefolderMoreID";
            if (mappedType == 1) mappedFile = "restoreblockactivityimagefolderMoreID";
            IEnumerator ie = dic.Keys.GetEnumerator();
            string dicId = "";
            while (ie.MoveNext())
            {
                if (ie.Current.ToString().ToLower().Equals("id"))
                {
                    dicId = dic[ie.Current.ToString()].ToString(); break;
                }
            }
            string[] arrId = dicId.Trim().Split(new char[] { ',' });
            string ids = "";
            if (arrId != null && arrId.Length > 0)
            {
                for (int i = 0; i < arrId.Length; i++)
                {
                    ids += "'" + arrId[i] + "',";
                }
            }
            dic.Add("ids", ids.TrimEnd(new char[] { ',' }));
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", mappedFile, dic);
            if (ri > 0) json = WanerDaoGlobalTip.GetInternationalizationTip("SuccessInfoCn", WanerDaoResultEnum.Success);
            else json = WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn", WanerDaoResultEnum.Failure);
            return json;
        }

        /// <summary>
        /// 屏蔽相册
        /// </summary>
        /// <param name="id">相册ID</param>
        /// <returns></returns>
        public string WanerDaoBlockActivityImageFolder(string id)
        {
            string json = string.Empty;
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "blockactivityimagefolder", dic);
            if (ri > 0) json = WanerDaoGlobalTip.GetInternationalizationTip("SuccessInfoCn", WanerDaoResultEnum.Success);
            else json = WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn", WanerDaoResultEnum.Failure);
            return json;
        }
        /// <summary>
        /// 恢复屏蔽相册
        /// </summary>
        /// <param name="id">相册ID</param>
        /// <returns></returns>
        public string WanerDaoRestoreBlockActivityImageFolder(string id)
        {
            string json = string.Empty;
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "restoreblockactivityimagefolder", dic);
            if (ri > 0) json = WanerDaoGlobalTip.GetInternationalizationTip("SuccessInfoCn", WanerDaoResultEnum.Success);
            else json = WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn", WanerDaoResultEnum.Failure);
            return json;
        }
        /// <summary>
        /// 分享别人的相册(同时分享相片)
        /// </summary>
        /// <param name="id">相册ID</param>
        /// <returns></returns>
        public bool WanerDaoShareActivityImageFolder(string id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
            string newGuid = WanerDaoGuid.GetGuid();
            dic.Add("newfolderid", newGuid);
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "deleteactivityimagebyid", dic);
            if (ri > 0)
            {
                return WanerDaoShareActivityImageFolder(id, newGuid);
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// 分享别人的相册下所有相片到指定相册下面
        /// </summary>
        /// <param name="oldFolderId">被分享的相册ID</param>
        /// <param name="newFolderId">存放的相册ID</param>
        /// <returns></returns>
        public bool WanerDaoShareActivityImageFolder(string oldFolderId, string newFolderId)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("foldid", oldFolderId);
            //WanerDaoPersonSecurity ws = new WanerDaoPersonSecurity();
            dic.Add("create_id", CommonContext.GetUserSecurityInfo().user_id); ;
            dic.Add("newfoldid", newFolderId);
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "restoreblockactivityimagefolder", dic);
            if (ri > 0)
            {
                dic.Clear();
                dic.Add("fold_id", newFolderId);
                //增加物理相片链接数
                ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "addsharefolderpythicallocationzerolink_nbr", dic);
            }
            return ri > 0;
        }



        /// <summary>
        /// 屏蔽相片
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool WanerDaoBlockActivityImage(string id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "blockactivityimage", dic);
            return ri > 0;
        }
        public string WanerDaoBlockActivityImage(Dictionary<string, object> dic)
        {
            if (WanerDaoBlockActivityImage(dic["id"].ToString()))
            {
                return WanerDaoGlobalTip.GetInternationalizationTip("SuccessInfoCn", WanerDaoResultEnum.Success);
            }
            else
            {
                return WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn", WanerDaoResultEnum.Failure);
            }
        }
        /// <summary>
        /// 恢复屏蔽相片
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool WanerDaoRestoreBlockActivityImage(string id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "restoreblockactivityimage", dic);
            return ri > 0;
        }
        /// <summary>
        /// 删除相册
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool WanerDaoDeleteActivityImageFolder(string id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "deleteactivityimagefolderbyid", dic);
            return ri > 0;
        }
        public string WanerDaoDeleteActivityImageFolder(Dictionary<string, object> dic)
        {
            //获取相册下所有的相片ID
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "getactivityimagebyfoldid", dic);
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                bool bl = false;
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    //删除相片
                    bl = WanerDaoDeleteActivityImage(dr["id"].ToString());
                    if (!bl)
                    {
                        break;
                    }
                }
                if (bl)//删除相册
                {
                    if (WanerDaoDeleteActivityImageFolder(dic["folder_id"].ToString()))
                    {
                        return WanerDaoGlobalTip.GetInternationalizationTip("SuccessInfoCn", WanerDaoResultEnum.Success);
                    } 
                    else
                    {
                        return WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn", WanerDaoResultEnum.Failure);
                    }                    
                }
                else
                {
                    return WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn", WanerDaoResultEnum.Failure);
                }
            }
            else
            {
                return WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn", WanerDaoResultEnum.Failure);
            }
        }
        /// <summary>
        /// 删除相片（会自动减少物理连接数和判断是否删除文件）
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool WanerDaoDeleteActivityImage(string id)
        {
            DataTable dt = WannerDaoImageAndFolderManage.GetActivityImageById(id);
            if (dt == null || dt.Rows.Count < 1)
            {
                return false;
            }
            string linkid = dt.Rows[0]["link_id"].ToString();
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "deleteactivityimagebyid", dic);
            if (ri > 0)
            {
                WannerDaoImageAndFolderManage.ReduceOneImagePythicalLink(linkid);
            }
            return ri > 0;
        }

        public string WanerDaoDeleteActivityImage(Dictionary<string,object> dic)
        {
            string[] ids = dic["id"].ToString().Split(',');
            bool bl = false;
            foreach (string id in ids)
            {
                bl=WanerDaoDeleteActivityImage(id);
                if (!bl)
                {
                    break;
                }
            }
            if (bl)
            {
                return WanerDaoGlobalTip.GetInternationalizationTip("SuccessInfoCn", WanerDaoResultEnum.Success);
            }
            else
            {
                return WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn", WanerDaoResultEnum.Failure);
            }
        }
        #endregion

        #region 工具方法
        /// <summary>
        /// 在Dictionary添加键值或者替换空值的键值
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="key"></param>
        /// <param name="value"></param>
        private void AddOrReplaceEmptyDicKeyValue(Dictionary<string, object> dic, string key, object value)
        {
            if (!dic.ContainsKey(key))
            {
                dic.Add(key, value);
                return;
            }
            if (string.IsNullOrEmpty(dic[key].ToString()))
            {
                dic[key] = value;
            }
        }
        /// <summary>
        /// 返回成功信息
        /// </summary>
        /// <returns></returns>
        private string ReturnSuccessJson()
        {
            string json = string.Empty;
            Dictionary<string, object> jsonDic = new Dictionary<string, object>();
            jsonDic.Add("result", true);
            json = WanerDaoJSON.GetSuccessJson(jsonDic);
            return json;
        }
        /// <summary>
        /// 返回失败信息
        /// </summary>
        /// <param name="reason"></param>
        /// <returns></returns>
        private string ReturnFailJson(string reason)
        {
            string json = string.Empty;
            Dictionary<string, object> jsonDic = new Dictionary<string, object>();
            jsonDic.Add("result", false);
            jsonDic.Add("msg", reason);
            json = WanerDaoJSON.GetSuccessJson(jsonDic);
            return json;
        }
        #endregion
        #endregion

        #region 通用获取数据集
        /// <summary>
        /// 描述：通用获取数据集
        /// </summary>
        /// <param name="sqlkey">Sql节点</param>
        /// <returns>JSON格式的数据{total:总记录数,rows:{查询的数据(id:'',name:'')}}</returns>
        private string WanerDaoPrivateData(string sqlkey)
        {
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", sqlkey);
            string json = string.Empty;
            Dictionary<string, object> result = new Dictionary<string, object>();
            if (ds != null)
            {
                if (ds.Tables.Count > 0 && ds.Tables[0] != null)
                {
                    result.Add("total", ds.Tables[0].Rows.Count);
                    result.Add("rows", WanerDaoUtils.DataTableToList(ds.Tables[0]));
                    json = WanerDaoJSON.GetSuccessJson(result);
                }
                else
                {
                    json = WanerDaoGlobalTip.GetInternationalizationTip("NoDataInfoCn", WanerDaoResultEnum.Failure);
                }
            }
            else
            {
                json = WanerDaoGlobalTip.GetInternationalizationTip("ErrorInfoCn", WanerDaoResultEnum.Failure);
            }
            return json;
        }
        #endregion

        #region 站内信

        #endregion

        #region 上传头像
        /// <summary>
        /// 描述：上传头像
        /// 作者：王薪杰
        /// 时间：2012-12-6
        /// </summary>
        /// <param name="uploadfile"></param>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string UploadAvatar(HttpPostedFile postedFile, Dictionary<string, object> dic)
        {
            string CurrentDomainPath = System.AppDomain.CurrentDomain.BaseDirectory;
            string avatarBasePath = CurrentDomainPath + WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoHeadPortrait");
            string newfilename = WanerDao2.WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid();
            string avatarWebPath = string.Empty;
            string json = string.Empty;

            if (postedFile == null)
            {
                json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("PersonalLogoUploadNull"));
            }
            else
            {
                string fileExtName = Path.GetExtension(postedFile.FileName);
                IList<string> fileExts = new List<string>() { ".jpg", ".jpeg", ".gif", ".bmp", ".png" };
                if (fileExts.Contains(fileExtName.ToLower()))
                {
                    if (postedFile.ContentLength > 0)
                    {
                        newfilename += fileExtName;
                        avatarWebPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoHeadPortrait") + newfilename;
                        string filepath = avatarBasePath + newfilename;
                        try
                        {
                            System.Drawing.Image img = System.Drawing.Image.FromStream(postedFile.InputStream);
                            if (img.Width > 0 & img.Height > 0)
                            {
                                postedFile.SaveAs(filepath);

                                IWanerDaoPersonInfoManager personalProfile = new WanerDaoPersonInfoManager();
                                if (personalProfile.UpdatePersonalLogo(avatarWebPath))
                                {
                                    json = WanerDaoJSON.GetSuccessJson(avatarWebPath);
                                }
                                else
                                {
                                    json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("PersonalLogoUploadFail"));
                                }
                            }
                            else
                            {
                                json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("IsNoImage"));
                            }
                        }
                        catch (Exception)
                        {
                            json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("IsNoImage"));
                        }

                    }
                    else
                    {
                        json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("IsNoImage"));
                    }
                }
                else
                {
                    json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("IsNoImage"));
                }
            }
            return json;
        }

        /// <summary>
        /// 描述：剪切小头像
        /// 作者：王薪杰
        /// 时间：2012-12-6
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string CutAvatar(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string CurrentDomainPath = System.AppDomain.CurrentDomain.BaseDirectory;
            string avatarBasePath = CurrentDomainPath + WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoHeadPortrait");

            string imgName = dic["imgname"].ToString();
            imgName = imgName.Substring(imgName.LastIndexOf('/') + 1);
            int width = int.Parse(dic["width"].ToString());
            int height = int.Parse(dic["height"].ToString());
            int x1 = int.Parse(dic["x1"].ToString());
            int y1 = int.Parse(dic["y1"].ToString());
            int x2 = int.Parse(dic["x2"].ToString());
            int y2 = int.Parse(dic["y2"].ToString());
            string filepath = avatarBasePath + imgName;

            System.Drawing.Image img = System.Drawing.Image.FromFile(filepath);
            if (img.Height > height || img.Width > width)
            {
                img = img.GetThumbnailImage(width, height, null, System.IntPtr.Zero);
            }

            try
            {
                /*图片剪裁*/
                //新建一个bmp图片
                System.Drawing.Image bitmap = new System.Drawing.Bitmap(100, 100);
                //新建一个画板
                System.Drawing.Graphics g = System.Drawing.Graphics.FromImage(bitmap);
                //设置高质量插值法
                g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.High;
                //设置高质量,低速度呈现平滑程度
                g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                //清空画布并以透明背景色填充
                g.Clear(System.Drawing.Color.Transparent);
                //在指定位置并且按指定大小绘制原图片的指定部分
                //g.DrawImage(img, new Rectangle(0, 0, towidth, toheight),            new Rectangle(x, y, ow, oh),            GraphicsUnit.Pixel);
                g.DrawImage(img, new System.Drawing.Rectangle(0, 0, 100, 100), new System.Drawing.Rectangle(x1, y1, x2 - x1, y2 - y1), System.Drawing.GraphicsUnit.Pixel);

                bitmap.Save(avatarBasePath + "small-" + imgName, System.Drawing.Imaging.ImageFormat.Jpeg);

                g.Dispose();
                bitmap.Dispose();
                img.Dispose();
                img = null;

                IWanerDaoPersonInfoManager personalProfile = new WanerDaoPersonInfoManager();
                if (personalProfile.UpdatePersonalSmallLogo(WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoHeadPortrait") + "small-" + imgName))
                {
                    json = WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("PersonalSmallLogoUploadSuc"));
                }
                else { json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("PersonalSmalLogoUploadFail")); }
            }
            catch (Exception)
            {
                json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("PersonalSmalLogoUploadFail"));
            }

            return json;
        }
        #endregion

        #region 获取天气
        /// <summary>
        /// 获取当前所在地天气
        /// </summary>
        /// <returns></returns>
        public string GetLocationWeather()
        {
            string latitude = "";//"30667000";
            string longitude = "";//"104016670";
            string city = "";
            // string country = "";
            string postal = "";
            WebClient client = new WebClient();
            string locationStr = client.DownloadString(WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoLocationInterface"));
            string[] locationArr = locationStr.Split(new String[] { "function" }, StringSplitOptions.RemoveEmptyEntries);
            string tempStr;
            foreach (string tempGeoip in locationArr)
            {

                if (tempGeoip.IndexOf("geoip_city()") != -1)
                {
                    tempStr = tempGeoip.Substring(tempGeoip.IndexOf("'") + 1, tempGeoip.Length - tempGeoip.IndexOf("'") - 1);
                    tempStr = tempStr.Substring(0, tempStr.IndexOf("'"));
                    city = tempStr;
                }
                if (tempGeoip.IndexOf("geoip_latitude()") != -1)
                {
                    tempStr = tempGeoip.Substring(tempGeoip.IndexOf("'") + 1, tempGeoip.Length - tempGeoip.IndexOf("'") - 1);
                    tempStr = tempStr.Substring(0, tempStr.IndexOf("'")).Replace(".", "");
                    while (tempStr.Length < 8)
                    {
                        tempStr = tempStr + "0";
                    }
                    latitude = tempStr;
                }

                if (tempGeoip.IndexOf("geoip_longitude()") != -1)
                {
                    tempStr = tempGeoip.Substring(tempGeoip.IndexOf("'") + 1, tempGeoip.Length - tempGeoip.IndexOf("'") - 1);
                    tempStr = tempStr.Substring(0, tempStr.IndexOf("'")).Replace(".", "");
                    while (tempStr.Length < 9)
                    {
                        tempStr = tempStr + "0";
                    }
                    longitude = tempStr;
                }
                if (tempGeoip.IndexOf("geoip_postal_code()") != -1)
                {
                    tempStr = tempGeoip.Substring(tempGeoip.IndexOf("'") + 1, tempGeoip.Length - tempGeoip.IndexOf("'") - 1);
                    tempStr = tempStr.Substring(0, tempStr.IndexOf("'"));
                    postal = tempStr;
                }
            }

            string param = "";
            string weather = "";
            if (city != "")
            {
                param = city;
                //if (country != "" && country != "United States") {
                //    param += "," + country;
                //}
                weather = GetWeather(param);
            }

            if (weather == "")
            {
                if (latitude != "" && longitude != "")
                {
                    param = ",,," + latitude + "," + longitude;
                    weather = GetWeather(param);
                }


            }

            if (weather == "")
            {
                if (postal != "")
                {
                    param = postal;
                    weather = GetWeather(param);
                }

            }
            if (weather == "")
            {
                return WanerDaoJSON.GetErrorJson(weather);
            }
            else
            {
                return WanerDaoJSON.GetSuccessJson(weather);
            }
        }

        /// <summary>
        /// 根据参数获取天气
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public string GetWeather(string param)
        {

            XmlDocument xmlDoc = new XmlDocument();
            string weather = "";
            try
            {
                xmlDoc.Load(WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoWeatherInterface") + param);
                XmlNode rootNode = xmlDoc.SelectSingleNode("//current_conditions/condition");

                if (rootNode != null)
                {
                    weather = rootNode.Attributes["data"].Value;
                }
            }
            catch (Exception)
            {
            }

            return weather;
        }

        /// <summary>
        /// 获取ip所在 州省 城市
        /// </summary>
        /// <returns></returns>
        public string GetCurrentLocation()
        {
            string city = string.Empty;
            string region = string.Empty;

            WebClient client = new WebClient();
            string locationStr = client.DownloadString("http://j.maxmind.com/app/geoip.js");
            string[] locationArr = locationStr.Split(new String[] { "function" }, StringSplitOptions.RemoveEmptyEntries);
            string tempStr;
            foreach (string tempGeoip in locationArr)
            {
                if (tempGeoip.IndexOf("geoip_city()") != -1)
                {
                    tempStr = tempGeoip.Substring(tempGeoip.IndexOf("'") + 1, tempGeoip.Length - tempGeoip.IndexOf("'") - 1);
                    tempStr = tempStr.Substring(0, tempStr.IndexOf("'"));
                    city = tempStr;
                }

                if (tempGeoip.IndexOf("geoip_region_name()") != -1)
                {
                    tempStr = tempGeoip.Substring(tempGeoip.IndexOf("'") + 1, tempGeoip.Length - tempGeoip.IndexOf("'") - 1);
                    tempStr = tempStr.Substring(0, tempStr.IndexOf("'"));
                    region = tempStr;
                }

            }

            return WanerDaoJSON.GetSuccessJson(city + ',' + region);

        }
        #endregion

        #region 日志 照片 视频 杂烩 转发

        /// <summary>
        /// 转发图片，视频，日志
        /// </summary>
        /// <param name="dic">string (imageid或者videoid或者blogid），string targetid（转发到哪个地方）</param>
        /// <returns></returns>
        public string ForwardImgVdoBlog(Dictionary<string, object> dic)
        {
            string imageid = dic.ContainsKey("imageid") ? dic["imageid"].ToString() : null;
            string videoid = dic.ContainsKey("videoid") ? dic["videoid"].ToString() : null;
            string blogid = dic.ContainsKey("blogid") ? dic["blogid"].ToString() : null;
            string targetid = dic.ContainsKey("targetid") ? dic["targetid"].ToString() : null;
            string json = string.Empty;
            if (blogid != null)
            {
                WanerDaoBlogManager blogMgr = new WanerDaoBlogManager();
                json = blogMgr.ForwardBlog(blogid, targetid);
            }

            if (videoid != null)
            {
                WanerDaoVideoManager videoMgr = new WanerDaoVideoManager();
                json = videoMgr.ForwardVideo(videoid, targetid);
            }

            if (imageid != null)
            {
                WanerDaoImageManager ImgMgr = new WanerDaoImageManager();
                json = ImgMgr.ForwardImage(imageid, targetid);
            }

            return json;
        }

        /// <summary>
        /// 转发图片，视频，日志（徐蓓2012-8-8修改）
        /// </summary>
        /// <param name="dic">string (imageid或者videoid或者blogid），string targetid（转发到哪个地方）,string newName（新名称）</param>
        /// <returns></returns>
        public string ForwardImgVdoBlogX(Dictionary<string, object> dic)
        {
            string imageid = dic.ContainsKey("imageid") ? dic["imageid"].ToString() : null;
            string videoid = dic.ContainsKey("videoid") ? dic["videoid"].ToString() : null;
            string blogid = dic.ContainsKey("blogid") ? dic["blogid"].ToString() : null;
            string targetid = dic.ContainsKey("targetid") ? dic["targetid"].ToString() : null;
            string newName = dic.ContainsKey("newName") ? dic["newName"].ToString() : null;
            string json = string.Empty;
            if (blogid != null)
            {
                WanerDaoBlogManager blogMgr = new WanerDaoBlogManager();
                json = blogMgr.ForwardBlog(blogid, targetid, newName);
            }

            if (videoid != null)
            {
                WanerDaoVideoManager videoMgr = new WanerDaoVideoManager();
                json = videoMgr.ForwardVideo(videoid, targetid, newName);
            }

            if (imageid != null)
            {
                WanerDaoImageManager ImgMgr = new WanerDaoImageManager();
                json = ImgMgr.ForwardImage(imageid, targetid, newName);
            }

            return json;
        }
        /// <summary>
        /// 转发视频册或者相册
        /// </summary>
        /// <param name="dic">string (imgfolderid或者vdofolderid)，string isCreateFolder(0 or 1),string folderIdOrName </param>
        /// <returns></returns>
        public string ForwardImgFolderVdoFolder(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string imgFolderId = dic.ContainsKey("imgfolderid") ? dic["imgfolderid"].ToString() : null;
            string vdoFolderId = dic.ContainsKey("vdofolderid") ? dic["vdofolderid"].ToString() : null;
            bool isCreateFolder = dic["isCreateFolder"].ToString() == "0" ? false : true;
            string folderIdOrName = dic["folderIdOrName"].ToString();
            if (imgFolderId != null)
            {
                WanerDaoImageManager ImgMgr = new WanerDaoImageManager();
                json = ImgMgr.ForwardImageFolder(imgFolderId, isCreateFolder, folderIdOrName);
            }

            if (vdoFolderId != null)
            {
                WanerDaoVideoManager videoMgr = new WanerDaoVideoManager();
                json = videoMgr.ForwardVideoFolder(vdoFolderId, isCreateFolder, folderIdOrName);
            }
            return json;
        }

        /// <summary>
        /// 转发状态或者链接
        /// </summary>
        /// <param name="dic">string (linkid或者stateid）</param>
        /// <returns></returns>
        public string ForwardStateLink(Dictionary<string, object> dic)
        {
            string linkid = dic.ContainsKey("linkid") ? dic["stateid"].ToString() : null;
            string stateid = dic.ContainsKey("stateid") ? dic["stateid"].ToString() : null;
            string json = string.Empty;
            WanerDaoPersonState state = new WanerDaoPersonState();
            if (linkid != null)
            {
                json = state.Forward_Link(linkid);
            }

            if (stateid != null)
            {
                json = state.Forward_State(stateid);
            }
            return json;
        }

        /// <summary>
        /// 转发日志或者照片或者视频或者杂烩
        /// </summary>
        /// <param name="dic">string 类型( Blog(日志id),ImageFolder(相册id),Image(照片id),VideoFolder(视频册id),Video(视频id),Information(杂烩id)),string Categoryid,string isCreateNewFolder(0或者1)
        /// string imageFolderNameOrID</param>
        /// 字典的key值为类型,对应的value值为id 
        /// isCreateNewFolder 相册转发-是否创建新相册 为0或者1  0为不创建 1为创建
        /// imageFolderNameOrID 当转发到某个已经存在的相册是,此为相册id,当新建相册时,为新建相册的名字
        /// 视频转发:当转发的为视频时候imageFolderNameOrID代表:当转发到某个已经存在的视频册时,此为视频册id,当新建视频册时,为新建视频册的名字
        /// <returns></returns>
        public string ForwardTheBlogOrImageOrVideoOrInformation(Dictionary<string, object> dic)
        {
            string Blogid = dic.ContainsKey("Blog") ? dic["Blog"].ToString() : null;

            string ImageFolderid = dic.ContainsKey("ImageFolder") ? dic["ImageFolder"].ToString() : null;
            string Imageid = dic.ContainsKey("Image") ? dic["Image"].ToString() : null;

            string VideoFolderid = dic.ContainsKey("VideoFolder") ? dic["VideoFolder"].ToString() : null;
            string Videoid = dic.ContainsKey("Video") ? dic["Video"].ToString() : null;

            string Informationid = dic.ContainsKey("Information") ? dic["Information"].ToString() : null;
            string Categoryid = dic.ContainsKey("Categoryid") ? dic["Categoryid"].ToString() : null;
            bool isCreateNewFolder = dic.ContainsKey("imageFolderNameOrID") ? dic["imageFolderNameOrID"].ToString() == "1" ? true : false : false;
            string imageFolderNameOrID = dic.ContainsKey("imageFolderNameOrID") ? dic["imageFolderNameOrID"].ToString() : null;
            string json = string.Empty;
            int result = 0;

            if (dic.Keys.Count > 0 && (Categoryid != null || imageFolderNameOrID != null) && (Blogid != null || Imageid != null || Videoid != null || ImageFolderid != null || Informationid != null))
            {
                if (Blogid != null)//为博客
                {

                    WanerDaoIBLL.IPerson.IWanerDaoBlogManager IBlog = new WanerDaoBLL.Person.WanerDaoBlogManager();
                    PersonalBlogModel pbmodel = IBlog.GetPersonalBlogModel(Blogid);
                    if (pbmodel.user_id == Pspmodel.user_id)
                    {
                        return WanerDaoJSON.GetErrorJson("你不能转发自己的日志");
                    }
                    JObject jObject = WanerDaoJSON.ParseJson(IBlog.GetDefultPermission());
                    string default_permission = string.Empty;
                    if (jObject["result"].ToString().ToLower() == "false")
                    { //没有默认权限 取分类的权限
                        default_permission = IBlog.GetPersonalBlogCategory(Categoryid).permission;
                    }
                    else
                    {
                        default_permission = jObject["default_permission"].ToString();
                    }
                    Dictionary<string, object> mydic = new Dictionary<string, object>() { 
                       {"copyid",Blogid},{"user_id",Pspmodel.user_id},{"categoryid",Categoryid},{"default_permission",default_permission}
                    };
                    result = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "CopyBlogToMyblog", mydic);
                    if (result > 0)
                    {
                        json = WanerDaoJSON.GetSuccessJson("转发成功");
                    }
                    else
                    {
                        json = WanerDaoJSON.GetErrorJson("操作失败");
                    }
                }
                else if (ImageFolderid != null || imageFolderNameOrID != null)//为相册
                {
                    WanerDaoIBLL.IPerson.IWanerDaoImageManager Iiamge = new WanerDaoBLL.Person.WanerDaoImageManager();
                    ImageFolderModel ifmodel = Iiamge.GetImageFolderModelById(ImageFolderid);
                    string guest_id = ifmodel.user_id;
                    if (guest_id == Pspmodel.user_id)
                    {
                        return WanerDaoJSON.GetErrorJson("你不能转发自己的相册");
                    }
                    string rule = string.Empty;
                    IList<PersonalPermissionModel> Ilistppmodel = WanerDaoPropertyPermission.getAllPermission(Pspmodel.user_id);
                    foreach (PersonalPermissionModel ppmodel in Ilistppmodel)
                    {
                        if (WanerDaoPropertyPermission.hasPermission(Pspmodel.user_id, guest_id, ppmodel.id))
                        {
                            if (rule.IndexOf("and") == -1)
                            {
                                rule += " and (permission='" + ppmodel.id + "'";
                            }
                            else
                            {
                                rule += " or permission='" + ppmodel.id + "'";
                            }
                        }
                    }
                    if (rule != string.Empty)
                    {
                        rule += ")";
                    }

                    if (ImageFolderid != null && isCreateNewFolder == false)//转发到某个已经存在的相册
                    {
                        Dictionary<string, object> mydic = new Dictionary<string, object>() { 
                         {"In_user_id",Pspmodel.user_id},{"In_imagefolder_id",ImageFolderid},{"In_isCreateNewFolder",false},
                         {"In_folderNameOrID",imageFolderNameOrID},{"In_permission",rule}
                        };
                        result = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "CopyImageFolderToMyFolder", mydic);
                        if (result > 0)
                        {
                            json = WanerDaoJSON.GetSuccessJson("转发成功");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("操作失败");
                        }
                    }
                    else
                    {
                        Dictionary<string, object> mydic = new Dictionary<string, object>() { 
                         {"In_user_id",Pspmodel.user_id},{"In_imagefolder_id",ImageFolderid},{"In_isCreateNewFolder",true},
                         {"In_folderNameOrID",imageFolderNameOrID},{"In_permission",rule}
                        };
                        result = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "CopyImageFolderToMyFolder", mydic);
                        if (result > 0)
                        {
                            json = WanerDaoJSON.GetSuccessJson("转发成功");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("操作失败");
                        }
                    }
                }
                else if (Imageid != null)//为照片
                {
                    //imageFolderNameOrID 为照片转发的目标相册id

                    if (!string.IsNullOrEmpty(imageFolderNameOrID) && !string.IsNullOrEmpty(Imageid))
                    {
                        IWanerDaoImageManager Iimgmanger = new WanerDaoImageManager();
                        PersonalImageModel pimgModel = Iimgmanger.GetPersonalImageModelById(Imageid);
                        if (pimgModel != null)
                        {
                            pimgModel.user_id = Pspmodel.user_id;
                            pimgModel.fold_id = imageFolderNameOrID;
                        }
                        if (Iimgmanger.AddPersonalImage(pimgModel))
                        {
                            json = WanerDaoJSON.GetSuccessJson("转发成功");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("操作失败");
                        }
                    }
                    else
                    {
                        json = WanerDaoJSON.GetErrorJson("参数错误");
                    }
                }
                else if (VideoFolderid != null || imageFolderNameOrID != null) //为视频册
                {
                    WanerDaoIBLL.IPerson.IWanerDaoVideoManager Ivideo = new WanerDaoBLL.Person.WanerDaoVideoManager();
                    VideoFolderModel ifmodel = Ivideo.SelectVideoFolderById(VideoFolderid);
                    string guest_id = ifmodel.user_id;
                    if (guest_id == Pspmodel.user_id)
                    {
                        return WanerDaoJSON.GetErrorJson("你不能转发自己的相册");
                    }
                    string rule = string.Empty;
                    IList<PersonalPermissionModel> Ilistppmodel = WanerDaoPropertyPermission.getAllPermission(guest_id);
                    foreach (PersonalPermissionModel ppmodel in Ilistppmodel)
                    {
                        if (WanerDaoPropertyPermission.hasPermission(guest_id, Pspmodel.user_id, ppmodel.id))
                        {
                            if (rule.IndexOf("and") == -1)
                            {
                                rule += " and (permission='" + ppmodel.id + "'";
                            }
                            else
                            {
                                rule += " or permission='" + ppmodel.id + "'";
                            }
                        }
                    }
                    if (rule != string.Empty)
                    {
                        rule += ")";
                    }

                    if (VideoFolderid != null && isCreateNewFolder == false)//转发到某个已经存在的视频册
                    {
                        Dictionary<string, object> mydic = new Dictionary<string, object>() { 
                         {"In_user_id",Pspmodel.user_id},{"In_imagefolder_id",VideoFolderid},{"In_isCreateNewFolder",false},
                         {"In_folderNameOrID",imageFolderNameOrID},{"In_permission",rule}
                        };
                        result = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "CopyVideoFolderToMyFolder", mydic);
                        if (result > 0)
                        {
                            json = WanerDaoJSON.GetSuccessJson("转发成功");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("操作失败");
                        }
                    }
                    else
                    {
                        Dictionary<string, object> mydic = new Dictionary<string, object>() { 
                         {"In_user_id",Pspmodel.user_id},{"In_imagefolder_id",VideoFolderid},{"In_isCreateNewFolder",true},
                         {"In_folderNameOrID",imageFolderNameOrID},{"In_permission",rule}
                        };
                        result = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "CopyVideoFolderToMyFolder", mydic);
                        if (result > 0)
                        {
                            json = WanerDaoJSON.GetSuccessJson("转发成功");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("操作失败");
                        }
                    }
                }
                else if (Videoid != null)//为视频
                {
                    //imageFolderNameOrID 为照片转发的目标视频册id

                    if (!string.IsNullOrEmpty(imageFolderNameOrID) && !string.IsNullOrEmpty(Videoid))
                    {
                        IWanerDaoVideoManager IvdoManger = new WanerDaoVideoManager();
                        PersonalVideoModel pvdoModel = IvdoManger.SelectPersonalVideoByVideoId(Videoid);
                        if (pvdoModel != null)
                        {
                            pvdoModel.user_id = Pspmodel.user_id;
                            pvdoModel.fold_id = imageFolderNameOrID;
                        }
                        if (IvdoManger.AddPersonalVideo(pvdoModel))
                        {
                            json = WanerDaoJSON.GetSuccessJson("转发成功");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("操作失败");
                        }
                    }
                    else
                    {
                        json = WanerDaoJSON.GetErrorJson("参数错误");
                    }
                }
                else//为杂烩
                {

                }

            }
            else
            {
                return null;
            }
            return json;
        }
        #endregion

        #region 权限
        /// <summary>
        /// 获取当前用户所有权限
        /// </summary>
        /// <returns></returns>
        public string GetAllPermissionForCurUser()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>() { { "user_Id", Pspmodel.user_id } };
            return GetAllPermission(dic);
        }

        /// <summary>
        /// 获取用户所有权限
        /// user_Id 用户编号
        /// </summary>
        /// <returns></returns>
        public string GetAllPermission(Dictionary<string, object> dic)
        {
            try
            {
                return WanerDaoPropertyPermission.getAllPermissionStr(dic["user_Id"].ToString());
            }
            catch (Exception)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("ReuqestFail"));
            }
        }


        /// <summary>
        /// 获或当前用户自定义权限数
        /// </summary>
        /// <returns></returns>
        public string GetCountOfCustomPermissionForCurUser()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>() { { "user_Id", Pspmodel.user_id } };
            return GetCountOfCustomPermission(dic);
        }

        /// <summary>
        /// 获取用户自定义权限数
        /// </summary>
        /// <param name="?"></param>
        /// <returns></returns>
        public string GetCountOfCustomPermission(Dictionary<string, object> dic)
        {
            try
            {
                return WanerDaoJSON.GetSuccessJson(WanerDaoPropertyPermission.getCount_propertyDefaultPermission(dic["user_Id"].ToString()));
            }
            catch (Exception)
            {
                return WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("ReuqestFail"));
            }
        }

        /// <summary>
        /// 获取当前用户所有自定义权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string GetAllCustomPermissionForCurUser()
        {
            return WanerDaoPropertyPermission.get_propertyDefaultPermission(Pspmodel.user_id);
        }

        /// <summary>
        /// 获取自定义权限内容
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string GetCustomPermissionById(Dictionary<string, object> dic)
        {
            string permissionId = dic["perid"].ToString();
            return WanerDaoPropertyPermission.get_DefaultPermission(permissionId);
        }

        /// <summary>
        /// 添加或修改权限
        /// </summary>
        /// <param name="dic">权限名:pername,旧权限名：oldper(修改必传),允许对象集合：allow，拒绝对象集合：refuse，是否设为默认权限：setdefault</param>
        /// <returns></returns>
        public string AddOrUpdateCustomPermission(Dictionary<string, object> dic)
        {
            string json = null;
            try
            {
                string user_id = Pspmodel.user_id;//用户编号
                string per_name = dic["pername"].ToString();//权限名
                string old_permission = dic.ContainsKey("oldper") ? dic["oldper"].ToString() : "";//旧权限名
                string allow_obj = dic["allow"].ToString();//是否允许
                string refuse_obj = dic["refuse"].ToString();//是否拒绝
                bool if_set_default = dic["setdefault"].ToString() == "1" ? true : false;//是否设为默认权限
                string permission_id = WanerDaoPropertyPermission.add_propertyPermission(user_id, "", old_permission, per_name, allow_obj, refuse_obj, if_set_default);
                json = WanerDaoJSON.GetSuccessJson(permission_id);
            }
            catch (Exception)
            {
                json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("AddInfoFail"));
            }
            return json;
        }

        /// <summary>
        /// 删除自定义权限
        /// </summary>
        /// <param name="dic">权限编号：perId</param>
        /// <returns></returns>
        public string DelCustomPermission(Dictionary<string, object> dic)
        {
            string json = null;
            string per_id = dic["perId"].ToString();
            if (WanerDaoPropertyPermission.del_propertyPermission(per_id) > 0)
                json = WanerDaoJSON.GetSuccessJson("删除成功");
            else
                json = WanerDaoJSON.GetErrorJson("删除失败");
            return json;
        }

        /// <summary>
        /// 判断当前用户是否能添加自定义权限
        /// </summary>
        /// <returns></returns>
        public string CanAddCustomPermissionForCurUser()
        {
            string json = string.Empty;
            Dictionary<string, object> dic = new Dictionary<string, object>() { { "user_Id", Pspmodel.user_id } };
            int customPerCount = int.Parse(WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerDaoCustomPermissionCount"));
            int count = int.Parse(WanerDaoPropertyPermission.getCount_propertyDefaultPermission(dic["user_Id"].ToString()));
            if (count < customPerCount)
            {
                json = WanerDaoJSON.GetSuccessJson("");
            }
            else
            {
                json = WanerDaoJSON.GetErrorJson("");
            }
            return json;
        }
        #endregion


        #region 个人日志共享到活动留言感想表
        /// <summary>
        /// 个人日志共享到活动留言感想表
        /// </summary>
        /// <param name="dic">前台获取数据集合-id:日志表id，active_id:活动id,activity_name:活动名,
        ///                     create_id:操作人id,SUBJECT:主题content:内容</param>
        /// <returns>是否共享成功的提示信息</returns>
        public string personalLogShareToActivity(Dictionary<string, object> dic)
        {
            string json = WanerDaoJSON.GetErrorJson("很抱歉，操作失败");
            DataSet ds = null;
            bool isInsert = false;
            ds = DbHelperFactory.SingleInstance().GetDataSet("ActivitySql", "searchActivitypostsbyIdAndActivityId", dic);
            if (ds != null && ds.Tables.Count > 0)
            {
                if (WanerDaoValidation.ConvertToInt(ds.Tables[0].Rows[0][0]) > 0)
                {
                    json = WanerDaoJSON.GetErrorJson("该个人日志已经存在活动日志表中");
                }
                else
                {
                    isInsert = true;
                }
            }
            if (isInsert)
            {
                dic.Add("post_date", DateTime.Now);
                dic.Add("counter", 0);
                dic.Add("is_block", 0);
                dic.Add("active", 1);
                int iResut = DbHelperFactory.SingleInstance().ExecuteNonQuery("ActivitySql", "addActivityposts", dic);
                if (iResut > 0)
                {
                    json = WanerDaoJSON.GetSuccessJson("恭喜，共享成功");
                }
                else
                {
                    json = WanerDaoJSON.GetErrorJson("抱歉 共享失败");
                }

            }

            return json;

        }
        #endregion


        #region  查询活动分类以及该分类下的最新活动
        /// <summary>
        ///  查询活动分类以及该分类下的最新活动（分类分页）
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string GetActivityCategoryAndActivity(Dictionary<string, object> dic, string NewActivityByCategory)
        {
            string json = "";
            DataSet ds = null;
            ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "wanerdaoPagination", dic);
            Dictionary<string, object> result = new Dictionary<string, object>();
            if (ds != null)
            {
                if (ds.Tables.Count > 0 && ds.Tables[0] != null && ds.Tables[1] != null && ds.Tables[1].Rows.Count > 0)
                {
                    result.Add("total", ds.Tables[0].Rows[0][0]);
                    result.Add("rows", DataTableToListForActivityCategory(ds.Tables[1], NewActivityByCategory));
                    result.Add("rootimgpath", WannerDaoImageAndFolderManage.GetWebRootImagePath());
                    json = WanerDaoJSON.GetSuccessJson(result);
                }


            }
            return json;
        }
        /// <summary>
        ///  查询活动分类以及该分类下的最新活动
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="NewActivityByCategory"></param>
        /// <returns></returns>
        public List<Dictionary<string, object>> DataTableToListForActivityCategory(DataTable dt, string NewActivityByCategory)
        {
            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            if (dt == null || dt.Rows.Count < 1)
            {
                return null;
            }
            foreach (DataRow dr in dt.Rows)
            {
                Dictionary<string, object> dtJSON = new Dictionary<string, object>();
                foreach (DataColumn dc in dt.Columns)
                {
                    dtJSON.Add(dc.ColumnName, dr[dc.ColumnName]);
                }
                Dictionary<string, object> resultChild = new Dictionary<string, object>();
                DataTable dtChild = new DataTable();
                Dictionary<string, object> dicChild = new Dictionary<string, object>();
                dicChild.Add("category_id", dr["category_id"]);
                dicChild.Add("section_type", dr["section_type_id"]);
                dtChild = DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("CommonSQL", NewActivityByCategory, dicChild);
                resultChild.Add("rows", WanerDaoUtils.DataTableToList(dtChild));
                string json = WanerDaoJSON.GetSuccessJson(resultChild);
                dtJSON.Add("rowsChild", json);

                list.Add(dtJSON);
            }
            return list;
        }


        #endregion



        #region 活动或个人相册照片上传
        /// <summary>
        /// 活动或个人相册照片上传
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string AlbumPhotoUpload(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            HttpPostedFile uploadFile = HttpContext.Current.Request.Files[0];//上传的图片
            string batchId = dic["batchid"].ToString();//批次id
            string fileExt = uploadFile.FileName.Substring(uploadFile.FileName.LastIndexOf("."));//图片扩展名

            string guid = WanerDaoGuid.GetGuid();//guid
            string photoName = guid + fileExt;//图片名
            string photoThumbnailName = guid + "-300x200" + fileExt;//缩略图名
            string tempWebPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoPhotoTemPath") + batchId + "/";//web站内临时路径
            string uploadPath = HttpContext.Current.Server.MapPath("~" + tempWebPath);//临时上传本地路径
            string photoOldName = uploadFile.FileName.Replace(fileExt, "");//文件名

            if (SaveFile(uploadFile, uploadPath, photoName))
            {
                WanerDaoThumbnail.MakeThumbnailImage(uploadPath + photoName, uploadPath + photoThumbnailName, 300, 200);
                json = WanerDaoJSON.GetSuccessJson((tempWebPath + photoThumbnailName) + "|" + photoName + "|" + photoOldName);
            }
            else
            {
                json = WanerDaoJSON.GetErrorJson("");
            }

            return json;
        }

        /// <summary>
        /// 文件存储
        /// </summary>
        /// <param name="httpPosteFile"></param>
        /// <param name="fileSavePath"></param>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public static bool SaveFile(HttpPostedFile httpPosteFile, String fileSavePath, string fileName)
        {
            Boolean isSuccess = false;
            try
            {
                if (!Directory.Exists(fileSavePath))
                {
                    Directory.CreateDirectory(fileSavePath);
                }
                httpPosteFile.SaveAs(fileSavePath + fileName);
                isSuccess = true;
                return isSuccess;
            }
            catch
            {
                return isSuccess;
            }
        }

        /// <summary>
        /// 照片确认上传
        ///  个人共享相册存储地址为：YYYY-MM/DD/UserID/PersonalImageFolderID/；
        ///  活动自建相册物理存储地址为：YYYY-MM/DD/ActivityID/ActivityImageFolderID/
        /// </summary>
        /// <param name="dic">string albumtype(1：活动，2：个人),batchid (批次id),
        /// pList(照片列表) , permissionId, folderId(相册编号）， addFolderName，activityId（活动编号，如果是个人相册上传为分享的活动编号，活动相册上传为活动编号)
        /// </param>
        /// <returns></returns>
        public string AlbumPhotoSumitUpload(Dictionary<string, object> dic)
        {
            string json = string.Empty;

            ///必须传参数
            int albumType = Convert.ToInt32(dic["albumtype"]);//1：活动，2：个人
            string batchId = dic["batchid"].ToString();//批次id
            string[] PhotoList = dic["pList"].ToString().DescapeSpecialchar().Split(':');//照片列表
            string permissionId = dic["permissionId"].ToString();//权限
            string albumId = dic["folderId"].ToString();//相册编号
            string addFolderName = dic["addFolderName"].ToString();//添加新文件夹
            string activityId = dic["activityId"].ToString();//活动编号，如果是个人相册上传为分享的活动编号，活动相册上传为活动编号

            ///上传所需

            string tempWebPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoPhotoTemPath") + batchId + "/";//临时上传Web路径
            string tempLocalPath = HttpContext.Current.Server.MapPath("~" + tempWebPath);//临时上传本地路径
            string webUpBasePath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoPhotoBasePath");//上传Web基础路径
            string webUpPath = string.Empty;//上传Web路径
            string uploadLocalPath = string.Empty;//上传本地路径
            string userId = Pspmodel.user_id;//用户编号
            string useridOrActivityid = string.Empty;//活动或者用户编号

            //创建相册
            if (addFolderName != string.Empty && string.IsNullOrEmpty(albumId))
            {
                albumId = WanerDaoGuid.GetGuid();
                switch (albumType)
                {
                    case 1://活动相册
                        #region 在此处编写活动相册新建代码
                        ActivityImageFolderModel imageFolder = new ActivityImageFolderModel();
                        imageFolder.id = albumId;
                        imageFolder.user_id = Pspmodel.user_id;
                        imageFolder.activity_id = activityId;
                        imageFolder.folder_name = addFolderName;
                        imageFolder.is_system = false;
                        imageFolder.is_block = false;
                        if (CreateActivityImageFolder(imageFolder,ref albumId))
                        {
                            useridOrActivityid = dic["activityId"].ToString();
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("PhotoAlbumCreateFail"));
                            return json;
                        }
                        #region 同步共享到个人相册
                        #endregion
                        #endregion
                        break;
                    case 2://个人相册
                        #region 在此处编写个人相册新建代码
                        //添加相册
                        string defalutIconPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerDaoImageFolderIconDefaultPath");//读取默认配置的默认相册图标路径
                        ImageFolderModel imgsFolder = new ImageFolderModel();
                        imgsFolder.id = albumId;
                        imgsFolder.user_id = Pspmodel.user_id;
                        imgsFolder.cover_path = defalutIconPath;
                        imgsFolder.create_date = DateTime.Now;
                        imgsFolder.description = "";
                        imgsFolder.folder_name = addFolderName;
                        imgsFolder.is_system = false;
                        imgsFolder.permission = string.IsNullOrEmpty(permissionId)==true?CommonContext.PublicPermission:permissionId;;//CommonContext.PublicPermission;// "d500f146912111e0bae500210044b80f";
                        imgsFolder.share_key_id = "-1";
                        WanerDaoImageManager im = new WanerDaoImageManager();
                        string newalbumId=im.ReturnFolderID(addFolderName);
                        if (!string.IsNullOrEmpty(newalbumId))
                        {
                            albumId = newalbumId;
                        }
                        else
                        {
                            ////执行添加相册
                            if (im.AddImageFolder(imgsFolder))
                            {
                                useridOrActivityid = Pspmodel.user_id;
                            }
                            else
                            {
                                json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("PhotoAlbumCreateFail"));
                                return json;
                            }
                        }
                        
                        #endregion
                        break;
                }
            }
            else
            {
                switch (albumType)
                {
                    case 1://活动相册
                        useridOrActivityid = activityId;
                        break;
                    case 2://个人相册
                        useridOrActivityid = Pspmodel.user_id;                        
                        break;
                }
            }

            webUpPath = webUpBasePath + GetInnerPathByImageType(useridOrActivityid, albumId);//生成上传Web路径
            uploadLocalPath = HttpContext.Current.Server.MapPath("~" + webUpPath);//上传本地路径
            if (!Directory.Exists(uploadLocalPath))
            {
                try
                {
                    Directory.CreateDirectory(uploadLocalPath);
                }
                catch (Exception)
                {
                    json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("PhotoAlbumCreateFail"));
                    return json;
                }
            }

            int successCount = 0;//成功数
            ///循环保存照片
            foreach (string photo in PhotoList)
            {
                string photoFileName = photo.Split(',')[0];
                string oldPhotoName = photo.Split(',')[1];
                string photoId = photo.Substring(0, photoFileName.IndexOf('.')) + useridOrActivityid.Substring(0,8);
                string thumbnailPhoto = photoFileName.Replace(".", "-300x200.");
               
                if (!File.Exists(tempLocalPath + photoFileName) & !File.Exists(tempLocalPath + thumbnailPhoto)) { continue; }//临时文件夹内的图片不存在则跳过本次保存
                long fileSize = new FileInfo(tempLocalPath + photoFileName).Length;
                File.Copy(tempLocalPath + photoFileName, uploadLocalPath + photoFileName);
                File.Copy(tempLocalPath + thumbnailPhoto, uploadLocalPath + thumbnailPhoto);

                if (WannerDaoImageAndFolderManage.InsertImagePythicalLocation(photoId, webUpPath + photoFileName, webUpPath + thumbnailPhoto, fileSize, userId))
                {
                    switch (albumType)
                    {
                        case 1://活动相册
                            //创建相片
                            string activityImageId = WanerDaoGuid.GetGuid();
                            int maxActivityImageSequence = GetImageActivityMaxQuence(albumId, useridOrActivityid);
                            if (InsertImageActivity(activityImageId, Pspmodel.user_id, useridOrActivityid, photoId, albumId, oldPhotoName, webUpPath + photoFileName, webUpPath + thumbnailPhoto, fileSize, maxActivityImageSequence, "", 1))
                            {
                                successCount++;
                            }
                            break;
                        case 2://个人相册
                            WanerDaoImageManager IimgManager = new WanerDaoImageManager();
                            int maxSequence = IimgManager.GetMaxSequenceOfImageFolder(userId, albumId);//获取最大的排序

                            PersonalImageModel pimgModel = new PersonalImageModel()
                            {
                                id = WanerDaoGuid.GetGuid(),
                                user_id = Pspmodel.user_id,
                                counter = 0,
                                description = "",
                                fileSize = fileSize,
                                fold_id = albumId,
                                image_name = oldPhotoName,
                                image_path = webUpPath + photoFileName,
                                image_small_path = webUpPath + thumbnailPhoto,
                                is_submit = true,
                                link_id = photoId,
                                is_cover = false,
                                upload_date = DateTime.Now,
                                active = true,
                                weather = "",
                                location = "",
                                permission = permissionId,//CommonContext.PublicPermission,// "d500f146912111e0bae500210044b80f",//公共
                                sequence = maxSequence + 1//最大排序+1
                            };
                            if (IimgManager.SelectImageCountByFoldId(albumId) == 0)
                            {
                                pimgModel.is_cover = true;
                            }
                            if (IimgManager.AddPersonalImage(pimgModel))
                            {
                                successCount++;
                            }
                            break;
                    }

                }
            }

            if (successCount > 0)
            {
                json = WanerDaoJSON.GetSuccessJson(string.Format(WanerDaoGlobalTip.GetInternationalizationTip("PhotoUpdateSuc"), successCount));
            }
            else
            {
                json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("UploadFailed"));
            }
            try
            {
                DeleteDir(tempLocalPath);
            }
            catch (Exception)
            {
            }
            //if (albumType==1)
            //{
            //    Dictionary<string, object> refDic = dic;
            //    refDic["albumtype"] = 2;
            //    AlbumPhotoSumitUpload(refDic);
            //}
            //else
            //{
            //    try
            //    {
            //        DeleteDir(tempLocalPath);
            //    }
            //    catch (Exception)
            //    {
            //    }
            //}
            return json;
        }

        public string ShareImage(string batchId, string pList)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("albumtype", 2);
            param.Add("batchid", batchId);
            param.Add("pList", pList);
            param.Add("folderId", CommonContext.GetUserSecurityInfo().user_id);//默认相册
            param.Add("permissionId", string.Empty);
            param.Add("addFolderName", string.Empty);
            param.Add("activityId", string.Empty);
            return AlbumPhotoSumitUpload(param);
        }
        /// <summary>
        /// 创建活动相册
        /// </summary>
        /// </param>
        /// <returns></returns>
        public static bool CreateActivityImageFolder(ActivityImageFolderModel activityImagefolder, ref string albumid)
        {
            if (string.IsNullOrEmpty(activityImagefolder.id))
            {
                activityImagefolder.id = WanerDaoGuid.GetGuid();
            }
            int ri = -1;
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", activityImagefolder.user_id);
            dic.Add("activity_id", activityImagefolder.activity_id);
            dic.Add("folder_name", activityImagefolder.folder_name);
            DataTable dt = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "compareimagefolderbyname", dic).Tables[0];
            ri=dt.Rows.Count;
            if (ri<=0)
            {
                ri = DbHelperFactory.SingleInstance().ExecuteNonQueryBasedOnSql<ActivityImageFolderModel>("CommonSQL", "insertactivityimagefolder", activityImagefolder);
            }
            else
            {
                albumid = dt.Rows[0]["id"].ToString();
            }
            return ri > 0;
        }

        /// <summary>
        /// 获取相片文件存储相对目录
        /// </summary>
        /// <param name="useridOrActivityid"></param>
        /// <returns></returns>
        public static string GetInnerPathByImageType(string useridOrActivityid, string albumId)
        {
            DateTime _currentDate = DateTime.Now;
            string innerPath = "";
            innerPath = _currentDate.ToString("yyyy-MM") + "/" + _currentDate.ToString("dd");
            innerPath += "/" + useridOrActivityid;
            innerPath += "/" + albumId;
            return innerPath + "/";
        }

        #region 活动相册
        /// <summary>
        /// 插入活动相片逻辑表并在物理相册表中增加对应镜像数目
        /// </summary>
        /// <param name="id"></param>
        /// <param name="create_id"></param>
        /// <param name="activity_id"></param>
        /// <param name="link_id"></param>
        /// <param name="fold_id"></param>
        /// <param name="image_name"></param>
        /// <param name="image_path"></param>
        /// <param name="image_small_path"></param>
        /// <param name="fileSize"></param>
        /// <param name="sequence"></param>
        /// <param name="description"></param>
        /// <returns></returns>
        public static bool InsertImageActivity(string id, string create_id, string activity_id, string link_id, string fold_id, string image_name, string image_path, string image_small_path, Double fileSize, int sequence, string description, int is_submit)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            dic.Add("create_id", create_id);
            dic.Add("activity_id", activity_id);
            dic.Add("link_id", link_id);
            dic.Add("folder_id", fold_id);
            dic.Add("image_name", image_name);
            dic.Add("image_path", image_path);
            dic.Add("image_small_path", image_small_path);
            dic.Add("fileSize", fileSize);
            dic.Add("sequence", sequence);
            dic.Add("description", description);
            dic.Add("is_submit", is_submit);
            dic.Add("counter", 0);
            dic.Add("is_block", 0);
            dic.Add("active", 1);
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "insertactivityimage", dic);            
            return ri > 0 && WannerDaoImageAndFolderManage.AddOneImagePythicalLink(link_id);
        }
        public static int GetImageActivityMaxQuence(string folder_id, string activity_id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("folder_id", folder_id);
            dic.Add("activity_id", activity_id);
            int ri = int.Parse(DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "getactivityimagemaxquence", dic).Tables[0].Rows[0][0].ToString());
            return ri + 1;
        }
        #endregion

        #region 删除文件夹及文件夹下的文件
        public bool DeleteDir(string dirPath)
        {
            try
            {
                if (Directory.Exists(dirPath))
                {
                    //获取文件数组
                    string[] files = Directory.GetFiles(dirPath);
                    foreach (string file in files)
                    {
                        File.Delete(file);
                    }

                    Directory.Delete(dirPath);
                }
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }
        #endregion
        #endregion

        public string GetCurrentUserID()
        {
            //#if DEBUG
            //    return "11111";
            //#endif 
            WanerDaoPersonSecurity ws = new WanerDaoPersonSecurity();
            return CommonContext.GetUserSecurityInfo() != null ? CommonContext.GetUserSecurityInfo().user_id : "";
        }

    }
}