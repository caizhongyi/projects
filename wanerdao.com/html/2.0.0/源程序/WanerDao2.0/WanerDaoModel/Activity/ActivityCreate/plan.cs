#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-02-5 9:51:34 
* 文件名：plan 
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
using WanerDao2.WanerDaoModel.Activity.ActivityBase;

namespace WanerDao2.WanerDaoModel.Activity.ActivityCreate
{
    /// <summary>
    /// 活动计划
    /// </summary>
    public class plan:Id
    {
        private string _starttime;
        private string _endtime;
        private string _title;
        private string _desc;

        /// <summary>
        /// 开始时间
        /// </summary>
        public string starttime
        {
            get { return _starttime; }
            set { _starttime = value; }
        }
        /// <summary>
        /// 结束时间
        /// </summary>
        public string endtime
        {
            get { return _endtime; }
            set { _endtime = value; }
        }
        /// <summary>
        /// 标题
        /// </summary>
        public string title
        {
            get { return _title; }
            set { _title = value; }
        }
        /// <summary>
        /// 描述
        /// </summary>
        public string desc
        {
            get { return _desc; }
            set { _desc = value; }
        }
    }
}
