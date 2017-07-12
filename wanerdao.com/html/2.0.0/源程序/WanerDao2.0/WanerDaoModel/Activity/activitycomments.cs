using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activitycomments ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
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
		/// ���к�
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// �������
		/// </summary>
		public string active_posts_id
		{
			set{ _active_posts_id=value;}
			get{return _active_posts_id;}
		}
		/// <summary>
		/// �ظ�����
		/// </summary>
		public string follow_id
		{
			set{ _follow_id=value;}
			get{return _follow_id;}
		}
		/// <summary>
		/// �û���
		/// </summary>
		public string user_id
		{
			set{ _user_id=value;}
			get{return _user_id;}
		}
		/// <summary>
		/// ����
		/// </summary>
		public string content
		{
			set{ _content=value;}
			get{return _content;}
		}
		/// <summary>
		/// ����ʱ��
		/// </summary>
		public DateTime comments_date
		{
			set{ _comments_date=value;}
			get{return _comments_date;}
		}
		/// <summary>
		/// ��������
		/// </summary>
		public int positive
		{
			set{ _positive=value;}
			get{return _positive;}
		}
		/// <summary>
		/// ��������
		/// </summary>
		public int negative
		{
			set{ _negative=value;}
			get{return _negative;}
		}
		/// <summary>
		/// �Ƿ���Ч
		/// </summary>
		public bool active
		{
			set{ _active=value;}
			get{return _active;}
		}
		#endregion Model

	}
}

