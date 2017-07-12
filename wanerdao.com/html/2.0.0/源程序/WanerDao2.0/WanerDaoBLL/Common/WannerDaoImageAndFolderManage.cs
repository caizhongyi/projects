#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 相册和相片管理类
* 作者：徐兵   时间：2011-12-05 21:25:10 
* 文件名：ImageAndFolderManage 
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
using System.IO;
using System.Web;
using WanerDao2.WanerDaoModule.Config;
using WanerDao2.WanerDaoModule.WanerDaoImage;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoBLL.Person;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoModule.IO;
using System.Data;
using WanerDao2.WanerDaoModel.Activity;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoIBLL.IPerson;

namespace WanerDao2.WanerDaoBLL.Common
{
    public class WannerDaoImageAndFolderManage
    {
        /// <summary>
        /// 网站根目录地址
        /// </summary>
        private static string CurrentDomainPath = System.AppDomain.CurrentDomain.BaseDirectory;

        #region 图片上传
        /// <summary>
        /// 图片上传主入口
        /// </summary>
        /// <param name="httpPosteFile">上传文件请求流</param>
        /// <param name="dic">dic包含信息：
        /// fold_id：相册ID
        /// imagetype：相片类型 1:活动相册，2：个人相册
        /// batchid:批次ID
        /// </param>
        /// <returns></returns>
        public static WanerDaoUploadImageResult MainUploadImageFile(HttpPostedFile httpPosteFile, Dictionary<string, object> dic)
        {
            WanerDaoUploadImageResult _imageResult = new WanerDaoUploadImageResult();
            _imageResult.isSuccess = false;
            try
            {
                string fold_id = GetAndRemoveValue("fold_id", dic);
                string strImagetype = GetAndRemoveValue("imagetype", dic);
                string batchId = GetAndRemoveValue("batchid", dic);
                string addFolderName = GetAndRemoveValue("addfoldname", dic).Trim();
                string activity_id = GetAndRemoveValue("activity_id", dic).Trim();
                bool isaddfolder = false;
                if (GetAndRemoveValue("isaddfolder", dic) == "1")
                {
                    isaddfolder = true;
                }
                if (isaddfolder)
                {
                    if (string.IsNullOrEmpty(addFolderName))
                    {
                        _imageResult.resultMsg = "抱歉：输入创建的文件夹名字";
                        return _imageResult;
                    }
                }
                if (string.IsNullOrEmpty(strImagetype) || string.IsNullOrEmpty(batchId))
                {
                    _imageResult.resultMsg = "抱歉：输入数据不完整";
                    return _imageResult;
                }
                ImageType imageType;
                try
                {
                    imageType = (ImageType)Enum.Parse(typeof(ImageType), strImagetype);
                }
                catch
                {
                    _imageResult.resultMsg = "图片业务类型错误，程序无法处理。";
                    return _imageResult;
                }

                List<WanerDaoUploadImageResult> _sessionImageList = System.Web.HttpContext.Current.Session["imageUpLoadSessionId"] as List<WanerDaoUploadImageResult>;
                if (_sessionImageList == null)
                {
                    _sessionImageList = new List<WanerDaoUploadImageResult>();
                    System.Web.HttpContext.Current.Session["imageUpLoadSessionId"] = _sessionImageList;
                }
                if (isaddfolder)
                {
                    WanerDaoUploadImageResult findOneImageSessionN = _sessionImageList.Find(i => i.addFolderName == addFolderName);
                    if (findOneImageSessionN != null)
                    {
                        fold_id = findOneImageSessionN.folderId;
                    }
                    else
                    {
                        fold_id = WanerDaoGuid.GetGuid();
                    }
                }
                string fileType = httpPosteFile.FileName.Substring(httpPosteFile.FileName.LastIndexOf("."));
                string guid = WanerDaoGuid.GetGuid();
                _imageResult.imageId = guid;
                _imageResult.isAddFolder = isaddfolder;
                _imageResult.addFolderName = addFolderName;
                _imageResult.imageType = imageType;
                _imageResult.batchId = batchId;
                _imageResult.folderId = fold_id;
                _imageResult.oldFileName = httpPosteFile.FileName.Replace(fileType, "");
                _imageResult.size = httpPosteFile.InputStream.Length;
                _imageResult.fileName = guid + fileType;
                _imageResult.smallFileName = guid + "-small" + fileType;
                string innerPath = string.Empty;
                WanerDaoUploadImageResult findOneImageSession = _sessionImageList.Find(i => i.folderId == fold_id && i.batchId == batchId);
                if (findOneImageSession != null)
                {
                    innerPath = findOneImageSession.innerPath;
                    _imageResult.activityId = findOneImageSession.activityId;
                    _imageResult.userId = findOneImageSession.userId;
                }
                else
                {
                    string useridOrActivityid = string.Empty;
                     //WanerDaoPersonSecurity ws = new WanerDaoPersonSecurity();
                     string userId = CommonContext.GetUserSecurityInfo().user_id;
                    _imageResult.userId = userId;
                    switch (imageType)
                    {
                        case ImageType.activityImage:
                            if (!isaddfolder)
                            {
                                DataTable dt = GetActivityImageForlderById(fold_id);
                                if (dt == null || dt.Rows[0]["activity_id"] == null)
                                {
                                    _imageResult.resultMsg = "抱歉，您选择的相册ID已经不存在，可能已经被删除。";
                                    return _imageResult;
                                }
                                useridOrActivityid = dt.Rows[0]["activity_id"].ToString();
                                _imageResult.activityId = useridOrActivityid;
                            }
                            else
                            {
                                _imageResult.activityId = activity_id;
                                useridOrActivityid= activity_id;
                            }
                            break;
                        case ImageType.persongImage:
                            useridOrActivityid = userId;
                            break;
                        default:
                            useridOrActivityid = "unknow";
                            break;
                    }
                    innerPath = GetInnerPathByImageType(useridOrActivityid, fold_id, ImageType.activityImage);
                }
                _imageResult.innerPath = innerPath;
                _imageResult.webRootPath = GetWebRootImagePath();
                _imageResult.serverRootPath = GetServerRootImagePath();
                if (SaveFile(httpPosteFile, Path.Combine(_imageResult.serverRootPath, _imageResult.innerPath), _imageResult.fileName))
                {
                    string serverImagPath = Path.Combine(_imageResult.serverRootPath, _imageResult.innerPath);
                    WanerDaoThumbnail.MakeThumbnailImage(serverImagPath + _imageResult.fileName, serverImagPath + _imageResult.smallFileName, 300, 300);
                    _imageResult.resultMsg = "成功";
                    _imageResult.isSuccess = true;
                    _sessionImageList.Add(_imageResult);
                }
                else
                {
                    _imageResult.resultMsg = "抱歉：存储文件失败";
                }

            }
            catch (Exception)
            {
            }
            return _imageResult;
        }
        /// <summary>
        /// 图片文件确认上传
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public static int SubmitUpdateImageActivity(string ids)
        {
            int sucessCount = 0;
            if (string.IsNullOrEmpty(ids))
            {
                return sucessCount;
            }
            string[] strIdArray = ids.Split(',');
            List<WanerDaoUploadImageResult> _sessionImageList = System.Web.HttpContext.Current.Session["imageUpLoadSessionId"] as List<WanerDaoUploadImageResult>;
            if (_sessionImageList == null)
            {
                return sucessCount;
            }
            string alreadyCreateFolderId = string.Empty;
            string batchId = string.Empty;
            foreach (string imageid in strIdArray)
            {
                if (string.IsNullOrEmpty(imageid))
                {
                    continue;
                }
                WanerDaoUploadImageResult _imageResult = _sessionImageList.Find(i => i.imageId == imageid);
                if (_imageResult == null)
                {
                    continue;
                }
                if (string.IsNullOrEmpty(batchId))
                {
                    batchId = _imageResult.batchId;
                }

                if (InsertImagePythicalLocation(_imageResult.imageId, _imageResult.innerPath + _imageResult.fileName, _imageResult.innerPath + _imageResult.smallFileName, _imageResult.size, _imageResult.userId))
                {
                    switch (_imageResult.imageType)
                    {
                        case ImageType.activityImage:
                            //创建相册
                            if (_imageResult.isAddFolder && !alreadyCreateFolderId.Contains(_imageResult.folderId + ","))
                            {
                                ActivityImageFolderModel imageFolder = new ActivityImageFolderModel();
                                imageFolder.id = _imageResult.folderId;
                                imageFolder.user_id = _imageResult.userId;
                                imageFolder.activity_id = _imageResult.activityId;
                                imageFolder.folder_name = _imageResult.addFolderName;
                                imageFolder.is_system = false;
                                imageFolder.is_block = true;
                                CreateActivityImageFolder(imageFolder);
                                //记录已经创建了 防止再次创建
                                alreadyCreateFolderId += _imageResult.folderId + ",";
                            }
                            //创建相片
                            string activityImageId = WanerDaoGuid.GetGuid();
                            if (InsertImageActivity(activityImageId, _imageResult.userId, _imageResult.activityId, _imageResult.imageId, _imageResult.folderId, _imageResult.oldFileName, _imageResult.innerPath + _imageResult.fileName, _imageResult.innerPath + _imageResult.smallFileName, _imageResult.size, 1, "", 1))
                            {
                                sucessCount++;
                            }
                            break;
                        case ImageType.persongImage:
                            IWanerDaoImageManager IimgManager = new WanerDaoImageManager();
                            //创建相册
                            if (_imageResult.isAddFolder && alreadyCreateFolderId.Contains(_imageResult.folderId + ","))
                            {
                                //添加相册
                                string defalutIconPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerDaoImageFolderIconDefaultPath");//读取默认配置的默认相册图标路径


                                ImageFolderModel imageFolder = new ImageFolderModel();
                                imageFolder.id = _imageResult.folderId;
                                imageFolder.user_id = _imageResult.userId;
                                imageFolder.cover_path = defalutIconPath;
                                imageFolder.create_date = DateTime.Now;
                                imageFolder.description = "";
                                imageFolder.folder_name = _imageResult.addFolderName;
                                imageFolder.is_system = false;
                                imageFolder.permission = CommonContext.PublicPermission;// "d500f146912111e0bae500210044b80f";
                                imageFolder.share_key_id = "-1";

                                IimgManager.AddImageFolder(imageFolder);//执行添加相册
                                //记录已经创建了 防止再次创建
                                alreadyCreateFolderId += _imageResult.folderId + ",";
                            }
                            //创建相片
                            //WanerDaoPersonSecurity ws = new WanerDaoPersonSecurity();
                            string userId = CommonContext.GetUserSecurityInfo().user_id;
                            int maxSequence = IimgManager.GetMaxSequenceOfImageFolder(userId, _imageResult.folderId);//获取最大的排序

                            PersonalImageModel pimgModel = new PersonalImageModel()
                            {
                                id = WanerDaoGuid.GetGuid(),
                                user_id = _imageResult.userId,
                                counter = 0,
                                description = "",
                                fileSize = _imageResult.size,
                                fold_id = _imageResult.folderId,
                                image_name = _imageResult.oldFileName,
                                image_path = _imageResult.innerPath + _imageResult.fileName,
                                image_small_path = _imageResult.innerPath + _imageResult.smallFileName,
                                is_submit = true,
                                link_id = _imageResult.imageId,
                                is_cover = false,
                                upload_date = DateTime.Now,
                                active = true,
                                weather = "",
                                location = "",
                                permission = CommonContext.PublicPermission,  // "d500f146912111e0bae500210044b80f",//公共
                                sequence = maxSequence + 1//最大排序+1
                            };
                            if (IimgManager.AddPersonalImage(pimgModel))
                            {
                                sucessCount++;
                            }
                            break;
                        default:
                            //throw new Exception("未实现");
                            break;
                    }
                    _sessionImageList.Remove(_imageResult);
                }

            }
            //清理未确认上传的文件
            List<WanerDaoUploadImageResult> _sessionUnknowImageList = _sessionImageList.FindAll(i => i.batchId == batchId);
            if (_sessionUnknowImageList != null && _sessionUnknowImageList.Count > 0)
            {
                foreach (WanerDaoUploadImageResult unknow in _sessionUnknowImageList)
                {
                    if (unknow != null)
                    {
                        DeleteFile(new string[] { unknow.FileServerPath, unknow.SmallFileServerPath });
                    }
                    _sessionImageList.Remove(unknow);
                }
            }
            return sucessCount;

        }

        #endregion

        #region 相片管理
        /// <summary>
        /// 插入活动相片逻辑表
        /// </summary>
        /// <param name="id"></param>
        /// <param name="create_id"></param>
        /// <param name="activity_id"></param>
        /// <param name="link_id"></param>
        /// <param name="fold_id"></param>
        /// <param name="image_name"></param>
        /// <param name="image_path"></param>
        /// <param name="image_small_path"></param>
        /// <param name="fileSize"></param>
        /// <param name="sequence"></param>
        /// <param name="description"></param>
        /// <returns></returns>
        public static bool InsertImageActivity(string id, string create_id, string activity_id, string link_id, string fold_id, string image_name, string image_path, string image_small_path, Double fileSize, int sequence, string description, int is_submit)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            dic.Add("create_id", create_id);
            dic.Add("activity_id", activity_id);
            dic.Add("link_id", link_id);
            dic.Add("fold_id", fold_id);
            dic.Add("image_name", image_name);
            dic.Add("image_path", image_path);
            dic.Add("image_small_path", image_small_path);
            dic.Add("fileSize", fileSize);
            dic.Add("sequence", sequence);
            dic.Add("description", description);
            dic.Add("is_submit", is_submit);
            dic.Add("counter", 0);
            dic.Add("is_block", 0);
            dic.Add("active", 1);
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "insertactivityimage", dic);
            return ri > 0 ? true : false;
        }
        /// <summary>
        /// 插入图片物理存储表
        /// </summary>
        /// <param name="id"></param>
        /// <param name="image_path"></param>
        /// <param name="image_small_path"></param>
        /// <param name="fileSize"></param>
        /// <param name="user_id"></param>
        /// <returns></returns>
        public static bool InsertImagePythicalLocation(string id, string image_path, string image_small_path, Double fileSize, string user_id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            dic.Add("image_path", image_path);
            dic.Add("image_small_path", image_small_path);
            dic.Add("fileSize", fileSize);
            dic.Add("user_id", user_id);
            dic.Add("link_nbr", 1);
            dic.Add("active", 1);
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "insertimagepythicallocation", dic);
            return ri > 0 ? true : false;
        }
        /// <summary>
        /// 删除物理相片存储表
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static bool DeleteImagePythicalLocation(string id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "deleteimagepythicallocationzerolink_nbr", dic);
            return ri > 0 ? true : false;
        }
        /// <summary>
        /// 删除活动相片
        /// </summary>
        /// <param name="imageId"></param>
        /// <returns></returns>
        public static bool DeleteActivityImage(string imageId)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", imageId);
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "deleteactivityimagebyid", dic);
            return ri > 0 ? true : false;
        }
        /// <summary>
        /// 获取物理相片链接数
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static int? GetImagePythicalLinkCount(string id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            int count = 0;
            object value = DbHelperFactory.SingleInstance().GetScalar("CommonSQL", "deleteactivityimagebyid", dic);
            if (value == null)
            {
                return null;
            }
            if (!int.TryParse(value.ToString(), out count))
            {
                return null;
            }
            return count;
        }
        /// <summary>
        /// 增加物理图片1个链接数
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static bool AddOneImagePythicalLink(string id)
        {
            return AddImagePythicalLink(id, 1);
        }
        /// <summary>
        /// 减少物理图片1个链接数
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static bool ReduceOneImagePythicalLink(string id)
        {
            return AddImagePythicalLink(id, -1);
        }
        /// <summary>
        /// 增加物理图片指定链接数
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static bool AddImagePythicalLink(string id, int number)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            dic.Add("number", number);
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "addimagepythicallocationlink_nbr", dic);
            if (ri > 0 && number < 0)
            {
                int? count = GetImagePythicalLinkCount(id);
                if (count.HasValue && count < 1)
                {
                    DataTable dt = GetImagePythicalLocationById(id);
                    if (dt != null && dt.Rows.Count > 0)
                    {
                        DeleteFile(new string[] { GetServerRootImagePath() + dt.Rows[0]["image_path"].ToString(), GetServerRootImagePath() + dt.Rows[0]["image_small_path"].ToString() });
                    }

                }
            }
            return ri > 0 ? true : false;
        }

        /// <summary>
        /// 根据相片ID获取相片信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static DataTable GetActivityImageById(string id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "getactivityimagebyid", dic);
            if (ds == null || ds.Tables.Count < 1)
            {
                return null;
            }
            DataTable dt = ds.Tables[0];
            return dt;
        }
        #endregion

        #region 相册管理
        /// <summary>
        /// 根据相册ID获取相册信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static DataTable GetActivityImageForlderById(string id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "getactivityimagefolderinfobyid", dic);
            if (ds == null || ds.Tables.Count < 1)
            {
                return null;
            }
            DataTable dt = ds.Tables[0];
            return dt;
        }
        /// <summary>
        /// 创建活动相册
        /// </summary>
        /// </param>
        /// <returns></returns>
        public static bool CreateActivityImageFolder(ActivityImageFolderModel activityImagefolder)
        {
            if (string.IsNullOrEmpty(activityImagefolder.id))
            {
                activityImagefolder.id = WanerDaoGuid.GetGuid();
            }
            int ri = DbHelperFactory.SingleInstance().ExecuteNonQueryBasedOnSql<ActivityImageFolderModel>("CommonSQL", "insertactivityimagefolder", activityImagefolder);
            return ri > 0;
        }

        #endregion

        #region 物理相片表管理imagepythicallocation
        /// <summary>
        /// 获取物理相片表数据 根据ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static DataTable GetImagePythicalLocationById(string id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "getimagepythicallocationbyid", dic);
            if (ds == null || ds.Tables.Count < 1)
            {
                return null;
            }
            DataTable dt = ds.Tables[0];
            return dt;
        }
        #endregion

        #region 文件操作
        /// <summary>
        /// 删除文件
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public static bool DeleteFile(string filePath)
        {
            return DeleteFile(new string[] { filePath });
        }
        public static bool DeleteFile(string[] filePaths)
        {
            bool result = true;
            foreach (string filePath in filePaths)
            {
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
            }
            return result;
        }
        /// <summary>
        /// 文件存储
        /// </summary>
        /// <param name="httpPosteFile"></param>
        /// <param name="fileSavePath"></param>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public static bool SaveFile(HttpPostedFile httpPosteFile, String fileSavePath, string fileName)
        {
            Boolean isSuccess = false;
            try
            {
                if (!Directory.Exists(fileSavePath))
                {
                    Directory.CreateDirectory(fileSavePath);
                }
                httpPosteFile.SaveAs(fileSavePath + fileName);
                isSuccess = true;
                return isSuccess;
            }
            catch
            {
                return isSuccess;
            }

        }
        #endregion

        #region 文件复制
        /// <summary>
        ///
        /// 文件复制
        /// </summary>
        /// <param name="oldPath"></param>
        /// <param name="newpath"></param>
        /// <returns></returns>
        public static bool copyfile(string oldPath, string newpath) {
            try
            {
                File.Copy(oldPath, newpath);
                return true;
            }
            catch {
                return false;
            }
        } 
        #endregion

        /// <summary>
        /// 获取WEB根目录地址
        /// </summary>
        /// <returns></returns>
        public static string GetWebRootImagePath()
        {
            string _webRootPathConfig = GetConfigPhotoRelativePath();
            return WanerDaoFileUtils.GetSiteUrl_ALL()+_webRootPathConfig + "/";
        }
        /// <summary>
        /// 获取服务器文件根目录地址
        /// </summary>
        /// <returns></returns>
        public static string GetServerRootFilePath()
        {
            string _serverRootPathConfig = GetConfigFilesRelativePath();
            string _serverSavePath = WanerDaoFileUtils.GetSiteUrl_Root() + "/" + _serverRootPathConfig;
            _serverSavePath = WanerDaoFileUtils.GetMapPath(_serverSavePath);
            return _serverSavePath + "/";
        }
        /// <summary>
        /// 获取服务器图片根目录地址
        /// </summary>
        /// <returns></returns>
        public static string GetServerRootImagePath()
        {
            string _serverRootPathConfig = GetConfigPhotoRelativePath();
            string _serverSavePath = WanerDaoFileUtils.GetSiteUrl_Root() + "/"+_serverRootPathConfig;
            _serverSavePath = WanerDaoFileUtils.GetMapPath(_serverSavePath);
            return _serverSavePath + "/";
        }
        /// <summary>
        /// 获取文件存放相对地址
        /// </summary>
        /// <returns></returns>
        public static string GetConfigFilesRelativePath()
        {
            string _photoRelativePath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoServerFilesPath").Trim().Trim(new char[] { '\\', '/' });
            return _photoRelativePath;
        }
        /// <summary>
        /// 获取相片存放相对地址
        /// </summary>
        /// <returns></returns>
        public static string GetConfigPhotoRelativePath()
        {
            string _photoRelativePath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoServerPhotoRelativePath").Trim().Trim(new char[] { '\\', '/' });
            return _photoRelativePath;
        }
        /// <summary>
        /// 获取相片临时存放相对地址
        /// </summary>
        /// <returns></returns>
        private static string GetConfigPhotoTempRelativePath()
        {
            string _photoTempRelativePath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoServerTempPhotoRelativePath").Trim().Trim(new char[] { '\\', '/' });
            return _photoTempRelativePath;
        }
        /// <summary>
        /// 获取临时WEB根目录地址
        /// </summary>
        /// <returns></returns>
        public static string GetWebRootImageTempPath()
        {
            string _webRootPathConfig = GetConfigPhotoTempRelativePath();

            return WanerDaoFileUtils.GetSiteUrl_ALL() + _webRootPathConfig + "/";
        }
        /// <summary>
        /// 获取临时服务器根目录地址
        /// </summary>
        /// <returns></returns>
        public static string GetServerRootImageTempPath()
        {
            string _serverRootPathConfig = GetConfigPhotoTempRelativePath();
            //string _serverSavePath = Path.Combine(CurrentDomainPath, _serverRootPathConfig);
            string _serverSavePath = WanerDaoFileUtils.GetMapPath(_serverRootPathConfig);
            return _serverSavePath + "/";
        }
        /// <summary>
        /// 获取相片文件存储相对目录
        /// </summary>
        /// <param name="useridOrActivityid"></param>
        /// <param name="imageFolderid"></param>
        /// <param name="imageType">相册类型</param>
        /// <returns></returns>
        public static string GetInnerPathByImageType(string useridOrActivityid, string imageFolderid, ImageType imageType)
        {
            DateTime _currentDate = DateTime.Now;
            string innerPath = string.Empty;
           // innerPath = Path.Combine(_currentDate.ToString("yyyy-MM"), _currentDate.ToString("dd"));
            //string useridOrActivityid = string.Empty;
            //switch (imageType)
            //{
            //    case ImageType.activityImage:
            //        DataTable dt = GetActivityImageForlderById(imageFolderid);
            //        useridOrActivityid = string.Empty;
            //        break;
            //    case ImageType.persongImage:
            //        WanerDaoPersonSecurity ws = new WanerDaoPersonSecurity();
            //        useridOrActivityid = "1111"; //ws.GetUserSecurityInfo().user_id;
            //        break;
            //    default:
            //        useridOrActivityid = "unknow";
            //        break;
            //}
            //innerPath = Path.Combine(innerPath, useridOrActivityid);
            //innerPath = Path.Combine(innerPath, imageFolderid);
            innerPath = _currentDate.ToString("yyyy-MM") + "/" + _currentDate.ToString("dd");
            innerPath+="/"+useridOrActivityid;
            innerPath += "/" + imageFolderid;
            return innerPath + "/";

        }
        /// <summary>
        /// 从Dictionary中获取键值，并且删除键
        /// 添加人：徐兵 
        /// 时间：2011-11-22
        /// </summary>
        /// <param name="key">键名</param>
        /// <param name="dic">Dictionary</param>
        /// <returns></returns>
        public static string GetAndRemoveValue(string key, Dictionary<string, object> dic)
        {
            string value = "";
            if (dic != null && dic.ContainsKey(key))
            {
                value = dic[key].ToString();
                dic.Remove(key);
            }
            return value;
        }
    }
}
