using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoCacheManager;
using WanerDao2.WanerDaoModule.XML;
using System.Xml;

namespace WanerDao2.WanerDaoModule.Config
{
    /// <summary>
    /// 描述:玩儿道配置文件读取（例如WanerDaoConfig.xml，除配置SQL脚本的xml）
    /// 创建者：金广亮
    /// 创建时间：2011-9-21
    /// </summary>
    public class WanerDaoConfigReader
    {
        /// <summary>
        /// 描述：读取玩儿道配置文件
        /// </summary>
        /// <param name="relatePath">相对路径(例如DbConfig)</param>
        /// <param name="fileName">配置文件名</param>
        /// <param name="key">查询配置文件中key的名称</param>
        /// <returns>成功返回结果，否则返回string.Empty</returns>
        public static string GetConfigXml(string relatePath, string fileName, string key)
        {
            string strConfig = string.Empty;
            ICacheStrategy ics = WanerDaoCacheFactory.SingleInstance().GetStrategy(CacheType.CacheHashtable);
            if (!ics.ObjectIsExist(key))
            {
                XmlDocument xmlDoc = new XmlDocument();
                if (!fileName.Contains(".xml"))
                {
                    fileName = fileName + ".xml";
                }
                string fullFilename = WanerDaoBaseConfig.WorkingDir + "\\" + relatePath + "\\" + fileName;
                xmlDoc.Load(fullFilename);
                XmlNamespaceManager nsmgr = new XmlNamespaceManager(xmlDoc.NameTable);
                nsmgr.AddNamespace("nmsp", xmlDoc.DocumentElement.NamespaceURI);
                XmlNodeList nodelist = xmlDoc.DocumentElement.SelectNodes("//nmsp:add", nsmgr);
                foreach (XmlNode xn in nodelist)
                {
                    string xnKey = WanerDaoXml.GetAttribute(xn, "key");
                    if (key == xnKey)
                    {
                        string xnValue = WanerDaoXml.GetAttribute(xn, "value");
                        ics.AddObject(key, xnValue);
                        strConfig = xnValue;
                        break;
                    }
                }
            }
            else
            {
                strConfig = ics.RetrieveObject(key).ToString();
            }
            return strConfig;
        }

        /// <summary>
        /// 获取IndexConfig文件
        /// </summary>
        /// <param name="path">IndexConfig\\IndexConfig.xml</param>
        /// <returns></returns>
        public static Dictionary<string, Dictionary<string, string>> GetIndexConfig(string path)
        {
            return GetIndexConfig(path, null);
        }
        /// <summary>
        /// 根据ID节点获取IndexConfig文件
        /// </summary>
        /// <param name="path">IndexConfig\\IndexConfig.xml</param>
        /// <returns></returns>
        public static Dictionary<string, Dictionary<string, string>> GetIndexConfig(string path, string idattribute)
        {
            if (path == null) path = "IndexConfig\\IndexConfig.xml";
            Dictionary<string, Dictionary<string, string>> List = new Dictionary<string, Dictionary<string, string>>();
            Dictionary<string, string> dic;
            ICacheStrategy ics = WanerDaoCacheFactory.SingleInstance().GetStrategy(CacheType.CacheHashtable);
            if (!ics.ObjectIsExist(path))
            {
                XmlDocument xmlDoc = new XmlDocument();
                if (!path.Contains(".xml"))
                {
                    path = path + ".xml";
                }
                string fullFilename = WanerDaoBaseConfig.WorkingDir + "\\" + path;
                xmlDoc.Load(fullFilename);
                XmlNodeList nodelist = xmlDoc.DocumentElement.SelectNodes("//index//category");
                foreach (XmlNode xn in nodelist)
                {
                    dic = new Dictionary<string, string>();
                    string id = WanerDaoXml.GetAttribute(xn, "id").ToLower();
                    if (idattribute != null||id == idattribute.ToLower())
                    {
                        dic.Add("id", id);
                        dic.Add("description", WanerDaoXml.GetAttribute(xn, "description"));
                        dic.Add("sqlkey", WanerDaoXml.GetAttribute(xn, "sqlkey"));
                        dic.Add("content", xn.InnerText);
                        List.Add(id, dic);
                    }
                }
                ics.AddObject(path, List);
                return List;
            }
            else
            {
                return ics.RetrieveObject(path) as Dictionary<string, Dictionary<string, string>>;
            }
        }

        /// <summary>
        /// 描述：读取相对路径下的配置文件
        /// </summary>
        /// <param name="relatePath">相对路径</param>
        /// <param name="fileName">文件名，可以带扩展名也可以不带</param>
        /// <param name="elementname">节点名称</param>
        /// <param name="idname">ID或者其他描述符</param>
        /// <param name="key">ID名称</param>
        /// <returns>成功返回结果，否则返回string.Empty</returns>
        public static string GetConfigXml(string relatePath, string fileName, string elementname, string idname, string key)
        {
            string strConfig = string.Empty;
            ICacheStrategy ics = WanerDaoCacheFactory.SingleInstance().GetStrategy(CacheType.CacheHashtable);
            if (!ics.ObjectIsExist(key))
            {
                XmlDocument xmlDoc = new XmlDocument();
                if (!fileName.Contains(".xml"))
                {
                    fileName = fileName + ".xml";
                }
                string fullFilename = WanerDaoBaseConfig.WorkingDir + "\\" + relatePath + "\\" + fileName;
                xmlDoc.Load(fullFilename);
                XmlNamespaceManager nsmgr = new XmlNamespaceManager(xmlDoc.NameTable);
                nsmgr.AddNamespace("nmsp", xmlDoc.DocumentElement.NamespaceURI);
                XmlNodeList nodelist = xmlDoc.DocumentElement.SelectNodes("//nmsp:" + elementname, nsmgr);
                foreach (XmlNode xn in nodelist)
                {
                    string xnKey = WanerDaoXml.GetAttribute(xn, idname);
                    if (key == xnKey)
                    {
                        string xnValue = xn.InnerText;
                        ics.AddObject(key, xnValue);
                        strConfig = xnValue;
                        break;
                    }
                }
            }
            else
            {
                strConfig = ics.RetrieveObject(key).ToString();
            }
            return strConfig;
        }
        /// <summary>
        /// 描述：读取相对路径下的配置文件
        /// </summary>
        /// <param name="relatePath">相对路径</param>
        /// <param name="fileName">文件名，可以带扩展名也可以不带</param>
        /// <param name="elementname">节点名称</param>
        /// <param name="key">ID名称</param>
        /// <returns>成功返回结果，否则返回string.Empty</returns>
        public static string GetConfigXml(string relatePath, string fileName, string elementname, string key)
        {
            return GetConfigXml(relatePath, fileName, elementname, "ID", key);
        }
        /// <summary>
        /// 描述：读取玩儿道配置文件
        /// </summary>
        /// <param name="fileName">配置文件名(不需要带扩展名)</param>
        /// <param name="key">查询配置文件中key的名称</param>
        /// <returns>成功返回结果，否则返回string.Empty</returns>
        public static string GetConfigXml(string fileName, string key)
        {
            string strConfig = string.Empty;
            ICacheStrategy ics = WanerDaoCacheFactory.SingleInstance().GetStrategy(CacheType.CacheHashtable);
            if (!ics.ObjectIsExist(key))
            {
                XmlDocument xmlDoc = new XmlDocument();
                string fullFilename = WanerDaoBaseConfig.WorkingDir + fileName + ".xml";
                try
                {
                    xmlDoc.Load(fullFilename);
                }
                catch (System.Exception ex)
                {
                    throw ex;
                }

                XmlNamespaceManager nsmgr = new XmlNamespaceManager(xmlDoc.NameTable);
                nsmgr.AddNamespace("nmsp", xmlDoc.DocumentElement.NamespaceURI);
                XmlNodeList nodelist = xmlDoc.DocumentElement.SelectNodes("//nmsp:add", nsmgr);
                foreach (XmlNode xn in nodelist)
                {
                    string xnKey = WanerDaoXml.GetAttribute(xn, "key");
                    if (key == xnKey)
                    {
                        string xnValue = WanerDaoXml.GetAttribute(xn, "value");
                        ics.AddObject(key, xnValue);
                        strConfig = xnValue;
                        break;
                    }
                }
            }
            else
            {
                strConfig = ics.RetrieveObject(key).ToString();
            }
            return strConfig;
        }

        #region WanerDaoConfig.xml读取
        /// <summary>
        /// 获取 临时文件存储目录
        /// </summary>
        /// <returns></returns>
        public static string GetTempFilePath()
        {
            string _tempPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoServerTempFilePath").Trim().Trim(new char[] { '\\', '/' });
            return _tempPath;
        }

        /// <summary>
        /// 获取 天气预报接口地址
        /// </summary>
        /// <returns></returns>
        public static string GetWeatherUrl()
        {
            string _tempPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoWeatherUrl");
            return _tempPath;
        }
        /// <summary>
        /// 获取 yahoo天气预报城市CODE查找地址
        /// </summary>
        /// <returns></returns>
        public static string GetWeatherCityCodeUrl()
        {
            string _tempPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoWeatherCityCodeUrl").Trim();
            return _tempPath;
        }
        /// <summary>
        /// 获取 yahoo天气图片地址
        /// </summary>
        /// <returns></returns>
        public static string GetWeatherImage()
        {
            string _tempPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoWeatherImage").Trim();
            return _tempPath;
        }

        /// <summary>
        /// 获取网站域名
        /// </summary>
        /// <returns></returns>
        public static string GetSiteDomain()
        {
            return WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerdaoSiteDomain").Trim();
        }

        #endregion
    }
}
