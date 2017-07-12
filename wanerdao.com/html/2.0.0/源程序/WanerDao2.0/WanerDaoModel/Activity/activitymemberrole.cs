using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
    /// ʵ����activitymemberrole ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activitymemberrole
	{
        public activitymemberrole()
		{}
		#region Model
		private string _id;
		private string _activity_id;
        private string _member_id;
        private string  _role_id;
        private DateTime _add_date;
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
		/// ���
		/// </summary>
		public string activity_id
		{
			set{ _activity_id=value;}
			get{return _activity_id;}
		}
		/// <summary>
        /// ���������
		/// </summary>
        public string member_id
		{
            set { _member_id = value; }
            get { return _member_id; }
		}
		/// <summary>
		/// ��ɫ��
		/// </summary>
        public string role_id
		{
            set { _role_id = value; }
            get { return _role_id; }
		}
		/// <summary>
		/// ִ��ʱ��
		/// </summary>
        public DateTime add_date
		{
            set { _add_date = value; }
            get { return _add_date; }
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

        #region extend

        private string _role_name = string.Empty;
        /// <summary>
        /// ��ɫ����
        /// </summary>
        public string role_name
        {
            set { _role_name = value; }
            get { return _role_name; }
        }

        public string user_id = string.Empty;
        public string user_name = string.Empty;
        public string email = string.Empty;
        public string phone = string.Empty;
        #endregion
    }
}

