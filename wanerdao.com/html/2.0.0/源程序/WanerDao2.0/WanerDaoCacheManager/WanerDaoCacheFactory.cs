using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WanerDao2.WanerDaoCacheManager
{
    public enum CacheType
    {
        CacheHashtable,
        CacheDictionary,
        CacheHttpCache
    }
    public class WanerDaoCacheFactory
    {
        private static WanerDaoCacheFactory instance = null;
        private static ICacheStrategy Ics = null;
        private static object syncObj = new object();
        /// <summary>
        /// 单体模式返回当前类的实例
        /// </summary>
        /// <returns></returns>
        public static WanerDaoCacheFactory SingleInstance()
        {
            if (instance == null)
            {
                lock (syncObj)
                {
                    if (instance == null)
                    {
                        instance = new WanerDaoCacheFactory();
                    }
                }
            }
            return instance;
        }
        /// <summary>
        /// 描述：选择缓存类型。0默认HttpRuntime.Cache缓存，1为Hashtable内存缓存，2为dictionary内存缓存
        /// 创建者：金广亮
        /// 创建时间：2011-9-20
        /// </summary>
        /// <param name="strategy"></param>
        /// <returns></returns>
        public ICacheStrategy GetStrategy(CacheType cacheType)
        {
            switch (cacheType)
            {
                case CacheType.CacheHttpCache:
                    if (Ics != null && Ics is DefaultCacheStrategy)
                    {
                        return Ics;
                    }
                    else
                    {
                        Ics = new DefaultCacheStrategy();
                    }
                    break;
                case CacheType.CacheHashtable:
                    if (Ics != null && Ics is WanerDaoHtCacheStrategy)
                    {
                        return Ics;
                    }
                    else
                    {
                        Ics = new WanerDaoHtCacheStrategy();
                    }
                    break;
                case CacheType.CacheDictionary:
                    if (Ics != null && Ics is WanerDaoDicCacheStrategy)
                    {
                        return Ics;
                    }
                    else
                    {
                        Ics = new WanerDaoDicCacheStrategy();
                    }
                    break;
            }
            return Ics;
            
        }
    }
}
