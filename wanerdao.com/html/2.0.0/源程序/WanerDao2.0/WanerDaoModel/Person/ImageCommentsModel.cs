#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 图片评论模型
* 作者：杨晓东   时间：2011/10/2 20:21:23 
* 文件名：ImageCommentsModel 
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

namespace WanerDao2.WanerDaoModel.Person
{
    /// <summary>
    /// 图片评论
    /// </summary>
    [Serializable]
    public partial class ImageCommentsModel
    {
        public ImageCommentsModel()
        { }
        #region Model
        private string _id = string.Empty;
        private string _image_id = string.Empty;
        private string _follow_id = string.Empty;
        private string _user_id = string.Empty;
        private string _content = string.Empty;
        private DateTime _comments_date;
        private int _positive;
        private int _negative;
        private bool _active = true;
        /// <summary>
        /// 序列号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 相片号
        /// </summary>
        public string image_id
        {
            set { _image_id = value; }
            get { return _image_id; }
        }
        /// <summary>
        /// 回复帖号
        /// </summary>
        public string follow_id
        {
            set { _follow_id = value; }
            get { return _follow_id; }
        }
        /// <summary>
        /// 用户号
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 内容
        /// </summary>
        public string content
        {
            set { _content = value; }
            get { return _content; }
        }
        /// <summary>
        /// 回复时间
        /// </summary>
        public DateTime comments_date
        {
            set { _comments_date = value; }
            get { return _comments_date; }
        }
        /// <summary>
        /// 正面评价
        /// </summary>
        public int positive
        {
            set { _positive = value; }
            get { return _positive; }
        }
        /// <summary>
        /// 负面评价
        /// </summary>
        public int negative
        {
            set { _negative = value; }
            get { return _negative; }
        }
        /// <summary>
        /// 是否有效
        /// </summary>
        public bool active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }
}
