#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-03-24 14:04:16 
* 文件名：Manager 
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
    public class ManagerBase : IdAndName
    {
        private string _phone;
        private string _email;
        /// <summary>
        /// 电话
        /// </summary>
        public string phone
        {
            get { return _phone; }
            set { _phone = value; }
        }
        /// <summary>
        /// 邮件
        /// </summary>
        public string email
        {
            get { return _email; }
            set { _email = value; }
        }
    }
}
