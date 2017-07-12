using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activityplan ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activityplan
	{
		public activityplan()
		{}
		#region Model
		private string _id;
		private string _activity_id;
		private DateTime _start_date;
		private DateTime _end_date;
		private string _plan_content;
		private string _note;
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
		/// �ƻ��ʼʱ��
		/// </summary>
		public DateTime start_date
		{
			set{ _start_date=value;}
			get{return _start_date;}
		}
		/// <summary>
		/// �ƻ������ʱ��
		/// </summary>
		public DateTime end_date
		{
			set{ _end_date=value;}
			get{return _end_date;}
		}
		/// <summary>
		/// �ƻ�����
		/// </summary>
		public string plan_content
		{
			set{ _plan_content=value;}
			get{return _plan_content;}
		}
		/// <summary>
		/// ��ע
		/// </summary>
		public string note
		{
			set{ _note=value;}
			get{return _note;}
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

