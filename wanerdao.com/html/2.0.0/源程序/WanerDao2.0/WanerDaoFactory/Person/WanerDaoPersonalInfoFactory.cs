#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：王薪杰   时间：2011/10/31 12:14:39 
* 文件名：WanerDaoPersonalInfo 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
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
    public class WanerDaoPersonalInfoFactory : IHttpHandler, IRequiresSessionState
    { /// <summary>
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
                IWanerDaoPersonInfoManager personalInfo = new WanerDao2.WanerDaoBLL.Person.WanerDaoPersonInfoManager() as IWanerDaoPersonInfoManager;

                if (personalInfo == null)
                {
                    json = WanerDaoJSON.GetErrorJson("没有对应类型处理!");
                }
                else
                {
                    Dictionary<string, object> dic = WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());
                    switch (typestr)
                    {
                        #region 个人资料编辑
                        case "getpersonalnamecard"://获取用户个人名片
                            json = personalInfo.GetPersonNameCard(dic);
                            break;
                        case "update_is_available"://设置个人名片可见状态
                            json = personalInfo.UpdateNameCardVisible(dic);
                            break;
                        case "update_is_display_contellation"://设置个人名片星座可见状态
                            json = personalInfo.UpdateConstellation(dic);
                            break;
                        case "update_is_display_home"://设置个人名片家乡可见状态
                            json = personalInfo.UpdateHome(dic);
                            break;
                        case "update_is_display_current_place"://设置个人名片所在地可见状态
                            json = personalInfo.UpdateCurrentPlace(dic);
                            break;
                        case "update_is_display_school"://设置个人名片学校可见状态
                            json = personalInfo.UpdateSchool(dic);
                            break;
                        case "update_is_display_work"://设置个人名片工作可见状态
                            json = personalInfo.UpdateWord(dic);
                            break;
                        case "getpersonalprofile"://获取当前用户基本信息
                            json = personalInfo.GetPersonalProfile(dic);
                            break;
                        case "getpersonaleducation"://获取用户教育信息
                            json = personalInfo.SelectPersonalEducation(dic);
                            break;
                        case "getpersonalwork"://获取当前用户工作信息
                            json = personalInfo.SelectPersonalWork(dic);
                            break;
                        case "getpersonalinterests"://获取当前用户个人爱好
                            json = personalInfo.GetPersonalInterests(dic);
                            break;
                        case "getpersonalcontact"://获取当前用户联系方式
                            json = personalInfo.GetPersonalContact(dic);
                            break;
                        case "updatepersonalprofile"://修改当前用户个人简介
                            json = personalInfo.UpdatePersonalProfile(dic);
                            break;
                        case "updatepersonalinterests"://修改当前用户个人兴趣
                            json = personalInfo.UpdatePersonalInterests(dic);
                            break;
                        case "updatepersonalcontact"://修改当前用户个人联系方式
                            json = personalInfo.UpdatePersonalContact(dic);
                            break;
                        case "updatepersonalworksetting"://修改当前用户工作信息
                            json = personalInfo.SetingPersonalWork(dic);
                            break;
                        case "getcurintegrityscore"://获取当前用户完成度
                            json = personalInfo.GetExp();
                            break;
                        case "getcurconstellation"://获取当前用户个人星座
                            json = personalInfo.GetConstellation();
                            break;
                        case "getcurhome"://获取当前用户家乡
                            json = personalInfo.GetHome();
                            break;
                        case "getcurcurrentplace"://获取当前用户当前所在地
                            json = personalInfo.GetCurrentPlace();
                            break;
                        case "getcurschool"://获取当前用户学校
                            json = personalInfo.GetSchool();
                            break;
                        case "getcurwork"://获取当前用户工作
                            json = personalInfo.GetWork();
                            break;
                        case "setemailasacc"://当前用户设置email为账号
                            json = personalInfo.SettingEmailToAccount();
                            break;
                        case "setskypeasacc"://当前用户设置skype为账号
                            json = personalInfo.SettingSkypeToAccount();
                            break;
                        case "setmsnasacc"://当前用户设置msn为账号
                            json = personalInfo.SettingMSNToAccount();
                            break;
                        case "settelasacc"://当前用户设置cell为账号
                            json = personalInfo.SettingCellToAccount();
                            break;
                        case "getworkpermission"://获取当前用户工作访问权限
                            json = personalInfo.GetWorkPermission();
                            break;
                        case "geteducationpermission"://获取当前用户教育访问权限
                            json = personalInfo.GetWorkPermission();
                            break;
                        case "updatepersonalprofilepermission"://修改当前用户基本信息权限
                            json = personalInfo.UpdatePersonalProfilePermission(dic);
                            break;
                        case "updatepersonaleduationpermission"://修改当前用户教育信息权限
                            json = personalInfo.UpdateEducationPermission(dic);
                            break;
                        case "updatepersonalworkpermission"://修改当前用户工作信息权限
                            json = personalInfo.UpdateWorkPermission(dic);
                            break;
                        case "updatepersonalinterestspermission"://修改当前用户兴趣爱好权限
                            json = personalInfo.UpdateInterestsPermission(dic);
                            break;
                        case "updatepersonalcontactpermission"://修改当前用户 联系方式权限
                            json = personalInfo.UpdateContactPermission(dic);
                            break;
                        case "updateifcanoutsearch"://是否能被站外搜索
                            json = personalInfo.UpdateIfCanBeOutManSearch(dic);
                            break;
                        case "updatecanmsgpermission"://谁能跟用户打招呼
                            json = personalInfo.UpdateCanMsgToPermission(dic);
                            break;
                        case "updatesendfriendrequestpermission"://谁能向用户发送好友申请
                            json = personalInfo.UpdateCanSendFriendRequestPermission(dic);
                            break;
                        case "addpersonalwork"://添加个人工作信息
                            json = personalInfo.AddPersonalWork(dic);
                            break;
                        case "updatepersonalwork"://更新个人工作信息
                            json = personalInfo.UpdatePersonalWork(dic);
                            break;
                        case "deletepersonalwork"://删除个人工作信息
                            json = personalInfo.DeletePersonalWork(dic);
                            break;
                        case "addpersonaleducation"://添加个人教育信息
                            json = personalInfo.AddPersonalEducation(dic);
                            break;
                        case "updatepersonaleducation"://修改个人教育信息
                            json = personalInfo.UpdatePersonalEducation(dic);
                            break;
                        case "deletepersonaleducation"://删除个人教育信息
                            json = personalInfo.DeletePersonalEducation(dic);
                            break;
                        case "ajaxgetbasicschool":
                            /// Ajax获取学校信息
                            /// </summary>
                            /// <param name="dic">string school_typeid(学校类型id数字）,string keyword(关键字)</param>
                            /// <returns>5条</returns>
                            json = personalInfo.AjaxGetBasicSchool(dic);
                            break;
                        case "ajaxgetbasicmajor":
                            /// <summary>
                            /// Ajax获取专业信息
                            /// </summary>
                            /// <param name="dic">string keyword(关键字)</param>
                            /// <returns>5条</returns>
                            json = personalInfo.AjaxGetBasicMajor(dic);
                            break;
                        case "ajaxgetcompanybasic":
                            /// <summary>
                            /// Ajax获取单位名称信息
                            /// </summary>
                            /// <param name="dic">string keyword</param>
                            /// <returns>5条</returns>
                            json = personalInfo.AjaxGetCompanyBasic(dic);
                            break;
                        case "ajaxgetpositionbasic":
                            /// <summary>
                            /// Ajax获取职位名称信息
                            /// </summary>
                            /// <param name="dic">string keyword,parentid(行业传-1）</param>
                            /// <returns>5条</returns>
                            json = personalInfo.AjaxGetPositionBasic(dic);
                            break;
                        #endregion
                    }
                }
            }
            context.Response.ContentType = "UTF-8";
            context.Response.Write(json);
        }

        #endregion
    }
}