using System;
namespace WanerDao2.WanerDaoModel.Activity.Common
{
	/// <summary>
	/// 实体类carpoolkicklist 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class carpoolkicklist
	{
		public carpoolkicklist()
		{}
		#region Model
		private string _id;
		private string _carpool_id;
		private string _user_id;
		private DateTime _kick_date;
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
		/// 搭车序列号
		/// </summary>
		public string carpool_id
		{
			set{ _carpool_id=value;}
			get{return _carpool_id;}
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
		/// 踢出时间
		/// </summary>
		public DateTime kick_date
		{
			set{ _kick_date=value;}
			get{return _kick_date;}
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

