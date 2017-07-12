using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����actioncategory ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class actioncategory
	{
		public actioncategory()
		{}
		#region Model
		private string _id;
		private string _action_id;
		private string _category_id;
		private string _table_id;
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
		/// ������
		/// </summary>
		public string action_id
		{
			set{ _action_id=value;}
			get{return _action_id;}
		}
		/// <summary>
		/// ����
		/// </summary>
		public string category_id
		{
			set{ _category_id=value;}
			get{return _category_id;}
		}
		/// <summary>
		/// ����
		/// </summary>
		public string table_id
		{
			set{ _table_id=value;}
			get{return _table_id;}
		}
		/// <summary>
		/// ����ʱ��
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

	}
}

