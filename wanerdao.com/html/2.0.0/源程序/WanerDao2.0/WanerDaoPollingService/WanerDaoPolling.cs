#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/4/4 21:29:33 
* 文件名：WanerDaoPolling 
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
using WanerDao2.WanerDaoIBLL.IPolling;
using WanerDao2.WanerDaoModule.Config;
using System.Threading;
using WanerDao2.WanerDaoExceptionManager;

namespace WanerDaoPollingService
{
    /// <summary>
    /// 泛型轮询类
    /// </summary>
    /// <typeparam name="T"></typeparam>
    internal class WanerDaoPolling<T> where T : class
    {
        #region 队列字段
        /// <summary>
        /// 实例化一个队列用来存放实例的接口对象
        /// </summary>
        private Queue<T> IRunQueue = new Queue<T>(); 
        #endregion

        #region 添加对象到队列

        /// <summary>
        /// 添加一个接口对象到队列中
        /// </summary>
        /// <param name="IRun"></param>
        private void Add(T t)
        {
            lock (IRunQueue)
            {
                IRunQueue.Enqueue(t);
            }
        } 
        #endregion

        #region 执行队列中的函数
        /// <summary>
        /// 运行队列中接口的RUN方法
        /// </summary>
        /// <param name="methonName">要执行的接口方法名称</param>
        public void Run(string interfaceName)
        {
            WanerDaoLog4Net.WritePolling("服务开始运行", WanerDaoLog4Net.LogMessageType.Info);
            AddConfigToQueue(interfaceName);
            lock (IRunQueue)
            {
                while (IRunQueue.Count != 0)
                {
                    try
                    {
                        //反射调用接口中需要执行的方法
                        IRunQueue.Dequeue().GetType().InvokeMember(
                            interfaceName,
                            System.Reflection.BindingFlags.InvokeMethod |
                            System.Reflection.BindingFlags.Instance |
                            System.Reflection.BindingFlags.Public,
                            null, null, null);
                    }
                    catch (Exception)
                    {
                        continue;
                    }
                }
            }
            WanerDaoLog4Net.WritePolling("轮询执行结束", WanerDaoLog4Net.LogMessageType.Info);
        } 
        #endregion

        #region 停止进程
        /// <summary>
        /// 停止执行
        /// </summary>
        public void Stop()
        {
            if (IRunQueue.Count == 0)
            {
                Thread.CurrentThread.Abort();
                IRunQueue = null;
                WanerDaoLog4Net.WritePolling("轮询被停止", WanerDaoLog4Net.LogMessageType.Info);
            }
        } 
        #endregion

        #region 读取配置文件映射到队列中
        /// <summary>
        /// 添加映射的配置文件到队列中去
        /// </summary>
        private void AddConfigToQueue(string interfaceName)
        {
            Dictionary<string, Dictionary<string, string>> xmlDic = WanerDaoFilterReader.GetPolling();
            foreach (var item in xmlDic)
            {
                string cfgMethonName = item.Key;
                if (cfgMethonName == interfaceName)
                {
                    T runnable = null;
                    Dictionary<string, string> classDic = item.Value;
                    for (int i = 0; i < classDic.Count; i++)
                    {
                        runnable = (AssemblyClass.GetInstance().GetClassInstance(classDic["assembly"], classDic["fullName"])) as T;
                        Add(runnable);
                    }
                }
            }
        } 
        #endregion
    }
}
