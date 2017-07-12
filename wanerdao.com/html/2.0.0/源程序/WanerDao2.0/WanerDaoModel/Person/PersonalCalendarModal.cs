#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人日历实体
* 作者：徐蓓   时间：2011/12/10 1:48:13 
* 文件名：PersonalCalendarModal 
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
using System.Runtime.Serialization;

namespace WanerDao2.WanerDaoModel.Person
{
    /// <summary>
    /// 个人日历信息
    /// </summary>
    [DataContract]
    [Serializable]
    public partial class PersonalCalendarModal
    {
        public PersonalCalendarModal()
        { }
        #region Model
        private string _id = "";
        private int _sort_id = 0;
        private string _user_id = "";
        private string _title = "";
        private string _destination = "";
        private string _record_event = "";
        private DateTime? _begin_date = DateTime.Now;
        private DateTime? _end_date = DateTime.Now;
        private bool? _is_agenda = false;
        private bool? _is_hint = false;
        private int? _hint_duration = 0;
        private string _hint_unit = "";
        private bool? _is_email = false;
        private int? _email_duration = 0;
        private string _email_unit = "";
        private DateTime? _update_date = DateTime.Now;
        private bool? _active = true;
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// auto_increment
        /// </summary>
        [DataMember]
        public int sort_id
        {
            set { _sort_id = value; }
            get { return _sort_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public string title
        {
            set { _title = value; }
            get { return _title; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public string destination
        {
            set { _destination = value; }
            get { return _destination; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public string record_event
        {
            set { _record_event = value; }
            get { return _record_event; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public DateTime? begin_date
        {
            set { _begin_date = value; }
            get { return _begin_date; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public DateTime? end_date
        {
            set { _end_date = value; }
            get { return _end_date; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public bool? is_agenda
        {
            set { _is_agenda = value; }
            get { return _is_agenda; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public bool? is_hint
        {
            set { _is_hint = value; }
            get { return _is_hint; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public int? hint_duration
        {
            set { _hint_duration = value; }
            get { return _hint_duration; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public string hint_unit
        {
            set { _hint_unit = value; }
            get { return _hint_unit; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public bool? is_email
        {
            set { _is_email = value; }
            get { return _is_email; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public int? email_duration
        {
            set { _email_duration = value; }
            get { return _email_duration; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public string email_unit
        {
            set { _email_unit = value; }
            get { return _email_unit; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public DateTime? update_date
        {
            set { _update_date = value; }
            get { return _update_date; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataMember]
        public bool? active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }
}
