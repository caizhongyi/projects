using System;
using System.Collections.Generic;
namespace WanerDao2.WanerDaoModel.Activity
{
	/// <summary>
	/// ʵ����activitycategorysettings ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	[Serializable]
	public class activitycategorysettings
	{
		public activitycategorysettings()
		{}
		#region Model
		private string _id;
		private string _parent_id;
		private string _category_name;
		private string _logo_path;
		private DateTime _update_date;
		private string _language_id;
		private bool _active;
        private int _section_type_id;
		/// <summary>
		/// �����
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// ������
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
		/// ͼ��洢��ַ
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
        /// <summary>
        /// section_type���� -1:���� 1:ʱ�� 2��һ�� 3���Զ���
        /// </summary>
        public int section_type_id
        {
            set { _section_type_id = value; }
            get { return _section_type_id; }
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

        private activitycategorysettings _parent;
        /// <summary>
        /// ���׽ڵ�
        /// </summary>
        public activitycategorysettings parent
        {
            set { _parent = value; }
            get { return _parent; }
        }

        private List<activitycategorysettings> _child;
        /// <summary>
        /// ���ӽڵ�
        /// </summary>
        public List<activitycategorysettings> child
        {
            set { _child = value; }
            get { return _child; }
        }

        #endregion

	}
}

