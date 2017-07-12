#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/4/21 0:31:23 
* 文件名：WanerDaoActionStateFactory 
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
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoModule.String;
using WanerDao2.WanerDaoIBLL.IIndex;
using WanerDao2.WanerDaoBLL.Index;
using WanerDao2.WanerDaoBLL.Person;
using WanerDao2.WanerDaoIBLL.ICommon;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoModule.Config;
using System.Text.RegularExpressions;


namespace WanerDao2.WanerDaoBLLFactory.Home
{
    public class WanerDaoActionStateFactory : IHttpHandler, IRequiresSessionState
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
                IWanerDaoActionState actionState = new WanerDaoActionState() as IWanerDaoActionState;
                IWanerDaoPersonState personState = new WanerDaoPersonState() as IWanerDaoPersonState;
                IWanerDaoCommon common = new WanerDao2.WanerDaoBLL.Common.WanerdaoCommon() as IWanerDaoCommon;
                IWanerDaoVideoManager videoMgr = new WanerDaoVideoManager() as IWanerDaoVideoManager;
                {
                    Dictionary<string, object> dic = WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());
                    switch (typestr)
                    {
                        #region 获取访问者
                        case "getvisiteduser":
                            /// <summary>
                            /// 获取访问者
                            /// </summary>
                            /// <param name="dic">string user_id,string pageIndex ,string pageSize</param>
                            /// <returns></returns>
                            json = actionState.GetVisitedUser(dic);
                            break;
                        #endregion

                        #region 可能认识的朋友
                        case "getmayknowfrieds":
                            /// <summary>
                            /// 获取可能认识的朋友 
                            /// </summary>
                            /// <param name="dic">string user_id</param>
                            /// <returns></returns>
                            json = actionState.GetMayKnowFrieds(dic);
                            break;
                        #endregion

                        #region 好友动态信息
                        case "gethtmlstateresult":
                            /// <summary>
                            /// 获取好友动态
                            /// </summary>
                            /// <param name="dic">string user_id,string pageCurrent,string pageSize,string category(new,message,group,activity,posts)
                            /// </param>
                            /// <returns></returns>
                            json = actionState.GetHTMLStateResult(dic);
                            break;
                        #endregion

                        #region 主页留言
                        case "leavemessages":
                            /// <summary>
                            /// 主页留言
                            /// </summary>
                            /// <param name="dic">string person_id,string msgcontent</param>
                            /// <returns></returns>
                            json = actionState.LeaveMessages(dic);
                            break;
                        #endregion

                        #region 回复信息
                        case "replaycomment":
                            /// <summary>
                            /// 回复
                            /// </summary>
                            /// <param name="dic">string category, string id(指的是那条记录的id),content(内容) ,followId(父贴号)</param>
                            /// <returns></returns>
                            json = actionState.ReplayComment(dic);
                            break;

                        #endregion

                        #region 全站搜索服务
                        case "getsearchresult":
                            /// <summary>
                            /// 全站搜索服务接口
                            /// </summary>
                            /// <param name="searchStr">搜索的字符串</param>
                            /// <param name="categroy">搜索类别(PERSON, GROUP,ACTIVITY,POSTS,OTHER)</param>
                            /// <param name="pageCount">每页的显示的记录数</param>
                            /// <param name="pageNum">当前页数</param>
                            /// <param name="resultCount">返回总记录条数</param>
                            /// <returns>搜索结果</returns>
                            dic.Add("language", CommonContext.GetClientLanguage());
                            json = actionState.GetSearchResult(dic);//对返回的字符串进行utf-8编码，不然jquery的ajax获取中文的大字符串会出现错误
                            break;
                        case "getsearchcount":
                            /// <summary>
                            /// 传入关键词与搜索类型，可以返回此搜索类型的结果总数
                            /// </summary>
                            /// <param name="dic">term , category
                            /// 搜索类型，单个类型包括person、group、activity、posts、other、all。多个搜索类型用逗号隔开</param>
                            /// <returns>返回为json格式数据，建议格式为{result:true,data:{person:1,group:2}}</returns>
                            dic.Add("language", CommonContext.GetClientLanguage());
                            json = actionState.GetSearchCount(dic);
                            break;
                        #endregion

                        #region 屏蔽举报
                        case "shielddynamicstate":
                            /// <summary>
                            /// 屏蔽动态（2012-9-20 徐蓓修改）
                            /// </summary>
                            /// <param name="dic">string source_type_id（主页对应的选项卡，可为new,message,group,activity,posts）,string target_user_id（被屏蔽的用户主键）</param>
                            /// <returns></returns>
                            json = actionState.ShieldDynamicState(dic);
                            break;
                        case "getshieldstatelist":
                            /// <summary>
                            /// 根据屏蔽类型查询当前登陆用户的屏蔽列表
                            /// </summary>
                            /// <param name="dic">string source_type_id（主页对应的选项卡，可为new,message,group,activity,posts）</param>
                            /// <returns></returns>
                            json = actionState.GetShieldStateList(dic);
                            break;
                        case "shielddynamicstateofdel":
                            /// <summary>
                            /// 删除屏蔽的动态（2012-9-20 徐蓓修改）
                            /// </summary>
                            /// <param name="dic">string id</param>
                            /// <returns></returns>
                            json = actionState.ShieldDynamicStateOfDel(dic);
                            break;

                        case "delshielddynstate":
                            /// <summary>
                            /// 删除屏蔽的动态（2012-9-27徐蓓添加）
                            /// </summary>
                            /// <param name="dic">string sourceType（主页对应的选项卡，可为new,message,group,activity,posts）、string targetUserId（被屏蔽用户标识）</param>
                            /// <returns></returns>
                            string sourceType = string.Empty;
                            string targetUserId = string.Empty;

                            if (dic.ContainsKey("sourceType"))
                                sourceType = dic["sourceType"].ToString();
                            else
                            {
                                json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NullParam"));
                                break;
                            }

                            if (dic.ContainsKey("targetUserId"))
                                targetUserId = dic["targetUserId"].ToString();
                            else
                            {
                                json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("NullParam"));
                                break;
                            }

                            json = actionState.ShieldDynamicStateOfDel(sourceType, targetUserId);
                            break;

                        case "dustinforeport":
                            /// <summary>
                            /// 举报
                            /// </summary>
                            /// <param name="dic">string source_type_id,target_id</param>
                            /// <returns></returns>
                            json = actionState.DustInfoReport(dic);
                            break;
                        #endregion

                        #region 个人状态
                        case "addlinkfeeds":
                            /// <summary>
                            /// 添加链接
                            /// </summary>
                            /// <param name="dic">string link,string description,string permission</param>
                            /// <returns></returns>
                            json = personState.AddLinkFeeds(dic);
                            break;
                        case "addpersonimage":
                            /// <summary>
                            /// 照片确认上传
                            ///  个人共享相册存储地址为：YYYY-MM/DD/UserID/PersonalImageFolderID/；
                            ///  活动自建相册物理存储地址为：YYYY-MM/DD/ActivityID/ActivityImageFolderID/
                            /// </summary>
                            /// <param name="dic">string albumtype(1：活动，2：个人),batchid (批次id),
                            /// pList(照片列表) , permissionId, folderId(相册编号）， addFolderName，activityId（活动编号，如果是个人相册上传为分享的活动编号，活动相册上传为活动编号)
                            /// </param>
                            /// <returns></returns>
                            json = common.AlbumPhotoSumitUpload(dic);
                            break;
                        case "shareimage":
                            string batchId = dic.ContainsKey("batchid") ? dic["batchid"].ToString() : string.Empty;
                            string pList = dic.ContainsKey("pList") ? dic["pList"].ToString() : string.Empty;
                            if (!string.IsNullOrEmpty(batchId) && !string.IsNullOrEmpty(pList))
                            {
                                json = common.ShareImage(batchId, pList);
                            }
                            else
                            {
                                json = WanerDaoJSON.GetFailJson("fail");
                            }
                            break;
                        case "addpersonalvideo":
                            /// <summary>
                            /// 更加视频代码 添加视频
                            /// </summary>
                            /// <param name="dic">string videos,string ifcreatealbum(0 or 1),string idorname，string permission</param>
                            /// <returns></returns>
                            json = videoMgr.AddPersonalVideo(dic);
                            break;
                        case "sharevideo"://共享视频。必须传入视频引用地址videoCode，可传入视频描述videoDesc。
                            string videoCode = string.Empty;
                            if (!dic.ContainsKey("videoCode"))
                            {
                                json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("paramError"));
                                break;
                            }
                            videoCode = dic["videoCode"].ToString();
                            if (string.IsNullOrEmpty(videoCode))
                            {
                                json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("paramError"));
                                break;
                            }

                            videoCode = videoCode.Replace(WanerDaoFilterReader.GetUrlAlternate("?"), "?").Replace(WanerDaoFilterReader.GetUrlAlternate("="), "=");

                            string videoDesc = dic.ContainsKey("videoDesc") ? dic["videoDesc"].ToString() : string.Empty;

                            json = videoMgr.ShareVideo(videoCode, videoDesc, CommonContext.GetUserSecurityInfo().user_id);
                            break;
                        case "replaylinkfeedscomment":
                            /// <summary>
                            /// 回复链接状态
                            /// </summary>
                            /// <param name="dic">string id,string content,string followId</param>
                            /// <returns></returns>
                            json = personState.ReplayLinkFeedsComment(dic);
                            break;
                        case "addnewfeeds":
                            /// <summary>
                            /// 添加用户状态
                            /// </summary>
                            /// <param name="dic">string coutent,string permission</param>
                            /// <returns></returns>
                            json = personState.AddNewFeeds(dic);
                            break;
                        case "replaynewfeedscomment":
                            /// <summary>
                            /// 回复用户状态
                            /// </summary>
                            /// <param name="dic">string id,string content,string comment_user_id</param>
                            /// <returns></returns>
                            json = personState.ReplayNewFeedsComment(dic);
                            break;
                        case "deletelinkfeeds":
                            /// <summary>
                            /// 删除状态
                            /// </summary>
                            /// <param name="dic">参数（linkFeedid）</param>
                            /// <returns></returns>
                            json = personState.DeleteLinkFeeds(dic);
                            break;
                        case "deletenewfeeds":
                            /// <summary>
                            /// 删除链接
                            /// </summary>
                            /// <param name="dic">参数（NewFeedsid）</param>
                            /// <returns></returns>
                            json = personState.DeleteNewFeeds(dic);
                            break;
                        #endregion

                        #region 用户退出
                        case "exit":
                            json = actionState.Exit();
                            break;
                        #endregion

                        #region 站内信息未读数量
                        case "getmessagenonreadcount":
                            json = actionState.GetMessageNonReadCount();
                            break;
                        #endregion


                    }
                }
            }
            context.Response.Write(json);
        }
        #endregion


        /// <summary>
        /// 判断是否为url
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        private bool IsUrl(string code)
        {
            return Regex.IsMatch(code, @"^([a-zA-z]+://)[^\s]*");
        }

        /// <summary>
        /// 提取url地址
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        private string ExtractUrl(string code)
        {
            string result = string.Empty;
            Regex reg = new Regex("src=(\".*\")|('.*')");
            Match match = reg.Match(code);
            result = Regex.Replace(match.Value, "src=|\"|'", string.Empty);
            return result;
        }
    }
}
