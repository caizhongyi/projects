using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IPosts;
using WanerDao2.WanerDaoCacheManager;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModel.Post;
using WanerDao2.WanerDaoModule.TipInfo;

namespace WanerDao2.WanerDaoBLL.Posts
{
    public class WanerDaoTopicCategory : IWanerDaoTopicCategory
    {
        #region 私有变量
        private readonly string c_topicCacheKey = "WanerDaoTopicCategory_";
        private ICacheStrategy p_cache;
        private const int ERROR = -1;
        #endregion

        #region 构造函数
        public WanerDaoTopicCategory()
        {
            p_cache = WanerDaoCacheFactory.SingleInstance().GetStrategy(0);
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

        #region 接口IWanerDaoTopicCategory的实现
        public string CreateTopicCategory(WanerDaoModel.Post.TopicCategoryModel topic)
        {
            topic.id = WanerDaoGuid.GetDefaultGuid();
            topic.update_date = DateTime.Now;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PostsSQL", "CreateTopicCategory", topic);
            if (result >= 0)
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("AddSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("AddFailInfo"), MessageType.error);
            }
        }

        public string UpdateTopicCategory(TopicCategoryModel topic)
        {
            topic.update_date = DateTime.Now;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PostsSQL", "UpdateTopicCategory", topic);
            if (result >= 0)
            {
                p_cache.RemoveObject(c_topicCacheKey + topic.id);
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("UpdateFailInfo"), MessageType.error);
            }
        }

        public string DeleteTopicCategory(string id)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("id", id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PostsSQL", "DeleteTopicCategory", param);
            if (result >= 0)
            {
                p_cache.RemoveObject(c_topicCacheKey + id);
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("DelSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("DelFailInfo"), MessageType.error);
            }
        }
        public string DisableTopicCategory(string id, bool active)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("id", id);
            param.Add("active", active);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PostsSQL", "DiableTopicCategory", param);
            if (result >= 0)
            {
                p_cache.RemoveObject(c_topicCacheKey + id);
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("DelSuccessInfo"), MessageType.success);
            }
            else
            {
                return Message(WanerDaoGlobalTip.GetInternationalizationTip("DelFailInfo"), MessageType.error);
            }
        }
        public string GetTopicCategoryById(string id)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("id", id);
            string result = string.Empty;
            string key = c_topicCacheKey + id;
            object cache = p_cache.RetrieveObject(key);
            if (cache != null)
            {
                result = (String)cache;
            }
            else
            {
                result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetTopicCategoryById", param);
                if (!string.IsNullOrEmpty(result))
                {
                    p_cache.AddObject(key, result, 1200);
                }
            }
            return result;
        }

        //public string GetTopicCategoryByParentId(string parentId)
        //{
        //    Dictionary<string, object> param = new Dictionary<string, object>();
        //    param.Add("parent_id", parentId);
        //    param.Add("language_id", WanerDaoGlobalTip.GetClientLanguageGuid());
        //    string result = string.Empty;
        //    string key = c_topicCacheKey + parentId;
        //    object cache = p_cache.RetrieveObject(key);
        //    result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetTopicCategoryByParentId", param);
        //    //if (cache != null)
        //    //{
        //    //    result = (String)cache;
        //    //}
        //    //else
        //    //{
        //    //    result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetTopicCategoryByParentId", param);
        //    //    if (!string.IsNullOrEmpty(result))
        //    //    {
        //    //        p_cache.AddObject(key, result, 1200);
        //    //    }
        //    //}
        //    return result;
        //}

        public string GetAllTopicCategory()
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("language_id", CommonContext.GetClientLanguage());
            string result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetAllTopicCategory", param);
            //if (cache != null)
            //{
            //    result = (String)cache;
            //}
            //else
            //{
            //    result = DbHelperFactory.SingleInstance().GetDataTable("PostsSQL", "GetTopicCategoryByParentId", param);
            //    if (!string.IsNullOrEmpty(result))
            //    {
            //        p_cache.AddObject(key, result, 1200);
            //    }
            //}
            return result;
        }
        #endregion

    }
}
