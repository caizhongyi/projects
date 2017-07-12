using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activityimage 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activityimage
	{
		public activityimage()
		{}
		#region Model
		private string _id;
		private string _create_id;
		private string _activity_id;
		private string _link_id;
		private string _folder_id;
		private string _image_name;
		private string _image_path;
		private string _image_small_path;
		private double _filesize;
		private int _sequence;
		private string _description;
		private DateTime _upload_date;
		private bool _is_submit;
		private int _counter;
		private bool _is_block;
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
		/// 创建号
		/// </summary>
		public string create_id
		{
			set{ _create_id=value;}
			get{return _create_id;}
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
		/// 物理地址号
		/// </summary>
		public string link_id
		{
			set{ _link_id=value;}
			get{return _link_id;}
		}
		/// <summary>
		/// 相册号
		/// </summary>
		public string folder_id
		{
			set{ _folder_id=value;}
			get{return _folder_id;}
		}
		/// <summary>
		/// 相片名
		/// </summary>
		public string image_name
		{
			set{ _image_name=value;}
			get{return _image_name;}
		}
		/// <summary>
		/// 相片存储地址
		/// </summary>
		public string image_path
		{
			set{ _image_path=value;}
			get{return _image_path;}
		}
		/// <summary>
		/// 相片缩略图存储地址
		/// </summary>
		public string image_small_path
		{
			set{ _image_small_path=value;}
			get{return _image_small_path;}
		}
		/// <summary>
		/// 文件大小
		/// </summary>
		public double fileSize
		{
			set{ _filesize=value;}
			get{return _filesize;}
		}
		/// <summary>
		/// 排序
		/// </summary>
		public int sequence
		{
			set{ _sequence=value;}
			get{return _sequence;}
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
		/// 上传时间
		/// </summary>
		public DateTime upload_date
		{
			set{ _upload_date=value;}
			get{return _upload_date;}
		}
		/// <summary>
		/// 是否上传提交
		/// </summary>
		public bool is_submit
		{
			set{ _is_submit=value;}
			get{return _is_submit;}
		}
		/// <summary>
		/// 点击率
		/// </summary>
		public int counter
		{
			set{ _counter=value;}
			get{return _counter;}
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

