#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 图片上传返回结果
* 作者：徐兵   时间：2011-12-18 22:23:17 
* 文件名：WanerDaoUploadImageResult 
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

namespace WanerDao2.WanerDaoModule.WanerDaoImage
{
    /// <summary>
    /// 图片上传返回结果
    /// </summary>
    public class WanerDaoUploadImageResult
    {
        /// <summary>
        /// 图片ID
        /// </summary>
        public string imageId = string.Empty;
        /// <summary>
        /// 图片类型： 1：活动 2：个人
        /// </summary>
        public ImageType imageType;
        /// <summary>
        /// 批次ID
        /// </summary>
        public string batchId=string.Empty;
        /// <summary>
        /// 相册ID
        /// </summary>
        public string folderId = string.Empty;
        /// <summary>
        /// 是否添加相册
        /// </summary>
        public bool isAddFolder = false;
        /// <summary>
        /// 新添加的相册名字
        /// </summary>
        public string addFolderName = string.Empty;
        /// <summary>
        /// 原图片名称
        /// </summary>
        public string oldFileName = string.Empty;
        /// <summary>
        /// 文件名
        /// </summary>
        public string fileName = string.Empty;
        /// <summary>
        /// 缩略图文件名
        /// </summary>
        public string smallFileName = string.Empty;
        /// <summary>
        /// 存储相对目录
        /// </summary>
        public string innerPath = string.Empty;
        /// <summary>
        /// 网站根目录
        /// </summary>
        public string webRootPath = string.Empty;
        /// <summary>
        /// 缩略图片网络全路径
        /// </summary>
        public string SmallFileWebPath
        {
            get { return webRootPath + innerPath + smallFileName; }
        }
        /// <summary>
        /// 图片网络全路径
        /// </summary>
        public string FileWebPath
        {
            get { return webRootPath  + innerPath  + fileName; }
        }
        /// <summary>
        /// 缩略图片服务器全路径
        /// </summary>
        public string SmallFileServerPath
        {
            get { return webRootPath + innerPath + smallFileName; }
        }
        /// <summary>
        /// 图片服务器全路径
        /// </summary>
        public string FileServerPath
        {
            get { return webRootPath + innerPath + fileName; }
        }
        /// <summary>
        /// 服务器物理根目录
        /// </summary>
        public string serverRootPath = string.Empty;
        /// <summary>
        /// 是否成功
        /// </summary>
        public bool isSuccess = false;
        /// <summary>
        /// 文件大小
        /// </summary>
        public long size = 0;
        /// <summary>
        /// 提示信息
        /// </summary>
        public string resultMsg = string.Empty;
        /// <summary>
        /// 活动ID
        /// </summary>
        public string activityId = string.Empty;
        /// <summary>
        /// 用户ID
        /// </summary>
        public string userId = string.Empty;
        
    }
    /// <summary>
    /// 图片类型
    /// </summary>
    public enum ImageType
    {
        /// <summary>
        /// 活动类型
        /// </summary>
        activityImage = 1,
        /// <summary>
        /// 个人类型
        /// </summary>
        persongImage = 2
    }
}
