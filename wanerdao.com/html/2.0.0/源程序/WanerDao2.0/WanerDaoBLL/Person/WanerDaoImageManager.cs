#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2011/12/29 0:03:37 
* 文件名：WanerDaoImageManager 
* 版本：V1.0.1 
* 
* 修改者：王薪杰 时间： 
* 修改说明： 方法实现
* ======================================================================== 
*/
#endregion

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoIBLL.ICommon;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Data;
using WanerDao2.WanerDaoCacheManager;
using WanerDao2.WanerDaoModule.Config;
using WanerDao2.WanerDaoComponent;
using WanerDao2.WanerDaoBLL.Common;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoIBLL.IIndex;
using WanerDao2.WanerDaoBLL.Index;


namespace WanerDao2.WanerDaoBLL.Person
{
    public class WanerDaoImageManager : IWanerDaoImageManager
    {
        private readonly string imageFolderKey = "ImageFolder_";
        private readonly string imageKey = "PersonalImage_";
        //private readonly string imageSetting = "PersonalImageFolderSetting_";

        PersonalSecurityProfileModel pspmodel = null;

        ICacheStrategy ICache = null;

        IWanerDaoCommon Icommon = null;

        public WanerDaoImageManager()
        {
            Icommon = new WanerDaoBLL.Common.WanerdaoCommon();
            ICache = new WanerDaoCacheFactory().GetStrategy(0);
            //#if DEBUG
            //            pspmodel = new PersonalSecurityProfileModel { user_id = "9f6c58f988cc4aff9c910504dce3edc2" };
            //            return;
            //#endif
            pspmodel = CommonContext.GetUserSecurityInfo();
        }

        #region 个人相册管理
        /// <summary>
        /// 添加相册
        /// </summary>
        /// <param name="dic">string folder_name</param>
        /// <returns></returns>
        public string AddImageFolder(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string default_permission = GetPersonalPhotoSettingsModel(pspmodel.user_id).default_permission;
            if (string.IsNullOrEmpty(default_permission))
                default_permission = CommonContext.PublicPermission;// "d500f146912111e0bae500210044b80f";//公共
            string folder_name = dic.ContainsKey("folder_name") ? dic["folder_name"].ToString() : null;
            string guid = WanerDao2.WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid();
            if (!string.IsNullOrEmpty(folder_name) && !IsExistsOfImageFolderName(folder_name))
            {
                ImageFolderModel ifmodel = new ImageFolderModel()
                {
                    id = guid,
                    folder_name = folder_name,
                    permission = default_permission,
                    user_id = pspmodel.user_id,
                    is_system = false
                };
                if (AddImageFolder(ifmodel))
                {
                    json = SucMsg("SaveInfoCn");
                }
                else
                {
                    json = ErrMsg("FailInfoCn");
                }
            }
            else
            {
                json = ErrMsg("ImageFolderRequied");
            }
            return json;
        }

        private bool IsExistsOfImageFolderName(string imageFolderName)
        {
            bool flag = false;
            if (!string.IsNullOrEmpty(imageFolderName))
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("folder_name", imageFolderName);
                dic.Add("user_id", pspmodel.user_id);
                string result = GetScalar("IsExistsOfImageFolderName", dic);
                if (!string.IsNullOrEmpty(result))
                {
                    flag = true;
                }
            }
            return flag;
        }
        public string ReturnFolderID(string imageFolderName)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("folder_name", imageFolderName);
            dic.Add("user_id", pspmodel.user_id);
            string result = GetScalar("IsExistsOfImageFolderName", dic);
            return result;
        }
        /// <summary>
        /// 添加相册
        /// </summary>
        /// <param name="ifmodel">相册模型</param>
        /// <returns></returns>
        public bool AddImageFolder(ImageFolderModel ifmodel)
        {
            bool flag = false;
            if (ifmodel != null)
            {
                int result = 0;
                result = DbHelperFactory.SingleInstance().ExecuteNonQuery<ImageFolderModel>("PersonSQL", "AddImageFolder", ifmodel);
                if (result > 0)
                {
                    //向主页注册操作
                    WanerDaoPersonState.AddHomeOperate(ifmodel.id, "101dfecd927411e183b9002354c6e759");
                    flag = true;
                }
            }
            return flag;
        }

        /// <summary>
        /// 修改相册
        /// </summary>
        /// <param name="dic">string folder_id,string folder_name,string permission,string description</param>
        /// <returns></returns>如果某一项为空也就是说不需要修改 请不要传或者传""
        public string UpdateImageFolder(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string folder_id = dic.ContainsKey("folder_id") ? dic["folder_id"].ToString() : null;
            if (!string.IsNullOrEmpty(folder_id))
            {
                ImageFolderModel ifmodel = GetImageFolderModelById(folder_id);
                if (ifmodel != null)
                {
                    string folder_name = dic.ContainsKey("folder_name") ? dic["folder_name"].ToString() : null;
                    string permission = dic.ContainsKey("permission") ? dic["permission"].ToString() : null;
                    string description = dic.ContainsKey("description") ? dic["description"].ToString() : null;

                    ifmodel.user_id = pspmodel.user_id;
                    if (!string.IsNullOrEmpty(folder_name))
                    {
                        ifmodel.folder_name = folder_name;
                    }
                    if (!string.IsNullOrEmpty(permission))
                    {
                        ifmodel.permission = permission;
                    }
                    if (!string.IsNullOrEmpty(description))
                    {
                        ifmodel.description = description;
                    }
                    if (UpdateImageFolder(ifmodel))
                    {
                        json = SucMsg("UpdateInfoCn");
                        RemoveModelCache(imageFolderKey, pspmodel.user_id + "_" + ifmodel.id);
                    }
                    else
                    {
                        json = ErrMsg("UpdateFailInfoCn");
                    }
                }
                else
                {
                    json = ErrMsg("ImageFolderIsDel");
                }
            }
            else
            {
                json = ErrMsg("ImageFolderIDRequied");
            }
            return json;
        }

        /// <summary>
        /// 修改相册
        /// </summary>
        /// <param name="ifmodel">相册模型</param>
        /// <returns></returns>
        public bool UpdateImageFolder(ImageFolderModel ifmodel)
        {
            bool flag = false;
            if (ifmodel != null)
            {
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<ImageFolderModel>("PersonSQL", "UpdateImageFolder", ifmodel);
                if (result > 0) return true;
            }
            return flag;
        }

        /// <summary>
        /// 删除相册
        /// </summary>
        /// <param name="dic">folder_id</param>
        /// <returns></returns>
        public string DeleteImageFolder(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string folder_id = dic.ContainsKey("folder_id") ? dic["folder_id"].ToString() : null;
            if (!string.IsNullOrEmpty(folder_id))
            {
                ImageFolderModel ifmodel = GetImageFolderModelById(folder_id);
                if (ifmodel != null)
                {
                    if (!ifmodel.is_system)
                    {
                        dic.Add("user_id", pspmodel.user_id);
                        if (ExcuteNonQuery("DeleteImageFolder", dic))
                        {
                            json = SucMsg("DeleteInfoCn");
                        }
                        else
                        {
                            json = ErrMsg("DeleteFailInfoCn");
                        }
                    }
                    else
                    {
                        json = ErrMsg("SysImageFolderCanNotDel");
                    }
                }
                else
                {
                    json = ErrMsg("ImageFolderIsDel");
                }
            }
            else
            {
                json = ErrMsg("ParameterError");
            }
            return json;
        }

        public ImageFolderModel GetImageFolderModelById(string id)
        {
            string key = imageFolderKey + "Model_" + pspmodel.user_id + "_" + id;
            ImageFolderModel ifModel = null;
            object cache = ICache.RetrieveObject(key);
            if (cache != null)
            {
                ifModel = (ImageFolderModel)cache;
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>() { { "id", id } };
                ifModel = GetGenericModel<ImageFolderModel>("GetImageFolderModelById", dic);
                if (ifModel != null)
                {
                    ICache.AddObject(key, ifModel);
                }
            }
            return ifModel;
        }

        /// <summary>
        /// 查询所有相册 根据相册名称查询相册
        /// </summary>
        /// <param name="dic">string guest_id,string folder_name,string pagecurrent,string pageSize</param>
        /// <returns></returns>
        public string SelectImageFolderByFoldName(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string guest_id = dic.ContainsKey("guest_id") ? dic["guest_id"].ToString() : null;
            string folder_name = dic.ContainsKey("folder_name") ? dic["folder_name"].ToString() : null;
            Dictionary<string, object> mydic = new Dictionary<string, object>();
            string rule = string.Empty;
            if (!IsSelf(ref guest_id))
            {
                IList<PersonalPermissionModel> Ilistppmodel = WanerDaoPropertyPermission.getAllPermission(guest_id);
                foreach (PersonalPermissionModel ppmodel in Ilistppmodel)
                {
                    if (WanerDaoPropertyPermission.hasPermission(guest_id, pspmodel.user_id, ppmodel.id))
                    {
                        if (rule.IndexOf("and") == -1)
                        {
                            rule += " and (imagefolder.permission='" + ppmodel.id + "'";
                        }
                        else
                        {
                            rule += " or imagefolder.permission='" + ppmodel.id + "'";
                        }
                    }
                }
                if (rule != string.Empty)
                {
                    rule += ")";
                }
            }
            if (!string.IsNullOrEmpty(folder_name))
            {
                mydic.Add("where", " " + rule + " and imagefolder.user_id='" + guest_id + "' and imagefolder.folder_name like'%" + dic["folder_name"].ToString() + "%'");
            }
            else
            {
                mydic.Add("where", " " + rule + " and imagefolder.user_id='" + guest_id + "'");
            }
            mydic.Add("pageCurrent", dic["pagecurrent"].ToString());
            mydic.Add("pageSize", dic["pageSize"].ToString());
            DataSet ds = null;
            ds = GetAllImageFolder(mydic);
            if (ds != null)
            {
                json = Icommon.WanerDaoPagination(ds);
            }
            else
            {
                json = ErrMsg("ErrorInfoCn");
            }
            return json;
        }

        /// <summary>
        /// 查询所有相册（徐蓓2012-8-10添加）
        /// </summary>
        /// <param name="pagecurrent"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public string SelectImageFolderWithFormat(int pagecurrent, int pageSize)
        {
            string json = string.Empty;
            string guest_id = string.Empty;
            string folder_name = string.Empty;
            Dictionary<string, object> mydic = new Dictionary<string, object>();
            string rule = string.Empty;
            if (!IsSelf(ref guest_id))
            {
                IList<PersonalPermissionModel> Ilistppmodel = WanerDaoPropertyPermission.getAllPermission(guest_id);
                foreach (PersonalPermissionModel ppmodel in Ilistppmodel)
                {
                    if (WanerDaoPropertyPermission.hasPermission(guest_id, pspmodel.user_id, ppmodel.id))
                    {
                        if (rule.IndexOf("and") == -1)
                        {
                            rule += " and (imagefolder.permission='" + ppmodel.id + "'";
                        }
                        else
                        {
                            rule += " or imagefolder.permission='" + ppmodel.id + "'";
                        }
                    }
                }
                if (rule != string.Empty)
                {
                    rule += ")";
                }
            }
            if (!string.IsNullOrEmpty(folder_name))
            {
                mydic.Add("where", " " + rule + " and imagefolder.user_id='" + guest_id + "' and imagefolder.folder_name like'%" + folder_name + "%'");
            }
            else
            {
                mydic.Add("where", " " + rule + " and imagefolder.user_id='" + guest_id + "'");
            }
            mydic.Add("pageCurrent", pagecurrent);
            mydic.Add("pageSize", pageSize);
            DataSet ds = null;
            ds = GetAllImageFolderWithFormat(mydic);
            if (ds != null)
            {
                json = Icommon.WanerDaoPagination(ds);
            }
            else
            {
                json = ErrMsg("ErrorInfoCn");
            }
            return json;
        }

        private DataSet GetAllImageFolderWithFormat(Dictionary<string, object> dic)
        {
            string defalutIconPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerDaoImageFolderIconDefaultPath");//读取默认配置的默认相册图标路径
            if (!string.IsNullOrEmpty(defalutIconPath))
            {
                dic.Add("defaultPath", defalutIconPath);
                DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("PersonSQL", "GetAllImageFolderWithFormat", dic);
                if (ds != null)
                {
                    return ds;
                }
            }
            return null;

        }

        /// <summary>
        /// 获取相册列表
        /// </summary>
        /// <param name="dic">string user_id,string where,string pagecurrent,string pagesize</param>
        /// <returns></returns>
        public DataSet GetAllImageFolder(Dictionary<string, object> dic)
        {
            string defalutIconPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerDaoImageFolderIconDefaultPath");//读取默认配置的默认相册图标路径
            if (!string.IsNullOrEmpty(defalutIconPath))
            {
                dic.Add("defaultPath", defalutIconPath);
                DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("PersonSQL", "GetAllImageFolder", dic);
                if (ds != null)
                {
                    return ds;
                }
            }
            return null;
        }


        /// <summary>
        /// 查询相册下的所有图片
        /// </summary>
        /// <param name="dic">相册id，分页参数 (string guest_id, string folder_id,string pagecurrent,string pageSize,image_name)</param>
        /// <returns></returns>
        public string SelectPersonalImagesByFoldId(Dictionary<string, object> dic)
        {
            DataSet ds = GetPersonalImagesByFoldId(dic);
            return ds == null ? ErrMsg("ErrorInfoCn") : Icommon.WanerDaoPagination(ds);
        }

        /// <summary>
        /// 查询相册下的所有图片
        /// </summary>
        /// <param name="dic">相册id，分页参数 (string guest_id, string folder_id,string pagecurrent,string pageSize,image_name)</param>
        /// <returns></returns>
        public List<PersonalImageModel> GetPersonalImageListByFoldId(string folderId, int pageCurrent, int pageSize)
        {
            return null;
        }

        /// <summary>
        /// 查询相册下的所有图片
        /// </summary>
        /// <param name="dic">相册id，分页参数 ( string folder_id,string pagecurrent,string pageSize)</param>
        /// <returns></returns>
        public DataSet GetPersonalImagesByFoldId(Dictionary<string, object> dic)
        {
            DataSet ds = null;
            string rule = string.Empty;
            string guest_id = dic.ContainsKey("guest_id") ? dic["guest_id"].ToString() : null;
            string image_name = dic.ContainsKey("image_name") ? dic["image_name"].ToString() : null;
            if (!IsSelf(ref guest_id))
            {
                IList<PersonalPermissionModel> Ilistppmodel = WanerDaoPropertyPermission.getAllPermission(guest_id);
                foreach (PersonalPermissionModel ppmodel in Ilistppmodel)
                {
                    if (WanerDaoPropertyPermission.hasPermission(guest_id, pspmodel.user_id, ppmodel.id))
                    {
                        if (rule.IndexOf("and") == -1)
                        {
                            rule += " and (permission='" + ppmodel.id + "'";
                        }
                        else
                        {
                            rule += " or permission='" + ppmodel.id + "'";
                        }
                    }
                }
                if (rule != string.Empty)
                {
                    rule += ")";
                }
            }

            if (!string.IsNullOrEmpty(image_name))
            {
                image_name = " and image_name like '%" + image_name + "%'";
            }


            string folder_id = dic.ContainsKey("folder_id") ? dic["folder_id"].ToString() : null;
            string pagecurrent = dic.ContainsKey("pagecurrent") ? dic["pagecurrent"].ToString() : null;
            string pageSize = dic.ContainsKey("pageSize") ? dic["pageSize"].ToString() : null;
            if (string.IsNullOrEmpty(folder_id) || string.IsNullOrEmpty(pagecurrent) || string.IsNullOrEmpty(pageSize))
            {
                return ds;
            }
            else
            {
                dic.Add("tablename", "PersonalImage");
                dic.Add("fldName", "id,user_id,link_id,fold_id,image_path,image_name,image_small_path,fileSize,sequence,description,weather,location,upload_date,is_cover,is_submit,counter,permission,active");
                dic.Add("where", " and fold_id='" + folder_id + "' " + rule + image_name + " and user_id='" + guest_id + "' and active=true");
                dic.Add("fldSortId", "sequence");
                dic.Add("sort", 1);
                //dic.Add("pagecurrent", pagecurrent);
                //dic.Add("pageSize", pageSize);
                ds = Icommon.WanerDaoPaginationDataSet(dic);
            }
            return ds;
        }

        /// <summary>
        /// 获取相册最大排序号
        /// </summary>
        /// <param name="user_id">用户id</param>
        /// <param name="imageFolderId">相册id</param>
        /// <returns></returns>
        public int GetMaxSequenceOfImageFolder(string user_id, string imageFolderId)
        {
            string sequence = GetScalar("GetMaxSequenceOfImageFolder", new Dictionary<string, object> { { "user_id", user_id }, { "fold_id", imageFolderId } });
            if (!string.IsNullOrEmpty(sequence))
            {
                return int.Parse(sequence);
            }
            return 0;
        }
        #endregion

        #region 查询相册数量或相册下图片数量
        /// <summary>
        /// 查询相册的数量（个数）
        /// </summary>
        /// <param name="dic">user_id</param>
        /// <returns></returns>
        public string SelectImageFolderCount(Dictionary<string, object> dic) { string json = string.Empty; return json; }

        /// <summary>
        /// 根据相册id查询相册下图片个数
        /// </summary>
        /// <param name="dic">相册id</param>
        /// <returns></returns>
        public int SelectImageCountByFoldId(string folder_id)
        {
            object obj = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "SelectImageCountByFoldId", new Dictionary<string, object>() { { "folder_id", folder_id } });
            return int.Parse(obj.ToString());
        }
        #endregion

        #region 单个图片管理
        /// <summary>
        /// 照片的拖动排序
        /// </summary>
        /// <param name="dic">string image_id,string target_image_id </param>
        /// <returns></returns>
        public string ImageSortOrderOfDrag(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string image_id = dic.ContainsKey("image_id") ? dic["image_id"].ToString() : null;
            string target_image_id = dic.ContainsKey("target_image_id") ? dic["target_image_id"].ToString() : null;
            if (!string.IsNullOrEmpty(image_id) && !string.IsNullOrEmpty(target_image_id))
            {
                PersonalImageModel cur_model = GetPersonalImageModelById(image_id);
                dic.Add("fold_id", cur_model.fold_id);
                if (ExcuteNonQuery("ImageSortOrderOfDrag", dic))//执行排序数据库操作
                {
                    json = SucMsg("SuccessInfoCn");
                }
                else
                {
                    json = ErrMsg("FailInfoCn");
                }
            }
            else
            {
                json = ErrMsg("ParameterError");
            }
            return json;
        }

        /// <summary>
        /// 照片的点击排序
        /// </summary>
        /// <param name="dic">string image_id,string type(0或者1)  0为向上  1为向下</param>
        /// <returns></returns>
        public string ImageSortOrderOfClick(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string image_id = dic.ContainsKey("image_id") ? dic["image_id"].ToString() : null;
            int type = dic.ContainsKey("type") ? int.Parse(dic["type"].ToString()) : 0;
            if (!string.IsNullOrEmpty(image_id))
            {
                PersonalImageModel cur_model = GetPersonalImageModelById(image_id);

                Dictionary<string, object> dic_dir = new Dictionary<string, object>();
                dic_dir.Add("image_id", dic["image_id"]);
                dic_dir.Add("fold_id", cur_model.fold_id);
                PersonalImageModel model = null;
                if (type == 0)
                {
                    model = GetGenericModel<PersonalImageModel>("SelectPrevImage", dic_dir);
                }
                else if (type == 1)
                {
                    model = GetGenericModel<PersonalImageModel>("SelectNextImage", dic_dir);
                }
                else
                {
                    json = ErrMsg("CanNotModify");
                    return json;
                }

                if (model == null)
                {
                    json = ErrMsg("CanNotModify");
                    return json;
                }

                dic.Remove("type");
                dic.Add("target_image_id", model.id);
                dic.Add("fold_id", model.fold_id);
                if (ExcuteNonQuery("ImageSortOrderOfDrag", dic))//执行排序数据库操作
                {
                    json = SucMsg("SuccessInfoCn");
                }
                else
                {
                    json = ErrMsg("FailInfoCn");
                }
            }
            else
            {
                json = ErrMsg("ParameterError");
            }
            return json;
        }

        /// <summary>
        /// 照片的输入数字排序
        /// </summary>
        /// <param name="dic">string image_id,string inputText</param>
        /// <returns></returns>
        public string ImageSortOrderOfInput(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string image_id = dic.ContainsKey("image_id") ? dic["image_id"].ToString() : null;
            string inputText = dic.ContainsKey("inputText") ? dic["inputText"].ToString() : null;
            if (!string.IsNullOrEmpty(image_id) && !string.IsNullOrEmpty(inputText))
            {
                int inputSortid = 0;
                if (int.TryParse(inputText, out inputSortid))
                {
                    dic.Remove("inputText");
                    dic.Add("inputSortID", inputSortid);

                    if (ExcuteNonQuery("ImageSortOrderOfInput", dic))//执行排序数据库操作
                    {
                        json = SucMsg("SuccessInfoCn");
                    }
                    else
                    {
                        json = ErrMsg("FailInfoCn");
                    }
                }
                else
                {
                    json = ErrMsg("SortNumMustBeNo");
                }
            }
            else
            {
                json = ErrMsg("ParameterError");
            }
            return json;
        }

        /// <summary>
        /// 根据图片id获取图片model
        /// 修改 王薪杰，修改 key 的 格式
        /// </summary>
        /// <param name="id">string id</param>
        /// <returns></returns>
        public PersonalImageModel GetPersonalImageModelById(string id)
        {
            string key = imageKey + "Model_" + pspmodel.user_id + "_" + id;
            PersonalImageModel pimgModel = null;
            object cache = ICache.RetrieveObject(key);
            if (cache != null)
            {
                pimgModel = (PersonalImageModel)cache;
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>() { { "id", id } };
                pimgModel = GetGenericModel<PersonalImageModel>("GetPersonalImageModelById", dic);
                if (pimgModel != null)
                {
                    ICache.AddObject(key, pimgModel);
                }
            }
            return pimgModel;
        }

        /// <summary>
        /// 查询照片id查询单个照片
        /// </summary>
        /// <param name="dic">图片id</param>
        /// <returns></returns>
        public string SelectPersonalImageByImageId(Dictionary<string, object> dic)
        {
            return WanerDaoJSON.SerializeObject(GetPersonalImageModelById(dic["id"].ToString()));
        }

        /// <summary>
        /// 根据照片名称查询单个照片
        /// </summary>
        /// <param name="dic">图片名称</param>
        /// <returns></returns>
        public string SelectPersonalImageByImageName(Dictionary<string, object> dic) { string json = string.Empty; return json; }

        /// <summary>
        /// 删除相片（会自动减少物理连接数和判断是否删除文件）
        /// </summary>
        /// <param name="image_id">要删除的相片id</param>
        /// <returns></returns>
        public string DeletePersonalImage(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string image_id = dic.ContainsKey("image_id") ? dic["image_id"].ToString() : null;
            if (!string.IsNullOrEmpty(image_id))
            {
                PersonalImageModel pmgModel = GetPersonalImageModelById(image_id);
                if (pmgModel == null)
                {
                    json = ErrMsg("ImageFolderIsDel");
                }

                ImageFolderModel imgFolderModel = GetImageFolderModelById(pmgModel.fold_id);
                if (imgFolderModel.share_key_id != "-1")//如果该相片所在的相册为活动共享相册,则删除活动相册表里面的数据
                {
                    Icommon.WanerDaoDeleteActivityImage(image_id);
                }

                string linkid = pmgModel.link_id;
                dic.Add("user_id", pspmodel.user_id);
                if (ExcuteNonQuery("DeletePersonalImage", dic))
                {
                    if (WannerDaoImageAndFolderManage.ReduceOneImagePythicalLink(linkid))
                    {
                        RemoveModelCache(imageKey, pspmodel.user_id + "_" + image_id);//删除该图片缓存
                        json = SucMsg("DeleteInfoCn");
                    }
                }
                else
                {
                    json = ErrMsg("DeleteFailInfoCn");
                }
            }
            else
            {
                json = ErrMsg("ParameterError");
            }
            return json;
        }


        /// <summary>
        /// 更新个人照片
        /// </summary>
        /// <param name="pimgModel">照片模型</param>
        /// <returns></returns>
        public bool UpdatePersonalImage(PersonalImageModel pimgModel)
        {
            bool flag = false;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalImageModel>("PersonSQL", "UpdatePersonalImage", pimgModel);
            if (result > 0)
            {
                RemoveModelCache(imageKey, pspmodel.user_id + "_" + pimgModel.id);
                flag = true;
            }
            return flag;
        }

        /// <summary>
        /// 修改图片各项信息
        /// </summary>
        /// <param name="dic">图片id(string image_id),相册(string folder_id),排序号(sequence_id),图片名称(image_name),图片描述(image_description),设为封面(setcover:0为取消,设为封面用设为封面方法)</param>
        /// <returns></returns>
        public string UPdatePersonalImage(Dictionary<string, object> dic)
        {
            string json = string.Empty;

            string image_id = dic.ContainsKey("image_id") ? dic["image_id"].ToString() : null;
            string sequence_id = dic.ContainsKey("sequence_id") ? dic["sequence_id"].ToString() : null;
            string image_name = dic.ContainsKey("image_name") ? dic["image_name"].ToString() : null;
            string image_description = dic.ContainsKey("image_description") ? dic["image_description"].ToString() : null;
            string folder_id = dic.ContainsKey("folder_id") ? dic["folder_id"].ToString() : null;
            string setcover = dic.ContainsKey("setcover") ? dic["setcover"].ToString() : null;

            if (!string.IsNullOrEmpty(image_id))
            {
                PersonalImageModel pimgModel = GetPersonalImageModelById(image_id);
                if (pimgModel != null)
                {
                    if (!string.IsNullOrEmpty(sequence_id))
                    {
                        pimgModel.sequence = int.Parse(sequence_id);
                    }
                    if (!string.IsNullOrEmpty(image_name))
                    {
                        pimgModel.image_name = image_name;
                    }
                    if (!string.IsNullOrEmpty(image_description))
                    {
                        pimgModel.description = image_description;
                    }
                    if (!string.IsNullOrEmpty(setcover))
                    {
                        if (setcover == "0")
                        {
                            pimgModel.is_cover = false;
                        }
                        else
                        {
                            return json = ErrMsg("CanNotSetCover");
                        }
                    }
                    if (!string.IsNullOrEmpty(folder_id))
                    {
                        pimgModel.fold_id = folder_id;
                    }
                    if (UpdatePersonalImage(pimgModel))
                    {
                        json = SucMsg("UpdateInfoCn");
                    }
                    else
                    {
                        json = ErrMsg("UpdateFailInfoCn");
                    }
                }
                else
                {
                    json = ErrMsg("ImageIsDel");
                }
            }
            else
            {
                json = ErrMsg("ParameterError");
            }
            return json;
        }

        /// <summary>
        /// 添加单个照片(自动增加一个物理连接数)
        /// </summary>
        /// <param name="pimodel">图片model</param>
        /// <returns></returns>
        public bool AddPersonalImage(PersonalImageModel pimodel)
        {
            bool flag = false;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalImageModel>("PersonSQL", "AddPersonalImage", pimodel);
            string photoId = pimodel.image_path.Substring(pimodel.image_path.LastIndexOf("/") + 1, pimodel.image_path.LastIndexOf('.') - pimodel.image_path.LastIndexOf("/") - 1)+pimodel.user_id.Substring(0,8);
            if (result > 0 && WannerDaoImageAndFolderManage.AddOneImagePythicalLink(photoId))
            {
                WanerDaoPersonState.AddHomeOperate(pimodel.id, "1006320e927411e183b9002354c6e759");
                flag = true;
            }
            return flag;
        }

        /// <summary>
        /// 设置照片为封面
        /// </summary>
        /// <param name="dic">image_id 照片id</param>
        /// <returns></returns>
        public string SetPeronalImageBeCover(Dictionary<string, object> dic)
        {
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SetPersonalImageBeCover", dic);
            if (result > 0)
            {
                return SucMsg("SetingSuccess");
            }
            return ErrMsg("SetingError");
        }
        #endregion

        #region 个人相片设定

        /// <summary>
        /// 获取个人相册设定表
        /// </summary>
        /// <param name="user_id">用户id</param>
        /// <returns></returns>
        public string GetPersonalPhotoSettingsModel()
        {
            PersonalPhotoSettingsModel ppsModel = GetPersonalPhotoSettingsModel(pspmodel.user_id);
            if (ppsModel != null)
            {
                return WanerDaoJSON.SerializeObject(ppsModel);
            }
            else
            {
                return ErrMsg("ErrorInfoCn");
            }
        }

        /// <summary>
        /// 获取个人相册设定表
        /// </summary>
        /// <param name="user_id">用户id</param>
        /// <returns></returns>
        public PersonalPhotoSettingsModel GetPersonalPhotoSettingsModel(string user_id)
        {
            IList<PersonalPhotoSettingsModel> IListppsmodel = null;
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", pspmodel.user_id);
            IListppsmodel = DbHelperFactory.SingleInstance().GetGenericModel<PersonalPhotoSettingsModel>("PersonSQL", "GetPersonalPhotoSettingsModel", dic);
            if (IListppsmodel != null)
            {
                return IListppsmodel[0];
            }
            else
            {
                return null;
            }
        }

        public bool UpdatePersonalPhotoSettings(PersonalPhotoSettingsModel ppsModel)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalPhotoSettingsModel>("PersonSQL", "UpdatePersonalPhotoSettings", ppsModel);
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 修改个人设定
        /// </summary>
        /// <param name="dic">string default_folder_id,string default_permission</param>
        /// <returns></returns>有的话传 没有不传
        public string UpdatePersonalPhotoSettings(Dictionary<string, object> dic)
        {
            string json = string.Empty;

            string default_folder_id = dic.ContainsKey("default_folder_id") ? dic["default_folder_id"].ToString() : null;
            string default_permission = dic.ContainsKey("default_permission") ? dic["default_permission"].ToString() : null;
            PersonalPhotoSettingsModel ppsModel = GetPersonalPhotoSettingsModel(pspmodel.user_id);
            if (ppsModel != null)
            {
                ppsModel.update_date = DateTime.Now;
                if (!string.IsNullOrEmpty(default_folder_id))
                {
                    ppsModel.default_folder_id = default_folder_id;
                }
                if (!string.IsNullOrEmpty(default_permission))
                {
                    ppsModel.default_permission = default_permission;
                }
                if (UpdatePersonalPhotoSettings(ppsModel))
                {
                    json = SucMsg("UpdateInfoCn");
                }
                else
                {
                    json = ErrMsg("UpdateFailInfoCn");
                }
            }
            else
            {
                json = ErrMsg("ErrorInfoCn");
            }
            return json;
        }
        #endregion

        #region 图片评论回复
        /// <summary>
        /// 添加图片回复
        /// </summary>
        /// <param name="icmodel">图片id(id), 内容（content),, 父贴号(followId) </param>
        /// <returns></returns>
        public string AddImageComments(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            ImageCommentsModel model = new ImageCommentsModel();
            model.id = WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid();
            model.user_id = pspmodel.user_id;
            model.image_id = dic["id"].ToString();
            model.comments_date = DateTime.Now;
            model.content = dic["content"].ToString();
            model.follow_id = dic["followId"].ToString();
            if (model.follow_id == string.Empty) { model.follow_id = "-1"; }
            model.positive = 0;
            model.negative = 0;
            model.active = true;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<ImageCommentsModel>("PersonSQL", "AddImageComment", model);
            if (result > 0)
                json = SucMsg("SaveInfoCn");
            else
                json = ErrMsg("FailInfoCn");

            return json;
        }

        /// <summary>
        /// 添加图片回复
        /// </summary>
        /// <param name="icmodel">图片id（image_id）</param>
        /// <returns></returns>
        public string AddImageComments(ImageCommentsModel icmodel)
        {
            string json = string.Empty;


            return json;
        }

        /// <summary>
        /// 删除图片回复
        /// </summary>
        /// <param name="dic">图片id</param>
        /// <returns></returns>
        public string DeleteImageComments(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            dic.Add("user_id", pspmodel.user_id);

            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeleteImageCommentById", dic);

            if (result > 0)
            {
                json = SucMsg("DeleteInfoCn");
            }
            else
            {
                json = SucMsg("DeleteFailInfoCn");
            }
            return json;
        }

        /// <summary>
        /// 查询图片回复
        /// </summary>
        /// <param name="dic">图片id，分页参数</param>
        /// <returns></returns>
        public string SelectImageComments(Dictionary<string, object> dic) { string json = string.Empty; return json; }
        #endregion

        #region 照片相册转发
        /// <summary>
        /// 转发照片
        /// </summary>
        /// <param name="id">string id(相片id),string fold_id(当转发到某个已经存在相册id)</param>
        /// <returns></returns>
        public string ForwardImage(string id, string fold_id)
        {
            string json = "";
            PersonalImageModel pimgModel = GetPersonalImageModelById(id);
            string guid = WanerDao2.WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid();
            if (pimgModel != null)
            {
                pimgModel.id = guid;
                pimgModel.user_id = pspmodel.user_id;
                pimgModel.fold_id = fold_id;
                pimgModel.is_transmit = true;
                pimgModel.transmit_id = id;
                pimgModel.upload_date = DateTime.Now;
                pimgModel.sequence = GetMaxSequenceOfImageFolder(pspmodel.user_id, fold_id) + 1;
            }
            if (AddPersonalImage(pimgModel))
            {
                WanerDaoPersonState.AddHomeOperate(guid, "b5e6c649926d11e183b9002354c6e759");
                json = CommonContext.SucMsg("ForwardSuc");
            }
            else
            {
                json = CommonContext.ErrMsg("ForwardFailed");
            }
            return json;
        }

        /// <summary>
        /// 转发个人照片至个人照片（徐蓓2012-8-8修改）
        /// </summary>
        /// <param name="id">相片标识</param>
        /// <param name="fold_id">转发到的相册标识</param>
        /// <param name="newName">转发后的名称</param>
        /// <returns></returns>
        public string ForwardImage(string id, string fold_id, string newName)
        {
            string json = "";
            PersonalImageModel pimgModel = GetPersonalImageModelById(id);
            string guid = WanerDao2.WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid();
            if (pimgModel != null)
            {
                pimgModel.id = guid;
                pimgModel.user_id = pspmodel.user_id;
                pimgModel.fold_id = fold_id;
                pimgModel.is_transmit = true;
                pimgModel.transmit_id = id;
                pimgModel.upload_date = DateTime.Now;
                pimgModel.sequence = GetMaxSequenceOfImageFolder(pspmodel.user_id, fold_id) + 1;
                pimgModel.image_name = string.IsNullOrEmpty(newName) ? pimgModel.image_name : newName;
            }
            if (AddPersonalImage(pimgModel))
            {
                WanerDaoPersonState.AddHomeOperate(guid, "b5e6c649926d11e183b9002354c6e759");
                json = CommonContext.SucMsg("ForwardSuc");
            }
            else
            {
                json = CommonContext.ErrMsg("ForwardFailed");
            }
            return json;
        }


        /// <summary>
        /// 转发相册
        /// </summary>
        /// <param name="id">目标相册id</param>
        /// <param name="isCreateFolder">是否创建新相册</param>
        /// <param name="imageFolderIdOrName">如果创建新相册则为相册名称否则为已经存在的相册id</param>
        /// <returns></returns>
        public string ForwardImageFolder(string id, bool isCreateFolder, string imageFolderIdOrName)
        {
            string json = string.Empty;
            ImageFolderModel ifmodel = GetImageFolderModelById(id);
            string guest_id = ifmodel.user_id;
            if (guest_id == pspmodel.user_id)
            {
                return CommonContext.ErrMsg("CanNotForwardSelfImageFolder");
            }
            string rule = string.Empty;
            IList<PersonalPermissionModel> Ilistppmodel = WanerDaoPropertyPermission.getAllPermission(pspmodel.user_id);
            foreach (PersonalPermissionModel ppmodel in Ilistppmodel)
            {
                if (WanerDaoPropertyPermission.hasPermission(pspmodel.user_id, guest_id, ppmodel.id))
                {
                    if (rule.IndexOf("and") == -1)
                    {
                        rule += " and (permission='" + ppmodel.id + "'";
                    }
                    else
                    {
                        rule += " or permission='" + ppmodel.id + "'";
                    }
                }
            }
            if (rule != string.Empty)
            {
                rule += ")";
            }
            string guid = WanerDao2.WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid();
            Dictionary<string, object> mydic = new Dictionary<string, object>() { 
                         {"In_user_id",pspmodel.user_id},{"In_imagefolder_id",id},{"In_isCreateNewFolder",isCreateFolder},
                         {"In_folderNameOrID",imageFolderIdOrName},{"In_permission",rule},{"In_guid",guid}
                        };
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "CopyImageFolderToMyFolder", mydic);
            if (result >= 0)
            {
                WanerDaoPersonState.AddHomeOperate(guid, "104b86ea927411e183b9002354c6e759");
                json = CommonContext.SucMsg("ForwardSuc");
            }
            else
            {
                json = CommonContext.ErrMsg("ForwardFailed");
            }
            return json;
        }
        #endregion

        #region 批量修改图片操作

        /// <summary>
        /// 批量移动照片
        /// </summary>
        /// <param name="dic">string image_id(一个或者多个,用逗号分开),string folder_id</param>
        /// <returns></returns>
        public string MoveMorePersonalImageFolder(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string folder_id = dic.ContainsKey("folder_id") ? dic["folder_id"].ToString() : null;
            string image_id = dic.ContainsKey("image_id") ? dic["image_id"].ToString() : null;
            if (!string.IsNullOrEmpty(image_id) && !string.IsNullOrEmpty(folder_id))
            {
                try
                {
                    string[] idArr = image_id.Split(',');
                    for (int i = 0; i < idArr.Length; i++)
                    {
                        PersonalImageModel pmgModel = GetPersonalImageModelById(idArr[i]);
                        if (pmgModel != null)
                        {

                            ImageFolderModel imgFolderModel = GetImageFolderModelById(pmgModel.fold_id);
                            if (imgFolderModel.share_key_id != "-1")
                            {
                                Icommon.WanerDaoDeleteActivityImage(idArr[i]);
                            }
                            imgFolderModel = GetImageFolderModelById(folder_id);
                            if (imgFolderModel.share_key_id != "-1")
                            {
                                DataTable dt = WannerDaoImageAndFolderManage.GetActivityImageForlderById(folder_id);//获取该图片所在的相册信息 以取得活动id 
                                int maxSequence = GetMaxSequenceOfImageFolder(pspmodel.user_id, folder_id);//取得最大排序号
                                WannerDaoImageAndFolderManage.InsertImageActivity(pmgModel.id, pmgModel.user_id, dt.Rows[0]["activity_id"].ToString(),
                                    pmgModel.link_id, folder_id, pmgModel.image_name, pmgModel.image_path, pmgModel.image_small_path, pmgModel.fileSize,
                                    maxSequence, pmgModel.description, pmgModel.is_submit == true ? 1 : 0);//想活动相册表插入图片
                            }
                            pmgModel.fold_id = folder_id;
                            if (UpdatePersonalImage(pmgModel))
                            {
                                RemoveModelCache(imageKey, pspmodel.user_id + "_" + pmgModel.id);
                            }
                            else
                            {
                                throw new Exception("ErrorInfoCn");
                            }
                        }

                    }
                    json = SucMsg("SuccessInfoCn");
                }
                catch (Exception ex)
                {
                    json = ErrMsg(ex.Message);
                }
            }
            else
            {
                json = ErrMsg("ParameterError");
            }
            return json;
        }

        /// <summary>
        /// 批量删除相册
        /// </summary>
        /// <param name="dic">string folder_id(一个或者多个,用逗号分开)</param>
        /// <returns></returns>
        public string DeleteMorePersonalImageFolder(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string folder_id = dic.ContainsKey("folder_id") ? dic["folder_id"].ToString() : null;
            if (!string.IsNullOrEmpty(folder_id))
            {
                try
                {
                    string[] idArr = folder_id.Split(',');
                    for (int i = 0; i < idArr.Length; i++)
                    {
                        Dictionary<string, object> mydic = new Dictionary<string, object>();
                        mydic.Add("folder_id", idArr[i]);
                        JObject Jo = WanerDaoJSON.ParseJson(DeleteImageFolder(mydic));
                        if (Jo["result"].ToString().ToLower() == "false")
                        {
                            throw new Exception("ErrorInfoCn");
                            // break;
                        }
                    }
                    json = SucMsg("DeleteInfoCn");
                }
                catch (Exception ex)
                {
                    json = ErrMsg(ex.Message);
                }
            }
            else
            {
                json = ErrMsg("ParameterError");
            }
            return json;
        }

        /// <summary>
        /// 批量删除照片
        /// </summary>
        /// <param name="dic">string image_id(一个或者多个,用逗号分开)</param>
        /// <returns></returns>
        public string DeleteMorePersonalImages(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string image_ids = dic.ContainsKey("image_id") ? dic["image_id"].ToString() : null;
            string image_id_list = string.Empty;
            bool is_shared = false;
            if (!string.IsNullOrEmpty(image_ids))
            {
                try
                {
                    string[] idArr = image_ids.Split(',');
                    for (int i = 0; i < idArr.Length; i++)
                    {
                        if (i == 0)
                        {
                            try
                            {
                                if (GetImageFolderModelById(GetPersonalImageModelById(idArr[i].ToString()).fold_id).share_key_id != "-1")
                                {   //表示该图片在活动那边有共享
                                    is_shared = true;
                                }
                            }
                            catch (Exception)
                            {
                                return json = ErrMsg("ImageIsDel");
                            }
                        }
                        image_id_list += ",'" + idArr[i] + "'";
                    }
                    if (image_id_list != string.Empty)
                    {
                        image_id_list = image_id_list.Substring(1);
                    }
                    Dictionary<string, object> mydic = new Dictionary<string, object>();
                    mydic.Add("image_id_list", image_id_list);
                    mydic.Add("is_shared", is_shared);
                    if (ExcuteNonQuery("DeleteMorePersonalImages", mydic))
                    {
                        json = SucMsg("DeleteInfoCn");
                    }
                    else
                    {
                        json = SucMsg("DeleteFailInfoCn");
                    }
                }
                catch (Exception ex)
                {
                    json = ErrMsg(ex.Message);
                }
            }
            else
            {
                json = ErrMsg("ParameterError");
            }
            return json;
        }

        /// <summary>
        /// 批量修改相册权限
        /// </summary>
        /// <param name="dic">string folder_id(一个或者多个),string permission</param>
        /// <returns></returns>
        public string UpdateMoreFolderPermission(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string folder_id = dic.ContainsKey("folder_id") ? dic["folder_id"].ToString() : null;
            if (!string.IsNullOrEmpty(folder_id))
            {
                try
                {
                    string[] idArr = folder_id.Split(',');
                    for (int i = 0; i < idArr.Length; i++)
                    {
                        Dictionary<string, object> mydic = new Dictionary<string, object>();
                        mydic.Add("folder_id", idArr[i]);
                        ImageFolderModel ifmodel = GetImageFolderModelById(idArr[i]);
                        if (ifmodel != null)
                        {
                            ifmodel.permission = dic["permission"].ToString();
                            if (!UpdateImageFolder(ifmodel))
                            {
                                throw new Exception("UpdateFailInfoCn");
                            }
                        }
                        RemoveModelCache(imageFolderKey, pspmodel.user_id + "_" + idArr[i]);
                    }
                    json = SucMsg("SuccessInfoCn");

                }
                catch (Exception ex)
                {
                    json = ErrMsg(ex.Message);
                }
            }
            else
            {
                json = ErrMsg("ParameterError");
            }
            return json;
        }

        /// <summary>
        /// 批量修改图片权限
        /// </summary>
        /// <param name="dic">string image_id(图片id)，string permission(权限id)</param>
        /// <returns></returns>
        public string UpDatePersonalImagePermission(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string image_id = dic.ContainsKey("image_id") ? dic["image_id"].ToString() : null;
            if (!string.IsNullOrEmpty(image_id))
            {
                try
                {
                    string[] idArr = image_id.Split(',');
                    for (int i = 0; i < idArr.Length; i++)
                    {
                        Dictionary<string, object> mydic = new Dictionary<string, object>();
                        mydic.Add("image_id", idArr[i]);
                        PersonalImageModel ifmodel = GetPersonalImageModelById(idArr[i]);
                        if (ifmodel != null)
                        {
                            ifmodel.permission = dic["permission"].ToString();
                            if (!UpdatePersonalImage(ifmodel))
                            {
                                throw new Exception("UpdateFailInfoCn");
                            }
                        }
                        RemoveModelCache(imageKey, idArr[i] + "_" + pspmodel.user_id);
                    }
                    json = SucMsg("SuccessInfoCn");

                }
                catch (Exception ex)
                {
                    json = ErrMsg(ex.Message);
                }
            }
            else
            {
                json = ErrMsg("ParameterError");
            }
            return json;
        }

        /// <summary>
        /// 批量移动图片到其他相册
        /// </summary>
        /// <param name="dic">相册id，图片id集合</param>
        /// <returns></returns>
        public string UpdatePersonalImageFolder(Dictionary<string, object> dic)
        {
            string json = string.Empty;


            return json;
        }

        #endregion


        /// <summary>
        /// 分享到活动
        /// </summary>
        /// <param name="dic">albumId:相册编号，actid:活动编号</param>
        /// <returns></returns>
        public string ShareToActivity(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string albumId = dic["albumId"].ToString();
            string actId = dic["actId"].ToString();

            if (WanerDao2.WanerDaoBLL.Activity.WanerDaoShareActivityImageOrFolder.ShareImagesToSystemFolder(actId,albumId))
            {   json = SucMsg("SaveInfoCn");
            }else{
                json = ErrMsg("FailInfoCn");
            }

            return json;
        }

        #region 公共成员
        /// <summary>
        /// 是不是主人
        /// </summary>
        /// <returns></returns>
        public bool IsSelf(ref string user_id)
        {
            IWanerDaoBlogManager Iblog = new WanerDaoBlogManager();
            return Iblog.IsSelf(ref user_id);
        }
        #endregion

        #region 私有成员
        private void RemoveModelCache(string key, string uid)
        {
            if (ICache.ObjectIsExist(key + "Model_" + uid))
            {
                ICache.RemoveObject(key + "Model_" + uid);
            }
        }
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
        private bool ExcuteNonQuery(string sqlKey, Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("PersonSQL", sqlKey, dic);
            if (result >= 0)
                return true;
            else
                return false;
        }
        private string GetScalar(string sqlKey, Dictionary<string, object> dic)
        {
            object o = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", sqlKey, dic);
            if (o != null && o != DBNull.Value)
            {
                return o.ToString();
            }
            else
            {
                return null;
            }
        }
        private string GetDataTableJson(string sqlKey, Dictionary<string, object> dic)
        {
            string json = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", sqlKey, dic);
            return json;
        }
        private T GetGenericModel<T>(string sqlKey, Dictionary<string, object> dic)
        {
            IList<T> Ilist;
            Ilist = DbHelperFactory.SingleInstance().GetGenericModel<T>("PersonSQL", sqlKey, dic);
            if (Ilist != null)
            {
                return Ilist[0];
            }
            return default(T);
        }

        #endregion
    }
}
