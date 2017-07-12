using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// 实体类activitycomments 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public class activitycomments
	{
		public activitycomments()
		{}
		#region Model
		private string _id;
		private string _active_posts_id;
		private string _follow_id;
		private string _user_id;
		private string _content;
		private DateTime _comments_date;
		private int _positive;
		private int _negative;
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
		/// 活动发帖号
		/// </summary>
		public string active_posts_id
		{
			set{ _active_posts_id=value;}
			get{return _active_posts_id;}
		}
		/// <summary>
		/// 回复贴号
		/// </summary>
		public string follow_id
		{
			set{ _follow_id=value;}
			get{return _follow_id;}
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
		/// 内容
		/// </summary>
		public string content
		{
			set{ _content=value;}
			get{return _content;}
		}
		/// <summary>
		/// 评论时间
		/// </summary>
		public DateTime comments_date
		{
			set{ _comments_date=value;}
			get{return _comments_date;}
		}
		/// <summary>
		/// 正面评论
		/// </summary>
		public int positive
		{
			set{ _positive=value;}
			get{return _positive;}
		}
		/// <summary>
		/// 负面评价
		/// </summary>
		public int negative
		{
			set{ _negative=value;}
			get{return _negative;}
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

