using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activitymoneyflowattachedfile ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activitymoneyflowattachedfile
	{
		public activitymoneyflowattachedfile()
		{}
		#region Model
		private string _id;
		private string _activity_id;
		private string _money_flow_id;
		private string _store_path;
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
		/// ʵ��֧����
		/// </summary>
		public string money_flow_id
		{
			set{ _money_flow_id=value;}
			get{return _money_flow_id;}
		}
		/// <summary>
		/// ���������ַ
		/// </summary>
		public string store_path
		{
			set{ _store_path=value;}
			get{return _store_path;}
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

	}
}

