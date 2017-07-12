using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WanerDao2.WanerDaoModule.WanerDaoGuid
{
    /// <summary>
    /// 描述：创建GUID
    /// 创建作者：金广亮
    /// 创建时间：2011-9-19
    /// </summary>
    public class WanerDaoGuid
    {
        /// <summary>
        /// 描述：创建无分隔符的GUID
        /// 创建作者：金广亮
        /// 创建时间：2011-9-19
        /// </summary>
        /// <returns>无分隔符GUID</returns>
        public static string GetGuid()
        {
            return Guid.NewGuid().ToString().Replace("-", "");
        }


        /// <summary>
        /// 描述：创建指定分隔符的GUID
        /// 创建作者：金广亮
        /// 创建时间：2011-9-19 
        /// </summary>
        /// <param name="split">指定分隔符</param>
        /// <returns>指定分隔符的GUID</returns>
        public static string GetGuid(string split)
        {
            return Guid.NewGuid().ToString().Replace("-", split);
        }

        /// <summary>
        /// 描述：创建默认带有-分隔符的GUID
        /// 创建作者：金广亮
        /// 创建时间：2011-9-19
        /// </summary>
        /// <returns>默认带有-分隔符的GUID</returns>
        public static string GetDefaultGuid()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
