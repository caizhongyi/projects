using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanDaoIDAL;
using System.Data.Common;

namespace WanerDao2.WanerDaoDALFactory
{
    public class DbHelperFactory
    {
        /// <summary>
        /// DbProviderFactory实例
        /// </summary>
        private static WanerDaoDbWrapper instance = null;

        /// <summary>
        /// DbFactory实例
        /// </summary>
        public static WanerDaoDbWrapper SingleInstance()
        {
            if (instance == null)
            {
                instance = new WanerDaoDbWrapper();
            }
            return instance;
        }

    }
}
