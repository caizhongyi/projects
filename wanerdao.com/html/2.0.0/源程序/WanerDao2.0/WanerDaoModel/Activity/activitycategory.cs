using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activitycategory 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activitycategory
	{
		public activitycategory()
		{}
		#region Model
		private string _id;
		private string _activity_id;
		private string _category_id;
		private DateTime _update_date;
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
		/// 活动号
		/// </summary>
		public string activity_id
		{
			set{ _activity_id=value;}
			get{return _activity_id;}
		}
		/// <summary>
		/// 分类号
		/// </summary>
		public string category_id
		{
			set{ _category_id=value;}
			get{return _category_id;}
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
		/// 是否有效
		/// </summary>
		public bool active
		{
			set{ _active=value;}
			get{return _active;}
		}
		#endregion Model

        #region  扩展
        private string _category_name;

        /// <summary>
        /// 分类名
        /// </summary>
        public string category_name
        {
            set { _category_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_category_name))
                    return _category_name;
                return GetActivityConfigTableDataName.GetName(_category_id);
            }
        }

        #endregion

	}
}

