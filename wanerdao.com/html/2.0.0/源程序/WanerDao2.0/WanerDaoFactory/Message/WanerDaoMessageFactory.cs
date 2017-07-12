#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：王薪杰   时间：2011/11/23 14:17:01 
* 文件名：WanerDaoMessageFactory 
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
using WanerDao2.WanerDaoIBLL.IMessage;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoModule.String;
namespace WanerDao2.WanerDaoBLLFactory.Message
{
    public class WanerDaoMessageFactory : IHttpHandler, IRequiresSessionState
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
            string json = string.Empty;
            string typestr = WanerDaoValidation.ValidateParamters(context.Request.Form.ToString());
            if (typestr == string.Empty)
            {
                json = WanerDaoJSON.GetErrorJson("no operator type or invalid operator!");
            }
            else
            {
                IWanerDaoMessage msg = new WanerDao2.WanerDaoBLL.Message.WanerDaoMessage() as IWanerDaoMessage;

                {
                    Dictionary<string, object> dic = WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());
                    switch (typestr)
                    {
                        #region 写信息
                        #region 信息
                        case "sendmessage"://写信息发信息 /// params:string receivePerson(多个的话用逗号分隔哦,只传id就行了),string content,string isSava(0或1)
                            json = msg.SendMessage(dic);
                            break;
                        case "savedraft"://保存到草稿箱 params:  >string receivePerson(多个的话用逗号分隔哦,只传id就行了),string content
                            json = msg.SaveToMessageBox(dic);
                            break;
                        case "autosavedraft"://保存到草稿箱    params: string receivePerson,string content
                            json = msg.SysSaveToMessageBox(dic);
                            break;
                        #endregion

                        #region 活动邀请
                        case "sendactivityinvite"://发送活动邀请
                            json = msg.SendActivityMessage(dic);
                            break;
                        #endregion

                        #region 圈子邀请

                        case "sendgroupinvite"://发送圈子邀请
                            json = msg.SendGroupMessage(dic);
                            break;
                        #endregion
                        #endregion

                        #region 收件箱

                        #region 信息
                        case "getmessagelist":
                            json = msg.GetMessageList(dic);
                            break;
                        case "delmessage":
                            json = msg.DelMessage(dic);
                            break;
                        case "markmessage":
                            json = msg.MarkMessage(dic);
                            break;
                        #endregion

                        #region 邀请
                        case "getinvitelist"://获取邀请类别
                            json = msg.GetInviteList(dic);
                            break;
                        //case "acceptinvite"://接受邀请
                        //    json = msg.AcceptInvite(dic);
                        //    break;
                        case "acceptfriendinvite"://统计
                            json = msg.AssentFriendInvite(dic);
                            break;
                        case "refuseinvite"://忽略邀请
                            json = msg.NeglectInvite(dic);
                            break;

                        #endregion

                        #endregion

                        #region 发件箱

                        #region 信息
                        case "getsendmessagelist":
                            json = msg.GetSendMessageList(dic);
                            break;
                        case "delsendmessage":
                            json = msg.DelSendMessage(dic);
                            break;
                        case "marksendmessage":
                            json = msg.MarkSendMessage(dic);
                            break;
                        #endregion

                        #region 邀请
                        case "getsendinvitelist"://获取邀请类别
                            json = msg.GetSendInviteList(dic);
                            break;
                        case "sendinviteagain"://重新发送邀请
                            json = msg.SendInviteAgain(dic);
                            break;
                        case "delsendinvite"://删除邀请
                            json = msg.DelSendInvite(dic);
                            break;

                        #endregion

                        #region 好友邀请
                        case "sendpersonalinvite":
                            /// <summary>
                            /// 发送好友邀请
                            /// </summary>
                            /// <param name="dic">string personid(一个或者多个,用逗号分开)</param>
                            /// <returns></returns>
                            json = msg.SendPersonalInvite(dic);
                            break;
                        case "assentfriendinvite":
                            /// <summary>
                            /// 同意好友邀请
                            /// </summary>
                            /// <param name="dic">string id(邀请那条信息的id),string class_id(好友分组id)</param>
                            /// <returns></returns>
                            json = msg.AssentFriendInvite(dic);
                            break;
                        #endregion

                        #endregion

                        #region 浏览信息
                        case "getmsglistbyid"://获取消息列表
                            json = msg.GetDetailedMessageList(dic);
                            break;
                        case "replymsg"://回复
                            json = msg.ReplyMessage(dic);
                            break;
                        case "getdetailmsgbyid"://获取完整信息
                            json = msg.GetDetailedMessage(dic);
                            break;
                        #endregion

                        #region 垃圾箱

                        #region 信息
                        case "getrubbishmessagelist"://获取垃圾箱信息
                            json = msg.GetRubbishMessage(dic);
                            break;
                        case "markrubbishmessage"://标记垃圾箱信息
                            json = msg.MarkRubbishMessage(dic);
                            break;
                        case "delrubbishmessage"://彻底删除
                            json = msg.QuiteDeleteRubbishMessage(dic);
                            break;
                        case "revertrubbishmessage"://还原信息
                            json = msg.RevertRubbishMessage(dic);
                            break;
                        case "clearrubbishmessage"://情况垃圾箱
                            json = msg.ClearRubbishMessage();
                            break;
                        #endregion

                        #region 邀请
                        case "getrubbishinveitelist"://获取垃圾箱邀请
                            json = msg.GetRubbishInvite(dic);
                            break;
                        case "revertrubbishinvite"://还原邀请
                            json = msg.RevertRubbishInvite(dic);
                            break;
                        case "delrubbishinvite":
                            json = msg.QuiteDeleteRubbishInvite(dic);
                            break;
                        case "clearrubbishinvite":
                            json = msg.ClearRubbishInvite();
                            break;
                        #endregion

                        #endregion

                        #region 草稿箱
                        case "getdraftmessagelist"://获取草稿箱列表
                            json = msg.GetDraftMessageList(dic);
                            break;
                        case "markdraftmessage"://标记草稿箱信息
                            json = msg.MarkDraftMessage(dic);
                            break;
                        case "deldraftmesssage"://删除草稿箱信息
                            json = msg.DelDraftMessage(dic);
                            break;
                        case "getatuosavemsg"://获取草稿信息
                            json = msg.GetSystemDrafeMessage();
                            break;
                        #endregion

                        #region 公共
                        case "searchfriendsbyname"://    params: string receivePerson,string content
                            json = msg.GetPersonalFriendsByName(dic);
                            break;
                        #endregion

                        default:
                            break;
                    }
                }
            }
            context.Response.Write(json);
        }
        #endregion
    }
}