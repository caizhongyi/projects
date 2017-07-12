using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activityevent 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activityevent
	{
		public activityevent()
		{}
		#region Model
		private string _id;
		private string _source_type_id;
		private string _source_id;
		private string _activity_place_category_id;
		private string _event_name;
		private string _description;
		private string _phone;
		private string _phone2;
		private string _email;
		private string _contact_people;
		private string _guess_start;
		private DateTime _event_start;
		private DateTime _event_end;
		private string _website;
		private string _other_link;
		private string _address;
		private string _country_id;
		private string _state_id;
		private string _city_id;
		private string _zip;
		private DateTime _update_date;
		private string _language_id;
		private bool _active;
		/// <summary>
		/// 序列号
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 来源类型号
		/// </summary>
		public string source_type_id
		{
			set{ _source_type_id=value;}
			get{return _source_type_id;}
		}
		/// <summary>
		/// 来源号
		/// </summary>
		public string source_id
		{
			set{ _source_id=value;}
			get{return _source_id;}
		}
		/// <summary>
		/// 活动地点类型号
		/// </summary>
		public string activity_place_category_id
		{
			set{ _activity_place_category_id=value;}
			get{return _activity_place_category_id;}
		}
		/// <summary>
		/// 事件名
		/// </summary>
		public string event_name
		{
			set{ _event_name=value;}
			get{return _event_name;}
		}
		/// <summary>
		/// 描述
		/// </summary>
		public string description
		{
			set{ _description=value;}
			get{return _description;}
		}
		/// <summary>
		/// 电话
		/// </summary>
		public string phone
		{
			set{ _phone=value;}
			get{return _phone;}
		}
		/// <summary>
		/// 电话2
		/// </summary>
		public string phone2
		{
			set{ _phone2=value;}
			get{return _phone2;}
		}
		/// <summary>
		/// Email
		/// </summary>
		public string Email
		{
			set{ _email=value;}
			get{return _email;}
		}
		/// <summary>
		/// 联系人
		/// </summary>
		public string contact_people
		{
			set{ _contact_people=value;}
			get{return _contact_people;}
		}
		/// <summary>
		/// 预计开始时间
		/// </summary>
		public string guess_start
		{
			set{ _guess_start=value;}
			get{return _guess_start;}
		}
		/// <summary>
		/// 事件开始时间
		/// </summary>
		public DateTime event_start
		{
			set{ _event_start=value;}
			get{return _event_start;}
		}
		/// <summary>
		/// 事件结束时间
		/// </summary>
		public DateTime event_end
		{
			set{ _event_end=value;}
			get{return _event_end;}
		}
		/// <summary>
		/// 官方网址
		/// </summary>
		public string website
		{
			set{ _website=value;}
			get{return _website;}
		}
		/// <summary>
		/// 其他链接
		/// </summary>
		public string other_link
		{
			set{ _other_link=value;}
			get{return _other_link;}
		}
		/// <summary>
		/// 地址
		/// </summary>
		public string address
		{
			set{ _address=value;}
			get{return _address;}
		}
		/// <summary>
		/// 国家ID
		/// </summary>
		public string country_id
		{
			set{ _country_id=value;}
			get{return _country_id;}
		}
		/// <summary>
		/// 州ID
		/// </summary>
		public string state_id
		{
			set{ _state_id=value;}
			get{return _state_id;}
		}
		/// <summary>
		/// 市ID
		/// </summary>
		public string city_id
		{
			set{ _city_id=value;}
			get{return _city_id;}
		}
		/// <summary>
		/// 邮编
		/// </summary>
		public string zip
		{
			set{ _zip=value;}
			get{return _zip;}
		}
		/// <summary>
		/// 数据更新时间
		/// </summary>
		public DateTime update_date
		{
			set{ _update_date=value;}
			get{return _update_date;}
		}
		/// <summary>
		/// 语言号
		/// </summary>
		public string language_id
		{
			set{ _language_id=value;}
			get{return _language_id;}
		}
		/// <summary>
		/// 是否有效
		/// </summary>
		public bool active
		{
			set{ _active=value;}
			get{return _active;}
		}
		#endregion Model

	}
}

