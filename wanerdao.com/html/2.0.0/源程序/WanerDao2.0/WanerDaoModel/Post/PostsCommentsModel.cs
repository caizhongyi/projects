#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 杂烩发帖回复实体
* 作者：徐蓓   时间：2011/12/18 1:48:13 
* 文件名：PostsCommentsModal
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

namespace WanerDao2.WanerDaoModel.Post
{
    /// <summary>
    /// PostsCommentsModal:杂烩发帖回复实体
    /// </summary>
    [Serializable]
    public class PostsCommentsModel
    {
        public PostsCommentsModel()
        { }
        #region Model
        private string _id;
        private int _sort_id;
        private string _news_id;
        private string _follow_id;
        private string _user_id;
        private string _content;
        private DateTime? _comments_date;
        private bool? _positive = true;
        private bool? _negative = false;
        private bool? _active = true;
        /// <summary>
        /// 
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// auto_increment
        /// </summary>
        public int sort_id
        {
            set { _sort_id = value; }
            get { return _sort_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string news_id
        {
            set { _news_id = value; }
            get { return _news_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string follow_id
        {
            set { _follow_id = value; }
            get { return _follow_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string content
        {
            set { _content = value; }
            get { return _content; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? comments_date
        {
            set { _comments_date = value; }
            get { return _comments_date; }
        }
        /// <summary>
        /// 
        /// </summary>
        public bool? positive
        {
            set { _positive = value; }
            get { return _positive; }
        }
        /// <summary>
        /// 
        /// </summary>
        public bool? negative
        {
            set { _negative = value; }
            get { return _negative; }
        }
        /// <summary>
        /// 
        /// </summary>
        public bool? active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }
}
