#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-08-20
* 文件名：ActivityJoinInfo 
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
    /// <summary>
    /// 活动加入退出情况表
    /// </summary>
    public class ActivityJoinInfo
    {
        public ActivityJoinInfo()
		{}
		#region Model
		private string _id;
		private string _user_id;
		private string _activity_id;
		private DateTime _update_date;
		private bool _active;
		private string _remark;
        private int _flag;
		/// <summary>
		/// 序列号
		/// </summary>
		public string id
		{
			set{ _id=value;}
			get{return _id;}
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
		/// 活动号
		/// </summary>
		public string activity_id
		{
			set{ _activity_id=value;}
			get{return _activity_id;}
		}
		/// <summary>
		/// 时间
		/// </summary>
		public DateTime update_date
		{
			set{ _update_date=value;}
			get{return _update_date;}
		}
		/// <summary>
		/// 是否有效
		/// </summary>
		public bool active
		{
			set{ _active=value;}
			get{return _active;}
		}
		/// <summary>
		/// 备注
		/// </summary>
		public string remark
		{
			set{ _remark=value;}
			get{return _remark;}
		}
        /// <summary>
        /// 1：加入0：退出
		/// </summary>
		public int flag
		{
            set { _flag = value; }
            get { return _flag; }
		}
		#endregion Model

        #region extend
        /// <summary>
        /// 活动名字
        /// </summary>
        public string activity_name
        {
            set;
            get;
        }
        /// <summary>
        /// 用户名字
        /// </summary>
        public string user_name
        {
            set;
            get;
        }
        #endregion
    }
}
