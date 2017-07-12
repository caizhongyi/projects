#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-08-01 
* 文件名：FileInfo 
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
using WanerDao2.WanerDaoModule.ExtensionObject;
using WanerDao2.WanerDaoModule.IO;
using WanerDao2.WanerDaoModule.Config;

namespace WanerDao2.WanerDaoModule.FileUpload
{
    public class UploadFileInfo
    {
        public UploadFileInfo(string batchId,string fileName)
        {
            this.BatchId = batchId;
            this.OldFileName = fileName;
            this.FileId = WanerDaoGuid.WanerDaoGuid.GetGuid();
        }
        /// <summary>
        /// 批次ID
        /// </summary>
        public string BatchId
        {
            get;
            private set;
        }
        /// <summary>
        /// 文件ID
        /// </summary>
        public string FileId
        {
            get;
            private set;
        }
        /// <summary>
        /// 原图片名称
        /// </summary>
        public string OldFileName
        {
            get;
            private set;
        }
        /// <summary>
        /// 文件名
        /// </summary>
        public string NewFileName
        {
            get { return FileId + (string.IsNullOrEmpty(FileExtension) ? "" : "." + FileExtension); }
        }
        /// <summary>
        /// 文件扩展名
        /// </summary>
        public string FileExtension
        {
            get
            {
                if (OldFileName.IndexOf(".") > 0)
                {
                    return OldFileName.Substring(OldFileName.IndexOf(".") + 1);
                }
                return "";
            }
        }

        /// <summary>
        /// 存储相对目录
        /// </summary>
        public string InnerPath
        {
            get
            {
                return Path.Combine( WanerDaoConfigReader.GetTempFilePath(),BatchId)+"\\";
            }
        }
        /// <summary>
        /// 网站根目录
        /// </summary>
        public string WebSavePath
        {
            get { return Path.Combine(WanerDaoFileUtils.GetSiteUrl_ALL(), InnerPath); }
        }
        /// <summary>
        /// 服务器物理根目录
        /// </summary>
        public string ServerSavePath
        {
            get
            {
                return WanerDaoFileUtils.GetMapPath(Path.Combine(WanerDaoFileUtils.GetSiteUrl_Root(), InnerPath));
            }
        }
        /// <summary>
        /// 图片网络全路径
        /// </summary>
        public string FileWebPath
        {
            get { return Combine(WebSavePath, NewFileName); }
        }
        /// <summary>
        /// 图片服务器全路径
        /// </summary>
        public string FileServerPath
        {
            get {

                return Combine(ServerSavePath, NewFileName); 
            }
        }
        
        /// <summary>
        /// 文件大小
        /// </summary>
        public long size = 0;



        private static string Combine( params string[] paths)
        {
            if (paths == null || paths.Count() < 1)
            {
                return "";
            }
            if (paths.Count() == 1)
            {
                return paths[0];
            }
            string _path = paths[0];
            for (int i = 1; i < paths.Count(); i++)
            {
                if (!string.IsNullOrEmpty(paths[i]))
                {
                    _path = System.IO.Path.Combine(_path, paths[i].Trim());
                }
            }
            return _path;
        }
    }

}
