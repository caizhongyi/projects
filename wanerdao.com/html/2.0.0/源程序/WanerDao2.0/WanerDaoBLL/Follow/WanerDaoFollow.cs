using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IFollow;
using WanerDao2.WanerDaoModel.Relation;
using WanerDao2.WanerDaoDALFactory;

namespace WanerDao2.WanerDaoBLL.Follow
{

    /// <summary>
    /// 描述:关注类接口实现
    /// 描述：xux
    /// 时间：2011-11-11
    /// </summary>
    public class WanerDaoFollow : IWanerDaoFollow
    {

       /// <summary>
        /// 查询个人关注度
       /// </summary>
        /// <param name="dic">用户ID</param>
       /// <returns></returns>
        public IList<String> SelectCount_FriendsFollow(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetGenericModel<String>("FollowSQL", "SelectCount_FriendsFollow", dic);
       }

        /// <summary>
        /// 查询活动关注度
        /// </summary>
        /// <param name="dic">活动ID</param>
        /// <returns></returns>
        public IList<string> SelectCount_ActivityFollow(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetGenericModel<String>("FollowSQL", "SelectCount_ActivityFollow", dic);
       
        }
        /// <summary>
        /// 查询圈子关注度
        /// </summary>
        /// <param name="dic">圈子ID</param>
        /// <returns></returns>
        public IList<string> SelectCount_GroupFollow(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetGenericModel<String>("FollowSQL", "SelectCount_GroupFollow", dic);
        }
    }
}
