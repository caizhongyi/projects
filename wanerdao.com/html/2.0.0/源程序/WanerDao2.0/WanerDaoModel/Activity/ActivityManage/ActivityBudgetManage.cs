#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-06-02 
* 文件名：ActivityBudge 
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

namespace WanerDao2.WanerDaoModel.Activity.ActivityManage
{
    public class ActivityBudgetManage
    {
        private string _id;
        private string _activity_id;
        private string _item_description;
        private string _item_content;
        private bool _is_in;
        private double _budget_money;
        private int _conver_unit;
        private string _cover_note;
        private string _create_id;
        private string _create_date;
        private bool _active;
        /// <summary>
        /// 序列号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 活动号
        /// </summary>
        public string activity_id
        {
            set { _activity_id = value; }
            get { return _activity_id; }
        }
        /// <summary>
        /// 详细描述
        /// </summary>
        public string item_description
        {
            set { _item_description = value; }
            get { return _item_description; }
        }
        /// <summary>
        /// 缴费名目
        /// </summary>
        public string item_content
        {
            set { _item_content = value; }
            get { return _item_content; }
        }
        /// <summary>
        /// 是否收
        /// </summary>
        public bool is_in
        {
            set { _is_in = value; }
            get { return _is_in; }
        }
        /// <summary>
        /// 预算金额
        /// </summary>
        public double budget_money
        {
            set { _budget_money = value; }
            get { return _budget_money; }
        }
        /// <summary>
        /// 金额覆盖单位
        /// </summary>
        public int conver_unit
        {
            set { _conver_unit = value; }
            get { return _conver_unit; }
        }
        /// <summary>
        /// 覆盖说明
        /// </summary>
        public string cover_note
        {
            set { _cover_note = value; }
            get { return _cover_note; }
        }
        /// <summary>
        /// 管理员号
        /// </summary>
        public string create_id
        {
            set { _create_id = value; }
            get { return _create_id; }
        }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string create_date
        {
            set { _create_date = value; }
            get { return _create_date; }
        }
        /// <summary>
        /// 执行人员
        /// </summary>
        public List<BudgetOpt> budgetopts
        {
            get;
            set;
        }
    }
}
