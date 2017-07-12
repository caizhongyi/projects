using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activityimage ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
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
		/// ���к�
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// ������
		/// </summary>
		public string create_id
		{
			set{ _create_id=value;}
			get{return _create_id;}
		}
		/// <summary>
		/// ���
		/// </summary>
		public string activity_id
		{
			set{ _activity_id=value;}
			get{return _activity_id;}
		}
		/// <summary>
		/// �����ַ��
		/// </summary>
		public string link_id
		{
			set{ _link_id=value;}
			get{return _link_id;}
		}
		/// <summary>
		/// ����
		/// </summary>
		public string folder_id
		{
			set{ _folder_id=value;}
			get{return _folder_id;}
		}
		/// <summary>
		/// ��Ƭ��
		/// </summary>
		public string image_name
		{
			set{ _image_name=value;}
			get{return _image_name;}
		}
		/// <summary>
		/// ��Ƭ�洢��ַ
		/// </summary>
		public string image_path
		{
			set{ _image_path=value;}
			get{return _image_path;}
		}
		/// <summary>
		/// ��Ƭ����ͼ�洢��ַ
		/// </summary>
		public string image_small_path
		{
			set{ _image_small_path=value;}
			get{return _image_small_path;}
		}
		/// <summary>
		/// �ļ���С
		/// </summary>
		public double fileSize
		{
			set{ _filesize=value;}
			get{return _filesize;}
		}
		/// <summary>
		/// ����
		/// </summary>
		public int sequence
		{
			set{ _sequence=value;}
			get{return _sequence;}
		}
		/// <summary>
		/// ����
		/// </summary>
		public string description
		{
			set{ _description=value;}
			get{return _description;}
		}
		/// <summary>
		/// �ϴ�ʱ��
		/// </summary>
		public DateTime upload_date
		{
			set{ _upload_date=value;}
			get{return _upload_date;}
		}
		/// <summary>
		/// �Ƿ��ϴ��ύ
		/// </summary>
		public bool is_submit
		{
			set{ _is_submit=value;}
			get{return _is_submit;}
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

