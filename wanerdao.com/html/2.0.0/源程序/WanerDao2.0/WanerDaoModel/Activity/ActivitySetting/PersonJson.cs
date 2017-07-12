#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-03-17 22:19:29 
* 文件名：PersonJson 
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

namespace WanerDao2.WanerDaoModel.Activity.ActivitySetting
{
    public class PersonJson
    {
        private string _id;
        private string _name;
        /// <summary>
        /// ID
        /// </summary>
        public string id
        {
            get { return _id; }
            set { _id = value; }
        }
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
