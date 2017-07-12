#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-08-01
* 文件名：UploadFile 
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
using WanerDao2.WanerDaoCacheManager;
using System.IO;
using WanerDao2.WanerDaoModule.IO;

namespace WanerDao2.WanerDaoModule.FileUpload
{
    public class UploadTempFileManger
    {
        private static ICacheStrategy CacheManager = WanerDaoCacheFactory.SingleInstance().GetStrategy(CacheType.CacheHttpCache);
        private static string KeyPrefix="CacheTempUploadFile_";

        public static UploadFileInfo UploadFile(HttpPostedFile httpPosteFile,string batchId)
        {
            try
            {

                List<UploadFileInfo> _cacheFileList = CacheManager.RetrieveObject(KeyPrefix+batchId) as List<UploadFileInfo>;
                if (_cacheFileList == null)
                {
                    _cacheFileList = new List<UploadFileInfo>();
                }
                UploadFileInfo _fileInfo = new UploadFileInfo(batchId, httpPosteFile.FileName);
                _fileInfo.size = httpPosteFile.InputStream.Length;

                WanerDaoFileUtils.SaveFile(httpPosteFile, _fileInfo.ServerSavePath, _fileInfo.NewFileName);

                _cacheFileList.Add(_fileInfo); 
                CacheManager.AddObject(KeyPrefix+batchId,_cacheFileList,3600);

                return _fileInfo;
            }
            catch (Exception _e)
            {
                throw _e;
            }
        }

        public static List<UploadFileInfo> GetCacheFile(string batchId, string[] fileID)
        {
            List<UploadFileInfo> _cacheFileList = CacheManager.RetrieveObject(KeyPrefix + batchId) as List<UploadFileInfo>;
            List<UploadFileInfo> _rtList = _cacheFileList.FindAll(i => fileID.Contains(i.FileId));
            return _rtList;
        }

        public static int MoveFile(string batchId, string[] fileIDs, string destDirectory)
        {
            return MoveFile(batchId, fileIDs, destDirectory, true);
        }
        public static int MoveFile(string batchId, string[] fileIDs, string destDirectory, bool IsClearTempDirectory)
        {
            int _successCount=0;
            if (fileIDs == null || fileIDs.Count() < 1)
            {
                throw new Exception("转移文件不能为空，请选择需要转移的文件"); 
            }
            List<UploadFileInfo> _fileList = GetCacheFile(batchId, fileIDs);
            if (_fileList == null)
            {
                throw new Exception("查无此批次的缓存记录：" + batchId);
            }
            if (Directory.Exists(destDirectory))
            {
                Directory.CreateDirectory(destDirectory);
            }
            foreach (UploadFileInfo _item in _fileList)
            {
                if (_item == null)
                    continue;
                try
                {
                    WanerDaoFileUtils.CopyFile(_item.FileServerPath, destDirectory + "\\" + _item.NewFileName);
                    _successCount++;
                }
                catch (Exception _e)
                {

                }
            }
            if (IsClearTempDirectory)
            {
                Directory.Delete(_fileList.First().ServerSavePath);
            }
            return _successCount;
        }
    }
}
