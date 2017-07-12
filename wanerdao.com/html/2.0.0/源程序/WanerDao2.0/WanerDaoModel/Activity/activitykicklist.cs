using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activitykicklist 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activitykicklist
	{
		public activitykicklist()
		{}
		#region Model
		private string _id;
		private string _active_id;
		private string _user_id;
		private DateTime _kick_date;
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
		public string active_id
		{
			set{ _active_id=value;}
			get{return _active_id;}
		}
		/// <summary>
		/// 用户号
		/// </summary>
		public string user_id
		{
			set{ _user_id=value;}
			get{return _user_id;}
		}
		/// <summary>
		/// 踢出时间
		/// </summary>
		public DateTime kick_date
		{
			set{ _kick_date=value;}
			get{return _kick_date;}
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

