using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activityrole ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activityrole
	{
		public activityrole()
		{}
		#region Model
		private string _id;
		private string _role_name;
		private string _description;
		private int _level;
		private DateTime _update_date;
		private string _language_id;
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
		/// ��ɫ����
		/// </summary>
		public string role_name
		{
			set{ _role_name=value;}
			get{return _role_name;}
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
		/// ������
		/// </summary>
		public int level
		{
			set{ _level=value;}
			get{return _level;}
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
		#endregion Model

	}
}

