using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activitypostsdraft ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activitypostsdraft
	{
		public activitypostsdraft()
		{}
		#region Model
		private string _id;
		private string _user_id;
		private string _title;
		private string _content;
		private bool _is_system;
		private DateTime _save_date;
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
		/// ����
		/// </summary>
		public string title
		{
			set{ _title=value;}
			get{return _title;}
		}
		/// <summary>
		/// ����
		/// </summary>
		public string content
		{
			set{ _content=value;}
			get{return _content;}
		}
		/// <summary>
		/// �Ƿ�ϵͳ�Խ�
		/// </summary>
		public bool is_system
		{
			set{ _is_system=value;}
			get{return _is_system;}
		}
		/// <summary>
		/// ����ʱ��
		/// </summary>
		public DateTime save_date
		{
			set{ _save_date=value;}
			get{return _save_date;}
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

