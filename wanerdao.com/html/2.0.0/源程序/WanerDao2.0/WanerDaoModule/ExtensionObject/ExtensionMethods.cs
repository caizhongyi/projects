#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 扩展框架对象的方法
* 作者：徐兵   时间：2012-01-03 13:30:37 
* 文件名：ExtensionMethods 
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

namespace WanerDao2.WanerDaoModule.ExtensionObject
{
    public static class ExtensionMethods
    {
        /// <summary>
        /// 扩展Dictionary Add方法
        /// </summary>
        /// <typeparam name="Tkey"></typeparam>
        /// <typeparam name="TValue"></typeparam>
        /// <param name="Dic"></param>
        /// <param name="keyValue"></param>
        public static void Add<Tkey, TValue>(this Dictionary<Tkey, TValue> Dic,KeyValuePair<Tkey, TValue> keyValue)
        {
            try
            {
                Dic.Add(keyValue.Key, keyValue.Value);
            }
            catch { }
        }

    }
}
