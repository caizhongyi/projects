using System;
namespace WanerDao2.WanerDaoModel.Activity.Common
{
	/// <summary>
	///  µÃÂ¿‡playtype 
	/// </summary>
	[Serializable]
	public class playtype
	{
		public playtype()
		{}
		#region Model
		private string _id;
		private string _play_type;
		private string _description;
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
		public string play_type
		{
			set{ _play_type=value;}
			get{return _play_type;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string description
		{
			set{ _description=value;}
			get{return _description;}
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

