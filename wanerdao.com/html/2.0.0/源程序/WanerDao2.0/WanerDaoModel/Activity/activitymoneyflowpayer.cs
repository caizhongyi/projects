using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activitymoneyflowpayer ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activitymoneyflowpayer
	{
		public activitymoneyflowpayer()
		{}
		#region Model
		private string _id;
		private string _activity_id;
		private string _money_flow_id;
		private string _member_id;
		private DateTime _add_date;
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
		/// �ֽ�����
		/// </summary>
		public string money_flow_id
		{
			set{ _money_flow_id=value;}
			get{return _money_flow_id;}
		}
		/// <summary>
		/// ���������
		/// </summary>
		public string member_id
		{
			set{ _member_id=value;}
			get{return _member_id;}
		}
		/// <summary>
		/// ���ʱ��
		/// </summary>
		public DateTime add_date
		{
			set{ _add_date=value;}
			get{return _add_date;}
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
        /// ������Ա����
        /// </summary>
        public string member_name;
		#endregion Model

	}
}

