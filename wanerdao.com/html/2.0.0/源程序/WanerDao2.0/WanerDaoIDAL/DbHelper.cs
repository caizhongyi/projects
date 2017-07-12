using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using WanerDao2.WanerDaoModule.Config;
using WanerDao2.WanerDaoExceptionManager;

namespace WanerDao2.WanDaoIDAL
{
    public class DbHelper
    {
        private static readonly string DbHelperAssmely = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "DbProviderAssemblyInfo");
        private static readonly string DbHelperClass = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "DbProviderClass");

//#if (DEBUG)
        private static IDbHelper helper;
        private static object locker = new Object();
//#endif

        public static IDbHelper GetHelper()
        {
            //// 写入调试信息
            //#if (DEBUG)
                //这是每次都会已经获取过的数据库连接
                if (helper == null)
                {
                    lock (locker)
                    {
                        if (helper == null)
                        {
                            try
                            {
                                helper = (IDbHelper)Assembly.Load(DbHelperAssmely).CreateInstance(DbHelperClass, true);
                            }
                            catch (System.Exception ex)
                            {
                                WanerDaoLog4Net.Write("数据库访问层创建实例失败", WanerDaoLog4Net.LogMessageType.Error, ex);
                            }
                            
                        }
                    }
                }
                return helper;
            //#else
            //    // 这里是每次都获取新的数据库连接
            //    IDbHelper dbHelper = (IDbHelper)Assembly.Load(DbHelperAssmely).CreateInstance(DbHelperClass, true);
            //    // dbHelper.ConnectionString = DbHelper.ConnectionString;
            //    return dbHelper;
            //#endif
        }
    }
}
