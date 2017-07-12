using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL;
using WanerDao2.WanerDaoModel.Post;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoCacheManager;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoBLL.Person;
using WanerDao2.WanerDaoIBLL.IPerson;
using System.Data;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoBLL.Common;
using WanerDao2.WanerDaoIBLL.ICommon;

namespace WanerDao2.WanerDaoBLL.Posts
{
    public class WanerDaoPosts :IWanerDaoPosts
    {
        #region 构造函数
        public WanerDaoPosts()
        {
            common = new WanerdaoCommon();
            p_cache = WanerDaoCacheFactory.SingleInstance().GetStrategy(0);
            p_viewRecord = new WanerDaoPersonalViewRecord();
            p_blog = new WanerDaoBlogManager();
        }
        #endregion

        #region 私有变量
        private IWanerDaoCommon common;
        private readonly string c_postsCacheKey = "WanerDaoPosts_";
       // private readonly string c_commentsCacheKey = "WanerDaoPostsComments_";
       // private readonly string c_draftCacheKey = "WanerDaoPostsDraft_";
       // private readonly string c_followCacheKey = "WanerDaoPostsFollow_";
        private const int ERROR = -1;
        private ICacheStrategy p_cache;
        private IWanerDaoPersonalViewRecord p_viewRecord;
        private IWanerDaoBlogManager p_blog;
        #endregion

        #region 私有函数
        private string Message(string message, MessageType msgtype)
        {
            if (msgtype == MessageType.success)
            {
                return WanerDaoJSON.GetSuccessJson(message);
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(message);
            }
        }
        private string Message(Dictionary<string, object> prepareJson, string message, MessageType msgtype)
        {
            prepareJson.Add("msg", message);
            if (msgtype == MessageType.success)
            {
                return WanerDaoJSON.GetSuccessJson(prepareJson);
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(message);
            }
        }
        enum MessageType
        {
            success,
            error
        }
        #endregion

        #region IWanerDaoPosts接口的实现

        #region 杂烩的增删改查

        public string GetPostNext(DateTime postDateTime)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("post_datetime", postDateTime);
            param.Add("language_id", CommonContext.GetClientLanguage());
            string result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetPostNext", param);
            return result;
        }
        public string GetPostPrev(DateTime postDateTime)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("post_datetime", postDateTime);
            param.Add("language_id", CommonContext.GetClientLanguage());
            string result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetPostPrev", param);
            return result;
        }

        public string GetPostTodayCount()
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("time", DateTime.Now.Date);
            param.Add("language_id", CommonContext.GetClientLanguage());
            string result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetPostCountSinceTime", param);
            return result;
        }
        public string GetPostCountSinceTime(DateTime time)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("language_id", CommonContext.GetClientLanguage());
            param.Add("time", time);
            string result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetPostCountSinceTime", param);
            return result;
        }
        public string GetPostAllCount() 
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("language_id", CommonContext.GetClientLanguage());
            string result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetPostAllCount");
            return result;
        }
        public string GetPosts(int pageCurrent, int pageSize, string where)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("tableName", "posts p INNER JOIN topiccategory tc on (p.category_id=tc.id and tc.active=true and tc.language_id=p.page_language_id) INNER JOIN personalprofile pp on (p.post_id=pp.user_id and pp.active=true) LEFT JOIN personalviewrecord pvr on (pvr.user_id=pp.user_id and pvr.source_id=p.id and pvr.active=TRUE)");
            param.Add("fldName", "p.*,tc.category_name,pp.`name`,pp.logo_small_path,pvr.is_read");
            param.Add("where", string.Format(" and {0} ", where));
            param.Add("fldSortId", "p.post_datetime");
            param.Add("sort", 0);
            param.Add("pageCurrent", pageCurrent);
            param.Add("pageSize", pageSize);
            string result = common.WanerDaoPagination(param);
            return result;
        }

        public string CreatePost(PostsModel post)
        {
            post.id = WanerDaoGuid.GetDefaultGuid();
            post.counter = 0;
            post.post_datetime = DateTime.Now;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PostsSQL", "CreatePost", post);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("AddSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("AddFailInfo"), MessageType.error);
            }
        }

        public string DeletePost(string id)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("id", id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PostsSQL", "DeletePost", param);
            if (result >= 0)
            {
                p_cache.RemoveObject(c_postsCacheKey + id);
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("DelSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("DelFailInfo"), MessageType.error);
            }
        }

        public string GetPostById(string id)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("id", id);
            string result = string.Empty;
            //string key = c_postsCacheKey + id;
            //object cache = p_cache.RetrieveObject(key);
            //if (cache != null)
            //{
            //    result = (String)cache;
            //}
            //else
            //{
            //    result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetPostById", param);
            //    if (!string.IsNullOrEmpty(result))
            //    {
            //        p_cache.AddObject(key, result, 1200);
            //    }
            //}
            result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetPostById", param);
            return result;
        }

        //public int GetPostsCountAfterPostTime(DateTime postDateTime) 
        //{
        //    Dictionary<string, object> param = new Dictionary<string, object>();
        //    param.Add("post_datetime", postDateTime);
        //    param.Add("language_id", CommonContext.GetClientLanguage());
        //    DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("PostsSQL", "GetPostsCountAfterPostTime", param);
        //    DataTable dt = ds.Tables["WanerDao2Ds"];
        //    int count = Convert.ToInt32(dt.Rows[0]["count"]);
        //    return count;
        //}

        //public string GetNewPosts(int sortId, int size) 
        //{
        //    Dictionary<string,object> param=new Dictionary<string,object>();
        //    param.Add("sort_id",sortId);
        //    param.Add("size",size);

        //    param.Add("language_id", CommonContext.GetClientLanguage());
        //    string result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetNewPosts", param);
        //    return result;
        //}
        public string UpdatePost(PostsModel post)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PostsSQL", "UpdatePost", post);
            if (result >= 0)
            {
                p_cache.RemoveObject(c_postsCacheKey + post.id);
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfo"), MessageType.error);
            }
        }

        public string UpdatePersonalPostsFollowDuration(string id, bool isEmail, int emailDuration)
        {
            int durationTemp = emailDuration;
            if (!isEmail)
            {
                durationTemp = -1;
            }
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("id", id);
            param.Add("is_email", isEmail);
            param.Add("email_duration", durationTemp);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("FollowSQL", "UpdatePersonalPostFollowDuration", param);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfo"), MessageType.error);
            }
        }
        #endregion

        #region 杂烩阅读状态
        public string ReadPost(PersonalViewRecordModel viewRecord)
        {
            //设置阅读状态为已读
            viewRecord.is_read = true;

            viewRecord.rec_date = DateTime.Now;

            //设置为杂烩类型
            viewRecord.source_type_id = "1";

            string result = string.Empty;
            if (!p_viewRecord.HasViewRecord(viewRecord.user_id, viewRecord.source_type_id, viewRecord.source_id))
            {
                result = p_viewRecord.CreateViewRecord(viewRecord);
            }
            else
            {
                result = Message(WanerDaoGlobalTip.GetInternationalizationTip("ViewRecordExitInfo"), MessageType.error);
            }
            return result;
        }
        #endregion

        #region 杂烩关注
        public bool HasPostFollow(string attentionId, string userId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("attention_id", attentionId);
            param.Add("user_id", userId);
            bool result = false;
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("PostsSQL", "HasPostFollow", param);
            DataTable dt = ds.Tables["WanerDao2Ds"];
            int count = Convert.ToInt32(dt.Rows[0]["count"]);
            result = count > 0 ? true : false;
            return result;
        }

        public string FollowPost(PersonalPostsFollowModel postsFollow)
        {
            int result = ERROR;
            string msg = string.Empty;
            if (!HasPostFollow(postsFollow.attention_id,postsFollow.user_id))
            {
                postsFollow.id = WanerDaoGuid.GetGuid();
                postsFollow.attention_datetime = DateTime.Now;
                result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PostsSQL", "FollowPost", postsFollow);

                if (result >= 0)
                {
                    msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowSuccessInfo"), MessageType.success);
                }
                else
                {
                    msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowFailInfo"), MessageType.error);
                }
            }
            else
            {
                msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowPostExitInfo"), MessageType.error);
            }
            return msg;
        }

        public string UnFollowPost(string userId,string attentionId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", userId);
            param.Add("attention_id", attentionId);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PostsSQL", "UnFollowPost", param);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowFailInfo"), MessageType.error);
            }
        }

        public string UnFollowPost(string id)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("id", id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PostsSQL", "CancelPersonalPostsFollow", param);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowFailInfo"), MessageType.error);
            }
        }

        public string GetPersonalPostsFollow(int pageCurrent, int pageSize, string where)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("tableName", "personalpostsfollow ppf INNER JOIN posts p on ppf.attention_id=p.id INNER JOIN personalprofile pp on p.post_id=pp.user_id INNER JOIN topiccategory tc on p.category_id=tc.id");
            param.Add("fldName", "ppf.*,p.counter,p.`subject`,tc.category_name,pp.`name`,p.post_datetime");
            param.Add("where", string.Format(" and {0} ", where));
            param.Add("fldSortId", "ppf.attention_datetime");
            param.Add("sort", 1);
            param.Add("pageCurrent", pageCurrent);
            param.Add("pageSize", pageSize);
            string result = common.WanerDaoPagination(param);
            return result;
        }
        #endregion

        #region 杂烩评论回复
        public string CommentPost(PostsCommentsModel comment)
        {
            comment.id = WanerDaoGuid.GetGuid();
            comment.comments_date = DateTime.Now;
            bool positive = bool.Parse(comment.positive.ToString());
            bool negative=bool.Parse(comment.negative.ToString());
            if (!(positive ^ negative))
            {
                positive = true;
                negative = false;

            }
            comment.positive = positive;
            comment.negative = negative;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PostsSQL", "CreatePostComment", comment);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("CommentSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("CommentFailInfo"), MessageType.error);
            }
        }


        public string GetPostsCommentsCount(string newsId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("news_id", newsId);
            string result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetPostCommentCountByNewsId", param);
            return result;
        }

        public string GetPostsCommentsCount(string newsId, string followId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("news_id", newsId);
            param.Add("follow_id", followId);
            string result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetPostCommentCountByFollowIdAndNewsId", param);
            return result;
        }

        public string GetPostsComments(int pageCurrent, int pageSize, string where)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("tableName", "postscomments pc INNER JOIN personalprofile pp on (pc.user_id=pp.user_id and pp.active=true)");
            param.Add("fldName", "pp.`name`,pp.logo_small_path,pc.*");
            param.Add("where", string.Format(" and {0} ", where));
            param.Add("fldSortId", "comments_date");
            param.Add("sort", 0);
            param.Add("pageCurrent", pageCurrent);
            param.Add("pageSize", pageSize);
            string result = common.WanerDaoPagination(param);
            return result;
        }
        #endregion

        #region 分享杂烩
        public string SharePostToBlog(PostsModel post)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("cid", post.category_id);
            param.Add("neirong", post.content);
            param.Add("tianqi", "");
            param.Add("weizhi", "");
            param.Add("cname", "");
            param.Add("activeid", "");
            param.Add("groupid", "");
            param.Add("infoid","");
            param.Add("quanxian", p_blog.GetDefultPermission());
            return p_blog.AddPersonalBlog(param);
        }

        public string SharePostToActivity(PostsModel post)
        {
            throw new NotImplementedException();
        }

        public string SharePostToCircle(PostsModel post)
        {
            throw new NotImplementedException();
        }

        public string SharePostToInfo(PostsModel post)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region 杂烩草稿
        public string SavePostDraft(PersonalPostsDraftModel draft)
        {
            string msg = string.Empty;
            if (!HasPostDraft(draft.user_id))
            {
                msg = CreatePostDraft(draft);
            }
            else
            {
                msg = UpdatePostDraft(draft);
            }
            return msg;
        }
        private string CreatePostDraft(PersonalPostsDraftModel draft)
        {
            string msg = string.Empty;
            draft.id = WanerDaoGuid.GetGuid();
            draft.save_date = DateTime.Now;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PostsSQL", "CreatePostDraft", draft);
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("updateTime", draft.save_date);
            if (result >= 0)
            {
                msg = Message(param, WanerDaoGlobalTip.GetInternationalizationTip("AddSuccessInfo"), MessageType.success);
            }
            else
            {
                msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("AddFailInfo"), MessageType.error);
            }
            return msg;
        }
        private string UpdatePostDraft(PersonalPostsDraftModel draft)
        {
            string msg = string.Empty;
            draft.save_date = DateTime.Now;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PostsSQL", "UpdatePostDraft", draft);
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("updateTime", draft.save_date);
            if (result >= 0)
            {
                msg = Message(param, WanerDaoGlobalTip.GetInternationalizationTip("UpdateSuccessInfo"), MessageType.success);
            }
            else
            {
                msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfo"), MessageType.error);
            }
            return msg;
        }
        private bool HasPostDraft(string userId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_Id", userId);
            bool result = false;
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("PostsSQL", "HasPostDraft", param);
            DataTable dt = ds.Tables["WanerDao2Ds"];
            int count = Convert.ToInt32(dt.Rows[0]["count"]);
            result = count > 0 ? true : false;
            return result;
        }
        #endregion

        #endregion

    }
}
