#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 活动分类关注的业务实现（实现接口IWanerDaoActivityCategoryFollow）
* 作者：徐蓓    时间：2012/6/13
* 文件名：WanerDaoActivityCategoryFollow 
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

namespace WanerDao2.WanerDaoBLL.Follow
{
    public class WanerDaoActivityCategoryFollow : IWanerDaoActivityCategoryFollow
    {
        public string CreateActivityCategoryFollow(ActivityCategoryFollowModel model)
        {
            if (!HasActivityCategoryFollow(model.user_id, model.attention_id))
            {
                model.id = WanerDaoGuid.GetDefaultGuid();
                model.attention_datetime = WanerDaoUtils.GetDateTime();
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "CreateActivityCategoryFollow", model);
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
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowActivityCategoryExsitInfo"), MessageType.error);
        }

        public string UpdateActivityCategoryFollowDuration(string id, bool isEmail, int emailDuration)
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
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "UpdateActivityCategoryFollowDuration", param);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfo"), MessageType.error);
            }
        }

        public string CancelActivityCategoryFollow(string userId, string activityId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_Id", userId);
            param.Add("attention_id", activityId);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "DeleteActivityCategoryFollow", param);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowFailInfo"), MessageType.error);
            }
        }

        public bool HasActivityCategoryFollow(string userId, string activityId)
        {
            bool result = false;
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", userId);
            param.Add("attention_id", activityId);
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("FollowSQL", "HasActivityCategoryFollow", param);
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

        public WanerDaoActivityCategoryFollow()
        {
            common = new WanerdaoCommon();
        }


        public string GetActivityCategoryFollow(int pageCurrent, int pageSize, string where)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("tableName", "activitycategoryfollow acf INNER JOIN activitycategorysettings ac on (acf.attention_id=ac.id and language_id='" + CommonContext.GetClientLanguage() + "')");
            param.Add("fldName", "*");
            param.Add("where", string.Format(" and {0} ", where));
            param.Add("fldSortId", "acf.attention_datetime");
            param.Add("sort", 1);
            param.Add("pageCurrent", pageCurrent);
            param.Add("pageSize", pageSize);
            string result = common.WanerDaoPagination(param);
            return result;
        }


        public string GetActivityCategoryFollowCount(string activityCategoryId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("attention_id", activityCategoryId);
            string result = DbHelperFactory.SingleInstance().GetDataTable("FollowSQL", "GetActivityCategoryFollowCountByActivityCategoryId", param);
            return result;
        }

        public string CancelActivityCategoryFollow(string id)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("id", id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "CancelActivityCategoryFollow", param);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowFailInfo"), MessageType.error);
            }
        }
    }
}
