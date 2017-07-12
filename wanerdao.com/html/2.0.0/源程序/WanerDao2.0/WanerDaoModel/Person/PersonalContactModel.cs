#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人联系信息实体
* 作者：杨晓东   时间：2011/10/2 0:59:19 
* 文件名：PersonalContactModel 
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
using System.Runtime.Serialization;

namespace WanerDao2.WanerDaoModel.Person
{
    /// <summary>
    /// 个人联系信息
    /// </summary>
    [DataContract]
    [Serializable]
    public partial class PersonalContactModel
    {
        public PersonalContactModel()
        { }
        #region Model
        private string _user_id="";
        private string _web_email="";
        private string _email="";
        private bool _is_bond_email;
        private DateTime _email_bond_date = DateTime.Now;
        private string _skype="";
        private bool _is_bond_skype;
        private DateTime _skype_bond_date = DateTime.Now;
        private string _msn="";
        private bool _is_bond_msn;
        private DateTime _msn_bond_date = DateTime.Now;
        private string _cell="";
        private bool _is_bond_cell;
        private DateTime _cell_bond_date=DateTime.Now;
        private string _web_website="";
        private string _website="";
        private string _permission="";
        private bool _active = true;
        /// <summary>
        /// 用户号
        /// </summary>
        [DataMember]
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 网站内部email地址
        /// </summary>
        [DataMember]
        public string web_email
        {
            set { _web_email = value; }
            get { return _web_email; }
        }
        /// <summary>
        /// email
        /// </summary>
        [DataMember]
        public string email
        {
            set { _email = value; }
            get { return _email; }
        }
        /// <summary>
        /// 是否绑定email
        /// </summary>
        [DataMember]
        public bool is_bond_email
        {
            set { _is_bond_email = value; }
            get { return _is_bond_email; }
        }
        /// <summary>
        /// email绑定日期
        /// </summary>
        [DataMember]
        public DateTime email_bond_date
        {
            set { _email_bond_date = value; }
            get { return _email_bond_date; }
        }
        /// <summary>
        /// skype
        /// </summary>
        [DataMember]
        public string skype
        {
            set { _skype = value; }
            get { return _skype; }
        }
        /// <summary>
        /// 是否绑定skype
        /// </summary>
        [DataMember]
        public bool is_bond_skype
        {
            set { _is_bond_skype = value; }
            get { return _is_bond_skype; }
        }
        /// <summary>
        /// skype绑定时间
        /// </summary>
        [DataMember]
        public DateTime skype_bond_date
        {
            set { _skype_bond_date = value; }
            get { return _skype_bond_date; }
        }
        /// <summary>
        /// msn
        /// </summary>
        [DataMember]
        public string msn
        {
            set { _msn = value; }
            get { return _msn; }
        }
        /// <summary>
        /// 是否绑定msn为账号
        /// </summary>
        [DataMember]
        public bool is_bond_msn
        {
            set { _is_bond_msn = value; }
            get { return _is_bond_msn; }
        }
        /// <summary>
        /// msn绑定时间
        /// </summary>
        [DataMember]
        public DateTime msn_bond_date
        {
            set { _msn_bond_date = value; }
            get { return _msn_bond_date; }
        }
        /// <summary>
        /// 手机
        /// </summary>
        [DataMember]
        public string cell
        {
            set { _cell = value; }
            get { return _cell; }
        }
        /// <summary>
        /// 是否绑定手机为账号
        /// </summary>
        [DataMember]
        public bool is_bond_cell
        {
            set { _is_bond_cell = value; }
            get { return _is_bond_cell; }
        }
        /// <summary>
        /// 手机绑定时间
        /// </summary>
        [DataMember]
        public DateTime cell_bond_date
        {
            set { _cell_bond_date = value; }
            get { return _cell_bond_date; }
        }
        /// <summary>
        /// 网站个人主页地址
        /// </summary>
        [DataMember]
        public string web_website
        {
            set { _web_website = value; }
            get { return _web_website; }
        }
        /// <summary>
        /// 个人网站
        /// </summary>
        [DataMember]
        public string website
        {
            set { _website = value; }
            get { return _website; }
        }
        /// <summary>
        /// 其他用户对于该模块的权限
        /// </summary>
        [DataMember]
        public string permission
        {
            set { _permission = value; }
            get { return _permission; }
        }
        /// <summary>
        /// 是否有效
        /// </summary>
        [DataMember]
        public bool active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }
}
