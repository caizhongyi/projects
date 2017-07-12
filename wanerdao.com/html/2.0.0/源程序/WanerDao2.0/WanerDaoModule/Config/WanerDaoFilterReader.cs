using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.Collections;
using WanerDao2.WanerDaoModule.String;
using WanerDao2.WanerDaoModule;
using WanerDao2.WanerDaoCacheManager;
using WanerDao2.WanerDaoModule.TipInfo;
using System.Data;
using WanerDao2.WanerDaoModule.Json;
using System.Xml.Linq;

namespace WanerDao2.WanerDaoModule.Config
{
    /// <summary>
    /// 描述：过滤配置文件读取
    /// 作者：金广亮
    /// 时间：2011-9-24
    /// </summary>
    public class WanerDaoFilterReader
    {
        private static ICacheStrategy ics = WanerDaoCacheFactory.SingleInstance().GetStrategy(CacheType.CacheHashtable);

        /// <summary>
        /// 描述：读取非法字符
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>        
        /// <param name="filterNode">节点名称</param>
        /// <returns>非法字符串列表</returns>
        public static List<object> GetInValidList(string filterNode)
        {
            List<object> list = new List<object>();
            XmlDocument xmlDoc = GetXmlDocumet(GetPath("FilterConfig", "FilterConfig"));
            XmlNode xn = xmlDoc.SelectSingleNode("FilterWord/FilterType[@name='" + filterNode + "']/FilterList");
            string filterlist = xn.InnerText;
            string[] filterArray = WanerDaoString.ParseArray(xn.InnerText, '|', ',', ';');
            foreach (string filter in filterArray)
            {
                list.Add(filter);
            }
            return list;
        }
        /// <summary>
        /// 描述：读取页面跳转页面
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="node">节点名称</param>
        /// <returns>返回配置跳转URL</returns>
        public static string GetGoUrl(string node)
        {
            XmlDocument xmlDoc = GetXmlDocumet(GetPath("UrlConfig", "GoURLConfig"));
            XmlNode xn = xmlDoc.SelectSingleNode("GotoPathRoot/GotoPath[@name='" + node + "']/UrlPath");
            return xn.InnerText;
        }

        /// <summary>
        /// 描述：读取经验积分数
        /// 作者：胥鑫
        /// 时间：2011-11-04
        /// </summary>
        /// <param name="node">节点名称</param>
        /// <returns>返回积分数</returns>
        public static string GetIntegral(string node)
        {
            XmlDocument xmlDoc = GetXmlDocumet(GetPath("Integral", "IntegralConfig"));
            XmlNode xn = xmlDoc.SelectSingleNode("GotoRoot/GotoIntegral[@name='" + node + "']/Integral");
            return xn.InnerText;
        }

        /// <summary>
        /// 描述：读取关注度系数
        /// 作者：胥鑫
        /// 时间：2011-11-24
        /// </summary>
        /// <param name="node">节点名称</param>
        /// <returns>返回系数</returns>
        public static string GetFollow(string node)
        {
            XmlDocument xmlDoc = GetXmlDocumet(GetPath("paramConfig", "followConfig"));
            XmlNode xn = xmlDoc.SelectSingleNode("FollowRoot/FollowIntegral[@name='" + node + "']/Integral");
            return xn.InnerText;
        }

        /// <summary>
        /// 描述：读取圈子列表参数
        /// 作者：胥鑫
        /// 时间：2011-12-24
        /// </summary>
        /// <param name="node">节点名称</param>
        /// <returns>返回系数</returns>
        public static string GetGroupParamList(string node)
        {
            List<object> list = new List<object>();
            XmlDocument xmlDoc = GetXmlDocumet(GetPath("paramConfig", "groupConfig"));
            XmlNode xn = xmlDoc.SelectSingleNode("GroupRoot/GroupIntegral[@name='" + node + "']/Integral");
            string[] ParamArray = WanerDaoString.ParseArray(xn.InnerText, '|', ',', ';');
            DataTable DT = new DataTable();
            DT.Columns.Add(new DataColumn("value", typeof(string)));
            DT.Columns.Add(new DataColumn("text", typeof(string)));
            foreach (string Param in ParamArray)
            {
                string[] PA = WanerDaoString.ParseArray(Param, '-');
                DataRow DR = DT.NewRow();
                DR["value"] = PA[0].ToString();
                DR["text"] = PA[1].ToString();
                DT.Rows.Add(DR);
            }

            return ConvertDataTableToJSON(DT);
        }


        /// <summary>
        /// 描述：读取打印模板
        /// 作者：胥鑫
        /// 时间：2012-2-20
        /// </summary>
        /// <param name="node">节点名称</param>
        /// <returns>返回系数</returns>
        public static XmlNodeList GetPrintTemplete(string xmlName)
        {
            List<object> list = new List<object>();
            XmlDocument xmlDoc = GetXmlDocumet(GetPath("printConfig", xmlName));
            XmlNode x = xmlDoc.SelectSingleNode("printBody");
            XmlNodeList xnl = x.ChildNodes;
            return xnl;
            //foreach (XmlNode xn in xnl) {
            //   h.Add( xn.Name,xn.InnerText );
            //}
            //return h;
        }

        /// <summary>
        /// 描述：默认设置参数
        /// 作者：胥鑫
        /// 时间：2012-1-7
        /// </summary>
        /// <param name="node">节点名称</param>
        /// <returns>返回系数</returns>
        public static string GetParam(string node)
        {
            XmlDocument xmlDoc = GetXmlDocumet(GetPath("paramConfig", "paramConfig"));
            XmlNode xn = xmlDoc.SelectSingleNode("ParamRoot/ParamIntegral[@name='" + node + "']/Integral");
            return xn.InnerText;
        }

        /// <summary>
        /// 读取轮询XML配置文件
        /// 作者:杨晓东
        /// 时间:2012年4月4日
        /// </summary>
        /// <returns>key为接口的名称 value为(class字典)</returns>
        public static Dictionary<string, Dictionary<string, string>> GetPolling()
        {
            Dictionary<string, Dictionary<string, string>> xmlDic = new Dictionary<string, Dictionary<string, string>>();
            XDocument xDoc = XDocument.Load(GetPath("pollingConfig", "InterfaceConfig"));
            var query = from x in xDoc.Descendants("interface")
                        select new
                        {
                            InterfaceName = x.Attribute("name").Value,
                            Class = x.Descendants("class")
                        };
            foreach (var item in query)
            {
                Dictionary<string, string> classDic = new Dictionary<string, string>();
                foreach (var item2 in item.Class)
                {
                    classDic.Add("assembly", item2.Attribute("assembly").Value);
                    classDic.Add("name", item2.Attribute("name").Value);
                    classDic.Add("fullName", item2.Attribute("fullName").Value);
                }
                xmlDic.Add(item.InterfaceName, classDic);
            }
            return xmlDic;
        }
        /// <summary>
        /// 加载帮助信息
        /// </summary>
        public static void setXML()
        {
            string tip = string.Empty;
            tip = WanerDaoGlobalTip.GetClientLanguage();
            //string[] languages = HttpContext.Current.Request.UserLanguages;
            //if (languages == null)
            //{
            //    tip = "en-us";// WanerDaoConfigReader.GetConfigXml("TipConfig", "en-us", "Info", key);
            //}
            //else
            //    tip = languages[0].ToLower();// WanerDaoConfigReader.GetConfigXml("TipConfig", languages[0].ToLower(), "Info", key);
            //string path = HttpContext.Current.Request.PhysicalApplicationPath;

            HttpContext.Current.Application.Add("helpTime", DateTime.Now);
            XmlDocument xmlDoc = GetXmlDocumet(GetPath("helpConfig", tip));
            XmlNode Root_Node = xmlDoc.SelectSingleNode("helpBody");
            if (Root_Node != null)
            {
                foreach (XmlNode item in Root_Node.ChildNodes)
                {
                    HttpContext.Current.Application.Add(item.Name, item.InnerText);
                }
            }

        }

        public static XmlDocument GetTreeJson(string xmltext)
        {
            XmlDocument doc = GetXmlDocumet(xmltext);
            return doc;
        }
        private static XmlDocument GetXmlDocumet(string path)
        {
            XmlDocument xmlDoc = new XmlDocument();
            if (path.Contains("version=\"1.0\""))
            {
                xmlDoc.LoadXml(path);
            }
            else
                xmlDoc.Load(path);
            return xmlDoc;
        }
        private static string GetPath(string filepath, string filename)
        {
            string path = string.Empty;
            if (!ics.ObjectIsExist(filename))
            {
                path = WanerDaoBaseConfig.WorkingDir + filepath + "\\" + filename + ".xml";
                ics.AddObject(filename, path);
            }
            else
                path = ics.RetrieveObject(filename).ToString();
            return path;
        }

        /// <summary>
        /// 描述：把DataTable转换成JSON格式字符串
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="dt">DataTable数据集</param>
        /// <returns>JSON格式字符串</returns>
        private static string ConvertDataTableToJSON(DataTable dt)
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

        /// <summary>
        /// 描述：读取url中的替换符
        /// 作者：徐蓓
        /// 时间：2011-11-04
        /// </summary>
        /// <param name="nodeName">节点名称</param>
        /// <returns>返回替换符</returns>
        public static string GetUrlAlternate(string nodeName)
        {
            XmlDocument xmlDoc = GetXmlDocumet(GetPath("UrlConfig", "URLAlternate"));
            XmlNode xn = xmlDoc.SelectSingleNode("url/alternate[@name='" + nodeName + "']/value");
            return xn.InnerText;
        }
    }
}
