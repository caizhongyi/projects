using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activityjoinconditions ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activityjoinconditions
	{
		public activityjoinconditions()
		{}
		#region Model
		private string _id;
		private string _activity_id;
		private string _condition_id;
		private string _value;
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
		/// ���
		/// </summary>
		public string activity_id
		{
			set{ _activity_id=value;}
			get{return _activity_id;}
		}
		/// <summary>
		/// ������
		/// </summary>
		public string condition_id
		{
			set{ _condition_id=value;}
			get{return _condition_id;}
		}
		/// <summary>
		/// ����ֵ
		/// </summary>
		public string value
		{
			set{ _value=value;}
			get{return _value;}
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
        private string _condition_name;

        /// <summary>
        /// ����������
        /// </summary>
        public string condition_name
        {
            set { _condition_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_condition_name))
                    return _condition_name;
                return GetActivityConfigTableDataName.GetName(condition_id);
            }
        }

        #endregion

	}
}

