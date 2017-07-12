using System;
namespace WanerDao2.WanerDaoModel.Activity.Common.Common
{
	/// <summary>
	///  µÃÂ¿‡parktype 
	/// </summary>
	[Serializable]
	public class parktype
	{
		public parktype()
		{}
		#region Model
		private string _id;
		private string _type_name;
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
		public string type_name
		{
			set{ _type_name=value;}
			get{return _type_name;}
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

