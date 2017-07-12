using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activitymember ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activitymember:Base.ModelBase
	{
		public activitymember()
		{}
		#region Model
		private string _activity_id;
		private string _user_id;
        
		private string _vehicle_type_id;
		private bool _is_auto;
		private bool _is_need_carpool;
		private bool _is_permit_carpool;
		private string _carpool_type_id;
		private double _carpool_money;
		private string _auto_brand_id;
		private string _auto_model_id;
		private string _auto_year;
		private string _auto_plate;
		private int _carpool_nbr;
		private int _current_carpool_nbr;
		private string _address;
		private string _country_id;
		private string _state_id;
		private string _city_id;
		private string _zip;
		private string _distance;
		private string _phone;
		private string _email;
		private string _pay_status;
		private bool _is_authorized;
		private DateTime _report_date;
		private DateTime _join_date;
		private int _like_nbr;
		private int _dislike_nbr;
		private int _soso_nbr;
		private bool _active;

		/// <summary>
		/// ���
		/// </summary>
		public string activity_id
		{
			set{ _activity_id=value;}
			get{return _activity_id;}
		}
		/// <summary>
		/// �û���
		/// </summary>
		public string user_id
		{
			set{ _user_id=value;}
			get{return _user_id;}
		}
        
		/// <summary>
		/// ��ͨ��ʽ��
		/// </summary>
		public string vehicle_type_id
		{
			set{ _vehicle_type_id=value;}
			get{return _vehicle_type_id;}
		}
		/// <summary>
		/// �Ƿ��г�
		/// </summary>
		public bool is_auto
		{
			set{ _is_auto=value;}
			get{return _is_auto;}
		}
		/// <summary>
		/// �Ƿ���Ҫ�
		/// </summary>
		public bool is_need_carpool
		{
			set{ _is_need_carpool=value;}
			get{return _is_need_carpool;}
		}
		/// <summary>
		/// �Ƿ�׼��
		/// </summary>
		public bool is_permit_carpool
		{
			set{ _is_permit_carpool=value;}
			get{return _is_permit_carpool;}
		}
		/// <summary>
		/// ����ͺ�
		/// </summary>
		public string carpool_type_id
		{
			set{ _carpool_type_id=value;}
			get{return _carpool_type_id;}
		}
		/// <summary>
		/// �����
		/// </summary>
		public double carpool_money
		{
			set{ _carpool_money=value;}
			get{return _carpool_money;}
		}
		/// <summary>
		/// ����Ʒ�ƺ�
		/// </summary>
		public string auto_brand_id
		{
			set{ _auto_brand_id=value;}
			get{return _auto_brand_id;}
		}
		/// <summary>
		/// �����ͺ�
		/// </summary>
		public string auto_model_id
		{
			set{ _auto_model_id=value;}
			get{return _auto_model_id;}
		}
		/// <summary>
		/// �������
		/// </summary>
		public string auto_year
		{
			set{ _auto_year=value;}
			get{return _auto_year;}
		}
		/// <summary>
		/// ����
		/// </summary>
		public string auto_plate
		{
			set{ _auto_plate=value;}
			get{return _auto_plate;}
		}
		/// <summary>
		/// �������
		/// </summary>
		public int carpool_nbr
		{
			set{ _carpool_nbr=value;}
			get{return _carpool_nbr;}
		}
		/// <summary>
		/// ���д����
		/// </summary>
		public int current_carpool_nbr
		{
			set{ _current_carpool_nbr=value;}
			get{return _current_carpool_nbr;}
		}
		/// <summary>
		/// סַ
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
		/// ��ʡID
		/// </summary>
		public string state_id
		{
			set{ _state_id=value;}
			get{return _state_id;}
		}
		/// <summary>
		/// ����ID
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
		/// ���������
		/// </summary>
		public string distance
		{
			set{ _distance=value;}
			get{return _distance;}
		}
		/// <summary>
		/// ��ϵ�绰
		/// </summary>
		public string phone
		{
			set{ _phone=value;}
			get{return _phone;}
		}
		/// <summary>
		/// �ʼ�
		/// </summary>
		public string email
		{
			set{ _email=value;}
			get{return _email;}
		}
		/// <summary>
		/// �ɷ�״̬
		/// </summary>
		public string pay_status
		{
			set{ _pay_status=value;}
			get{return _pay_status;}
		}
		/// <summary>
		/// �Ƿ�ͨ��
		/// </summary>
		public bool is_authorized
		{
			set{ _is_authorized=value;}
			get{return _is_authorized;}
		}
		/// <summary>
		/// ����ʱ��
		/// </summary>
		public DateTime report_date
		{
			set{ _report_date=value;}
			get{return _report_date;}
		}
		/// <summary>
		/// �μ�ʱ��
		/// </summary>
		public DateTime join_date
		{
			set{ _join_date=value;}
			get{return _join_date;}
		}
		/// <summary>
		/// ϲ��
		/// </summary>
		public int like_nbr
		{
			set{ _like_nbr=value;}
			get{return _like_nbr;}
		}
		/// <summary>
		/// ��ϲ��
		/// </summary>
		public int dislike_nbr
		{
			set{ _dislike_nbr=value;}
			get{return _dislike_nbr;}
		}
		/// <summary>
		/// һ���
		/// </summary>
		public int soso_nbr
		{
			set{ _soso_nbr=value;}
			get{return _soso_nbr;}
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


        #region  ��չ
        private string _user_name;

        /// <summary>
        /// �û���
        /// </summary>
        public string user_name
        {
            set { _user_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_user_name))
                    return _user_name;
                return GetActivityConfigTableDataName.GetName(user_id);
            }
        }

        #endregion
    }
}

