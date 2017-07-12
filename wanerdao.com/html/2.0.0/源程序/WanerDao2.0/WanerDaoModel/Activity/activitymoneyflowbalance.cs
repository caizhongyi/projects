using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activitymoneyflowbalance 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activitymoneyflowbalance
	{
		public activitymoneyflowbalance()
		{}
		#region Model
		private string _id;
		private string _activity_id;
		private double _balance_nbr;
		private bool _is_balance;
		private string _member_id;
		private DateTime _process_date;
		private string _ope_id;
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
		/// 结算金额
		/// </summary>
		public double balance_nbr
		{
			set{ _balance_nbr=value;}
			get{return _balance_nbr;}
		}
		/// <summary>
		/// 是否结算
		/// </summary>
		public bool is_balance
		{
			set{ _is_balance=value;}
			get{return _is_balance;}
		}
		/// <summary>
		/// 对象人号
		/// </summary>
		public string member_id
		{
			set{ _member_id=value;}
			get{return _member_id;}
		}
		/// <summary>
		/// 处理时间
		/// </summary>
		public DateTime process_date
		{
			set{ _process_date=value;}
			get{return _process_date;}
		}
		/// <summary>
		/// 财务人员号
		/// </summary>
		public string ope_id
		{
			set{ _ope_id=value;}
			get{return _ope_id;}
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

