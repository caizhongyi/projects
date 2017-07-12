#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：xux   时间：2012/1/3
* 文件名：WanerDaoGroupFactory 
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
using WanerDao2.WanerDaoComponent;
using WanerDao2.WanerDaoIBLL.IFollow;
using WanerDao2.WanerDaoBLL.Follow;
using WanerDao2.WanerDaoIBLL;
using WanerDao2.WanerDaoBLL.Posts;
using WanerDao2.WanerDaoModel.Follow;
using WanerDao2.WanerDaoModel.Post;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoModule.TipInfo;

namespace WanerDao2.WanerDaoBLLFactory.Follow
{
    public class WanerDaoFollowFactory : IHttpHandler, IRequiresSessionState
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
                PersonalSecurityProfileModel personalSecurity = CommonContext.GetUserSecurityInfo();
                
                IWanerDaoPersonalActivityFollow paFollow = new WanerDaoPersonalActivityFollow();
                IWanerDaoPersonalGroupFollow pgFollow = new WanerDaoPersonalGroupFollow();
                IWanerDaoPersonalFriendsFollow pfFollow = new WanerDaoPersonalFriendsFollow();
                IWanerDaoPosts pFollow = new WanerDaoPosts();
                IWanerDaoPersonalModuleFollow pmFollow = new WanerDaoActivityModuleFollow();
                int pageSize = 0;
                int pageCurrent = 0;
                string where = "";
                string id = "";
                string userId = personalSecurity.user_id;

                //string userId = "563af18a102648abba48bbf1e7a7000d";
                string attentionId = "";
                string friendName = "";
                string followName = "";

                bool isEmail = false;
                int emailDuration = -1;

                Dictionary<string, object> dic = WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());
                switch (typestr)
                {
                    #region 个人活动关注

                    case "updatepersonalactivityfollowduration":
                        id = dic["id"].ToString();
                        isEmail = Convert.ToBoolean(dic["isEmail"]);
                        emailDuration = Convert.ToInt32(dic["emailDuration"]);
                        json = paFollow.UpdatePersonalActivityFollowDuration(id, isEmail, emailDuration);
                        break;
                    case "getpersonalactivityfollow"://    params: string receivePerson,string content
                        pageSize = Convert.ToInt32(dic["pageSize"]);
                        //pageCurrent = Convert.ToInt32(dic["pageCurrent"]);
                        pageCurrent = Convert.ToInt32(dic["pagecurrent"]);
                        string activityTitle = dic["activityTitle"].ToString();
                        where = "paf.active=true and paf.user_id='" + userId + "' and a.active=true and ac.active=true and acs.active=true ";
                        if (!string.IsNullOrEmpty(activityTitle))
                        {
                            where += " and a.activity_name like '%" + activityTitle + "%' ";
                        }
                        json = paFollow.GetPersonalActivityFollow(pageCurrent, pageSize, where);
                        break;
                    case "cancelpersonalactivityfollow"://取消活动关注，必须传入string activityId（活动主键）
                        if (dic.ContainsKey("activityId"))
                            json = paFollow.CancelPersonalActivityFollow(userId, dic["activityId"].ToString());
                        else
                            json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("paramError"));
                        break;
                    case "haspersonalactivityfollow"://是否关注活动，必须传入string activityId（活动主键）
                        if (dic.ContainsKey("activityId"))
                            json = WanerDaoJSON.GetSuccessJson(paFollow.HasPersonalActivityFollow(userId, dic["activityId"].ToString()));
                        else
                            json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("paramError"));
                        break;
                    case "followactivity"://关注活动，必须传入所关注的活动主键activityId
                        if (dic.ContainsKey("activityId"))
                        {
                            PersonalActivityFollowModel pafModel = new PersonalActivityFollowModel();
                            pafModel.user_id = personalSecurity.user_id;
                            pafModel.attention_id = dic["activityId"].ToString();
                            json = paFollow.CreatePersonalActivityFollow(pafModel);
                        }
                        else
                            json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("paramError"));
                        break;
                    case "getactivityfollowcountbyactivityid"://获取关注活动总数，必须传入活动主键activityId
                        string activityId = dic["activityId"].ToString();
                        json = paFollow.GetPersonalActivityFollowCount(activityId);
                        break;
                    #endregion

                    #region 个人圈子关注

                    case "updatepersonalgroupfollowduration":
                        id = dic["id"].ToString();
                        isEmail = Convert.ToBoolean(dic["isEmail"]);
                        emailDuration = Convert.ToInt32(dic["emailDuration"]);
                        json = pgFollow.UpdatePersonalGroupFollowDuration(id, isEmail, emailDuration);
                        break;
                    case "getpersonalgroupfollow":
                        pageSize = Convert.ToInt32(dic["pageSize"]);
                        //pageCurrent = Convert.ToInt32(dic["pageCurrent"]);
                        pageCurrent = Convert.ToInt32(dic["pagecurrent"]);
                        string groupName = dic["groupName"].ToString();

                        where = "pgf.active=TRUE and pgf.user_id='" + userId + "' and gi.active=TRUE and gc.active=TRUE ";
                        if (!string.IsNullOrEmpty(groupName))
                        {
                            where += " and gi.group_name like '%" + groupName + "%' ";
                        }
                        json = pgFollow.GetPersonalGroupFollow(pageCurrent, pageSize, where);
                        break;
                    case "cancelpersonalgroupfollow":
                        if (dic.ContainsKey("groupId"))
                            json = pgFollow.CancelPersonalGroupFollow(userId, dic["groupId"].ToString());
                        else
                            json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("paramError"));
                        break;
                    #endregion

                    #region 个人好友关注

                    case "updatepersonalfriendsfollowduration":
                        id = dic["id"].ToString();
                        isEmail = Convert.ToBoolean(dic["isEmail"]);
                        emailDuration = Convert.ToInt32(dic["emailDuration"]);
                        json = pfFollow.UpdatePersonalFriendsFollowDuration(id, isEmail, emailDuration);
                        break;
                    case "getpersonalfriendsfollow":
                        pageSize = Convert.ToInt32(dic["pageSize"]);
                        //pageCurrent = Convert.ToInt32(dic["pageCurrent"]);
                        pageCurrent = Convert.ToInt32(dic["pagecurrent"]);
                        friendName = dic["friendName"].ToString();

                        where = "pff.active=TRUE and pff.user_id='" + userId + "' and pp.active=TRUE ";
                        if (!string.IsNullOrEmpty(friendName))
                        {
                            where += " and (pp.name like '%" + friendName + "%' or pp.second_name like '%" + friendName + "%')";
                        }
                        json = pfFollow.GetPersonalFriendsFollow(pageCurrent, pageSize, where);
                        break;
                    case "cancelpersonalfriendsfollow":
                        if (dic.ContainsKey("friendId"))
                            json = pfFollow.CancelPersonalFriendsFollow(userId, dic["friendId"].ToString());
                        else
                            json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("paramError"));
                        break;

                    case "haspersonalfriendsfollow":
                        string friendId = dic["friendId"].ToString();
                        bool result = pfFollow.HasPersonalFriendsFollow(userId, friendId);
                        Dictionary<string, object> param = new Dictionary<string, object>();
                        param.Add("hasFollow", result);
                        json = WanerDaoJSON.GetSuccessJson(param);
                        break;
                    #endregion

                    #region 个人杂烩关注
                    case "createpersonalpostsfollow":
                        PersonalPostsFollowModel postFollowModel = new PersonalPostsFollowModel();
                        attentionId = dic["attentionId"].ToString();
                        postFollowModel.user_id = userId;
                        postFollowModel.attention_id = attentionId;
                        postFollowModel.email_duration = 0;
                        postFollowModel.is_email = false;
                        json = pFollow.FollowPost(postFollowModel);
                        break;
                    case "getpersonalpostsfollow":
                        pageSize = Convert.ToInt32(dic["pageSize"]);
                        pageCurrent = Convert.ToInt32(dic["pageCurrent"]);
                        string subject = dic["subject"].ToString();

                        where = "ppf.active=TRUE and ppf.user_id='" + userId + "' and pp.active=TRUE and p.active=TRUE and tc.active=TRUE ";
                        if (!string.IsNullOrEmpty(subject))
                        {
                            where += " and p.`subject` like '%" + subject + "%'";
                        }
                        json = pFollow.GetPersonalPostsFollow(pageCurrent, pageSize, where);
                        break;
                    case "cancelpersonalpostsfollow":
                        id = dic["id"].ToString();
                        json = pFollow.UnFollowPost(id);
                        break;
                    case "updatepersonalpostfollowduration":
                        id = dic["id"].ToString();
                        isEmail = Convert.ToBoolean(dic["isEmail"]);
                        emailDuration = Convert.ToInt32(dic["emailDuration"]);
                        json = pFollow.UpdatePersonalPostsFollowDuration(id, isEmail, emailDuration);
                        break;
                    #endregion

                    #region 个人被关注
                    case "getpersonalmyselffollow":
                        pageSize = Convert.ToInt32(dic["pageSize"]);
                        pageCurrent = Convert.ToInt32(dic["pagecurrent"]);
                        followName = dic["followName"].ToString();
                        where = "pff.active=TRUE and pp.active=TRUE and pff.attention_id='" + userId + "'";
                        if (!string.IsNullOrEmpty(followName))
                        {
                            where += " and (pp.name like '%" + followName + "%' or pp.second_name like '%" + followName + "%')";
                        }
                        json = pfFollow.GetPersonalMyselfFollow(pageCurrent, pageSize, where);
                        break;
                    case "cancelpersonalmyselffollow":
                        if (dic.ContainsKey("friendId"))
                            json = pfFollow.CancelPersonalFriendsFollow(dic["friendId"].ToString(), userId);
                        else
                            json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("paramError"));
                            break;
                    case "createpersonalmyselffollow":
                        PersonalFriendsFollowModel model = new PersonalFriendsFollowModel();
                        attentionId = dic["attentionId"].ToString();
                        model.user_id = userId;
                        model.attention_id = attentionId;
                        model.email_duration = 0;
                        model.is_email = false;
                        json = pfFollow.CreatePersonalFriendsFollow(model);
                        break;
                    #endregion

                    #region 个人模块关注

                    case "updatepersonalmodulefollowduration":
                        id = dic["id"].ToString();
                        isEmail = Convert.ToBoolean(dic["isEmail"]);
                        emailDuration = Convert.ToInt32(dic["emailDuration"]);
                        json = pmFollow.UpdatePersonalModuleFollowDuration(id, isEmail, emailDuration);
                        break;
                    case "cancelpersonalmodulefollow":
                        id = dic["id"].ToString();
                        json = pmFollow.CancelPersonalModuleFollow(userId, id);
                        break;
                    #endregion

                    #region 活动模块关注
                    case "updateactivitymodulefollowduration":
                        id = dic["id"].ToString();
                        isEmail = Convert.ToBoolean(dic["isEmail"]);
                        emailDuration = Convert.ToInt32(dic["emailDuration"]);
                        json = pmFollow.UpdatePersonalModuleFollowDuration(id, isEmail, emailDuration);
                        break;
                    case "cancelactivitymodulefollow"://取消活动模块关注，必须传入string moduleId（活动模块主键）
                        string sectionId = string.Empty;
                        if (dic.ContainsKey("moduleId"))
                            json = pmFollow.CancelPersonalModuleFollow(userId, dic["moduleId"].ToString());
                        else
                            json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("paramError"));
                        break;
                    case "hasactivitymodulefollow"://判断是否关注活动模块，必须传入string moduleId（活动模块主键）
                        if(dic.ContainsKey("moduleId"))
                            json = WanerDaoJSON.GetSuccessJson(pmFollow.HasPersonalModuleFollow(userId, dic["moduleId"].ToString()));
                        else
                            json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("paramError"));
                        break;
                    case "followactivitymodule"://关注活动模块，必须传入需关注的活动大分类activitysection主键moduleId
                        if (dic.ContainsKey("moduleId"))
                        {
                            PersonalModuleFollowModel pmfModel = new PersonalModuleFollowModel();
                            pmfModel.attention_id = dic["moduleId"].ToString();
                            pmfModel.user_id = userId;
                            json = pmFollow.CreatePersonalModuleFollow(pmfModel);
                        }
                        else
                            json = WanerDaoJSON.GetErrorJson(WanerDaoGlobalTip.GetInternationalizationTip("paramError"));
                        break;
                    case "getactivitymodulecountbymoduleid"://获取活动分类总数，必须传入需关注的活动大分类activitysectionpage主键moduleId
                        json = pmFollow.GetPersonalModuleFollowCount(dic["moduleId"].ToString());
                        break;
                    case "getactivitymodulefollows"://获取活动分类关注分页，必须传入当前页数pagecurrent，每页条数pagesize
                        pageSize = 0;
                        pageCurrent = 0;
                        if (dic.ContainsKey("pagecurrent"))
                            Int32.TryParse(dic["pagecurrent"].ToString(), out pageCurrent);
                        if (dic.ContainsKey("pagesize"))
                            Int32.TryParse(dic["pagesize"].ToString(), out pageSize);
                        string searchTitle = dic.ContainsKey("searchTitle") ? dic["searchTitle"].ToString() : string.Empty;
                        json = pmFollow.GetPersonalModuleFollow(pageCurrent, pageSize, userId, searchTitle);
                        break;
                    #endregion

                    default:
                        break;

                }
            }
            context.Response.Write(json);
        }
        #endregion
    }
}