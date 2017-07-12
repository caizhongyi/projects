using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activitycategory ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activitycategory
	{
		public activitycategory()
		{}
		#region Model
		private string _id;
		private string _activity_id;
		private string _category_id;
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
		/// �����
		/// </summary>
		public string category_id
		{
			set{ _category_id=value;}
			get{return _category_id;}
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
        private string _category_name;

        /// <summary>
        /// ������
        /// </summary>
        public string category_name
        {
            set { _category_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_category_name))
                    return _category_name;
                return GetActivityConfigTableDataName.GetName(_category_id);
            }
        }

        #endregion

	}
}

