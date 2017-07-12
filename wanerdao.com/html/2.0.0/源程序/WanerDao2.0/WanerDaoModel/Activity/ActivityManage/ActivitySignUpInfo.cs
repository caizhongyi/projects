#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-03-24 14:16:11 
* 文件名：ActivitySignUpInfo 
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
using WanerDao2.WanerDaoModel.Activity.ActivityCreate;

namespace WanerDao2.WanerDaoModel.Activity.ActivityManage
{
    public class ActivitySignUpInfo
    {

        private decimal _cost;
        private string _pay_description;

        private string _type;
        private string _typename;
        private string _pass;

        /// <summary>
        /// 报名费用
        /// </summary>
        public decimal cost
        {
            get { return _cost; }
            set { _cost = value; }
        }
        /// <summary>
        /// 必须缴费缴费金额
        /// </summary>
        public decimal pay_nbr
        {
            get;
            set;
        }
        /// <summary>
        /// 报名时必须缴费
        /// </summary>
        public bool is_pay_need
        {
            get;
            set;
        }
        /// <summary>
        /// 缴费说明
        /// </summary>
        public string pay_description
        {
            get { return _pay_description; }
            set { _pay_description = value; }
        }

        /// <summary>
        /// 报名方式
        /// </summary>
        public string typeid
        {
            get { return _type; }
            set { _type = value; }
        }

        /// <summary>
        /// 报名方式名称
        /// </summary>
        public string typename
        {
            get { return _typename; }
            set { _typename = value; }
        }

        /// <summary>
        /// 密码
        /// </summary>
        public string pass
        {
            get { return _pass; }
            set { _pass = value; }
        }

        /// <summary>
        /// 付款方式
        /// </summary>
        public List<paymethods> paymethodsinfo
        {
            get;
            set;
        }
        
    }
}
