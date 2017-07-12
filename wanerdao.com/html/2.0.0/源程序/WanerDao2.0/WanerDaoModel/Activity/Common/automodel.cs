using System;
namespace WanerDao2.WanerDaoModel.Activity.Common
{
	/// <summary>
	/// 实体类automodel 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class automodel
	{
		public automodel()
		{}
		#region Model
		private string _id;
		private string _brand_id;
		private string _model_name;
		private string _image_path;
		private string _description;
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
		/// 品牌号
		/// </summary>
		public string brand_id
		{
			set{ _brand_id=value;}
			get{return _brand_id;}
		}
		/// <summary>
		/// 型号名
		/// </summary>
		public string model_name
		{
			set{ _model_name=value;}
			get{return _model_name;}
		}
		/// <summary>
		/// 型号图片存储路径
		/// </summary>
		public string image_path
		{
			set{ _image_path=value;}
			get{return _image_path;}
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

