using System;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activitysignuptype ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activitysignuptype
	{
		public activitysignuptype()
		{}
		#region Model
		private string _id;
		private string _type_name;
		private DateTime _update_date;
		private string _language_id;
		private bool _active;
		/// <summary>
		/// ��ʽ��
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// ��ʽ��
		/// </summary>
		public string type_name
		{
			set{ _type_name=value;}
			get{return _type_name;}
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

