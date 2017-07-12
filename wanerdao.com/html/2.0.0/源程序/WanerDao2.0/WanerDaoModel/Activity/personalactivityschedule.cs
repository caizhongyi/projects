using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����personalactivityschedule ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class personalactivityschedule:ICloneable
	{
		public personalactivityschedule()
		{}
		#region Model
		private string _id;
		private string _user_id;
		private string _activity_id;
		private bool _is_build_directly;
		private DateTime _begin_date;
		private int _email_pre_date;
		private bool _is_notice;
		private int _notice_pre_date;
		private bool _is_email;
		private bool _is_fixed_schedule;
		private int _fix_schedule;
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
		/// activity_id
		/// </summary>
		public string activity_id
		{
			set{ _activity_id=value;}
			get{return _activity_id;}
		}
		/// <summary>
        /// ʱ�䵽�Ƿ�ֱ�ӽ���
		/// </summary>
		public bool is_build_directly
		{
			set{ _is_build_directly=value;}
			get{return _is_build_directly;}
		}
		/// <summary>
        /// ���ڿ�ʼʱ��
		/// </summary>
		public DateTime begin_date
		{
			set{ _begin_date=value;}
			get{return _begin_date;}
		}
		
		/// <summary>
        /// �Ƿ�վ����Ϣ����
		/// </summary>
		public bool is_notice
		{
			set{ _is_notice=value;}
			get{return _is_notice;}
		}
		/// <summary>
        /// notice��ǰ֪ͨʱ��
		/// </summary>
		public int notice_pre_date
		{
			set{ _notice_pre_date=value;}
			get{return _notice_pre_date;}
		}
		/// <summary>
        /// �Ƿ��ʼ�����
		/// </summary>
		public bool is_email
		{
			set{ _is_email=value;}
			get{return _is_email;}
		}
        /// <summary>
        /// email��ǰ֪ͨʱ��
        /// </summary>
        public int email_pre_date
        {
            set { _email_pre_date = value; }
            get { return _email_pre_date; }
        }
		/// <summary>
        /// �Ƿ�̶�����
		/// </summary>
		public bool is_fixed_schedule
		{
			set{ _is_fixed_schedule=value;}
			get{return _is_fixed_schedule;}
		}
		/// <summary>
        /// �̶�����
		/// </summary>
		public int fix_schedule
		{
			set{ _fix_schedule=value;}
			get{return _fix_schedule;}
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

        #region  extend
        public string user_name
        {
            get;
            set;
        }

        #endregion


        #region ICloneable ��Ա

        public object Clone()
        {
            return this.MemberwiseClone();
        }

        #endregion
    }
}

