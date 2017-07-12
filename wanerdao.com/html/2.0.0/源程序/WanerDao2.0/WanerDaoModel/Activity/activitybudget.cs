using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activitybudget 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activitybudget
	{
		public activitybudget()
		{}
		#region Model
		private string _id;
		private string _activity_id;
		private string _item_description;
		private string _item_content;
		private bool _is_in;
		private double _budget_money;
		private int _conver_unit;
		private string _cover_note;
		private string _create_id;
		private DateTime _create_date;
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
		/// 详细描述
		/// </summary>
		public string item_description
		{
			set{ _item_description=value;}
			get{return _item_description;}
		}
		/// <summary>
		/// 缴费名目
		/// </summary>
		public string item_content
		{
			set{ _item_content=value;}
			get{return _item_content;}
		}
		/// <summary>
		/// 是否收
		/// </summary>
		public bool is_in
		{
			set{ _is_in=value;}
			get{return _is_in;}
		}
		/// <summary>
		/// 预算金额
		/// </summary>
		public double budget_money
		{
			set{ _budget_money=value;}
			get{return _budget_money;}
		}
		/// <summary>
		/// 金额覆盖单位
		/// </summary>
		public int conver_unit
		{
			set{ _conver_unit=value;}
			get{return _conver_unit;}
		}
		/// <summary>
		/// 覆盖说明
		/// </summary>
		public string cover_note
		{
			set{ _cover_note=value;}
			get{return _cover_note;}
		}
		/// <summary>
		/// 管理员号
		/// </summary>
		public string create_id
		{
			set{ _create_id=value;}
			get{return _create_id;}
		}
		/// <summary>
		/// 创建时间
		/// </summary>
		public DateTime create_date
		{
			set{ _create_date=value;}
			get{return _create_date;}
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
        private string _activity_name;
        /// <summary>
        /// 活动名
        /// </summary>
        public string activity_name
        {
            set { _activity_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_activity_name))
                    return _activity_name;
                return GetActivityConfigTableDataName.GetName(_activity_id);
            }
        }

        private string _create_name;

        /// <summary>
        /// 创建人
        /// </summary>
        public string create_name
        {
            set { _create_name = value; }
            get
            {
                if (!string.IsNullOrEmpty(_create_name))
                    return _create_name;
                return GetActivityConfigTableDataName.GetName(_create_id);
            }
        }
        #endregion
        



	}
}

