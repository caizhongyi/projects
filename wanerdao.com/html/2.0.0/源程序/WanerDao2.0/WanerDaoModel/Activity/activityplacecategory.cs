using System;
using System.Collections.Generic;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activityplacecategory 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activityplacecategory
	{
		public activityplacecategory()
		{}
		#region Model
		private string _id;
		private string _parent_id;
		private string _category_name;
		private DateTime _update_date;
		private string _map_table;
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
		/// 父类号
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
		/// 数据更新时间
		/// </summary>
		public DateTime update_date
		{
			set{ _update_date=value;}
			get{return _update_date;}
		}
		/// <summary>
		/// 对应数据表名
		/// </summary>
		public string map_table
		{
			set{ _map_table=value;}
			get{return _map_table;}
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

        private activityplacecategory _parent;
        /// <summary>
        /// 父亲节点
        /// </summary>
        public activityplacecategory parent
        {
            set { _parent = value; }
            get { return _parent; }
        }

        private List<activityplacecategory> _child;
        /// <summary>
        /// 孩子节点
        /// </summary>
        public List<activityplacecategory> child
        {
            set { _child = value; }
            get { return _child; }
        }

        #endregion

	}
}

