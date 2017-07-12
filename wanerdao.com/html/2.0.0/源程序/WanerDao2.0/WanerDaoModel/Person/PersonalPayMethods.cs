#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-07-14
* 文件名：PersonalPayMethods 
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

namespace WanerDao2.WanerDaoModel.Person
{
    public class PersonalPayMethods
    {
        #region Model
        private string _id;
        private string _user_id;
        private string _pay_type_id;
        private string _pay_address;
        private DateTime _pay_date;
        private DateTime _active;
        /// <summary>
        /// id
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 用户号
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 支付方式号
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
        /// 更新日期
        /// </summary>
        public DateTime pay_date
        {
            set { _pay_date = value; }
            get { return _pay_date; }
        }
        /// <summary>
        /// 是否有效
        /// </summary>
        public DateTime active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model
    }
}
