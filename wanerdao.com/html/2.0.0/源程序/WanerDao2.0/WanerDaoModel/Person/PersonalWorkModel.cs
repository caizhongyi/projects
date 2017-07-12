#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人工作信息实体
* 作者：杨晓东   时间：2011/10/2 0:56:01 
* 文件名：PersonalWorkModel 
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
    /// <summary>
    /// 个人工作信息
    /// </summary>
    [Serializable]
    public partial class PersonalWorkModel
    {
        public PersonalWorkModel()
        { }
        #region Model
        private string _id = "";
        private int _sort_id = 0;
        private string _user_id = "";
        private string _company_name = "";
        private string _position_category = "";
        private string _position_name = "";
        private string _description = "";
        private DateTime? _begin_date;
        private DateTime? _end_date;
        private bool? _is_present;
        private string _permission = "";
        private bool? _active = true;
        /// <summary>
        /// 序列号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 排序ID
        /// </summary>
        public int sort_id
        {
            set { _sort_id = value; }
            get { return _sort_id; }
        }
        /// <summary>
        /// 用户名
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 工作分类名
        /// </summary>
        public string position_category
        {
            set { _position_category = value; }
            get { return _position_category; }
        }
        /// <summary>
        /// 公司名
        /// </summary>
        public string company_name
        {
            set { _company_name = value; }
            get { return _company_name; }
        }
        /// <summary>
        /// 工作位置名
        /// </summary>
        public string position_name
        {
            set { _position_name = value; }
            get { return _position_name; }
        }
        /// <summary>
        /// 工作描述
        /// </summary>
        public string description
        {
            set { _description = value; }
            get { return _description; }
        }
        /// <summary>
        /// 开始时间
        /// </summary>
        public DateTime? begin_date
        {
            set { _begin_date = value; }
            get { return _begin_date; }
        }
        /// <summary>
        /// 结束时间
        /// </summary>
        public DateTime? end_date
        {
            set { _end_date = value; }
            get { return _end_date; }
        }
        /// <summary>
        /// 是否现在工作
        /// </summary>
        public bool? is_present
        {
            set { _is_present = value; }
            get { return _is_present; }
        }
        /// <summary>
        /// 其他人对该模块的浏览权限
        /// </summary>
        public string permission
        {
            set { _permission = value; }
            get { return _permission; }
        }
        /// <summary>
        /// 是否有效
        /// </summary>
        public bool? active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }
}
