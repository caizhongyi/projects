using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activityevent ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
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
		/// ���к�
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// ��Դ���ͺ�
		/// </summary>
		public string source_type_id
		{
			set{ _source_type_id=value;}
			get{return _source_type_id;}
		}
		/// <summary>
		/// ��Դ��
		/// </summary>
		public string source_id
		{
			set{ _source_id=value;}
			get{return _source_id;}
		}
		/// <summary>
		/// ��ص����ͺ�
		/// </summary>
		public string activity_place_category_id
		{
			set{ _activity_place_category_id=value;}
			get{return _activity_place_category_id;}
		}
		/// <summary>
		/// �¼���
		/// </summary>
		public string event_name
		{
			set{ _event_name=value;}
			get{return _event_name;}
		}
		/// <summary>
		/// ����
		/// </summary>
		public string description
		{
			set{ _description=value;}
			get{return _description;}
		}
		/// <summary>
		/// �绰
		/// </summary>
		public string phone
		{
			set{ _phone=value;}
			get{return _phone;}
		}
		/// <summary>
		/// �绰2
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
		/// ��ϵ��
		/// </summary>
		public string contact_people
		{
			set{ _contact_people=value;}
			get{return _contact_people;}
		}
		/// <summary>
		/// Ԥ�ƿ�ʼʱ��
		/// </summary>
		public string guess_start
		{
			set{ _guess_start=value;}
			get{return _guess_start;}
		}
		/// <summary>
		/// �¼���ʼʱ��
		/// </summary>
		public DateTime event_start
		{
			set{ _event_start=value;}
			get{return _event_start;}
		}
		/// <summary>
		/// �¼�����ʱ��
		/// </summary>
		public DateTime event_end
		{
			set{ _event_end=value;}
			get{return _event_end;}
		}
		/// <summary>
		/// �ٷ���ַ
		/// </summary>
		public string website
		{
			set{ _website=value;}
			get{return _website;}
		}
		/// <summary>
		/// ��������
		/// </summary>
		public string other_link
		{
			set{ _other_link=value;}
			get{return _other_link;}
		}
		/// <summary>
		/// ��ַ
		/// </summary>
		public string address
		{
			set{ _address=value;}
			get{return _address;}
		}
		/// <summary>
		/// ����ID
		/// </summary>
		public string country_id
		{
			set{ _country_id=value;}
			get{return _country_id;}
		}
		/// <summary>
		/// ��ID
		/// </summary>
		public string state_id
		{
			set{ _state_id=value;}
			get{return _state_id;}
		}
		/// <summary>
		/// ��ID
		/// </summary>
		public string city_id
		{
			set{ _city_id=value;}
			get{return _city_id;}
		}
		/// <summary>
		/// �ʱ�
		/// </summary>
		public string zip
		{
			set{ _zip=value;}
			get{return _zip;}
		}
		/// <summary>
		/// ���ݸ���ʱ��
		/// </summary>
		public DateTime update_date
		{
			set{ _update_date=value;}
			get{return _update_date;}
		}
		/// <summary>
		/// ���Ժ�
		/// </summary>
		public string language_id
		{
			set{ _language_id=value;}
			get{return _language_id;}
		}
		/// <summary>
		/// �Ƿ���Ч
		/// </summary>
		public bool active
		{
			set{ _active=value;}
			get{return _active;}
		}
		#endregion Model

	}
}

