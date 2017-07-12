#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2011/11/15 23:17:57 
* 文件名：SendInviteMessageModel 
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
    /// 发送的邀请信息
    /// </summary>
    [Serializable]
    public class SendInviteMessageModel
    {
        public SendInviteMessageModel()
        { }
        #region Model
        private string _id;
        private string _user_id;
        private string _send_id;
        private string _send_email;
        private int? _msg_type;
        private string _msg_id;
        private string _content;
        private DateTime? _send_date;
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
        /// 发送号
        /// </summary>
        public string send_id {
            set { _send_id = value; }
            get { return _send_id; }
        }
        /// <summary>
        /// 发送地址
        /// </summary>
        public string send_email
        {
            set { _send_email = value; }
            get { return _send_email; }
        }
        /// <summary>
        /// 信息类型号（1圈子，2活动，3好友）
        /// </summary>
        public int? msg_type
        {
            set { _msg_type = value; }
            get { return _msg_type; }
        }
        /// <summary>
        /// 信息号(圈子ID，活动ID)
        /// </summary>
        public string msg_id
        {
            set { _msg_id = value; }
            get { return _msg_id; }
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
