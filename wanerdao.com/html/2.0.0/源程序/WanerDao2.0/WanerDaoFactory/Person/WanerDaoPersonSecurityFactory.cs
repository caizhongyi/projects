#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2011/10/15 12:14:39 
* 文件名：WanerDaoPersonFactory 
* 版本：V1.0.1 
* 
* 修改者：王薪杰 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion

using System;
using System.Web;
using System.Web.SessionState;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoModule.String;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.Utils;
using System.Collections;
using System.Collections.Generic;
using WanerDao2.WanerDaoModel.Person;

namespace WanerDao2.WanerDaoBLLFactory.Person
{
    public class WanerDaoPersonSecurityFactory : IHttpHandler, IRequiresSessionState
    {
        /// <summary>
        /// 您将需要在您网站的 web.config 文件中配置此处理程序，
        /// 并向 IIS 注册此处理程序，然后才能进行使用。有关详细信息，
        /// 请参见下面的链接: http://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpHandler Members

        public bool IsReusable
        {
            // 如果无法为其他请求重用托管处理程序，则返回 false。
            // 如果按请求保留某些状态信息，则通常这将为 false。
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Cache.SetCacheability(HttpCacheability.ServerAndNoCache);
            string json = string.Empty;
            string typestr = WanerDaoValidation.ValidateParamters(context.Request.Form.ToString());
            if (typestr == string.Empty)
            {
                json = WanerDaoJSON.GetErrorJson("no operator type or invalid operator!");
            }
            else
            {
                IWanerDaoPersonSecurity ps = new WanerDao2.WanerDaoBLL.Person.WanerDaoPersonSecurity() as IWanerDaoPersonSecurity;

                if (ps == null)
                {
                    json = WanerDaoJSON.GetErrorJson("没有对应类型处理!");
                }
                else
                {
                    Dictionary<string, object> dic = WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());
                    switch (typestr)
                    {
                        #region 登录注册
                        case "login":
                            //string account,string password,string isSaveLogin
                            //注意字母大小写。isSavaLogin勾选是1，不勾选0
                                json = ps.ValidateUser(dic);
                            break;
                        case "indexlogin":
                            //string account,string password,string isSaveLogin
                            //注意字母大小写。isSavaLogin勾选是1，不勾选0
                            json = ps.ValidateUser(dic);
                            break;
                        case "register":
                            json = WanerDaoJSON.GetErrorJson("滑动按钮未解锁!");
                            if (context.Session["iQaptcha"] != null && dic["iQapTcha"] != null)
                            {
                                //用户注册   string usermail,userpass,username,
                                //usersex,useryear,usermonth,userday 性别0为女1为男  返回"result":true,"msg":"注册成功"}
                                json = ps.AddPerson(dic);
                            }
                            break;

                        #endregion

                        #region 找回密码
                        case "validateaccountexist"://找回密码第一步 - 验证账号
                            //验证用户账号是否存在  string account  返回：{"result":true,"msg":"账号已经存在"}
                                json = ps.ValidateAccountExist(dic);
                            break;
                        
                        case "findpwdvalidemailcode"://找回密码第二步 - 验证验证码
                                json = ps.CheckEmailCode(dic);
                            break;
                        case "findpwdgetsecurityemail"://找回密码第二步 - 获取安全邮箱，用于在前台显示
                            json = ps.FindPwdOfGetSecurityEmail();
                            break;

                        case "findpwdsendemail"://找回密码第二步 - 再次发送验证码
                            json = ps.FindpwdSendEmailAgain(dic);
                            break;

                        case "findpwdmodifypwd"://找回密码第三步 - 修改密码
                            json = ps.FindPwdOfModidyPwd(dic);
                            break;
                        case "findpwdmodifypwdandlogin"://找回密码第三步 - 修改密码并且登录
                            json = ps.FindPwdOfModidyPwdAndLogin(dic);
                            break;
                        #endregion

                        #region 找回账号
                        case "checksecurityemialisexist"://找回账号第一步 - 验证安全邮箱是否存在
                                json = ps.CheckSecurityEmailIsExist(dic);
                            break;

                        case "findaccgetsecurityquestion"://找回账号第二步 - 获取安全问题
                            json = ps.FindAccGetSecurityQuestion();
                            break;

                        case "findaccvalidsecurityquesion"://找回账号第二步 - 验证安全问题
                            json = ps.ValidateQuestion(dic);
                            break;

                        case "findaccgetsecurityemail"://找回账号第三步 - 获取安全邮箱
                            json = ps.FindAccGetSecurtyEmail();
                            break;

                        case "findaccsendaccagain"://找回账号第三不 - 再次发送账号到安全邮箱
                            json = ps.FindAccSenAccAgain();
                            break;
                        #endregion

                        #region 申请密保
                        case "setpwdprotectvaliduser"://申请密保 - 验证用户
                            json = ps.SetPwdProtectValidUser(dic);
                            break;

                        case "setpwdprotectaddquestion"://申请密保 - 添加问题
                            json = ps.ApplyForProtection(dic);
                            break;
                        #endregion

                        #region 修改密码
                        case "editpassvaliduser"://修改密码第一步 - 验证用户
                            json = ps.ValidateCurUserOfImport(dic);
                            break;
                        case "editpassmodifypass": //修改密码第二步 - 修改密码
                            json = ps.ModifyCurPwd(dic);
                            break;
                        #endregion

                        #region 公共
                        case "getallsecurityquestion"://获取所有安全问题
                            json = ps.GetAllQuestion();
                            break;

                        case "checkaccountexist":
                            //验证邮箱，检查账号是否存在   string account  返回：{"result":true,"msg":"该账号已经存在"}
                            json = ps.CheckAccountExist(dic);
                            break;
                        #endregion

                        case "loginvalid"://判断是否登录
                            json = ps.ValidIfLogin();
                            break;
                        #region 暂未使用
                        case "activatingaccount":
                            //发邮件 激活账号
                            //json = ps.ActivatingAccount(dic);
                            break;
                        //case "applyforprotection":
                        //    //申请密保 string q1,a1,q2,q2  返回：{"result":true,"msg":"申请密保成功"}
                        //    json = ps.ApplyForProtection(dic); 
                        //    break;

                      
                        case "checkemailcode":
                            // 验证 邮件的验证码 string code
                            //  json =ps.CheckEmailCode(dic);
                            break;
                        case "checkemailisexist":
                            //检查Emai是否存在 string email  返回：{"result":false,"msg":"该Email不存在"}
                            json = ps.CheckEmailIsExist(dic);
                            break;
                        case "congealperson":
                            //冻结用户账号  string user_id  返回：{"result":true,"msg":"成功冻结"}
                            json = ps.CongealPerson(dic);
                            break;
                        case "getuserguidbyaccount":
                            //string account   返回：{"result":true,"msg":"417952fd97f24103baee055cb4e8b01f"}
                            json = ps.GetUserGuidByAccount(dic);
                            break;
                     
                        case "selectallsecurityquestion":
                            // 查找安全问题  为空返回{"result":"","msg":""}, 否则返回 {"1": "我叫杨晓东","2": "我爱跳舞"}
                            //json = ps.SelectAllSecurityQuestion();
                            break;

                        case "uncongealbyaccount":
                            ////根据账号解除冻结用户账号  string account  返回：{"result":true,"msg":"成功解除冻结"}
                            json = ps.UnCongealByAccount(dic);
                            break;

                        case "uncongealbyguid":
                            ////根据id解除冻结用户账号  string user_id  返回：{"result":true,"msg":"成功解除冻结"}
                            json = ps.UnCongealByGuid(dic);
                            break;

                        case "validatequestion":
                            //验证问题是否正确  string a1,a2  返回：{"result":true,"msg":"问题验证成功"}
                            json = ps.ValidateQuestion(dic);
                            break;
                        #endregion
                    }
                }
            }
            context.Response.Write(json);
        }

        #endregion
    }
}
