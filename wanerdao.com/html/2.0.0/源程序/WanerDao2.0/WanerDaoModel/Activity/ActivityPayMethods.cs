#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-07-14
* 文件名：ActivityPayMethods 
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

namespace WanerDao2.WanerDaoModel.Activity
{
    public class ActivityPayMethods
    {

		#region Model
		private string _id;
		private string _activity_id;
		private string _user_id;
		private string _pay_type_id;
		private string _pay_address;
		private DateTime _pay_date;
        private bool _active;
        private string _name;
        private string _description;
        private string _notice;
		/// <summary>
		/// 序号
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 活动号
		/// </summary>
		public string activity_id
		{
			set{ _activity_id=value;}
			get{return _activity_id;}
		}
		/// <summary>
		/// 用户号
		/// </summary>
		public string user_id
		{
			set{ _user_id=value;}
			get{return _user_id;}
		}
		/// <summary>
		/// 付费方式号
		/// </summary>
		public string pay_type_id
		{
			set{ _pay_type_id=value;}
			get{return _pay_type_id;}
		}
		/// <summary>
		/// 账号及支付地址
		/// </summary>
		public string pay_address
		{
			set{ _pay_address=value;}
			get{return _pay_address;}
		}
		/// <summary>
		/// 更新日期
		/// </summary>
		public DateTime pay_date
		{
			set{ _pay_date=value;}
			get{return _pay_date;}
		}
        /// <summary>
        /// 是否有效
        /// </summary>
        public bool active
        {
            set { _active = value; }
            get { return _active; }
        }
        /// <summary>
        /// 账号名字。只能自己看
        /// </summary>
        public string name
        {
            set { _name = value; }
            get { return _name; }
        }
        /// <summary>
        /// 账号说明。只能自己看
        /// </summary>
        public string description
        {
            set { _description = value; }
            get { return _description; }
        }
        /// <summary>
        /// 账号公开信息，对外公开的信息，比如姓名，开户地
        /// </summary>
        public string notice
        {
            set { _notice = value; }
            get { return _notice; }
        }
		#endregion Model

        #region extend
        public string pay_type_name
        {
            set;
            get;
        }
        #endregion
    }
}
