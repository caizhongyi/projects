using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activitysectionpage ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activitysectionpage
	{
		public activitysectionpage()
		{}
		#region Model
		private string _id;
		private string _category_id;
		private string _section_name;
		private string _section_description;
		private string _logo_path;
		private int _sequence;
		private DateTime _update_date;
		private string _language_id;
		private bool _active;
        private int _section_type_id;
		/// <summary>
		/// ���к�
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// ��Ӧ��ǩ�����
		/// </summary>
		public string category_id
		{
			set{ _category_id=value;}
			get{return _category_id;}
		}
		/// <summary>
		/// ��������
		/// </summary>
		public string section_name
		{
			set{ _section_name=value;}
			get{return _section_name;}
		}
		/// <summary>
		/// ��������
		/// </summary>
		public string section_description
		{
			set{ _section_description=value;}
			get{return _section_description;}
		}
		/// <summary>
		/// ͼ��洢��ַ
		/// </summary>
		public string logo_path
		{
			set{ _logo_path=value;}
			get{return _logo_path;}
		}
		/// <summary>
		/// ˳��
		/// </summary>
		public int sequence
		{
			set{ _sequence=value;}
			get{return _sequence;}
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
        /// <summary>
        /// section_type���� -1:���� һ��Ϊ1��ʱ��Ϊ2���Զ���Ϊ3
        /// </summary>
        public int section_type_id
        {
            set { _section_type_id = value; }
            get { return _section_type_id; }
        }
		#endregion Model

	}
}

