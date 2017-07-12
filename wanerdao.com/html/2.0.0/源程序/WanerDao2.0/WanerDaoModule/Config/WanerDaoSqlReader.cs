using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoCacheManager;
using System.Xml;
using WanerDao2.WanerDaoModule.XML;
using System.Text.RegularExpressions;

namespace WanerDao2.WanerDaoModule.Config
{
    /// <summary>
    /// 描述：本类用来读取SQL配置信息并用缓存配置
    /// 创建者：金广亮
    /// 创建时间：2011-9-20
    /// </summary>
    public class WanerDaoSqlReader
    {
        /// <summary>
        /// 描述：读取SQL配置文件
        /// </summary>
        /// <param name="fileName">配置文件名(不用加后缀)</param>
        /// <param name="key">查询配置文件中key的名称</param>
        /// <returns>成功返回结果，否则返回空</returns>
        public static string GetSQLStatement(string fileName, string key)
        {
            string strConfig = string.Empty;
            ICacheStrategy ics = WanerDaoCacheFactory.SingleInstance().GetStrategy(CacheType.CacheHashtable);
            if (!ics.ObjectIsExist(key))
            {
                XmlDocument xmlDoc = new XmlDocument();
                string fullFilename = WanerDaoBaseConfig.WorkingDir + "DbConfig\\SQL\\" + fileName+".xml";
                xmlDoc.Load(fullFilename);
                XmlNamespaceManager nsmgr = new XmlNamespaceManager(xmlDoc.NameTable);
                nsmgr.AddNamespace("nmsp", xmlDoc.DocumentElement.NamespaceURI);
                //XmlNodeList nodelist = xmlDoc.DocumentElement.SelectNodes("//nmsp:SQL", nsmgr);
                //foreach (XmlNode xn in nodelist)
                //{
                //    string xnKey = WanerDaoXml.GetAttribute(xn, "ID");
                //    if (key == xnKey)
                //    {
                //        string xnValue = xn.InnerText;//WanerDaoXml.GetAttribute(xn, "value");
                //        xnValue = ReplaceSql(xnValue);
                //        ics.AddObject(key, xnValue);
                //        strConfig = xnValue;
                //        break;
                //    }
                //}
                //update by xubing at 2012-9-15
                XmlNode _xn = xmlDoc.DocumentElement.SelectSingleNode("//nmsp:"+GetCreateXPath(key), nsmgr);
                if (_xn != null)
                {
                    strConfig = _xn.InnerText;
                    strConfig = ReplaceSql(strConfig);
                    ics.AddObject(key, strConfig);
                }
                return strConfig;
            }
            else
            {
                strConfig = ics.RetrieveObject(key).ToString();
            }
            return strConfig;
        }
        private static string ReplaceSql(string sql)
        {
            return Regex.Replace(sql, @"\t|\r|\n", "");
        }
        private const string IDPath = "SQL[@ID='{0}']";
        private const string ModulePath = "Module[@ID='{0}']/nmsp:SQL[@ID='{1}']";
        private static string GetCreateXPath( string key)
        {
            string _rStr = string.Format(IDPath, key);

            string[] strArray = key.Split('/');
            if (strArray.Length==2)
            {
                _rStr = string.Format(ModulePath, strArray[0], strArray[1]);
            }
            return _rStr;
        }
    }
}
