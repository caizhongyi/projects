using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IFollow;
using WanerDao2.WanerDaoModel.Follow;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoDALFactory;
using System.Data;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoIBLL.ICommon;
using WanerDao2.WanerDaoBLL.Common;
using WanerDao2.WanerDaoModule.Config;

namespace WanerDao2.WanerDaoBLL.Follow
{
    public class WanerDaoPersonalFriendsFollow : IWanerDaoPersonalFriendsFollow
    {
        #region IWanerDaoPersonalFriendsFollow接口实现
        public string CreatePersonalFriendsFollow(PersonalFriendsFollowModel model)
        {
            //需要先判断是否是朋友

            if (!HasPersonalFriendsFollow(model.user_id, model.attention_id))
            {
                model.id = WanerDaoGuid.GetDefaultGuid();
                model.attention_datetime = DateTime.Now;
                //从配置文件中读取活动关注值
                double value = Convert.ToDouble(WanerDaoFilterReader.GetFollow("PersonalFriendsFollow"));
                int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("FollowSQL", "CreatePersonalFriendsFollow", new object[] { model, new { value = value } });
                if (result >= 0)
                    return Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowSuccessInfo"), MessageType.success);
                else
                    return Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowFailInfo"), MessageType.error);
            }
            else
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowFriendExsitInfo"), MessageType.error);
        }

        public string UpdatePersonalFriendsFollowDuration(string id, bool isEmail, int emailDuration)
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
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "UpdatePersonalFriendsFollowDuration", param);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfo"), MessageType.error);
            }
        }


        public string CancelPersonalFriendsFollow(string userId, string friendId)
        {
            string msg = string.Empty;
            if (HasPersonalFriendsFollow(userId, friendId))
            {
                Dictionary<string, object> param = new Dictionary<string, object>();
                param.Add("user_id", userId);
                param.Add("attention_id", friendId);

                //从配置文件中读取活动关注值
                double value = Convert.ToDouble(WanerDaoFilterReader.GetFollow("PersonalFriendsFollow"));
                param.Add("value", value);

                int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("FollowSQL", "CancelPersonalFriendsFollow", param);
                if (result >= 0)
                    msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowSuccessInfo"), MessageType.success);
                else
                    msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowFailInfo"), MessageType.error);
            }
            else
                msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowFriendNotExsitInfo"), MessageType.error);
            return msg;
        }

        public bool HasPersonalFriendsFollow(string userId, string friendId)
        {
            bool result = false;
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", userId);
            param.Add("attention_id", friendId);
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("FollowSQL", "HasPersonalFriendsFollow", param);
            DataTable dt = ds.Tables["WanerDao2Ds"];
            int count = Convert.ToInt32(dt.Rows[0]["count"]);
            result = count > 0 ? true : false;
            return result;
        }

        public string GetPersonalFriendsFollow(int pageCurrent, int pageSize, string where)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("tableName", "personalfriendsfollow pff INNER JOIN personalprofile pp on pff.attention_id=pp.user_id");
            param.Add("fldName", "pff.*,pp.logo_small_path,pp.experience,pp.activity_score,pp.follow_score,pp.`name`,pp.second_name");
            param.Add("where", string.Format(" and {0} ", where));
            param.Add("fldSortId", "pff.attention_datetime");
            param.Add("sort", 1);
            param.Add("pageCurrent", pageCurrent);
            param.Add("pageSize", pageSize);
            string result = common.WanerDaoPagination(param);
            return result;
        }
        public string GetPersonalMyselfFollow(int pageCurrent, int pageSize, string where)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("tableName", "personalfriendsfollow pff INNER JOIN personalprofile pp on pff.user_id=pp.user_id");
            param.Add("fldName", "pff.*,pp.logo_small_path,pp.experience,pp.activity_score,pp.follow_score,pp.`name`,pp.second_name");
            param.Add("where", string.Format(" and {0} ", where));
            param.Add("fldSortId", "pff.attention_datetime");
            param.Add("sort", 1);
            param.Add("pageCurrent", pageCurrent);
            param.Add("pageSize", pageSize);
            string result = common.WanerDaoPagination(param);
            return result;
        }

        #endregion

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

        public WanerDaoPersonalFriendsFollow()
        {
            common = new WanerdaoCommon();
        }

    }
}
