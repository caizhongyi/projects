using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModule.String;
using WanerDao2.WanerDaoModule.Json;
using System.Text.RegularExpressions;
using System.Globalization;
using WanerDao2.WanerDaoModule.RegexWapper;

namespace WanerDao2.WanerDaoModule.Validation
{
    /// <summary>
    /// 描述:效验类
    /// 描述：金广亮
    /// 时间：2011-9-24
    /// </summary>
    public class WanerDaoValidation
    {
        /// <summary>
        /// 描述：效验传递的参数是否含有操作符
        /// 描述：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="parameters">传递参数</param>
        /// <returns>具有合法参数返回所需操作名称，否则string.empty</returns>
        public static string ValidateParamters(string parameters)
        {
            string jsondata = WanerDaoString.UrlDecode(parameters);
            string typestr = GetOperType(jsondata).ToLower();
            return typestr;
        }

        /// <summary>
        /// 描述：获取操作符
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string GetOperType(string json)
        {
            string opertype = string.Empty;
            if (WanerDaoRegex.DecideUrlParam(json))
            {
                opertype = WanerDaoJSON.GetUrlOperType(json);
            }
            else
                opertype = WanerDaoJSON.GetJsonOperType(json);
            return opertype;
        }

        /// <summary>
        /// 描述：检查参数长度
        /// 作者：杨晓东
        /// 时间：2011-9-29
        /// </summary>
        /// <param name="param">传入的参数</param>
        /// <param name="checkForNull">检查NULL</param>
        /// <param name="checkIfEmpty">是否为空</param>
        /// <param name="checkForCommas">检查逗号</param>
        /// <param name="maxSize">最大长度</param>
        /// <returns>bool</returns>
        public static bool ValidateParameter(ref string param, bool checkForNull, bool checkIfEmpty, bool checkForCommas, int maxSize)
        {
            if (param == null)
            {
                if (checkForNull)
                    return false;

                return true;
            }
            param = param.Trim();
            if ((checkIfEmpty && param.Length < 1) || (maxSize > 0 && param.Length > maxSize) || (checkForCommas && param.IndexOf(",") != -1))
                return false;

            return true;
        }

        /// <summary>
        /// 验证邮箱是否符合要求
        /// </summary>
        /// <param name="emial">邮箱</param>
        /// <returns></returns>
        public static bool ValidateEmail(string emial) {
            Regex reg = new Regex(@"^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$");
            if (reg.IsMatch(emial.Trim()) && emial.Trim().Length<60)
            {
                return true;
            }
            return false;
        }


        #region Object转换为int 类型
        /// <summary>
        /// 转换为int类型
        /// 作者：王渝友
        /// 时间：2011-11-15
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="defaultValue">返回的默认值</param>
        /// <param name="numStyle">数字格式</param>
        /// <returns></returns>
        public static int ConvertToInt(object obj, int defaultValue, NumberStyles numStyle)
        {
            int result = defaultValue;
            if (obj != null && obj != DBNull.Value)
            {
                if (!int.TryParse(obj.ToString().Trim(), numStyle, null, out result))
                {
                    result = defaultValue;
                }
            }
            return result;
        }

        /// <summary>
        /// 转换为int类型
        /// 作者：王渝友
        /// 时间：2011-11-15
        /// </summary>
        /// <param name="obj">Object类型</param>
        /// <param name="defaultValue">如转换失败，赋一个默认值</param>
        /// <returns>返回为int类型，如转换失败，返回值为默认值</returns>
        public static int ConvertToInt(object obj, int defaultValue)
        {
            return ConvertToInt(obj, defaultValue, NumberStyles.Number);
        }

        /// <summary>
        /// 转换为int类型
        /// 作者：王渝友
        /// 时间：2011-11-15
        /// </summary>
        /// <param name="obj">Object类型</param>
        /// <returns>返回为int类型，如转换失败，返回值为0</returns>
        public static int ConvertToInt(object obj)
        {
            return ConvertToInt(obj, 0);
        }
        #endregion

        #region
        /// <summary>
        /// 验证字典里的值是否合法且为int类型（徐蓓2012-8-14添加）
        /// </summary>
        /// <param name="dic">字典对象</param>
        /// <param name="key">字典的键</param>
        /// <returns></returns>
        public static int ValidateInt(IDictionary<string, object> dic, string key)
        {
            int result = 0;
            if (dic != null && dic.ContainsKey(key))
            {
                int.TryParse(dic[key].ToString(), out result);
            }
            return result;
        }
        /// <summary>
        ///  验证字典里的值是否为合法且为string类型（徐蓓2012-8-14添加）
        /// </summary>
        /// <param name="dic">字典对象</param>
        /// <param name="key">字典的键</param>
        /// <returns></returns>
        public static string ValidateString(IDictionary<string, object> dic, string key)
        {
            string result = string.Empty;
            if (dic != null && dic.ContainsKey(key))
            {
                result = dic[key].ToString();
            }
            return result;
        }
        #endregion
    }
}
