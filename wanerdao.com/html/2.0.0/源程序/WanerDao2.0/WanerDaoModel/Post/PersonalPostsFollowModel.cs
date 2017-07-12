#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人发帖关注信息实体
* 作者：徐蓓   时间：2011/12/18 1:48:13 
* 文件名：PersonalPostsFollowModal 
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
    /// PersonalPostsFollowModal:个人发帖关注信息
    /// </summary>
    [Serializable]
    public class PersonalPostsFollowModel
    {
        public PersonalPostsFollowModel()
        { }
        #region Model
        private string _id;
        private int _sort_id;
        private string _user_id;
        private string _attention_id;
        private DateTime? _attention_datetime;
        private bool? _is_email;
        private int? _email_duration;
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
        public string attention_id
        {
            set { _attention_id = value; }
            get { return _attention_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? attention_datetime
        {
            set { _attention_datetime = value; }
            get { return _attention_datetime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public bool? is_email
        {
            set { _is_email = value; }
            get { return _is_email; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? email_duration
        {
            set { _email_duration = value; }
            get { return _email_duration; }
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
