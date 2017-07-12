using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类personalactivitysettings 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class personalactivitysettings
	{
		public personalactivitysettings()
		{}
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
		private DateTime _update_date;
		private bool _active;
		/// <summary>
		/// id
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// user_id
		/// </summary>
		public string user_id
		{
			set{ _user_id=value;}
			get{return _user_id;}
		}
		/// <summary>
		/// user_email
		/// </summary>
		public string user_email
		{
			set{ _user_email=value;}
			get{return _user_email;}
		}
		/// <summary>
		/// activity_id
		/// </summary>
		public string activity_id
		{
			set{ _activity_id=value;}
			get{return _activity_id;}
		}
		/// <summary>
		/// is_carpool_kick_protected
		/// </summary>
		public bool is_carpool_kick_protected
		{
			set{ _is_carpool_kick_protected=value;}
			get{return _is_carpool_kick_protected;}
		}
		/// <summary>
		/// kick_carpool_duration
		/// </summary>
		public string kick_carpool_duration
		{
			set{ _kick_carpool_duration=value;}
			get{return _kick_carpool_duration;}
		}
		/// <summary>
		/// contact_email
		/// </summary>
		public string contact_email
		{
			set{ _contact_email=value;}
			get{return _contact_email;}
		}
		/// <summary>
		/// is_email_event
		/// </summary>
		public bool is_email_event
		{
			set{ _is_email_event=value;}
			get{return _is_email_event;}
		}
		/// <summary>
		/// is_notice_event
		/// </summary>
		public bool is_notice_event
		{
			set{ _is_notice_event=value;}
			get{return _is_notice_event;}
		}
		/// <summary>
		/// is_email_updates
		/// </summary>
		public bool is_email_updates
		{
			set{ _is_email_updates=value;}
			get{return _is_email_updates;}
		}
		/// <summary>
		/// is_notice_updates
		/// </summary>
		public bool is_notice_updates
		{
			set{ _is_notice_updates=value;}
			get{return _is_notice_updates;}
		}
		/// <summary>
		/// is_email_digest
		/// </summary>
		public bool is_email_digest
		{
			set{ _is_email_digest=value;}
			get{return _is_email_digest;}
		}
		/// <summary>
		/// is_notice_digest
		/// </summary>
		public bool is_notice_digest
		{
			set{ _is_notice_digest=value;}
			get{return _is_notice_digest;}
		}
		/// <summary>
		/// digest_duration
		/// </summary>
		public int digest_duration
		{
			set{ _digest_duration=value;}
			get{return _digest_duration;}
		}
		/// <summary>
		/// is_allow_msg
		/// </summary>
		public bool is_allow_msg
		{
			set{ _is_allow_msg=value;}
			get{return _is_allow_msg;}
		}
		/// <summary>
		/// update_date
		/// </summary>
		public DateTime update_date
		{
			set{ _update_date=value;}
			get{return _update_date;}
		}
		/// <summary>
		/// active
		/// </summary>
		public bool active
		{
			set{ _active=value;}
			get{return _active;}
		}
		#endregion Model

	}
}

