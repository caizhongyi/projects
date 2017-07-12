#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2011/10/4 22:14:34 
* 文件名：WanerDaoPersonSecurity 
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
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoModule.Cookie;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoDALFactory;
using System.Web;
using WanerDao2.WanerDaoModule.Utils;
using WanerDao2.WanerDaoExceptionManager;
using WanerDao2.WanerDaoModule.Security;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoCacheManager;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using WanerDao2.WanerDaoModule.TipInfo;
//using WanerDaoComponent.AppContext;
using WanerDao2.WanerDaoModule.Config;
using WanerDao2.WanerDaoEmailQueue;

namespace WanerDao2.WanerDaoBLL.Person
{
    public class WanerDaoPersonSecurity : IWanerDaoPersonSecurity
    {
        #region IWanerDaoPersonSecurity 成员

        //string account,string password,string isSaveLogin
        //注意字母大小写。isSavaLogin勾选是1，不勾选0
        public string ValidateUser(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string account = dic["account"].ToString();
            string password = dic["password"].ToString();
            bool isSaveLogin = dic["isSaveLogin"].ToString().Equals("1");

            if (!ValidateAccountExist(account))
            {
                return ErrMsg("AccountNotExistAndRg");
            }

            //2012-10-18徐蓓修改，判断在errorMessageCount里是否有canlogin存在
            Dictionary<string, string> errMsg = WanerDaoCookie.GetCookieValues("errorMessageCount");
            if (errMsg != null)
            {
                if (errMsg.ContainsKey("canlogin") && errMsg["canlogin"].ToString() == "no")
                {
                    return ErrMsg("AccountDisable");
                }
            }
            else
            {
                WanerDaoCookie.AddCookie("errorMessageCount", new Dictionary<string, string> { { "errorcount", "0" }, { "canlogin", "yes" } }, 0.2);
            }
            dic.Remove("isSaveLogin");
            var mydic = new Dictionary<string, object>() { { "account", account }, { "password", WanerDaoMD5.MD5(password) } };
            //SetContext(mydic);
            //PersonalSecurityProfileModel PspModel = CommonContext.GetUserSecurityInfo();
            PersonalSecurityProfileModel PspModel = GetUserSecurityInfo(mydic);
            if (PspModel != null)
            {
                WriteCookie(isSaveLogin, PspModel);

                WriteLog(PspModel);

                json = SucMsg("LoginSuccess");
                // WanerDaoLog4Net.Write("登陆信息：用户id(" + mylist[0].user_id + ")登录了。", WanerDaoLog4Net.LogMessageType.Info);
            }
            else
            {
                json = ValidateFailed(json);
            }
            return json;
        }

        private string ValidateFailed(string json)
        {
            Dictionary<string, string> cookdic = new Dictionary<string, string>();
            cookdic = WanerDaoCookie.GetCookieValues("errorMessageCount");
            int errorMessageCount = int.Parse(cookdic["errorcount"].ToString());
            errorMessageCount += 1;
            cookdic.Remove("errorcount");
            cookdic.Add("errorcount", errorMessageCount.ToString());
            if (errorMessageCount >= 5)
            {
                cookdic["canlogin"] = "no";
                WanerDaoCookie.AddCookie("errorMessageCount", cookdic, 0.2);
            }
            else
            {
                WanerDaoCookie.AddCookie("errorMessageCount", cookdic, 0.2);
            }
            json = ErrMsg("LoginFailed");
            return json;
        }

        /// <summary>
        /// 刷新cookie
        /// </summary>
        /// <param name="userId">用户编号</param>
        public void RefreshCookie(string userId)
        {
            PersonalSecurityProfileModel security = GetUserSecurityInfo(userId);
            if (security != null)
                WriteCookie(false, security);
        }

        private PersonalSecurityProfileModel GetUserSecurityInfo(string userId)
        {
            
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", userId);
            IList<PersonalSecurityProfileModel> result = DbHelperFactory.SingleInstance().GetGenericModel<PersonalSecurityProfileModel>("PersonSQL", "GetPersonalSecurityByUserId", param);
            return result != null && result.Count > 0 ? result[0] : null;
        }
            
        private void WriteCookie(bool isSaveLogin, PersonalSecurityProfileModel PspModel)
        {
            Dictionary<string, string> cookie = new Dictionary<string, string>();
            cookie.Add("uid", WanerDaoModule.Security.WanerDaoDES.Encode(PspModel.user_id));
            cookie.Add("account", WanerDaoModule.Security.WanerDaoDES.Encode(PspModel.account));
            cookie.Add("password", WanerDaoModule.Security.WanerDaoDES.Encode(PspModel.password));
            double day = 0;
            if (isSaveLogin)
            {
                day = 720;
            }
            WanerDaoModule.Cookie.WanerDaoCookie.AddCookie("wanerdao_uid", cookie, day);
        }

        private void WriteLog(PersonalSecurityProfileModel pspmodel)
        {
            var loginLogDic = new Dictionary<string, object>(){
                        {"loginid",WanerDaoGuid.GetGuid()},
                        {"user_id",pspmodel.user_id},
                        {"login_date",DateTime.Now.ToString()},
                        {"ipv4",HttpContext.Current.Request.UserHostAddress}
                //,{"ip",HttpContext.Current.Request.UserHostAddress}
                     };
            DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "LoginLog", loginLogDic);
        }

        private void SetContext(Dictionary<string, object> mydic)
        {
            //if (CommonContext.CurrentContext == null)
            //{
            //    CommonContext.CurrentContext = CurrentContext.GetInstance();
            //}
            //CommonContext.GetUserSecurityInfo() = GetUserSecurityInfo(mydic);
        }



        //检查是否登录
        //[Obsolete("请使用CommonContext.GetUserSecurityInfo()来获取")]
        private PersonalSecurityProfileModel GetUserSecurityInfo()
        {
            return CommonContext.GetUserSecurityInfo();
        }

        /// <summary>
        ///  2011/12/28
        /// 王薪杰 
        /// 判断用户是否登录
        /// </summary>
        /// <returns></returns>
        public string ValidIfLogin()
        {
            try
            {
                if (GetUserSecurityInfo() != null)
                {
                    return SucMsg("IsLogged");
                }
                else
                {
                    return ErrMsg("NotLogged");
                }
            }
            catch (Exception)
            {
                return ErrMsg("NotLogged");
            }
        }

        //string account   返回：{"result":true,"msg":"417952fd97f24103baee055cb4e8b01f"}
        public string GetUserGuidByAccount(Dictionary<string, object> dic)
        {
            /*测试数据
            dic.Clear();
            dic.Add("account", "yangxiaodong1214@126.com");*/
            //==============================================
            string json = string.Empty;
            object o = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "GetUserGuidByAccount", dic);
            if (o != null)
            {
                json = SucMsg(o.ToString());
            }
            else
            {
                json = ErrMsg("AccountNotExists");
            }
            return json;
        }

        public string GetSecurityEmailByAccount(string account)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>() { { "account", account } };
            object o = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "GetSecurityEmailByAccount", dic);
            return o.ToString();
        }

        public string GetPersonNameByAccount(string account)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>() { { "account", account } };
            object o = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "GetPersonNameByAccount", dic);
            return o.ToString();
        }

        //冻结用户账号  string user_id  返回：{"result":true,"msg":"成功冻结"}
        public string CongealPerson(Dictionary<string, object> dic)
        {
            /*测试数据
            dic.Clear();
            dic.Add("user_id", "e4caf30e16074242a31360d1aa354131");*/
            //=====================================
            string json = string.Empty;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "CongealPerson", dic);
            if (result > 0)
            {
                json = SucMsg("CongealAccountSuccess");
            }
            else
            {
                json = ErrMsg("CongealAccountFailed");
            }
            return json;
        }

        //根据id解除冻结用户账号  string user_id  返回：{"result":true,"msg":"成功解除冻结"}
        public string UnCongealByGuid(Dictionary<string, object> dic)
        {
            /*测试数据
            dic.Clear();
            dic.Add("user_id", "e4caf30e16074242a31360d1aa354131");*/
            //=====================================
            string json = string.Empty;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UnCongealByGuid", dic);
            if (result > 0)
            {
                json = SucMsg("UnCongealAccountSuccess");
            }
            else
            {
                json = ErrMsg("UnCongealAccountFailed");
            }
            return json;
        }

        //根据账号解除冻结用户账号  string account  返回：{"result":true,"msg":"成功解除冻结"}
        public string UnCongealByAccount(Dictionary<string, object> dic)
        {
            /*测试数据
            dic.Clear();
            dic.Add("account", "yangxiaodong1214@126.com");*/
            //=====================================
            string json = string.Empty;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UnCongealByAccount", dic);
            if (result > 0)
            {
                json = SucMsg("UnCongealAccountSuccess");
            }
            else
            {
                json = ErrMsg("UnCongealAccountFailed");
            }
            return json;
        }
        /// <summary>
        /// /验证用户账号是否存在 
        /// </summary>
        /// <param name="account">用户账号</param>
        /// <returns></returns>
        public bool ValidateAccountExist(string account)
        {
            bool flag = false;
            Dictionary<string, object> dic = new Dictionary<string, object>() { { "account", account } };
            object oresult = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "ValidateAccountExist", dic);
            if (Convert.ToInt32(oresult) > 0)
            {
                flag = true;
            }
            return flag;
        }

        /// <summary>
        /// 退出登录
        /// </summary>
        /// <returns></returns>
        public string ExitLogin()
        {
            WanerDaoCookie.ClearCookie("wanerdao_uid");
            HttpContext.Current.Session.Clear();
            return CommonContext.SucMsg("IsExit");
        }

        //验证用户账号是否存在  string account  返回：{"result":true,"msg":"账号已经存在"}
        public string ValidateAccountExist(Dictionary<string, object> dic)
        {
            /*测试数据
            dic.Clear();
            dic.Add("account", "yangxiaodong1214@126.com");*/
            //=======================================
            string json = string.Empty;
            if (WanerDaoCookie.GetCookieValues("ErrorMessageCount") == null)
            {
                WanerDaoCookie.AddCookie("ErrorMessageCount", new Dictionary<string, string>() { { "errcount", "0" } }, 0.5);
            }
            object oresult = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "ValidateAccountExist", dic);
            if (Convert.ToInt32(oresult) > 0)
            {
                json = SucMsg("AccountIsExists");
                string account = dic["account"].ToString();
                WanerDaoCookie.AddCookie("FindPwdAccount", new Dictionary<string, string>() { { "account", account } }, 0.5);
                string securityEmail = GetSecurityEmailByAccount(dic["account"].ToString());
                Random random = new Random();
                int res = random.Next(1000000, 9999999);

                string userName = GetPersonNameByAccount(account);
                SendEmailCode(securityEmail, userName, res.ToString());
            }
            else
            {
                var str = WanerDaoCookie.GetCookieValues("ErrorMessageCount")["errcount"];
                var resultcount = int.Parse(str);
                resultcount += 1;
                if (resultcount >= 3)
                {
                    json = ErrMsg(resultcount.ToString());
                    WanerDaoCookie.ClearCookie("ErrorMessageCount");
                }
                else
                {
                    json = ErrMsg(resultcount.ToString());
                    WanerDaoCookie.AddCookie("ErrorMessageCount", new Dictionary<string, string>() { { "errcount", resultcount.ToString() } }, 0.5);
                }
            }
            return json;
        }

        //用户注册   string usermail,userpass,username,
        //usersex,useryear,usermonth,userday 性别0为女1为男  返回"result":true,"msg":"注册成功"}
        public string AddPerson(Dictionary<string, object> dic)
        {
            /*测试数据
            dic.Clear();
            dic.Add("usermail", "wanghao2@126.com");
            dic.Add("userpass", "xiaodong678");
            dic.Add("username", "杨晓东");
            dic.Add("usersex", "1");
            dic.Add("useryear", "1990");
            dic.Add("usermonth", "12");
            dic.Add("userday", "13");*/
            //===================================================
            string json = string.Empty;
            string user_id = WanerDaoGuid.GetGuid();
            string security_email = dic["usermail"].ToString().Trim();
            if (!WanerDaoValidation.ValidateEmail(dic["usermail"].ToString()))
            {
                return ErrMsg("EmailError");
            }
            string account_type_id = "ab62cdc5-20ea-11e1-8ab8-000c29a5c50c";//accounttype基础表  这个是Email
            string password = dic["userpass"].ToString().Trim();
            if (WanerDaoValidation.ValidateParameter(ref password, true, true, false, 60))
            {
                password = WanerDaoMD5.MD5(password);
            }
            else { return ErrMsg("PasswordError"); }

            string name = dic["username"].ToString();
            if (!WanerDaoValidation.ValidateParameter(ref password, true, true, false, 60))
            {
                return ErrMsg("NameError");
            }
            try
            {
                int birthday_year = int.Parse(dic["useryear"].ToString());
                int birthday_month = int.Parse(dic["usermonth"].ToString());
                int birthday_day = int.Parse(dic["userday"].ToString());
                bool gender = string.Equals(dic["usersex"].ToString(), "1") ? true : false;
                if (birthday_year <= 0 && birthday_month <= 0 && birthday_day <= 0)
                {
                    return ErrMsg("BirthdayError");
                }
                JObject jo = WanerDaoJSON.ParseJson(CheckAccountExist(new Dictionary<string, object>() { { "account", security_email } }));
                if (jo.First.First.ToString().ToLower().Equals("true"))
                {
                    return ErrMsg("AccountIsExists");
                }
                PersonalSecurityProfileModel pspmodel = new PersonalSecurityProfileModel();
                pspmodel.user_id = user_id;
                pspmodel.account = security_email;
                pspmodel.account_type_id = account_type_id;
                pspmodel.password = password;
                pspmodel.security_email = security_email;

                PersonalProfileModel ppmodel = new PersonalProfileModel();
                // ppmodel.user_id = user_id;
                ppmodel.name = name;
                ppmodel.birthday_year = birthday_year;
                ppmodel.birthday_month = birthday_month;
                ppmodel.birthday_day = birthday_day;
                ppmodel.logo_path = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoPersonalDefaultLogoPath");
                ppmodel.logo_small_path = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoPersonalDefaultSmallLogoPath");
                ppmodel.gender = gender;
                object[] o = new object[] { pspmodel, ppmodel };
                int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("PersonSQL", "Regeist", o);
                if (result > 0)
                {
                    try
                    {
                        WriteLog(pspmodel);
                        WriteCookie(false, pspmodel);

                        //发送注册欢迎邮件
                        WanerDaoMailConfigSchema configMail = new WanerDaoMailConfigSchema();
                        configMail.EmailAddress = new List<string>() { security_email };
                        configMail.MailEnum = WanerDaoMailEnum.CONFIGHTMLMAIL;
                        configMail.MailKey = "welcome";
                        configMail.Subject = "欢迎注册 - 玩儿道";
                        configMail.Content = new List<string>() { name, security_email, DateTime.UtcNow.ToString("yyyy-MM-dd") };
                        WanerDaoMessageQueue.SendEmail(configMail);


                        json = SucMsg("RegisterSuccess");

                    }
                    catch (Exception ex)
                    {
                        result = -1;
                        WanerDaoLog4Net.Write("注册Error", WanerDaoLog4Net.LogMessageType.Error, ex);
                    }
                }
                else
                {
                    json = ErrMsg("RegisterFailed");
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

            return json;
        }
        //发邮件激活账号
        public string ActivatingAccount(Dictionary<string, object> dic)
        {
            string json = string.Empty; return json;
        }

        //检查Emai是否存在 string email  返回：{"result":false,"msg":"该Email不存在"}
        public string CheckEmailIsExist(Dictionary<string, object> dic)
        {
            /*测试数据
            dic.Clear();
            dic.Add("email", "yangsxiaodong1214@126.com");*/
            //========================================
            string json = string.Empty;
            string email = dic["email"].ToString();
            if (!WanerDaoValidation.ValidateEmail(email))
                return ErrMsg("EmailError");
            dic.Add("account", email);
            dic.Remove("email");
            object o = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "CheckEmailIsExist", dic);
            if (int.Parse(o.ToString()) > 0)
            {
                json = SucMsg("EmailIsExisted");
            }
            else
            {
                json = ErrMsg("EmailNotExisted");
            }
            return json;
        }

        //获取用户安全信息  string account,password
        public PersonalSecurityProfileModel GetUserSecurityInfo(Dictionary<string, object> dic)
        {
            /*测试数据
            dic.Clear();
            dic.Add("account", "yangxiaodong1214@126.com");
            dic.Add("password", "xiaodong678");*/
            //========================================

            PersonalSecurityProfileModel pspmodel = null;
            //  dic["password"] = WanerDaoMD5.MD5(dic["password"].ToString());

            IList<PersonalSecurityProfileModel> personlist = new List<PersonalSecurityProfileModel>();
            personlist = DbHelperFactory.SingleInstance().GetGenericModel<PersonalSecurityProfileModel>("PersonSQL", "SelectPersonalSecurity", dic);
            if (personlist != null)
            {
                pspmodel = personlist[0];
                WanerDaoCacheFactory.SingleInstance().GetStrategy(0).AddObject("PersonalSecurityProfile_" + pspmodel.user_id, pspmodel);

            }
            return pspmodel;
        }

        //验证账号密码 string act,pwd  返回：{"result":true,"msg":"验证通过"}
        public string IsRightOfAccountAndPwd(Dictionary<string, object> dic)
        {
            /*测试数据
            dic.Clear();
            dic.Add("act", "yangxiaodong1214@126.com");
            dic.Add("pwd", "xiaodong678");*/
            //========================================
            string json = string.Empty;
            PersonalSecurityProfileModel pspmodel = GetUserSecurityInfo();
            if (dic["act"].ToString().Trim() == pspmodel.account.ToString() && WanerDaoMD5.MD5(dic["pwd"].ToString().Trim()) == pspmodel.password.ToString())
            {
                json = SucMsg("VerificationSuccess");
            }
            else { json = ErrMsg("AccOrPwdError"); }
            return json;
        }

        public string GetAllQuestion()
        {
            return DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "GetAllQuestion",
                new Dictionary<string, object>() { { "language_id", CommonContext.GetClientLanguage() } });
        }

        //申请密保 string q1,a1,q2,q2  返回：{"result":true,"msg":"申请密保成功"}
        public string ApplyForProtection(Dictionary<string, object> dic)
        {
            /*测试数据
            dic.Clear();
            dic.Add("q1", "1");
            dic.Add("a1", "我叫杨晓东");
            dic.Add("q2", "2");
            dic.Add("a2", "我爱唱歌");*/
            //========================================
            string json = string.Empty;
            if (HttpContext.Current.Session["state"] != null)
            {
                if (string.IsNullOrEmpty(dic["a1"].ToString()) || string.IsNullOrEmpty(dic["a2"].ToString()))
                {
                    return ErrMsg("AnswerRequied");
                }
                string[][] strarr = new string[][] { 
             //   new string[]{"account","account"},new string[]{"pwd","password"},
                new string[]{"q1","question_id"},new string[]{"a1","answer"},
                new string[]{"q2","question2_id"},new string[]{"a2","answer2"}
                };
                ReNameDic(strarr, ref dic);
                PersonalSecurityProfileModel pspmodel = GetUserSecurityInfo();
                dic.Add("user_id", pspmodel.user_id);
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "ApplyForProtection", dic);
                if (result > 0)
                {
                    json = SucMsg("ProtectionSuccess");
                }
                else
                {
                    json = SucMsg("ProtectionFailed");
                }
            }
            else
            {
                json = ErrMsg("InputAccAndPwdFirst");
            }
            return json;
        }

        //找回密码，检查账号是否存在   string account  返回：{"result":true,"msg":"该账号已经存在"}
        public string CheckAccountExist(Dictionary<string, object> dic)
        {
            /*测试数据
            dic.Clear();
            dic.Add("account", "yangsxiaodong1214@126.com");*/
            //========================================
            string json = string.Empty;
            if (!WanerDaoValidation.ValidateEmail(dic["account"].ToString()))
                return ErrMsg("EmailError");
            object o = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "CheckEmailIsExist", dic);
            if (int.Parse(o.ToString()) > 0)
            {
                json = SucMsg("AccountIsExists");

            }
            else
            {
                json = ErrMsg("AccountNotExists");
            }
            return json;
        }

        //发邮件发送验证码 string email
        public void SendEmailCode(string email,string userName, string context)
        {
            //HttpContext.Current.Session["code"] = context;
            //WanerDaoMailSimpleSchema simpleMail = new WanerDaoMailSimpleSchema();
            //simpleMail.EmailAddress = email;
            //simpleMail.Subject = "找回密码验证码 - 玩儿道";
            //simpleMail.MailEnum = WanerDaoMailEnum.TEXTMAIL;
            //simpleMail.Content = string.Format("您的验证码是{0},这是玩儿道发送给您用于找回密码的的邮件,如果您并未进行此操作请忽略", context);

            WanerDaoMailConfigSchema configMail = new WanerDaoMailConfigSchema();
            configMail.EmailAddress = new List<string>() { email };
            configMail.MailEnum = WanerDaoMailEnum.CONFIGHTMLMAIL;
            configMail.MailKey = "findPassword";
            configMail.Subject = "找回密码验证码 - 玩儿道";
            configMail.Content = new List<string>() { userName, context,WanerDaoUtils.GetUTCTime("yyyy/MM/dd hh:mm:ss:") };
            WanerDaoMessageQueue.SendEmail(configMail);
        }

        //找回密码再次发送验证码
        public string FindpwdSendEmailAgain(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            if (WanerDaoCookie.GetCookieValues("FindPwdAccount") != null)
            {
                string account = WanerDaoCookie.GetCookieValues("FindPwdAccount")["account"];
                string securityEmail = GetSecurityEmailByAccount(account);
                //验证码生成=================
                Random random = new Random();
                int res = random.Next(1000000, 9999999);
                string userName = GetPersonNameByAccount(account);
                SendEmailCode(securityEmail, userName, res.ToString());
                json = SucMsg("SendSuccess");
            }
            else
            {
                json = ErrMsg("InputAccount");
            }
            return json;
        }
        //找回密码-显示安全邮箱
        public string FindPwdOfGetSecurityEmail()
        {
            string json;
            if (WanerDaoCookie.GetCookieValues("FindPwdAccount") != null)
            {
                string securityEmail = GetSecurityEmailByAccount(WanerDaoCookie.GetCookieValues("FindPwdAccount")["account"]);
                json = WanerDaoJSON.GetSuccessJson(securityEmail);
            }
            else
            {
                json = ErrMsg("InputAccount");
            }
            return json;
        }
        //string code  找回密码验证验证码
        public string CheckEmailCode(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            if (WanerDaoCookie.GetCookieValues("FindPwdAccount") != null)
            {
                if (dic["code"].ToString().Equals(HttpContext.Current.Session["code"].ToString()))
                {
                    json = SucMsg("VerificationSuccess");
                }
                else
                {
                    json = ErrMsg("VerificationFailed");
                }
            }
            else
            {
                json = ErrMsg("InputAccount");
            }
            return json;
        }

        //找回密码最后一步修改密码 string password
        public string FindPwdOfModidyPwd(Dictionary<string, object> dic)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            string json = string.Empty;
            if (WanerDaoCookie.GetCookieValues("FindPwdAccount") != null)
            {
                string account = WanerDaoCookie.GetCookieValues("FindPwdAccount")["account"];
                //dic["password"] = WanerDaoMD5.MD5(dic["password"].ToString());
                dic.Add("account", account);

                //设置本地的临时参数，不能修改函数的传入参数。2012-10-18徐蓓修改。
                param.Add("account", account);
                param.Add("password", WanerDaoMD5.MD5(dic["password"].ToString()));

                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "ModifyPwdByAccount", param);
                if (result > 0)
                {
                    WanerDaoCacheFactory.SingleInstance().GetStrategy(0).RemoveObject("wanerdao_uid");
                    WanerDaoCookie.ClearCookie("FindPwdAccount");
                    json = SucMsg("UpdateInfoCn");
                }
                else { json = SucMsg("UpdateFailInfoCn"); }
            }
            else
            {
                json = ErrMsg("InputAccount");
            }
            return json;
        }
        //找回密码最后一步修改密码重设并且登录 string password
        public string FindPwdOfModidyPwdAndLogin(Dictionary<string, object> dic)
        {
            JObject jo = JObject.Parse(FindPwdOfModidyPwd(dic));
            if (jo["result"].ToString().ToLower() == "true")
            {
                Dictionary<string, object> newdic = new Dictionary<string, object>(){
                {"account", WanerDaoCookie.GetCookieValues("FindPwdAccount")["account"]},
                {"password",dic["password"].ToString()},
                {"isSaveLogin","0"}
                 };
                return ValidateUser(newdic);
            }
            else
            {
                return ErrMsg("UpdateFailInfoCn");
            }

        }

        //修改密码第一步--验证账号和当前登录的是否一样
        //string act,pwd
        public string ValidateCurUserOfImport(Dictionary<string, object> dic)
        {
            PersonalSecurityProfileModel pspmodel = new PersonalSecurityProfileModel();
            pspmodel = GetUserSecurityInfo();
            if (dic["act"].ToString() == pspmodel.account && WanerDaoMD5.MD5(dic["pwd"].ToString()) == pspmodel.password)
            {
                HttpContext.Current.Session["ValidateCurUserOfImport"] = true;
                WanerDaoCacheFactory.SingleInstance().GetStrategy(0).RemoveObject("wanerdao_uid");
                return SucMsg("VerificationSuccess");
            }
            else
            {
                return ErrMsg("VerificationFailed");
            }
        }

        //修改当前登录用户密码 string password
        public string ModifyCurPwd(Dictionary<string, object> dic)
        {
            if (HttpContext.Current.Session["ValidateCurUserOfImport"] != null)
            {
                if ((bool)HttpContext.Current.Session["ValidateCurUserOfImport"])
                {
                    PersonalSecurityProfileModel pspmodel = new PersonalSecurityProfileModel();
                    pspmodel = GetUserSecurityInfo();
                    if (pspmodel != null)
                    {
                        string password = WanerDaoMD5.MD5(dic["password"].ToString());
                        string orginPassword = dic["password"].ToString();
                        dic.Add("user_id", pspmodel.user_id);
                        dic.Remove("password");
                        dic.Add("password", password);
                        int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "ModifyCurPwd", dic);
                        if (result > 0)
                        {
                            WanerDaoCacheFactory.SingleInstance().GetStrategy(0).RemoveObject("PersonalSecurityProfile_" + pspmodel.user_id);
                            dic = new Dictionary<string, object>();
                            dic.Add("account", pspmodel.account);
                            dic.Add("isSaveLogin", "0");
                            dic.Add("password", orginPassword);
                            ValidateUser(dic);
                            pspmodel = GetUserSecurityInfo();
                            
                            return SucMsg("UpdateInfoCn");
                        }
                        else
                        {
                            return ErrMsg("UpdateFailInfoCn");
                        }
                    }
                    else
                    {
                        return ErrMsg("LoginFirst");
                    }
                }
                else
                {
                    return ErrMsg("VerificationOneStep");
                }
            }
            else
            {
                return ErrMsg("VerificationOneStep");
            }

        }

        //修改当前登录用户密码 string password
        //public string ModifyCurPwdAndLogin(Dictionary<string, object> dic)
        //{
        //    JObject jo = JObject.Parse(ModifyCurPwd(dic));
        //    if (jo["result"].ToString().ToLower() == "true")
        //    {
        //        PersonalSecurityProfileModel pspmodel = new PersonalSecurityProfileModel();
        //        pspmodel = GetUserSecurityInfo();
        //        dic.Add("account", pspmodel.account);
        //        dic.Add("isSaveLogin", "0");
        //        ValidateUser(dic);
        //        return SucMsg("UpdateInfoCn");
        //    }
        //    else
        //    {
        //        return ErrMsg("UpdateFailInfoCn");
        //    }
        //}

        //根据账号找回密码  string mima  返回{"result":true,"msg":"密码修改成功"}
        public string ModifyPwdByAccount(Dictionary<string, object> dic)
        {
            /*测试数据
            dic.Clear();
           // dic.Add("zhanghao", "yangxiaodong1214@126.com");
            dic.Add("mima", "password");*/
            //========================================
            //WanerDaoCacheFactory.SingleInstance().GetStrategy(0).
            string json = string.Empty;
            if (WanerDaoCookie.GetCookieValues("FindPwdAccount") == null)
            {
                return ErrMsg("InputAccountFirst");
            }
            string account = WanerDaoCookie.GetCookieValues("FindPwdAccount")["account"];
            dic.Add("zhanghao", account);
            string[][] strarr = new string[][] { new string[] { "zhanghao", "account" }, new string[] { "mima", "password" } };
            ReNameDic(strarr, ref dic);
            string password = dic["password"].ToString();
            dic.Remove("password");
            dic.Add("password", WanerDaoMD5.MD5(password));
            int i = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "ModifyPwdByAccount", dic);
            if (i > 0)
            {
                json = SucMsg("UpdateInfoCn");
                //Dictionary<string,string> cookies = WanerDaoCookie.GetCookieValues("wanerdao_uid");
                //WanerDaoCookie.ClearCookie("wanerdao_uid");
                //WanerDaoCookie.AddCookie("wanerdao_uid", cookies, 0);
                //修改成功之后登录
                dic.Add("isSaveLogin", "0");
                ValidateUser(dic);
                if (WanerDaoCookie.GetCookieValues("FindPwdAccount") != null)
                {
                    WanerDaoCookie.ClearCookie("FindPwdAccount");
                }
            }
            else { json = ErrMsg("UpdateFailInfoCn"); }
            return json;

        }

        //string semail  检查安全邮箱是否存在
        public string CheckSecurityEmailIsExist(Dictionary<string, object> dic)
        {
            string json = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "CheckSecurityEmailIsExist", dic).ToString();
            if (int.Parse(json) <= 0)
            {
                return ErrMsg("SecurityEmailNotExist");
            }
            else
            {
                HttpContext.Current.Session["findAccountEmail"] = dic["semail"].ToString();
                return SucMsg("SecurityEmailExist");
            }
        }

        // 查找安全问题 
        public string FindAccGetSecurityQuestion()
        {
            string json;
            if (HttpContext.Current.Session["findAccountEmail"] == null)
            {
                return ErrMsg("InputEmailFirst");
            }
            string semail = HttpContext.Current.Session["findAccountEmail"].ToString();
            Dictionary<string, object> dic = new Dictionary<string, object>() { { "security_email", semail }, { "language_id", CommonContext.GetClientLanguage() } };
            json = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "FindAccGetSecurityQuestion", dic);
            return json;
        }

        private PersonalSecurityProfileModel SelectAllSecurityQuestion()
        {

            if (HttpContext.Current.Session["findAccountEmail"] != null)
            {
                string semail = HttpContext.Current.Session["findAccountEmail"].ToString();
                Dictionary<string, object> dic = new Dictionary<string, object>() { { "security_email", semail } };
                IList<PersonalSecurityProfileModel> pspmodellist = DbHelperFactory.SingleInstance().GetGenericModel<PersonalSecurityProfileModel>("PersonSQL", "SelectAllSecurityQuestion", dic);
                //StringBuilder sb = new StringBuilder();
                //System.IO.StringWriter sw = new System.IO.StringWriter(sb);
                //using (JsonWriter jw = new JsonTextWriter(sw))
                //{
                //    jw.Formatting = Formatting.Indented;
                //    jw.WriteStartObject();
                //    jw.WritePropertyName(pspmodel.question_id != null ? pspmodel.question_id : "result");
                //    jw.WriteValue(pspmodel.answer != null ? pspmodel.answer : string.Empty);
                //    jw.WritePropertyName(pspmodel.question2_id != null ? pspmodel.question2_id : "msg");
                //    jw.WriteValue(pspmodel.answer2 != null ? pspmodel.answer2 : string.Empty);
                //    jw.WriteEnd();

                //}
                return pspmodellist[0];
            }
            else
            {
                return null;
            }
        }

        //再次发送邮件-找回账号
        public string FindAccSenAccAgain()
        {
            if (HttpContext.Current.Session["findAccountEmail"] != null)
            {
                PersonalSecurityProfileModel pspmodel = SelectAllSecurityQuestion();
                return SucMsg(pspmodel.account);
            }
            else
            {
                return ErrMsg("InputEmailFirst");
            }
        }

        //获取安全邮箱
        public string FindAccGetSecurtyEmail()
        {
            if (HttpContext.Current.Session["findAccountEmail"] != null)
            {
                return SucMsg(HttpContext.Current.Session["findAccountEmail"].ToString());
            }
            else
            {
                return ErrMsg("InputEmailFirst");
            }
        }

        //验证问题是否正确  string a1,a2  返回：{"result":true,"msg":"问题验证成功"}
        public string ValidateQuestion(Dictionary<string, object> dic)
        {
            /*测试数据
            dic.Clear();
            dic.Add("a1", "我叫杨晓东");
            dic.Add("a2", "我爱唱歌");*/
            //========================================
            string json = string.Empty;
            if (SelectAllSecurityQuestion() == null)
            {
                return ErrMsg("InputSecurityEmailFirst");
            }
            PersonalSecurityProfileModel pspmodel = SelectAllSecurityQuestion();
            if (dic["an1"].ToString() == pspmodel.answer && dic["an2"].ToString() == pspmodel.answer2)
            {
                json = SucMsg("VerificationSuccess");
            }
            else
            {
                json = ErrMsg("VerificationFailed");
            }
            return json;
        }
        //string act,pwd  
        public string SetPwdProtectValidUser(Dictionary<string, object> dic)
        {
            string json = IsRightOfAccountAndPwd(dic);
            JObject jo = WanerDaoJSON.ParseJson(json);
            if ((bool)jo["result"])
            {
                HttpContext.Current.Session["state"] = true;
                return json;
            }
            else
            {
                if (HttpContext.Current.Session["errorcount"] != null)
                {
                    int errorcount = (int)HttpContext.Current.Session["errorcount"];
                    if (errorcount >= 5)
                    {
                        return ErrMsg("no");
                    }
                    else
                    {
                        HttpContext.Current.Session["errorcount"] = errorcount + 1;
                        return ErrMsg("VerificationFailed");
                    }
                }
                else
                {
                    HttpContext.Current.Session["errorcount"] = 1;
                    return ErrMsg("VerificationFailed");
                }
            }
        }

        #endregion

        #region 私有成员

        //private void ReNameDic(string[][] str, ref  Dictionary<string, object> dic)
        //{
        //    Dictionary<string, object> mydic = new Dictionary<string, object>();
        //    foreach (var arr in str)
        //    {
        //        mydic.Add(arr[1], dic[arr[0]]);
        //    }
        //    dic.Clear();
        //    dic = mydic;
        //    mydic = null;
        //}

        private string SucMsg(string key)
        {
            string tipLanguage = WanerDaoGlobalTip.GetInternationalizationTip(key);
            return WanerDaoJSON.GetSuccessJson(tipLanguage);
        }
        private string ErrMsg(string key)
        {
            string tipLanguage = WanerDaoGlobalTip.GetInternationalizationTip(key);
            return WanerDaoJSON.GetErrorJson(tipLanguage);
        }

        private void ReNameDic(string[][] str, ref  Dictionary<string, object> dic)
        {
            System.Collections.ArrayList list = new System.Collections.ArrayList(dic.Keys);
            foreach (string key in list)
            {
                foreach (string[] arr in str)
                {
                    if (arr != null && arr.Length >= 2)
                    {
                        if (arr[0] == key)
                        {
                            dic.Add(arr[1], dic[key]);
                            dic.Remove(key);
                        }
                    }
                }
            }
        }
        #endregion

    }
}
