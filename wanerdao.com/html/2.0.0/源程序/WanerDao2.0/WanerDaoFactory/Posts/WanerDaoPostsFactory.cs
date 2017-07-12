using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.SessionState;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoIBLL;
using WanerDao2.WanerDaoBLL.Posts;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModel.Post;
using WanerDao2.WanerDaoIBLL.IPosts;
using WanerDao2.WanerDaoModule.Utils;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoBLL.Person;
using WanerDao2.WanerDaoModule.TipInfo;

namespace WanerDao2.WanerDaoBLLFactory.Posts
{
    public class WanerDaoPostsFactory : IHttpHandler, IRequiresSessionState
    {
        /// <summary>
        /// 您将需要在您网站的 web.config 文件中配置此处理程序，
        /// 并向 IIS 注册此处理程序，然后才能进行使用。有关详细信息，
        /// 请参见下面的链接: http://go.microsoft.com/?linkid=8101007
        /// </summary>
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
                context.Response.Write(json);
            }
            else
            {
                IWanerDaoPosts posts = new WanerDaoPosts();
                IWanerDaoTopicCategory topicCategory=new WanerDaoTopicCategory();
                IWanerDaoPersonalViewRecord viewRecord = new WanerDaoPersonalViewRecord();
                if (posts == null)
                {
                    json = WanerDaoJSON.GetErrorJson("没有对应类型处理!");
                }
                else
                {
                    PersonalSecurityProfileModel personalSecurity = CommonContext.GetUserSecurityInfo();

                    Dictionary<string, object> dic = WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());
                    string newsId = "";
                    string where = "";
                    int pageSize = 0;
                    int pageCurrent = 0;
                    string content = "";
                    string subject = "";
                    string userId = personalSecurity.user_id;
                    string languageId = CommonContext.GetClientLanguage();
                    DateTime postDateTime = DateTime.Now;
                    switch (typestr)
                    {
                        case "getpostnext":
                            postDateTime = Convert.ToDateTime(dic["postDateTime"]);
                            json = posts.GetPostNext(postDateTime);
                            break;
                        case "getpostprev":
                            postDateTime = Convert.ToDateTime(dic["postDateTime"]);
                            json = posts.GetPostPrev(postDateTime);
                            break;
                        case "readpost":
                            PersonalViewRecordModel recordModel = new PersonalViewRecordModel();
                            recordModel.source_id = dic["postId"].ToString();
                            recordModel.user_id = userId;
                            recordModel.source_type_id = "4";//杂烩类型的来源id
                            json = viewRecord.CreateViewRecord(recordModel);
                            break;
                        case "commentpost":
                            PostsCommentsModel comment = new PostsCommentsModel();
                            content=dic["content"].ToString();
                            string followId = "0";
                            followId = dic["followId"].ToString();
                            comment.follow_id = followId;
                            comment.content = content;
                            comment.news_id = dic["newsId"].ToString();
                            comment.user_id = userId;
                            json = posts.CommentPost(comment);
                            break;
                        case "getpostcommentsbynewsid":
                            pageSize = Convert.ToInt32(dic["pageSize"]);
                            pageCurrent = Convert.ToInt32(dic["pageCurrent"]);
                            newsId = dic["newsId"].ToString();
                            where = "pc.active=true and pc.news_id='" + newsId + "'";
                            json = posts.GetPostsComments(pageCurrent, pageSize, where);
                            break;
                        case "getpostcommentcountbynewsid":
                            newsId = dic["newsId"].ToString();
                            json = posts.GetPostsCommentsCount(newsId);
                            break;
                        case "getpostcountsincetime":
                            DateTime time = Convert.ToDateTime(dic["time"]);
                            json = posts.GetPostCountSinceTime(time);
                            break;
                        case "getservertime":
                            Dictionary<string,object> param=new Dictionary<string,object>();
                            param["now"]=DateTime.Now;
                            json = WanerDaoJSON.GetSuccessJson(param);
                            break;
                        case "getposttodaycount":
                            json = posts.GetPostTodayCount();
                            break;
                        case "getpostallcount":
                            json = posts.GetPostAllCount();
                            break;
                        case "getposts":
                            pageSize = Convert.ToInt32(dic["pageSize"]);
                            pageCurrent = Convert.ToInt32(dic["pageCurrent"]);
                            subject = dic["subject"].ToString();
                            content = dic["content"].ToString();
                            string categoryIds = dic["categoryIds"].ToString();

                            where = "p.page_language_id='" + languageId + "' and p.active=true";

                            if (!string.IsNullOrEmpty(subject))
                            {
                                where += " and p.subject like '%" + subject + "%'";
                            }

                            if (!string.IsNullOrEmpty(content))
                            {
                                where += " and p.content like '%" + content + "%'";
                            }

                            if (!string.IsNullOrEmpty(categoryIds))
                            {
                                string[] ids = categoryIds.Split(',');
                                where += " and ({0})";
                                string categoryWhere = "";
                                foreach (string id in ids)
                                {
                                    categoryWhere += "category_id='" + id + "' or ";
                                }
                                categoryWhere = categoryWhere.Substring(0, categoryWhere.Length - 3);
                                where = string.Format(where, categoryWhere);
                            }
                            json = posts.GetPosts(pageCurrent, pageSize, where);
                            break;
                        case "getpostsbyid":
                            json = posts.GetPostById(dic["id"].ToString());
                            break;
                        //case "getnewposts":
                        //    json = posts.GetNewPosts(Convert.ToInt32(dic["sort_id"]), Convert.ToInt32(dic["size"]));
                        //    break;
                        //case "getpostscountafterposttime"://获取指定时间之后的杂烩数
                        //    json = posts.GetPostsCountAfterPostTime(Convert.ToDateTime(dic["post_datetime"])).ToString();
                        //    break;
                        //case "gettopiccategorybyparentid":
                        //    json = topicCategory.GetTopicCategoryByParentId(dic["parent_id"].ToString());
                        //    break;
                        case "getalltopiccategory":
                            json = topicCategory.GetAllTopicCategory();
                            break;
                        case "createpost":
                            PostsModel post = new PostsModel() { category_id = dic["category_id"].ToString(), is_anonymity = Convert.ToBoolean(dic["is_anonymity"]), content = dic["content"].ToString(), post_id = userId, subject = dic["subject"].ToString() };
                            json = posts.CreatePost(post);
                            break;
                        case "createpostdraft":
                            PersonalPostsDraftModel draftModel = new PersonalPostsDraftModel();
                            string draftContent = dic["content"].ToString();
                            string draftTitle = dic["title"].ToString();
                            bool isSystem = Convert.ToBoolean(dic["isSystem"]);
                            draftModel.user_id = userId;
                            draftModel.content = draftContent;
                            draftModel.title = draftTitle;
                            draftModel.is_system = isSystem;
                            json = posts.SavePostDraft(draftModel);
                            break;
                        default:
                            json = WanerDaoJSON.GetErrorJson("没有对应类型处理!");
                            break;
                    }
                }
            }
            context.Response.Write(json);


        }
        #endregion
        #region 私有函数
        /// <summary>
        /// 描述:构造分页查询参数
        /// </summary>
        /// <param name="_tablename">表名</param>
        /// <param name="_fldname">查询字段，如果是多个字段请用英文的“,”分隔</param>
        /// <param name="_where">where WHERE条件(不用传入WHERE关键字,可为空)</param>
        /// <param name="_fldSortId">排序条件(不用传入ORDER BY关键字,可为空)</param>
        /// <param name="_sort">0升序 1倒序</param>
        /// <param name="dic"></param>
        private void GetPaginationParams(string _tablename, string _fldname, string _where, string _fldSortId, string _sort, ref Dictionary<string, object> dic)
        {
            dic.Add("tablename", _tablename);
            dic.Add("fldName", _fldname);
            dic.Add("where", _where);
            dic.Add("fldSortId", _fldSortId);
            dic.Add("sort", _sort);
        }
        #endregion
    }
}
