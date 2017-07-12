using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Follow;

namespace WanerDao2.WanerDaoIBLL.IFollow
{
    public interface IWanerDaoPersonalGroupFollow
    {
        /// <summary>
        /// 个人关注圈子。需要填充user_id、attention_id、attention_datetime、is_email、email_duration
        /// </summary>
        /// <param name="model">关注实体</param>
        /// <returns></returns>
        string CreatePersonalGroupFollow(PersonalGroupFollowModel model);
        /// <summary>
        /// 个人取消关注圈子
        /// </summary>
        /// <param name="userId">关注人主键</param>
        /// <param name="groupId">所关注的圈子主键</param>
        /// <returns></returns>
        string CancelPersonalGroupFollow(string userId, string groupId);
        /// <summary>
        /// 个人是否关注了圈子
        /// </summary>
        /// <param name="userId">个人主键</param>
        /// <param name="groupId">圈子主键</param>
        /// <returns></returns>
        bool HasPersonalGroupFollow(string userId, string groupId);

        string GetPersonalGroupFollow(int pageCurrent, int pageSize, string where);

        string UpdatePersonalGroupFollowDuration(string id, bool isEmail, int emailDuration);
    }
}
