using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IPerson;
using System.ServiceModel;
using WanerDao2.WanerDaoModel.Person;

namespace WanerDaoPluginService.IService.ICommon
{


    [ServiceContract]
    public interface IUnitConverter
    {
        /// <summary>
        /// 根据分类获取单位
        /// </summary>
        /// <param name="categoryId">分类号</param>
        /// <returns></returns>
        [OperationContract]
        string GetUnitsByCategoryId(string categoryId);
        /// <summary>
        /// 根据分类和语言号获取单位
        /// </summary>
        /// <param name="categoryId">分类号</param>
        /// <param name="langType">语言类型</param>
        /// <returns></returns>
        [OperationContract]
        string GetUnitsByCategoryIdWithLang(string categoryId, string langType);
        /// <summary>
        /// 获取所有单位的分类
        /// </summary>
        /// <returns></returns>
        [OperationContract]
        string GetAllUnitCategories();
        /// <summary>
        /// 根据语言号获取所有单位的分类
        /// </summary>
        /// <param name="langType">语言类型</param>
        /// <returns></returns>
        [OperationContract]
        string GetAllUnitCategoriesWithLang(string langType);
        /// <summary>
        /// 单位转换
        /// </summary>
        /// <param name="unitCategoryId">单位分类</param>
        /// <param name="unitId">单位标识</param>
        /// <param name="convValue">转换值</param>
        /// <returns></returns>
        [OperationContract]
        string ConvertUnit(string unitCategoryId, string unitId, string convValue);
        /// <summary>
        /// 单位转换
        /// </summary>
        /// <param name="unitCategoryId">单位分类</param>
        /// <param name="unitId">单位标识</param>
        /// <param name="langType">语言类型</param>
        /// <param name="convValue">转换值</param>
        /// <returns></returns>
        [OperationContract]
        string ConvertUnitWithLang(string unitCategoryId, string unitId, string langType, string convValue);
    }
}
