using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoModel.Relation;

namespace WanerDao2.WanerDaoComponent
{

    /// <summary>
    /// 描述:权限管理类
    /// 描述：xux
    /// 时间：2011-10-08
    /// </summary>
  public  class WanerDaoPropertyPermission
    {


        /// <summary>
        /// 判断第1个用户是否为第2个用户的好友
        /// </summary>
        /// <param name="dic">第一个用户ID,第二个用户ID</param>
        /// <returns></returns>
      public static Boolean IfFriend(Dictionary<string, object> dic)
        {
            object reValue = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "SelectSinglePersonalFriends", dic);
            if (reValue == null)
            {
                return false;
            }
            else {
                return true;
            }
           
        }

      /// <summary>
      /// 判断第1个用户是否为第2个用户的好友的好友
      /// </summary>
      /// <param name="dic">第一个用户ID,第二个用户ID</param>
      /// <returns></returns>
      public static Boolean IfFriendFriend(Dictionary<string, object> dic)
      {
          object reValue = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "SelectSinglePersonalFriendsFriends", dic);
          if (reValue == null)
          {
              return false;
          }
          else
          {
              return true;
          }
      }


      /// <summary>
      /// 判断是否在黑名单中
      /// </summary>
      /// <param name="dic">第一个用户ID,第二个权限ID</param>
      /// <returns></returns>
      public static bool SelectSingle_Permission_Black(Dictionary<string, object> dic)
      {
          object reValue = DbHelperFactory.SingleInstance().GetScalar("PermissionSQL", "PermissionBlack", dic);
          if (reValue == null)
          {
              return false;
          }
          else
          {
              return true;
          }
      }


      /// <summary>
      /// 判断是否在允许的个人、好友分组、圈子的中
      /// </summary>
      /// <param name="dic">第一个用户ID,第二个权限ID</param>
      /// <returns></returns>
      public static bool SelectPermissionAllowArray(Dictionary<string, object> dic)
      {
          object reValue = DbHelperFactory.SingleInstance().GetScalar("PermissionSQL", "PermissionAllowArray", dic);
          if (reValue == null)
          {
              return false;
          }
          else
          {
              return true;
          }
      }

      /// <summary>
      /// 判断是否有允许的全部好友、圈子
      /// </summary>
      /// <param name="dic">第一个用户ID,第二个类型</param>
      /// <returns></returns>
      public static IList<GroupModel> SelectPermissionAllAllowArray(Dictionary<string, object> dic)
      {

          return DbHelperFactory.SingleInstance().GetGenericModel<GroupModel>("PermissionSQL", "PermissionAllAllowArray", dic);
      }

      /// <summary>
      /// 查询第1个用户和第2个用户共同的圈子
      /// </summary>
      /// <param name="dic">第一个用户ID,第二个用户ID</param>
      /// <returns></returns>
      public static IList<GroupModel> getSameGroup(Dictionary<string, object> dic)
      {
          return DbHelperFactory.SingleInstance().GetGenericModel<GroupModel>("PermissionSQL", "PersonalSameGroup", dic);
      }

      /// <summary>
      /// 判断是否为基础权限
      /// </summary>
      /// <param name="dic">权限ID</param>
      /// <returns></returns>
      public static bool ifBasePermission(Dictionary<string, object> dic)
      {
          IList<GroupModel> g = DbHelperFactory.SingleInstance().GetGenericModel<GroupModel>("PermissionSQL", "ifBasePermission", dic);
          if (g[0].id == "true")
          {
              return true;
          }
          else {
              return false;
          }
          
      }

      /// <summary>
      /// 判断是否有查看权限
      /// </summary>
      /// <param name="userID">当前登录用户ID</param>
      /// <param name="objectUserID">访问对象用户ID</param>
      /// <param name="permissionID">访问权限ID</param>
      /// <returns>是否具有访问权限</returns>
      public static bool hasPermission(string userID, string objectUserID, string permissionID)
      {
          if (userID == objectUserID) {
              return true;
          }else if (permissionID == null || permissionID == "")
          {
              return true;
          }
          //公开权限
          else if (permissionID == getPropertyPermissionHash()["public"].ToString())
          {
              return true;
          }
          //私有权限
          else if (permissionID == getPropertyPermissionHash()["private"].ToString())
          {
              return false;
          }
          //好友可见权限
          else if (permissionID == getPropertyPermissionHash()["friends"].ToString())
          {
              string json = "{relation_from_id:'" + objectUserID + "',relation_to_id:'" + userID + "'}";
              Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
              return IfFriend(param);

          }

          ////好友及好友的好友可见权限(钟大说暂时取消)
          //else if (permissionID == getPropertyPermissionHash()["friendsOfFriends"].ToString())
          //{
          //    string json = "{relation_from_id:'" + objectUserID + "',relation_to_id:'" + userID + "'}";
          //    Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          //    if (IfFriend(param) || IfFriendFriend(param))
          //    {
          //      return true;
          //    }else{ 
          //      return false;
          //    }
          //}
          else {
             // IWanerDaoPermission WDP = new WanerDaoPermission() as IWanerDaoPermission;
              string json = "{user_id:'" + userID + "',permission_id:'" + permissionID + "'}";
              Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
              //黑名单
              if (SelectSingle_Permission_Black(param))
              {
                  return false;
              }
              else {
                  //允许名单
                  if (SelectPermissionAllowArray(param))
                  {
                      return true;
                  }
                  else {
                      string ojson = "{obj_type:'Network',permission_id:'" + permissionID + "'}";
                      Dictionary<string, object> oparam = WanerDaoJSON.GetContentInfo(ojson);
                      IList<GroupModel> l = SelectPermissionAllAllowArray(oparam);
                     if (l == null)
                     {
                         return false;
                     }
                     else {
                         string jsonall = "{relation_from_id:'" + objectUserID + "',relation_to_id:'" + userID + "'}";
                         Dictionary<string, object> paramall = WanerDaoJSON.GetContentInfo(jsonall);
                         foreach (GroupModel p in l)
                         {
                             if (p.user_id  == "allfriends")
                             {
                                 if (IfFriend(paramall)) {
                                     return true;
                                 }
                               
                             }
                             else if (p.user_id == "allfriendsfriends")
                             {
                                 if (IfFriend(paramall) || IfFriendFriend(paramall))
                                 {
                                     return true;
                                 }
                                 
                             }
                             else if (p.user_id == "allGroup")
                             {
                                 IList<GroupModel> g = getSameGroup(paramall);
                                 if (g != null)
                                 {
                                     return true;
                                 }
                                
                             }
                         }
                     }
                  }
              }
          }    
          return false;
      }

        /// <summary>
        /// 查询用户全部权限
        /// </summary>
        /// <param name="userID">用户ID</param>
      public static IList<PersonalPermissionModel> getAllPermission(string userID)
        {
           // IWanerDaoPermission WDP = new WanerDaoPermission() as IWanerDaoPermission;

            string json = "{user_id:'" + userID + "',language_id:'" + CommonContext.GetClientLanguage() + "'}";
            Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
            return DbHelperFactory.SingleInstance().GetGenericModel<PersonalPermissionModel>("PermissionSQL", "GetAll_propertyPermission", param);
          // return SelectAll_propertyPermission(param);
        }


      /// <summary>
      /// 查询用户全部权限
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static string getAllPermissionStr(string userID)
      {
          // IWanerDaoPermission WDP = new WanerDaoPermission() as IWanerDaoPermission;
          string json = "{user_id:'" + userID + "',language_id:'" + CommonContext.GetClientLanguage() + "'}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          return DbHelperFactory.SingleInstance().GetDataTable("PermissionSQL", "GetAll_propertyPermission", param);
          // return SelectAll_propertyPermission(param);
      }

      /// <summary>
      /// 查询个人自定义权限
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static string get_propertyDefaultPermission(string userID)
      {
          // IWanerDaoPermission WDP = new WanerDaoPermission() as IWanerDaoPermission;
          string json = "{user_id:'" + userID + "'}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          return DbHelperFactory.SingleInstance().GetDataTable("PermissionSQL", "get_propertyDefaultPermission", param);
          // return SelectAll_propertyPermission(param);
      }

      /// <summary>
      /// 查询个人自定义权限内容
      /// </summary>
      /// <param name="PermissionID">权限ID</param>
      public static string get_DefaultPermission(string PermissionID)
      {
          string json = "{PermissionID:'" + PermissionID + "'}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          return DbHelperFactory.SingleInstance().GetDataTable("PermissionSQL", "get_DefaultPermission", param);
      }

      /// <summary>
      /// 查询个人自定义权限数量
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static string getCount_propertyDefaultPermission(string userID)
      {
          //IWanerDaoPermission WDP = new WanerDaoPermission() as IWanerDaoPermission;
          string json = "{user_id:'" + userID + "'}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          return DbHelperFactory.SingleInstance().GetScalar("PermissionSQL", "GetCount_propertyDefaultPermission", param).ToString();
          //return SelectCount_propertyDefaultPermission(param)[0].ToString();
      }


      /// <summary>
      /// 添加临时权限
      /// </summary>
      /// <param name="Permission_id">权限ID</param>
      /// <param name="perimissionName">权限名</param>
      /// <param name="userID">用户ID</param>
      /// <returns></returns>
      private static int add_tempPropertyPermission(string Permission_id,string perimissionName,string level,string per_type, string userID){

          string json = "{id:'" + Permission_id + "',name:'" + perimissionName + "',level:'" + level + "',per_type:'" + per_type + "',user_id:'" + userID + "',language_id:'" + CommonContext.GetClientLanguage() + "'}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
         return DbHelperFactory.SingleInstance().ExecuteNonQuery("PermissionSQL", "add_tempPropertyPermission", param);
      }

      /// <summary>
      /// 添加权限内容
      /// </summary>
      /// <param name="user_id">对象ID</param>
      /// <param name="obj_type">对象类型</param>
      /// <param name="Permission_id">权限ID</param>
      /// <returns></returns>
      private static int add_tempCustomizedPermission(string user_id,string user_name,string obj_type,string visit_type,string Permission_id){
          string json = "{user_id:'" + user_id + "',user_name:'" + user_name + "',obj_type:'" + obj_type + "',visit_type:'" + visit_type + "',permission_id:'" + Permission_id + "',language_id:'" + CommonContext.GetClientLanguage() + "'}";
         Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
         return DbHelperFactory.SingleInstance().ExecuteNonQuery("PermissionSQL", "add_tempCustomizedPermission", param);
      }
      /// <summary>
      /// 新增或者修改权限
      /// </summary>
      /// <param name="userID">用户ID</param>
      /// <param name="newperimissionID">新权限ID，没有就为空</param>
      /// <param name="oldperimissionID">原权限ID，没有就为空</param>
      /// <param name="perimissionName">权限名</param>
      /// <param name="allowObj">允许对象</param>
      /// <param name="refuseObj">黑名单对象</param>
      /// <param name="getDefault">是否保存设定</param>
      /// <returns>返回权限ID</returns>
      public static string add_propertyPermission(string userID, string newperimissionID, string oldperimissionID, string perimissionName, string allowObj, string refuseObj, bool getDefault)
      {
          string Permission_id = Guid.NewGuid().ToString("N");
          string PerDefault_id = Guid.NewGuid().ToString("N");

          //删除旧权限
          if (oldperimissionID != "" && oldperimissionID != null)
          {
              string json = "{permission_id:'" + oldperimissionID + "'}";
              Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
              if (!ifBasePermission(param))
              {
                  del_propertyPermission(oldperimissionID);
              }
          }


          if (newperimissionID == "" || newperimissionID == null)
          {
                      add_tempPropertyPermission(Permission_id,perimissionName,"7","temp",userID);
                      //如果设置为默认自定义，再存一次
                      if (getDefault)
                      {
                          if (getCount_propertyDefaultPermission(userID).Equals(WanerDaoModule.Config.WanerDaoFilterReader.GetParam("PerDefaultMax").Trim()))
                          {
                              getDefault = false;
                          }
                          else
                          {
                              add_tempPropertyPermission(PerDefault_id, perimissionName, "6", "PerDefault", userID);
                          }
                      }
                      //自定义允许权限详细
                      string[] allowArr = allowObj.Split(new String[] { "-,-" }, StringSplitOptions.RemoveEmptyEntries);
                      foreach (string allowStr in allowArr)
                      {
                          string[] allowUser = allowStr.Split(new String[] { "--" }, StringSplitOptions.RemoveEmptyEntries);
                          add_tempCustomizedPermission(allowUser[1],allowUser[2],allowUser[0],"1",Permission_id);
                          //如果设置为默认自定义，再存一次
                          if (getDefault)
                          {
                               add_tempCustomizedPermission(allowUser[1],allowUser[2],allowUser[0],"1",PerDefault_id);
                          }

                      }
                      //自定义禁止权限详细
                      string[] refuseArr = refuseObj.Split(new String[] { "-,-" }, StringSplitOptions.RemoveEmptyEntries);
                      foreach (string refuseStr in refuseArr)
                      {

                          string[] refuseUser = refuseStr.Split(new String[] { "--" }, StringSplitOptions.RemoveEmptyEntries);
                          add_tempCustomizedPermission(refuseUser[1],refuseUser[2],refuseUser[0],"0",Permission_id);
                          //如果设置为默认自定义，再存一次
                          if (getDefault)
                          {
                             add_tempCustomizedPermission(refuseUser[1],refuseUser[2],refuseUser[0],"0",PerDefault_id);
                          }
                      }

                  }else{
                      string json = "{permission_id:'" + newperimissionID + "'}";
                      Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
                      if (ifBasePermission(param))
                      {
                          return newperimissionID;
                      }
                      else
                      {
                          string json2 = "{permission_id:'" + newperimissionID + "',newpermission_id:'" + Permission_id + "'}";
                          Dictionary<string, object> param2 = WanerDaoJSON.GetContentInfo(json2);
                          DbHelperFactory.SingleInstance().ExecuteNonQuery("PermissionSQL", "copy_tempPropertyPermission", param2);
                      }
              }
                 

                      return Permission_id;
              }


      /// <summary>
      /// 删除自定义权限
      /// </summary>
      /// <param name="perimissionID">权限ID</param>
      /// <returns></returns>
      public static int del_propertyPermission(string perimissionID)
      {
          string json = "{permission_id:'" + perimissionID + "'}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
           return  DbHelperFactory.SingleInstance().ExecuteNonQuery("PermissionSQL", "del_propertyPermission", param);
      }



      /// <summary>
      /// 临时存放
      /// </summary>
      /// <returns></returns>
      public static System.Collections.Hashtable getPropertyPermissionHash()
      {
          System.Collections.Hashtable hashModule = new System.Collections.Hashtable();
          hashModule.Add("public", "ce5e9318-a617-11e1-aa1f-101f74b66417");
          hashModule.Add("private", "ce6406c1-a617-11e1-aa1f-101f74b66417");
          hashModule.Add("friends", "ce67166e-a617-11e1-aa1f-101f74b66417");
          hashModule.Add("friendsOfFriends", "ce6aceb2-a617-11e1-aa1f-101f74b66417");
          return hashModule;
      }

    }
}
