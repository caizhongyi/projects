using System;
namespace WanerDao2.WanerDaoModel.Activity.Common
{
	/// <summary>
	/// ʵ����carpoolkicklist ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class carpoolkicklist
	{
		public carpoolkicklist()
		{}
		#region Model
		private string _id;
		private string _carpool_id;
		private string _user_id;
		private DateTime _kick_date;
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
		/// ����к�
		/// </summary>
		public string carpool_id
		{
			set{ _carpool_id=value;}
			get{return _carpool_id;}
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
		/// �߳�ʱ��
		/// </summary>
		public DateTime kick_date
		{
			set{ _kick_date=value;}
			get{return _kick_date;}
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

