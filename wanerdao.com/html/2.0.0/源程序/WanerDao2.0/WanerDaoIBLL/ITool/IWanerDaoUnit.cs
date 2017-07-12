#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
*  转换器业务逻辑接口
* 作者：徐蓓   时间：2012/6/25 21:48:10 
* 文件名：IWanerDaoUnit 
* 版本：V1.0.0
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
using WanerDao2.WanerDaoModel.Tool;

namespace WanerDao2.WanerDaoIBLL.ITool
{
    public interface IWanerDaoUnit
    {
        /// <summary>
        /// 通过单位分类获取单位
        /// </summary>
        /// <param name="categoryId">单位分类主键</param>
        /// <param name="convValue">语言号</param>
        /// <returns></returns>
        string GetUnits(string categoryId,string languageId);

        /// <summary>
        /// 获取所有单位分类
        /// </summary>
        /// <param name="convValue">语言号</param>
        /// <returns></returns>
        string GetUnitCategories(string languageId);

        /// <summary>
        /// 单位转换
        /// </summary>
        /// <param name="convValue">转换值</param>
        /// <param name="categoryId">所属分类</param>
        /// <param name="unitId">所属单位</param>
        /// <param name="languageId">语言编号</param>
        /// <returns></returns>
        string ConvertUnit(double convValue, string categoryId, string unitId, string languageId);
    }
}
