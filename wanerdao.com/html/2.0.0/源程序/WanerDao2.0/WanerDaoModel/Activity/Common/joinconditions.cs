using System;
namespace WanerDao2.WanerDaoModel.Activity.Common
{
	/// <summary>
	/// 实体类joinconditions 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class joinconditions
	{
		public joinconditions()
		{}
		#region Model
		private string _id;
		private string _condition_name;
		private DateTime _update_date;
		private string _language_id;
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
		/// condition_name
		/// </summary>
		public string condition_name
		{
			set{ _condition_name=value;}
			get{return _condition_name;}
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
		/// language_id
		/// </summary>
		public string language_id
		{
			set{ _language_id=value;}
			get{return _language_id;}
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

