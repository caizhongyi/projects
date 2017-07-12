#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-03-20
* 文件名：IdName 
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
    public class IdAndName:Id
    {
        private string _name;
        /// <summary>
        /// 名字
        /// </summary>
        public string name
        {
            get { return _name; }
            set { _name = value; }
        }
    }
}
