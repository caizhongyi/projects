using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Text;
using WanerDao2.WanDaoIDAL;
using WanerDao2.WanerDaoModule.Config;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoExceptionManager;
using WanerDao2.WanerDaoModule.RegexWapper;
using WanerDao2.WanerDaoModule.TipInfo;
namespace WanerDao2.WanerDaoDALFactory
{
    /// <summary>
    /// 描述：针对玩儿道业务封装数据库访问
    /// 创建者:金广亮
    /// 创建时间：2011-9-22
    /// </summary>
    public class WanerDaoDbWrapper
    {
        private IDbHelper dbHelper;
        private object locker = new Object();
        public WanerDaoDbWrapper()
        {
            if (dbHelper == null)
            {
                lock (locker)
                {
                    if (dbHelper == null)
                    {
                        dbHelper = DbHelper.GetHelper();
                    }
                }
            }
        }

        #region 不带有事物的ExecuteNonQuery操作
        /// <summary>
        /// 描述:不带有事物的执行
        /// 创建者：金广亮
        /// 创建时间：2011-9-22
        /// </summary>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQuery(string filename, string sqlKey)
        {
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            int i = 0;
            try
            {
                dbHelper.Open();
                i = dbHelper.ExecuteNonQuery(commandText);
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (System.Exception ex)
            {
                i = -1;
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Error, ex);
            }
            finally
            {
                dbHelper.Close();
            }
            return i;
        }
        /// <summary>
        /// 描述：不带有事物的执行
        /// 创建者：金广亮
        /// 创建时间：2011-9-22
        /// </summary>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="dbParameters">参数集合</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQuery(string filename, string sqlKey, DbParameter[] dbParameters)
        {
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            return CommonExecuteNonQuery(commandText, dbParameters);
        }
        /// <summary>
        /// 描述：不带有事物的执行
        /// 创建者：金广亮
        /// 创建时间：2011-9-22 
        /// </summary>
        /// <typeparam name="T">泛型类名称</typeparam>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="t">类实例</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQuery<T>(string filename, string sqlKey, T t)
        {
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            DbParameter[] dbParameters = ReflectGeneric<T>(t);
            return CommonExecuteNonQuery(commandText, dbParameters);
        }

        /// <summary>
        /// 描述：不带有事物的执行
        /// 创建者：金广亮
        /// 创建时间：2011-10-9
        /// </summary>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="objects">类实例集合</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQuery(string filename, string sqlKey, object[] objects)
        {
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            DbParameter[] dbParameters = ReflectGeneric(objects);
            return CommonExecuteNonQuery(commandText, dbParameters);
        }
        /// <summary>
        /// 描述：不带有事物的执行
        /// 创建者：金广亮
        /// 创建时间：2011-9-23 
        /// </summary>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="ht">包含具体参数的hashtalbe</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQuery(string filename, string sqlKey, Hashtable ht)
        {
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            DbParameter[] dbParameters = ReflectHashTable(ht);
            return CommonExecuteNonQuery(commandText, dbParameters);
        }
        /// <summary>
        /// 描述：不带有事物的执行
        /// 创建者：金广亮
        /// 创建时间：2011-9-23
        /// </summary>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="dic">包含具体参数的hashtalbe</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQuery(string filename, string sqlKey, Dictionary<string, object> dic)
        {
            if (dic == null || dic.Count < 1)
                return ExecuteNonQuery(filename, sqlKey);
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            DbParameter[] dbParameters = ReflectDictionary(dic);
            return CommonExecuteNonQuery(commandText, dbParameters);
        }

        /// <summary>
        /// 描述：不带有事物的执行(根据SQL参数反查泛型)
        /// 创建者：徐兵
        /// 创建时间：2011-12-30
        /// </summary>
        /// <typeparam name="T">泛型类名称</typeparam>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="t">类实例</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQueryBasedOnSql<T>(string filename, string sqlKey, T t)
        {
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            DbParameter[] dbParameters = this.ReflectGenericBasedOnSql<T>(t, commandText);
            return CommonExecuteNonQuery(commandText, dbParameters);
        }
        /// <summary>
        /// 描述：获取执行执行参数(根据SQL参数反查泛型)
        /// 创建者：徐兵
        /// 创建时间：2011-12-30
        /// </summary>
        /// <typeparam name="T">泛型类名称</typeparam>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="t">类实例</param>
        /// <returns>KeyValuePair<string, DbParameter[]></returns>
        public KeyValuePair<string, DbParameter[]> GetNonQueryDBParamBasedOnSql<T>(string filename, string sqlKey, T t)
        {
            if (t == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            DbParameter[] dbParameters = this.ReflectGenericBasedOnSql<T>(t, commandText);
            return new KeyValuePair<string, DbParameter[]>(commandText, dbParameters);
        }
        /// <summary>
        /// 描述：不带有事物的执行(根据SQL参数反查Dictionary)
        /// 创建者：徐兵
        /// 创建时间：2011-12-30
        /// </summary>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="dic">包含具体参数的hashtalbe</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQueryBasedOnSql(string filename, string sqlKey, Dictionary<string, object> dic)
        {
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            DbParameter[] dbParameters = this.ReflectDictionaryBasedOnSql(dic, commandText);
            return CommonExecuteNonQuery(commandText, dbParameters);
        }
        /// <summary>
        /// 描述：获取执行执行参数(根据SQL参数反查Dictionary)
        /// 创建者：徐兵
        /// 创建时间：2011-12-30
        /// </summary>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="dic">包含具体参数的hashtalbe</param>
        /// <returns>KeyValuePair<string, DbParameter[]></returns>
        public KeyValuePair<string, DbParameter[]> GetNonQueryDBParamBasedOnSql(string filename, string sqlKey, Dictionary<string, object> dic)
        {
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            DbParameter[] dbParameters = this.ReflectDictionaryBasedOnSql(dic, commandText);
            return new KeyValuePair<string, DbParameter[]>(commandText, dbParameters);
        }
        #endregion

        #region 带有事物的ExecuteNonQuery操作
        /// <summary>
        /// 描述:带有事物的执行
        /// 创建者：金广亮
        /// 创建时间：2011-9-22
        /// </summary>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQueryForTrans(string filename, string sqlKey)
        {
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            int i = 0;
            try
            {
                dbHelper.Open();
                dbHelper.BeginTransaction();
                i = dbHelper.ExecuteNonQuery(commandText);
                dbHelper.CommitTransaction();
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (System.Exception ex)
            {
                i = -1;
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Error, ex);
            }
            finally
            {
                dbHelper.RollbackTransaction();
                dbHelper.Close();
            }
            return i;
        }
        /// <summary>
        /// 描述：带有事物的执行
        /// 创建者：金广亮
        /// 创建时间：2011-9-22
        /// </summary>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="dbParameters">参数集合</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQueryForTrans(string filename, string sqlKey, DbParameter[] dbParameters)
        {
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            return CommonTransExecuteNonQuery(commandText, dbParameters);
        }
        /// <summary>
        /// 描述：带有事物的执行
        /// 创建者：金广亮
        /// 创建时间：2011-9-22 
        /// </summary>
        /// <typeparam name="T">泛型类名称</typeparam>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="t">类实例</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQueryForTrans<T>(string filename, string sqlKey, T t)
        {
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            DbParameter[] dbParameters = ReflectGeneric<T>(t);
            return CommonTransExecuteNonQuery(commandText, dbParameters);
        }
        /// <summary>
        /// 描述：带有事物的执行
        /// 创建者：金广亮
        /// 创建时间：2011-10-9
        /// </summary>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="objects">类实例集合</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQueryForTrans(string filename, string sqlKey, object[] objects)
        {
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            DbParameter[] dbParameters = ReflectGeneric(objects);
            return CommonTransExecuteNonQuery(commandText, dbParameters);
        }
        /// <summary>
        /// 描述：带有事物的执行
        /// 创建者：金广亮
        /// 创建时间：2011-9-23 
        /// </summary>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="ht">包含具体参数的hashtalbe</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQueryForTrans(string filename, string sqlKey, Hashtable ht)
        {
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            DbParameter[] dbParameters = ReflectHashTable(ht);
            return CommonTransExecuteNonQuery(commandText, dbParameters);
        }
        /// <summary>
        /// 描述：带有事物的执行
        /// 创建者：金广亮
        /// 创建时间：2011-9-23 
        /// </summary>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="dic">包含具体参数的Dictionary</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQueryForTrans(string filename, string sqlKey, Dictionary<string, object> dic)
        {
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            DbParameter[] dbParameters = ReflectDictionary(dic);
            return CommonTransExecuteNonQuery(commandText, dbParameters);
        }

        /// <summary>
        /// 描述：带有事物的执行（接收多执行语句）
        /// 创建者：徐兵
        /// 创建时间：2011-12-30
        /// </summary>
        /// <param name="list">包含具体参数的List</param>
        /// <returns>影响行数</returns>
        public int ExecuteNonQueryForTrans(IEnumerable<KeyValuePair<string, DbParameter[]>> list)
        {
            return CommonTransExecuteNonQuery(list);
        }
        #endregion

        #region 获取数据集
        #region DataTable返回JSON格式
        /// <summary>
        /// 描述：返回JSON格式数据集
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <returns>JSON格式信息</returns>
        public string GetDataTable(string filename, string sqlKey)
        {
            string json = string.Empty;
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            try
            {
                dbHelper.Open();
                DataTable dt = dbHelper.Fill(commandText);
                json = ConvertDataTableToJSON(dt);
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (System.Exception ex)
            {
                json = WanerDaoJSON.GetErrorJson(ex.Message);
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Error, ex);
            }
            finally
            {
                dbHelper.Close();
            }
            return json;
        }
        /// <summary>
        /// 描述：返回首行首列的值
        /// 作者:杨晓东
        /// 时间：2011年10月10日23:11:49
        /// </summary>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="dbparameters">参数集合</param>
        /// <returns>object</returns>
        public object GetScalar(string filename, string sqlKey, Dictionary<string, object> dic)
        {
            object o = null;
            string commandText = string.Empty;
            try
            {
                DbParameter[] dbparameters = ReflectDictionary(dic);
                commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
                dbHelper.Open();
                o = dbHelper.ExecuteScalar(commandText, dbparameters);
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (System.Exception ex)
            {
                WanerDaoLog4Net.Write("执行SQL：" + commandText + sqlKey, WanerDaoLog4Net.LogMessageType.Error, ex);
                // o = WanerDaoJSON.GetErrorJson(ex.Message);
                throw ex;
            }
            finally
            {
                dbHelper.Close();
            }
            return o;
        }

        /// <summary>
        /// 描述：返回JSON格式数据集
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="dbparameters">参数集合</param>
        /// <returns>JSON格式信息</returns>
        public string GetDataTable(string filename, string sqlKey, DbParameter[] dbparameters)
        {
            string json = string.Empty;
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            try
            {
                dbHelper.Open();
                DataTable dt = dbHelper.Fill(commandText, dbparameters);
                json = ConvertDataTableToJSON(dt);
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (System.Exception ex)
            {
                json = WanerDaoJSON.GetErrorJson(ex.Message);
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Error, ex);
            }
            finally
            {
                dbHelper.Close();
            }
            return json;
        }

        /// <summary>
        /// 描述：返回JSON格式数据集
        /// 作者:徐兵
        /// 时间：2012-4-21
        /// </summary>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="replaceDic">文本替换集合</param>
        /// <param name="dbParameterDic">参数集合</param>
        /// <returns>JSON格式信息</returns>
        public string GetDataTableJson(string filename, string sqlKey, Dictionary<string,string> replaceDic, Dictionary<string, object> dbParameterDic)
        {
            string json = string.Empty;
            DataTable dt= GetDataTable(filename, sqlKey, replaceDic, dbParameterDic);
            json = ConvertDataTableToJSON(dt);
            return json;
        }
        /// <summary>
        /// 描述：返回JSON格式数据集
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="ht">参数集合</param>
        /// <returns>JSON格式信息</returns>
        public string GetDataTable(string filename, string sqlKey, Hashtable ht)
        {
            DbParameter[] dbparameters = ReflectHashTable(ht);
            return GetDataTable(filename, sqlKey, dbparameters);
        }
        /// <summary>
        /// 描述：返回JSON格式数据集
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="dic">参数集合</param>
        /// <returns>JSON格式信息</returns>
        public string GetDataTable(string filename, string sqlKey, Dictionary<string, object> dic)
        {
            if(dic==null||dic.Count<1)
                return GetDataTable(filename, sqlKey);
            DbParameter[] dbparameters = ReflectDictionary(dic);
            return GetDataTable(filename, sqlKey, dbparameters);
        }
        /// <summary>
        /// 描述：返回JSON格式数据集
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <typeparam name="T">泛型类名称</typeparam>
        /// <param name="filename">储存SQL脚本文件名(不用加扩展名)</param>
        /// <param name="sqlKey">SQL脚本ID</param>
        /// <param name="t">类实例</param>
        /// <returns>JSON格式信息</returns>
        public string GetDataTable<T>(string filename, string sqlKey, T t)
        {
            DbParameter[] dbparameters = ReflectGeneric<T>(t);
            return GetDataTable(filename, sqlKey, dbparameters);
        }
        #endregion
        #region DataSet
        /// <summary>
        /// 描述：返回DataSet格式数据集,数据集名字为WanerDao2Ds
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <returns>DataSet格式信息</returns>
        public DataSet GetDataSet(string filename, string sqlKey)
        {
            string json = string.Empty;
            DataSet ds = null;
            try
            {
                dbHelper.Open();
                string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
                ds = new DataSet();
                dbHelper.Fill(ds, commandText, "WanerDao2Ds");
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (System.Exception ex)
            {
                WanerDaoLog4Net.Write("获取DataSet异常：", WanerDaoLog4Net.LogMessageType.Error, ex);
            }
            finally
            {
                dbHelper.Close();
            }
            return ds;
        }
        /// <summary>
        /// 描述：返回DataSet格式数据集,数据集名字为WanerDao2Ds
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="dbparameters">参数集合</param>
        /// <returns>DataSet格式信息</returns>
        public DataSet GetDataSet(string filename, string sqlKey, DbParameter[] dbparameters)
        {
            string json = string.Empty;
            DataSet ds = null;
            try
            {
                dbHelper.Open();
                string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
                ds = new DataSet();
                dbHelper.Fill(ds, commandText, "WanerDao2Ds", dbparameters);
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (System.Exception ex)
            {
                WanerDaoLog4Net.Write("获取DataSet异常：", WanerDaoLog4Net.LogMessageType.Error, ex);
            }
            finally
            {
                dbHelper.Close();
            }
            return ds;
        }
        /// <summary>
        /// 描述：返回DataSet格式数据集(根据sql参数反查Dictionary),数据集名字为WanerDao2Ds
        /// 作者:徐兵
        /// 时间：2012-1-5
        /// </summary>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="dic">Dictionary</param>
        /// <returns>DataSet格式信息</returns>
        public DataSet GetDataSetBasedOnSql(string filename, string sqlKey, Dictionary<string, object> dic)
        {
            string json = string.Empty;
            DataSet ds = null;
            try
            {
                dbHelper.Open();
                string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
                DbParameter[] dbparameters = ReflectDictionaryBasedOnSql(dic, commandText);
                ds = new DataSet();
                dbHelper.Fill(ds, commandText, "WanerDao2Ds", dbparameters);
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (System.Exception ex)
            {
                WanerDaoLog4Net.Write("获取DataSet异常：", WanerDaoLog4Net.LogMessageType.Error, ex);
            }
            finally
            {
                dbHelper.Close();
            }
            return ds;
        }
        /// <summary>
        /// 描述：返回DataSet格式数据集,数据集名字为WanerDao2Ds
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="ht">参数集合</param>
        /// <returns>DataSet格式信息</returns>
        public DataSet GetDataSet(string filename, string sqlKey, Hashtable ht)
        {
            DbParameter[] dbparameters = ReflectHashTable(ht);
            return GetDataSet(filename, sqlKey, dbparameters);
        }
        /// <summary>
        /// 描述：返回DataSet格式数据集,数据集名字为WanerDao2Ds
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="dic">参数集合</param>
        /// <returns>DataSet格式信息</returns>
        public DataSet GetDataSet(string filename, string sqlKey, Dictionary<string, object> dic)
        {
            DbParameter[] dbparameters = ReflectDictionary(dic);
            return GetDataSet(filename, sqlKey, dbparameters);
        }

        /// <summary>
        /// 描述：返回DataSet格式数据集,数据集名字为WanerDao2Ds
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <typeparam name="T">泛型类</typeparam>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="t">泛型类实例</param>
        /// <returns>DataSet格式信息</returns>
        public DataSet GetDataSet<T>(string filename, string sqlKey, T t)
        {
            DbParameter[] dbparameters = ReflectGeneric<T>(t);
            return GetDataSet(filename, sqlKey, dbparameters);
        }
        #endregion 
        #region datatable
        /// <summary>
        /// 描述：返回DataTable(根据sql参数反查Dictionary)
        /// 作者:徐兵
        /// 时间：2012-1-5
        /// </summary>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="dic">参数集合</param>
        /// <returns>DataTable</returns>
        public DataTable GetDataTableBasedOnSql(string filename, string sqlKey, Dictionary<string, object> dic)
        {
            string json = string.Empty;
            DataTable dt = null;
            try
            {
                dbHelper.Open();
                string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
                DbParameter[] dbparameters = ReflectDictionaryBasedOnSql(dic, commandText);
                dt = new DataTable();
                dbHelper.Fill(dt, commandText, dbparameters);
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (System.Exception ex)
            {
                WanerDaoLog4Net.Write("获取DataSet异常：", WanerDaoLog4Net.LogMessageType.Error, ex);
            }
            finally
            {
                dbHelper.Close();
            }
            return dt;
        }
        /// <summary>
        /// 描述：返回DataTable格式数据集
        /// 作者:徐兵
        /// 时间：2012-4-21
        /// </summary>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="replaceDic">文本替换集合</param>
        /// <param name="dbParameterDic">参数集合</param>
        /// <returns>JSON格式信息</returns>
        public DataTable GetDataTable(string filename, string sqlKey, Dictionary<string, string> replaceDic, Dictionary<string, object> dbParameterDic)
        {
            string json = string.Empty;
            string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
            if (replaceDic != null)
            {
                foreach (KeyValuePair<string, string> _key in replaceDic)
                {
                    commandText = commandText.Replace(_key.Key, _key.Value);
                }
            }
            DbParameter[] dbparameters = ReflectDictionary(dbParameterDic);
            DataTable dt=null;
            try
            {
                dbHelper.Open();
                dt = dbHelper.Fill(CommandType.Text, commandText, dbparameters);
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (System.Exception ex)
            {
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Error, ex);
            }
            finally
            {
                dbHelper.Close();
            }
            return dt;
        }
        #endregion
        #region 返回实体类集合
        /// <summary>
        /// 描述：返回实体格式数据集
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <typeparam name="T">泛型</typeparam>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <returns>返回实体类集合</returns>
        public IList<T> GetGenericModel<T>(string filename, string sqlKey)
        {
            IList<T> list = null;
            try
            {
                dbHelper.Open();
                string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
                DataTable dt = dbHelper.Fill(commandText);
                list = ConvertDataTableToModel<T>(dt);
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (System.Exception ex)
            {
                WanerDaoLog4Net.Write("获取DataSet异常：", WanerDaoLog4Net.LogMessageType.Error, ex);
            }
            finally
            {
                dbHelper.Close();
            }
            return list;
        }
        /// <summary>
        /// 描述：返回实体集合格式数据集
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <typeparam name="T">泛型</typeparam>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="dbparameters">参数集合</param>
        /// <returns>返回实体类集合</returns>
        public IList<T> GetGenericModel<T>(string filename, string sqlKey, DbParameter[] dbparameters)
        {
            IList<T> list = null;
            try
            {
                dbHelper.Open();
                string commandText = WanerDaoSqlReader.GetSQLStatement(filename, sqlKey);
                DataTable dt = dbHelper.Fill(commandText, dbparameters);
                list = ConvertDataTableToModel<T>(dt);
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (System.Exception ex)
            {
                WanerDaoLog4Net.Write("获取DataSet异常：", WanerDaoLog4Net.LogMessageType.Error, ex);
            }
            finally
            {
                dbHelper.Close();
            }
            return list;
        }
        /// <summary>
        /// 描述：返回实体集合格式数据集
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <typeparam name="T">泛型</typeparam>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="ht">参数集合</param>
        /// <returns>实体集合</returns>
        public IList<T> GetGenericModel<T>(string filename, string sqlKey, Hashtable ht)
        {
            DbParameter[] dbparameters = ReflectHashTable(ht);
            return GetGenericModel<T>(filename, sqlKey, dbparameters);
        }
        /// <summary>
        /// 描述：返回实体集合格式数据集
        /// 作者:金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <typeparam name="T">泛型</typeparam>
        /// <param name="filename">配置文件名</param>
        /// <param name="sqlKey">脚本ID</param>
        /// <param name="dic">参数集合</param>
        /// <returns>实体集合</returns>
        public IList<T> GetGenericModel<T>(string filename, string sqlKey, Dictionary<string, object> dic)
        {
            if(dic==null||dic.Count<1)
                return GetGenericModel<T>(filename, sqlKey);

            DbParameter[] dbparameters = ReflectDictionary(dic);
            return GetGenericModel<T>(filename, sqlKey, dbparameters);
        }
        #endregion
        #endregion

        #region 私有函数
        /// <summary>
        /// 描述：把DataTable转换成JSON格式字符串
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="dt">DataTable数据集</param>
        /// <returns>JSON格式字符串</returns>
        private string ConvertDataTableToJSON(DataTable dt)
        {
            string json = string.Empty;
            int total = dt.Rows.Count;
            Dictionary<string, object> result = new Dictionary<string, object>();
            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            if (total > 0)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    Dictionary<string, object> dtJSON = new Dictionary<string, object>();
                    foreach (DataColumn dc in dt.Columns)
                    {
                        dtJSON.Add(dc.ColumnName, dr[dc.ColumnName]);
                    }
                    list.Add(dtJSON);
                }
                result.Add("total", dt.Rows.Count);
                result.Add("rows", list);
                json = WanerDaoJSON.GetSuccessJson(result);
            }
            else
            {
                result.Add("total", 0);
                result.Add("rows", "");
                json = WanerDaoJSON.GetSuccessJson(result);
            }
            return json;
        }
        //private IList<T> ConvertDataTableToModel<T>(DataTable dt)
        //{
        //    List<T> list = null;
        //    int total = dt.Rows.Count;
        //    if (total > 0)
        //    {
        //        list = new List<T>();
        //        foreach (DataRow dr in dt.Rows)
        //        {
        //            T t = Activator.CreateInstance<T>();
        //            PropertyInfo[] pis = t.GetType().GetProperties(BindingFlags.GetProperty | BindingFlags.Public | BindingFlags.Instance);
        //            foreach (DataColumn dc in dt.Columns)
        //            {
        //                try
        //                {
        //                    foreach (PropertyInfo pi in pis)
        //                    {
        //                        if (pi.Name.ToLower() == dc.ColumnName.ToLower())
        //                        {
        //                            if (dr[dc] != DBNull.Value)
        //                            {
        //                                pi.SetValue(t, dr[dc], null);
        //                            }
        //                            break;
        //                        }
        //                    }
        //                }
        //                catch (Exception ex)
        //                {

        //                    throw ex;
        //                }
        //            }
        //            list.Add(t);
        //        }
        //    }
        //    return list;
        //}
        private IList<T> ConvertDataTableToModel<T>(DataTable dt)
        {
            if (dt == null || dt.Rows.Count == 0) return null;
            IList<T> list = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T obj = ConvertDataRowToEntity<T>(row);
                list.Add(obj);
            }
            return list;
        }

        /// <summary>
        /// Convert a single DataRow into an object of type T.
        /// </summary>
        private static T ConvertDataRowToEntity<T>(DataRow row)
        {
            Type objType = typeof(T);
            T obj = Activator.CreateInstance<T>(); //hence the new() contsraint
            //Debug.WriteLine(objType.Name + " = new " + objType.Name + "();");
            foreach (DataColumn column in row.Table.Columns)
            {
                //may error if no match
                PropertyInfo property =
                    objType.GetProperty(column.ColumnName,
                    BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
                if (property == null || !property.CanWrite)
                {
                    //Debug.WriteLine("//Property " + column.ColumnName + " not in object");
                    continue; //or throw
                }
                object value = row[column.ColumnName];
                if (value == DBNull.Value && column.DataType == typeof(DateTime)) value = DateTime.MinValue;
                if (value != DBNull.Value && column.DataType == typeof(Int64)) value = Convert.ToInt32(value);
                //如果数据库为NUll 读取出来为string.Empty

                if (property.PropertyType.Name == typeof(System.String).Name)
                {
                    if (value == DBNull.Value) value = string.Empty;
                }
                else
                {
                    if (value == DBNull.Value) value = null;
                }
                property.SetValue(obj, value, null);
                WanerDaoLog4Net.Assert(true, "obj." + property.Name + " = row[\"" + column.ColumnName + "\"];");
            }
            return obj;
        }


        /// <summary>
        /// 描述：通用执行
        /// 作者：胥鑫
        /// 时间：2012-8-10
        /// </summary>
        /// <param name="commandText">SQL脚本</param>
        /// <param name="dbParameters">参数集合</param>
        /// <returns>影响行数</returns>
        public KeyValuePair<string, DbParameter[]> CommonExecuteNonQuery(string commandText, Dictionary<string, object> dic)
        {
            DbParameter[] dbParameters = this.ReflectDictionaryBasedOnSql(dic, commandText);
            return new KeyValuePair<string, DbParameter[]>(commandText, dbParameters);
        }


        /// <summary>
        /// 描述：通用执行
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="commandText">SQL脚本</param>
        /// <param name="dbParameters">参数集合</param>
        /// <returns>影响行数</returns>
        public int CommonExecuteNonQuery(string commandText, DbParameter[] dbParameters)
        {
            int i = 0;
            try
            {
                dbHelper.Open();
                i = dbHelper.ExecuteNonQuery(commandText, dbParameters);
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (System.Exception ex)
            {
                i = -1;
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Error, ex);
            }
            finally
            {
                dbHelper.Close();
            }
            return i;
        }
        /// <summary>
        /// 描述：带有事物通用执行
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="httpPosteFile">上传文件请求流</param>
        /// <param name="commandText">SQL脚本</param>
        /// <param name="dbParameters">参数集合</param>
        /// <returns>影响行数</returns>
        public int CommonTransExecuteNonQuery(string commandText, DbParameter[] dbParameters)
        {
            int i = 0;
            try
            {
                dbHelper.Open();
                dbHelper.BeginTransaction();
                i = dbHelper.ExecuteNonQuery(commandText, dbParameters);
                dbHelper.CommitTransaction();
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (System.Exception ex)
            {
                i = -1;
                dbHelper.RollbackTransaction();
                WanerDaoLog4Net.Write("执行SQL：" + commandText, WanerDaoLog4Net.LogMessageType.Error, ex);
            }
            finally
            {
                dbHelper.Close();
            }
            return i;
        }
        /// <summary>
        /// 描述：带有事物通用执行（同时执行多个自定义组合）
        /// 作者：徐兵
        /// 时间：2011-12-30
        /// update by 2012-2-10
        /// </summary>
        /// <param name="List">参数集合</param>
        /// <returns>影响行数</returns>
        private int CommonTransExecuteNonQuery(IEnumerable<KeyValuePair<string, DbParameter[]>> Dic)
        {
            if (Dic == null || Dic.Count() < 1)
            {
                return 0;
            }
            string strSql = string.Empty;
            int i = 0;
            try
            {
                dbHelper.Open();
                dbHelper.BeginTransaction();
                foreach (KeyValuePair<string, DbParameter[]> kvp in Dic)
                {
                    if (!string.IsNullOrEmpty(kvp.Key))
                    {
                        strSql = kvp.Key;
                        int iRe = dbHelper.ExecuteNonQuery(kvp.Key, kvp.Value);
                        if (iRe >= 0)
                        {
                            i += iRe;
                        }
                        else
                        {
                            i = -1;
                            dbHelper.RollbackTransaction();
                            return -1;
                        }
                    }
                }
                dbHelper.CommitTransaction();
            }
            catch (System.Exception ex)
            {
                i = -1;
                dbHelper.RollbackTransaction();
                WanerDaoLog4Net.Write("执行SQL：" + strSql, WanerDaoLog4Net.LogMessageType.Error, ex);
            }
            finally
            {
                dbHelper.Close();
            }
            return i;
        }
        /// <summary>
        /// 描述:转换Dictionary泛型为DbParameter[]
        /// 创建者:金广亮
        /// 创建时间：2011-9-23
        /// </summary>
        /// <param name="dic">实例</param>
        /// <returns>DbParameter[]</returns>
        private DbParameter[] ReflectDictionary(Dictionary<string, object> dic)
        {
            int len = dic.Count;
            DbParameter[] dbParameters = new DbParameter[len];
            IEnumerator ie = dic.Keys.GetEnumerator();
            int i = -1;
            while (ie.MoveNext())
            {
                ++i;
                dbParameters[i] = dbHelper.MakeInParam(ie.Current.ToString(), CheckIsBool(dic[ie.Current.ToString()]));
                dbParameters[i].DbType = getDbType(dic[ie.Current.ToString()].GetType().Name.ToLower());
            }
            return dbParameters;
        }
        private DbType getDbType(string dbtype)
        {
            DbType str = default(DbType);
            switch (dbtype)
            {
                case "system.string":
                case "string":
                    str = DbType.String;
                    break;
                case "system.boolean":
                case "boolean":
                    str = DbType.Boolean;
                    break;
                case "system.int32":
                case "int32":
                    str = DbType.Int32;
                    break;
                case "system.double":
                case "double":
                    str = DbType.Double;
                    break;
            }
            return str;
        }
        /// <summary>
        /// 描述：转换HashTable为DbParameter[]
        /// 创建者：金广亮
        /// 创建时间：2011-9-23
        /// </summary>
        /// <param name="ht">实例</param>
        /// <returns>DbParameter[]</returns>
        private DbParameter[] ReflectHashTable(Hashtable ht)
        {
            int len = ht.Count;
            DbParameter[] dbParameters = new DbParameter[len];
            IEnumerator ie = ht.Keys.GetEnumerator();
            int i = -1;
            while (ie.MoveNext())
            {
                ++i;
                dbParameters[i] = dbHelper.MakeInParam(ie.Current.ToString(), CheckIsBool(ht[ie.Current]));
                dbParameters[i].DbType = getDbType(ht[ie.Current.ToString()].GetType().Name.ToLower());
            }
            return dbParameters;
        }
        /// <summary>
        /// 描述：转换HashTable为DbParameter[]
        /// 创建者：金广亮
        /// 创建时间：2011-9-23
        /// </summary>
        /// <typeparam name="T">泛型类型</typeparam>
        /// <param name="t">类实例</param>
        /// <returns>DbParameter[]</returns>
        private DbParameter[] ReflectGeneric<T>(T t)
        {
            PropertyInfo[] pis = t.GetType().GetProperties(BindingFlags.GetProperty | BindingFlags.Public | BindingFlags.Instance);
            DbParameter[] dbParameters = null;
            //Type type = t.GetType();
            if (pis.Length > 0)
            {
                dbParameters = new DbParameter[pis.Length];
                for (int i = 0; i < pis.Length; i++)
                {
                    if (pis[i].GetValue(t, null) != null)
                    {
                        dbParameters[i] = dbHelper.MakeInParam(pis[i].Name.ToLower(), CheckIsBool(pis[i].GetValue(t, null)));
                        dbParameters[i].DbType = getDbType(pis[i].GetValue(t, null).GetType().ToString().ToLower());
                    }
                }
            }
            return dbParameters;
        }
        /// <summary>
        /// 描述:根据SQL中存储参数及泛型转换为DbParameter[]
        /// 创建者：徐兵
        /// 创建时间：2011-12-30
        /// </summary>
        /// <typeparam name="T">泛型类型</typeparam>
        /// <param name="t">类实例</param>
        /// <param name="sql">SQL语句</param>
        /// <returns>DbParameter[]</returns>
        private DbParameter[] ReflectGenericBasedOnSql<T>(T t, string sql)
        {
            string[] sqlParams = WanerDaoRegex.GetSqlParams(sql);
            if (sqlParams == null || sqlParams.Length < 1)
            {
                return null;
            }
            PropertyInfo[] pis = t.GetType().GetProperties(BindingFlags.GetProperty | BindingFlags.Public | BindingFlags.Instance);
            Dictionary<string, PropertyInfo> proDic = pis.ToDictionary(i => i.Name.ToLower());
            DbParameter[] dbParameters = null;
            string paramName = string.Empty;
            PropertyInfo pi = null;
            dbParameters = new DbParameter[sqlParams.Length];
            for (int i = 0; i < sqlParams.Length; i++)
            {
                paramName = sqlParams[i];
                if (proDic.ContainsKey(paramName.ToLower()))
                {
                    pi = proDic[paramName.ToLower()];
                    object value = pi.GetValue(t, null);
                    if (value == null)
                    {
                        value = "";
                    }
                    dbParameters[i] = dbHelper.MakeInParam(paramName, CheckIsBool(value));
                    dbParameters[i].DbType = getDbType(pi.PropertyType.FullName.ToLower());
                }
                else
                {
                    throw new Exception("can not find Parameters '" + paramName + "'");
                }
            }

            return dbParameters;
        }
        /// <summary>
        /// 描述:根据SQL中参数转换Dictionary为DbParameter[]
        /// 创建者:徐兵
        /// 创建时间：2011-12-30
        /// </summary>
        /// <param name="dic">实例</param>
        /// <param name="sql">SQL语句</param>
        /// <returns>DbParameter[]</returns>
        private DbParameter[] ReflectDictionaryBasedOnSql(Dictionary<string, object> dic, string sql)
        {
            string[] sqlParams = WanerDaoRegex.GetSqlParams(sql);
            if (sqlParams == null || sqlParams.Length < 1)
            {
                return null;
            }
            
            string paramName = string.Empty;
            object value = null;
            DbParameter[] dbParameters = new DbParameter[sqlParams.Length];
            for (int i = 0; i < sqlParams.Length; i++)
            {
                paramName = sqlParams[i];
                if (dic.ContainsKey(paramName.ToLower()))
                {
                    value = dic[paramName];
                    if (value == null)
                    {
                        value = "";
                    }
                    dbParameters[i] = dbHelper.MakeInParam(paramName, CheckIsBool(value));
                    dbParameters[i].DbType = getDbType(value.GetType().Name.ToLower());
                    
                }
                else
                {
                    throw new Exception("can not find Parameters '" + paramName + "'");
                }
            }
            return dbParameters;
        }

        private object CheckIsBool(object o)
        {
            if (o.GetType() == typeof(Boolean))
            {
                return o;
            }
            else
            {
                return dbHelper.SqlSafe(o.ToString());
            }
        }
        /// <summary>
        /// 描述;反射object实体类集合
        /// 作者：金广亮
        /// 时间：2011-10-9
        /// </summary>
        /// <param name="objets">object实体类集合</param>
        /// <returns>DbParameter[]</returns>
        private DbParameter[] ReflectGeneric(object[] objets)
        {
            DbParameter[] dbParameters = null;
            List<DbParameter> list = new List<DbParameter>();
            foreach (object o in objets)
            {
                PropertyInfo[] pis = o.GetType().GetProperties(BindingFlags.GetProperty | BindingFlags.Public | BindingFlags.Instance);
                dbParameters = new DbParameter[pis.Length];
                for (int i = 0; i < pis.Length; i++)
                {
                    if (pis[i].GetValue(o, null) != null)
                    {
                        dbParameters[i] = dbHelper.MakeInParam(pis[i].Name.ToLower(), CheckIsBool(pis[i].GetValue(o, null))); //dbHelper.SqlSafe(.ToString()
                    }
                }
                list.AddRange(dbParameters);
            }
            if (list.Count > 0)
            {
                dbParameters = list.ToArray();
            }
            return dbParameters;
        }
        #endregion

    }
}
