using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Follow;

namespace WanerDao2.WanerDaoIBLL.IFollow
{
    public interface IWanerDaoPersonalFriendsFollow
    {
        /// <summary>
        /// 个人关注朋友，需要填充user_id、attention_id、is_email、email_duration
        /// </summary>
        /// <param name="model">关注实体</param>
        /// <returns></returns>
        string CreatePersonalFriendsFollow(PersonalFriendsFollowModel model);
        /// <summary>
        /// 个人取消关注朋友
        /// </summary>
        /// <param name="userId">关注人主键</param>
        /// <param name="friendId">被关注人主键</param>
        /// <returns></returns>
        string CancelPersonalFriendsFollow(string userId, string friendId);
        /// <summary>
        /// 判断是否已经关注朋友
        /// </summary>
        /// <param name="userId">关注人主键</param>
        /// <param name="attentionId">被关注人主键</param>
        /// <returns></returns>
        bool HasPersonalFriendsFollow(string userId, string friendId);

        string GetPersonalFriendsFollow(int pageCurrent, int pageSize, string where);

        string GetPersonalMyselfFollow(int pageCurrent, int pageSize, string where);

        string UpdatePersonalFriendsFollowDuration(string id, bool isEmail, int emailDuration);
    }
}
