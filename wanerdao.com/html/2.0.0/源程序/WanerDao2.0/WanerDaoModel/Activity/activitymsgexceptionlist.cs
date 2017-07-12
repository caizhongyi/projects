using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activitymsgexceptionlist ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activitymsgexceptionlist
	{
		public activitymsgexceptionlist()
		{}
		#region Model
		private string _id;
		private string _user_id;
		private string _activity_id;
		private string _special_id;
		private DateTime _update_date;
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
		/// �û���
		/// </summary>
		public string user_id
		{
			set{ _user_id=value;}
			get{return _user_id;}
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
		/// �����û���
		/// </summary>
		public string special_id
		{
			set{ _special_id=value;}
			get{return _special_id;}
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
		/// �Ƿ���Ч
		/// </summary>
		public bool active
		{
			set{ _active=value;}
			get{return _active;}
		}
		#endregion Model

        #region  ��չ
        private string _special_name;
        /// <summary>
        /// �����û���
        /// </summary>
        public string special_name
        {
            set { _special_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_special_name))
                    return _special_name;
                return GetActivityConfigTableDataName.GetName(_special_id);
            }
        }


        #endregion

	}
}

