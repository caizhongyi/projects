#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
*  转换器业务逻辑（实现接口IWanerDaoUnit）
* 作者：徐蓓   时间：2012/5/30 20:48:10 
* 文件名：WanerDaoUnit 
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
using System.Data;
using WanerDao2.WanerDaoModel.Tool;
using WanerDao2.WanerDaoModule.Utils;
using System.Collections;
using System.Globalization;

namespace WanerDao2.WanerDaoBLL.Tool
{
    public class WanerDaoUnit : IWanerDaoUnit
    {
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

        #region 接口IWanerDaoUnit实现
        public string GetUnits(string categoryId, string languageId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("category_id", categoryId);
            param.Add("language_id", languageId);
            string result = DbHelperFactory.SingleInstance().GetDataTable("ToolSQL", "GetUnitByCategoryId", param);
            return result;
        }

        public string GetUnitCategories(string languageId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("language_id", languageId);
            string result = DbHelperFactory.SingleInstance().GetDataTable("ToolSQL", "GetAllUnitCategory", param);
            return result;
        }

        public string ConvertUnit(double convValue, string categoryId, string unitId, string languageId)
        {
            string standardValue = string.Empty;
            IList<UnitConvResultModel> unitTempList = GetUnitTempConvAndConvValue(categoryId, unitId, languageId, out standardValue);
            IList<UnitConvResultModel> unitResultList = new List<UnitConvResultModel>();
            UnitConvResultModel result = null;
            NumberFormatInfo provider = new NumberFormatInfo();
            foreach (UnitConvResultModel model in unitTempList)
            {
                result = new UnitConvResultModel() { unit_name = model.unit_name, value = (convValue * (Convert.ToDouble(model.value)) / Convert.ToDouble(standardValue)).ToString("f15") };//保留15位小数，四舍五入
                unitResultList.Add(result);
            }
            return WanerDaoJSON.SerializeObject(unitResultList);
        }

        private IList<UnitConvResultModel> GetUnitTempConvAndConvValue(string categoryId, string unitId, string languageId, out string standardValue)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("category_id", categoryId);
            param.Add("language_id", languageId);
            param.Add("id", unitId);
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("ToolSQL", "GetUnitResultTempListAndConvStartardValue", param);
            IList<UnitConvResultModel> unitListTemp = WanerDaoUtils.ConvertDataTableToModel<UnitConvResultModel>(ds.Tables["WanerDao2Ds"]);
            standardValue = ds.Tables["WanerDao2Ds1"].Rows[0]["value"].ToString();
            return unitListTemp;
        }
        #endregion
    }
}
