using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activitymoneyflowope ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activitymoneyflowope
	{
		public activitymoneyflowope()
		{}
		#region Model
		private string _id;
		private string _activity_id;
		private string _money_flow_id;
		private string _ope_id;
		private DateTime _ope_date;
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
		/// ִ���˺�
		/// </summary>
		public string ope_id
		{
			set{ _ope_id=value;}
			get{return _ope_id;}
		}
		/// <summary>
		/// ִ��ʱ��
		/// </summary>
		public DateTime ope_date
		{
			set{ _ope_date=value;}
			get{return _ope_date;}
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
        /// Ԥ��������
        /// </summary>
        public string opt_name;
		#endregion Model

	}
}

