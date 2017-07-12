using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

#region 【本类功能概述】
/* ======================================================================== *  
* 功能说明：
* 分页参数类
* 作者：金广亮
* 时间：2012-5-16 23:26:33 
* 文件名：PaginationModel 
* 版本：V0.0.1
* 
* 修改者： 
* 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion
namespace WanerDao2.WanerDaoModel
{
    public class PaginationModel
    {        
        /// <summary>
        /// 表名
        /// </summary>
        public string tablename { get; set; }
        /// <summary>
        /// 查询字段，如果是多个字段请用英文的“,”分隔
        /// </summary>
        public string fldName { get; set; }
        /// <summary>
        /// WHERE条件(不用传入WHERE关键字,可为空)
        /// </summary>
        public string where { get; set; }
        /// <summary>
        /// 排序条件(不用传入ORDER BY关键字,可为空)
        /// </summary>
        public string fldSortId { get; set; }
        /// <summary>
        /// 1升序 0倒序;
        /// </summary>
        public string sort { get; set; }
        /// <summary>
        /// 当前页码
        /// </summary>
        public string pagecurrent { get; set; }
        /// <summary>
        /// 每页记录数
        /// </summary>
        public string pageSize { get; set; }
    }
}
