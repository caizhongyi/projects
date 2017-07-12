#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/3/21 21:12:26 
* 文件名：IndexConfigModel 
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
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoCacheManager;

namespace WanerDao2.WanerDaoModel.Index
{
    [Serializable]
    public class IndexConfigModel
    {
        private readonly string m_indexConfigPath = "IndexConfig\\IndexConfig.xml";
        public IndexConfigModel()
        {

        }
        public IndexConfigModel(string indexConfigPath, string table_name, string des, string content, string sqlkey)
        {
            if (indexConfigPath != null)
            {
                m_indexConfigPath = indexConfigPath;
            }
            this.table_name = table_name;
            this.description = des;
            this.content = content;
            this.sqlkey = sqlkey;
        }

        public string table_name { get; private set; }
        public string description { get; private set; }
        public string content { get; set; }
        public string sqlkey { get; set; }

        /// <summary>
        /// 获取配置文件所有项
        /// </summary>
        /// <returns></returns>
        public List<IndexConfigModel> GetIndexConfigList()
        {
            return GetIndexConfigList(null);
        }

        /// <summary>
        /// 根据id特性来获取某一项
        /// </summary>
        /// <param name="idAttribute">id特性值(不能为Null,为Null是获取所有节点)</param>
        /// <returns></returns>
        public List<IndexConfigModel> GetIndexConfigList(string idAttribute)
        {
            List<IndexConfigModel> cfgListMod = new List<IndexConfigModel>();
            Dictionary<string, Dictionary<string, string>> configList;
            //获取配置的XML文件 底层加的有缓存
            configList = WanerDaoModule.Config.WanerDaoConfigReader.GetIndexConfig(m_indexConfigPath, idAttribute);
            Dictionary<string, string> item = configList[idAttribute];
            if (item == null) return null;
            this.table_name = item["id"];
            this.description = item["description"];
            this.content = item["content"];
            this.sqlkey = item["sqlkey"];
            cfgListMod.Add(this);
            return cfgListMod;
        }

    }
}
