using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoCacheManager;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.Json;
using System.Data;
using WanerDao2.WanerDaoModule.Security;
using WanerDao2.WanerDaoModule.TipInfo;

namespace WanerDao2.WanerDaoBLL.Person
{
    /// <summary>
    /// 描述：个人阅读记录接口实现
    /// 创建者：徐蓓
    /// 创建时间：2011-12-21 20:33:33
    /// 修改者：
    /// 修改时间：
    /// 修改原因：
    /// </summary>
    public class WanerDaoPersonalViewRecord : IWanerDaoPersonalViewRecord
    {
        #region 私有变量
        private readonly string c_cacheKey = "PersonalViewRecord_";
        private ICacheStrategy p_cache;
        #endregion

        #region 构造函数
        public WanerDaoPersonalViewRecord()
        {
            p_cache = WanerDaoCacheManager.WanerDaoCacheFactory.SingleInstance().GetStrategy(0);
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

        #region IWanerDaoPersonalViewRecord接口实现
        public string CreateViewRecord(PersonalViewRecordModel viewRecord)
        {
            viewRecord.id = WanerDaoGuid.GetDefaultGuid();
            viewRecord.rec_date = DateTime.Now;
            viewRecord.is_read = true;
            if (!HasViewRecord(viewRecord.user_id, viewRecord.source_type_id, viewRecord.source_id))
            {
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "CreateViewRecord", viewRecord);
                if (result >= 0)
                {
                    return Message(WanerDaoGlobalTip.GetInternationalizationTip("AddSuccessInfo"), MessageType.success);
                }
                else
                {
                    return Message(WanerDaoGlobalTip.GetInternationalizationTip("AddFailInfo"), MessageType.error);
                }
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("AddSuccessInfo"), MessageType.success); 
            }

        }

        public string DeleteViewRecord(string id)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("id", id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeleteViewRecord", param);
            if (result >= 0)
            {
                p_cache.RemoveObject(c_cacheKey + id);
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("DelSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("DelFailInfo"), MessageType.error);
            }
        }

        public string GetViewRecordById(string id)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("id", id);
            string result = string.Empty;
            string key = c_cacheKey + id;
            object cache = p_cache.RetrieveObject(key);
            if (cache != null)
            {
                result = (String)cache;
            }
            else
            {
                result = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "GetViewRecordById", param);
                if (!string.IsNullOrEmpty(result))
                {
                    p_cache.AddObject(key, result, 1200);
                }
            }
            return result;
        }

        public string GetViewRecordByCompositeKey(string userId, string sourceId, string sourceTypeId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", userId);
            param.Add("source_id", sourceId);
            param.Add("source_type_id", sourceTypeId);
            string result = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "GetViewRecordByCompositeKey", param);
            return result;
        }

        public Boolean HasViewRecord(string userId, string source_type_id, string sourceId)
        {
            bool result = false;
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", userId);
            param.Add("source_id", sourceId);
            param.Add("source_type_id", source_type_id);
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("PersonSQL", "HasViewRecord", param);
            DataTable dt = ds.Tables["WanerDao2Ds"];
            int count = Convert.ToInt32(dt.Rows[0]["count"]);
            result = count > 0 ? true : false;
            return result;
        }
        #endregion
    }
}
