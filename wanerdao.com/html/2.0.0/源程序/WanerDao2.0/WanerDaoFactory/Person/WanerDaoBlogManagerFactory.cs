#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：王薪杰   
* 文件名：WanerDaoBlogManagerFactory 
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
using System.Web;
using System.Web.SessionState;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoModule.String;
using WanerDao2.WanerDaoModel.Person;

namespace WanerDao2.WanerDaoBLLFactory.Person
{
    public class WanerDaoBlogManagerFactory : IHttpHandler, IRequiresSessionState
    {

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
                IWanerDaoBlogManager pblog = new WanerDao2.WanerDaoBLL.Person.WanerDaoBlogManager() as IWanerDaoBlogManager;
                PersonalSecurityProfileModel personalSecurity = CommonContext.GetUserSecurityInfo();
                string userId = personalSecurity.user_id;
                {
                    Dictionary<string, object> dic = WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());
                    Dictionary<string, object> param = new Dictionary<string, object>();
                    switch (typestr)
                    {
                        #region 日志主页
                        case "getbloglist"://日志主页搜索
                            json = pblog.SearchOfIndex(dic);
                            break;

                        case "getblogcountbyarticle"://获取文章分类 根据用户编号
                            json = pblog.SelectPersonBlogCategory(dic);
                            break;

                        case "getblogcategorybycurruser":
                            param.Add("user_id", userId);
                            json = pblog.GetBlogCategories(userId);
                            break;
                        case "getblogcategorybycurruserwithformat"://根据用户编号获取文章分类，json格式为{id:'',value:''}
                            param = new Dictionary<string, object>();
                            param.Add("user_id", userId);
                            json = pblog.GetBlogCategoriesWithFormat(userId);
                            break;
                        case "getblogcountbycatdate"://获取时间分类
                            json = pblog.PersonBlogCategoryOfTime(dic);
                            break;

                        #endregion

                        #region 发表日志
                        case "getcuruserblogcat"://获取用户日志分类
                            json = pblog.GetDefaultCategoryDropDown();
                            break;

                        case "addpersonalblog"://发表日志
                            dic["title"] = dic["title"].ToString().DescapeSpecialchar();
                            dic["neirong"] = dic["neirong"].ToString().DescapeSpecialchar();
                            json = pblog.AddPersonalBlog(dic);
                            break;

                        case "autosavedraft"://存草稿
                            dic["title"] = dic["title"].ToString().DescapeSpecialchar();
                            dic["content"] = dic["content"].ToString().DescapeSpecialchar();
                            json = pblog.AddSystemBlogDraft(dic);
                            break;
                        case "getblogdraft"://获取日志草稿
                            json = pblog.SelectPersonalBlogDraft();
                            break;
                        case "updatepersonalbog"://更新日志
                            dic["title"] = dic["title"].ToString().DescapeSpecialchar();
                            dic["neirong"] = dic["neirong"].ToString().DescapeSpecialchar();
                            json = pblog.UpdatePersonalBlogByBlogId(dic);
                            break;
                        #endregion

                        #region 日志设定
                        case "getblognameanddesc": //获取个人日志设定
                            json = pblog.GetPersonBlogNameAndDes(dic);
                            break;
                        case "getblogdefaultpermission"://获取默认权限
                            json = pblog.GetDefultPermission();
                            break;
                        case "getblogdefaultcategory"://获取默认分类
                            json = pblog.GetDefalutCategroy();
                            break;
                        case "updatenameanddescofblogsetting"://修改日志设定
                            json = pblog.UpdatePersonalBlogSettingsOfBlogName(dic);
                            break;
                        case "setblogname"://设置日志空间名
                            // json = pblog.UpdatePersonalBlogSettingsOfBlogName(dic);
                            break;
                        case "setblogdesc"://设置日志 个人签名
                            //   json = pblog.UpdatePersonalBlogSettingsOfBlogDescription(dic);
                            break;
                        case "setblogdefaultcat"://设置日志默认分类
                            json = pblog.UpdatePersonalBlogSettingsOfDefaultCategoryId(dic);
                            break;
                        case "setblogdefaultpermission"://设置日志默认权限
                            json = pblog.UpdatePersonalBlogSettingsOfDefaultPermission(dic);
                            break;
                        #endregion

                        #region 日志管理
                        case "blogmanagelist":
                            dic["time1"] = dic["time1"].ToString().DescapeSpecialchar();
                            dic["time2"] = dic["time2"].ToString().DescapeSpecialchar();
                            dic["titOrContent"] = dic["titOrContent"].ToString().DescapeSpecialchar();
                            json = pblog.AdminSearchOfManager(dic);
                            break;
                        case "addblogcategory":
                            json = pblog.AddPersonBlogCategory(dic);
                            break;
                        case "batchupdateblogpermission"://批量修改日志权限
                            json = pblog.UpdateSomePersonalBlogPermission(dic);
                            break;
                        case "batchupdateblogcategory": //修改日志分类
                            json = pblog.UpdateBlogCategory(dic);
                            break;
                        case "batchdeleteblog"://删除日志
                            json = pblog.DeletePersonalBlogByBlogId(dic);
                            break;
                        case "addblogcat"://添加日志分类
                            json = pblog.AddPersonBlogCategory(dic);
                            break;
                        case "updateblogcat"://更新日志分类
                            json = pblog.UpdatePersonBlogCategory(dic);
                            break;
                        case "delblogcat"://删除日志分类
                            json = pblog.DeletePersonBlogCategory(dic);
                            break;
                        case "updateblogcatpermission"://修改日志分类权限
                            json = pblog.UpdateBlogCategoryPermission(dic);
                            break;
                        #endregion

                        #region 日志浏览
                        case "getprevandnextblogbyidtype":
                            /// <summary>
                            /// 根据ID和类型查询上下日志
                            /// </summary>
                            /// <param name="dic">type（[0] 所有列表,[1] 类别列表, [2] 时间列表, [3] 搜索列表）
                            /// string blog_id，string param
                            /// </param>
                            /// <returns></returns>
                            json = pblog.GetPrevAndNextBlogByIdType(dic);
                            break;
                        case "getblogbyid"://根据编号获取日志
                            json = pblog.SelecPersonalBlogByBlogId(dic);
                            break;
                        case "addblogcomment"://添加照片评论
                            json = pblog.AddPersonBlogComments(dic);
                            break;
                        case "deleteblogcommentbyid"://删除照片评论
                            json = pblog.DeletePersonBlogComments(dic);
                            break;

                        #endregion

                        #region 日志操作
                        case "fowardblog":
                            //json = pblog.ForwardBlog(
                            // json = pblog.SearchPersonalBlogByTimeRange

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