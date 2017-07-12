#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 查找用户相关信息接口
* 作者：杨晓东   时间：2011/10/1 23:10:58 
* 文件名：IWanerDaoPersonFind 
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

namespace WanerDao2.WanerDaoIBLL.IPerson
{
    public interface IWanerDaoPersonFind
    {
        #region 搜索用户
        /// <summary>
        /// 查询用户信息（查询结果页）
        /// </summary>
        /// <param name="dic">字典（一个条件）</param>
        /// <returns></returns>
        String SearchPerson(Dictionary<string, object> dic); 
        #endregion
    }
}
