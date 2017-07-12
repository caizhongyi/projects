using System;
namespace WanerDao2.WanerDaoModel.Activity.Common
{
	/// <summary>
	/// 实体类autobrand 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class autobrand
	{
		public autobrand()
		{}
		#region Model
		private string _id;
		private string _company_id;
		private string _brand_name;
		private string _description;
		private string _logo_path;
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
		/// 公司号
		/// </summary>
		public string company_id
		{
			set{ _company_id=value;}
			get{return _company_id;}
		}
		/// <summary>
		/// 品牌名字
		/// </summary>
		public string brand_name
		{
			set{ _brand_name=value;}
			get{return _brand_name;}
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
		/// 品牌图标存储地址
		/// </summary>
		public string logo_path
		{
			set{ _logo_path=value;}
			get{return _logo_path;}
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

