using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activity ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activity
	{
		public activity()
		{}
		#region Model
		private string _id;
		private string _activity_name;
		private string _activity_link;
		private DateTime _datetime;
		private string _original_id;
		private string _create_type_id;
		private string _create_id;
		private string _description;
		private string _create_email;
		private string _create_phone;
		private double _follow_score;
		private double _activity_score;
		private int _max_nbr;
		private int _join_member_nbr;
		private string _address;
		private string _country_id;
		private string _province_id;
		private string _city_id;
		private string _zip;
		private DateTime _begin_datetime;
		private DateTime _end_datetime;
		private DateTime _report_datetime;
		private string _apply_type_id;
		private string _apply_type_name;
		private string _apply_pass;
        private decimal _prepay_nbr;
		private bool _is_budget_open;
		private int _refund_type;
		private bool _is_kick_protected;
		private double _kick_protected_duration;
		private bool _is_balance;
		private DateTime _balance_date;
		private int _balance_type;
		private string _is_public;
		private string _schedule_type;
		private int _counter;
		private DateTime _update_date;
		private bool _is_visible;
		private bool _is_create;
		private bool _active;
        private string _pay_description;
        private bool _is_pay_need;
        private decimal _pay_nbr;

        private double _lat;
        private double _lng;
		/// <summary>
		/// ���
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// ���
		/// </summary>
		public string activity_name
		{
			set{ _activity_name=value;}
			get{return _activity_name;}
		}
		/// <summary>
		/// ���������
		/// </summary>
		public string activity_link
		{
			set{ _activity_link=value;}
			get{return _activity_link;}
		}
		/// <summary>
		/// ����ʱ��
		/// </summary>
		public DateTime datetime
		{
			set{ _datetime=value;}
			get{return _datetime;}
		}
		/// <summary>
		/// �����˺�
		/// </summary>
		public string original_id
		{
			set{ _original_id=value;}
			get{return _original_id;}
		}
		/// <summary>
		/// ���������
		/// </summary>
		public string create_type_id
		{
			set{ _create_type_id=value;}
			get{return _create_type_id;}
		}
		/// <summary>
		/// �����
		/// </summary>
		public string create_id
		{
			set{ _create_id=value;}
			get{return _create_id;}
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
		/// ������email
		/// </summary>
		public string create_email
		{
			set{ _create_email=value;}
			get{return _create_email;}
		}
		/// <summary>
		/// �����˵绰
		/// </summary>
		public string create_phone
		{
			set{ _create_phone=value;}
			get{return _create_phone;}
		}
		/// <summary>
		/// ��ע��
		/// </summary>
		public double follow_score
		{
			set{ _follow_score=value;}
			get{return _follow_score;}
		}
		/// <summary>
		/// ��Ծ��
		/// </summary>
		public double activity_score
		{
			set{ _activity_score=value;}
			get{return _activity_score;}
		}
		/// <summary>
		/// ��������
		/// </summary>
		public int max_nbr
		{
			set{ _max_nbr=value;}
			get{return _max_nbr;}
		}
		/// <summary>
		/// ʵ�ʲμ�����
		/// </summary>
		public int join_member_nbr
		{
			set{ _join_member_nbr=value;}
			get{return _join_member_nbr;}
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
		/// ʡ��ID
		/// </summary>
		public string province_id
		{
			set{ _province_id=value;}
			get{return _province_id;}
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
		/// ���ʼʱ��
		/// </summary>
		public DateTime begin_datetime
		{
			set{ _begin_datetime=value;}
			get{return _begin_datetime;}
		}
		/// <summary>
		/// �����ʱ��
		/// </summary>
		public DateTime end_datetime
		{
			set{ _end_datetime=value;}
			get{return _end_datetime;}
		}
		/// <summary>
		/// ��������ʱ��
		/// </summary>
		public DateTime report_datetime
		{
			set{ _report_datetime=value;}
			get{return _report_datetime;}
		}
		/// <summary>
		/// ������ʽ��
		/// </summary>
		public string apply_type_id
		{
			set{ _apply_type_id=value;}
			get{return _apply_type_id;}
		}
		/// <summary>
		/// ������ʽ��
		/// </summary>
		public string apply_type_name
		{
			set{ _apply_type_name=value;}
			get{return _apply_type_name;}
		}
		/// <summary>
		/// ��������
		/// </summary>
		public string apply_pass
		{
			set{ _apply_pass=value;}
			get{return _apply_pass;}
		}
		/// <summary>
		/// Ԥ�����
		/// </summary>
        public decimal prepay_nbr
		{
			set{ _prepay_nbr=value;}
			get{return _prepay_nbr;}
		}
		/// <summary>
		/// Ԥ���Ƿ���⹫��
		/// </summary>
		public bool is_budget_open
		{
			set{ _is_budget_open=value;}
			get{return _is_budget_open;}
		}
		/// <summary>
		/// �˿�����
		/// </summary>
		public int refund_type
		{
			set{ _refund_type=value;}
			get{return _refund_type;}
		}
		/// <summary>
		/// �Ƿ��������˱���
		/// </summary>
		public bool is_kick_protected
		{
			set{ _is_kick_protected=value;}
			get{return _is_kick_protected;}
		}
		/// <summary>
		/// ����ʱ��
		/// </summary>
		public double kick_protected_duration
		{
			set{ _kick_protected_duration=value;}
			get{return _kick_protected_duration;}
		}
		/// <summary>
		/// �Ƿ�ȫ������
		/// </summary>
		public bool is_balance
		{
			set{ _is_balance=value;}
			get{return _is_balance;}
		}
		/// <summary>
		/// ����ʱ��
		/// </summary>
		public DateTime balance_date
		{
			set{ _balance_date=value;}
			get{return _balance_date;}
		}
		/// <summary>
		/// ���㷽ʽ
		/// </summary>
		public int balance_type
		{
			set{ _balance_type=value;}
			get{return _balance_type;}
		}
		/// <summary>
		/// �Ƿ񹫿�
		/// </summary>
		public string is_public
		{
			set{ _is_public=value;}
			get{return _is_public;}
		}
		/// <summary>
		/// ���Ʒ�ʽ
		/// </summary>
		public string schedule_type
		{
			set{ _schedule_type=value;}
			get{return _schedule_type;}
		}
		/// <summary>
		/// �����
		/// </summary>
		public int counter
		{
			set{ _counter=value;}
			get{return _counter;}
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
		/// �Ƿ񼤻�
		/// </summary>
		public bool is_visible
		{
			set{ _is_visible=value;}
			get{return _is_visible;}
		}
		/// <summary>
		/// �Ƿ񴴽�
		/// </summary>
		public bool is_create
		{
			set{ _is_create=value;}
			get{return _is_create;}
		}
		/// <summary>
		/// �Ƿ���Ч
		/// </summary>
		public bool active
		{
			set{ _active=value;}
			get{return _active;}
		}

        /// <summary>
        /// �ɷ�˵��
        /// </summary>
        public string pay_description
        {
            get { return _pay_description; }
            set { _pay_description = value; }
        }

        /// <summary>
        /// ����ʱ����ɷ�
        /// </summary>
        public bool is_pay_need
        {
            get { return _is_pay_need; }
            set { _is_pay_need = value; }
        }

        /// <summary>
        /// �ɷѽ��
        /// </summary>
        public decimal pay_nbr
        {
            get { return _pay_nbr; }
            set { _pay_nbr = value; }
        }

        /// <summary>
        /// γ��
        /// </summary>
        public double lat
        {
            get { return _lat; }
            set { _lat = value; }
        }

        /// <summary>
        /// ����
        /// </summary>
        public double lng
        {
            get { return _lng; }
            set { _lng = value; }
        }
		#endregion Model

        #region extend
        public string original_name
        {
            get;
            set;
        }
        #endregion
    }
}

