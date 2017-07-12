using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activitysectionpage 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activitysectionpage
	{
		public activitysectionpage()
		{}
		#region Model
		private string _id;
		private string _category_id;
		private string _section_name;
		private string _section_description;
		private string _logo_path;
		private int _sequence;
		private DateTime _update_date;
		private string _language_id;
		private bool _active;
        private int _section_type_id;
		/// <summary>
		/// 序列号
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 对应标签分类号
		/// </summary>
		public string category_id
		{
			set{ _category_id=value;}
			get{return _category_id;}
		}
		/// <summary>
		/// 分类名字
		/// </summary>
		public string section_name
		{
			set{ _section_name=value;}
			get{return _section_name;}
		}
		/// <summary>
		/// 分类描述
		/// </summary>
		public string section_description
		{
			set{ _section_description=value;}
			get{return _section_description;}
		}
		/// <summary>
		/// 图标存储地址
		/// </summary>
		public string logo_path
		{
			set{ _logo_path=value;}
			get{return _logo_path;}
		}
		/// <summary>
		/// 顺序
		/// </summary>
		public int sequence
		{
			set{ _sequence=value;}
			get{return _sequence;}
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
        /// <summary>
        /// section_type类型 -1:父类 一般为1，时令为2，自定义为3
        /// </summary>
        public int section_type_id
        {
            set { _section_type_id = value; }
            get { return _section_type_id; }
        }
		#endregion Model

	}
}

