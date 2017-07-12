using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activityemailduration 。(属性说明自动提取数据库字段的描述信息)
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
		/// 序列号
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 周期名
		/// </summary>
		public string duration_name
		{
			set{ _duration_name=value;}
			get{return _duration_name;}
		}
		/// <summary>
		/// 单位小时
		/// </summary>
		public double unit_hour
		{
			set{ _unit_hour=value;}
			get{return _unit_hour;}
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
		/// 语言号
		/// </summary>
		public string language_id
		{
			set{ _language_id=value;}
			get{return _language_id;}
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

