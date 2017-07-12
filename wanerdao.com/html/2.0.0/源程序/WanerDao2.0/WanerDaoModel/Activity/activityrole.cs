using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activityrole 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activityrole
	{
		public activityrole()
		{}
		#region Model
		private string _id;
		private string _role_name;
		private string _description;
		private int _level;
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
		/// 角色名字
		/// </summary>
		public string role_name
		{
			set{ _role_name=value;}
			get{return _role_name;}
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
		/// 管理级别
		/// </summary>
		public int level
		{
			set{ _level=value;}
			get{return _level;}
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

