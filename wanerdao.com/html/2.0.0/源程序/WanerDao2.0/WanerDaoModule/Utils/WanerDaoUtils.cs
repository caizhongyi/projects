using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.String;
using System.Collections;
using System.Reflection;
using System.Data;
using WanerDao2.WanerDaoExceptionManager;

namespace WanerDao2.WanerDaoModule.Utils
{
    /// <summary>
    /// 描述：玩儿道辅助工具类
    /// 作者：金广亮
    /// 时间：2011-9-24
    /// </summary>
    public class WanerDaoUtils
    {
        /// <summary>
        /// 描述：用于业务工厂获取JQUERY从页面层传递到业务的参数
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="parameters">参数</param>
        /// <returns>用于业务层的参数</returns>
        public static Dictionary<string, object> GetOperParamsDic(string parameters)
        {
            string jsondata = WanerDaoString.UrlDecode(parameters);
            Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(jsondata);
            return param;
        }
        /// <summary>
        /// 描述：用于业务工厂获取JQUERY从页面层传递到业务的参数
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="parameters">参数</param>
        /// <returns>用于业务层的参数</returns>
        public static Hashtable GetOperParamsHt(string parameters)
        {
            string jsondata = WanerDaoString.UrlDecode(parameters);
            Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(jsondata);
            Hashtable ht = WanerDaoString.ParseHashtable(param);
            return ht;
        }
        /// <summary>
        /// 描述：转换字典参数填充实体类
        /// 作者：金广亮
        /// 时间：2011-9-26
        /// </summary>
        /// <typeparam name="T">实体类</typeparam>
        /// <param name="dic">参数集合</param>
        /// <returns>实体类实例</returns>
        public static T ParseDicToModel<T>(Dictionary<string, object> dic)
        {
            T t = Activator.CreateInstance<T>();
            foreach (PropertyInfo property in t.GetType().GetProperties(BindingFlags.GetProperty | BindingFlags.Public | BindingFlags.Instance))
            {
                if (dic.Keys.Contains(property.Name.ToLower()))
                {
                    property.SetValue(t, Convert.ChangeType(dic[property.Name.ToLower()], property.PropertyType), null);
                }
            }
            return t;
        }
        /// <summary>
        /// 描述：数据表集合转换为List数据集合
        /// 作者：金广亮
        /// 时间：2011-10-22
        /// 修改: update by xubing at 2012-1-5,加入了DataTable为空判断处理
        /// 修改: 添加了时间为null的判断  杨晓东 2012-3-13
        /// </summary>
        /// <param name="dt">数据表集合</param>
        /// <returns>List数据集合</returns>
        public static List<Dictionary<string, object>> DataTableToList(DataTable dt)
        {
            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            if (dt == null || dt.Rows.Count < 1)
            {
                return null;
            }
            foreach (DataRow dr in dt.Rows)
            {
                Dictionary<string, object> dtJSON = new Dictionary<string, object>();
                foreach (DataColumn dc in dt.Columns)
                {
                    object dcValue = dr[dc.ColumnName];
                    if (dc.DataType == typeof(DateTime) && dcValue == DBNull.Value)
                    { dcValue = DateTime.MinValue; }

                    dtJSON.Add(dc.ColumnName, dcValue);
                }
                list.Add(dtJSON);
            }
            return list;
        }
        /// <summary>
        /// 描述：转换字典参数填充实体类
        /// 作者：金广亮
        /// 时间：2011-9-26
        /// </summary>
        /// <typeparam name="T">实体类</typeparam>
        /// <param name="ht">参数集合</param>
        /// <returns>实体类实例</returns>
        public static T ParseHashTableToModel<T>(Hashtable ht)
        {
            T t = Activator.CreateInstance<T>();
            foreach (PropertyInfo property in t.GetType().GetProperties(BindingFlags.GetProperty | BindingFlags.Public | BindingFlags.Instance))
            {
                if (ht.Contains(property.Name.ToLower()))
                {
                    property.SetValue(t, Convert.ChangeType(ht[property.Name.ToLower()], property.PropertyType), null);
                }
            }
            return t;
        }

        /// <summary>
        /// 返回表格首行JSON值
        /// 作者：徐兵
        /// 时间：2012-2-5
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static string GetJsonFirstRowFromDataTable(DataTable dt)
        {
            string strJson;
            Dictionary<string, object> dic = GetDicFirstRowFromDataTable(dt);
            if (dic != null && dic.Count > 0)
            {
                strJson = WanerDaoJSON.GetSuccessJson(dic);
            }
            else
            {
                strJson = WanerDaoJSON.GetErrorJson("No Data!");
            }
            return strJson;
        }
        /// <summary>
        /// 返回表格首行Dictionary值
        /// 作者：徐兵
        /// 时间：2012-2-5
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static Dictionary<string, object> GetDicFirstRowFromDataTable(DataTable dt)
        {
            if (dt != null && dt.Rows.Count > 0)
            {
                DataRow dr = dt.Rows[0];
                Dictionary<string, object> dic = new Dictionary<string, object>();
                foreach (DataColumn dc in dt.Columns)
                {
                    dic.Add(dc.ColumnName, dr[dc.ColumnName]);
                }
                return dic;
            }
            return null;
        }

        /// <summary>
        /// 将DataTable转化为T类型对象列表
        /// 作者：徐蓓
        /// 时间：2012-6-27
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static IList<T> ConvertDataTableToModel<T>(DataTable dt)
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
        /// 将DataRow转化为T类型对象
        /// 作者：徐蓓
        /// 时间：2012-6-27
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
        /// 删除字符串内部所有的空格和换行
        /// 作者：徐蓓
        /// 时间：2012-9-28
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public static string ClearString(string s)
        {
            return s.Replace("\n", "").Replace("\r", "").Trim();
        }

        #region 时间相关函数
        /// <summary>
        /// 描述：获取当前时间
        /// 作者：金广亮
        /// 时间：2012-1-17
        /// </summary>
        /// <returns>获取当前时间</returns>
        public static DateTime GetDateTime()
        {
            return DateTime.Now;
        }
        /// <summary>
        /// 描述：获取格式化的时间字符串
        /// 作者：金广亮
        /// 时间：2012-1-17
        /// </summary>
        /// <param name="formart">符合微软规定的时间字符串格式</param>
        /// <returns>获取格式化的时间字符串</returns>
        public static string GetDateTime(string formart)
        {
            return DateTime.Now.ToString(formart);
        }
        /// <summary>
        /// 描述：获取本地时间
        /// 作者：金广亮
        /// 时间：2012-1-17
        /// </summary>
        /// <returns>获取本地时间</returns>
        public static DateTime GetLocalTime()
        {
            return DateTime.Now.ToLocalTime();
        }
        /// <summary>
        /// 描述：获取短日期时间字符串
        /// 作者：金广亮
        /// 时间：2012-1-17
        /// </summary>
        /// <returns>获取短日期时间字符串</returns>
        public static string GetShortDate()
        {
            return DateTime.Now.ToShortDateString();
        }
        /// <summary>
        /// 描述：获取长时间时间字符串
        /// 作者：金广亮
        /// 时间：2012-1-17
        /// </summary>
        /// <returns>获取长时间时间字符串</returns>
        public static string GetLongDate()
        {
            return DateTime.Now.ToLongDateString();
        }

        /// <summary>
        /// 获取当前UTC标准时间（2012-9-4徐蓓添加）
        /// </summary>
        /// <param name="formart">字符串格式</param>
        /// <returns></returns>
        public static string GetUTCTime(string formart)
        {
            return DateTime.UtcNow.ToString(formart);
        }

        /// <summary>
        /// 获取当前UTC标准时间（2012-9-4徐蓓添加）
        /// </summary>
        /// <returns></returns>
        public static DateTime GetUTCTime()
        {
            return DateTime.UtcNow;
        }

        /// <summary>
        /// 获取当前UTC标准时间（2012-10-25徐蓓添加）
        /// </summary>
        /// <returns></returns>
        public static DateTime GetNow()
        {
            return DateTime.UtcNow;
        }

        #endregion
        //public static DateTime GetDateTime(string )
    }
}


