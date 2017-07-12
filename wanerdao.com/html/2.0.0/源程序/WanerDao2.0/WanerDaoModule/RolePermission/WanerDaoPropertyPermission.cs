using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WanerDao2.WanerDaoModule.RolePermission
{

    /// <summary>
    /// 描述:权限管理类
    /// 描述：xux
    /// 时间：2011-10-08
    /// </summary>
  public  class WanerDaoPropertyPermission
    {

      /// <summary>
      /// 判断是否有查看权限
      /// </summary>
      /// <param name="userID">当前登录用户ID</param>
      /// <param name="objectUserID">访问对象用户ID</param>
      /// <param name="permissionID">访问权限ID</param>
      /// <returns>是否具有访问权限</returns>
      public static bool hasPermission(string userID, string objectUserID, string permissionID)
      {
          if (permissionID == null || permissionID == "")
          {
              return true;
          }
          else if (permissionID == getPropertyPermissionHash()["public"].ToString())
          {
              return true;
          }
          else if (permissionID == getPropertyPermissionHash()["private"].ToString())
          {
              return false;
          }
          else if (permissionID == getPropertyPermissionHash()["friends"].ToString())
          {
              string json = "{relation_from_id:'" + objectUserID + "',relation_to_id:'" + userID + "'}";
              Dictionary<string, object> param = Json.WanerDaoJSON.GetContentInfo(json);

          }
          else if (permissionID == getPropertyPermissionHash()["friendsOfFriends"].ToString())
          {
              string json = "{relation_from_id:'" + objectUserID + "',relation_to_id:'" + userID + "'}";
              Dictionary<string, object> param = Json.WanerDaoJSON.GetContentInfo(json);

          }
          else { 
            
          }    
          return false;
      }

        /// <summary>
        /// 查询用户权限
        /// </summary>
        /// <param name="userID">用户ID</param>
      public static void getAllPermission(string userID)
        {
            string json = "{userID:'" + userID + "'}";
            Dictionary<string, object> param =Json.WanerDaoJSON.GetContentInfo(json);
        }

      /// <summary>
      /// 临时存放
      /// </summary>
      /// <returns></returns>
      public static System.Collections.Hashtable getPropertyPermissionHash()
      {
          System.Collections.Hashtable hashModule = new System.Collections.Hashtable();
          hashModule.Add("public", "d500f146-9121-11e0-bae5-00210044b80f");
          hashModule.Add("private", "d5093672-9121-11e0-bae5-00210044b80f");
          hashModule.Add("friends", "d52dedfa-9121-11e0-bae5-00210044b80f");
          hashModule.Add("friendsOfFriends", "d53c16fe-9121-11e0-bae5-00210044b80f");
          return hashModule;
      }

    }
}
