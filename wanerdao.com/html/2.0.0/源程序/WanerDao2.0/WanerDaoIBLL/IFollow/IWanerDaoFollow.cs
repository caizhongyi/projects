using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Relation;

namespace WanerDao2.WanerDaoIBLL.IFollow
{
    /// <summary>
    /// 描述:关注类接口
    /// 描述：xux
    /// 时间：2011-11-10
    /// </summary>
    public interface IWanerDaoFollow
    {
        /// <summary>
        /// 查询个人关注度
        /// </summary>
        /// <param name="dic">用户ID</param>
        /// <returns></returns>
        IList<String> SelectCount_FriendsFollow(Dictionary<string, object> dic);

        /// <summary>
        /// 查询圈子关注度
        /// </summary>
        /// <param name="dic">圈子ID</param>
        /// <returns></returns>
        IList<String> SelectCount_GroupFollow(Dictionary<string, object> dic);

        /// <summary>
        /// 查询活动关注度
        /// </summary>
        /// <param name="dic">活动ID</param>
        /// <returns></returns>
        IList<String> SelectCount_ActivityFollow(Dictionary<string, object> dic);
    }
}
