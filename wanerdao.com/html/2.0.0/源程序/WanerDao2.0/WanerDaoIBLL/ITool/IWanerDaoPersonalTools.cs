#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
*  个人设定工具信息业务逻辑接口
* 作者：徐蓓   时间：2012/5/29 21:48:10 
* 文件名：IWanerDaoPersonalTools 
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
    public interface IWanerDaoPersonalTools
    {
        /// <summary>
        /// 安装个人工具
        /// </summary>
        /// <param name="model">个人设定工具信息实体。必须填充user_id,tool_id,可选sequence,is_onbar</param>
        /// <returns></returns>
        string SetupPerosnalTool(PersonalToolsModel model);

        /// <summary>
        /// 卸载个人工具
        /// </summary>
        /// <param name="id">个人设定工具信息主键</param>
        /// <returns></returns>
        string UnloadPersonalTool(string id);

        /// <summary>
        /// 通过主键获取个人设定工具信息
        /// </summary>
        /// <param name="id">个人设定工具信息主键</param>
        /// <returns></returns>
        string GetPersonalTool(string id);

        /// <summary>
        /// 获取指定用户所安装的应用信息（带分页）
        /// </summary>
        /// <param name="pageCurrent">当前页</param>
        /// <param name="pageSize">每页条数</param>
        /// <param name="userId">用户主键</param>
        /// <returns></returns>
        string GetPersonalToolsByUserId(int pageCurrent, int pageSize, string userId);

        /// <summary>
        /// 获取指定用户的个人设定工具信息
        /// </summary>
        /// <param name="userId">用户主键</param>
        /// <returns>暂时先返回全部字段</returns>
        string GetPersonalTools(string userId);

        /// <summary>
        /// 获取个人指定工具信息（带分页）
        /// </summary>
        /// <param name="pageCurrent">当前页</param>
        /// <param name="pageSize">每页条数</param>
        /// <param name="where">条件</param>
        /// <returns></returns>
        string GetPersonalTools(int pageCurrent, int pageSize, string where);
    }
}
