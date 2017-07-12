using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModule.TipInfo;

namespace WanerDao2.WanerDaoModel.Post
{
    public class TopicCategoryModel
    {
        public TopicCategoryModel()
		{}
		#region Model
		private string _id="";
		private string _parent_id="";
		private string _category_name="";
		private DateTime _update_date=new DateTime(1999,1,1);
        //private string _language_id = WanerDaoGlobalTip.GetClientLanguageGuid();
        private string _language_id = string.Empty;
		private int _active=1;
		/// <summary>
		/// 
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string parent_id
		{
			set{ _parent_id=value;}
			get{return _parent_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string category_name
		{
			set{ _category_name=value;}
			get{return _category_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime update_date
		{
			set{ _update_date=value;}
			get{return _update_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string language_id
		{
			set{ _language_id=value;}
			get{return _language_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int active
		{
			set{ _active=value;}
			get{return _active;}
		}
		#endregion Model

    }
}
