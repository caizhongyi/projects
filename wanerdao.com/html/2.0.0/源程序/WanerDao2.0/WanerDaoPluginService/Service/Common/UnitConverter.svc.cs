using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using WanerDaoPluginService.IService.IPerson;
using WanerDao2.WanerDaoBLL.Person;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoModel.Person;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using WanerDao2.WanerDaoExceptionManager;
using WanerDaoPluginService.IService.ICommon;
using WanerDao2.WanerDaoIBLL.ITool;
using WanerDao2.WanerDaoBLL.Tool;
using WanerDao2.WanerDaoModule.TipInfo;
namespace WanerDaoPluginService.Service.Common
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "PersonalCalendar" in code, svc and config file together.
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class UnitConverter : IUnitConverter
    {
        private IWanerDaoUnit p_unit;
        public UnitConverter()
        {
            p_unit = new WanerDaoUnit();
        }
        [WebInvoke(UriTemplate = "/Unit/Category/Get", Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public string GetAllUnitCategories()
        {
            string languageId = CommonContext.GetClientLanguage();
            return p_unit.GetUnitCategories(languageId);
        }
        [WebInvoke(UriTemplate = "/Unit/Category/Get/{langType}", Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public string GetAllUnitCategoriesWithLang(string langType)
        {
            string languageId = CommonContext.GetLanguageId(langType);
            return p_unit.GetUnitCategories(languageId);
        }
        [WebInvoke(UriTemplate = "/Unit/Get/{categoryId}", Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public string GetUnitsByCategoryId(string categoryId)
        {
            string languageId = CommonContext.GetClientLanguage();
            return p_unit.GetUnits(categoryId, languageId);
        }
        [WebInvoke(UriTemplate = "/Unit/Get/{categoryId},{langType}", Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public string GetUnitsByCategoryIdWithLang(string categoryId, string langType)
        {
            string languageId = CommonContext.GetLanguageId(langType);
            return p_unit.GetUnits(categoryId, languageId);
        }
        [WebInvoke(UriTemplate = "/Unit/Convert/{unitCategoryId},{unitId}/{convValue}", Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public string ConvertUnit(string unitCategoryId, string unitId, string convValue)
        {
            string languageId = CommonContext.GetClientLanguage();
            double value = Convert.ToDouble(convValue);
            return p_unit.ConvertUnit(value, unitCategoryId, unitId, languageId);
        }
        [WebInvoke(UriTemplate = "/Unit/Convert/{unitCategoryId},{unitId},{langType}/{convValue}", Method = "GET", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public string ConvertUnitWithLang(string unitCategoryId, string unitId, string langType, string convValue)
        {
            string languageId = CommonContext.GetLanguageId(langType);
            double value = Convert.ToDouble(convValue);
            return p_unit.ConvertUnit(value, unitCategoryId, unitId, languageId);
        }
    }
}
