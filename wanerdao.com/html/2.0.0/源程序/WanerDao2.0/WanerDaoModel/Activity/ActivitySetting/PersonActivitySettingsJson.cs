#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-02-14 22:36:31 
* 文件名：personalactivitysettings 
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

namespace WanerDao2.WanerDaoModel.Activity.ActivitySetting
{
    [Serializable]
    public class PersonActivitySettingsJson
    {
        public PersonActivitySettingsJson()
        { }
        #region Model
        private string _id;
        private string _user_id;
        private string _user_email;
        private string _activity_id;
        private bool _is_carpool_kick_protected;
        private string _kick_carpool_duration;
        private string _contact_email;
        private bool _is_email_event;
        private bool _is_notice_event;
        private bool _is_email_updates;
        private bool _is_notice_updates;
        private bool _is_email_digest;
        private bool _is_notice_digest;
        private int _digest_duration;
        private bool _is_allow_msg;
        private List<PersonJson> _persons;

        /// <summary>
        /// 
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
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
        public string user_email
        {
            set { _user_email = value; }
            get { return _user_email; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string activity_id
        {
            set { _activity_id = value; }
            get { return _activity_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public bool is_kick_protected
        {
            set { _is_carpool_kick_protected = value; }
            get { return _is_carpool_kick_protected; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string kick_carpool_duration
        {
            set { _kick_carpool_duration = value; }
            get { return _kick_carpool_duration; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string contact_email
        {
            set { _contact_email = value; }
            get { return _contact_email; }
        }
        /// <summary>
        /// 
        /// </summary>
        public bool is_email_event
        {
            set { _is_email_event = value; }
            get { return _is_email_event; }
        }
        /// <summary>
        /// 
        /// </summary>
        public bool is_notice_event
        {
            set { _is_notice_event = value; }
            get { return _is_notice_event; }
        }
        /// <summary>
        /// 
        /// </summary>
        public bool is_email_updates
        {
            set { _is_email_updates = value; }
            get { return _is_email_updates; }
        }
        /// <summary>
        /// 是否通过站内信息接受即时圈子更新
        /// </summary>
        public bool is_notice_updates
        {
            set { _is_notice_updates = value; }
            get { return _is_notice_updates; }
        }
        /// <summary>
        /// 是否通过邮件接受圈子简要
        /// </summary>
        public bool is_email_digest
        {
            set { _is_email_digest = value; }
            get { return _is_email_digest; }
        }
        /// <summary>
        /// 是否通过站内信息接受圈子摘要
        /// </summary>
        public bool is_notice_digest
        {
            set { _is_notice_digest = value; }
            get { return _is_notice_digest; }
        }
        /// <summary>
        /// 接受圈子更新简要时间间隔
        /// </summary>
        public int digest_duration
        {
            set { _digest_duration = value; }
            get { return _digest_duration; }
        }
        /// <summary>
        /// 是否允许短消息
        /// </summary>
        public bool is_allow_msg
        {
            set { _is_allow_msg = value; }
            get { return _is_allow_msg; }
        }
        /// <summary>
        /// 额外人员信息
        /// </summary>
        public List<PersonJson> persons
        {
            get { return _persons; }
            set { _persons = value; }
        }
        #endregion Model

    }
}
