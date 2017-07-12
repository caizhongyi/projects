using System;
namespace WanerDao2.WanerDaoModel.Activity.Common
{
	/// <summary>
	/// ʵ����automodel ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class automodel
	{
		public automodel()
		{}
		#region Model
		private string _id;
		private string _brand_id;
		private string _model_name;
		private string _image_path;
		private string _description;
		private DateTime _update_date;
		private string _language_id;
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
		/// Ʒ�ƺ�
		/// </summary>
		public string brand_id
		{
			set{ _brand_id=value;}
			get{return _brand_id;}
		}
		/// <summary>
		/// �ͺ���
		/// </summary>
		public string model_name
		{
			set{ _model_name=value;}
			get{return _model_name;}
		}
		/// <summary>
		/// �ͺ�ͼƬ�洢·��
		/// </summary>
		public string image_path
		{
			set{ _image_path=value;}
			get{return _image_path;}
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
		/// ���ݸ���ʱ��
		/// </summary>
		public DateTime update_date
		{
			set{ _update_date=value;}
			get{return _update_date;}
		}
		/// <summary>
		/// ���Ժ�
		/// </summary>
		public string language_id
		{
			set{ _language_id=value;}
			get{return _language_id;}
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

