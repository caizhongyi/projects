using System;
namespace WanerDao2.WanerDaoModel.Activity.Common
{
	/// <summary>
	/// ʵ����autocarpool ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class autocarpool
	{
		public autocarpool()
		{}
		#region Model
		private string _id;
		private string _active_id;
		private string _owner_id;
		private string _carpool_id;
		private int _is_pass;
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
		public string active_id
		{
			set{ _active_id=value;}
			get{return _active_id;}
		}
		/// <summary>
		/// ������
		/// </summary>
		public string owner_id
		{
			set{ _owner_id=value;}
			get{return _owner_id;}
		}
		/// <summary>
		/// ���
		/// </summary>
		public string carpool_id
		{
			set{ _carpool_id=value;}
			get{return _carpool_id;}
		}
		/// <summary>
		/// �Ƿ�ͨ������0ͨ��1�ܾ�2���
		/// </summary>
		public int is_pass
		{
			set{ _is_pass=value;}
			get{return _is_pass;}
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
        private string _carpool_name;
        /// <summary>
        /// �����
        /// </summary>
        public string carpool_name
        {
            set { _carpool_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_carpool_name))
                    return _carpool_name;
                return GetActivityConfigTableDataName.GetName(_carpool_id);
            }
        }

        private string _owner_name;

        /// <summary>
        /// ������
        /// </summary>
        public string owner_name
        {
            set { _carpool_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_owner_name))
                    return _carpool_name;
                return GetActivityConfigTableDataName.GetName(owner_id);
            }
        }
        #endregion
	}
}

