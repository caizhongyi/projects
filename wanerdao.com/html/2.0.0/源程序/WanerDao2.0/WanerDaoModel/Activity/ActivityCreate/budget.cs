#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-02-5 10:16:25 
* 文件名：budget 
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
    /// <summary>
    /// 活动预算
    /// </summary>
    public class budget
    {
        private string _id;
        private string _receipt;
        private double _budgetcost;
        private string _executor;
        private string _budgetdesc;
        /// <summary>
        /// ID
        /// </summary>
        public string id
        {
            get { return _id; }
            set { _id = value; }
        }
        /// <summary>
        /// 收支名目
        /// </summary>
        public string receipt
        {
            get { return _receipt; }
            set { _receipt = value; }
        }
        /// <summary>
        /// 花费
        /// </summary>
        public double budgetcost
        {
            get { return _budgetcost; }
            set { _budgetcost = value; }
        }
        /// <summary>
        /// 执行人ID
        /// </summary>
        public string executor
        {
            get { return _executor; }
            set { _executor = value; }
        }
        /// <summary>
        /// 描述
        /// </summary>
        public string budgetdesc
        {
            get { return _budgetdesc; }
            set { _budgetdesc = value; }
        }
    }
}
