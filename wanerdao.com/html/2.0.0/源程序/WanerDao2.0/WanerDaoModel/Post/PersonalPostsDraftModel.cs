#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人杂烩草稿实体
* 作者：徐蓓   时间：2011/12/18 1:48:13 
* 文件名：PersonalPostsDraftModal
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
    /// PersonalPostsDraftModal:个人杂烩草稿实体
    /// </summary>
    [Serializable]
    public class PersonalPostsDraftModel
    {
        public PersonalPostsDraftModel()
        { }
        #region Model
        private string _id;
        private int _sort_id;
        private string _user_id;
        private string _title;
        private string _content;
        private bool? _is_system;
        private DateTime? _save_date;
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
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string title
        {
            set { _title = value; }
            get { return _title; }
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
        public bool? is_system
        {
            set { _is_system = value; }
            get { return _is_system; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? save_date
        {
            set { _save_date = value; }
            get { return _save_date; }
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
