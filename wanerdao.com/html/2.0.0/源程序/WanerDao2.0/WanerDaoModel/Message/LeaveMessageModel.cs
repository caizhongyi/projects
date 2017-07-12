#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/6/8 23:03:46 
* 文件名：LeaveMessageModel 
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

namespace WanerDao2.WanerDaoModel.Message
{
    /// <summary>
    /// 访问留言表，当访客登陆用户主页时的留言记录
    /// </summary>
    [Serializable]
    public class LeaveMessageModel
    {
        #region Model
        private string _id;
        private string _from_id;
        private string _to_id;
        private string _content;
        private DateTime _post_date;
        private int _is_open = 1;
        private int _active = 1;
        /// <summary>
        /// 序列号
        /// </summary>
        public string id {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 留言来自
        /// </summary>
        public string from_id {
            set { _from_id = value; }
            get { return _from_id; }
        }
        /// <summary>
        /// 留言给
        /// </summary>
        public string to_id {
            set { _to_id = value; }
            get { return _to_id; }
        }
        /// <summary>
        /// 内容
        /// </summary>
        public string content {
            set { _content = value; }
            get { return _content; }
        }
        /// <summary>
        /// 时间
        /// </summary>
        public DateTime post_date {
            set { _post_date = value; }
            get { return _post_date; }
        }
        /// <summary>
        /// 是否其他人可见
        /// </summary>
        public int is_open {
            set { _is_open = value; }
            get { return _is_open; }
        }
        /// <summary>
        /// 是否有效
        /// </summary>
        public int active {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model
    }
}
