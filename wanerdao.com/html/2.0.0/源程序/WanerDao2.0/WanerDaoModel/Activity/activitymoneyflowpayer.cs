using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activitymoneyflowpayer 。(属性说明自动提取数据库字段的描述信息)
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
		/// 现金流号
		/// </summary>
		public string money_flow_id
		{
			set{ _money_flow_id=value;}
			get{return _money_flow_id;}
		}
		/// <summary>
		/// 相关人名号
		/// </summary>
		public string member_id
		{
			set{ _member_id=value;}
			get{return _member_id;}
		}
		/// <summary>
		/// 添加时间
		/// </summary>
		public DateTime add_date
		{
			set{ _add_date=value;}
			get{return _add_date;}
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
        /// 付款人员名字
        /// </summary>
        public string member_name;
		#endregion Model

	}
}

