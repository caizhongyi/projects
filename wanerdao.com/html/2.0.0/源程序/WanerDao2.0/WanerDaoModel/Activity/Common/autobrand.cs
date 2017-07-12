using System;
namespace WanerDao2.WanerDaoModel.Activity.Common
{
	/// <summary>
	/// ʵ����autobrand ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class autobrand
	{
		public autobrand()
		{}
		#region Model
		private string _id;
		private string _company_id;
		private string _brand_name;
		private string _description;
		private string _logo_path;
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
		/// ��˾��
		/// </summary>
		public string company_id
		{
			set{ _company_id=value;}
			get{return _company_id;}
		}
		/// <summary>
		/// Ʒ������
		/// </summary>
		public string brand_name
		{
			set{ _brand_name=value;}
			get{return _brand_name;}
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
		/// Ʒ��ͼ��洢��ַ
		/// </summary>
		public string logo_path
		{
			set{ _logo_path=value;}
			get{return _logo_path;}
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

