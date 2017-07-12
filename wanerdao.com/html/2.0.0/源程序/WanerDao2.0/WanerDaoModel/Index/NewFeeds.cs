#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/3/18 0:52:20 
* 文件名：NewFeeds 
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
using WanerDao2.WanerDaoDALFactory;
using System.Reflection;

namespace WanerDao2.WanerDaoModel.Index
{
    #region 发表状态
    /// <summary> 用户发表状态
    ///
    /// </summary>
    public class PUBLISH_STATE : BaseTableModel
    {
        public PUBLISH_STATE()
        {

        }
        public PUBLISH_STATE(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<PUBLISH_STATE>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                PUBLISH_STATE needFeed = result[0] as PUBLISH_STATE;
                SetSelfValue(needFeed);
            }

        }

        private string _countent;

        /// <summary>
        /// 内容
        /// </summary>
        public string content
        {
            get { return _countent; }
            set { _countent = value; }
        }
    }

    #endregion


    #region 发表链接
    /// <summary> 用户发表链接
    ///
    /// </summary>
    public class PUBLISH_LINK : BaseTableModel
    {
        public PUBLISH_LINK()
        {

        }

        public PUBLISH_LINK(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<PUBLISH_LINK>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                PUBLISH_LINK linkFeed = result[0] as PUBLISH_LINK;
                SetSelfValue(linkFeed);
            }
        }

        private string _link;
        private string _description;
        private string _permission;

        /// <summary>
        /// 权限
        /// </summary>
        public string permission
        {
            get { return _permission; }
            set { _permission = value; }
        }
        /// <summary>
        /// 描述
        /// </summary>
        public string description
        {
            get { return _description; }
            set { _description = value; }
        }
        /// <summary>
        /// 链接地址
        /// </summary>
        public string link
        {
            get { return _link; }
            set { _link = value; }
        }

    }

    #endregion


    #region 发表图片
    /// <summary>用户发表图片
    /// 
    /// </summary>
    public class PUBLISH_IMAGE : BaseTableModel
    {
        private string _description;
        private string _image_small_path;
        private string _image_path;

        public PUBLISH_IMAGE()
        {

        }
        public PUBLISH_IMAGE(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<PUBLISH_IMAGE>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                PUBLISH_IMAGE linkFeed = result[0] as PUBLISH_IMAGE;
                SetSelfValue(linkFeed);
            }
        }

        /// <summary>
        /// 照片id
        /// </summary>
        public string image_id { get; set; }
        /// <summary>
        /// 相册ID
        /// </summary>
        public string fold_id { get; set; }
        /// <summary>
        /// 相片存储地址 小图
        /// </summary>
        public string image_small_path
        {
            get { return _image_small_path; }
            set { _image_small_path = value; }
        }
        /// <summary>
        /// 相片存储地址
        /// </summary>
        public string image_path
        {
            get { return _image_path; }
            set { _image_path = value; }
        }
        /// <summary>
        /// 描述
        /// </summary>
        public string description
        {
            get { return _description; }
            set { _description = value; }
        }
    }

    #endregion


    #region 发表视频
    /// <summary>用户发表视频
    /// 
    /// </summary>
    public class PUBLISH_VIDEO : BaseTableModel
    {
        private string _description;
        private int _video_code;

        public PUBLISH_VIDEO()
        {

        }
        public PUBLISH_VIDEO(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<PUBLISH_VIDEO>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                PUBLISH_VIDEO linkFeed = result[0] as PUBLISH_VIDEO;
                SetSelfValue(linkFeed);
            }
        }
        public string video_id { get; set; }
        /// <summary>
        /// 视频夹号
        /// </summary>
        public string fold_id { get; set; }
        public string video_name { get; set; }
        public string video_path { get; set; }
        public string video_link { get; set; }
        public string source { get; set; }
        /// <summary>
        /// 视频代码
        /// </summary>
        public string video_code { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string description
        {
            get { return _description; }
            set { _description = value; }
        }
    }
    #endregion


    #region 发表日志
    /// <summary> 用户发表的日志
    ///
    /// </summary>
    public class PUBLISH_BLOG : BaseTableModel
    {
        public PUBLISH_BLOG()
        {

        }
        public PUBLISH_BLOG(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<PUBLISH_BLOG>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                PUBLISH_BLOG linkFeed = result[0] as PUBLISH_BLOG;
                SetSelfValue(linkFeed);
            }
        }

        private string _title;
        private string _content;
        public string blog_id { get; set; }
        /// <summary>
        /// 标题
        /// </summary>
        public string title
        {
            get { return _title; }
            set { _title = value; }
        }
        /// <summary>
        /// 内容
        /// </summary>
        public string content
        {
            get { return _content; }
            set { _content = value; }
        }

    }
    #endregion


    #region 发表相册
    /// <summary>发表相册
    /// 
    /// </summary>
    public class UPLOAD_IMAGE : BaseTableModel
    {
        public UPLOAD_IMAGE()
        {

        }
        public UPLOAD_IMAGE(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<UPLOAD_IMAGE>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                UPLOAD_IMAGE linkFeed = result[0] as UPLOAD_IMAGE;
                SetSelfValue(linkFeed);
            }
        }

        public string imagefolder_id { get; set; }
        public string folder_name { get; set; }

    }
    #endregion


    #region 转发状态
    /// <summary>转发状态
    /// 
    /// </summary>
    public class FORWARD_STATE : BaseTableModel
    {
        public FORWARD_STATE()
        {

        }
        public FORWARD_STATE(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<FORWARD_STATE>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                FORWARD_STATE linkFeed = result[0] as FORWARD_STATE;
                SetSelfValue(linkFeed);
            }
        }
        public string source_user_id { get; set; }
        public string source_user_name { get; set; }
        public string content { get; set; }

    }
    #endregion


    #region 转发链接
    /// <summary>转发连接
    /// 
    /// </summary>
    public class FORWARD_LINK : BaseTableModel
    {
        public FORWARD_LINK()
        {

        }
        public FORWARD_LINK(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<FORWARD_LINK>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                FORWARD_LINK linkFeed = result[0] as FORWARD_LINK;
                SetSelfValue(linkFeed);
            }
        }

        public string source_user_id { get; set; }
        public string source_user_name { get; set; }
        public string link { get; set; }
        public string description { get; set; }
    }
    #endregion


    #region 转发图片
    /// <summary>转发图片
    /// 
    /// </summary>
    public class FORWARD_IMAGE : BaseTableModel
    {
        public FORWARD_IMAGE()
        {

        }
        public FORWARD_IMAGE(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<FORWARD_IMAGE>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                FORWARD_IMAGE linkFeed = result[0] as FORWARD_IMAGE;
                SetSelfValue(linkFeed);
            }
        }


        public string source_user_id { get; set; }
        public string source_user_name { get; set; }
        public string fold_id { get; set; }
        public string description { get; set; }
        public string image_small_path { get; set; }
        public string image_path { get; set; }
    }
    #endregion


    #region 转发视频
    /// <summary>转发视频
    /// 
    /// </summary>
    public class FORWARD_VIDEO : BaseTableModel
    {
        public FORWARD_VIDEO()
        {

        }
        public FORWARD_VIDEO(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<FORWARD_VIDEO>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                FORWARD_VIDEO linkFeed = result[0] as FORWARD_VIDEO;
                SetSelfValue(linkFeed);
            }
        }


        public string source_user_id { get; set; }
        public string source_user_name { get; set; }
        public string video_name { get; set; }
        public string video_id { get; set; }
        public string fold_id { get; set; }
        public string video_path { get; set; }
        public string video_link { get; set; }
        public string source { get; set; }
        /// <summary>
        /// 视频代码
        /// </summary>
        public string video_code { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string description { get; set; }
    }
    #endregion


    #region 转发博客
    /// <summary>转发博客
    /// 
    /// </summary>
    public class FORWARD_BLOG : BaseTableModel
    {
        public FORWARD_BLOG()
        {

        }
        public FORWARD_BLOG(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<FORWARD_BLOG>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                FORWARD_BLOG linkFeed = result[0] as FORWARD_BLOG;
                SetSelfValue(linkFeed);
            }
        }


        public string source_user_id { get; set; }
        public string source_user_name { get; set; }
        public string title { get; set; }
        public string content { get; set; }
    }
    #endregion


    #region 转发相册
    /// <summary>转发上传的图片
    /// 
    /// </summary>
    public class FORWARD_UPLOADIMAGE : BaseTableModel
    {
        public FORWARD_UPLOADIMAGE()
        {

        }
        public FORWARD_UPLOADIMAGE(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<FORWARD_UPLOADIMAGE>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                FORWARD_UPLOADIMAGE linkFeed = result[0] as FORWARD_UPLOADIMAGE;
                SetSelfValue(linkFeed);
            }
        }


        public string source_user_id { get; set; }
        public string source_user_name { get; set; }
        public string folder_id { get; set; }
        public string folder_name { get; set; }
    }
    #endregion


    #region 参加活动
    /// <summary>加入活动
    /// 
    /// </summary>
    public class JOIN_ACTIVITY : BaseTableModel
    {
        public JOIN_ACTIVITY()
        {

        }
        public JOIN_ACTIVITY(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<JOIN_ACTIVITY>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                JOIN_ACTIVITY linkFeed = result[0] as JOIN_ACTIVITY;
                SetSelfValue(linkFeed);
            }
        }


        public string activity_name { get; set; }
        public int join_member_nbr { get; set; }
        public string activity_id { get; set; }
    }

    #endregion


    #region 参加圈子
    /// <summary>加入圈子
    /// 
    /// </summary>
    public class JOIN_GROUP : BaseTableModel
    {
        public JOIN_GROUP()
        {

        }
        public JOIN_GROUP(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<JOIN_GROUP>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                JOIN_GROUP linkFeed = result[0] as JOIN_GROUP;
                SetSelfValue(linkFeed);
            }
        }


        public string group_id { get; set; }
        public string group_name { get; set; }
        public int member_nbr { get; set; }
        public string logo_path { get; set; }
    }

    #endregion

    #region 退出圈子
    /// <summary>退出圈子
    /// 
    /// </summary>
    public class EXIT_GROUP : BaseTableModel
    {
        public EXIT_GROUP()
        {

        }
        public EXIT_GROUP(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<EXIT_GROUP>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                EXIT_GROUP linkFeed = result[0] as EXIT_GROUP;
                SetSelfValue(linkFeed);
            }
        }


        public string group_id { get; set; }
        public string group_name { get; set; }
        public int member_nbr { get; set; }
        public string logo_path { get; set; }
    }

    #endregion

    #region 发表圈子帖子
    /// <summary>发表圈子帖子
    /// 
    /// </summary>
    public class PUBLISH_GROUP : BaseTableModel
    {
        public PUBLISH_GROUP()
        {

        }
        public PUBLISH_GROUP(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<PUBLISH_GROUP>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                PUBLISH_GROUP linkFeed = result[0] as PUBLISH_GROUP;
                SetSelfValue(linkFeed);
            }
        }


        public string group_id { get; set; }
        public string group_name { get; set; }
        public int member_nbr { get; set; }
        public string logo_path { get; set; }
    }

    #endregion


    #region 加入好友
    /// <summary>加入好友
    /// 
    /// </summary>
    public class ADD_FRIEND : BaseTableModel
    {
        public ADD_FRIEND()
        {

        }
        public ADD_FRIEND(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<ADD_FRIEND>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                ADD_FRIEND linkFeed = result[0] as ADD_FRIEND;
                SetSelfValue(linkFeed);
            }
        }


        public string to_user_id { get; set; }
        public string to_user_name { get; set; }
    }

    #endregion


    #region 赠送礼物
    /// <summary>赠送礼物
    /// 
    /// </summary>
    public class PRESENT_GIFT : BaseTableModel
    {
        public PRESENT_GIFT()
        {

        }
        public PRESENT_GIFT(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<PRESENT_GIFT>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                PRESENT_GIFT linkFeed = result[0] as PRESENT_GIFT;
                SetSelfValue(linkFeed);
            }
        }


        public string gift_id { get; set; }
        public string gift_name { get; set; }
        public string content { get; set; }
    }

    #endregion


    #region 节日礼物
    /// <summary>节日礼物
    /// 
    /// </summary>
    public class FESTIVAL_GIFT : BaseTableModel
    {
        public FESTIVAL_GIFT()
        {

        }
        public FESTIVAL_GIFT(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<FESTIVAL_GIFT>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                FESTIVAL_GIFT linkFeed = result[0] as FESTIVAL_GIFT;
                SetSelfValue(linkFeed);
            }
        }


        public string category_id { get; set; }
        public string giftcategory_name { get; set; }
    }
    #endregion

    #region 留言消息
    /// <summary>留言消息
    /// 
    /// </summary>
    public class LEAVE_MESSAGE : BaseTableModel
    {
        public LEAVE_MESSAGE()
        {

        }
        public LEAVE_MESSAGE(string sqlkey, string data_id)
            : base(data_id)
        {
            XMLConfig x = new XMLConfig(sqlkey, data_id);
            var result = DbHelperFactory.SingleInstance().GetGenericModel<LEAVE_MESSAGE>(x.SQLFileName, x.SQLKey, x.SQLDic);
            if (result != null && result.Count > 0)
            {
                LEAVE_MESSAGE linkFeed = result[0] as LEAVE_MESSAGE;
                SetSelfValue(linkFeed);
            }
        }


        public string content { get; set; }
    }
    #endregion

}
