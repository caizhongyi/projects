using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activitybudget ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activitybudget
	{
		public activitybudget()
		{}
		#region Model
		private string _id;
		private string _activity_id;
		private string _item_description;
		private string _item_content;
		private bool _is_in;
		private double _budget_money;
		private int _conver_unit;
		private string _cover_note;
		private string _create_id;
		private DateTime _create_date;
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
		/// ��ϸ����
		/// </summary>
		public string item_description
		{
			set{ _item_description=value;}
			get{return _item_description;}
		}
		/// <summary>
		/// �ɷ���Ŀ
		/// </summary>
		public string item_content
		{
			set{ _item_content=value;}
			get{return _item_content;}
		}
		/// <summary>
		/// �Ƿ���
		/// </summary>
		public bool is_in
		{
			set{ _is_in=value;}
			get{return _is_in;}
		}
		/// <summary>
		/// Ԥ����
		/// </summary>
		public double budget_money
		{
			set{ _budget_money=value;}
			get{return _budget_money;}
		}
		/// <summary>
		/// ���ǵ�λ
		/// </summary>
		public int conver_unit
		{
			set{ _conver_unit=value;}
			get{return _conver_unit;}
		}
		/// <summary>
		/// ����˵��
		/// </summary>
		public string cover_note
		{
			set{ _cover_note=value;}
			get{return _cover_note;}
		}
		/// <summary>
		/// ����Ա��
		/// </summary>
		public string create_id
		{
			set{ _create_id=value;}
			get{return _create_id;}
		}
		/// <summary>
		/// ����ʱ��
		/// </summary>
		public DateTime create_date
		{
			set{ _create_date=value;}
			get{return _create_date;}
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
        private string _activity_name;
        /// <summary>
        /// ���
        /// </summary>
        public string activity_name
        {
            set { _activity_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_activity_name))
                    return _activity_name;
                return GetActivityConfigTableDataName.GetName(_activity_id);
            }
        }

        private string _create_name;

        /// <summary>
        /// ������
        /// </summary>
        public string create_name
        {
            set { _create_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_create_name))
                    return _create_name;
                return GetActivityConfigTableDataName.GetName(_create_id);
            }
        }
        #endregion
        



	}
}

