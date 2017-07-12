using System;
namespace WanerDao2.WanerDaoModel.Activity.Common
{
	/// <summary>
	/// 实体类autocarpool 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class autocarpool
	{
		public autocarpool()
		{}
		#region Model
		private string _id;
		private string _active_id;
		private string _owner_id;
		private string _carpool_id;
		private int _is_pass;
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
		public string active_id
		{
			set{ _active_id=value;}
			get{return _active_id;}
		}
		/// <summary>
		/// 车主号
		/// </summary>
		public string owner_id
		{
			set{ _owner_id=value;}
			get{return _owner_id;}
		}
		/// <summary>
		/// 搭车号
		/// </summary>
		public string carpool_id
		{
			set{ _carpool_id=value;}
			get{return _carpool_id;}
		}
		/// <summary>
		/// 是否通过申请0通过1拒绝2审核
		/// </summary>
		public int is_pass
		{
			set{ _is_pass=value;}
			get{return _is_pass;}
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
        private string _carpool_name;
        /// <summary>
        /// 搭车人名
        /// </summary>
        public string carpool_name
        {
            set { _carpool_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_carpool_name))
                    return _carpool_name;
                return GetActivityConfigTableDataName.GetName(_carpool_id);
            }
        }

        private string _owner_name;

        /// <summary>
        /// 车主名
        /// </summary>
        public string owner_name
        {
            set { _carpool_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_owner_name))
                    return _carpool_name;
                return GetActivityConfigTableDataName.GetName(owner_id);
            }
        }
        #endregion
	}
}

