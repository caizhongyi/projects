#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：王薪杰   
* 文件名：WanerDaoPhotoFactory 
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
    public class WanerDaoPhotoFactory : IHttpHandler, IRequiresSessionState
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
                IWanerDaoImageManager photo = new WanerDao2.WanerDaoBLL.Person.WanerDaoImageManager() as IWanerDaoImageManager;

                {
                    Dictionary<string, object> dic = WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());
                    PersonalSecurityProfileModel personalSecurity = CommonContext.GetUserSecurityInfo();
                    string userId = personalSecurity.user_id;
                    switch (typestr)
                    {
                        #region 相册管理
                        case "getphotoalbumlist"://获取相册列表
                            json = photo.SelectImageFolderByFoldName(dic);
                            break;
                        case "getphotoalbumlistbycurruser"://获取当前登陆用户相册列表，必须传入pagecurrent，pageSize（徐蓓添加，2012-7-12）
                            //dic.Add("user_id", userId);
                            //dic.Add("folder_name", "");
                            int pageCurrent = 0;
                            int pageSize = 0;
                            if (dic.ContainsKey("pagecurrent"))
                            {

                                Int32.TryParse(dic["pagecurrent"].ToString(), out pageCurrent);
                            }
                            if (dic.ContainsKey("pagesize"))
                            {
                                Int32.TryParse(dic["pagesize"].ToString(), out pageSize);
                            }
                            json = photo.SelectImageFolderWithFormat(pageCurrent, pageSize);
                            break;
                        case "addphotoalbum"://添加相册
                            json = photo.AddImageFolder(dic);
                            break;
                        case "getphotoalbumsetting"://获取默认相册权限
                            json = photo.GetPersonalPhotoSettingsModel();
                            break;
                        case "setphotoalbumsetting"://设置默认相册权限
                            json = photo.UpdatePersonalPhotoSettings(dic);
                            break;
                        case "updatephotoalbum"://修改相册
                            json = photo.UpdateImageFolder(dic);
                            break;
                        case "delphotoalbum"://删除相册
                            json = photo.DeleteImageFolder(dic);
                            break;
                        case "batchdelphotoalbum"://批量删除相册
                            json = photo.DeleteMorePersonalImageFolder(dic);
                            break;
                        case "batchsetphotoalbumpermission"://设置相册权限
                            json = photo.UpdateMoreFolderPermission(dic);
                            break;
                        #endregion

                        #region 相片预览
                        case "getphotoalbumphoto"://根据相册编号获取 照片
                            json = photo.SelectPersonalImagesByFoldId(dic);
                            break;
                        case "addphotocomment"://添加照片评论
                            json = photo.AddImageComments(dic);
                            break;
                        case "deletephotocommentbyid"://删除照片评论
                            json = photo.DeleteImageComments(dic);
                            break;
                        #endregion

                        #region 相片查看
                        case "":
                            json = photo.SelectImageComments(dic);
                            break;
                        case "selectpersonalimagebyimageid":
                            //string id(图片id）
                            json = photo.SelectPersonalImageByImageId(dic);
                            break;
                        #endregion

                        #region 照片编辑
                        case "photosortbyclick"://上下排序
                            json = photo.ImageSortOrderOfClick(dic);
                            break;
                        case "updatephotoproperty"://修改照片属性
                            json = photo.UPdatePersonalImage(dic);
                            break;
                        case "batchupdatephotopermission"://修改权限
                            json = photo.UpDatePersonalImagePermission(dic);
                            break;
                        case "changealbumofphoto"://移动照片
                            json = photo.MoveMorePersonalImageFolder(dic);
                            break;
                        case "setpersonalphotobecover"://设为封面
                            json = photo.SetPeronalImageBeCover(dic);
                            break;
                        case "deletepersonalphoto"://删除照片
                            json = photo.DeletePersonalImage(dic);
                            break;
                        case "batchdelepersonalphoto"://批量删除照片
                            json = photo.DeleteMorePersonalImages(dic);
                            break;
                        case "photosortbydrag"://拖动排序string image_id,string target_image_id
                            json = photo.ImageSortOrderOfDrag(dic);
                            break;
                        case "sharetoactivity"://分享到活动
                            json = photo.ShareToActivity(dic);
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