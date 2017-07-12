#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-13 21:40:28 
* 文件名：DBHelper 
* 版本：V1.0.1 
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
using System.Data;
using WanerDao2.WanerDaoDALFactory;
using System.Data.Common;
using WanerDao2.WanerDaoModule.Utils;

namespace WanerDao2.WanerDaoBLL.Tool
{
    public class DBHelper
    {

        public WanerDaoDbWrapper DBAccess;
        public static object objLock = new object();
        public string ConfigName = string.Empty;
        public string ModuleName = string.Empty;

        #region create instance
        #region singleton
        private static Dictionary<string, DBHelper>  Cache_Instance = new Dictionary<string,DBHelper>();
        private const string CacheKeyFormat = "{0}-{1}";
        public static DBHelper CreateSingleInstance(string configName,string moduleName=null)
        {
            string _key = string.Format(CacheKeyFormat,configName, moduleName ?? "");
            if (!Cache_Instance.ContainsKey(_key))
            {
                lock (objLock)
                {
                    if (!Cache_Instance.ContainsKey(_key))
                        Cache_Instance.Add(_key, new DBHelper(configName, moduleName));
                }
            }
            return Cache_Instance[_key];
        }
        #endregion

        //public static DBHelper MultiInstance(string configName,string moduleName=null)
        //{
        //    return new DBHelper(configName, moduleName);
        //}

        #endregion

        private DBHelper(string configName,string moduleName=null)
        {
            DBAccess = new WanerDaoDbWrapper();
            this.ConfigName = configName;
            this.ModuleName = moduleName;
        }

        #region model
        /// <summary>
        /// 获取单个模型
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <param name="sqlKey"></param>
        /// <returns></returns>
        public T GetModel<T>(object value, string sqlKey, bool isByLanguage=false) where T : class
        {
            return this.GetModel<T>("id", value, sqlKey, isByLanguage);
        }
        public T GetModel<T>(string name, object value, string sqlKey, bool isByLanguage=false) where T : class
        {
            IList<T> list = GetListModel<T>(name, value, sqlKey, isByLanguage);
            if (list == null || list.Count < 1)
            {
                return null;
            }
            return list[0];
        }
        public T GetModel<T>(Dictionary<string, object> dic, string sqlKey, bool isByLanguage=false) where T : class
        {
            IList<T> list = GetListModel<T>(dic, sqlKey, isByLanguage);
            if (list == null || list.Count < 1)
            {
                return null;
            }
            return list[0];
        }

        /// <summary>
        /// 获取多个模型
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <param name="sqlKey"></param>
        /// <returns></returns>
        public List<T> GetListModel<T>(object value, string sqlKey, bool isByLanguage=false) where T : class
        {
            return this.GetListModel<T>("id", value, sqlKey, isByLanguage);
        }
        public List<T> GetListModel<T>(string name, object value, string sqlKey, bool isByLanguage = false) where T : class
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add(name, value);
            return GetListModel<T>(dic, sqlKey, isByLanguage) as List<T>;
        }

        public List<T> GetListModel<T>(string sqlKey, bool isByLanguage=false) where T : class
        {
            return GetListModel<T>(null, sqlKey, isByLanguage) as List<T>;
        }
        
        public List<T> GetListModel<T>(Dictionary<string, object> dic, string sqlKey, bool isByLanguage=false) where T : class
        {
            if (isByLanguage)
            {
                if (dic == null)
                    dic = new Dictionary<string, object>();
                dic.Add("language_id", CommonContext.GetClientLanguage());
            }
            return DBAccess.GetGenericModel<T>(ConfigName, GetSqlKey(sqlKey), dic) as List<T>;
        }

        #endregion

        #region datetable
        /// <summary>
        /// 获取DataTable
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <param name="sqlKey"></param>
        /// <returns>DataTable</returns>
        public DataTable GetDataTable(object value, string sqlKey, bool isByLanguage=false)
        {
            return this.GetDataTable("id", value, sqlKey, isByLanguage);
        }
        public DataTable GetDataTable(string name, object value, string sqlKey, bool isByLanguage=false)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add(name, value);
            return GetDataTable(dic, sqlKey, isByLanguage);
        }
        public DataTable GetDataTable(Dictionary<string, object> dic, string sqlKey, bool isByLanguage=false)
        {
            if (isByLanguage)
            {
                if (dic == null)
                    dic = new Dictionary<string, object>();
                dic.Add("language_id", CommonContext.GetClientLanguage());
            }
            return DBAccess.GetDataTableBasedOnSql(ConfigName, GetSqlKey(sqlKey), dic);
        }

        #endregion

        #region json
        public string GetJson(string sqlKey, bool isByLanguage=false)
        {
            return GetJson(null, sqlKey, isByLanguage);
        }
        public string GetJson(object value, string sqlKey, bool isByLanguage = false)
        {
            return GetJson("id", value, sqlKey, isByLanguage);
        }
        public string GetJson(string name, object value, string sqlKey, bool isByLanguage = false)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add(name, value);
            return GetJson(dic, sqlKey, isByLanguage);
        }
        public string GetJson(Dictionary<string, object> dic, string sqlKey, bool isByLanguage = false)
        {
            if (isByLanguage)
            {
                if (dic == null)
                    dic = new Dictionary<string, object>();
                dic.Add("language_id", CommonContext.GetClientLanguage());
            }
            return DBAccess.GetDataTable(ConfigName, GetSqlKey(sqlKey), dic);
        }

        #endregion

        #region List<Dictionary<string, object>>
        /// <summary>
        /// 根据ID获取多行Dictionary集合数据，每Dictionary代表一行数据
        /// </summary>
        /// <param name="value">值</param>
        /// <param name="sqlKey">语句配置ID</param>
        /// <returns>List</returns>
        public List<Dictionary<string, object>> GetDictionary(object value, string sqlKey, bool isByLanguage = false)
        {
            return this.GetDictionary("id", value, sqlKey, isByLanguage);
        }
        /// <summary>
        /// 根据某列值获取多行Dictionary集合数据，每Dictionary代表一行数据
        /// </summary>
        /// <param name="name"></param>
        /// <param name="value">值</param>
        /// <param name="sqlKey">语句配置ID</param>
        /// <returns></returns>
        public List<Dictionary<string, object>> GetDictionary(string name, object value, string sqlKey, bool isByLanguage = false)
        {
            List<Dictionary<string, object>> listRow = WanerDaoUtils.DataTableToList(GetDataTable(name, value, sqlKey, isByLanguage));
            return listRow;
        }
        #endregion

        #region FirstResult
        public object GetFirstResult(object value, string sqlKey, bool isByLanguage=false)
        {
            return this.GetFirstResult("id", value, sqlKey, isByLanguage);
        }
        /// <summary>
        /// 根据某一列值获得首行第一个值
        /// </summary>
        /// <param name="name">列明 如id</param>
        /// <param name="value">值</param>
        /// <param name="sqlKey">语句配置ID</param>
        /// <returns></returns>
        public object GetFirstResult(string name, object value, string sqlKey, bool isByLanguage = false)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add(name, value);
            return GetFirstResult(dic, sqlKey, isByLanguage);

        }
        public object GetFirstResult(Dictionary<string, object> dic, string sqlKey, bool isByLanguage = false)
        {
            DataTable dt = GetDataTable(dic,sqlKey,isByLanguage);
            if (dt == null || dt.Rows.Count < 1 || dt.Rows[0][0] == null)
            {
                return null;
            }

            return dt.Rows[0][0].ToString();
        }

        #endregion

        #region 执行SQL语句

        /// <summary>
        /// 单条执行
        /// </summary>
        /// <param name="keyValue"></param>
        /// <returns></returns>
        public bool ExecuteNonQuery(KeyValuePair<string, DbParameter[]> keyValue)
        {
            return DBAccess.CommonExecuteNonQuery(keyValue.Key, keyValue.Value) >= 0;
        }
        public bool ExecuteNonQuery(Dictionary<string, DbParameter[]> dic)
        {
            bool result = false;
            foreach (KeyValuePair<string, DbParameter[]> keyValue in dic)
            {
                if (DBAccess.CommonExecuteNonQuery(keyValue.Key, keyValue.Value) > 0)
                {
                    result = true;
                }
            }
            return result;
        }
        public bool ExecuteNonQuery(IEnumerable<KeyValuePair<string, DbParameter[]>> list)
        {
            bool result = false;
            foreach (KeyValuePair<string, DbParameter[]> keyValue in list)
            {
                if (DBAccess.CommonExecuteNonQuery(keyValue.Key, keyValue.Value) > 0)
                {
                    result = true;
                }
            }
            return result;
        }

        public bool ExecuteNonQuery(string sqlKey, Dictionary<string, object> dic = null)
        {
            return DBAccess.ExecuteNonQuery(ConfigName, GetSqlKey(sqlKey), dic) > -1;
        }
        /// <summary>
        /// 事务性执行
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public bool ExecuteNonQueryForTrans(IEnumerable<KeyValuePair<string, DbParameter[]>> list)
        {
            return DBAccess.ExecuteNonQueryForTrans(list) > 0;
        }
        #endregion

        #region GetDBParam
        public KeyValuePair<string, DbParameter[]> GetDBParam<T>(string sqlKey,T model)
        {
            if (model == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql<T>(ConfigName, GetSqlKey(sqlKey), model);
        }
        public KeyValuePair<string, DbParameter[]> GetDBParam( string sqlKey,Dictionary<string,object> dic)
        {
            if (dic == null || dic.Count<1)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            return DBAccess.GetNonQueryDBParamBasedOnSql(ConfigName, GetSqlKey(sqlKey), dic);
        }
        #endregion

        #region help
        private const string C_sqlKeyFormat="{0}/{1}";
        private string GetSqlKey(string key)
        {
            if(string.IsNullOrEmpty(ModuleName))
                return key;
            else 
                return string.Format(C_sqlKeyFormat,ModuleName,key);
        }
        #endregion 
    }
}
