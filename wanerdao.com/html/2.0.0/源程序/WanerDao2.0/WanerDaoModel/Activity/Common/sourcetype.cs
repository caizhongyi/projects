using System;
namespace WanerDao2.WanerDaoModel.Activity.Common
{
	/// <summary>
	/// 实体类sourcetype 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class sourcetype
	{
		public sourcetype()
		{}
		#region Model
		private string _id;
		private string _parent_id;
		private string _type_name;
		private DateTime _update_date;
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
		/// parent_id
		/// </summary>
		public string parent_id
		{
			set{ _parent_id=value;}
			get{return _parent_id;}
		}
		/// <summary>
		/// type_name
		/// </summary>
		public string type_name
		{
			set{ _type_name=value;}
			get{return _type_name;}
		}
		/// <summary>
		/// update_date
		/// </summary>
		public DateTime update_date
		{
			set{ _update_date=value;}
			get{return _update_date;}
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

