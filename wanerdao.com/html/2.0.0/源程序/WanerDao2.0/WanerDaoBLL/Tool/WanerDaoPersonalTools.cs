#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
*  个人设定工具信息业务逻辑实现
* 作者：徐蓓   时间：2012/5/30 20:48:10 
* 文件名：WanerDaoPersonalTools 
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
using WanerDao2.WanerDaoModel.Tool;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoIBLL.ICommon;
using WanerDao2.WanerDaoBLL.Common;
using WanerDao2.WanerDaoModule.Json;
using System.Data;

namespace WanerDao2.WanerDaoBLL.Tool
{
    public class WanerDaoPersonalTools : IWanerDaoPersonalTools
    {
        #region 接口IWanerDaoPersonalTools的实现
        public string SetupPerosnalTool(PersonalToolsModel model)
        {
            model.id = WanerDaoGuid.GetDefaultGuid();
            if (!HasSetupPersonalTool(model.user_id, model.tool_id))
            {
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("ToolSQL", "CreatePersonalTools", model);
                if (result >= 0)
                {
                    return Message(WanerDaoGlobalTip.GetInternationalizationTip("SetupToolSccessInfo"), MessageType.success);
                }
                else
                {
                    return Message(WanerDaoGlobalTip.GetInternationalizationTip("SetupToolFailInfo"), MessageType.error);
                }
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("ToolExistInfo"), MessageType.error);
            }
        }

        public string UnloadPersonalTool(string id)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("id", id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("ToolSQL", "CanclePersonalTools", param);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UnLoadToolSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UnLoadToolFailInfo"), MessageType.error);
            }
        }

        public string GetPersonalTools(string userId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", userId);
            return DbHelperFactory.SingleInstance().GetDataTable("ToolSQL", "GetPersonalToolsByUserId", param);
        }

        public string GetPersonalTool(string id)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("id", id);
            return DbHelperFactory.SingleInstance().GetDataTable("ToolSQL", "GetPersonalToolsById", param);
        }

        public string GetPersonalToolsByUserId(int pageCurrent, int pageSize, string userId) 
        {
            string where = "pt.active=true and pt.user_id='" + userId + "'";
            return GetPersonalTools(pageCurrent, pageSize, where);
        }

        public string GetPersonalTools(int pageCurrent, int pageSize, string where)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("tableName", "personaltools pt inner join toolpackage tp on (pt.tool_id=tp.id and tp.active=true) inner join toolcategory tc on (tp.category_id=tc.category_id and tc.active=true and tc.language_id='" + CommonContext.GetClientLanguage() + "')");
            param.Add("fldName", "pt.id,pt.tool_id,tp.url,tp.logo_location,tp.tool_name,pt.is_onbar");
            param.Add("where", string.Format(" and {0} ", where));
            param.Add("fldSortId", "pt.update_date");
            param.Add("sort", 1);
            param.Add("pageCurrent", pageCurrent);
            param.Add("pageSize", pageSize);
            string result = common.WanerDaoPagination(param);
            return result;
        }

        private bool HasSetupPersonalTool(string userId, string toolId)
        {
            bool result = false;
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", userId);
            param.Add("tool_id", toolId);
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("ToolSQL", "HasSetupPersonalTool", param);
            DataTable dt = ds.Tables["WanerDao2Ds"];
            int count = Convert.ToInt32(dt.Rows[0]["count"]);
            result = count > 0 ? true : false;
            return result;
        }
        #endregion
       
        #region 私有函数
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
        private string Message(Dictionary<string, object> prepareJson, string message, MessageType msgtype)
        {
            prepareJson.Add("msg", message);
            if (msgtype == MessageType.success)
            {
                return WanerDaoJSON.GetSuccessJson(prepareJson);
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

        private IWanerDaoCommon common;

        public WanerDaoPersonalTools()
        {
            common = new WanerdaoCommon();
        }

    }
}
