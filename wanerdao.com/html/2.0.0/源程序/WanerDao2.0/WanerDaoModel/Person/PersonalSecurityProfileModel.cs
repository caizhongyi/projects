#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人安全基本信息
* 作者：杨晓东   时间：2011/10/1 18:20:59 
* 文件名：PersonalSecurityProfileModel 
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
    /// 个人安全信息
    /// </summary>
    [Serializable]
    public partial class PersonalSecurityProfileModel
    {
        public PersonalSecurityProfileModel()
        { }
        #region Model
        private string _user_id;
        private string _account;
        private string _account_type_id;
        private string _password;
        private string _security_email;
        private string _question_id;
        private string _answer;
        private string _question2_id;
        private string _answer2;
        /// <summary>
        /// 用户号
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 账号
        /// </summary>
        public string account
        {
            set { _account = value; }
            get { return _account; }
        }
        /// <summary>
        /// 账号类型
        /// </summary>
        public string account_type_id
        {
            set { _account_type_id = value; }
            get { return _account_type_id; }
        }
        /// <summary>
        /// 密码
        /// </summary>
        public string password
        {
            set { _password = value; }
            get { return _password; }
        }
        /// <summary>
        /// 安全邮箱
        /// </summary>
        public string security_email
        {
            set { _security_email = value; }
            get { return _security_email; }
        }
        /// <summary>
        /// 第一个问题问题号
        /// </summary>
        public string question_id
        {
            set { _question_id = value; }
            get { return _question_id; }
        }
        /// <summary>
        /// 第一个问题答案
        /// </summary>
        public string answer
        {
            set { _answer = value; }
            get { return _answer; }
        }
        /// <summary>
        /// 第二个问题问题号
        /// </summary>
        public string question2_id
        {
            set { _question2_id = value; }
            get { return _question2_id; }
        }
        /// <summary>
        /// 第二个问题答案
        /// </summary>
        public string answer2
        {
            set { _answer2 = value; }
            get { return _answer2; }
        }
        #endregion Model

    }
}
