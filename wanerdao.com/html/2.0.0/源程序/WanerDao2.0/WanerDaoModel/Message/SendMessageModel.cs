#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2011/11/15 23:13:38 
* 文件名：SendMessageModel 
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
    /// 发送信息
    /// </summary>
    [Serializable]
    public class SendMessageModel
    {
        public SendMessageModel()
        { }
        #region Model
        private string _id;
        private string _user_id;
        private string _send_id;
        private string _reply_id;
        private string _send_email;
        private string _subject;
        private string _content;
        private DateTime? _send_date;
        private bool _is_msg;
        private bool _is_mark;
        private bool _is_delete;
        private DateTime? _delete_date;
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
        /// 用户号
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 发件人号
        /// </summary>
        public string send_id
        {
            set { _send_id = value; }
            get { return _send_id; }
        }
        /// <summary>
        /// 回复号
        /// </summary>
        public string reply_id
        {
            set { _reply_id = value; }
            get { return _reply_id; }
        }
        /// <summary>
        /// 发送邮箱地址
        /// </summary>
        public string send_email
        {
            set { _send_email = value; }
            get { return _send_email; }
        }
        /// <summary>
        /// 标题
        /// </summary>
        public string subject
        {
            set { _subject = value; }
            get { return _subject; }
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
        /// 发送时间
        /// </summary>
        public DateTime? send_date
        {
            set { _send_date = value; }
            get { return _send_date; }
        }
        /// <summary>
        /// 是否为信息
        /// </summary>
        public bool is_msg
        {
            set { _is_msg = value; }
            get { return _is_msg; }
        }
        /// <summary>
        /// 是否标记
        /// </summary>
        public bool is_mark
        {
            set { _is_mark = value; }
            get { return _is_mark; }
        }
        /// <summary>
        /// 是否删除
        /// </summary>
        public bool is_delete
        {
            set { _is_delete = value; }
            get { return _is_delete; }
        }
        /// <summary>
        /// 删除时间
        /// </summary>
        public DateTime? delete_date
        {
            set { _delete_date = value; }
            get { return _delete_date; }
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