using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
    /// 实体类activitymemberrole 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activitymemberrole
	{
        public activitymemberrole()
		{}
		#region Model
		private string _id;
		private string _activity_id;
        private string _member_id;
        private string  _role_id;
        private DateTime _add_date;
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
        /// 相关人名号
		/// </summary>
        public string member_id
		{
            set { _member_id = value; }
            get { return _member_id; }
		}
		/// <summary>
		/// 角色号
		/// </summary>
        public string role_id
		{
            set { _role_id = value; }
            get { return _role_id; }
		}
		/// <summary>
		/// 执行时间
		/// </summary>
        public DateTime add_date
		{
            set { _add_date = value; }
            get { return _add_date; }
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

        #region extend

        private string _role_name = string.Empty;
        /// <summary>
        /// 角色名字
        /// </summary>
        public string role_name
        {
            set { _role_name = value; }
            get { return _role_name; }
        }

        public string user_id = string.Empty;
        public string user_name = string.Empty;
        public string email = string.Empty;
        public string phone = string.Empty;
        #endregion
    }
}

