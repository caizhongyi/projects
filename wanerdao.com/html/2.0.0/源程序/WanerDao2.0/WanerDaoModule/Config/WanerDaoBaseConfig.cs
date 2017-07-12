using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;

namespace WanerDao2.WanerDaoModule.Config
{
    /// <summary>
    /// 描述：配置读取配置路径
    /// 创建者：金广亮
    /// 创建时间：2011-9-20
    /// </summary>
    public class WanerDaoBaseConfig
    {
        static WanerDaoBaseConfig()
        {

        }
        /// <summary>
        /// 描述：bin执行路径
        /// 创建者：金广亮
        /// 创建时间：2011-9-20
        /// </summary>
        private static string cfg_executionDir = "";

        /// <summary>
        /// 描述：工作目录
        /// 创建者金广亮
        /// 创建时间：2011-9-20
        /// </summary>
        private static string cfg_workingDir = "";


        /// <summary>		
        /// Gets the execution directory path from AppDomain.CurrentDomain.BaseDirectory
        /// (1)	If current application is a web application, executiondir will be BaseDirectory + \bin
        /// (2)	Else, executiondir will be BaseDirectory.
        /// </summary>
        public static string ExecutionDir
        {
            get
            {
                if (cfg_executionDir == "")
                {
                    cfg_executionDir = AppDomain.CurrentDomain.BaseDirectory;
                    if (cfg_executionDir.IndexOf("/") >= 0)
                    {
                        if (cfg_executionDir.IndexOf("http:/") < 0) //lgq 16/03/2005 this is the smart client case. it will not need to add bin. and odn't need to replace /
                        {
                            cfg_executionDir = cfg_executionDir.Replace("/", "\\");
                            cfg_executionDir += "bin\\";
                        }
                    }
                }

                return cfg_executionDir;
            }
        }

        /// <summary>		
        /// Gets the working directory path from AppSettings. Returns the absolute working directory path.
        /// </summary>
        /// <exception>
        /// (1)	Exception if appsetting does not have workingDir definition
        /// (2)	Function GetAbsoluteWorkingDir() may throw exception
        /// </exception>
        public static string WorkingDir
        {
            get
            {
                if (cfg_workingDir == "")
                {
                    //cfg_workingDir = ConfigurationSettings.AppSettings["WorkingDir"];
                    cfg_workingDir = ConfigurationManager.AppSettings["WorkingDir"];
                    if ((cfg_workingDir == null) || (cfg_workingDir == ""))
                        throw new ApplicationException("App.config or web.config not found, or No working directory specified in app.config or web.config");
                    try	//kml 16082004
                    {
                        cfg_workingDir = GetAbsoluteWorkingDir(cfg_workingDir);
                    }
                    catch (Exception ex)
                    {
                        throw new ApplicationException("cfg_workingDir error: Unable to get absolute working directory", ex);
                    }
                }

                return cfg_workingDir;
            }
        }

        /// <summary>
        /// Get absolute path of the working direcotory..
        /// It calls BaseSysFunc.GetAbsolutePath method with parameters "workingdir" and 
        /// BaseCmConfig.ExecutionDir as path.
        /// </summary>
        /// <param name="workingdir">Working directory. It could be absolute, relative or semi absolute</param>
        /// <returns>Returns combined full path name</returns>
        /// <exception>
        /// (1)	If input param 'workingdir' is null or "", throw ApplicationException
        /// (2)	Exception from function BaseSysFunc.GetAbsolutePath()
        /// </exception>
        private static string GetAbsoluteWorkingDir(string workingdir)
        {
            if (workingdir == null || workingdir.Trim() == "")
                throw new ApplicationException("WanerDaoBaseConfig: Working Directory is null or has no value");

            string absPath = "";
            try
            {
                absPath = GetAbsolutePath(workingdir, WanerDaoBaseConfig.ExecutionDir);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Unable to get absolute working directory", ex);
            }
            return absPath;
        }
        /// <summary>
        /// Get absolute path of a defined directory from a base path. 
        /// Defined directory could be absolute or relative path.
        /// This function is used by GetAbsolutePath overload method and GetAbsoluteWorkingDir method.
        /// </summary>
        /// <param name="definedDir">Defined directory</param>
        /// <param name="path">Base working directory. Absolute path</param>
        /// <returns>Returns absolute path</returns>
        /// <exception>
        /// (1)	If parameter 'definedDir' is invalid (i.e. starts with "/"), throw ApplicationException
        /// (2)	If path is invalid (e.g. less than min length), throw ApplicationException.
        /// (3) If path contain invalid slash, throw ApplicationException.
        /// (4)	If path not found, throw ApplicationException.
        /// </exception>
        private static string GetAbsolutePath(string definedDir, string path)
        {
            string absPath = "";
            string validSlash = "", invalidSlash = "";
            int minLength;

            if (path.StartsWith("http://") || path.StartsWith("https://"))
            {
                if (definedDir.StartsWith("http://") || definedDir.StartsWith("https://"))
                    absPath = definedDir;
                else
                {
                    if (definedDir.StartsWith("/"))
                        throw new ApplicationException("WanerDaoBaseConfig: Invalid Config Path: " + definedDir);

                    if (!path.EndsWith("/"))
                        absPath = path + "/" + definedDir;
                    else
                        absPath = path + definedDir;
                }
                invalidSlash = "\\";
                validSlash = "/";
                if (definedDir.StartsWith("https://"))
                    minLength = 9;
                else
                    minLength = 8;
            }
            else
            {
                if (definedDir.StartsWith("\\") && path.Substring(path.Length - 1) == "\\")
                    definedDir = definedDir.Substring(1);
                absPath = System.IO.Path.Combine(path, definedDir);

                invalidSlash = "/";
                validSlash = "\\";
                minLength = 3;
            }

            if (absPath.Length < minLength)
                throw new ApplicationException("WanerDaoBaseConfig: Invalid Path: " + absPath);

            if (absPath.IndexOf(invalidSlash) >= 0)
                throw new ApplicationException("WanerDaoBaseConfig: Path contain invalid slash: " + absPath);

            if (!absPath.EndsWith(validSlash))
                absPath += validSlash;
            return absPath;
        }
    }
}
