using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.IO;

namespace WanerDao2.WanerDaoModule.IO
{
    public class WanerDaoFileUtils
    {
        /// <summary>
        /// 描述：获得当前绝对路径
        /// 创建者：金广亮
        /// 创建时间：2011-9-20
        /// </summary>
        /// <param name="strPath">指定的路径</param>
        /// <returns>绝对路径</returns>
        public static string GetMapPath(string strPath)
        {
            if (HttpContext.Current != null)
            {
                return HttpContext.Current.Server.MapPath(strPath);
            }
            else //非web程序引用
            {
                strPath = strPath.Replace("/", "\\");
                if (strPath.StartsWith("\\"))
                {
                    strPath = strPath.Substring(strPath.IndexOf('\\', 1)).TrimStart('\\');
                }
                return System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, strPath);
            }
        }
        /// <summary>
        /// 获取当前站点虚拟目录的根路径
        /// </summary>
        /// <returns></returns>
        public static string GetSiteUrl_Root()
        {
            return HttpContext.Current.Request.ApplicationPath;
        }

        /// <summary>
        /// 获取站点的根地址
        /// </summary>
        /// <returns></returns>
        public static string GetSiteUrl_ALL()
        {
            string _strAbsoluteUrL = HttpContext.Current.Request.Url.AbsoluteUri;
            _strAbsoluteUrL = _strAbsoluteUrL.Replace("http://", "");
            _strAbsoluteUrL ="http://"+ _strAbsoluteUrL.Substring(0, _strAbsoluteUrL.IndexOf("/")) + GetSiteUrl_Root();

            return _strAbsoluteUrL;

        }
        /// <summary>
        /// 描述：获取文件扩展名
        /// 创建者：金广亮
        /// 创建时间：2011-9-20
        /// </summary>
        /// <param name="filename">实际物理地址文件</param>
        /// <returns>文件扩展名</returns>
        public static string GetFileExtension(string filename)
        {
            return Path.GetExtension(filename);
        }
        /// <summary>
        /// 描述：返回文件是否存在
        /// 创建者：金广亮
        /// 创建时间：2011-9-20
        /// </summary>
        /// <param name="filename">文件名</param>
        /// <returns>如果存在返回true；否则返回false</returns>
        public static bool FileExists(string filename)
        {
            return File.Exists(GetMapPath(filename));
        }
        /// <summary>
        /// 描述：删除文件
        /// 创建者：金广亮
        /// 创建时间：2012-1-5
        /// </summary>
        /// <param name="fileName">文件名</param>
        /// <returns>如果删除成功返回true；否则返回false</returns>
        public static bool DeleteFile(string fileName)
        {
            string path=GetMapPath(fileName);
            bool bl = true;
            try
            {
                if (FileExists(GetMapPath(fileName)))
                {
                    File.Delete(path);
                }
            }
            catch (System.Exception _e)
            {
                throw _e;
            }
            return bl;
        }

        #region 文件操作
        public static bool DeleteFile(string[] filePaths)
        {
            bool result = true;
            foreach (string filePath in filePaths)
            {
                DeleteFile(filePath);
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
        public static bool SaveFile(HttpPostedFile httpPosteFile, string fileSavePath, string fileName)
        {
            Boolean _isSuccess = false;
            try
            {
                if (!Directory.Exists(fileSavePath))
                {
                    Directory.CreateDirectory(fileSavePath);
                }
                httpPosteFile.SaveAs(fileSavePath + fileName);
                _isSuccess = true;
                return _isSuccess;
            }
            catch(Exception _e)
            {
                throw _e;
            }

        }
        /// <summary>
        ///
        /// 文件复制
        /// </summary>
        /// <param name="oldPath"></param>
        /// <param name="newpath"></param>
        /// <returns></returns>
        public static bool CopyFile(string sourceFileName, string destFilePath)
        {
            try
            {
                File.Copy(sourceFileName, destFilePath);
                return true;
            }
            catch(Exception _e)
            {
                throw _e;
            }
        }
        /// <summary>
        /// 文件移动
        /// </summary>
        /// <param name="oldPath"></param>
        /// <param name="newpath"></param>
        /// <returns></returns>
        public static bool MoveFile(string sourceFileName, string destFilePath)
        {
            try
            {
                File.Move(sourceFileName, destFilePath);
                return true;
            }
            catch (Exception _e)
            {
                throw _e;
            }
        }
        #endregion

        #region 文件夹操作
        /// <summary>
        /// 描述：删除文件
        /// 创建者：xubing
        /// 创建时间：2012-8-1
        /// </summary>
        /// <param name="fileName">文件名</param>
        /// <returns>如果删除成功返回true；否则返回false</returns>
        public static bool DeleteDirectory(string directoryPath)
        {
            
            bool bl = true;
            try
            {
                if (Directory.Exists(directoryPath))
                {
                     Directory.Delete(directoryPath, true);
                }
            }
            catch (System.Exception _e)
            {
                throw _e;
            }
            return bl;
        }
        #endregion
    }
}
