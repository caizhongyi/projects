using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IFollow;
using WanerDao2.WanerDaoModel.Follow;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoDALFactory;
using System.Data;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoIBLL.ICommon;
using WanerDao2.WanerDaoBLL.Common;
using WanerDao2.WanerDaoModule.Utils;
using WanerDao2.WanerDaoModule.Config;

namespace WanerDao2.WanerDaoBLL.Follow
{
    public class WanerDaoPersonalActivityFollow : IWanerDaoPersonalActivityFollow
    {
        public string CreatePersonalActivityFollow(PersonalActivityFollowModel model)
        {
            if (!HasPersonalActivityFollow(model.user_id, model.attention_id))
            {
                model.id = WanerDaoGuid.GetDefaultGuid();
                model.attention_datetime = WanerDaoUtils.GetUTCTime();
                
                //从配置文件中读取活动关注值
                double value = Convert.ToDouble(WanerDaoFilterReader.GetFollow("PersonalActivityFollow"));
                
                int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("FollowSQL", "CreatePersonalActivityFollow", new object[] { model, new { value = value } });
                if (result >= 0)
                    return Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowSuccessInfo"), MessageType.success);
                else
                    return Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowFailInfo"), MessageType.error);
            }
            else
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowActivityExsitInfo"), MessageType.error);
        }

        public string UpdatePersonalActivityFollowDuration(string id, bool isEmail, int emailDuration)
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
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "UpdatePersonalActivityFollowDuration", param);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfo"), MessageType.error);
            }
        }

        public string CancelPersonalActivityFollow(string userId, string activityId)
        {
            string msg = string.Empty;
            if (HasPersonalActivityFollow(userId, activityId))
            {
                Dictionary<string, object> param = new Dictionary<string, object>();
                param.Add("user_Id", userId);
                param.Add("attention_id", activityId);
                param.Add("value", Convert.ToDouble(WanerDaoFilterReader.GetFollow("PersonalActivityFollow")));
                int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("FollowSQL", "CancelPersonalActivityFollow", param);
                if (result >= 0)
                {
                    msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowSuccessInfo"), MessageType.success);
                }
                else
                {
                    msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowFailInfo"), MessageType.error);
                }
            }
            else
            {
                msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowActivityNotExsitInfo"), MessageType.error);
            }
            return msg;
        }

        public bool HasPersonalActivityFollow(string userId, string activityId)
        {
            bool result = false;
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", userId);
            param.Add("attention_id", activityId);
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("FollowSQL", "HasPersonalActivityFollow", param);
            DataTable dt = ds.Tables["WanerDao2Ds"];
            int count = Convert.ToInt32(dt.Rows[0]["count"]);
            result = count > 0 ? true : false;
            return result;
        }

        #region 私有函数
        private string Message(string message, MessageType msgtype)
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
        private string Message(Dictionary<string, object> prepareJson, string message, MessageType msgtype)
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
        enum MessageType
        {
            success,
            error
        }
        #endregion

        private IWanerDaoCommon common;

        public WanerDaoPersonalActivityFollow()
        {
            common = new WanerdaoCommon();
        }


        public string GetPersonalActivityFollow(int pageCurrent, int pageSize, string where)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("tableName", "personalactivityfollow paf INNER JOIN activity a on paf.attention_id=a.id INNER JOIN (select activity_id,category_id,active from (SELECT activity_id,category_id,active from activitycategory ORDER BY update_date DESC) ac GROUP BY activity_id) ac on a.id=ac.activity_id INNER JOIN activitycategorysettings acs on (ac.category_id=acs.id and language_id='" + CommonContext.GetClientLanguage() + "')");
            param.Add("fldName", "paf.*,a.activity_link,a.activity_name,a.address,a.join_member_nbr,a.begin_datetime,a.end_datetime,ac.category_id,acs.category_name");
            param.Add("where", string.Format(" and {0} ", where));
            param.Add("fldSortId", "a.activity_name");
            param.Add("sort", 1);
            param.Add("pageCurrent", pageCurrent);
            param.Add("pageSize", pageSize);
            string result = common.WanerDaoPagination(param);
            return result;
        }


        //public string CancelPersonalActivityFollow(string id)
        //{
        //    Dictionary<string, object> param = new Dictionary<string, object>();
        //    param.Add("id", id);
        //    int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "CancelPersonalActivityFollow", param);
        //    if (result >= 0)
        //    {
        //        return Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowSuccessInfo"), MessageType.success);
        //    }
        //    else
        //    {
        //        return Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowFailInfo"), MessageType.error);
        //    }
        //}

        public string GetPersonalActivityFollowCount(string activityId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("attention_id", activityId);
            string result = DbHelperFactory.SingleInstance().GetDataTable("FollowSQL", "GetPersonalActivityFollowCountByActivityId", param);
            return result;
        }
    }
}
