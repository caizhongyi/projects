using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WanerDao2.WanerDaoIBLL.IRelation
{
    /// <summary>
    /// 描述:关注类接口
    /// 描述：xux
    /// 时间：2011-11-20
    /// </summary>
   public interface IWanerDaoFollow
    {
        /// <summary>
        /// 添加好友关注
        /// </summary>
        /// <param name="dic">用户ID;关注对象ID</param>
        /// <returns></returns>
       int ADDFriendsFollow(Dictionary<string, object> dic);


       /// <summary>
       /// 取消好友关注
       /// </summary>
       /// <param name="dic">用户ID;关注对象ID</param>
       /// <returns></returns>
       int DelFriendsFollow(Dictionary<string, object> dic);

       /// <summary>
       /// 判断是否好友关注
       /// </summary>
       /// <param name="dic">用户ID;关注对象ID</param>
       /// <returns>未关注返回null</returns>
       object hasFriendsFollow(Dictionary<string, object> dic);

       /// <summary>
       /// 好友 取消\关注
       /// </summary>
       /// <param name="dic">用户ID;关注对象ID</param>
       /// <returns></returns>
       int FriendsFollow(Dictionary<string, object> dic);

       /// <summary>
       /// 添加\取消圈子关注
       /// </summary>
       /// <param name="dic">user_id,group_id,addvalue</param>
       /// <returns></returns>
       int updateGroupFollow(Dictionary<string, object> dic);
    }
}
