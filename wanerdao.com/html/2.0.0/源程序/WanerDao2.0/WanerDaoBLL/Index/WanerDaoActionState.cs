#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/3/17 16:22:18 
* 文件名：WanerDaoActionState 
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
using System.Reflection;
using WanerDao2.WanerDaoBLL.Person;
using WanerDao2.WanerDaoComponent;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoIBLL.IIndex;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoModel.Index;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoIBLL.ICommon;
using System.Data;
using WanerDao2.WanerDaoModule.Config;
using WanerDao2.WanerDaoModule.Utils;

namespace WanerDao2.WanerDaoBLL.Index
{
    public class WanerDaoActionState : IWanerDaoActionState
    {
        #region 全局成员
        private readonly string SQLFILE = "HomeSQL";
        private const string Add_OperationSQL_Key = "AddUserOperation";
        private const string Modify_OperationSQL_Key = "ModifyUserOperation";
        private const string Delete_OperationSQL_Key = "DeleteUserOperation";
        private const string Get_Visited_User_Key = "GetVisitedUser";
        private const string Get_GetMayKnow_Frieds_key = "GetMayKnowFrieds";
        private const string Get_BaseTableModelList_key = "GetBaseTableModelList";
        private const string ShieldDynamicState_key = "ShieldDynamicState";
        private const string ReportDust_key = "ReportDust";
        private const string LeaveMessages_Key = "LeaveMessages";
        private const string GetShieldStateList_Key = "GetShieldStateList";
        private const string ShieldDynamicStateOfDel_Key = "ShieldDynamicStateOfDel";
        private const string Reflect_Cache_key = "Guid_720EBCC5-089A-45FD-8261-B53B0DEAC351";

        readonly WanerDaoIBLL.IPerson.IWanerDaoPersonSecurity IPersonSec = null;
        IWanerDaoPersonState IPersonState = null;
        PersonalSecurityProfileModel _pspmodel;
        IWanerDaoCommon Icommon = null;
        public PersonalSecurityProfileModel Pspmodel
        {
            get
            {
                if (_pspmodel == null)
                    _pspmodel = CommonContext.GetUserSecurityInfo();
                //#if DEBUG
                //                    _pspmodel = new PersonalSecurityProfileModel()
                //                    {
                //                        user_id = "28dfaf0b31824f6598bf06f2986a3ecc"
                //                    };
                //#endif
                return _pspmodel;
            }
        }

        #endregion

        #region 构造函数
        public WanerDaoActionState()
        {
            if (IPersonSec == null)
                IPersonSec = new WanerDaoBLL.Person.WanerDaoPersonSecurity();
            if (IPersonState == null)
                IPersonState = new WanerDaoPersonState();

            Icommon = new WanerDaoBLL.Common.WanerdaoCommon();
        }

        #endregion

        #region 添加用户操作
        void IWanerDaoActionState.AddUserOperation(WanerDaoModel.Index.UserOperationModel userOperate)
        {
            DbHelperFactory.SingleInstance().ExecuteNonQuery<UserOperationModel>(SQLFILE, Add_OperationSQL_Key, userOperate);
        }

        void IWanerDaoActionState.ModifyUserOperation(WanerDaoModel.Index.UserOperationModel userOperate)
        {
            DbHelperFactory.SingleInstance().ExecuteNonQuery<UserOperationModel>(SQLFILE, Modify_OperationSQL_Key, userOperate);
        }

        void IWanerDaoActionState.DeleteUserOperation(string id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>() { { "id", id } };
            DbHelperFactory.SingleInstance().ExecuteNonQuery(SQLFILE, Delete_OperationSQL_Key, dic);
        }

        #endregion

        #region 获取访问者
        /// <summary>
        /// 获取访问者
        /// </summary>
        /// <param name="dic">string user_id,string pageIndex ,string pageSize</param>
        /// <returns></returns>
        string IWanerDaoActionState.GetVisitedUser(Dictionary<string, object> dic)
        {
            string user_id = dic.ContainsKey("user_id") ? dic["user_id"].ToString() : null;
            string pageSize = dic.ContainsKey("pageSize") ? dic["pageSize"].ToString() : null;
            string pagecurrent = dic.ContainsKey("pageIndex") ? dic["pageIndex"].ToString() : null;
            if (user_id != null && pageSize != null && pagecurrent != null)
            {
                Dictionary<string, object> mydic = new Dictionary<string, object>();
                mydic.Add("tablename", "PersonalVisitRecord pv,personalprofile pp");
                mydic.Add("fldName", "pv.id,pv.user_id,pv.visit_user_id, (select name from personalprofile where"
                    + " user_id=pv.visit_user_id and active=true) as visit_user_name,"
                    + "(select logo_small_path from personalprofile where user_id=pv.visit_user_id and active=true) as logo_small_path,"
                    + "pv.update_date");
                mydic.Add("where", string.Format("and pv.user_id=pp.user_id and pv.user_id='{0}' and pv.active=true ", user_id));
                mydic.Add("fldSortId", "pv.update_date");
                mydic.Add("sort", 1);
                mydic.Add("pagecurrent", pagecurrent);
                mydic.Add("pageSize", pageSize);
                DataSet ds = Icommon.WanerDaoPaginationDataSet(mydic);
                string json = Icommon.WanerDaoPagination(ds);
                return json;
            }
            else
            {
                return ErrMsg("ErrorInfoCn");
            }
        }

        public IList<PersonalVisitRecord> GetVisitedUser(string user_id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>() { { "user_id", user_id } };
            return DbHelperFactory.SingleInstance().GetGenericModel<PersonalVisitRecord>(SQLFILE, Get_Visited_User_Key, dic);
        }
        #endregion

        #region 可能认识的朋友
        /// <summary>
        /// 获取可能认识的朋友 
        /// </summary>
        /// <param name="dic">string user_id</param>
        /// <returns></returns>
        string IWanerDaoActionState.GetMayKnowFrieds(Dictionary<string, object> dic)
        {
            string user_id = dic.ContainsKey("user_id") ? dic["user_id"].ToString() : null;
            string json = string.Empty;
            if (!string.IsNullOrEmpty(user_id))
            {
                json = DbHelperFactory.SingleInstance().GetDataTable(SQLFILE, Get_GetMayKnow_Frieds_key, dic);
            }
            else
            {
                json = ErrMsg("ErrorInfoCn");
            }
            return json;
        }
        #endregion

        #region 好友动态信息

        /// <summary>
        /// 获取好友动态
        /// </summary>
        /// <param name="dic">string user_id,string pageCurrent,string pageSize,string category(new,message,group,activity,posts)
        /// </param>
        /// <returns></returns>
        public string GetHTMLStateResult(Dictionary<string, object> paramDic)
        {
            try
            {
                string pageCurrent = paramDic.ContainsKey("pageCurrent") ? paramDic["pageCurrent"].ToString() : null;
                string pageSize = paramDic.ContainsKey("pageSize") ? paramDic["pageSize"].ToString() : null;
                string category = paramDic.ContainsKey("category") ? paramDic["category"].ToString() : null;
                string user_id = paramDic.ContainsKey("user_id") ? paramDic["user_id"].ToString() : null;

                if (pageCurrent == null || pageSize == null || category == null)
                {
                    return ErrMsg("ReadOfErrorInfo");
                }

                List<UserOperationModel> databaseOperateList = null;
                int pageNo = int.Parse(pageCurrent);
                do
                {
                    databaseOperateList = GetBaseTableModelList(user_id, pageNo.ToString(), pageSize, category);//好友动态表从数据库读取的
                    if (databaseOperateList == null) return ErrMsg("NoFriendsState");
                    pageNo = pageNo++;
                } while (databaseOperateList.Count == 0);

                IndexConfigModel configModel = new IndexConfigModel();
                Dictionary<string, BaseTableModel> baseTableList = GetInstanceList();
                List<Dictionary<string, string>> resultDicList = new List<Dictionary<string, string>>();
                if (databaseOperateList == null) return WanerDaoJSON.GetSuccessJson(resultDicList);
                Dictionary<string, string> dic = null;
                resultDicList.Add(new Dictionary<string, string>(1) { { "pageNo", pageNo--.ToString() } });
                foreach (var item in databaseOperateList)
                {
                    dic = new Dictionary<string, string>(2);
                    //item.table_id 配置文件中配置的id特性值  表示表的名称
                    configModel = configModel.GetIndexConfigList(item.table_id)[0];

                    BaseTableModel baseTab = baseTableList[item.table_id];
                    //有问题
                    baseTab = baseTab.GetType().GetConstructor(new Type[2] { typeof(string), typeof(string) }).Invoke(new string[2] { configModel.sqlkey, item.id }) as BaseTableModel;
                    if (baseTab.user_id == null) continue;//如果没有从数据库查出记录
                    dic.Add("tab_id", item.table_id);
                    dic.Add("content", baseTab.GetHTMLResult(configModel.content, item.action_name, item.category_name));
                    resultDicList.Add(dic);
                }
                return WanerDaoJSON.GetSuccessJson(resultDicList);
            }
            catch (Exception)
            {
                return ErrMsg("ReadOfErrorInfo");
            }
        }

        /// <summary>
        /// 反射获取对象的实例列表 key为类名称 value为实例
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, BaseTableModel> GetInstanceList()
        {
            var IStrategy = WanerDaoCacheManager.WanerDaoCacheFactory.SingleInstance().GetStrategy(0);
            object obj = IStrategy.RetrieveObject(Reflect_Cache_key);
            //缓存是否存在
            if (obj != null)
            {
                return obj as Dictionary<string, BaseTableModel>;
            }

            Dictionary<string, BaseTableModel> baseTableList = new Dictionary<string, BaseTableModel>();

            var types = Assembly.GetAssembly(typeof(BaseTableModel)).GetTypes();
            var baseType = typeof(BaseTableModel);

            foreach (var item in types)
            {
                var temp = item.BaseType;
                while (temp != null)
                {
                    if (temp == baseType)
                    {
                        BaseTableModel baseTable = CreateObject(item) as BaseTableModel; //Convert.ChangeType(baseTable, item); 
                        if (baseTable != null)
                        {
                            baseTableList.Add(item.Name.ToLower(), baseTable);
                        }
                        break;
                    }
                    else
                    {
                        temp = temp.BaseType;
                    }
                }
            }
            IStrategy.AddObject(Reflect_Cache_key, baseTableList);
            return baseTableList;
        }


        /// <summary>
        /// 创建对象实例
        /// </summary>
        /// <param name="typeName"></param>
        /// <returns></returns>
        private object CreateObject(Type type)
        {
            object obj = null;
            try
            {
                obj = Activator.CreateInstance(type);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return obj;
        }

        /// <summary>
        /// 获取好友动态实体列表(过滤权限后)
        /// </summary>
        /// <param name="pageCurrent">当前页</param>
        /// <param name="pageSize">页大小</param>
        /// <returns></returns>
        public List<UserOperationModel> GetBaseTableModelList(string user_id, string pageCurrent, string pageSize, string whereCategory)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            //if (IsSelf(ref user_id) || whereCategory.ToLower() == "message") { dic.Add("isSelf", 1); }
            //else { dic.Add("isSelf", 0); }
            dic.Add("isSelf", 1);//不显示自己的动态
            dic.Add("user_id", user_id);
            dic.Add("pageCurrent", pageCurrent);
            dic.Add("pageSize", pageSize);
            dic.Add("whereCategory", whereCategory);

            dic.Add("sourceTypeId", WanerDaoUtils.ClearString(WanerDaoConfigReader.GetConfigXml("IndexConfig", "IndexConfig.xml", "sourcetype", "id", whereCategory)));

            dic.Add("language_id", CommonContext.GetClientLanguage());
            var result = DbHelperFactory.SingleInstance().GetGenericModel<UserOperationModel>(
                SQLFILE, Get_BaseTableModelList_key, dic) as List<UserOperationModel>;


            if (result != null)
            {
                List<UserOperationModel> userOperList;
                FifterPermissionUser(ref result, out userOperList);
                return userOperList;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 进行权限过滤
        /// </summary>
        /// <param name="userOperList">旧的好友列表</param>
        /// <param name="userOperList2">新的</param>
        private void FifterPermissionUser(ref List<UserOperationModel> result, out List<UserOperationModel> userOperList)
        {
            userOperList = new List<UserOperationModel>();
            foreach (var item in result)
            {
                bool IsCanSee = WanerDaoPropertyPermission.hasPermission(item.user_id, Pspmodel.user_id, item.permission);
                if (IsCanSee)
                {
                    userOperList.Add(item);
                }
            }
        }

        #endregion

        #region 主页留言
        /// <summary>
        /// 主页留言。
        /// （2012-10-6徐蓓修改）
        /// </summary>
        /// <param name="dic">string person_id（被留言人的用户标识）,string msgcontent（留言的内容）</param>
        /// 
        /// <returns></returns>
        public string LeaveMessages(Dictionary<string, object> dic)
        {
            string result = string.Empty;
            //?id,?from_id,?to_id,?content,?post_date,?is_open
            Dictionary<string, object> mydic = new Dictionary<string, object>();
            string msgId = WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid();
            mydic.Add("id", msgId);
            mydic.Add("from_id", Pspmodel.user_id);
            mydic.Add("to_id", dic["person_id"].ToString());
            mydic.Add("content", dic["msgcontent"].ToString());
            mydic.Add("post_date", DateTime.Now.ToString());
            mydic.Add("is_open", "1");
            int rows = DbHelperFactory.SingleInstance().ExecuteNonQuery(SQLFILE, LeaveMessages_Key, mydic);
            if (rows > 0)
            {
                UserOperationModel o = new UserOperationModel();
                o.action_category_id = "46db7120b18a11e1839112313b0cb674";
                o.object_id = msgId;
                o.option_id = WanerDaoPersonState.HOME_MESSAGE;
                o.user_id = CommonContext.GetUserSecurityInfo().user_id;
                WanerDaoPersonState.AddHomeOperate(o);

                //o.user_id = dic["person_id"].ToString();
                //WanerDaoPersonState.AddHomeOperate(o);
                //WanerDaoPersonState.AddHomeOperate(msgId, "46db7120b18a11e1839112313b0cb674");
                result = SucMsg("AddInfoCn");
            }
            else
            {
                result = ErrMsg("FailInfoCn");
            }
            return result;

        }
        #endregion

        #region 屏蔽举报
        /// <summary>
        /// 屏蔽动态
        /// </summary>
        /// <param name="dic">string source_type_id,string target_user_id</param>
        /// 主页对应的几个选项卡（new,message,group,activity,post）， 目标用户id
        /// <returns></returns>
        public string ShieldDynamicState(Dictionary<string, object> dic)
        {
            Dictionary<string, object> myDic = new Dictionary<string, object>();
            myDic.Add("user_id", Pspmodel.user_id);

            //将sourceType类型转化为source_type_id
            string sourceTypeId = WanerDaoUtils.ClearString(WanerDaoConfigReader.GetConfigXml("IndexConfig", "IndexConfig.xml", "sourcetype", "id", dic["source_type_id"].ToString()));

            myDic.Add("block_type_id", sourceTypeId);

            myDic.Add("block_id", dic["target_user_id"].ToString());
            if (DbHelperFactory.SingleInstance().ExecuteNonQuery(SQLFILE, ShieldDynamicState_key, myDic) > 0)
            {
                return SucMsg("SuccessInfoCn");
            }
            return ErrMsg("FailInfoCn");
        }

        /// <summary>
        /// 根据屏蔽类型查询当前登陆用户的屏蔽列表（2012-9-27徐蓓修改）
        /// </summary>
        /// <param name="dic">string source_type_id（主页对应的选项卡，可为new,message,group,activity,posts）</param>
        /// <returns></returns>
        public string GetShieldStateList(Dictionary<string, object> dic)
        {
            //将sourceType类型转化为source_type_id
            string sourceTypeId = WanerDaoUtils.ClearString(WanerDaoConfigReader.GetConfigXml("IndexConfig", "IndexConfig.xml", "sourcetype", "id", dic["source_type_id"].ToString()));
            dic.Add("block_type_id", sourceTypeId);//这里需要把屏蔽类型转化为屏蔽类型的主键
            dic.Add("user_id", Pspmodel.user_id);
            //dic.Add("block_id", dic["target_user_id"].ToString());
            return DbHelperFactory.SingleInstance().GetDataTable(SQLFILE, GetShieldStateList_Key, dic);
        }

        /// <summary>
        /// 删除屏蔽的动态
        /// </summary>
        /// <param name="dic">string id</param>
        /// <returns></returns>
        public string ShieldDynamicStateOfDel(Dictionary<string, object> dic)
        {
            if (DbHelperFactory.SingleInstance().ExecuteNonQuery(SQLFILE, ShieldDynamicStateOfDel_Key, dic) > 0)
            {
                return SucMsg("SuccessInfoCn");
            }
            return ErrMsg("FailInfoCn");
        }

        /// <summary>
        /// 删除屏蔽的动态（2012-9-27徐蓓添加）
        /// </summary>
        /// <param name="sourceType">主页对应的几个选项卡（new,message,group,activity,posts）</param>
        /// <param name="targetUserId">被屏蔽用户标识</param>
        /// <returns></returns>
        public string ShieldDynamicStateOfDel(string sourceType,string targetUserId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();

            //将sourceType类型转化为source_type_id
            string sourceTypeId = WanerDaoUtils.ClearString(WanerDaoConfigReader.GetConfigXml("IndexConfig", "IndexConfig.xml", "sourcetype", "id", sourceType));
            param.Add("block_type_id", sourceTypeId);
            param.Add("block_id", targetUserId);

            if (DbHelperFactory.SingleInstance().ExecuteNonQuery(SQLFILE, "DelShieldDynState", param) > 0)
            {
                return SucMsg("SuccessInfoCn");
            }
            return ErrMsg("FailInfoCn");
        }
        /// <summary>
        /// 举报
        /// </summary>
        /// <param name="dic">string source_type_id,target_id</param>
        /// <returns></returns>
        public string DustInfoReport(Dictionary<string, object> dic)
        {
            return "暂未实现";
        }
        #endregion

        #region 回复信息
        /// <summary>
        /// 回复
        /// </summary>
        /// <param name="dic">string category, string id(指的是那条记录的id),content(内容) ,followId(父贴号)</param>
        /// <returns></returns>
        public string ReplayComment(Dictionary<string, object> dic)
        {
            IWanerDaoBlogManager IBlogMgr = new WanerDaoBlogManager();
            IWanerDaoImageManager IImageMgr = new WanerDaoImageManager();
            IWanerDaoVideoManager IVideoMgr = new WanerDaoVideoManager();

            string category = dic.ContainsKey("category") ? dic["category"].ToString() : null;
            string id = dic.ContainsKey("id") ? dic["id"].ToString() : null;
            string fid = dic.ContainsKey("followId") ? dic["followId"].ToString() : null;
            string content = dic.ContainsKey("content") ? dic["content"].ToString() : null;
            string result = string.Empty;
            if (ParamIsNotNull(id, fid, content))
            {
                Dictionary<string, object> myDic = new Dictionary<string, object>() {
                                                     { "id", id }, { "content", content }, 
                                                     {"followId",fid}
                                                 };
                switch (category.ToLower())
                {
                    case "publish_state":
                    case "forward_state":
                        result = IPersonState.ReplayNewFeedsComment(myDic);
                        break;
                    case "publish_link":
                    case "forward_link":
                        result = IPersonState.ReplayLinkFeedsComment(myDic);
                        break;
                    case "publish_image":
                    case "forward_image":
                    case "upload_image":
                    case "forward_uploadimage":
                        result = IImageMgr.AddImageComments(myDic);
                        break;
                    case "publish_video":
                    case "forward_video":
                        result = IVideoMgr.AddVideoComments(myDic);
                        break;
                    case "publish_blog":
                    case "forward_blog":
                        result = IBlogMgr.AddPersonBlogComments(myDic);
                        break;
                    //TODO:这里需要圈子活动添加回复的分支
                    default:
                        break;
                }
            }
            return result;
        }

        /// <summary>
        /// 判断参数是不是为NULL
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        private bool ParamIsNotNull(params string[] args)
        {
            bool flag = true;
            for (int i = 0; i < args.Length; i++)
            {
                if (string.IsNullOrEmpty(args[i]))
                {
                    flag = false;
                    break;
                }
            }
            return flag;
        }
        #endregion

        #region 全站搜索服务
        /// <summary>
        /// 全站搜索服务接口
        /// </summary>
        /// <param name="searchStr">搜索的字符创</param>
        /// <param name="categroy">搜索类别(PERSON, GROUP,ACTIVITY,POSTS,OTHER)</param>
        /// <param name="language">语言编号</param>
        /// <param name="pageCount">每页的显示的记录数</param>
        /// <param name="pageNum">当前页数</param>
        /// <param name="resultCount">返回总记录条数</param>
        /// <returns>搜索结果</returns>
        public string GetSearchResult(Dictionary<string, object> dic)
        {
            //int resultCount = 0;
            string searchStr = dic["searchStr"].ToString();
            string categroy = dic["categroy"].ToString();
            string language = dic["language"].ToString();
            int pageCount = int.Parse(dic["pageCount"].ToString());
            int pageNum = int.Parse(dic["pageNum"].ToString());

            string result = string.Empty;
            SearchReference.SearchServiceClient searchClient = new SearchReference.SearchServiceClient();
            try
            {
                result = searchClient.GetSearchResult(searchStr, categroy, language, pageNum, pageCount);
            }
            finally { searchClient.Close(); }
            //dic.Clear();
            //dic.Add("count", resultCount);
            //dic.Add("content", result);
            //result = WanerDaoJSON.GetSuccessJson(dic);
            return result;
        }

        /// <summary>
        /// 传入关键词与搜索类型，可以返回此搜索类型的结果总数
        /// </summary>
        /// <param name="dic">term , category，language</param>
        /// 搜索类型，单个类型包括person、group、activity、posts、other、all。多个搜索类型用逗号隔开</param>
        /// <returns>返回为json格式数据，建议格式为{result:true,data:{person:1,group:2}}</returns>
        public string GetSearchCount(Dictionary<string, object> dic)
        {
            string term = dic["term"].ToString();
            string category = dic["category"].ToString();
            string language = dic["language"].ToString();
            string result = string.Empty;

            SearchReference.SearchServiceClient searchClient = new SearchReference.SearchServiceClient();
            try
            {
                result = searchClient.GetSearchCount(term, category, language);
            }
            finally
            {
                searchClient.Close();
            }
            //dic.Clear();
            //dic.Add("count", resultCount);
            //dic.Add("content", result);
            //result = WanerDaoJSON.GetSuccessJson(dic);
            return result;
        }
        #endregion

        #region 用户退出
        public string Exit()
        {
            return new WanerDaoPersonSecurity().ExitLogin();
        }
        #endregion

        #region 站内信息未读数量
        public string GetMessageNonReadCount()
        {
            return new WanerDao2.WanerDaoBLL.Message.WanerDaoMessage().GetNotReadCount();
        }
        #endregion

        #region 私有成员
        /// <summary>
        /// 是不是主人
        /// </summary>
        /// <returns></returns>
        public bool IsSelf(ref string user_id)
        {
            IWanerDaoBlogManager Iblog = new WanerDaoBlogManager();
            return Iblog.IsSelf(ref user_id);
        }

        private string SucMsg(string key)
        {
            string tipLanguage = WanerDaoGlobalTip.GetInternationalizationTip(key);
            return WanerDaoJSON.GetSuccessJson(tipLanguage);
        }
        private string ErrMsg(string key)
        {
            string tipLanguage = WanerDaoGlobalTip.GetInternationalizationTip(key);
            return WanerDaoJSON.GetErrorJson(tipLanguage);
        }
        #endregion
    }

    #region 首页选项卡枚举

    public enum TabOptions
    {
        news, message, group, activity, posts
    }
    #endregion
}
