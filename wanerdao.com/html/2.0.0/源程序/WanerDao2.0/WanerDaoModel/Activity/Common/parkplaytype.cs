using System;
namespace WanerDao2.WanerDaoModel.Activity.Common.Common
{
	/// <summary>
	///  µÃÂ¿‡parkplaytype 
	/// </summary>
	[Serializable]
	public class parkplaytype
	{
		public parkplaytype()
		{}
		#region Model
		private string _id;
		private string _park_id;
		private string _park_name;
		private string _play_type_id;
		private string _play_type_name;
		private DateTime _update_date;
		private string _language_id;
		private int _active;
		/// <summary>
		/// 
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string park_id
		{
			set{ _park_id=value;}
			get{return _park_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string park_name
		{
			set{ _park_name=value;}
			get{return _park_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string play_type_id
		{
			set{ _play_type_id=value;}
			get{return _play_type_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string play_type_name
		{
			set{ _play_type_name=value;}
			get{return _play_type_name;}
		}
		/// <summary>
		/// on update CURRENT_DateTime
		/// </summary>
		public DateTime update_date
		{
			set{ _update_date=value;}
			get{return _update_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string language_id
		{
			set{ _language_id=value;}
			get{return _language_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int active
		{
			set{ _active=value;}
			get{return _active;}
		}
		#endregion Model

	}
}

