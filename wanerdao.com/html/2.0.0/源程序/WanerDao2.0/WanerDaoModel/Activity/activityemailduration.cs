using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activityemailduration ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activityemailduration
	{
		public activityemailduration()
		{}
		#region Model
		private string _id;
		private string _duration_name;
		private double _unit_hour;
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
		/// ������
		/// </summary>
		public string duration_name
		{
			set{ _duration_name=value;}
			get{return _duration_name;}
		}
		/// <summary>
		/// ��λСʱ
		/// </summary>
		public double unit_hour
		{
			set{ _unit_hour=value;}
			get{return _unit_hour;}
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

