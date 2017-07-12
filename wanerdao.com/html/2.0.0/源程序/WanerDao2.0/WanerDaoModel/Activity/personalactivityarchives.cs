using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类personalactivityarchives 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class personalactivityarchives
	{
		public personalactivityarchives()
		{}
		#region Model
		private string _id;
		private string _user_id;
		private string _activity_id;
		private string _save_name;
		private DateTime _save_date;
		private bool _active;
		/// <summary>
		/// id
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// user_id
		/// </summary>
		public string user_id
		{
			set{ _user_id=value;}
			get{return _user_id;}
		}
		/// <summary>
		/// activity_id
		/// </summary>
		public string activity_id
		{
			set{ _activity_id=value;}
			get{return _activity_id;}
		}
		/// <summary>
		/// save_name
		/// </summary>
		public string save_name
		{
			set{ _save_name=value;}
			get{return _save_name;}
		}
		/// <summary>
		/// save_date
		/// </summary>
		public DateTime save_date
		{
			set{ _save_date=value;}
			get{return _save_date;}
		}
		/// <summary>
		/// active
		/// </summary>
		public bool active
		{
			set{ _active=value;}
			get{return _active;}
		}
		#endregion Model

	}
}

