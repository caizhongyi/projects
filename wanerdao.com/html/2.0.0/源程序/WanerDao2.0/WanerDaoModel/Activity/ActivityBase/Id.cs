#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-04-17 19:03:12 
* 文件名：Id 
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

namespace WanerDao2.WanerDaoModel.Activity.ActivityBase
{
    public class Id
    {
        private string _id;
        /// <summary>
        /// ID
        /// </summary>
        public string id
        {
            get { return _id; }
            set { _id = value; }
        }
    }
}
