#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-02-5 10:14:48 
* 文件名：limitcondition 
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
    /// 活动加入条件
    /// </summary>
    public class limitcondition:IdAndName
    {
        private string _value;
        /// <summary>
        /// 条件值
        /// </summary>
        public string value
        {
            get { return _value; }
            set { _value = value; }
        }
    }
}
