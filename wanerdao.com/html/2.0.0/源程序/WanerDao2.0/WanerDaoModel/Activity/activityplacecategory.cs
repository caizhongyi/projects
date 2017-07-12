using System;
using System.Collections.Generic;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activityplacecategory ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activityplacecategory
	{
		public activityplacecategory()
		{}
		#region Model
		private string _id;
		private string _parent_id;
		private string _category_name;
		private DateTime _update_date;
		private string _map_table;
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
		/// �����
		/// </summary>
		public string parent_id
		{
			set{ _parent_id=value;}
			get{return _parent_id;}
		}
		/// <summary>
		/// ������
		/// </summary>
		public string category_name
		{
			set{ _category_name=value;}
			get{return _category_name;}
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
		/// ��Ӧ���ݱ���
		/// </summary>
		public string map_table
		{
			set{ _map_table=value;}
			get{return _map_table;}
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


        #region  ��չ
        private bool _istop;
        /// <summary>
        /// �Ƿ񶥲�ڵ�
        /// </summary>
        public bool istop
        {
            set { _istop = value; }
            get { return _istop; }
        }

        private bool _isbottom;
        /// <summary>
        /// �Ƿ�ײ�ڵ�
        /// </summary>
        public bool isbottom
        {
            set { _isbottom = value; }
            get { return _isbottom; }
        }

        private activityplacecategory _parent;
        /// <summary>
        /// ���׽ڵ�
        /// </summary>
        public activityplacecategory parent
        {
            set { _parent = value; }
            get { return _parent; }
        }

        private List<activityplacecategory> _child;
        /// <summary>
        /// ���ӽڵ�
        /// </summary>
        public List<activityplacecategory> child
        {
            set { _child = value; }
            get { return _child; }
        }

        #endregion

	}
}

