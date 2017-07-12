#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-04-30 15:05:29 
* 文件名：GetActivityTypeTableDataName 
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
using WanerDao2.WanerDaoModel.Common;

namespace WanerDao2.WanerDaoModel.Activity
{
    public class GetActivityConfigTableDataName
    {
        private static string ConfigFileName = "ActivitySQL";
        public static string GetName(string pri_key)
        {
            return GetTableDataName.GetName(pri_key,ConfigFileName);
        }
    }
}
