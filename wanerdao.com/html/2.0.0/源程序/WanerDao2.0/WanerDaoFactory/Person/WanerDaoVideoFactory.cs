#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：王薪杰   
* 文件名：WanerDaoVideoFactory 
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
    public class WanerDaoVideoFactory : IHttpHandler, IRequiresSessionState
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
                IWanerDaoVideoManager video = new WanerDao2.WanerDaoBLL.Person.WanerDaoVideoManager() as IWanerDaoVideoManager;

                {
                    Dictionary<string, object> dic = WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());
                    PersonalSecurityProfileModel personalSecurity = CommonContext.GetUserSecurityInfo();
                    string userId=personalSecurity.user_id;
                    int pageSize = 0;
                    int pageCurrent = 0;
                    switch (typestr)
                    {
                        #region 个人视频设置
                        case "getvideosettings": //获取当前用户的 
                            json = video.GetPersonalVideoSettingsModel();
                            break;
                        case "updatevideosettings"://修改个人设置
                            json = video.UpdatePersonalVideoSettings(dic);
                            break;
                        #endregion 

                        #region 视频上传
                        case "uploadvideo"://获取相册列表
                            json = video.VideoCodeUpload(dic);
                            break;
                        #endregion

                        #region 视频册
                        case "vodeofolderpaging":
                            json = video.VideoFolderPaging(dic);
                            break;
                        case "addvideoalbum"://新建视频册
                            json = video.AddVideoFolder(dic);
                            break;
                        case "updatevideoalbumbyid"://根据id 修改视频册
                            json = video.UpdateVideoFolderId(dic);
                            break;
                        case "deletevideofolderbyid"://根据编号删除
                            json = video.DeleteVideoFolderById(dic);
                            break;
                        case "batchupdatepermissionofvideoalbum"://批量修改视频册权限
                            json = video.BatchUpdateFolderPermission(dic);
                            break;
                        case "batchdeletevideoalbum"://批量删除视频册
                            json = video.BatchDeleteVideoFolder(dic);
                            break;
                        case "getpersonalvideofolder"://获取当前登录用户视频册，必须传string pagecurrent,string pagesize（徐蓓添加，2012-7-11）
                            dic.Add("user_id", userId);
                            pageSize = 0;
                            pageCurrent = 0;
                            if (dic.ContainsKey("pagesize"))
                            {
                                Int32.TryParse(dic["pagesize"].ToString(), out pageSize);
                            }
                            if (dic.ContainsKey("pagecurrent"))
                            {
                                Int32.TryParse(dic["pagecurrent"].ToString(), out pageCurrent);
                            }
                            json = video.VideoFolderPaging(userId, pageCurrent, pageSize);
                            break;
                        #endregion

                        #region 视频
                        case "personalvideopaging"://视频分页
                            json = video.PersonalVideoPagingByFolderId(dic);
                            break;
                        case "updatepersonalvideo"://修改视频
                            json = video.UpdatePersonalVideo(dic);
                            break;
                        case "personalvideosortbyclick"://点击排序
                            json = video.PersonalVideoSortByClick(dic);
                            break;
                        case "personalvideosortbyinput"://输入排序
                            json = video.PersonalVideoSortByInput(dic);
                            break;
                        case "batchupdatepermissionofvideo"://批量修改视频权限
                            json = video.BatchUpdatePermissionOfVideo(dic);
                            break;
                        case "batchupdatealbumofvideo"://批量移动视频到其它视频册
                            json = video.BatchUpdateVideoFolderOfVideo(dic);
                            break;
                        case "batchdeletepersonalvideo"://批量删除
                            json = video.BatchDeletePersonalVideo(dic);
                            break;
                        case "addvideocomment"://添加照片评论
                            json = video.AddVideoComments(dic);
                            break;
                        case "deletevideocommentbyid"://删除照片评论
                            json = video.DeleteVideoComments(dic);
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
