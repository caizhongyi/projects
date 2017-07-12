using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IFollow;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.Json;
using System.Data;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoIBLL.ICommon;
using WanerDao2.WanerDaoBLL.Common;
using WanerDao2.WanerDaoModel.Follow;
using WanerDao2.WanerDaoModule.Utils;

namespace WanerDao2.WanerDaoBLL.Follow
{
    public abstract class WanerDaoPersonalModuleFollow : IWanerDaoPersonalModuleFollow
    {

        private IWanerDaoCommon common;

        public WanerDaoPersonalModuleFollow()
        {
            common = new WanerdaoCommon();
        }

        #region 公有函数
        //public string CancelPersonalModuleFollow(string id)
        //{
        //    Dictionary<string, object> param = new Dictionary<string, object>();
        //    param.Add("id", id);
        //    int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "CancelPersonalModuleFollow", param);
        //    if (result >= 0)
        //    {
        //        return Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowSuccessInfo"), MessageType.success);
        //    }
        //    else
        //    {
        //        return Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowFailInfo"), MessageType.error);
        //    }
        //}
        public string UpdatePersonalModuleFollowDuration(string id, bool isEmail, int emailDuration)
        {
            int durationTemp = emailDuration;
            if (!isEmail)
            {
                durationTemp = 0;
            }
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("id", id);
            param.Add("is_email", isEmail);
            param.Add("email_duration", durationTemp);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "UpdatePersonalModuleFollowDuration", param);
            if (result >= 0)
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateSuccessInfo"), MessageType.success);
            else
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfo"), MessageType.error);
        }
        #endregion

        #region 抽象函数
        public abstract string CancelPersonalModuleFollow(string userId, string attentionId);
        public abstract bool HasPersonalModuleFollow(string userId, string attentionId);
        #endregion

        #region 保护函数
        protected string GetPersonalModuleFollowCount(string attentionId, string sourceTypeId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("attention_id", attentionId);
            string exeSql = "GetPersonalModuleFollowCountByAttentionId";
            if (!string.IsNullOrEmpty(sourceTypeId))
            {
                param.Add("source_type_id", sourceTypeId);
                exeSql = "GetPersonalModuleFollowCountByAttentionIdAndSourceTypeId";
            }
            string result = DbHelperFactory.SingleInstance().GetDataTable("FollowSQL", exeSql, param);
            return result;
        }

        protected bool HasPersonalModuleFollow(PersonalModuleFollowModel module)
        {
            bool result = false;
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", module.user_id);
            param.Add("attention_id", module.attention_id);
            param.Add("source_type_id", module.source_type_id);
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("FollowSQL", "HasPersonalModuleFollow", param);
            DataTable dt = ds.Tables["WanerDao2Ds"];
            int count = Convert.ToInt32(dt.Rows[0]["count"]);
            result = count > 0 ? true : false;
            return result;
        }

        protected bool CancelPersonalModuleFollow(PersonalModuleFollowModel module)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", module.user_id);
            param.Add("attention_id", module.attention_id);
            param.Add("source_type_id", module.source_type_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "CancelPersonalModuleFollow", param);
            return result >= 0 ? true : false;
        }

        protected string GetPersonalModuleFollow(int pageCurrent, int pageSize, Dictionary<string, object> param)
        {
            StringBuilder where = new StringBuilder();
            string languageId = CommonContext.GetClientLanguage();
            string sourceTypeId = param.ContainsKey("sourceTypeId") ? param["sourceTypeId"].ToString() : string.Empty;
            string userId = param.ContainsKey("userId") ? param["userId"].ToString() : string.Empty;
            string searchTitle = param.ContainsKey("searchTitle") ? param["searchTitle"].ToString() : string.Empty;


            if (!string.IsNullOrEmpty(sourceTypeId))
            {
                where.Append(" and paf.source_type_id='" + sourceTypeId + "'");
            }
            if (!string.IsNullOrEmpty(userId))
            {
                where.Append(" and paf.user_id='" + userId + "'");

            }
            if (!string.IsNullOrEmpty(searchTitle))
            {
                where.Append(" and (a.activity_name like '%" + searchTitle + "%' or paf.section_name like '%" + searchTitle + "%') ");
            }

            return GetPersonalModuleFollow(pageCurrent, pageSize, where.ToString());
        }


        protected string Message(string message, MessageType msgtype)
        {
            if (msgtype == MessageType.success)
            {
                return WanerDaoJSON.GetSuccessJson(message);
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(message);
            }
        }
        protected string Message(Dictionary<string, object> prepareJson, string message, MessageType msgtype)
        {
            prepareJson.Add("msg", message);
            if (msgtype == MessageType.success)
            {
                return WanerDaoJSON.GetSuccessJson(prepareJson);
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(message);
            }
        }
        protected enum MessageType
        {
            success,
            error
        }
        #endregion
      
        #region 虚函数
        public virtual string CreatePersonalModuleFollow(PersonalModuleFollowModel modal)
        {
            if (!HasPersonalModuleFollow(modal.user_id, modal.attention_id))
            {
                modal.id = WanerDaoGuid.GetDefaultGuid();
                modal.attention_datetime = WanerDaoUtils.GetDateTime();
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "CreatePersonalModuleFollow", modal);
                if (result >= 0)
                {
                    return Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowSuccessInfo"), MessageType.success);
                }
                else
                {
                    return Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowFailInfo"), MessageType.error);
                }
            }
            else
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowModuleExistInfo"), MessageType.error);
        }
        public virtual string GetPersonalModuleFollow(int pageCurrent, int pageSize, string userId, string searchTitle)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("userId", userId);
            param.Add("searchTitle", searchTitle);
            return GetPersonalModuleFollow(pageCurrent, pageSize, param);
        }
        public virtual string GetPersonalModuleFollowCount(string attentionId)
        {
            return GetPersonalModuleFollowCount(attentionId, null);
        }
        #endregion

        #region 私有函数
        private string GetPersonalModuleFollow(int pageCurrent, int pageSize, string where)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            string languageId = CommonContext.GetClientLanguage();
            param.Add("tableName", "(select pmf.*,asp.category_id,asp.section_name from personalmodulefollow pmf INNER JOIN activitysectionpage asp on (pmf.attention_id=asp.id and asp.language_id='" + languageId + "' and asp.active=TRUE and asp.section_type_id=2) where pmf.active=TRUE) paf INNER JOIN activitycategory ac on (ac.category_id=paf.category_id and ac.active=TRUE) INNER JOIN activitycategorysettings acs on (acs.id=ac.category_id and acs.active=TRUE and acs.language_id='" + languageId + "') INNER JOIN activity a on (ac.activity_id=a.id and a.active=TRUE)");
            param.Add("fldName", "paf.*,a.id as activity_id,a.activity_name,a.address,a.begin_datetime,a.end_datetime,a.join_member_nbr");
            if (string.IsNullOrEmpty(where))
            {
                param.Add("where", string.Empty);
            }
            else
            {
                param.Add("where", where);
            }
            param.Add("fldSortId", "paf.attention_datetime");
            param.Add("sort", 1);
            param.Add("pageCurrent", pageCurrent);
            param.Add("pageSize", pageSize);
            string result = common.WanerDaoPagination(param);
            return result;
        }
        #endregion

        #region 模块来源类型
        public static string ACTIVITY_SOURCE_TYPE = "fb2fd8f2-5c94-11e1-b02d-101f74b66417";
        #endregion
    }
}
