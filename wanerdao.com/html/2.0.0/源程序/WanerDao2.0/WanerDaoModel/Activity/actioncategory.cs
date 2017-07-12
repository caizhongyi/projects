using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类actioncategory 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class actioncategory
	{
		public actioncategory()
		{}
		#region Model
		private string _id;
		private string _action_id;
		private string _category_id;
		private string _table_id;
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
		/// 动作号
		/// </summary>
		public string action_id
		{
			set{ _action_id=value;}
			get{return _action_id;}
		}
		/// <summary>
		/// 类别号
		/// </summary>
		public string category_id
		{
			set{ _category_id=value;}
			get{return _category_id;}
		}
		/// <summary>
		/// 表名
		/// </summary>
		public string table_id
		{
			set{ _table_id=value;}
			get{return _table_id;}
		}
		/// <summary>
		/// 更新时间
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
		#endregion Model

	}
}

