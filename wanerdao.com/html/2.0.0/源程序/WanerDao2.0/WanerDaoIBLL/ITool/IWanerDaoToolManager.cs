#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 应用工具管理接口
* 作者：吴志斌   时间：2011/11/13 21:37:54 
* 文件名：IWanerDaoToolManager 
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
    public interface IWanerDaoToolManager
    {
        #region 应用工具信息
        /// <summary>
        /// 添加应用工具
        /// </summary>
        /// <param name="dic">应用工具模型</param>
        /// <returns></returns>
        string AddToolPackage(Dictionary<string, object> dic);

        /// <summary>
        /// 更新应用工具
        /// </summary>
        /// <param name="dic">应用工具模型</param>
        /// <returns></returns>
        string UpdateToolPackage(Dictionary<string, object> dic);

        /// <summary>
        /// 删除应用工具
        /// </summary>
        /// <param name="dic">应用工具id</param>
        /// <returns></returns>
        string DeleteToolPackage(Dictionary<string, object> dic);

        /// <summary>
        /// 查询所有的应用工具
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string SelectAllToolPackages(Dictionary<string, object> dic);

        /// <summary>
        /// 查询可用的应用工具
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string SelectValidateToolPackages(Dictionary<string, object> dic);

        /// <summary>
        /// 根据应用工具分类Id查询可用的应用工具
        /// </summary>
        /// <param name="dic">应用工具分类Id</param>
        /// <returns></returns>
        string SelectToolPackagesByCategoryId(Dictionary<string, object> dic);

        /// <summary>
        /// 根据应用工具Id查询应用工具
        /// </summary>
        /// <param name="dic">应用工具Id</param>
        /// <returns></returns>
        string SelectToolPackageById(Dictionary<string, object> dic);

        /// <summary>
        /// 根据开发者Id查询应用工具
        /// </summary>
        /// <param name="dic">开发者Id</param>
        /// <returns></returns>
        string SelectToolPackagesByDeveloperId(Dictionary<string, object> dic);

        ///// <summary>
        ///// 获取工具信息（带分页）
        ///// </summary>
        ///// <param name="pageCurrent">当前页</param>
        ///// <param name="pageSize">每页条数</param>
        ///// <param name="where">条件</param>
        ///// <returns></returns>
        //string GetTools(int pageCurrent, int pageSize, string where);

        /// <summary>
        /// 通过分类获取工具分页信息，不会获取指定用户已安装的工具
        /// </summary>
        /// <param name="pageCurrent">当前页数</param>
        /// <param name="pageSize">每页条数</param>
        /// <param name="toolCate">工具分类</param>
        /// <param name="userId">用户编号</param>
        /// <returns></returns>
        string GetToolsByCate(int pageCurrent, int pageSize, string toolCate, string userId);

        /// <summary>
        /// 获取工具信息（带分页）
        /// </summary>
        /// <param name="pageCurrent">当前页</param>
        /// <param name="pageSize">每页条数</param>
        /// <returns></returns>
        string GetTools(int pageCurrent, int pageSize);

        /// <summary>
        /// 获取工具分类分页信息
        /// </summary>
        /// <param name="pageCurrent">当前页数</param>
        /// <param name="pageSize">每页条数</param>
        /// <returns></returns>
        string GetToolCategory(int pageCurrent, int pageSize);
        #endregion

        #region 应用工具分类信息
        /// <summary>
        /// 添加应用工具分类
        /// </summary>
        /// <param name="dic">应用工具分类模型</param>
        /// <returns></returns>
        string AddToolCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 更新应用工具分类
        /// </summary>
        /// <param name="dic">应用工具分类模型</param>
        /// <returns></returns>
        string UpdateToolCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 删除应用工具分类
        /// </summary>
        /// <param name="dic">应用工具分类id</param>
        /// <returns></returns>
        string DeleteToolCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 查询所有的应用工具分类
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string SelectAllToolCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 查询可用的应用工具分类
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string SelectValidateToolCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 根据父类编号查询可用的应用工具分类
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string SelectToolCategoryByParentId(Dictionary<string, object> dic);
        #endregion
    }
}
