using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IRelation;
using WanerDao2.WanerDaoModel.Relation;
using WanerDao2.WanerDaoDALFactory;

namespace WanerDao2.WanerDaoBLL.Relation
{
    /// <summary>
    /// 描述:关注类接口实现
    /// 描述：xux
    /// 时间：2011-11-20
    /// </summary>
   public class WanerDaoFollow :IWanerDaoFollow
    {
        /// <summary>
        /// 添加好友关注
        /// </summary>
        /// <param name="dic">用户ID;关注对象ID</param>
        /// <returns></returns>
        public int ADDFriendsFollow(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "ADDFriendsFollow", dic);
        }

        /// <summary>
        /// 取消好友关注
        /// </summary>
        /// <param name="dic">用户ID;关注对象ID</param>
        /// <returns></returns>
        public int DelFriendsFollow(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "DelFriendsFollow", dic);
        }

        /// <summary>
        /// 判断是否好友关注
        /// </summary>
        /// <param name="dic">用户ID;关注对象ID</param>
        /// <returns></returns>
        public object hasFriendsFollow(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetScalar("FollowSQL", "hasFriendsFollow", dic);
        }

        /// <summary>
        /// 添加\取消圈子关注
        /// </summary>
        /// <param name="dic">user_id,group_id,addvalue</param>
        /// <returns></returns>
        public int updateGroupFollow(Dictionary<string, object> dic)
        {
            if (dic["addvalue"].ToString() == "1")
            {
                return DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("FollowSQL", "AddGroupFollow", dic);
            }
            else
            {
                return DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("FollowSQL", "DelGroupFollow", dic);
            }
        }


        /// <summary>
        /// 好友 取消\关注
        /// </summary>
        /// <param name="dic">用户ID;关注对象ID</param>
        /// <returns></returns>
        public int FriendsFollow(Dictionary<string, object> dic)
        {

           if (hasFriendsFollow(dic) != null)
           {
               int r = DelFriendsFollow(dic);//取消关注
               if (r > 0)
               {
                   return 1;
               }
               else
               {
                   return 0;
               }
           }
           else {
               int r = ADDFriendsFollow(dic);//添加关注
               if (r == 1)
               {
                   return 2;
               }
               else
               {
                   return 0;
               }
           }
        }
    }
}
