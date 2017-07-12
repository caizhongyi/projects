#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-16 14:58:02 
* 文件名：IIOCProvider 
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

namespace WanerDao2.WanerDaoModule.IOC
{
    public interface IIOCProvider
    {
        T GetObject<T>(string serviceName);
        T GetObject<T>();
    }
}
