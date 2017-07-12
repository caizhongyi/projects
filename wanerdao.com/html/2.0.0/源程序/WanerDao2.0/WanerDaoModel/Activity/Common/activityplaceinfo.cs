#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-03-11 16:34:46 
* 文件名：ActivityPlaceInfo 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WanerDao2.WanerDaoModel.Activity.Common.Common
{
    public class activityplaceinfo
    {
        public activityplaceinfo()
		{}
		#region Model
		private string _id;
		private string _place_name;
		private string _description;
		private string _address;
		private string _country_id;
		private string _state_id;
		private string _city_id;
		private string _zip;
		private string _language_id;
        private string _map_table;
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
		public string place_name
		{
			set{ _place_name=value;}
			get{return _place_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string description
		{
			set{ _description=value;}
			get{return _description;}
		}
		
		/// <summary>
		/// 
		/// </summary>
		public string address
		{
			set{ _address=value;}
			get{return _address;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string country_id
		{
			set{ _country_id=value;}
			get{return _country_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string state_id
		{
			set{ _state_id=value;}
			get{return _state_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string city_id
		{
			set{ _city_id=value;}
			get{return _city_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string zip
		{
			set{ _zip=value;}
			get{return _zip;}
		}
		
		/// <summary>
		/// 
		/// </summary>
		public string language_id
		{
			set{ _language_id=value;}
			get{return _language_id;}
		}
        public string map_table
        {
            get { return _map_table; }
            set { _map_table = value; }
        }
		#endregion Model
    }
}
