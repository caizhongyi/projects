using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activitymoneyflow ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activitymoneyflow
	{
		public activitymoneyflow()
		{}
		#region Model
		private string _id;
		private string _activity_id;
		private string _match_budget_id;
		private string _item_content;
		private string _description;
		private bool _is_in;
		private double _sum_cost;
		private string _money_ope_id;
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
		/// ƥ��Ԥ���
		/// </summary>
		public string match_budget_id
		{
			set{ _match_budget_id=value;}
			get{return _match_budget_id;}
		}
		/// <summary>
		/// ��Ŀ
		/// </summary>
		public string item_content
		{
			set{ _item_content=value;}
			get{return _item_content;}
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
		/// �Ƿ��գ�������֧��
		/// </summary>
		public bool is_in
		{
			set{ _is_in=value;}
			get{return _is_in;}
		}
		/// <summary>
		/// �ܽ��
		/// </summary>
		public double sum_cost
		{
			set{ _sum_cost=value;}
			get{return _sum_cost;}
		}
		/// <summary>
		/// ����Ա��
		/// </summary>
		public string money_ope_id
		{
			set{ _money_ope_id=value;}
			get{return _money_ope_id;}
		}
		/// <summary>
		/// ����ʱ��
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
		#endregion Model

	}
}

