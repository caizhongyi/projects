#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 应用工具管理
* 作者：吴志斌   时间：2011/11/13 22:37:54 
* 文件名：WanerDaoToolManager 
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
using WanerDao2.WanerDaoIBLL.ITool;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoIBLL.ICommon;
using WanerDao2.WanerDaoBLL.Common;
using WanerDao2.WanerDaoModule.TipInfo;

namespace WanerDao2.WanerDaoBLL.Tool
{
    public class WanerDaoToolManager : IWanerDaoToolManager
    {
        private IWanerDaoCommon common;
        #region 构造方法
        public WanerDaoToolManager()
        {
            common = new WanerdaoCommon();
        }
        #endregion

        #region 应用工具信息
        /// <summary>
        /// 添加应用工具
        /// </summary>
        /// <param name="dic">应用工具模型</param>
        /// <returns></returns>
        public string AddToolPackage(Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("ToolSQL", "InsertToolPackage", dic);
            if (result > 0)
            {
                return Message("添加成功", MessageType.success);
            }
            else
            {
                return Message("添加失败", MessageType.error);
            }
        }

        /// <summary>
        /// 修改应用工具
        /// </summary>
        /// <param name="dic">应用工具模型</param>
        /// <returns></returns>
        public string UpdateToolPackage(Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("ToolSQL", "UpdateToolPackage", dic);
            if (result > 0)
            {
                return Message("修改成功", MessageType.success);
            }
            else
            {
                return Message("修改失败", MessageType.error);
            }
        }

        /// <summary>
        /// 删除应用工具
        /// </summary>
        /// <param name="dic">应用工具id</param>
        /// <returns></returns>
        public string DeleteToolPackage(Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("ToolSQL", "DeleteToolPackage", dic);
            if (result > 0)
            {
                return Message("删除成功", MessageType.success);
            }
            else
            {
                return Message("删除失败", MessageType.error);
            }
        }

        /// <summary>
        /// 查询所有的应用工具
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string SelectAllToolPackages(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("ToolSQL", "SelectAllToolPackage", dic);
        }

        /// <summary>
        /// 查询可用的应用工具
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string SelectValidateToolPackages(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("ToolSQL", "SelectValidateToolPackage", dic);
        }

        /// <summary>
        /// 根据应用工具分类编号查询可用的应用工具
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string SelectToolPackagesByCategoryId(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("ToolSQL", "SelectToolPackageByCategoryId", dic);
        }

        /// <summary>
        /// 根据应用工具Id查询应用工具
        /// </summary>
        /// <param name="dic">应用工具Id</param>
        /// <returns></returns>
        public string SelectToolPackageById(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("ToolSQL", "SelectToolPackageById", dic);
        }

        /// <summary>
        /// 根据开发者Id查询应用工具
        /// </summary>
        /// <param name="dic">开发者Id</param>
        /// <returns></returns>
        public string SelectToolPackagesByDeveloperId(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("ToolSQL", "SelectToolPackageByDevelperId", dic);
        }
        #endregion

        #region 应用工具分类信息
        /// <summary>
        /// 添加应用工具分类
        /// </summary>
        /// <param name="dic">应用工具分类模型</param>
        /// <returns></returns>
        public string AddToolCategory(Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("ToolSQL", "InsertToolCategory", dic);
            if (result >= 0)
            {
                return Message("添加成功", MessageType.success);
            }
            else
            {
                return Message("添加失败", MessageType.error);
            }
        }

        /// <summary>
        /// 修改应用工具分类
        /// </summary>
        /// <param name="dic">应用工具分类模型</param>
        /// <returns></returns>
        public string UpdateToolCategory(Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("ToolSQL", "UpdateToolCategory", dic);
            if (result > 0)
            {
                return Message("修改成功", MessageType.success);
            }
            else
            {
                return Message("修改失败", MessageType.error);
            }
        }

        /// <summary>
        /// 删除应用工具分类
        /// </summary>
        /// <param name="dic">应用工具分类id</param>
        /// <returns></returns>
        public string DeleteToolCategory(Dictionary<string, object> dic)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("ToolSQL", "DeleteToolCategory", dic);
            if (result > 0)
            {
                return Message("删除成功", MessageType.success);
            }
            else
            {
                return Message("删除失败", MessageType.error);
            }
        }

        /// <summary>
        /// 查询所有的应用工具分类
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string SelectAllToolCategory(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("ToolSQL", "SelectAllToolCategory", dic);
        }

        /// <summary>
        /// 查询可用的应用工具分类
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string SelectValidateToolCategory(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("ToolSQL", "SelectValidateToolCategory", dic);
        }

        /// <summary>
        /// 根据父类编号查询可用的应用工具分类
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string SelectToolCategoryByParentId(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("ToolSQL", "SelectToolCategoryByParentId", dic);
        }
        #endregion

        #region 私有成员
        private string Message(string message, MessageType msgtype)
        {
            if (msgtype == MessageType.success)
            {
                return WanerDaoJSON.GetSuccessJson(message);
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(message);
            }
        }

        enum MessageType
        {
            success,
            error
        }

        #endregion

        #region 应用工具信息（徐蓓新添加）
        private string GetTools(int pageCurrent, int pageSize, string where)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("tableName", "toolpackage tp inner join toolcategory tc on (tp.category_id=tc.category_id and tc.active=true and tc.language_id='" + CommonContext.GetClientLanguage() + "')");
            param.Add("fldName", "tp.id,tp.url,tp.logo_location,tp.tool_name");//暂时先返回所有字段
            if (!string.IsNullOrEmpty(where))
            {
                param.Add("where", string.Format(" and {0} ", where));
            }
            else
            {
                param.Add("where", string.Empty);
            }
            param.Add("fldSortId", "tp.update_time");
            param.Add("sort", 1);
            param.Add("pageCurrent", pageCurrent);
            param.Add("pageSize", pageSize);
            string result = common.WanerDaoPagination(param);
            return result;
        }
        private string GetToolCategory(int pageCurrent, int pageSize, string where)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("tableName", "toolcategory tc");
            param.Add("fldName", "tc.category_id,tc.category_name,tc.description");
            if (!string.IsNullOrEmpty(where))
            {
                param.Add("where", string.Format(" and {0} ", where));
            }
            else
            {
                param.Add("where", string.Empty);
            }
            param.Add("fldSortId", "tc.update_date");
            param.Add("sort", 1);
            param.Add("pageCurrent", pageCurrent);
            param.Add("pageSize", pageSize);
            string result = common.WanerDaoPagination(param);
            return result;
        }

        public string GetTools(int pageCurrent, int pageSize)
        {
            string where = "tp.active=true";
            return GetTools(pageCurrent, pageSize, where);
        }

        public string GetToolsByCate(int pageCurrent, int pageSize, string toolCate,string userId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            string toolSql = "select * from toolpackage tp where tp.id not in ( select pt.tool_id from personaltools pt inner join toolpackage tp1 on (tp1.id = pt.tool_id) where pt.user_id = '" + userId + "' and pt.active = true ) and tp.active=true";
            param.Add("tableName", "(" + toolSql + ") tp inner join toolcategory tc on (tp.category_id=tc.category_id and tc.category_id='" + toolCate + "' and tc.active=true and tc.language_id='" + CommonContext.GetClientLanguage() + "')");
            param.Add("fldName", "tp.id,tp.url,tp.logo_location,tp.tool_name");
            param.Add("where", string.Empty);
            param.Add("fldSortId", "tp.update_time");
            param.Add("sort", 1);
            param.Add("pageCurrent", pageCurrent);
            param.Add("pageSize", pageSize);
            return common.WanerDaoPagination(param);
        }

        public string GetToolCategory(int pageCurrent, int pageSize)
        {
            string where = string.Format("tc.language_id='{0}' and tc.active=true", CommonContext.GetClientLanguage());
            return GetToolCategory(pageCurrent, pageSize, where);
        }
        #endregion
    }
}
