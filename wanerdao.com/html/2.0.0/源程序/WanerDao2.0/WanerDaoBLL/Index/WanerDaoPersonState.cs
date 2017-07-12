#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 主页状态相关接口实现
* 作者：杨晓东   时间：2012/3/11 22:04:53 
* 文件名：WanerDaoPersonState 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion

using System;
using System.Collections.Generic;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoIBLL.IIndex;
using WanerDao2.WanerDaoModel.Index;
using WanerDao2.WanerDaoModule.Utils;

namespace WanerDao2.WanerDaoBLL.Index
{
    public class WanerDaoPersonState : IWanerDaoPersonState
    {

        #region 全局变量和参数
        PersonalSecurityProfileModel pspmodel = null;
        private readonly string SQLFile = "HomeSQL";
        private const string ReplayLinkFeedsComment_SQLKey = "ReplayLinkFeedsComment";
        private const string ReplayNewFeedsComment_SQLKey = "ReplayNewFeedsComment";
        private const string GetNewFeedsById_SQLKey = "GetNewFeedsById";
        private const string ForwardState_SQLKey = "ForwardState";
        private const string GetLinkFeedsById_SQLKey = "GetLinkFeedsById";
        private const string ForwardLink_SQLKey = "ForwardLink";

        string m_id;
        string m_fid;
        string m_content;
        #endregion

        #region 公有全局变量
        
        //更新类型
        public const string HOME_NEW = "new";
        public const string HOME_MESSAGE = "message";
        public const string HOME_GROUP = "group";
        public const string HOME_ACTIVITY = "activity";

        #endregion

        #region 构造函数
        public WanerDaoPersonState()
        {
            pspmodel = CommonContext.GetUserSecurityInfo();
            //#if DEBUG
            //            pspmodel = new PersonalSecurityProfileModel { user_id = "9f6c58f988cc4aff9c910504dce3edc2" };
            //#endif
        }
        #endregion

        #region 个人发表的状态
        public bool AddLinkFeeds(WanerDaoModel.Person.LinkFeedsModel lfmodel)
        {
            if (lfmodel == null) return false;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans<LinkFeedsModel>(SQLFile, "AddLinkFeeds", lfmodel);
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 发表链接新鲜事
        /// </summary>
        /// <param name="dic">string link,string description,string permission</param>
        /// <returns></returns>
        public string AddLinkFeeds(Dictionary<string, object> dic)
        {
            string link = dic.ContainsKey("link") ? dic["link"].ToString() : null;
            string description = dic.ContainsKey("description") ? dic["description"].ToString() : null;
            string permission = dic.ContainsKey("permission") ? dic["permission"].ToString() : null;

            string guid = WanerDaoGuid.GetGuid();
            if (link != null && description != null && permission != null)
            {

                LinkFeedsModel lfmodel = new LinkFeedsModel()
                {
                    id = guid,
                    link = link,
                    description = description,
                    permission = permission,
                    post_date = DateTime.Now,
                    user_id = pspmodel.user_id,
                    active = true,
                    counter = 0
                };
                if (AddLinkFeeds(lfmodel))
                {
                    AddHomeOperate(guid, "0ffe309c927411e183b9002354c6e759");
                    return SucMsg("AddInfoCn");
                }
                else
                {
                    return ErrMsg("FailInfoCn");
                }
            }
            else
            {
                return ErrMsg("ErrorInfoCn");
            }
        }

        public bool AddNewFeeds(WanerDaoModel.Person.NewFeedsModel nfmodel)
        {
            if (nfmodel == null) return false;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans<NewFeedsModel>(SQLFile, "AddNewFeeds", nfmodel);
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public NewFeedsModel GetNewFeedsModelById(string id)
        {
            if (string.IsNullOrEmpty(id)) return null;
            Dictionary<string, object> dic = new Dictionary<string, object>() { { "id", id } };
            var result = DbHelperFactory.SingleInstance().GetGenericModel<NewFeedsModel>(SQLFile, GetNewFeedsById_SQLKey, dic);
            return result == null ? null : result[0];
        }

        /// <summary>
        /// 发布新状态
        /// </summary>
        /// <param name="dic">string coutent,string permission</param>
        /// <returns></returns>
        public string AddNewFeeds(Dictionary<string, object> dic)
        {
            string coutent = dic.ContainsKey("coutent") ? dic["coutent"].ToString() : null;
            string permission = dic.ContainsKey("permission") ? dic["permission"].ToString() : null;
            string guid = WanerDaoGuid.GetGuid();
            if (coutent != null && permission != null)
            {
                NewFeedsModel lfmodel = new NewFeedsModel()
                {
                    id = guid,
                    content = coutent,
                    permission = permission,
                    //post_date = WanerDaoUtils.GetUTCTime(),
                    post_date = DateTime.Now,
                    user_id = pspmodel.user_id,
                    active = true,
                    counter = 0
                };
                if (AddNewFeeds(lfmodel))
                {
                    AddHomeOperate(guid, "0ff42aaf927411e183b9002354c6e759");
                    return SucMsg("AddInfoCn");
                }
                else
                {
                    return ErrMsg("FailInfoCn");
                }
            }
            else
            {
                return ErrMsg("ErrorInfoCn");
            }
        }
        #endregion

        #region 发表的链接
        /// <summary>
        /// 删除链接
        /// </summary>
        /// <param name="dic">string id</param>
        /// <returns></returns>
        public string DeleteLinkFeeds(Dictionary<string, object> dic)
        {
            string id = dic.ContainsKey("id") ? dic["id"].ToString() : null;
            if (id != null)
            {
                if (ExcuteNonQuery("DeleteLinkFeeds", dic))
                {
                    return SucMsg("DeleteInfoCn");
                }
                else
                {
                    return ErrMsg("DeleteFailInfoCn");
                }
            }
            else
            {
                return ErrMsg("ErrorInfoCn");
            }
        }
        /// <summary>
        /// 删除状态
        /// </summary>
        /// <param name="dic">string id</param>
        /// <returns></returns>
        public string DeleteNewFeeds(Dictionary<string, object> dic)
        {
            string id = dic.ContainsKey("id") ? dic["id"].ToString() : null;
            if (id != null)
            {
                if (ExcuteNonQuery("DeleteNewFeeds", dic))
                {
                    return SucMsg("DeleteInfoCn");
                }
                else
                {
                    return ErrMsg("DeleteFailInfoCn");
                }
            }
            else
            {
                return ErrMsg("ErrorInfoCn");
            }
        }

        public LinkFeedsModel GetLinkFeedsModelById(string id)
        {
            if (string.IsNullOrEmpty(id)) return null;
            Dictionary<string, object> dic = new Dictionary<string, object>() { { "id", id } };
            return DbHelperFactory.SingleInstance().GetGenericModel<LinkFeedsModel>(SQLFile, GetLinkFeedsById_SQLKey, dic)[0];
        }
        #endregion

        #region 状态或者链接的回复

        /// <summary>
        /// 回复链接状态
        /// </summary>
        /// <param name="dic">string id,followId,content</param>
        /// <returns></returns>
        public string ReplayLinkFeedsComment(Dictionary<string, object> dic)
        {
            ParamCast(dic);
            return ReplayComment(ReplayLinkFeedsComment_SQLKey);
        }

        /// <summary>
        /// 回复用户状态
        /// </summary>
        /// <param name="dic">string id,followId,content</param>
        /// <returns></returns>
        public string ReplayNewFeedsComment(Dictionary<string, object> dic)
        {
            ParamCast(dic);
            return ReplayComment(ReplayNewFeedsComment_SQLKey);
        }

        private string ReplayComment(string SQLKey)
        {
            if (m_id != null && m_content != null && m_fid != null)
            {
                Dictionary<string, object> mydic = new Dictionary<string, object>() {
                                                     { "id", m_id }, { "content", m_content }, 
                                                     { "comment_user_id",pspmodel.user_id} ,
                                                     {"fid",m_fid},{"positive",0},
                                                     {"negative",0}
                                                 };
                if (ExcuteNonQuery(SQLKey, mydic))
                {
                    return SucMsg("AddInfoCn");
                }
                else
                {
                    return ErrMsg("FailInfoCn");
                }
            }
            else
            {
                return ErrMsg("ErrorInfoCn");
            }
        }

        private void ParamCast(Dictionary<string, object> dic)
        {
            m_id = dic.ContainsKey("id") ? dic["id"].ToString() : null;
            m_content = dic.ContainsKey("content") ? dic["content"].ToString() : null;
            m_fid = dic.ContainsKey("followId") ? dic["followId"].ToString() : null;
        }

        #endregion

        #region 状态或者链接的转发
        /// <summary>
        /// 转发状态
        /// </summary>
        /// <param name="id">string id</param>
        public string Forward_State(string id)
        {
            if (string.IsNullOrEmpty(id)) return ErrMsg("FailInfoCn");
            var newFeeds = GetNewFeedsModelById(id);
            if (newFeeds == null) return ErrMsg("StateNotSaveOrDel");
            if (newFeeds.user_id == pspmodel.user_id) return ErrMsg("CanNotForwardState");
            Dictionary<string, object> dic = new Dictionary<string, object>();
            string guid = WanerDaoGuid.GetGuid();
            dic.Add("guid", guid);
            dic.Add("user_id", pspmodel.user_id);
            dic.Add("id", id);
            if (ExcuteNonQuery(ForwardState_SQLKey, dic))
            {
                AddHomeOperate(guid, "10259247927411e183b9002354c6e759");
                return SucMsg("ForwardSuc");
            }
            else
            {
                return ErrMsg("ForwardFailed");
            }
        }

        /// <summary>
        /// 转发链接
        /// </summary>
        /// <param name="id">string id</param>
        /// <returns></returns>
        public string Forward_Link(string id)
        {
            if (string.IsNullOrEmpty(id)) return ErrMsg("FailInfoCn");
            var linkFeeds = GetLinkFeedsModelById(id);
            if (linkFeeds == null) return ErrMsg("LinkNotSaveOrDel");
            if (linkFeeds.user_id == pspmodel.user_id) return ErrMsg("CanNotForwardLink");
            Dictionary<string, object> dic = new Dictionary<string, object>();
            string guid = WanerDaoGuid.GetGuid();
            dic.Add("guid", guid);
            dic.Add("user_id", pspmodel.user_id);
            dic.Add("id", id);
            if (ExcuteNonQuery(ForwardLink_SQLKey, dic))
            {
                AddHomeOperate(guid, "10303c73927411e183b9002354c6e759");

                return SucMsg("ForwardSuc");
            }
            else
            {
                return ErrMsg("ForwardFailed");
            }
        }

        public static void AddHomeOperate(string guid, string action_category_id)
        {
            //添加到主页new选项卡
            if (string.IsNullOrEmpty(guid) || string.IsNullOrEmpty(action_category_id))
                throw new ArgumentNullException("Arguments can not be Null or Empty.");

            UserOperationModel operateModel = new UserOperationModel();
            operateModel.action_category_id = action_category_id;
            operateModel.id = WanerDaoGuid.GetGuid();
            operateModel.option_id = "new";
            operateModel.object_id = guid;
            operateModel.active = true;
            operateModel.ope_date = DateTime.Now;
            operateModel.permission = CommonContext.PublicPermission;
            operateModel.user_id = CommonContext.GetUserSecurityInfo().user_id;
            IWanerDaoActionState actionOperate = new WanerDaoActionState();
            actionOperate.AddUserOperation(operateModel);
        }

        /// <summary>
        /// 添加动作更新（2012-10-6徐蓓添加）
        /// </summary>
        /// <param name="operate">动作更新实体。必须填充action_category_id（动作分类）、option_id（动作类型）、object_id（对应的动作记录标识）、user_id（动作所属的用户标识）</param>
        public static void AddHomeOperate(UserOperationModel operate)
        {
            operate.id = WanerDaoGuid.GetGuid();
            operate.active = true;
            operate.ope_date = DateTime.Now;
            operate.permission = CommonContext.PublicPermission;
            //operate.user_id = CommonContext.GetUserSecurityInfo().user_id;
            IWanerDaoActionState actionOperate = new WanerDaoActionState();
            actionOperate.AddUserOperation(operate);
        }

        #endregion

        #region 私有成员
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
        private bool ExcuteNonQuery(string sqlKey, Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans(SQLFile, sqlKey, dic);
            if (result >= 0)
                return true;
            else
                return false;
        }

        #endregion
    }
}