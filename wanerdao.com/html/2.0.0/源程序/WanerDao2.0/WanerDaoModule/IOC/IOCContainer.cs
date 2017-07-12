#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-16 14:33:04 
* 文件名：IOCContainer 
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
using WanerDao2.WanerDaoModule.IOC.Provider;

namespace WanerDao2.WanerDaoModule.IOC
{
    public class IOCContainer
    {
        public static T GetObject<T>(string serviceName)
        {
            return ioc.GetObject<T>(serviceName);
        }
        public static T GetObject<T>()
        {
            return ioc.GetObject<T>();
        }

        private static readonly IIOCProvider ioc=null;
        static IOCContainer()
        {
            ioc = new CastleIOC();
        }
    }
}
