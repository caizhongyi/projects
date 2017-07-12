#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-03-11 17:45:43 
* 文件名：activityschedule 
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

namespace WanerDao2.WanerDaoModel.Activity.ActivityCreate
{
    public class activityschedule
    {
        private string _typeid;//活动周期定制
        private string _isdirectlybuild;
        private string _gapperiod;
        private bool _tellemail;
        private bool _tellinbox;
        private string _emaildates;
        private string _inboxdates;
        private string _floatcycle;
        /// <summary>
        /// 定制类型 1: 一次性（默认） 2:订制固定周期 3:订制浮动周期
        /// </summary>
        public string typeid
        {
            get { return _typeid; }
            set { _typeid = value; }
        }
        /// <summary>
        /// 是否直接创建
        /// </summary>
        public string isdirectlybuild
        {
            get { return _isdirectlybuild; }
            set { _isdirectlybuild = value; }
        }
        /// <summary>
        /// 间隔周期
        /// </summary>
        public string gapperiod
        {
            get { return _gapperiod; }
            set { _gapperiod = value; }
        }
        /// <summary>
        /// 浮动周期，用‘，’分隔
        /// </summary>
        public string floatcycle
        {
            get { return _floatcycle; }
            set { _floatcycle = value; }
        }
        /// <summary>
        /// 发送邮件通知创建人
        /// </summary>
        public bool tellemail
        {
            get { return _tellemail; }
            set { _tellemail = value; }
        }
        /// <summary>
        /// 发送站内信息通知创建人
        /// </summary>
        public bool tellinbox
        {
            get { return _tellinbox; }
            set { _tellinbox = value; }
        }
        /// <summary>
        /// 发送邮件活动开始时间串
        /// </summary>
        public string emaildates
        {
            get { return _emaildates; }
            set { _emaildates = value; }
        }
        /// <summary>
        /// 发送站内信息开始时间串
        /// </summary>
        public string inboxdates
        {
            get { return _inboxdates; }
            set { _inboxdates = value; }
        }
    }
}
