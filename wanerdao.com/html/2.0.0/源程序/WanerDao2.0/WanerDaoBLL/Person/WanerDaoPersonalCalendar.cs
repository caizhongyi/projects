using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoCacheManager;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoExceptionManager;

namespace WanerDao2.WanerDaoBLL.Person
{
    /// <summary>
    /// 描述：个人日历接口实现
    /// 创建者：徐蓓
    /// 创建时间：2011-11-18 20:33:33
    /// 修改者：
    /// 修改时间：
    /// 修改原因：
    /// </summary>
    public class WanerDaoPersonalCalendar : IWanerDaoPersonalCalendar
    {
        #region 私有变量
        private readonly string c_cacheKey = "PersonalCalendar_";
        private ICacheStrategy p_cache;
        #endregion

        #region 构造函数
        public WanerDaoPersonalCalendar()
        {
            p_cache = WanerDaoCacheManager.WanerDaoCacheFactory.SingleInstance().GetStrategy(0);
        }
        #endregion

        #region IWanerDaoPersonalCalendar接口实现
        public string GetPersonalCalendarAgenda(string userId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", userId);
            string result = string.Empty;
            //string key = c_cacheKey + param["user_id"];
            //object cache = p_cache.RetrieveObject(key);
            //string result = string.Empty;
            //if (cache != null)
            //{
            //    result = (String)cache;
            //}
            //else
            //{
            //    result = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "GetPersonalCalendarByUserId", param);
            //    if (!string.IsNullOrEmpty(result))
            //    {
            //        p_cache.AddObject(key, result, 1200);
            //    }
            //}
            result = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "GetPersonalCalendarAgenda", param);
            return result;
        
        }

        public string CreatePersonalCalendar(PersonalCalendarModal modal)
        {
            modal.id = WanerDaoGuid.GetDefaultGuid();
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "CreatePersonalCalendar", modal);
            Dictionary<string, object> prepareJson = new Dictionary<string, object>();
            prepareJson.Add("id", modal.id);
            if (result >= 0)
            {
                return Message(prepareJson, WanerDaoGlobalTip.GetInternationalizationTip("AddSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("AddFailInfo"), MessageType.error);
            }
        }

        public string CreatePersonalCalendar(string json)
        {
            Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
            string id = WanerDaoGuid.GetDefaultGuid();
            param.Add("id", WanerDaoGuid.GetDefaultGuid());
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "CreatePersonalCalendar", param);
            Dictionary<string, object> prepareJson = new Dictionary<string, object>();
            prepareJson.Add("id", id);
            if (result >= 0)
            {

                return Message(prepareJson, WanerDaoGlobalTip.GetInternationalizationTip("AddSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("AddFailInfo"), MessageType.error);
            }
        }

        public string CreateSimplePersonalCalendar(PersonalCalendarModal modal)
        {
            modal.id = WanerDaoGuid.GetDefaultGuid();
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "CreateSimplePersonalCalendar", modal);
            Dictionary<string, object> prepareJson = new Dictionary<string, object>();
            prepareJson.Add("id", modal.id);
            if (result >= 0)
            {
                return Message(prepareJson, WanerDaoGlobalTip.GetInternationalizationTip("AddSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("AddFailInfo"), MessageType.error);
            }
        }

        public string CreateSimplePersonalCalendar(string json)
        {
            Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
            string id = WanerDaoGuid.GetDefaultGuid();
            param.Add("id", id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "CreateSimplePersonalCalendar", param);
            Dictionary<string, object> prepareJson = new Dictionary<string, object>();
            prepareJson.Add("id", id);
            if (result >= 0)
            {
                return Message(prepareJson, WanerDaoGlobalTip.GetInternationalizationTip("AddSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("AddFailInfo"), MessageType.error);
            }
        }

        public string UpdatePersonalCalendar(PersonalCalendarModal modal)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalCalendar", modal);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfo"), MessageType.error);
            }
        }

        public string UpdateSimplePersonalCalendar(PersonalCalendarModal modal)
        {
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateSimplePersonalCalendar", modal);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfo"), MessageType.error);
            }
        }

        public string UpdateSimplePersonalCalendar(string json)
        {
            Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateSimplePersonalCalendar", param);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfo"), MessageType.error);
            }
        }

        public string DeletePersonalCalendar(string id)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("id", id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeletePersonalCalendar", param);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("DelSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("DelFailInfo"), MessageType.error);
            }
        }

        public string GetPersonalCalendarByUserId(string userId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", userId);
            string result = string.Empty;
            //string key = c_cacheKey + param["user_id"];
            //object cache = p_cache.RetrieveObject(key);
            //string result = string.Empty;
            //if (cache != null)
            //{
            //    result = (String)cache;
            //}
            //else
            //{
            //    result = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "GetPersonalCalendarByUserId", param);
            //    if (!string.IsNullOrEmpty(result))
            //    {
            //        p_cache.AddObject(key, result, 1200);
            //    }
            //}
            result = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "GetPersonalCalendarByUserId", param);
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
    }
}
