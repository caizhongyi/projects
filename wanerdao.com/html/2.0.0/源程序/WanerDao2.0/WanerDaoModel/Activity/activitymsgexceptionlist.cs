using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activitymsgexceptionlist 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activitymsgexceptionlist
	{
		public activitymsgexceptionlist()
		{}
		#region Model
		private string _id;
		private string _user_id;
		private string _activity_id;
		private string _special_id;
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
		/// 用户号
		/// </summary>
		public string user_id
		{
			set{ _user_id=value;}
			get{return _user_id;}
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
		/// 特例用户号
		/// </summary>
		public string special_id
		{
			set{ _special_id=value;}
			get{return _special_id;}
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
        private string _special_name;
        /// <summary>
        /// 特例用户名
        /// </summary>
        public string special_name
        {
            set { _special_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_special_name))
                    return _special_name;
                return GetActivityConfigTableDataName.GetName(_special_id);
            }
        }


        #endregion

	}
}

