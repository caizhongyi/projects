using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activityimagefolder 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class ActivityImageFolderModel:Base.ModelBase
	{
		public ActivityImageFolderModel()
		{}
		#region Model
		private string _user_id;
		private string _activity_id;
		private string _share_key_id;
		private string _folder_name;
		private DateTime _create_date;
		private string _description;
		private bool _is_system;
		private bool _is_block;
		private bool _active;
		/// <summary>
		/// 创建名
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
		/// 共享钥匙
		/// </summary>
		public string share_key_id
		{
			set{ _share_key_id=value;}
			get{return _share_key_id;}
		}
		/// <summary>
		/// 相册名
		/// </summary>
		public string folder_name
		{
			set{ _folder_name=value;}
			get{return _folder_name;}
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
		/// 描述
		/// </summary>
		public string description
		{
			set{ _description=value;}
			get{return _description;}
		}
		/// <summary>
		/// 是否系统自建
		/// </summary>
		public bool is_system
		{
			set{ _is_system=value;}
			get{return _is_system;}
		}
		/// <summary>
		/// 是否屏蔽
		/// </summary>
		public bool is_block
		{
			set{ _is_block=value;}
			get{return _is_block;}
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

