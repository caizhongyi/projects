using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activityposts ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
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
		/// ���к�
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// ���
		/// </summary>
		public string active_id
		{
			set{ _active_id=value;}
			get{return _active_id;}
		}
		/// <summary>
		/// �����˺�
		/// </summary>
		public string create_id
		{
			set{ _create_id=value;}
			get{return _create_id;}
		}
		/// <summary>
		/// ����
		/// </summary>
		public string subject
		{
			set{ _subject=value;}
			get{return _subject;}
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
		public DateTime post_date
		{
			set{ _post_date=value;}
			get{return _post_date;}
		}
		/// <summary>
		/// �����
		/// </summary>
		public int counter
		{
			set{ _counter=value;}
			get{return _counter;}
		}
		/// <summary>
		/// �Ƿ�����
		/// </summary>
		public bool is_block
		{
			set{ _is_block=value;}
			get{return _is_block;}
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

