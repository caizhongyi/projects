using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModel.Person;

namespace WanerDao2.WanerDaoBLL.Person
{
    /// <summary>
    /// 描述:用户关系类接口实现
    /// 描述：xux
    /// 时间：2011-10-25
    /// </summary>
    public class WanerDaoPersonalRelation : IWanerDaoPersonalRelation
    {

        /// <summary>
        /// 判断第1个用户是否为第2个用户的好友
        /// </summary>
        /// <param name="dic">第一个用户ID,第二个用户ID</param>
        /// <returns></returns>
        public Boolean IfFriend(Dictionary<string, object> dic)
        {
          string json =  DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "SelectSinglePersonalFriends", dic);
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          if (param.Values.ToString() == "") {
              return false;
          }else{
                return true;
          }
        }

        /// <summary>
        /// 判断第1个用户是否为第2个用户的好友的好友
        /// </summary>
        /// <param name="dic">第一个用户ID,第二个用户ID</param>
        /// <returns></returns>
        public Boolean IfFriendFriend(Dictionary<string, object> dic)
        {
            string json = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "SelectSinglePersonalFriendsFriends", dic);
            Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
            if (param.Values.ToString() == "")
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        /// <summary>
        /// 查询第1个用户和第2个用户共同的圈子
        /// </summary>
        /// <param name="dic">第一个用户ID,第二个用户ID</param>
        /// <returns></returns>
        public IList<string> getSameGroup(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetGenericModel<string>("PermissionSQL", "PersonalSameGroup", dic);
        }

        /// <summary>
        /// 查询当天的交友数量
        /// </summary>
        /// <param name="dic">用户ID</param>
        /// <returns></returns>
        public IList<string> getAddCountPersonalFriends(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetGenericModel<string>("PersonSQL", "SelectAddCountPersonalFriends", dic);
        }

        /// <summary>
        /// 查询全部好友
        /// </summary>
        /// <param name="dic">用户ID</param>
        /// <returns></returns>
        public IList<PersonalProfileModel> getAllPersonalFriends(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetGenericModel<PersonalProfileModel>("RelationSQL", "SelectAll_UserGroup", dic);
        }

        /// <summary>
        /// 查询当天发展站外好友数量
        /// </summary>
        /// <param name="dic">用户ID</param>
        /// <returns></returns>
        public IList<string> addOutsidefriend(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetGenericModel<string>("PersonSQL", "SelectAddCountPersonalFriends", dic);
        }
    }
}
