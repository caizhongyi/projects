using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Post;
using WanerDao2.WanerDaoModel.Person;

namespace WanerDao2.WanerDaoIBLL
{
    public interface IWanerDaoPosts
    {
        #region 杂烩的增删改查
        string GetPostTodayCount();
        string GetPostCountSinceTime(DateTime time);
        string GetPostAllCount();
        string GetPosts(int pageCurrent, int pageSize, string where);

        string GetPostNext(DateTime postDateTime);

        string GetPostPrev(DateTime postDateTime);

        /// <summary>
        /// 创建杂烩
        /// </summary>
        /// <param name="post">杂烩实体,需要填充post_id,post_name,is_anonymity,category_id,subject,content,page_language_id</param>
        /// <returns></returns>
        string CreatePost(PostsModel post);
        /// <summary>
        /// 删除杂烩
        /// </summary>
        /// <param name="id">杂烩主键</param>
        /// <returns></returns>
        string DeletePost(string id);
        /// <summary>
        /// 通过主键获取杂烩
        /// </summary>
        /// <param name="id">杂烩主键</param>
        /// <returns></returns>
        string GetPostById(string id);
        ///// <summary>
        ///// 获取指定日期之后的杂烩数量
        ///// </summary>
        ///// <param name="postDateTime">指定日期</param>
        ///// <returns></returns>
        //int GetPostsCountAfterPostTime(DateTime postDateTime);
        /// <summary>
        /// 更新杂烩
        /// </summary>
        /// <param name="post">杂烩实体</param>
        /// <returns></returns>
        string UpdatePost(PostsModel post);
        ///// <summary>
        ///// 获取指定数量最新杂烩
        ///// </summary>
        ///// <param name="sortId">排序id</param>
        ///// <param name="size">数量</param>
        ///// <returns></returns>
        //string GetNewPosts(int sortId, int size);
        #endregion

        #region 杂烩的业务操作
        /// <summary>
        /// 阅读杂烩
        /// </summary>
        /// <param name="viewRecord">个人阅读状态实体，需要填充user_id,source_id,language_id</param>
        /// <returns></returns>
        string ReadPost(PersonalViewRecordModel viewRecord);
        /// <summary>
        /// 通过所关注的杂烩主键和用户主键来判断是否有个人杂烩关注记录
        /// </summary>
        /// <param name="attentionId">所关注的杂烩主键</param>
        /// <param name="userId">用户主键</param>
        /// <returns></returns>
        bool HasPostFollow(string attentionId, string userId);
        /// <summary>
        /// 关注杂烩，需要填充user_id,attention_id,is_email,email_duration。
        /// </summary>
        /// <param name="postsFollow">关注实体，需要填充user_id,attention_id,is_email,email_duration</param>
        /// <returns></returns>
        string FollowPost(PersonalPostsFollowModel postsFollow);
        /// <summary>
        /// 取消杂烩关注
        /// </summary>
        /// <param name="userId">用户主键</param>
        /// <param name="attentionId">关注杂烩主键</param>
        /// <returns></returns>
        string UnFollowPost(string userId,string attentionId);

        string UnFollowPost(string id);

        string GetPersonalPostsFollow(int pageCurrent, int pageSize, string where);

        /// <summary>
        /// 回复杂烩
        /// </summary>
        /// <param name="comment">回复实体</param>
        /// <returns></returns>
        string CommentPost(PostsCommentsModel comment);

        string GetPostsCommentsCount(string newsId);

        string GetPostsCommentsCount(string newsId, string followId);

        string GetPostsComments(int pageCurrent, int pageSize, string where);
        /// <summary>
        /// 分享杂烩至日志
        /// </summary>
        /// <param name="post">杂烩实体</param>
        /// <returns></returns>
        string SharePostToBlog(PostsModel post);
        /// <summary>
        /// 分享杂烩至活动
        /// </summary>
        /// <param name="post">杂烩实体</param>
        /// <returns></returns>
        string SharePostToActivity(PostsModel post);
        /// <summary>
        /// 分享杂烩至圈子
        /// </summary>
        /// <param name="post">杂烩实体</param>
        /// <returns></returns>
        string SharePostToCircle(PostsModel post);
        /// <summary>
        /// 分享杂烩至资道
        /// </summary>
        /// <param name="post"></param>
        /// <returns></returns>
        string SharePostToInfo(PostsModel post);
        ///// <summary>
        ///// 创建杂烩草稿
        ///// </summary>
        ///// <param name="draft">杂烩草稿实体</param>
        ///// <returns></returns>
        //string CreatePostDraft(PersonalPostsDraftModal draft);
        ///// <summary>
        ///// 更新杂烩草稿
        ///// </summary>
        ///// <param name="draft">杂烩草稿实体</param>
        ///// <returns></returns>
        //string UpdatePostDraft(PersonalPostsDraftModal draft);
        ///// <summary>
        ///// 通过用户主键判断是否有杂烩草稿记录
        ///// </summary>
        ///// <param name="userId">用户主键</param>
        ///// <returns></returns>
        //bool HasPostDraft(string userId);
        /// <summary>
        /// 保存杂烩草稿,需填充id,user_id,title,content,is_system
        /// </summary>
        /// <param name="draft">个人杂烩草稿实体,需填充id,user_id,title,content,is_system</param>
        /// <returns></returns>
        string SavePostDraft(PersonalPostsDraftModel draft);

        #endregion
        //string CollectPost();
        //string UnCollectPost();

        string UpdatePersonalPostsFollowDuration(string id, bool isEmail, int emailDuration);
    }
}
