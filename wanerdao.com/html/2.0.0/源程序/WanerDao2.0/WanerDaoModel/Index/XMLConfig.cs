#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/3/25 16:01:59 
* 文件名：XMLConfig 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion

using System.Collections.Generic;

namespace WanerDao2.WanerDaoModel.Index
{
    internal class XMLConfig
    {
        //private static XMLConfig xmlConfigInstance;
        //private static readonly object syncRoot = new object();
        //public static XMLConfig GetInstance(string data_id)
        //{
        //    if (xmlConfigInstance == null)
        //    {
        //        lock (syncRoot)
        //        {
        //            if (xmlConfigInstance == null)
        //            {
        //                xmlConfigInstance = new XMLConfig("HomeSQL", data_id);
        //            }
        //        }
        //    }
        //    return xmlConfigInstance;
        //}

        public XMLConfig(string sqlkey, string data_id)
        {
            if (!string.IsNullOrEmpty(data_id))
            {
                SQLDic = new Dictionary<string, object>() { { "data_id", data_id } };
            }
            SQLFileName = "HomeSQL";
            SQLKey = sqlkey;
            //NewFeeds_SQLKey = "Index_GetNewFeeds";
            //LinkFeeds_SQLKey = "Index_GetNewLinkFeeds";
            //PersonalImage_SQLKey = "Index_GetPersonalImage";
            //PersonalVideo_SQLKey = "Index_GetPersonalVideo";
            //PersonalBlog_SQLKey = "Index_GetPersonalBlog";
            //Activity_SQLKey = "Index_GetActivity";
        }

        public Dictionary<string, object> SQLDic { get; set; }
        public string SQLFileName { get; private set; }
        public string SQLKey { get; private set; }
        //public string NewFeeds_SQLKey { get; private set; }
        //public string LinkFeeds_SQLKey { get; private set; }
        //public string PersonalImage_SQLKey { get; private set; }
        //public string PersonalVideo_SQLKey { get; private set; }
        //public string PersonalBlog_SQLKey { get; private set; }
        //public string Activity_SQLKey { get; private set; }
    }
}
