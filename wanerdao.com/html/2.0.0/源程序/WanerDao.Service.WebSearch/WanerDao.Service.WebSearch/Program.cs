using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using WanerDao.Indexing.Database;

namespace WanerDao.Service.WebSearch
{
    static class Program
    {
        /// <summary>
        /// 应用程序的主入口点。
        /// </summary>
        static void Main()
        {
            ServiceBase[] ServicesToRun;
            ServicesToRun = new ServiceBase[] 
            { 
                new IndexingService() 
            };
            ServiceBase.Run(ServicesToRun);

            //DataBaseIndexing db = new DataBaseIndexing();
            //db.IndexDatabase();
            //////  int resultCount;//Person
            ////// // db.Search("D:\\DicIndex\\index", "测试");
            //string d = db.FacetedSearch("D:\\DicIndex\\", "group", @"a1c3e20e\-", "测试");
            //string s = db.FacetedSearch("D:\\DicIndex\\", "group", "测试", 1, 10);
            //string s2 = db.GetSearchCount("测试", "all");
            //string s3 = db.GetSearchCount("测试", "person,group,activity,other,posts");

        }
    }
}
