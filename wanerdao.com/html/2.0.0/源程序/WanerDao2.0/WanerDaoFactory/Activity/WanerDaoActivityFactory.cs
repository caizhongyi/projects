using System;
using System.Web;
using System.Web.SessionState;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoModule.String;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.Utils;
using System.Collections;
using System.Collections.Generic;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoIBLL.ICommon;
using WanerDao2.WanerDaoIBLL.IActivity;
using WanerDao2.WanerDaoModel.Activity;
using WanerDao2.WanerDaoModel.Activity.ActivityCreate;
using Newtonsoft.Json;
using System.IO;
using Newtonsoft.Json.Linq;
using WanerDao2.WanerDaoModel.Activity.ActivitySignUp;
using System.Linq;
using WanerDao2.WanerDaoModel.Activity.ActivitySetting;
using WanerDao2.WanerDaoModel.Activity.ActivityManage;
using WanerDao2.WanerDaoBLL.Person;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoModel.Activity.ActivitySearch;

namespace WanerDao2.WanerDaoBLLFactory.Activity
{
    public class WanerDaoActivityFactory : IHttpHandler, IRequiresSessionState
    {
        /// <summary>
        /// 您将需要在您网站的 web.config 文件中配置此处理程序，
        /// 并向 IIS 注册此处理程序，然后才能进行使用。有关详细信息，
        /// 请参见下面的链接: http://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpHandler Members

        public bool IsReusable
        {
            // 如果无法为其他请求重用托管处理程序，则返回 false。
            // 如果按请求保留某些状态信息，则通常这将为 false。
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Cache.SetCacheability(HttpCacheability.ServerAndNoCache);
            string json = string.Empty;
            string typestr = WanerDaoValidation.ValidateParamters(context.Request.Form.ToString());
            if (typestr == string.Empty)
            {
                json = WanerDaoJSON.GetErrorJson("no operator type or invalid operator!");
                context.Response.Write(json);
            }
            else
            {
                IWanerDaoActivity activity = new WanerDao2.WanerDaoBLL.Activity.WanerDaoActivity();

                if (activity == null)
                {
                    json = WanerDaoJSON.GetErrorJson("没有对应类型处理!");
                }
                else
                {
                    Dictionary<string, object> dic = GetParames(context);
                    string _activityid = string.Empty;
                    string _userid = string.Empty;
                    string _value = string.Empty;
                    switch (typestr)
                    {
                        #region test
                        case "activitytest":
                            activitybudgetope activityBudgetOpe = new activitybudgetope(); // TODO: 初始化为适当的值
                            activityBudgetOpe.id = "111";
                            activityBudgetOpe.ope_id = "111";
                            activityBudgetOpe.budget_id = "111";
                            activity.AddActivityBudgetOpe(activityBudgetOpe);
                            break;
                        case "activitycreatepagetest":
                            ActivityCreateMain activityCreateMain1 = GetActivityCreateMainForCreateTest();
                            string seStr = JsonConvert.SerializeObject(activityCreateMain1);
                            json = activity.AddActivity(activityCreateMain1);
                            break;
                        case "activitysignuptest":
                            signupmain signupmaintest = GetSignupmainTest();
                            string signupmainJsonTest = JsonConvert.SerializeObject(signupmaintest);
                            json = activity.ActivitySignUp(signupmaintest);
                            break;
                        #endregion

                        #region 活动查询
                        case "selectactivitycountbydate"://根据指定的日期查询每日活动数目
                            DateTime _begionDate = DateTime.Now;
                            if (!DateTime.TryParse(GetAndRemoveValue("begindate", dic), out _begionDate))
                            {
                                json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("ParameterError"));
                            }
                            int _length =0;
                            if (!int.TryParse(GetAndRemoveValue("length", dic), out _length))
                            {
                                json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("ParameterError"));
                            }
                            json = activity.SelectActivityCountByDate(_begionDate, _length);
                            break;
                        case "getnewestandnearestactivity"://返回指定数量最新、距离最近的活动
                            int _activity_count = 5;
                            int.TryParse(GetAndRemoveValue("count", dic), out _activity_count);
                            json = activity.GetNewestAndNearestActivity(_activity_count);
                            break;

                        case "activitydefinetotalpagecount"://活动时令、一般、自定义汇总

                            json = activity.GetActivityDefineTotalPage(GetAndRemoveValue("sectionid", dic));//sectionid: activitySectionPage id
                            break;
                        #endregion

                        #region 活动地图
                        case "searchactivitymap":
                            //MapSearch _test = new MapSearch
                            //{
                            //    placeset = new placeset(),
                            //};
                            //string _map = JsonConvert.SerializeObject(_test);
                            MapSearch search = GetJsonObjct<MapSearch>(context);
                            search.UserId = CommonContext.GetUserSecurityInfo().user_id;
                            json = activity.SearchActivityMap(search);
                            break;
                        #endregion
                        case "checkauthorization":
                            json = activity.CheckAuthorization(dic);
                            break;
                        case "searchactivitydetailsinfobyid":
                            json = activity.WanerDaoGetActivityDetailsInfoByID(dic);
                            break;
                        case "activityindexpage":
                            json = activity.GetActivityIndexPage(dic);
                            break;

                        #region 活动创建管理
                        
                        case "activitycreatepage"://活动创建
                            ActivityCreateMain activityCreateMain = GetJsonObjct<ActivityCreateMain>(context);
                            json = activity.AddActivity(activityCreateMain);
                            break;
                        case "activitysignup"://活动报名
                            signupmain _signupmain = GetJsonObjct<signupmain>(context);
                            json = activity.ActivitySignUp(_signupmain);
                            break;
                        case "verifyactivitysignup"://判断用户是否能报名
                            json = activity.VerifyActivitySignUp(GetAndRemoveValue("activityid", dic));
                            break;
                        case "getgroupcarpoolmoney"://获取活动自主叫价费用列表
                            json = activity.GetGroupCarpoolMoney(GetAndRemoveValue("activityid", dic));
                            break;
                        case "getactivityparambypersonactivityarchivesid"://根据用户活动参数ID获取活动创建参数
                            json = activity.GetActivityParamByPersonActivityarchivesID(GetAndRemoveValue("id",dic));
                            break;
                        case "getactivityparambyactivityid"://根据活动ID获取活动创建参数
                            json = activity.GetActivityParamByActivityID(GetAndRemoveValue("id", dic));
                            break;
                        case "getkeyvalueactivityparambyuserid"://获取活动ID与名字JSON数据
                            json = activity.GetKeyValueActivityParamByUserID();
                            break;
                        case "getkeyvaluepersonalactivityarchivesparam"://获取用户活动参数ID与名字JSON数据
                            json = activity.GetKeyValuePersonalActivityArchivesParam();
                            break;
                        case "getcreateactivitypersonalinfo"://个人信息
                            json = activity.GetCreateactivityPersonalinfo();
                            break;
                        case "getactivitycreatetype"://发起活动者类型 圈子或者个人  ActivityCreateType
                            json = activity.GetActivityCreateType();
                            break;
                        case "getkevaluecreateactivitybygroup"://以圈子名义发起活动获取圈子 
                            json = activity.GetkevaluecreateActivitybygroup();
                            break;
                        
                        case "getkeyvalueactivityduration"://活动周期定制  一次性（默认），订制固定周期，订制浮动周期
                            json = activity.GetkeyvalueActivityduration();
                            break;
                        case "getkeyvalueactivityintervalduration"://间隔周期 每天，每周（默认），每月，每季度，每年
                            json = activity.GetkeyvalueActivityIntervalDuration();
                            break;
                        case "getkeyvaluecreatemode"://创建形式 直接创建活动（默认），通知创建人同意后，活动创建
                            json = activity.GetkeyvalueCreateMode();
                            break;
                        case "getactivityemailduration"://发送email周期性  ActivityEmailDuration
                            json = activity.GetActivityEmailDuration();
                            break;
                        case "getsitemessageduration"://发送站内信息周期性  无，可用发送email周期性代替
                            json = activity.GetActivityEmailDuration();
                            break;
                        case "getjsonactivityplacecategorytop"://活动地址顶层类型 
                            json = ReturnResultMessage(activity.SelectActivityPlaceCategoryTop());
                            break;
                        case "selectactivityplacecategoryupperlayer"://获取分类ID的父分类，活动地址类型
                            List<activityplacecategory> _upperLayerList = activity.SelectActivityPlaceCategoryUpperLayer(GetAndRemoveValue("id", dic));
                            json = activity.ConvertActivityPlaceCategoryToJson(_upperLayerList);
                            break;     
                        case "getjsonactivityplacecategorychild"://活动地址类型孩子  如果ID为空，则获取顶层节点
                            List<activityplacecategory> _childList=activity.SelectActivityPlaceCategoryChild(GetAndRemoveValue("id", dic));
                            json=activity.ConvertActivityPlaceCategoryToJson(_childList);
                            break;
                        case "getactivityplacebycategoryid"://根据活动地址分类查询所有地址
                            json = activity.GetActivityPlaceByCategoryID(GetAndRemoveValue("categoryid", dic));
                            break;

                        case "getactivitycategorysettingsinfo"://活动分类 ActivityCategorySettings
                            List<activitycategorysettings> _childListSettings = activity.SelectActivityCategorySettingsChild(GetAndRemoveValue("id", dic));
                            json = activity.ConvertActivityCategorySettingsToJson(_childListSettings);
                            break;
                        case "getkeyvalueactivitykickduration"://踢人保护时限  ActivityKickDuration
                            json = activity.GetkeyvalueActivityKickDuration();
                            break;

                        case "getactivitymemberkeyvalue"://获取活动成员键值对 id:活动成员主键ID， name:成员名字
                            json = activity.GetActivityMemberKeyValue(GetAndRemoveValue("activityid", dic));
                            break;
                        case "getactivitymemberuserkeyvalue"://获取活动成员键值对 id:成员用户ID， name:成员名字
                            json = activity.GetActivityMemberUserKeyValue(GetAndRemoveValue("activityid", dic));
                            break;
                        case "getuserjoinactivitypath"://获取用户活动行车路线
                            json = activity.GetUserJoinActivityPath(GetAndRemoveValue("activityid", dic), GetAndRemoveValue("userid", dic));
                            break;
                        case "getcurrentuserjoinactivitypath"://获取用户活动行车路线
                            json = activity.GetUserJoinActivityPath(GetAndRemoveValue("activityid", dic));
                            break;

                        case "selectbudgetsumandflowsum"://查询预算和收支额度统计
                            json = activity.SelectBudgetSumAndFlowSum(GetAndRemoveValue("activityid", dic));
                            break;
                        case "getkeyvaluebudgeoper"://预算项执行人员
                            json = activity.GetBudgetOpeKeyValueByBudgetID(GetAndRemoveValue("budgetid", dic));
                            break;
                        case "addactivitybudget"://添加预算
                            ActivityBudgetManage _addBudget= GetJsonObjct<ActivityBudgetManage>(context);
                            json = activity.AddActivityBudget(_addBudget);
                            break;
                        case "getactivitybudgetmanageforjson"://查找某条预算
                            json = activity.GetActivityBudgetManageForJson(GetAndRemoveValue("budgetid", dic));
                            break;
                        case "updateactivitybudget"://修改某条预算
                            ActivityBudgetManage _updateBudget = GetJsonObjct<ActivityBudgetManage>(context);
                            json = activity.UpdateActivityBudget(_updateBudget);
                            break;
                        case "deleteactivitybudget"://删除某条预算
                            bool _DeleteActivityBudget = activity.DeleteActivityBudget(GetAndRemoveValue("budget_id", dic));
                            if(_DeleteActivityBudget)
                            {
                                json = WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("DeleteInfoCn"));
                            }
                            else
                            {

                                json = WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("DeleteFailInfoCn"));
                            }
                            break;
                        case "addactivitymoneyflow"://添加实际收支
                            ActivityMoneyFlowManage _addMoneyFlow = GetJsonObjct<ActivityMoneyFlowManage>(context);
                            json = activity.AddActivityMoneyFlow(_addMoneyFlow);
                            break;
                        case "getactivitymoneyflowmanageforjson"://查找某条实际收支
                            json = activity.GetActivityMoneyFlowManageForJson(GetAndRemoveValue("moneyflowid", dic));
                            break;
                        case "updateactivitymoneyflow"://修改某条实际收支
                            ActivityMoneyFlowManage _updateMoneyFlow = GetJsonObjct<ActivityMoneyFlowManage>(context);
                            json = activity.UpdateActivityMoneyFlow(_updateMoneyFlow);
                            break;

                        case "getmoneyflowopekeyvaluebymoneyflowid"://实际收支项执行人员 键值对： id：人员ID name:用户名字
                            json = activity.GetMoneyFlowOpeKeyValueByMoneyFlowID(GetAndRemoveValue("moneyflowid", dic));
                            break;
                        case "getmoneyflowpayerkeyvaluebymoneyflowid"://付款人员 键值对： id：成员表ID name:用户名字
                            json = json = activity.GetMoneyFlowPayerKeyValueByMoneyFlowID(GetAndRemoveValue("moneyflowid", dic));
                            break;



                        case "updatepersongactivitysettings"://修改个人活动设置
                            _value = context.Request["value"].ToString();
                            PersonActivitySettingsJson _settingJson = JsonConvert.DeserializeObject<PersonActivitySettingsJson>(_value);
                            json = activity.UpdatePersongActivitySettings(_settingJson);
                            break;
                        case "getpersongactivitysettingsjosnforjson"://查询个人活动设置
                            _activityid = GetAndRemoveValue("activityid", dic);
                            _userid = GetAndRemoveValue("userid", dic);
                            json = activity.GetPersongActivitySettingsJosnForJson(_activityid, _userid);
                            break;
                        case "getpersongactivitysettingsperiod"://查询个人活动设置订阅周期
                            json = activity.GetPersongActivitySettingsPeriod();
                            break;

                        #endregion

                        #region 活动管理
                        case "updateactivitymaininfo"://修改活动管理活动信息
                            _value = context.Request["value"].ToString();
                            ActivityMainInfo  _activityMainInfo = JsonConvert.DeserializeObject<ActivityMainInfo>(_value);
                            json = activity.UpdateActivityMainInfo(_activityMainInfo);
                            break;
                        case "getactivitymaininfoforjson"://查询活动管理活动信息
                            _activityid = GetAndRemoveValue("activityid", dic);
                            json = activity.GetActivityMainInfoForJson(_activityid);
                            break;

                        case "updageactivityplanjson"://修改活动管理活动计划
                            _value = context.Request["value"].ToString();
                            ActivityPlanJson _activityPlanJson = JsonConvert.DeserializeObject<ActivityPlanJson>(_value);
                            json = activity.UpdageActivityPlanJson(_activityPlanJson);
                            break;
                        case "getactivityplanmanageforjson"://查询活动管理活动计划
                            _activityid = GetAndRemoveValue("activityid", dic);
                            json = activity.GetActivityPlanManageForJson(_activityid);
                            break;
                        case "getactivityweatherinfojson"://获取活动地址天气
                            _activityid = GetAndRemoveValue("activityid", dic);
                            json = activity.GetActivityWeatherInfoJson(_activityid);
                            break;
                        case "getweatherinfojson"://获取天气
                            string _cityname = GetAndRemoveValue("cityname", dic);
                            json = activity.GetWeatherInfoJson(_cityname);
                            break;
                        case "getuseraddressinfo"://获取个人住址信息
                            json = activity.GetUserAddressInfo();
                            break;
                        case "setuseraddressinfo"://修改个人住址信息
                            json = activity.SetUserAddressInfo(dic);
                            break;
                        case "setusercontactinfo"://修改个人住址信息
                            json = activity.SetUserContactInfo(dic);
                            break;
                        case "getactivitymemberrole"://获取活动权限  如果userid为空，则为当前用户
                            string activity_userid = GetAndRemoveValue("userid", dic);
                            if (string.IsNullOrEmpty(activity_userid))
                            {
                                json = activity.GetActivityMemberRoleKeyValueJson(GetAndRemoveValue("activityid", dic));
                            }
                            else
                            {
                                json = activity.GetActivityMemberRoleKeyValueJson(GetAndRemoveValue("activityid", dic), activity_userid);
                            }
                            break;
                        case "signoutactivity":// superid：接班人     opttype 0:退出，1：解散
                            json = activity.SignOutActivity(GetAndRemoveValue("activityid", dic), GetAndRemoveValue("userid", dic), GetAndRemoveValue("reason", dic), GetAndRemoveValue("superid", dic), GetAndRemoveValue("opttype", dic));
                            break;

                        case "uploadbudgetfile"://上传财务附件文件
                            try
                            {

                            }
                            catch (Exception)
                            {
                            }
                            finally
                            {
                            }
                            break;
                        case "currentcarowertotal":// 当前车主乘车人统计
                            json = activity.GetCarOwerCustomTotal(GetCurrentUserID(), GetAndRemoveValue("activityid", dic));
                            break;
                        #endregion

                        #region  活动评价
                        case "isevaluateactivity":// 判断当前用户是否已经投票
                            json = ReturnResultMessage(activity.IsEvaluateActivity(GetAndRemoveValue("activityid", dic)));
                            break;
                        case "evaluateactivity":// 评价活动   evaluateflag:1;不喜欢,2:一般般,3:
                            int _evaluateflag = 0;
                            if (!int.TryParse(GetAndRemoveValue("evaluateflag", dic), out _evaluateflag))
                            {
                                json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("EvaluateActivityError"));
                            }
                            else
                            {
                                json = ReturnResultMessage(activity.EvaluateActivity(GetAndRemoveValue("activityid", dic), _evaluateflag));
                            }
                            break;
                        case "getactivityevaluatetotal"://统计活动评价
                            json = activity.GetActivityEvaluateTotal(GetAndRemoveValue("activityid", dic));
                            break;
                        #endregion

                        #region 获取基础参数键值对
                        case "getkeyvaluejsonallactivityrole"://获取角色ID与名字JSON数据
                            json = activity.GetKeyValueJsonAllActivityRole();
                            break;
                        case "getkeyvaluejsonallsignuptype"://获取报名方式ID与名字JSON数据
                            json = activity.GetKeyValueJsonAllSignUpType();
                            break;
                        case "getkeyvaluejsonallvehicletype"://交通方式ID和名字 JSON数据
                            json = activity.GetKeyValueJsonAllVehicleType();
                            break;
                        case "getkeyvaluejsonallpaytype"://获取付费方式的ID和名字、描述 JSON数据
                            json = activity.GetKeyValueJsonAllPayType();
                            break;
                        case "getkeyvaluejsonallcarpooltype"://获取所有搭车付费ID和名称 JSON数据
                            json = activity.GetKeyValueJsonAllCarPoolType();
                            break;
                        case "getkeyvaluejsonallautobrand"://获取所有汽车品牌ID和名称 JSON数据
                            json = activity.GetKeyValueJsonAllAutoBrand();
                            break;
                        case "getkeyvaluejsonallautomodelbybrandid"://根据品牌ID获取所有汽车型号ID和名称 JSON数据 传入brandid：品牌ID
                            string brandId = GetAndRemoveValue("brandid", dic);
                            json = activity.GetKeyValueJsonAllAutoModelByBrandId(brandId);
                            break;
                        case "getkeyvaluejsonallautomodel"://获取所有汽车型号ID和名称 JSON数据
                            json = activity.GetKeyValueJsonAllAutoModel();
                            break;
                        case "getkeyvaluejsonalljoinconditions"://获取所有加入门槛条件ID和名称 JSON数据  门槛值输入
                            json = activity.GetKeyValueJsonAllJoinConditions();
                            break;

                        #endregion

                        #region 展开留言信息(活动回复表-查询指定的记录数)
                        case "displayleavemessage": //展开留言信息(活动回复表-查询指定的记录数)
                            Dictionary<string, object> dicInt = new Dictionary<string, object>();
                            string active_posts_id = "";
                            string follow_id = "";
                            int offset = 0;
                            int rCount = 0;
                            IEnumerator ie = dic.Keys.GetEnumerator();
                            ie = dic.Keys.GetEnumerator();
                            while (ie.MoveNext())
                            {
                                string currentKey = ie.Current.ToString().ToLower();
                                string currentValue = dic[ie.Current.ToString()].ToString().ToLower();
                                switch (currentKey)
                                {
                                    case "active_posts_id": active_posts_id = currentValue; break;
                                    case "follow_id": follow_id = currentValue; break;
                                    case "offsetcount": offset = WanerDaoValidation.ConvertToInt(currentValue); break;
                                    case "rcount": rCount = WanerDaoValidation.ConvertToInt(currentValue); break;
                                    default:
                                        break;
                                }
                            }
                            dicInt.Add("active_posts_id", active_posts_id);
                            dicInt.Add("follow_id", follow_id);
                            dicInt.Add("offsetcount", offset);
                            dicInt.Add("rcount", rCount);
                            json = activity.SearchAtivitycommentsGetlimit(dicInt);
                            break;
                        #endregion

                        #region 获取用户历史活动的个数
                        case "getoldactivitycount":
                            string currentUserID = CommonContext.GetUserSecurityInfo().user_id;
                            dic.Add("original_id", currentUserID);
                            dic.Add("user_id", currentUserID);
                            json = activity.GetHistoryActivityCount(dic);
                            break;
                        #endregion

                        #region 用户活动设置查询
                        case "getactivitysetting":
                            currentUserID = CommonContext.GetUserSecurityInfo().user_id;
                            dic.Add("user_id", currentUserID);
                            json = activity.GetActivitySetting(dic, "ActivitySetting");
                            break;
                        #endregion

                        #region 获取参加活动用户
                        case "saveactivitysetting":
                            currentUserID = CommonContext.GetUserSecurityInfo().user_id;
                            dic.Add("user_id", currentUserID);
                            json = activity.SaveActivitySetting(dic);
                            break;
                        #endregion

                        #region 更新相册
                        case "updatephoto":
                            json = activity.UpdateActivityImage(dic);
                            break;
                        #endregion

                        #region 保存回复
                        case "insertactivitycomments":
                            dic.Add("id", WanerDaoGuid.GetGuid());
                            dic.Add("positive", 0);
                            dic.Add("negative", 0);
                            json = activity.InsertActivityComments(dic);
                            break;
                        #endregion

                        case "searchactivitybudgetbyactivityid":
                            json = activity.SearchActivityBudgetbyActivityid(dic);
                            break;

                        default:
                            json = WanerDaoJSON.GetErrorJson("没有对应类型处理!");
                            break;
                    }
                }
            }
            context.Response.Write(json);


        }
        #endregion
        /// <summary>
        /// 获取传入参数值
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public Dictionary<string, object> GetParames(HttpContext context)
        {
            return  WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());
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
        /// <summary>
        /// 描述:构造多条件活动查找查询参数
        /// </summary>
        /// <param name="_tableNames">表名，如果是多个字段请用英文的“,”分隔（默认表名ACTIVITY） 有助于联表查询</param>
        /// <param name="_fieldNames">查询字段，如果是多个字段请用英文的“,”分隔</param>
        /// <param name="_userId">用户ID：过滤掉用户已经参与了的活动，为空表示不过滤</param>
        /// <param name="_ortherWhereSql">其他自定义查询条件，开头不要带where、and </param>
        /// <param name="_fieldSortId">排序条件(不用传入ORDER BY关键字,可为空)</param>
        /// <param name="_sort">0升序 1倒序</param>
        /// <param name="dic"></param>
        private void GetSearchActivityByManyConditionsParams(string _tableNames, string _fieldNames, string _userId, string _ortherWhereSql, string _fieldSortId, int _sort, ref Dictionary<string, object> dic)
        {
            dic.Add("tableNames", _tableNames);
            dic.Add("fieldNames", _fieldNames);
            dic.Add("userId", _userId);
            dic.Add("ortherWhereSql", _ortherWhereSql);
            dic.Add("fieldSortId", _fieldSortId);
            dic.Add("sort", _sort);
        }
        public T GetJsonObjct<T>(HttpContext context)
        {
            string jsonCreate = context.Request["value"].ToString();

            return JsonConvert.DeserializeObject<T>(jsonCreate);
        }

        public string GetCurrentUserID()
        {
            //#if DEBUG
            //            return "11111";
            //#endif 
            WanerDaoPersonSecurity ws = new WanerDaoPersonSecurity();
            return CommonContext.GetUserSecurityInfo() != null ? CommonContext.GetUserSecurityInfo().user_id : "1111";
        }

        #region json
        private string GetJosnPlaceCategory(List<activityplacecategory> list)
        {
            var value = from item in list
                        where item != null
                        select new { id = item.id, name = item.category_name, parentid = item.parent_id };

            return  this.ReturnResultMessage(value);
        }
        #endregion
        
        #region message
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

        #region test
        public ActivityCreateMain GetActivityCreateMainForCreateTest()
        {
            ActivityCreateMain activityCreateMain1 = new ActivityCreateMain
            {
                activitybegintime = DateTime.Now.ToString(),
                activitycost = 12,
                activitydesc = "描述",
                activityendtime = DateTime.Now.AddDays(1).ToString(),
                activitylimit = 20,
                activityid = "",
                activityovertime = DateTime.Now.ToString(),
                //activityschedule = new activityschedule
                //{
                //    typeid = "1",
                //    gapperiod = 1,
                //    begindates = "03/12/2012", //多组输入用逗号隔开，时间格式为mm/DD/YYYY
                //    isdirectlybuild = false,
                //    tellemail = 2,
                //    tellinbox = 2
                //},
                archivesname = "",
                activitysubsistdesc = "预计费用说明",
                activityvisible = true,
                createtype = "123456",
                email = "xubing@qq.com",
                protectpeople = 2,
                signuppass = "pass",
                signuptype = "1234",
                telephone = "15873181472",
                activitytags = new List<activitytags>
                                {
                                    new activitytags{
                                         id="123",
                                          name="棒球"
                                    },
                                    new activitytags{
                                         id="1234",
                                          name="篮球"
                                    }
                                },
                budget = new List<budget>
                                {
                                    new budget{
                                         budgetcost=12,
                                          budgetdesc="吃饭",
                                           receipt="吃饭",
                                            executor="11111",
                                             id="1"
                                    },
                                    new budget{
                                         budgetcost=122,
                                          budgetdesc="睡觉",
                                           receipt="睡觉",
                                            executor="11111",
                                             id="2"
                                    }
                                },
                vehicletype = new vehicletype
                {
                    isauto = true,
                    vehicletypeid = "11111",
                    bycar = new bycar
                    {
                        isneedcarpool = true,
                        carpoolid = "11111",
                        providercarpoolid = "11111"
                    },
                    providercar = new providercar
                    {
                        ispermit = true,
                        carpooltypeid = "11111",
                        carpoolnbr = 4,
                        carpoolmoney = 12.5,
                        autoyear = "2001",
                        autoplate = "110",
                        autobrandid = "11111",
                        automodelid = "11111"
                    }
                },
                limitcondition = new List<limitcondition>
                                {
                                    new limitcondition{
                                         id="123",
                                          name="人品要求",
                                            value="人品好"
                                    },
                                    new limitcondition{
                                         id="123",
                                          name="人品要求",
                                            value="人品好"
                                    }
                                },
                plan = new List<plan>
                                {
                                    new plan
                                    {
                                         title="计划1",
                                          desc="描述",
                                           endtime=DateTime.Now.AddDays(1).ToString(),
                                            starttime=DateTime.Now.ToString()
                                    },
                                    new plan
                                    {
                                         title="计划1",
                                          desc="描述",
                                           endtime=DateTime.Now.AddDays(1).ToString(),
                                            starttime=DateTime.Now.ToString()
                                    }
                                },
                placeset = new PlaceSet
                {
                    addr = "地址一",
                    zip = "0100"
                },
                invite = new invite
                {
                    friendinvite = new List<friendinvite>
                    {
                        new friendinvite
                        {
                             id="11111",
                              name="好友1"
                        },
                        new friendinvite
                        {
                             id="11112",
                              name="好友2"
                        }
                    },
                    groupinvite = new List<groupinvite>
                    {
                        new groupinvite
                        {
                             id="11111",
                              name="圈子1"
                        },
                        new groupinvite
                        {
                             id="11112",
                              name="圈子2"
                        }
                    }
                },
                paymethodsinfo = new List<paymethods>
                 { 
                     new paymethods{
                          pay_address="abc",
                           pay_type_id="baeb9939-1515-11e1-b7d1-000c295f9365",
                           name="中国银行",
                            description="中国银行",
                             notice="办卡人：**，办卡地址：**"
                     },
                     new paymethods{
                          pay_address="acb2",
                           pay_type_id="baeb9939-1515-11e1-b7d1-000c295f9365",
                           name="中国银行",
                            description="中国银行",
                             notice="办卡人：**，办卡地址：**"
                     }
                 },
                is_pay_need = true,
                pay_description = "报名最低缴费金额",
                pay_nbr = 12
            };

            return activityCreateMain1;
        }
        public signupmain GetSignupmainTest()
        {
            signupmain _signupmain = new signupmain
            {
                userid = "11111",
                username = "用户名",
                roleid = "1111",
                rolename = "角色名",
                activityid = "11111",
                vehicletype = new vehicletype
                {
                    isauto = true,
                    vehicletypeid = "11111",
                    bycar = new bycar
                    {
                        isneedcarpool = true,
                        carpoolid = "11111",
                        providercarpoolid = "11111"
                    },
                    providercar = new providercar
                    {
                        ispermit = true,
                        carpooltypeid = "11111",
                        carpoolnbr = 4,
                        carpoolmoney = 12.5,
                        autoyear = "2001",
                        autoplate = "110",
                        autobrandid = "11111",
                        automodelid = "11111",
                        bycarusers = new List<bycaruser>
                                           {
                                               new bycaruser
                                               {
                                                    userid="11111",
                                                    username="乘车人名字1"
                                               },
                                               new bycaruser
                                               {
                                                    userid="11112",
                                                    username="乘车人名字2"
                                               }
                                           }
                    }
                },
                startaddress = new startaddress
                {
                    zip = "0731",
                    countryid = "11111",
                    stateid = "11111",
                    address = "湖南省长沙市",
                    cityid = "11111"
                },
                contact = new contact
                {
                    email = "111@qq.com",
                    phone = "15873181478"
                },
                paystatus = "11111",
                invite = new invite
                {
                    friendinvite = new List<friendinvite>
                    {
                        new friendinvite
                        {
                             id="11111",
                              name="好友1"
                        },
                        new friendinvite
                        {
                             id="11112",
                              name="好友2"
                        }
                    },
                    groupinvite = new List<groupinvite>
                    {
                        new groupinvite
                        {
                             id="11111",
                              name="圈子1"
                        },
                        new groupinvite
                        {
                             id="11112",
                              name="圈子2"
                        }
                    }
                }
            };
            return _signupmain;
        }
        #endregion
    }
}
