using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IFollow;
using WanerDao2.WanerDaoModel.Follow;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.Json;
using System.Data;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoIBLL.ICommon;
using WanerDao2.WanerDaoBLL.Common;
using WanerDao2.WanerDaoModule.Config;

namespace WanerDao2.WanerDaoBLL.Follow
{
    public class WanerDaoPersonalGroupFollow : IWanerDaoPersonalGroupFollow
    {
        #region IWanerDaoPersonalGroupFollow接口实现
        public string CreatePersonalGroupFollow(PersonalGroupFollowModel model)
        {
            //需要先判断是否参加了圈子

            if (!HasPersonalGroupFollow(model.user_id, model.attention_id))
            {
                model.id = WanerDaoGuid.GetDefaultGuid();

                //从配置文件中读取活动关注值
                double value = Convert.ToDouble(WanerDaoFilterReader.GetFollow("PersonalGroupFollow"));

                int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("FollowSQL", "CreatePersonalGroupFollow", new object[] { model, new { value = value } });
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
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowGroupExistInfo"), MessageType.error);

        }
        public string UpdatePersonalGroupFollowDuration(string id, bool isEmail, int emailDuration)
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
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "UpdatePersonalGroupFollowDuration", param);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfo"), MessageType.error);
            }
        }
        public string CancelPersonalGroupFollow(string userId, string groupId)
        {
            string msg = string.Empty;
            if (HasPersonalGroupFollow(userId, groupId))
            {
                Dictionary<string, object> param = new Dictionary<string, object>();
                param.Add("user_id", userId);
                param.Add("attention_id", groupId);
                //从配置文件中读取活动关注值
                double value = Convert.ToDouble(WanerDaoFilterReader.GetFollow("PersonalGroupFollow"));
                param.Add("value", value);
                int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("FollowSQL", "CancelPersonalGroupFollow", param);
                if (result >= 0)
                    msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowSuccessInfo"), MessageType.success);
                else
                    msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowFailInfo"), MessageType.error);
            }
            else
                msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowGroupNotExistInfo"), MessageType.error);
            return msg;
        }

        public bool HasPersonalGroupFollow(string userId, string groupId)
        {
            bool result = false;
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", userId);
            param.Add("attention_id", groupId);
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("FollowSQL", "HasPersonalGroupFollow", param);
            DataTable dt = ds.Tables["WanerDao2Ds"];
            int count = Convert.ToInt32(dt.Rows[0]["count"]);
            result = count > 0 ? true : false;
            return result;
        }

        public string GetPersonalGroupFollow(int pageCurrent, int pageSize, string where)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("tableName", "personalgroupfollow pgf INNER JOIN groupinfo gi on pgf.attention_id=gi.id INNER JOIN groupcategory gc on (gi.category_id=gc.id and gc.language_id='" + CommonContext.GetClientLanguage() + "')");
            param.Add("fldName", "pgf.*,gi.group_name,gi.member_nbr,gi.website,gi.activity_score,gi.follow_score,gi.logo_path,gc.category_name");
            param.Add("where", string.Format(" and {0} ", where));
            param.Add("fldSortId", "gi.group_name");
            param.Add("sort", 1);
            param.Add("pageCurrent", pageCurrent);
            param.Add("pageSize", pageSize);
            string result = common.WanerDaoPagination(param);
            return result;
        }


        #endregion
        private IWanerDaoCommon common;
        public WanerDaoPersonalGroupFollow()
        {
            common = new WanerdaoCommon();
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
    }
}
