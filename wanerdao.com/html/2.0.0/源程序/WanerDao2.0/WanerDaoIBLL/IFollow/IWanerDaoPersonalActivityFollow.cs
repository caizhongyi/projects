using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Follow;

namespace WanerDao2.WanerDaoIBLL.IFollow
{
    public interface IWanerDaoPersonalActivityFollow
    {
        /// <summary>
        /// 个人关注活动，必须填充user_id、attention_id，可传is_email、email_duration
        /// </summary>
        /// <param name="model">关注实体</param>
        /// <returns></returns>
        string CreatePersonalActivityFollow(PersonalActivityFollowModel model);
        /// <summary>
        /// 个人取消关注实体
        /// </summary>
        /// <param name="userId">关注人主键</param>
        /// <param name="activityId">被关注活动主键</param>
        /// <returns></returns>
        string CancelPersonalActivityFollow(string userId, string activityId);

        ///// <summary>
        ///// 个人取消关注实体
        ///// </summary>
        ///// <param name="id">活动关注主键</param>
        ///// <returns></returns>
        //string CancelPersonalActivityFollow(string id);


        /// <summary>
        /// 判断是否已经关注活动
        /// </summary>
        /// <param name="userId">关注人主键</param>
        /// <param name="activityId">被关注活动主键</param>
        /// <returns></returns>
        bool HasPersonalActivityFollow(string userId, string activityId);

        string GetPersonalActivityFollow(int pageCurrent, int pageSize, string where);

        string UpdatePersonalActivityFollowDuration(string id, bool isEmail, int emailDuration);

        string GetPersonalActivityFollowCount(string activityId);
    }
}
