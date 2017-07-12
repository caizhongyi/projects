using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activitypostsdraft 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activitypostsdraft
	{
		public activitypostsdraft()
		{}
		#region Model
		private string _id;
		private string _user_id;
		private string _title;
		private string _content;
		private bool _is_system;
		private DateTime _save_date;
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
		/// 用户号
		/// </summary>
		public string user_id
		{
			set{ _user_id=value;}
			get{return _user_id;}
		}
		/// <summary>
		/// 标题
		/// </summary>
		public string title
		{
			set{ _title=value;}
			get{return _title;}
		}
		/// <summary>
		/// 内容
		/// </summary>
		public string content
		{
			set{ _content=value;}
			get{return _content;}
		}
		/// <summary>
		/// 是否系统自建
		/// </summary>
		public bool is_system
		{
			set{ _is_system=value;}
			get{return _is_system;}
		}
		/// <summary>
		/// 保存时间
		/// </summary>
		public DateTime save_date
		{
			set{ _save_date=value;}
			get{return _save_date;}
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

