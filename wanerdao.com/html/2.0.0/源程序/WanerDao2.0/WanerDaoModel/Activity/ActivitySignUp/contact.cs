#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-02-24 
* 文件名：contact 
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

namespace WanerDao2.WanerDaoModel.Activity.ActivitySignUp
{
    public class contact
    {
        private string _phone;
        private string _email;

        public string phone
        {
            get { return _phone; }
            set { _phone = value; }
        }
        public string email
        {
            get { return _email; }
            set { _email = value; }
        }
    }
}
