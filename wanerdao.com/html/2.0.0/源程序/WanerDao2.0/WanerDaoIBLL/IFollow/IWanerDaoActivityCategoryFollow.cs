using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Follow;

namespace WanerDao2.WanerDaoIBLL.IFollow
{
    public interface IWanerDaoActivityCategoryFollow
    {
        /// <summary>
        /// 关注活动分类，必须填充user_id、attention_id，可传is_email、email_duration
        /// </summary>
        /// <param name="modal">关注实体</param>
        /// <returns></returns>
        string CreateActivityCategoryFollow(ActivityCategoryFollowModel modal);
        /// <summary>
        /// 取消关注活动分类
        /// </summary>
        /// <param name="userId">关注人主键</param>
        /// <param name="activityId">被关注活动主键</param>
        /// <returns></returns>
        string CancelActivityCategoryFollow(string userId, string activityId);

        /// <summary>
        /// 个人取消关注实体
        /// </summary>
        /// <param name="id">活动关注主键</param>
        /// <returns></returns>
        string CancelActivityCategoryFollow(string id);


        /// <summary>
        /// 判断是否已经关注活动
        /// </summary>
        /// <param name="userId">关注人主键</param>
        /// <param name="activityId">被关注活动主键</param>
        /// <returns></returns>
        bool HasActivityCategoryFollow(string userId, string activityId);

        string GetActivityCategoryFollow(int pageCurrent, int pageSize, string where);

        string UpdateActivityCategoryFollowDuration(string id, bool isEmail, int emailDuration);

        string GetActivityCategoryFollowCount(string activityCategoryId);
    }
}
