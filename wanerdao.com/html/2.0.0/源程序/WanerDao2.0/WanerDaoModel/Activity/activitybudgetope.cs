using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activitybudgetope 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activitybudgetope
	{
		public activitybudgetope()
		{}
		#region Model
		private string _id;
		private string _activity_id;
		private string _budget_id;
		private string _ope_id;
		private DateTime _update_date;
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
		/// 预算号
		/// </summary>
		public string budget_id
		{
			set{ _budget_id=value;}
			get{return _budget_id;}
		}
		/// <summary>
		/// 执行人号
		/// </summary>
		public string ope_id
		{
			set{ _ope_id=value;}
			get{return _ope_id;}
		}
		/// <summary>
		/// 数据更新时间
		/// </summary>
		public DateTime update_date
		{
			set{ _update_date=value;}
			get{return _update_date;}
		}
		/// <summary>
		/// 是否有效
		/// </summary>
		public bool active
		{
			set{ _active=value;}
			get{return _active;}
		}
        /// <summary>
        /// 预算人名字
        /// </summary>
        public string opt_name;
		#endregion Model

	}
}

