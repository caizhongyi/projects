using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.Config;



namespace WanerDao2.WanerDaoComponent
{
    /// <summary>
    /// 描述:用户经验积分类
    /// 描述：xux
    /// 时间：2011-10-08
    /// </summary>
  public  class WanerDaoExperience
    {

      /// <summary>
      /// 用户登录获取经验积分
      /// </summary>
      /// <param name="userID">用户ID</param>
        /// <param name="lastLogin">上一次登陆时间</param>
      public static void loginAdd(string userID,DateTime lastLogin)
      {
          DateTime nowTime =DateTime.Parse( DateTime.Now.ToString("yyyy-MM-dd"));
          lastLogin = DateTime.Parse(lastLogin.ToString("yyyy-MM-dd"));
         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;
          if (nowTime.CompareTo(lastLogin)==1)
          {
              string json = "{user_id:'" + userID + "',addvalue:" + WanerDaoFilterReader.GetIntegral("loginone") + "}";
              Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
              DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", param);
           //   WPC.AddExperienceByUserId(param);
          }
          else if (nowTime.CompareTo(lastLogin)>1)
          {
              string json = "{user_id:'" + userID + "',addvalue:" + WanerDaoFilterReader.GetIntegral("loginone") + "}";
              Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
              DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", param);
              //WPC.AddExperienceByUserId(param);
          }
      }

      /// <summary>
      /// 在线时长1小时获取经验积分
      /// </summary>
      /// <param name="userID"></param>
      public static void onlineAdd(string userID)
      { 
        
      }

      /// <summary>
      /// 发帖或者回复获取经验积分
      /// </summary>
      /// <param name="userID">用户ID</param>
      /// <param name="type">类型，发帖为：P，回复为：R</param>
      public static void postAndReplyAdd(string userID, string  type)
      {
          Double addv = new Double();
          if (type.Equals("P"))
          {
              addv =Double.Parse( WanerDaoFilterReader.GetIntegral("loginone"));
          }
          else {
              addv = Double.Parse(WanerDaoFilterReader.GetIntegral("reply"));
          }
         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;
          string json = "{user_id:'" + userID + "',addvalue:" + addv + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", param);
         // WPC.AddExperienceByUserId(param);
      }



      /// <summary>
      /// 交好友获取经验积分
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static void addfriendAdd(string userID)
      {

          //IWanerDaoPersonalRelation WPR = new WanerDaoPersonalRelation() as IWanerDaoPersonalRelation;
          string gjson = "{user_id:'" + userID + "'}";
          Dictionary<string, object> gparam = WanerDaoJSON.GetContentInfo(gjson);
          string l = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "SelectAddCountPersonalFriends", gparam).ToString();
         //IList<string> l =  WPR.getAddCountPersonalFriends(gparam);
          if (l != "0")
          {
              if (int.Parse(l) <= 20)
              {
                  // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;
                  string json = "{user_id:'" + userID + "',addvalue:" + WanerDaoFilterReader.GetIntegral("addfriend") + "}";
                  Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
                  DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", param);
                  // WPC.AddExperienceByUserId(param);
              }
          }
      }


      /// <summary>
      /// 发展站外好友成功获取经验积分
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static void addOutsidefriend(string userID)
      {

         // IWanerDaoPersonalRelation WPR = new WanerDaoPersonalRelation() as IWanerDaoPersonalRelation;
          string gjson = "{user_id:'" + userID + "'}";
          Dictionary<string, object> gparam = WanerDaoJSON.GetContentInfo(gjson);
          IList<string> l = DbHelperFactory.SingleInstance().GetGenericModel<string>("PersonSQL", "SelectAddCountPersonalFriends", gparam);
         // IList<string> l = WPR.addOutsidefriend(gparam);
          if (int.Parse(l[0]) <= 50)
          {
             // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;
              string json = "{user_id:'" + userID + "',addvalue:" + WanerDaoFilterReader.GetIntegral("addOutsidefriend") + "}";
              Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
              DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", param);
              //WPC.AddExperienceByUserId(param);
          }
      }

      /// <summary>
      /// 创建圈子加积分
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static void greateGroupAdd(string userID)
      {

             // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;
              string json = "{user_id:'" + userID + "',addvalue:" + WanerDaoFilterReader.GetIntegral("greateGroupAdd") + "}";
              Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
              DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", param);
            //  WPC.AddExperienceByUserId(param);

      }

      /// <summary>
      /// 加入圈子加积分
      /// </summary>
      /// <param name="userID">用户ID</param>
      /// <param name="groupUserID">圈子创建用户ID</param>
      public static void joinGroupAdd(string userID,string groupUserID)
      {

         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;
          string json = "{user_id:'" + userID + "',addvalue:" + WanerDaoFilterReader.GetIntegral("joinGroupAddone") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", param);
          //WPC.AddExperienceByUserId(param);

          string groupjson = "{user_id:'" + groupUserID + "',addvalue:" + WanerDaoFilterReader.GetIntegral("joinGroupAddtwo") + "}";
          Dictionary<string, object> groupparam = WanerDaoJSON.GetContentInfo(groupjson);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", groupparam);
          //WPC.AddExperienceByUserId(groupparam);

      }

      /// <summary>
      /// 退出圈子扣积分
      /// </summary>
      /// <param name="userID">用户ID</param>
      /// <param name="groupUserID">圈子创建用户ID</param>
      public static void outGroupDel(string userID, string groupUserID)
      {

         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;
          string json = "{user_id:'" + userID + "',addvalue:-" + WanerDaoFilterReader.GetIntegral("joinGroupAddone") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", param);
         // WPC.AddExperienceByUserId(param);

          string groupjson = "{user_id:'" + groupUserID + "',addvalue:-" + WanerDaoFilterReader.GetIntegral("joinGroupAddtwo") + "}";
          Dictionary<string, object> groupparam = WanerDaoJSON.GetContentInfo(groupjson);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", groupparam);
          //WPC.AddExperienceByUserId(groupparam);

      }

      /// <summary>
      /// “删除”圈子扣积分
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static void delGroupDel(string userID)
      {

         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;
          string json = "{user_id:'" + userID + "',addvalue:-" + WanerDaoFilterReader.GetIntegral("joinGroupAddone") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", param);
         // WPC.AddExperienceByUserId(param);

      }


      /// <summary>
      /// 举办活动加积分
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static void heldActivityAdd(string userID)
      {

          string json = "{user_id:'" + userID + "',addvalue:" + WanerDaoFilterReader.GetIntegral("createActivityAdd") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", param);

      }


      /// <summary>
      /// 参加活动加积分
      /// </summary>
      /// <param name="userID">用户ID</param>
      /// <param name="activityCreateID">活动创建用户ID</param>
      public static void joinActivityAdd(string userID,string activityCreateID)
      {

          string json = "{user_id:'" + userID + "',addvalue:" + WanerDaoFilterReader.GetIntegral("joinActivityAddone") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", param);

          string activityjson = "{user_id:'" + activityCreateID + "',addvalue:" + WanerDaoFilterReader.GetIntegral("joinActivityAddtwo") + "}";
          Dictionary<string, object> activityparam = WanerDaoJSON.GetContentInfo(activityjson);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", activityparam);
      }


      /// <summary>
      /// 推荐活动成功加积分
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static void recommendActivityAdd(string userID)
      {

          string json = "{user_id:'" + userID + "',addvalue:" + WanerDaoFilterReader.GetIntegral("recommendActivityAdd") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", param);

      }


      /// <summary>
      /// 个人信息完成度加积分
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static void finishInformationAdd(string userID, double oldfinish, double newfinish)
      {

         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;

          string json = "{user_id:'" + userID + "',addvalue:" + (newfinish - oldfinish )+ "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", param);
         // WPC.AddExperienceByUserId(param);



      }

      /// <summary>
      /// 共享系统共享一条真实，合法，有效的资料，加爱心度
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static void shareScoreAdd(string userID)
      {

         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;

          string json = "{user_id:'" + userID + "',addvalue:" + WanerDaoFilterReader.GetIntegral("shareScoreOne") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateShareScoreExperience", param);
          //WPC.AddShareScore(param);

      }

      /// <summary>
      /// 	活动中，免费提供搭车，每个人 加爱心度
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static void shareCarScoreAdd(string userID)
      {

          //IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;

          string json = "{user_id:'" + userID + "',addvalue:" + WanerDaoFilterReader.GetIntegral("shareScoreTwo") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateShareScoreExperience", param);
         // WPC.AddShareScore(param);

      }

      /// <summary>
      ///  返回可增加的个人活跃度
      /// </summary>
      /// <param name="userID"></param>
      /// <returns></returns>
      public static int getPersonActivityScore(string userID,string p)
      {
          string json = "{user_id:'" + userID + "'}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
           
          int joinScore = int.Parse(WanerDaoFilterReader.GetIntegral(p));
          int oldScore = int.Parse(DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "GetActivityScoreExperience", param).ToString());
          if (oldScore + joinScore > 100)
          {
              joinScore = 100 - oldScore;
          }
          return joinScore;
      }

      /// <summary>
      /// 返回可增加的活动活跃度
      /// </summary>
      /// <param name="ActivityID"></param>
      /// <param name="p"></param>
      /// <returns></returns>
      public static int getActivityActivityScore(string ActivityID, string p)
      {
          string json = "{id:'" + ActivityID + "'}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);

          int joinScore = int.Parse(WanerDaoFilterReader.GetIntegral(p));
          int oldScore = int.Parse(DbHelperFactory.SingleInstance().GetScalar("ActivitySQL", "GetActivityScoreExperienceNew", param).ToString());
          if (oldScore + joinScore > 100)
          {
              joinScore = 100 - oldScore;
          }
          return joinScore;
      }

      /// <summary>
      /// 返回可增加的圈子活跃度
      /// </summary>
      /// <param name="ActivityID"></param>
      /// <param name="p"></param>
      /// <returns></returns>
      public static Double getGroupActivityScore(string GroupID, string p)
      {
          string json = "{id:'" + GroupID + "'}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);

          Double joinScore = Double.Parse(WanerDaoFilterReader.GetIntegral(p));
          Double oldScore = Double.Parse(DbHelperFactory.SingleInstance().GetScalar("GroupSQL", "GetActivityScoreExperience", param).ToString());
          if (oldScore + joinScore > 100)
          {
              joinScore = 100 - oldScore;
          }
          return joinScore;
      }

      /// <summary>
      /// 参加活动加活跃度
      /// </summary>
      /// <param name="userID">用户ID</param>
      /// <param name="ActivityID">活动ID</param>
      public static void joinActivityScoreAdd(string userID, string ActivityID)
      {

         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;


          string json = "{user_id:'" + userID + "',addvalue:" + getPersonActivityScore(userID, "joinActivityScore") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateActivityScoreExperience", param);
         // WPC.AddActivityScoreByUserId(param);

          string jsonActivity = "{id:'" + ActivityID + "',addvalue:" + getActivityActivityScore(ActivityID, "joinActivityScore") + "}";
          Dictionary<string, object> paramActivity = WanerDaoJSON.GetContentInfo(jsonActivity);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("ActivitySQL", "UpdateActivityScoreExperienceNew", paramActivity);
         // WPC.AddActivityScoreByActivityId(paramActivity);
      }

      /// <summary>
      /// 创建活动加活跃度
      /// </summary>
      /// <param name="userID">用户ID</param>
      /// <param name="ActivityID">活动ID</param>
      public static void createActivityScoreAdd(string userID, string ActivityID)
      {

         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;

          string json = "{user_id:'" + userID + "',addvalue:" + getPersonActivityScore(userID,"createActivityScore") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateActivityScoreExperience", param);
         // WPC.AddActivityScoreByUserId(param);

          string jsonActivity = "{id:'" + ActivityID + "',addvalue:" + getActivityActivityScore(ActivityID, "joinActivityScore") + "}";
          Dictionary<string, object> paramActivity = WanerDaoJSON.GetContentInfo(jsonActivity);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("ActivitySQL", "UpdateActivityScoreExperienceNew", paramActivity);
          //WPC.AddActivityScoreByActivityId(paramActivity);
      }

      /// <summary>
      /// 活动发言加活跃度
      /// </summary>
      /// <param name="userID">用户ID</param>
      /// <param name="ActivityID">活动ID</param>
      public static void postAddActivityScoreAdd(string userID, string ActivityID)
      {

          //IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;

          string json = "{user_id:'" + userID + "',addvalue:" + getPersonActivityScore(userID,"postActivityScore") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateActivityScoreExperience", param);
          // WPC.AddActivityScoreByUserId(param);

          string jsonActivity = "{id:'" + ActivityID + "',addvalue:" + getActivityActivityScore(ActivityID, "postAddActivityScore") + "}";
          Dictionary<string, object> paramActivity = WanerDaoJSON.GetContentInfo(jsonActivity);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("ActivitySQL", "UpdateActivityScoreExperienceNew", paramActivity);
          //WPC.AddActivityScoreByActivityId(paramActivity);
      }

      /// <summary>
      /// 发言加活跃度
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static void postActivityScoreAdd(string userID)
      {

         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;

          string json = "{user_id:'" + userID + "',addvalue:" + getPersonActivityScore(userID,"postActivityScore") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateActivityScoreExperience", param);
          // WPC.AddActivityScoreByUserId(param);

      }

      /// <summary>
      /// 感想加活跃度
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static void thinkActivityScoreAdd(string userID)
      {

         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;

          string json = "{user_id:'" + userID + "',addvalue:" + getPersonActivityScore(userID,"thinkActivityScore") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateActivityScoreExperience", param);
          // WPC.AddActivityScoreByUserId(param);

      }

      /// <summary>
      /// 感想回复加活跃度
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static void thinkReplyActivityScoreAdd(string userID)
      {

          //IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;

          string json = "{user_id:'" + userID + "',addvalue:" + getPersonActivityScore(userID, "thinkReplyActivityScore") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateActivityScoreExperience", param);
          // WPC.AddActivityScoreByUserId(param);

      }

      /// <summary>
      /// 圈子名义发起活动加活跃度
      /// </summary>
      /// <param name="groupID">圈子ID</param>
      public static void groupCreateActivityScoreAdd(string groupID)
      {

        //  IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;

          string json = "{id:'" + groupID + "',addvalue:" + getGroupActivityScore(groupID,"groupCreateActivityScore") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("GroupSQL", "UpdateActivityScoreExperience", param);
        //  WPC.AddActivityScoreByGroupId(param);

      }

      /// <summary>
      /// 加入人数加活跃度
      /// </summary>
      /// <param name="groupID">圈子ID</param>
      public static void jionGroupActivityScoreAdd(string groupID)
      {

         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;

          string json = "{id:'" + groupID + "',addvalue:" + getGroupActivityScore(groupID, "jionGroupActivityScore") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("GroupSQL", "UpdateActivityScoreExperience", param);
          //  WPC.AddActivityScoreByGroupId(param);


      }

      /// <summary>
      /// 发帖加活跃度
      /// </summary>
      /// <param name="groupID">圈子ID</param>
      public static void postGroupActivityScoreAdd(string groupID)
      {

         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;

          string json = "{id:'" + groupID + "',addvalue:" + getGroupActivityScore(groupID, "postGroupActivityScore") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("GroupSQL", "UpdateActivityScoreExperience", param);
          //  WPC.AddActivityScoreByGroupId(param);


      }

      /// <summary>
      /// 发感想加活跃度
      /// </summary>
      /// <param name="groupID">圈子ID</param>
      public static void thinkGroupActivityScoreAdd(string groupID)
      {

         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;

          string json = "{id:'" + groupID + "',addvalue:" + getGroupActivityScore(groupID, "thinkGroupActivityScore") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("GroupSQL", "UpdateActivityScoreExperience", param);
          //  WPC.AddActivityScoreByGroupId(param);


      }

      /// <summary>
      /// 发感想回复加活跃度
      /// </summary>
      /// <param name="groupID">圈子ID</param>
      public static void thinkReplyGroupActivityScoreAdd(string groupID)
      {

         // IWanerDaoPersonConfig WPC = new WanerDaoPersonConfig() as IWanerDaoPersonConfig;

          string json = "{id:'" + groupID + "',addvalue:" + getGroupActivityScore(groupID, "thinkReplyGroupActivityScore") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          DbHelperFactory.SingleInstance().ExecuteNonQuery("GroupSQL", "UpdateActivityScoreExperience", param);
          //  WPC.AddActivityScoreByGroupId(param);

      }


      /// <summary>
      /// 查询个人关注度
      /// </summary>
      /// <param name="userID">用户ID</param>
      public static double SelectCount_FriendsFollow(string userID)
      {

         // IWanerDaoFollow WDF = new WanerDaoFollow() as IWanerDaoFollow;

          string json = "{user_id:'" + userID + "'}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          IList<String> l = DbHelperFactory.SingleInstance().GetGenericModel<String>("FollowSQL", "SelectCount_FriendsFollow", param);
         // IList<String> l = WDF.SelectCount_FriendsFollow(param);
          return double.Parse(l[0]) * double.Parse(WanerDaoFilterReader.GetIntegral("PersonalFollow"));


      }

      /// <summary>
      /// 查询活动关注度
      /// </summary>
      /// <param name="ActivityID">活动ID</param>
      public static double SelectCount_ActivityFollow(string ActivityID)
      {

        //  IWanerDaoFollow WDF = new WanerDaoFollow() as IWanerDaoFollow;

          string json = "{id:'" + ActivityID + "'}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          IList<String> l =  DbHelperFactory.SingleInstance().GetGenericModel<String>("FollowSQL", "SelectCount_ActivityFollow", param);
          //IList<String> l = WDF.SelectCount_ActivityFollow(param);
          return double.Parse(l[0]) * double.Parse(WanerDaoFilterReader.GetIntegral("ActivityFollow"));

      }

      /// <summary>
      /// 查询圈子关注度
      /// </summary>
      /// <param name="GroupID">活动ID</param>
      public static double SelectCount_GroupFollow(string GroupID)
      {

          //IWanerDaoFollow WDF = new WanerDaoFollow() as IWanerDaoFollow;

          string json = "{id:'" + GroupID + "',addvalue:" + WanerDaoFilterReader.GetIntegral("GroupFollow") + "}";
          Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
          IList<String> l = DbHelperFactory.SingleInstance().GetGenericModel<String>("FollowSQL", "SelectCount_GroupFollow", param);
         // IList<String> l = WDF.SelectCount_GroupFollow(param);
          return double.Parse(l[0]) * double.Parse(WanerDaoFilterReader.GetIntegral("GroupFollow"));

      }

    }
}
