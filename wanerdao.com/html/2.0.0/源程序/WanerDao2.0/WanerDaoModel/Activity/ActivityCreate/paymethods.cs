#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-07-15
* 文件名：paymethods 
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
    public class paymethods:Id
    {
        #region Model
        private string _pay_type_name;
        private string _pay_type_id;
        private string _pay_address;
        /// <summary>
        /// 方式名称
        /// </summary>
        public string pay_type_name
        {
            set { _pay_type_name = value; }
            get { return _pay_type_name; }
        }
        /// <summary>
        /// 付费方式号
        /// </summary>
        public string pay_type_id
        {
            set { _pay_type_id = value; }
            get { return _pay_type_id; }
        }
        /// <summary>
        /// 账号及支付地址
        /// </summary>
        public string pay_address
        {
            set { _pay_address = value; }
            get { return _pay_address; }
        }
        /// <summary>
        /// 账号名字。只能自己看
        /// </summary>
        public string name
        {
            set;
            get;
        }
        /// <summary>
        /// 账号说明。只能自己看
        /// </summary>
        public string description
        {
            set;
            get;
        }
        /// <summary>
        /// 账号公开信息，对外公开的信息，比如姓名，开户地
        /// </summary>
        public string notice
        {
            set;
            get;
        }
        #endregion Model
    }
}
