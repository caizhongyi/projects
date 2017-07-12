#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/1/5 23:27:38 
* 文件名：WanerDaoVideoManager 
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
using System.IO;
using System.Web;
using System.Net;
using System.Text.RegularExpressions;
using WanerDao2.WanerDaoModule.String;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoModule.Utils;
using WanerDao2.WanerDaoBLL.Index;

namespace WanerDao2.WanerDaoBLL.Person
{
    public class WanerDaoVideoManager : IWanerDaoVideoManager
    {
        private readonly string videoFolderKey = "VideoFolder_";
        private readonly string videoKey = "PersonalVideo_";
        //private readonly string videoSetting = "PersonalVideoFolderSetting_";

        PersonalSecurityProfileModel pspmodel = null;

        ICacheStrategy ICache = null;

        IWanerDaoCommon Icommon = null;

        public WanerDaoVideoManager()
        {
            Icommon = new WanerDaoBLL.Common.WanerdaoCommon();
            ICache = new WanerDaoCacheFactory().GetStrategy(0);
            //#if DEBUG
            //            pspmodel = new PersonalSecurityProfileModel { user_id = "9f6c58f988cc4aff9c910504dce3edc2" };
            //            return;
            //#endif
            pspmodel = CommonContext.GetUserSecurityInfo();
        }


        #region 个人视频设定

        /// <summary>
        /// 获取个人视频册设定表
        /// </summary>
        /// <param name="user_id">用户id</param>
        /// <returns></returns>
        public string GetPersonalVideoSettingsModel()
        {
            PersonalVideoSettingsModel pvsModel = GetPersonalVideoSettingsModel(pspmodel.user_id);
            if (pvsModel != null)
            {
                return WanerDaoJSON.SerializeObject(pvsModel);
            }
            else
            {
                return ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn"));
            }
        }

        /// <summary>
        /// 获取个人视频设定表
        /// </summary>
        /// <param name="user_id">用户id</param>
        /// <returns></returns>
        public PersonalVideoSettingsModel GetPersonalVideoSettingsModel(string user_id)
        {
            IList<PersonalVideoSettingsModel> IListppsmodel = null;
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", pspmodel.user_id);
            IListppsmodel = DbHelperFactory.SingleInstance().GetGenericModel<PersonalVideoSettingsModel>("PersonSQL", "GetPersonalVideoSettingsModel", dic);
            if (IListppsmodel != null)
            {
                return IListppsmodel[0];
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 修改个人视频设定
        /// </summary>
        /// <param name="ppsModel"></param>
        /// <returns></returns>
        public bool UpdatePersonalVideoSettings(PersonalVideoSettingsModel ppsModel)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalVideoSettingsModel>("PersonSQL", "UpdatePersonalVideoSettings", ppsModel);
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 修改个人视频设定
        /// </summary>
        /// <param name="dic">string fold_id,string permission</param>
        /// <returns></returns>有的话传 没有不传
        public string UpdatePersonalVideoSettings(Dictionary<string, object> dic)
        {
            string json = string.Empty;

            string default_folder_id = dic.ContainsKey("fold_id") ? dic["fold_id"].ToString() : null;
            string default_permission = dic.ContainsKey("permission") ? dic["permission"].ToString() : null;
            PersonalVideoSettingsModel ppsModel = GetPersonalVideoSettingsModel(pspmodel.user_id);
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
                if (UpdatePersonalVideoSettings(ppsModel))
                {
                    json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));
                }
                else
                {
                    json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
                }
            }
            else
            {
                json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
            }
            return json;
        }
        #endregion

        #region 个人视频册管理
        /// <summary>
        /// 添加相册
        /// </summary>
        /// <param name="dic">string folder_name</param>
        /// <returns></returns>
        public string AddVideoFolder(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string default_permission = GetPersonalVideoSettingsModel(pspmodel.user_id).default_permission;
            if (string.IsNullOrEmpty(default_permission))
                default_permission = CommonContext.PublicPermission;// "d500f146912111e0bae500210044b80f";//公共
            string folder_name = dic.ContainsKey("folder_name") ? dic["folder_name"].ToString() : null;
            if (!string.IsNullOrEmpty(folder_name) && !IsExistsOfVideoFolderName(folder_name))
            {
                VideoFolderModel ifmodel = new VideoFolderModel()
                {
                    id = WanerDaoGuid.GetGuid(),
                    folder_name = folder_name,
                    permission = default_permission,
                    user_id = pspmodel.user_id,
                    is_system = false,
                };
                if (AddVideoFolder(ifmodel))
                {
                    json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("SuccessInfoCn"));
                }
                else
                {
                    json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("FailInfoCn"));
                }
            }
            else
            {
                json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("VideoFolderRequied"));
            }
            return json;
        }

        /// <summary>
        /// 添加视频册
        /// </summary>
        /// <param name="ifmodel">视频册模型</param>
        /// <returns></returns>
        public bool AddVideoFolder(VideoFolderModel ifmodel)
        {
            bool flag = false;
            if (ifmodel != null)
            {
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<VideoFolderModel>("PersonSQL", "AddVideoFolder", ifmodel);
                if (result > 0)
                {
                    flag = true;
                }
            }
            return flag;
        }

        /// <summary>
        /// 查询视频册Id查询视频册
        /// </summary>
        /// <param name="videoFolderId"></param>
        /// <returns></returns>
        public VideoFolderModel SelectVideoFolderById(string id)
        {
            string key = videoFolderKey + "Model_" + pspmodel.user_id + "_" + id;
            VideoFolderModel model = null;
            object cache = ICache.RetrieveObject(key);
            if (cache != null)
            {
                model = (VideoFolderModel)cache;
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>() { { "id", id } };
                model = GetGenericModel<VideoFolderModel>("GetVideoFolderModelById", dic);
                if (model != null)
                {
                    ICache.AddObject(key, model);
                }
            }
            return model;
        }

        /// <summary>
        /// 查询视频册Id查询视频册
        /// </summary>
        /// <param name="dic">视频册id，分页参数</param>
        /// <returns></returns>
        public string SelectVideoFolderById(Dictionary<string, object> dic)
        {
            return null;
        }


        /// <summary>
        /// 是否存在同名视频册
        /// </summary>
        /// <param name="videoFolderName"></param>
        /// <returns></returns>
        private bool IsExistsOfVideoFolderName(string videoFolderName)
        {
            bool flag = false;
            if (!string.IsNullOrEmpty(videoFolderName))
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("folder_name", videoFolderName);
                dic.Add("user_id", pspmodel.user_id);
                int result = Convert.ToInt32(DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "IsExistsOfVideoFolderName", dic));
                if (result > 0)
                {
                    flag = true;
                }
            }
            return flag;
        }

        /// <summary>
        /// 获取视频列表
        /// </summary>
        /// <param name="dic">string user_id（访客）,string folder_name,string pagecurrent,string pagesize</param>
        /// <returns></returns>
        public string VideoFolderPaging(Dictionary<string, object> dic)
        {
            string _where = string.Empty;
            string user_id = string.Empty;
            string _folder_name = dic.ContainsKey("folder_name") ? dic["folder_name"].ToString() : null;
            user_id = dic.ContainsKey("user_id") ? dic["user_id"].ToString() : pspmodel.user_id;
            if (user_id == string.Empty) user_id = pspmodel.user_id;

            IList<PersonalPermissionModel> Ilistppmodel = WanerDaoPropertyPermission.getAllPermission(user_id);
            string rule = string.Empty;
            if (user_id != pspmodel.user_id)
            {
                foreach (PersonalPermissionModel ppmodel in Ilistppmodel)
                {
                    if (WanerDaoPropertyPermission.hasPermission(pspmodel.user_id, user_id, ppmodel.id))
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

            _where = string.Format("and user_id = '{0}'{1}", user_id, rule);
            if (!string.IsNullOrEmpty(_folder_name))
            {
                _where += "and folder_name like '%" + _folder_name + "%'";
            }

            dic.Add("tablename", "videofolder");
            dic.Add("fldName", "*,(select count(*) from personalvideo where fold_id = videofolder.id) as count");
            dic.Add("where", _where);
            dic.Add("fldSortId", "create_date");
            dic.Add("sort", 1);

            WanerdaoCommon common = new WanerdaoCommon();
            return common.WanerDaoPagination(dic);
        }
        /// <summary>
        /// 获取视频列表（徐蓓2012-8-10添加），返回的数据类型为{id:'',value,''}
        /// </summary>
        /// <param name="userId">用户主键</param>
        /// <param name="pageCurrent">当前页数</param>
        /// <param name="pageSize">每页条数</param>
        /// <returns></returns>
        public string VideoFolderPaging(string userId, int pageCurrent, int pageSize)
        {
            string _where = string.Empty;
            string user_id = string.Empty;
            string _folder_name = string.Empty;
            user_id = string.IsNullOrEmpty(userId) ? userId : pspmodel.user_id;
            if (user_id == string.Empty) user_id = pspmodel.user_id;

            IList<PersonalPermissionModel> Ilistppmodel = WanerDaoPropertyPermission.getAllPermission(user_id);
            string rule = string.Empty;
            if (user_id != pspmodel.user_id)
            {
                foreach (PersonalPermissionModel ppmodel in Ilistppmodel)
                {
                    if (WanerDaoPropertyPermission.hasPermission(pspmodel.user_id, user_id, ppmodel.id))
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

            _where = string.Format("and user_id = '{0}'{1}", user_id, rule);
            if (!string.IsNullOrEmpty(_folder_name))
            {
                _where += "and folder_name like '%" + _folder_name + "%'";
            }
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("tablename", "videofolder");
            dic.Add("fldName", "id as id,folder_name as value");
            dic.Add("where", _where);
            dic.Add("fldSortId", "create_date");
            dic.Add("sort", 1);
            dic.Add("pagecurrent", pageCurrent);
            dic.Add("pageSize", pageSize);
            WanerdaoCommon common = new WanerdaoCommon();
            return common.WanerDaoPagination(dic);
        }
        /// <summary>
        /// 修改视频册
        /// </summary>
        /// <param name="ifmodel">视频册模型</param>
        /// <returns></returns>
        public bool UpdateVideoFolder(VideoFolderModel model)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<VideoFolderModel>("PersonSQL", "UpdateVideoFolder", model);
            if (result > 0)
                return true;
            else
                return false;
        }

        /// <summary>
        /// 修改视频册
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string UpdateVideoFolderId(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string folder_id = dic.ContainsKey("folder_id") ? dic["folder_id"].ToString() : null;
            if (!string.IsNullOrEmpty(folder_id))
            {
                VideoFolderModel model = SelectVideoFolderById(folder_id);
                if (model != null)
                {
                    string folder_name = dic.ContainsKey("folder_name") ? dic["folder_name"].ToString() : null;
                    string permission = dic.ContainsKey("permission") ? dic["permission"].ToString() : null;
                    string description = dic.ContainsKey("description") ? dic["description"].ToString() : null;

                    if (!string.IsNullOrEmpty(folder_name))
                    {
                        model.folder_name = folder_name;
                    }
                    if (!string.IsNullOrEmpty(permission))
                    {
                        model.permission = permission;
                    }
                    if (!string.IsNullOrEmpty(description))
                    {
                        model.description = description;
                    }
                    if (UpdateVideoFolder(model))
                    {
                        json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));
                        RemoveModelCache(videoFolderKey, pspmodel.user_id + "_" + model.id);
                    }
                    else
                    {
                        json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
                    }
                }
                else
                {
                    json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("VideoFolderIsDel"));
                }
            }
            else
            {
                json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("VideoFolderIDRequied"));
            }
            return json;
        }

        /// <summary>
        /// 删除视频册
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteVideoFolder(string id)
        {

            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            dic.Add("user_id", pspmodel.user_id);

            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeleteVideoFolder", dic);
            if (result > 0)
            {
                RemoveModelCache(videoFolderKey, pspmodel.user_id + "_" + id);
                return true;
            }
            else return false;
        }

        /// <summary>
        ///根据 id 删除视频册
        /// </summary>
        /// <param name="dic">视频册id  folder_id</param>
        /// <returns></returns>
        public string DeleteVideoFolderById(Dictionary<string, object> dic)
        {
            string id = dic["folder_id"].ToString();
            if (SelectVideoFolderById(id).is_system)
            { //系统相册不能删除
                return ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("SysVideoFolderCanNotDel"));
            }
            if (DeleteVideoFolder(id))
            {
                return SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("DeleteInfoCn"));
            }
            else
                return ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("DeleteFailInfoCn"));
        }

        #endregion

        #region 查询视频册数量或视频册下视频数量
        /// <summary>
        /// 查询视频册的数量（个数）
        /// </summary>
        /// <param name="dic">user_id</param>
        /// <returns></returns>
        public string SelectVideoFolderCount(Dictionary<string, object> dic) { return null; }

        /// <summary>
        /// 根据视频册id查询视频册下视频个数
        /// </summary>
        /// <param name="dic">视频册编号</param>
        /// <returns></returns>
        public string SelectVideoCountByFoldId(Dictionary<string, object> dic)
        {
            return null;
        }
        #endregion

        #region 单个视频管理
        /// <summary>
        /// 查询视频id查询单个视频
        /// </summary>
        /// <param name="dic">视频id</param>
        /// <returns></returns>
        public string SelectPersonalVideoByVideoId(Dictionary<string, object> dic) { return null; }
        public PersonalVideoModel SelectPersonalVideoByVideoId(string id)
        {
            string key = videoKey + "Model_" + pspmodel.user_id + "_" + id;
            PersonalVideoModel pimgModel = null;
            object cache = ICache.RetrieveObject(key);
            if (cache != null)
            {
                pimgModel = (PersonalVideoModel)cache;
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>() { { "id", id } };
                pimgModel = GetGenericModel<PersonalVideoModel>("GetPersonalVideoModelById", dic);
                if (pimgModel != null)
                {
                    ICache.AddObject(key, pimgModel);
                }
            }
            return pimgModel;
        }

        /// <summary>
        /// 根据视频名称查询单个视频
        /// </summary>
        /// <param name="dic">视频名称</param>
        /// <returns></returns>
        public string SelectPersonalVideoByVideoName(Dictionary<string, object> dic) { return null; }

        /// <summary>
        /// 删除单个视频
        /// </summary>
        /// <param name="dic">视频id</param>
        /// <returns></returns>
        public string DeletePersonalVideo(Dictionary<string, object> dic) { return null; }

        /// <summary>
        /// 更新单个视频信息
        /// </summary>
        /// <param name="pimodel">视频model</param>
        /// <returns></returns>
        public bool UpdatePersonalVideo(PersonalVideoModel model)
        {
            bool flag = false;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalVideoModel>("PersonSQL", "UpdatePersonalVideo", model);
            if (result > 0)
            {
                RemoveModelCache(videoKey, pspmodel.user_id + "_" + model.id);
                flag = true;
            }
            return flag;
        }

        /// <summary>
        /// 更新单个视频信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string UpdatePersonalVideo(Dictionary<string, object> dic)
        {
            string json = string.Empty;

            string video_id = dic.ContainsKey("vid") ? dic["vid"].ToString() : null;
            string video_name = dic.ContainsKey("vname") ? dic["vname"].ToString() : null;
            string video_description = dic.ContainsKey("vdesc") ? dic["vdesc"].ToString() : null;

            if (!string.IsNullOrEmpty(video_id))
            {
                PersonalVideoModel model = SelectPersonalVideoByVideoId(video_id);
                if (model != null)
                {
                    //修改视频名称
                    if (!string.IsNullOrEmpty(video_name))
                    {
                        model.video_name = video_name;
                    }
                    //修改视频描述
                    if (!string.IsNullOrEmpty(video_description))
                    {
                        model.description = video_description;
                    }

                    if (UpdatePersonalVideo(model))
                    {
                        json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));
                    }
                    else
                    {
                        json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
                    }
                }
                else
                {
                    json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("VideoIsDel"));
                }
            }
            else
            {
                json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("ParameterError"));
            }
            return json;
        }
        /// <summary>
        /// 修改视频排序字段
        /// </summary>
        /// <param name="dic">视频id，排序号</param>
        /// <returns></returns>
        public string UpdatePersonalVideoOfSequence(Dictionary<string, object> dic) { return null; }

        /// <summary>
        /// 添加单个视频
        /// </summary>
        /// <param name="pimodel">视频model</param>
        /// <returns></returns>
        public bool AddPersonalVideo(PersonalVideoModel pimodel)
        {
            return DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalVideoModel>("PersonSQL", "AddPersonalVideo", pimodel) > 0;
        }
        public string AddPersonalVideo(Dictionary<string, object> dic)
        {
            return null;
        }

        /// <summary>
        /// 共享视频至默认目录（2012-8-27徐蓓添加）
        /// </summary>
        /// <param name="videoCode">视频信息代码</param>
        /// <param name="videoDesc">视频描述</param>
        /// <param name="userId">共享人主键</param>
        /// <returns></returns>
        public string ShareVideo(string videoCode, string videoDesc, string userId)
        {
            PersonalVideoModel video = new PersonalVideoModel();
            double formatWidth = 180;
            double formatHeight = 120;
            //判断是否为url地址
            if (IsUrl(videoCode))
            {
                video.video_link = videoCode;
                video.video_code = "<iframe width=\"" + formatWidth + "px\" height=\"" + formatHeight + "\" src=\"" + videoCode + "\" frameborder=\"0\" allowfullscreen></iframe>";
            }
            else
            {
                video.video_link = ExtractUrl(videoCode);//提取url
                video.video_code = formatVideoSize(videoCode, formatWidth, formatHeight);//格式化视频尺寸
            }

            video.description = videoDesc;

            //默认值
            video.id = WanerDaoGuid.GetGuid();
            video.user_id = userId;
            video.fold_id = userId;//默认视频文件夹
            video.video_name = string.Empty;
            video.upload_date = WanerDaoUtils.GetDateTime();
            //video.weather = string.Empty;
            video.transmit_id = string.Empty;
            //video.location = string.Empty;
            video.is_transmit = false;
            video.active = true;
            video.counter = 0;
            
            video.video_path = string.Empty;
            video.permission = GetPersonalVideoSettingsModel(video.user_id).default_permission;//默认权限
            video.sequence = GetMaxSequenceOfPersonalVideoOfFolder(video.user_id) + 1;

            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalVideoModel>("PersonSQL", "AddPersonalVideoCorrect", video);
            if (result >= 0)
            {
                WanerDaoPersonState.AddHomeOperate(video.id, "10102672927411e183b9002354c6e759");
                return WanerDaoJSON.GetSuccessJson(WanerDaoGlobalTip.GetInternationalizationTip("ShareSuccessInfo"));
            }
            else
            {
                return WanerDaoJSON.GetFailJson(WanerDaoGlobalTip.GetInternationalizationTip("ShareFailInfo"));
            }
        }

        /// <summary>
        /// 判断是否为url(2012-11-14 徐蓓添加)
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        private bool IsUrl(string code)
        {
            return Regex.IsMatch(code, @"^([a-zA-z]+://)[^\s]*");
        }

        /// <summary>
        /// 提取url地址(2012-11-14 徐蓓添加)
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        private string ExtractUrl(string code)
        {
            string result = string.Empty;
            Regex reg = new Regex("src=(\"[^\"]*\")|('[^']*')");//提取代码中src后面的url地址
            Match match=reg.Match(code);
            result = Regex.Replace(match.Value, "src=|\"|'", string.Empty);
            return result;
        }
        
        /// <summary>
        /// 格式化代码中视频尺寸
        /// </summary>
        /// <param name="code">视频代码</param>
        /// <param name="width">长度，单位为像素</param>
        /// <param name="height">高度，单位为像素</param>
        /// <returns></returns>
        private string formatVideoSize(string code, double width, double height)
        {
            string result = string.Empty;
            string pattern = "width=((\"[^\"]*\")|('[^']*')|(\\d*(px)?))";
            result = Regex.Replace(code, pattern, "width=\"" + width + "px\"");
            pattern = "height=((\"[^\"]*\")|('[^']*')|(\\d*(px)?))";
            result = Regex.Replace(result, pattern, "height=\"" + height + "px\"");
            return result;
        }

        /// <summary>
        /// 个人视频分页
        /// </summary>
        /// <param name="dic">fold_id 视频册编号，user_id 拥有者编号，vname视频名称</param>
        /// <returns></returns>
        public string PersonalVideoPagingByFolderId(Dictionary<string, object> dic)
        {
            /* 获取参数，定义变量 */
            string _where = string.Empty;
            string user_id = string.Empty;
            string fold_id = string.Empty;
            string _video_name = dic.ContainsKey("vname") ? dic["vname"].ToString() : null;
            user_id = dic.ContainsKey("user_id") ? dic["user_id"].ToString() : pspmodel.user_id;
            fold_id = dic["fold_id"].ToString();

            //判断用户
            if (user_id == string.Empty) user_id = pspmodel.user_id;

            //权限判断
            IList<PersonalPermissionModel> Ilistppmodel = WanerDaoPropertyPermission.getAllPermission(user_id);
            string rule = string.Empty;
            if (user_id != pspmodel.user_id)
            {
                foreach (PersonalPermissionModel ppmodel in Ilistppmodel)
                {
                    if (WanerDaoPropertyPermission.hasPermission(pspmodel.user_id, user_id, ppmodel.id))
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

            _where = string.Format("and fold_id = '{2}'and user_id = '{0}'{1}", user_id, rule, fold_id);
            if (!string.IsNullOrEmpty(_video_name))
            {
                _where += "and video_name like '%" + _video_name + "%'";
            }

            dic.Add("tablename", "personalvideo");
            dic.Add("fldName", "*");
            dic.Add("where", _where);
            dic.Add("fldSortId", "sequence");
            dic.Add("sort", 1);

            WanerdaoCommon common = new WanerdaoCommon();
            return common.WanerDaoPagination(dic);
        }


        /// <summary>
        /// 个人视频 点击排序
        /// </summary>
        /// <param name="dic">视频编号：vid,排序方向dir  上：up 0，下：down 1</param>
        /// <returns></returns>
        public string PersonalVideoSortByClick(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string video_id = dic["vid"].ToString().ToLower();
            int dir = 0;
            if (dic["dir"].ToString() == "up")
            {
                dir = 0;
            }
            else if (dic["dir"].ToString() == "down")
            {
                dir = 1;
            }
            else
            {
                return ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("ParameterError"));
            }
            dic.Add("direction", dir);
            dic.Add("video_id", dic["vid"].ToString());
            dic.Remove("vid");
            dic.Remove("dir");
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "PersonalVideoSortByClick", dic);
            if (result == -1)
            {
                json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
            }
            else if (result == 0)
            {
                json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("IsFirstOrLast"));
            }
            else
            {
                json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));
            }

            return json;
        }

        /// <summary>
        /// 个人视频 输入序号排序
        /// </summary>
        /// <param name="dic">视频编号：vid, 输入的排序号：input_seq</param>
        /// <returns></returns>
        public string PersonalVideoSortByInput(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            try
            {
                dic.Add("In_id", dic["vid"].ToString().ToLower());
                dic.Add("target_sequence", dic["input_seq"].ToString());
                dic.Remove("vid");
                dic.Remove("input_seq");
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "PersonalVideoSortByInput", dic);
                if (result == -1)
                {
                    json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
                }
                else if (result == 0)
                {
                    json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("IsFirstOrLast"));
                }
                else
                {
                    json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));
                }
            }
            catch (Exception)
            {
                json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("ParameterError"));
            }

            return json;
        }

        /// <summary>
        /// 删除视频册
        /// </summary>
        /// <param name="id">视频编号</param>
        /// <returns></returns>
        public bool DeletePersonalVideo(string id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            dic.Add("user_id", pspmodel.user_id);

            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeletePersonalVideo", dic);
            if (result > 0)
            {
                RemoveModelCache(videoFolderKey, pspmodel.user_id + "_" + id);
                return true;
            }
            else return false;
        }

        /// <summary>
        ///根据 id 删除视频册
        /// </summary>
        /// <param name="dic">视频册id  video_id</param>
        /// <returns></returns>
        public string DeletePersonalVideoById(Dictionary<string, object> dic)
        {
            if (DeletePersonalVideo(dic["video_id"].ToString()))
            {
                return SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("DeleteInfoCn"));
            }
            else
                return ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("DeleteFailInfoCn"));
        }

        #endregion

        #region 视频转发
        /// <summary>
        /// 转发视频
        /// </summary>
        /// <param name="id">string id(视频id),string fold_id(当转发到某个已经存在视频册id)</param>
        /// <returns></returns>
        public string ForwardVideo(string id, string fold_id)
        {
            string json = string.Empty;
            PersonalVideoModel pimgModel = SelectPersonalVideoByVideoId(id);
            string guid = WanerDao2.WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid();
            if (pimgModel != null)
            {
                pimgModel.id = guid;
                pimgModel.user_id = pspmodel.user_id;
                pimgModel.fold_id = fold_id;
                pimgModel.is_transmit = true;
                pimgModel.transmit_id = id;
                pimgModel.upload_date = DateTime.Now;
                pimgModel.sequence = GetMaxSequenceOfPersonalVideoOfFolder(fold_id) + 1;
            }
            if (AddPersonalVideo(pimgModel))
            {
                WanerDao2.WanerDaoBLL.Index.WanerDaoPersonState.AddHomeOperate(guid, "103df2b5927411e183b9002354c6e759");
                json = CommonContext.SucMsg("ForwardSuc");
            }
            else
            {
                json = CommonContext.ErrMsg("ForwardFailed");
            }
            return json;
        }
        /// <summary>
        /// 转发视频（徐蓓2012-8-8修改）
        /// </summary>
        /// <param name="id">string id(视频id),string fold_id(当转发到某个已经存在视频册id),string newName(新名称)</param>
        /// <returns></returns>
        public string ForwardVideo(string id, string fold_id, string newName)
        {
            string json = string.Empty;
            PersonalVideoModel pimgModel = SelectPersonalVideoByVideoId(id);
            string guid = WanerDao2.WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid();
            if (pimgModel != null)
            {
                pimgModel.id = guid;
                pimgModel.user_id = pspmodel.user_id;
                pimgModel.fold_id = fold_id;
                pimgModel.is_transmit = true;
                pimgModel.transmit_id = id;
                pimgModel.upload_date = DateTime.Now;
                pimgModel.sequence = GetMaxSequenceOfPersonalVideoOfFolder(fold_id) + 1;
                pimgModel.video_name = string.IsNullOrEmpty(newName) ? pimgModel.video_name : newName;
            }
            if (AddPersonalVideo(pimgModel))
            {
                WanerDao2.WanerDaoBLL.Index.WanerDaoPersonState.AddHomeOperate(guid, "103df2b5927411e183b9002354c6e759");
                json = CommonContext.SucMsg("ForwardSuc");
            }
            else
            {
                json = CommonContext.ErrMsg("ForwardFailed");
            }
            return json;
        }
        /// <summary>
        /// 转发视频册
        /// </summary>
        /// <param name="id">目标视频册id</param>
        /// <param name="isCreateFolder">是否创建新视频册</param>
        /// <param name="imageFolderIdOrName">如果创建新视频册则为视频册名称否则为已经存在的视频册id</param>
        /// <returns></returns>
        public string ForwardVideoFolder(string id, bool isCreateFolder, string videoFolderIdOrName)
        {
            string json = string.Empty;
            VideoFolderModel ifmodel = SelectVideoFolderById(id);
            string guest_id = ifmodel.user_id;
            if (guest_id == pspmodel.user_id)
            {
                return CommonContext.ErrMsg("CanNotForwardSelfVideoFolder");
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
                         {"In_folderNameOrID",videoFolderIdOrName},{"In_permission",rule},{"In_guid",guid}
                        };
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "CopyVideoFolderToMyFolder", mydic);
            if (result >= 0)
            {
                //还需要添加动态
                //WanerDaoPersonState.AddHomeOperate(guid, "b5e6c649926d11e183b9002354c6e759");
                json = CommonContext.SucMsg("ForwardSuc");
            }
            else
            {
                json = CommonContext.ErrMsg("ForwardFailed");
            }
            return json;
        }
        #endregion


        #region 视频评论回复
        /// <summary>
        /// 添加视频回复
        /// </summary>
        /// <param name="dic">id:视频编号，content:评论内容,followId(父贴号)</param>
        /// <returns></returns>
        public string AddVideoComments(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            VideoCommentsModel model = new VideoCommentsModel();
            model.id = WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid();
            model.user_id = pspmodel.user_id;
            model.video_id = dic["id"].ToString();
            model.comments_date = DateTime.Now;
            model.content = dic["content"].ToString();
            model.follow_id = dic["followId"].ToString();
            if (model.follow_id == string.Empty) { model.follow_id = "-1"; }
            model.positive = 0;
            model.negative = 0;
            model.active = true;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<VideoCommentsModel>("PersonSQL", "AddVideoComment", model);
            if (result > 0)
                json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("CommentSuccess"));
            else
                json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("CommentFailed"));

            return json;
        }

        /// <summary>
        /// 删除视频回复
        /// </summary>
        /// <param name="dic">视频id  video_id</param>
        /// <returns></returns>
        public string DeleteVideoComments(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            dic.Add("user_id", pspmodel.user_id);

            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeleteVideoCommentById", dic);

            if (result > 0)
            {
                json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("DeleteInfoCn"));
            }
            else
            {
                json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("DeleteFailInfoCn"));
            }
            return json;
        }

        /// <summary>
        /// 查询视频回复
        /// </summary>
        /// <param name="dic">视频id，分页参数</param>
        /// <returns></returns>
        public string SelectVideoComments(Dictionary<string, object> dic) { return null; }
        #endregion

        #region 批量修改视频操作

        /// <summary>
        /// 批量删除视频册
        /// </summary>
        /// <param name="dic">string folder_id(一个或者多个,用逗号分开)</param>
        /// <returns></returns>
        public string BatchDeleteVideoFolder(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string folder_id = dic["folder_id"].ToString();
            string[] arr = folder_id.Split(',');
            int count = 0;
            foreach (string id in arr)
            {
                if (DeleteVideoFolder(id))
                {
                    count++;
                }
            }

            if (count == 0)
                json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("DeleteInfoCn"));
            else
                json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("DeleteFailInfoCn"));

            return json;
        }

        /// <summary>
        /// 批量修改视频册权限
        /// </summary>
        /// <param name="dic">string folder_id(一个或者多个),string permission</param>
        /// <returns></returns>
        public string BatchUpdateFolderPermission(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string folder_id = dic["folder_id"].ToString();
            string permission_id = dic["permission"].ToString();
            string[] arr = folder_id.Split(',');
            int count = 0;
            foreach (string id in arr)
            {
                VideoFolderModel videoFolder = SelectVideoFolderById(id);
                videoFolder.permission = permission_id;

                if (UpdateVideoFolder(videoFolder))
                {
                    count++;
                }
            }

            if (count == 0)
                json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
            else
                json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));

            return json;
        }

        /// <summary>
        /// 批量移动视频到其他视频册
        /// </summary>
        /// <param name="dic">视频册id，视频id集合</param>
        /// <returns></returns>
        public string BatchUpdateVideoFolderOfVideo(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string video_ids = dic["video_id"].ToString();
            string fold_id = dic["fold_id"].ToString();
            string[] arr = video_ids.Split(',');
            int count = 0;
            int sequence = GetMaxSequenceOfPersonalVideoOfFolder(fold_id) + 1;
            foreach (string id in arr)
            {
                PersonalVideoModel video = SelectPersonalVideoByVideoId(id);
                video.fold_id = fold_id;
                video.sequence = sequence;
                if (UpdatePersonalVideo(video))
                {
                    count++;
                }
                sequence++;
            }

            if (count == 0)
                json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
            else
                json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));

            return json;
        }

        /// <summary>
        /// 批量修改视频权限
        /// </summary>
        /// <param name="dic">权限id，视频id集合</param>
        /// <returns></returns>
        public string BatchUpdatePermissionOfVideo(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string video_ids = dic["video_id"].ToString();
            string permission_id = dic["permission"].ToString();
            string[] arr = video_ids.Split(',');
            int count = 0;
            foreach (string id in arr)
            {
                PersonalVideoModel video = SelectPersonalVideoByVideoId(id);
                video.permission = permission_id;

                if (UpdatePersonalVideo(video))
                {
                    count++;
                }
            }

            if (count == 0)
                json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfoCn"));
            else
                json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("UpdateInfoCn"));

            return json;
        }

        /// <summary>
        /// 批量删除视频
        /// </summary>
        /// <param name="dic">video_id 视频编号集合 多个用,分开</param>
        /// <returns></returns>
        public string BatchDeletePersonalVideo(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string video_id = dic["video_id"].ToString();
            string[] arr = video_id.Split(',');
            int count = 0;
            foreach (string id in arr)
            {
                if (DeletePersonalVideo(id))
                {
                    count++;
                }
            }

            if (count == 0)
                json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("DeleteFailInfoCn"));
            else
                json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("DeleteInfoCn"));

            return json;
        }

        #endregion

        #region 视频上传
        /// <summary>
        /// 更加视频代码 添加视频
        /// </summary>
        /// <param name="dic">string videos,string ifcreatealbum(0 or 1),string idorname，string permission</param>
        /// <returns></returns>
        public string VideoCodeUpload(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string videos = dic["videos"].ToString().DescapeSpecialchar();
            bool ifCreateAlubm = dic["ifcreatealbum"].ToString() == "1" ? true : false;
            string idOrName = dic["idorname"].ToString();
            string permission = dic["permission"].ToString();
            string albumsId = string.Empty;


            /// 获取 默认权限
            string default_permission = GetPersonalVideoSettingsModel(pspmodel.user_id).default_permission;
            if (permission == string.Empty) permission = default_permission;

            if (ifCreateAlubm)//创建新视频册
            {
                if (string.IsNullOrEmpty(default_permission))
                    default_permission = CommonContext.PublicPermission;// "d500f146912111e0bae500210044b80f";//公共

                // 是否已存在同名 视频册
                if (IsExistsOfVideoFolderName(idOrName))
                {
                    return ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("VideoFolderNameIsExist"));
                }
                //新建 视频 册
                string fold_id = WanerDaoGuid.GetGuid();
                VideoFolderModel videoFolder = new VideoFolderModel()
                {
                    id = fold_id,
                    user_id = pspmodel.user_id,
                    folder_name = idOrName,
                    permission = default_permission,
                    is_system = false
                };
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<VideoFolderModel>("PersonSQL", "AddVideoFolder", videoFolder);
                if (result < 0)
                {
                    return ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("DeleteFailInfoCn"));
                }
                albumsId = fold_id;
            }
            else
            {
                albumsId = idOrName;
            }

            //解析数组
            JArray arr = JArray.Parse(videos);
            int count = 0;
            int sequence = GetMaxSequenceOfPersonalVideoOfFolder(albumsId) + 1;
            PersonalVideoModel video = null;
            foreach (JToken jToken in arr)
            {
                video = new PersonalVideoModel()
                {
                    id = WanerDaoGuid.GetGuid(),
                    user_id = pspmodel.user_id,
                    source = jToken["type"].ToString(),
                    video_name = "未命名",
                    video_link = jToken["source"].ToString(),
                    fold_id = albumsId,
                    permission = permission,
                    upload_date = DateTime.Now,
                    sequence = sequence,
                    counter = 0,
                    active = true
                };

                switch (video.source)
                {
                    case "youku":
                        video.video_code = string.Format("<embed src=\"{0}\" quality=\"high\" width=\"100%\" height=\"100%\" align=\"middle\" allowScriptAccess=\"always\" allowFullScreen=\"true\" mode=\"transparent\" type=\"application/x-shockwave-flash\"></embed>", jToken["source"].ToString());
                        break;
                    case "tudou":
                        video.video_code = string.Format("<embed src=\"{0}\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" wmode=\"opaque\" width=\"100%\" height=\"100%\"></embed>", jToken["source"].ToString());
                        break;
                    case "youtube":
                        video.video_code = string.Format("<iframe width=\"100%\" height=\"100%\" src=\"{0}\" frameborder=\"0\" allowfullscreen></iframe>", jToken["source"].ToString());
                        break;

                }

                if (AddPersonalVideo(video))
                {
                    sequence++;
                    count++;

                    //添加到首页选项
                    WanerDao2.WanerDaoBLL.Index.WanerDaoPersonState.AddHomeOperate(video.id, "10102672927411e183b9002354c6e759");
                }
            }

            if (count == 0)
                json = ErrMsg(WanerDaoGlobalTip.GetInternationalizationTip("UploadFailed"));
            else if (count < arr.Count)
            {
                json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("SomeVideoUploadFailed"));
            }
            else
            {
                json = SucMsg(WanerDaoGlobalTip.GetInternationalizationTip("VideoUploadSuccess"));
            }

            return json;
        }
        #endregion

        #region 公共成员

        /// <summary>
        /// 获取某视频册 视频最大排序号
        /// </summary>
        /// <returns></returns>
        public int GetMaxSequenceOfPersonalVideoOfFolder(string fold_id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic["user_id"] = pspmodel.user_id;
            dic["fold_id"] = fold_id;
            object obj = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "GetMaxSequenceOfPersonalVideo", dic);
            if (obj == DBNull.Value)
                return 0;
            else
                return Convert.ToInt32(obj);
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
        private string SucMsg(string message)
        {
            return WanerDaoJSON.GetSuccessJson(message);
        }
        private string ErrMsg(string message)
        {
            return WanerDaoJSON.GetErrorJson(message);
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
