#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-13 21:14:58 
* 文件名：KeyBase 
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

namespace WanerDao2.WanerDaoModel.SqlKey
{
    public class SqlKeyBase
    {
        /// <summary>
        /// 查询所有信息
        /// </summary>
        public const string SelectAll = "SelectAll";
        /// <summary>
        /// 根据ID查询信息
        /// </summary>
        public const string SelectByID = "SelectByID";
        /// <summary>
        /// 根据id修改信息
        /// </summary>
        public const string UpdateAllByID = "UpdateAllByID";
        /// <summary>
        /// 插入
        /// </summary>
        public const string Insert = "Insert";
        /// <summary>
        /// 根据ID删除信息
        /// </summary>
        public const string DeleteByID = "DeleteByID";
    }
}
