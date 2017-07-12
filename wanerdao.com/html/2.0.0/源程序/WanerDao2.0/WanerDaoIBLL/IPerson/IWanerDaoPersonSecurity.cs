#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
*  玩儿道用户账号信息相关接口
* 作者：杨晓东   时间：2011/9/30 1:17:21 
* 文件名：IWanerDaoPersonSecurity 
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

using WanerDao2.WanerDaoModel.Person;

namespace WanerDao2.WanerDaoIBLL.IPerson
{
    public interface IWanerDaoPersonSecurity
    {
        #region 登录
        /// <summary>
        /// 验证指定的用户名和密码数据源中是否存在。
        /// </summary>
        /// <param name="dic">用户参数（string account,string password,string isSaveLogin）</param>
        /// <returns>{"result":true,"msg":"登录成功"}</returns>
        string ValidateUser(Dictionary<string, object> dic);

        /// <summary>
        /// 检查是否登录
        /// </summary>
        /// <returns></returns>
        //PersonalSecurityProfileModel GetUserSecurityInfo();

        /// <summary>
        ///  2011/12/28
        /// 王薪杰 
        /// 判断用户是否登录
        /// </summary>
        /// <returns></returns>
        string ValidIfLogin();
        #endregion

        #region 用户账号管理
        /// <summary>
        /// 根据账号获取用户数据库Guid
        /// </summary>
        /// <param name="dic">用户参数（account）</param>
        /// <returns>不存在返回Emputy</returns>
        string GetUserGuidByAccount(Dictionary<string, object> dic);

        /// <summary>
        /// 根据账号获得安全邮箱
        /// </summary>
        /// <param name="account">账号</param>
        /// <returns></returns>
        string GetSecurityEmailByAccount(string account);

        /// <summary>
        /// 冻结用户账号
        /// </summary>
        /// <param name="dic">用户账号（Guid又叫user_id）</param>
        /// <returns></returns>
        string CongealPerson(Dictionary<string, object> dic);

        /// <summary>
        /// 根据GUID解除冻结用户
        /// </summary>
        /// <param name="dic">用户账号（Guid又叫user_id）</param>
        /// <returns></returns>
        string UnCongealByGuid(Dictionary<string, object> dic);

        /// <summary>
        /// 根据账号解除冻结用户
        /// </summary>
        /// <param name="dic">用户账号（Account）</param>
        /// <returns></returns>
        string UnCongealByAccount(Dictionary<string, object> dic);

        /// <summary>
        /// 验证账号是否存在（设置登录账号）
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        bool ValidateAccountExist(string account);

        /// <summary>
        /// 验证账号是否存在
        /// </summary>
        /// <param name="dic">字典（账号，账号类型）</param>
        /// <returns></returns>
        string ValidateAccountExist(Dictionary<string, object> dic);

        /// <summary>
        /// 刷新cookie
        /// </summary>
        /// <param name="userId">用户编号</param>
        void RefreshCookie(string userId);
        #endregion

        #region 用户注册
        /// <summary>
        /// 用户注册
        /// </summary>
        /// <param name="dic">字典（ string usermail, string userpass,string username,
        /// int usersex, int useryear, int usermonth, int userday）</param>
        /// <returns></returns>
        string AddPerson(Dictionary<string, object> dic);

        /// <summary>
        /// 发邮件激活账号
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string ActivatingAccount(Dictionary<string, object> dic);

        /// <summary>
        /// 检查Email是否存在，失败Empty
        /// </summary>
        /// <param name="dic">用户信息（Emai）</param>
        /// <returns></returns>
        string CheckEmailIsExist(Dictionary<string, object> dic);
        #endregion

        #region 申请密保
        /// <summary>
        /// 根据账号密码获取用户安全信息
        /// </summary>
        /// <param name="dic">string account ,pwd</param>
        /// <returns></returns>
        PersonalSecurityProfileModel GetUserSecurityInfo(Dictionary<string, object> dic);

        string SetPwdProtectValidUser(Dictionary<string, object> dic);

        string IsRightOfAccountAndPwd(Dictionary<string, object> dic);

        string GetAllQuestion();

        string ApplyForProtection(Dictionary<string, object> dic);

        #endregion

        #region 找回密码
        /// <summary>
        /// 找回密码，检查账号是否存在，成功返回UserModel 失败Empty 存到cookie
        /// </summary>
        /// <param name="dic">用户账号（Account）</param>
        /// <returns></returns>
        string CheckAccountExist(Dictionary<string, object> dic);

        /// <summary>
        /// 发邮件验证 验证码
        /// </summary>
        /// <param name="email"></param>
        /// <param name="userName"></param>
        /// <param name="context"></param>
        void SendEmailCode(string email, string userName, string context);
        /// <summary>
        /// 找回密码-再次发送验证码
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string FindpwdSendEmailAgain(Dictionary<string, object> dic);

        /// <summary>
        ///找回密码-显示安全邮箱
        /// </summary>
        /// <returns></returns>
        string FindPwdOfGetSecurityEmail();
        /// <summary>
        /// 验证验证码
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string CheckEmailCode(Dictionary<string, object> dic);

        /// <summary>
        /// 找回密码最后一步 修改密码
        /// </summary>
        /// <param name="dic">string password</param>
        /// <returns></returns>
        string FindPwdOfModidyPwd(Dictionary<string, object> dic);

        /// <summary>
        /// 找回密码最后一步 修改密码并登录
        /// </summary>
        /// <param name="dic">string password</param>
        /// <returns></returns>
        string FindPwdOfModidyPwdAndLogin(Dictionary<string, object> dic);

        /// <summary>
        /// 修改密码第一步--验证账号和当前登录的是否一样
        /// </summary>
        /// <param name="dic">string act,pwd</param>
        /// <returns></returns>
        string ValidateCurUserOfImport(Dictionary<string, object> dic);

        /// <summary>
        /// 根据账号修改密码
        /// </summary>
        /// <param name="dic">用户参数（account ,pwd )</param>
        /// <returns></returns>
        string ModifyPwdByAccount(Dictionary<string, object> dic);

        /// <summary>
        /// 修改当前登录用户密码
        /// </summary>
        /// <param name="dic">string password</param>
        /// <returns></returns>
        string ModifyCurPwd(Dictionary<string, object> dic);

        ///// <summary>
        ///// 修改当前登录用户密码并登陆
        ///// </summary>
        ///// <param name="dic">string password</param>
        ///// <returns></returns>
        //string ModifyCurPwdAndLogin(Dictionary<string, object> dic);
        #endregion

        #region 找回账号

        /// <summary>
        /// 检查安全邮箱是否存在
        /// </summary>
        /// <param name="dic">string semail</param>
        /// <returns></returns>
        string CheckSecurityEmailIsExist(Dictionary<string, object> dic);

        /// <summary>
        /// 找回账号获取所有安全问题
        /// </summary>
        /// <returns></returns>
        string FindAccGetSecurityQuestion();

        /// <summary>
        /// 再次发送邮件
        /// </summary>
        /// <returns></returns>
        string FindAccSenAccAgain();

        /// <summary>
        ///  验证问题
        /// </summary>
        /// <param name="dic">问题回答参数Model（string guid,string id1,string q1,string id2,string q2）</param>
        /// <returns></returns>
        string ValidateQuestion(Dictionary<string, object> dic);

        /// <summary>
        /// 获取安全邮箱
        /// </summary>
        /// <returns></returns>
        string FindAccGetSecurtyEmail();
        #endregion
    }
}
