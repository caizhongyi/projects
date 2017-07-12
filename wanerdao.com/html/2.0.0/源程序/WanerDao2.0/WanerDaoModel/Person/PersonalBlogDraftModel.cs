#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人日志草稿模型
* 作者：杨晓东   时间：2011/10/2 18:49:56 
* 文件名：PersonalBlogDraftModel 
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
    /// 个人日志草稿
    /// </summary>
    [Serializable]
    public partial class PersonalBlogDraftModel
    {
        public PersonalBlogDraftModel()
        { }
        #region Model
        private string _id;
        private int _sort_id;
        private string _user_id;
        private string _title;
        private string _content;
        private DateTime? _save_date;
        private bool? _active = true;
        /// <summary>
        /// 序列号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 排序ID
        /// </summary>
        public int sort_id
        {
            set { _sort_id = value; }
            get { return _sort_id; }
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
        /// 标题
        /// </summary>
        public string title
        {
            set { _title = value; }
            get { return _title; }
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
        /// 保存时间
        /// </summary>
        public DateTime? save_date
        {
            set { _save_date = value; }
            get { return _save_date; }
        }
        /// <summary>
        /// 是否有效
        /// </summary>
        public bool? active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }
}
