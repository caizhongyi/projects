using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activitymoneyflow 。(属性说明自动提取数据库字段的描述信息)
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
		/// 序列号
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 活动号
		/// </summary>
		public string activity_id
		{
			set{ _activity_id=value;}
			get{return _activity_id;}
		}
		/// <summary>
		/// 匹配预算号
		/// </summary>
		public string match_budget_id
		{
			set{ _match_budget_id=value;}
			get{return _match_budget_id;}
		}
		/// <summary>
		/// 名目
		/// </summary>
		public string item_content
		{
			set{ _item_content=value;}
			get{return _item_content;}
		}
		/// <summary>
		/// 描述
		/// </summary>
		public string description
		{
			set{ _description=value;}
			get{return _description;}
		}
		/// <summary>
		/// 是否收（区分收支）
		/// </summary>
		public bool is_in
		{
			set{ _is_in=value;}
			get{return _is_in;}
		}
		/// <summary>
		/// 总金额
		/// </summary>
		public double sum_cost
		{
			set{ _sum_cost=value;}
			get{return _sum_cost;}
		}
		/// <summary>
		/// 财务员号
		/// </summary>
		public string money_ope_id
		{
			set{ _money_ope_id=value;}
			get{return _money_ope_id;}
		}
		/// <summary>
		/// 操作时间
		/// </summary>
		public DateTime ope_date
		{
			set{ _ope_date=value;}
			get{return _ope_date;}
		}
		/// <summary>
		/// 是否有效
		/// </summary>
		public bool active
		{
			set{ _active=value;}
			get{return _active;}
		}
		#endregion Model

	}
}

