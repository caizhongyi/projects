using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WanerDao2.WanerDaoCacheManager
{
    /// <summary>
    /// 描述：使用Dictionary实现内存缓存
    /// 创建者：金广亮
    /// 创建时间：2011-9-21
    /// </summary>
    public class WanerDaoDicCacheStrategy : ICacheStrategy
    {
        /// <summary>
        /// 默认缓存存活期为3600秒(1小时)
        /// </summary>
        protected int _timeOut = 3600;

        private static object syncObj = new object();

        /// <summary>
        /// 确保线程安全
        /// </summary>
        private static Dictionary<string,object> dicCache = null;
        /// <summary>
        /// 构造函数
        /// </summary>
        static WanerDaoDicCacheStrategy()
        {
            dicCache = new Dictionary<string, object>();
        }
        /// <summary>
        /// 设置到期相对时间[单位: 秒] 
        /// </summary>
        public virtual int TimeOut
        {
            set { _timeOut = value > 0 ? value : 3600; }
            get { return _timeOut > 0 ? _timeOut : 3600; }
        }


        public static Dictionary<string, object> GetdicCacheObj
        {
            get { return dicCache; }
        }

        /// <summary>
        /// 加入当前对象到缓存中
        /// </summary>
        /// <param name="objId">对象的键值</param>
        /// <param name="o">缓存的对象</param>
        public virtual void AddObject(string objId, object o)
        {
            lock (syncObj)
            {
                if (!dicCache.ContainsKey(objId))
                {
                    dicCache.Add(objId, o);
                }
            }            
        }

        /// <summary>
        /// 描述：在Hashtable内存使用时不可以用，加入当前对象到缓存中
        /// 创建者：金广亮
        /// 创建时间：2011-9-21
        /// </summary>
        /// <param name="objId">对象的键值</param>
        /// <param name="o">缓存的对象</param>
        /// <param name="o">到期时间,单位:秒</param>
        public virtual void AddObject(string objId, object o, int expire)
        {

        }


        /// <summary>
        /// 描述：在Hashtable内存使用时不可以用，加入当前对象到缓存中,并对相关文件建立依赖
        /// 创建者：金广亮
        /// 创建时间：2011-9-21
        /// </summary>
        /// <param name="objId">对象的键值</param>
        /// <param name="o">缓存的对象</param>
        /// <param name="files">监视的路径文件</param>
        public virtual void AddObjectWithFileChange(string objId, object o, string[] files)
        {
            
        }



        /// <summary>
        /// 描述：在Hashtable内存使用时不可以用，加入当前对象到缓存中,并使用依赖键
        /// 创建者：金广亮
        /// 创建时间：2011-9-21
        /// </summary>
        /// <param name="objId">对象的键值</param>
        /// <param name="o">缓存的对象</param>
        /// <param name="dependKey">依赖关联的键值</param>
        public virtual void AddObjectWithDepend(string objId, object o, string[] dependKey)
        {
            
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
            lock (syncObj)
            {
                if (dicCache.ContainsKey(objId))
                {
                    dicCache.Remove(objId);
                }
            }            
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
            else
            {
                if (dicCache.ContainsKey(objId))
                {
                    return dicCache[objId];
                }
                else
                    return null;
            }
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
            dicCache.Clear();
        }
    }
}
