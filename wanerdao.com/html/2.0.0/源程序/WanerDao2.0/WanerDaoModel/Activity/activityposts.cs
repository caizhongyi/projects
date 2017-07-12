using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activityposts 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activityposts
	{
		public activityposts()
		{}
		#region Model
		private string _id;
		private string _active_id;
		private string _create_id;
		private string _subject;
		private string _content;
		private DateTime _post_date;
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
		/// 活动号
		/// </summary>
		public string active_id
		{
			set{ _active_id=value;}
			get{return _active_id;}
		}
		/// <summary>
		/// 发帖人号
		/// </summary>
		public string create_id
		{
			set{ _create_id=value;}
			get{return _create_id;}
		}
		/// <summary>
		/// 主题
		/// </summary>
		public string subject
		{
			set{ _subject=value;}
			get{return _subject;}
		}
		/// <summary>
		/// 内容
		/// </summary>
		public string content
		{
			set{ _content=value;}
			get{return _content;}
		}
		/// <summary>
		/// 发布时间
		/// </summary>
		public DateTime post_date
		{
			set{ _post_date=value;}
			get{return _post_date;}
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

