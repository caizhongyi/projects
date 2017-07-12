using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WanerDao2.WanerDaoModule.String;
using WanerDao2.WanerDaoModule.Config;
using WanerDao2.WanerDaoModule.RegexWapper;
using WanerDao2.WanerDaoExceptionManager;
using Newtonsoft.Json.Converters;

namespace WanerDao2.WanerDaoModule.Json
{
    /// <summary>
    /// 描述：JSON操作类
    /// 作者：金广亮
    /// 时间：2011-9-24
    /// </summary>
    public class WanerDaoJSON
    {
        public static Dictionary<string, object> GetContentInfo(string json)
        {
            json = WanerDaoString.UrlDecode(json);
            Dictionary<string, object> info = new Dictionary<string, object>();
            if (WanerDaoRegex.DecideUrlParam(json))
            {
                info = GetUrlContentInfo(json);
            }
            else
                info = GetJsonContentInfo(json);
            return info;
        }
        private static Dictionary<string, object> GetUrlContentInfo(string json)
        {
            Dictionary<string, object> info = new Dictionary<string, object>();
            List<object> fiterString = WanerDaoFilterReader.GetInValidList("inValidWorld");
            info = WanerDaoString.PaserPattern(json, fiterString);
            return info;
        }
        private static Dictionary<string, object> GetJsonContentInfo(string json)
        {
            Dictionary<string, object> info = new Dictionary<string, object>();
            IEnumerable<JProperty> propers = GetProperties(json);
            if (propers != null)
            {
                foreach (JProperty proper in propers)
                {
                    if (proper.Name.ToLower() != "opertype" && proper.Value.HasValues)
                    {
                        IEnumerable<JProperty> contents = GetProperties(proper.Value.ToString());
                        foreach (JProperty content in contents)
                        {
                            info.Add(content.Name, WanerDaoString.RemoveQuotation(content.Value.ToString()));
                        }
                    }
                    if (proper.Name.ToLower() != "opertype" && !proper.Value.HasValues)
                    {
                        info.Add(proper.Name, WanerDaoString.RemoveQuotation(proper.Value.ToString()));
                    }
                }
            }
            return info;
        }
        public static string GetUrlOperType(string urloper)
        {
            string opertype = string.Empty;
            string[] arrs = WanerDaoString.ParseArray(urloper, '&');
            foreach (string s in arrs)
            {
                string[] arr = WanerDaoString.ParseArray(s, '=');
                if (arr[0] == "opertype")
                {
                    opertype = arr[1];
                    break;
                }
            }
            return opertype;
        }
        public static string GetJsonOperType(string json)
        {
            IEnumerable<JProperty> propers = GetProperties(json);
            string opertype = string.Empty;
            if (propers != null)
            {
                foreach (JProperty proper in propers)
                {
                    if (proper.Name.ToLower() == "opertype")
                    {
                        opertype = WanerDaoString.RemoveQuotation(proper.Value.ToString());
                        break;
                    }
                }
            }
            return opertype;
        }
        private static IEnumerable<JProperty> GetProperties(string json)
        {
            IEnumerable<JProperty> proper = null;
            JObject o = ParseJson(json);
            if (o != null)
            {
                proper = o.Properties();
            }
            return proper;
        }
        /// <summary>
        /// 描述：解析JSON字符串为JObject对象
        /// 作者：金广亮
        /// 时间：2011-10-6
        /// </summary>
        /// <param name="json">json字符串</param>
        /// <returns>JObject对象</returns>
        public static JObject ParseJson(string json)
        {
            JObject o = null;
            try
            {
                o = JObject.Parse(json);
            }
            catch (Exception ex)
            {
                WanerDaoLog4Net.Write("解析JSON字符串为JObject对象出错", WanerDaoLog4Net.LogMessageType.Error, ex);
                return null;
            }
            return o;
        }
        /// <summary>
        /// 描述：返回错误JSON格式信息[result:false;msg:错误信息]
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="error">错误信息</param>
        /// <returns>JSON格式字符串提示信息</returns>
        public static string GetErrorJson(string error)
        {
            string errorinfo = string.Empty;
            JObject so = new JObject();
            so.Add(new JProperty("result", false));
            so.Add(new JProperty("msg", error));
            errorinfo = JsonConvert.SerializeObject(so);
            return errorinfo;
        }

        /// <summary>
        /// 描述：返回True JSON格式信息[result:true;obj:实体信息]
        /// 作者：杨晓东
        /// 时间：2012年1月2日
        /// </summary>
        /// <param name="modelObject">实体对象</param>
        /// <returns>JSON格式字符串提示信息</returns>
        public static string SerializeObject(object modelObject)
        {
            return "{\"result\":\"True\",\"obj\":" + JsonConvert.SerializeObject(modelObject) + "}";
        }

        /// <summary>
        /// 描述：返回成功JSON格式信息[result:true;msg:成功信息]
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="success">成功信息</param>
        /// <returns>JSON格式字符串提示信息</returns>
        public static string GetSuccessJson(string success)
        {
            string successinfo = string.Empty;
            JObject so = new JObject();
            so.Add(new JProperty("result", true));
            so.Add(new JProperty("msg", success));
            successinfo = JsonConvert.SerializeObject(so);
            return successinfo;
        }
        /// <summary>        
        /// 描述：返回成功JSON格式信息[result:true;其余信息可以自定义]
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="prepareJson">自定义参数</param>
        /// <returns>JSON格式字符串提示信息</returns>
        public static string GetSuccessJson(Dictionary<string, object> prepareJson)
        {
            return SerializeObject(true, prepareJson);
        }

        /// <summary>        
        /// 描述：任意对象返回成功JSON格式信息[result:true;data:其余信息可以自定义]
        /// 作者：徐兵
        /// 时间：2012-3-6
        /// </summary>
        /// <param name="obj">自定义对象</param>
        /// <returns>JSON格式字符串提示信息</returns>
        public static string GetSuccessJson(object obj)
        {
            return SerializeObject(true, obj);
        }
        /// <summary>        
        /// 描述：任意对象返回失败JSON格式信息[result:false;data:其余信息可以自定义]
        /// 作者：徐兵
        /// 时间：2012-3-6
        /// </summary>
        /// <param name="obj">自定义对象</param>
        /// <returns>JSON格式字符串提示信息</returns>
        public static string GetFailJson(object obj)
        {
            return SerializeObject(false, obj);
        }
        /// <summary>
        /// 描述：任意对象返回成功否JSON格式信息[result:true|false;data:其余信息可以自定义]
        /// 作者：徐兵
        /// 时间：2012-3-6
        /// </summary>
        /// <param name="flg"></param>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string SerializeObject(bool flg, object obj)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("result", flg);
            dic.Add("data", obj);
            return JsonConvert.SerializeObject(dic, JsonDateFormat );
        }
        private static IsoDateTimeConverter JsonDateFormat = 
            new IsoDateTimeConverter { DateTimeFormat = "yyyy'/'MM'/'dd' 'HH':'mm':'ss" };
        /// <summary>
        /// update by xubing at 2011-12-15
        /// 将访问限制private 修改为 public。
        /// </summary>
        /// <param name="flg"></param>
        /// <param name="prepareJson"></param>
        /// <returns></returns>
        public static string SerializeObject(bool flg, Dictionary<string, object> prepareJson)
        {
            prepareJson.Add("result", flg);
            return SerializeObject(prepareJson);
        }

        private static string SerializeObject(Dictionary<string, object> prepareJson)
        {
            string json = string.Empty;
            JObject so = new JObject();
            string listStr = "System.Collections.Generic.List`1[System.String]";
            foreach (KeyValuePair<string, object> dic in prepareJson)
            {
                if (dic.Value == null)
                {
                    so.Add(new JProperty(dic.Key,""));
                    continue;
                }
                if (dic.Value.GetType().IsGenericType)
                {

                    Type listType = dic.Value.GetType().GetInterface("IList");
                    if (listType != null)
                    {
                        Type t = dic.Value.GetType();
                        if (dic.Value.GetType() == Type.GetType(listStr))
                        {
                            JArray ja = new JArray();
                            List<string> strList = (List<string>)dic.Value;
                            foreach (string str in strList)
                            {
                                ja.Add(str);
                            }
                            so.Add(new JProperty(dic.Key, (JToken)ja));
                        }
                        else
                        {
                            List<Dictionary<string, object>> list = (List<Dictionary<string, object>>)dic.Value;
                            JArray ja = new JArray();
                            foreach (Dictionary<string, object> dicother in list)
                            {
                                JObject data = new JObject();
                                foreach (KeyValuePair<string, object> d in dicother)
                                {
                                    if (string.IsNullOrEmpty(d.Value.ToString()))
                                        data.Add(new JProperty(d.Key, string.Empty));
                                    else
                                        data.Add(new JProperty(d.Key, d.Value.ToString()));
                                }
                                ja.Add(data);
                            }
                            so.Add(new JProperty(dic.Key, (JToken)ja));
                        }
                    }
                    else
                    {
                        Type dicType = dic.Value.GetType().GetInterface("IDictionary");
                        if (dicType != null)
                        {
                            Dictionary<string, object> dicother = (Dictionary<string, object>)dic.Value;
                            JArray ja = new JArray();
                            JObject data = new JObject();
                            foreach (KeyValuePair<string, object> d in dicother)
                            {
                                if (d.Value.GetType() == Type.GetType(listStr))
                                {
                                    List<string> strList = (List<string>)d.Value;
                                    JArray jastr = new JArray();
                                    foreach (string str in strList)
                                    {
                                        jastr.Add(str);
                                    }
                                    data.Add(new JProperty(d.Key, (JToken)jastr));
                                }
                                else
                                {
                                    if (string.IsNullOrEmpty(d.Value.ToString()))
                                        data.Add(new JProperty(d.Key, string.Empty));
                                    else
                                        data.Add(new JProperty(d.Key, d.Value.ToString()));
                                }
                            }
                            ja.Add(data);
                            so.Add(new JProperty(dic.Key, (JToken)ja));
                        }
                    }
                }
                else
                {
                    if (string.IsNullOrEmpty(dic.Value.ToString()))
                        so.Add(new JProperty(dic.Key, string.Empty));
                    else
                        so.Add(new JProperty(dic.Key, dic.Value.ToString()));
                }
            }
            json = JsonConvert.SerializeObject(so);
            return json.Replace("0:00:00", "").Replace("12:00:00 AM", "").Replace("12:00:00", "");
        }
    }
}
