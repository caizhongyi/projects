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
namespace WanerDaoPluginService.Service.Person
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "PersonalCalendar" in code, svc and config file together.
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class PersonalCalendar : IPersonalCalendar
    {
        private IWanerDaoPersonalCalendar p_pc;
        public PersonalCalendar()
        {
            p_pc = new WanerDaoPersonalCalendar();
        }
        [WebInvoke(UriTemplate = "/PersonalCalendar/Add", Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public string CreatePersonalCalendar(PersonalCalendarModal modal)
        {
            return p_pc.CreatePersonalCalendar(modal);
        }
        [WebInvoke(UriTemplate = "/SimplePersonalCalendar/Add", Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public string CreateSimplePersonalCalendar(PersonalCalendarModal modal)
        {
            return p_pc.CreateSimplePersonalCalendar(modal);
        }
        [WebInvoke(UriTemplate = "/PersonalCalendar/Mod", Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public string UpdatePersonalCalendar(PersonalCalendarModal modal)
        {
            return p_pc.UpdatePersonalCalendar(modal);
        }
        [WebInvoke(UriTemplate = "/SimplePersonalCalendar/Mod", Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public string UpdateSimplePersonalCalendar(PersonalCalendarModal modal)
        {
            return p_pc.UpdateSimplePersonalCalendar(modal);
        }
        [WebInvoke(UriTemplate = "/PersonalCalendar/Del", Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public string DeletePersonalCalendar(string id)
        {
            return p_pc.DeletePersonalCalendar(id);
        }
        [WebGet(UriTemplate = "/PersonalCalendar/Get/userId={userId}", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public string GetPersonalCalendarByUserId(string userId)
        {
            return p_pc.GetPersonalCalendarByUserId(userId);
        }
        [WebGet(UriTemplate = "/PersonalCalendarAgenda/Get/userId={userId}", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public string GetPersonalCalendarAgenda(string userId)
        {
            return p_pc.GetPersonalCalendarAgenda(userId);
        }
    }
}
