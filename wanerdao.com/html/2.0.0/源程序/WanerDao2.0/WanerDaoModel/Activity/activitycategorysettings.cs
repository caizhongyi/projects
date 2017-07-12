using System;
using System.Collections.Generic;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activitycategorysettings 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activitycategorysettings
	{
		public activitycategorysettings()
		{}
		#region Model
		private string _id;
		private string _parent_id;
		private string _category_name;
		private string _logo_path;
		private DateTime _update_date;
		private string _language_id;
		private bool _active;
        private int _section_type_id;
		/// <summary>
		/// 分类号
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 父类名
		/// </summary>
		public string parent_id
		{
			set{ _parent_id=value;}
			get{return _parent_id;}
		}
		/// <summary>
		/// 分类名
		/// </summary>
		public string category_name
		{
			set{ _category_name=value;}
			get{return _category_name;}
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
        /// section_type类型 -1:父类 1:时令 2：一般 3：自定义
        /// </summary>
        public int section_type_id
        {
            set { _section_type_id = value; }
            get { return _section_type_id; }
        }
		#endregion Model

        #region  扩展
        private bool _istop;
        /// <summary>
        /// 是否顶层节点
        /// </summary>
        public bool istop
        {
            set { _istop = value; }
            get { return _istop; }
        }

        private bool _isbottom;
        /// <summary>
        /// 是否底层节点
        /// </summary>
        public bool isbottom
        {
            set { _isbottom = value; }
            get { return _isbottom; }
        }

        private activitycategorysettings _parent;
        /// <summary>
        /// 父亲节点
        /// </summary>
        public activitycategorysettings parent
        {
            set { _parent = value; }
            get { return _parent; }
        }

        private List<activitycategorysettings> _child;
        /// <summary>
        /// 孩子节点
        /// </summary>
        public List<activitycategorysettings> child
        {
            set { _child = value; }
            get { return _child; }
        }

        #endregion

	}
}

