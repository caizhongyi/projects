﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Web;
using System.Web.Caching;

namespace WanerDao2.WanerDaoCacheManager
{
    /// <summary>
    /// 描述：使用HttpRuntime.Cache实现内存缓存
    /// 创建者：金广亮
    /// 创建时间：2011-9-21
    /// </summary>
    public class DefaultCacheStrategy : ICacheStrategy
    {
        protected static volatile System.Web.Caching.Cache webCache = System.Web.HttpRuntime.Cache;

        /// <summary>
        /// 默认缓存存活期为3600秒(1小时)
        /// </summary>
        protected int _timeOut = 3600;

        private static object syncObj = new object();

        /// <summary>
        /// 构造函数
        /// </summary>
        static DefaultCacheStrategy()
        {
            //lock (syncObj)
            //{
            //    //System.Web.HttpContext context = System.Web.HttpContext.Current;
            //    //if(context != null)
            //    //    webCache = context.Cache;
            //    //else
            //    webCache = System.Web.HttpRuntime.Cache;
            //}	
        }



        /// <summary>
        /// 设置到期相对时间[单位: 秒] 
        /// </summary>
        public virtual int TimeOut
        {
            set { _timeOut = value > 0 ? value : 3600; }
            get { return _timeOut > 0 ? _timeOut : 3600; }
        }


        public static System.Web.Caching.Cache GetWebCacheObj
        {
            get { return webCache; }
        }

        /// <summary>
        /// 加入当前对象到缓存中
        /// </summary>
        /// <param name="objId">对象的键值</param>
        /// <param name="o">缓存的对象</param>
        public virtual void AddObject(string objId, object o)
        {
            if (objId == null || objId.Length == 0 || o == null)
            {
                return;
            }

            if (TimeOut == 7200)
            {
                webCache.Insert(objId, o, null, DateTime.MaxValue, TimeSpan.Zero, System.Web.Caching.CacheItemPriority.High, null);
            }
            else
            {
                webCache.Insert(objId, o, null, DateTime.Now.AddSeconds(TimeOut), System.Web.Caching.Cache.NoSlidingExpiration, System.Web.Caching.CacheItemPriority.High, null);
            }
        }

        /// <summary>
        /// 加入当前对象到缓存中
        /// </summary>
        /// <param name="objId">对象的键值</param>
        /// <param name="o">缓存的对象</param>
        /// <param name="o">到期时间,单位:秒</param>
        public virtual void AddObject(string objId, object o, int expire)
        {
            if (objId == null || objId.Length == 0 || o == null)
            {
                return;
            }

            //表示永不过期
            if (expire == 0)
            {
                webCache.Insert(objId, o, null, DateTime.MaxValue, TimeSpan.Zero, System.Web.Caching.CacheItemPriority.High, null);
            }
            else
            {
                webCache.Insert(objId, o, null, DateTime.Now.AddSeconds(expire), System.Web.Caching.Cache.NoSlidingExpiration, System.Web.Caching.CacheItemPriority.High, null);
            }
        }


        /// <summary>
        /// 加入当前对象到缓存中,并对相关文件建立依赖
        /// </summary>
        /// <param name="objId">对象的键值</param>
        /// <param name="o">缓存的对象</param>
        /// <param name="files">监视的路径文件</param>
        public virtual void AddObjectWithFileChange(string objId, object o, string[] files)
        {
            if (objId == null || objId.Length == 0 || o == null)
            {
                return;
            }

            CacheItemRemovedCallback callBack = new CacheItemRemovedCallback(onRemove);

            CacheDependency dep = new CacheDependency(files, DateTime.Now);

            webCache.Insert(objId, o, dep, System.DateTime.Now.AddSeconds(TimeOut), System.Web.Caching.Cache.NoSlidingExpiration, System.Web.Caching.CacheItemPriority.High, callBack);
        }



        /// <summary>
        /// 加入当前对象到缓存中,并使用依赖键
        /// </summary>
        /// <param name="objId">对象的键值</param>
        /// <param name="o">缓存的对象</param>
        /// <param name="dependKey">依赖关联的键值</param>
        public virtual void AddObjectWithDepend(string objId, object o, string[] dependKey)
        {
            if (objId == null || objId.Length == 0 || o == null)
            {
                return;
            }

            CacheItemRemovedCallback callBack = new CacheItemRemovedCallback(onRemove);

            CacheDependency dep = new CacheDependency(null, dependKey, DateTime.Now);

            webCache.Insert(objId, o, dep, System.DateTime.Now.AddSeconds(TimeOut), System.Web.Caching.Cache.NoSlidingExpiration, System.Web.Caching.CacheItemPriority.High, callBack);
        }

        /// <summary>
        /// 建立回调委托的一个实例
        /// </summary>
        /// <param name="key"></param>
        /// <param name="val"></param>
        /// <param name="reason"></param>
        public void onRemove(string key, object val, CacheItemRemovedReason reason)
        {
            switch (reason)
            {
                case CacheItemRemovedReason.DependencyChanged:
                    break;
                case CacheItemRemovedReason.Expired:
                    {
                        //CacheItemRemovedCallback callBack = new CacheItemRemovedCallback(this.onRemove);

                        //webCache.Insert(key, val, null, System.DateTime.Now.AddMinutes(TimeOut),
                        //    System.Web.Caching.Cache.NoSlidingExpiration,
                        //    System.Web.Caching.CacheItemPriority.High,
                        //    callBack);
                        break;
                    }
                case CacheItemRemovedReason.Removed:
                    {
                        break;
                    }
                case CacheItemRemovedReason.Underused:
                    {
                        break;
                    }
                default: break;
            }
            //如需要使用缓存日志,则需要使用下面代码
            //myLogVisitor.WriteLog(this,key,val,reason);			
        }

        /// <summary>
        /// 删除缓存对象
        /// </summary>
        /// <param name="objId">对象的关键字</param>
        public virtual void RemoveObject(string objId)
        {
            if (objId == null || objId.Length == 0)
            {
                return;
            }
            webCache.Remove(objId);
        }


        /// <summary>
        /// 返回一个指定的对象
        /// </summary>
        /// <param name="objId">对象的关键字</param>
        /// <returns>对象</returns>
        public virtual object RetrieveObject(string objId)
        {
            if (objId == null || objId.Length == 0)
            {
                return null;
            }
            return webCache.Get(objId);
        }
        /// <summary>
        /// 判断指定对象是否存在
        /// </summary>
        /// <param name="objId">对象的关键字</param>
        /// <returns>存在返回true；否则false</returns>
        public virtual bool ObjectIsExist(string objId)
        {
            return RetrieveObject(objId) != null ? true : false;
        }
        /// <summary>
        /// 清空的有缓存数据
        /// </summary>
        public virtual void FlushAll()
        {
            IDictionaryEnumerator CacheEnum = HttpRuntime.Cache.GetEnumerator();
            while (CacheEnum.MoveNext())
            {
                webCache.Remove(CacheEnum.Key.ToString());
            }
        }
    }
}
