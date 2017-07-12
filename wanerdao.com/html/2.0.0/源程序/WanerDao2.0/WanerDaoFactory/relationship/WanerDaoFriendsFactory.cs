#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：xux   时间：2012/2/3
* 文件名：WanerDaoFriendsFactory 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.SessionState;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoIBLL.IRelation;
using WanerDao2.WanerDaoModel.Person;

namespace WanerDao2.WanerDaoBLLFactory.relationship
{
    public class WanerDaoFriendsFactory : IHttpHandler, IRequiresSessionState
    {
         #region IHttpHandler Members

        public bool IsReusable
        {
            // 如果无法为其他请求重用托管处理程序，则返回 false。
            // 如果按请求保留某些状态信息，则通常这将为 false。
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Cache.SetCacheability(HttpCacheability.ServerAndNoCache);
            PersonalSecurityProfileModel pspmodel = CommonContext.GetUserSecurityInfo();
            string json = string.Empty;
            string typestr = WanerDaoValidation.ValidateParamters(context.Request.Form.ToString());
               IWanerDaoFriends iwdf = new WanerDao2.WanerDaoBLL.Relation .WanerDaoFriends () as IWanerDaoFriends;
               IWanerDaoFollow iwdfo= new WanerDao2.WanerDaoBLL.Relation.WanerDaoFollow() as IWanerDaoFollow;
               if (typestr == string.Empty)
               {
                   json = WanerDaoJSON.GetErrorJson("no operator type or invalid operator!");
               }
               else
               {
                   Dictionary<string, object> dic = WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());
                   dic.Add("user_id", pspmodel.user_id);

                   switch (typestr)
                   {
                       #region 获取分组信息
                       case "getfriendsgroup":
                           json = iwdf.InitData_ClassStr(dic);
                           break;
                       #endregion
                       #region  查询好友信息
                       case "getfriendsList":
                           json = iwdf.SearchOfIndex(dic);
                           break;
                       #endregion

                       #region  查询按好友分组ID查询好友信息
                       case "getfriendsbyclass":
                           json = iwdf.Selectfriend_Class(dic);
                           break;
                       #endregion
                       #region 添加分组
                       case "addfriendsgroup":
                          int r =  iwdf.CreateFriendGroup(dic);
                          if (r == 1)
                          {
                              json = WanerDaoJSON.GetSuccessJson(json);
                          }
                          else {
                              json = WanerDaoJSON.GetErrorJson(json);
                          }
                           break;
                       #endregion

                       #region 删除分组
                       case "deletemyclass":
                           r = iwdf.Delete_relationship_class(dic);
                           if (r > 0)
                           {
                               json = WanerDaoJSON.GetSuccessJson(json);
                           }
                           else
                           {
                               json = WanerDaoJSON.GetErrorJson(json);
                           }
                           break;
                       #endregion
                       #region 修改好友分组名
                       case "updateclassname":
                           r = iwdf.UpdateFriendsGounpName(dic);
                           if (r > 0)
                           {
                               json = WanerDaoJSON.GetSuccessJson(json);
                           }
                           else
                           {
                               json = WanerDaoJSON.GetErrorJson(json);
                           }
                           break;
                       #endregion
                       #region 删除好友
                       case "deletemyfriend":
                            r = iwdf.Delete_relationship_myfriends(dic);
                           if (r > 0)
                           {
                               json = WanerDaoJSON.GetSuccessJson(json);
                           }
                           else
                           {
                               json = WanerDaoJSON.GetErrorJson(json);
                           }
                           break;
                       #endregion

                       #region 批量删除好友
                       case "deleteallmyfriend":
                             iwdf.Delete_Allrelationship_myfriends(dic);
                           break;
                       #endregion

                       #region 批量修改好友分组
                       case "updateclass":
                           iwdf.UpdateFriendsGounp(dic);
                           break;
                       #endregion
                       #region 取消\关注
                       case "cancelfriendsfollow":
                          json =  iwdfo.FriendsFollow(dic).ToString ();
                           break;
                       #endregion
                       #region 好友申请
                       case "sendinvite":
                           json = iwdf.send_invite(dic).ToString();
                           break;
                       #endregion

                   }
                   context.Response.Write(json);
               }
        }
        #endregion
 
    }
}
