using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using WanerDao2.WanerDaoModel.Person;

namespace WanerDao2.WanerDaoIBLL.IPerson
{
    /// <summary>
    /// 描述:用户关系类接口
    /// 描述：xux
    /// 时间：2011-10-25
    /// </summary>
   public interface IWanerDaoPersonalRelation
    {
       /// <summary>
        /// 判断第1个用户是否为第2个用户的好友
       /// </summary>
        /// <param name="dic">第一个用户ID,第二个用户ID</param>
       /// <returns></returns>
       Boolean IfFriend(Dictionary<string, object> dic);

       /// <summary>
       /// 判断第1个用户是否为第2个用户的好友的好友
       /// </summary>
       /// <param name="dic">第一个用户ID,第二个用户ID</param>
       /// <returns></returns>
       Boolean IfFriendFriend(Dictionary<string, object> dic);

       /// <summary>
       /// 查询第1个用户和第2个用户共同的圈子
       /// </summary>
       /// <param name="dic">第一个用户ID,第二个类型</param>
       /// <returns></returns>
       IList<string> getSameGroup(Dictionary<string, object> dic);

       /// <summary>
       /// 查询当天的交友数量
       /// </summary>
       /// <param name="dic">用户ID</param>
       /// <returns></returns>
       IList<string> getAddCountPersonalFriends(Dictionary<string, object> dic);

       /// <summary>
       /// 查询当天发展站外好友数量
       /// </summary>
       /// <param name="dic">用户ID</param>
       /// <returns></returns>
       IList<string> addOutsidefriend(Dictionary<string, object> dic);

       /// <summary>
       /// 查询全部好友
       /// </summary>
       /// <param name="dic">用户ID</param>
       /// <returns></returns>
       IList<PersonalProfileModel> getAllPersonalFriends(Dictionary<string, object> dic);


    }
}
