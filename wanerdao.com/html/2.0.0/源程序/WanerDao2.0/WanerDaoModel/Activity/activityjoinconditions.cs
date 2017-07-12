using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activityjoinconditions 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activityjoinconditions
	{
		public activityjoinconditions()
		{}
		#region Model
		private string _id;
		private string _activity_id;
		private string _condition_id;
		private string _value;
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
		/// 条件号
		/// </summary>
		public string condition_id
		{
			set{ _condition_id=value;}
			get{return _condition_id;}
		}
		/// <summary>
		/// 条件值
		/// </summary>
		public string value
		{
			set{ _value=value;}
			get{return _value;}
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
        private string _condition_name;

        /// <summary>
        /// 条件名称名
        /// </summary>
        public string condition_name
        {
            set { _condition_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_condition_name))
                    return _condition_name;
                return GetActivityConfigTableDataName.GetName(condition_id);
            }
        }

        #endregion

	}
}

