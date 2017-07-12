#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/4/4 18:44:09 
* 文件名：AssemblyClass 
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
using System.Reflection;

namespace WanerDaoPollingService
{
    public class AssemblyClass
    {
        private static AssemblyClass instance;
        private static readonly object syncRoot = new object();

        private AssemblyClass()
        {

        }

        /// <summary>
        /// 获取该类的实例
        /// </summary>
        /// <returns></returns>
        public static AssemblyClass GetInstance()
        {
            if (instance == null)
            {
                lock (syncRoot)
                {
                    if (instance == null)
                    {
                        instance = new AssemblyClass();
                    }
                }
            }
            return instance;
        }

        /// <summary>
        /// 反射获取类的实例
        /// </summary>
        /// <param name="assemblyName">完整的程序集名称</param>
        /// <param name="classFullName">完整的类名称</param>
        /// <returns></returns>
        public object GetClassInstance(string assemblyName, string classFullName)
        {
            try
            {
                object obj = Assembly.Load(assemblyName).CreateInstance(classFullName,
                    true, BindingFlags.Public | BindingFlags.Instance, null, null, null, null);
                return obj;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
