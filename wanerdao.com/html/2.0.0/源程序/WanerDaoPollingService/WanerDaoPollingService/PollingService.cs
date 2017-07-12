#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 轮询服务类
* 作者：杨晓东   时间：2012/4/4 18:44:09 
* 文件名：PollingService.cs
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion
using System;
using System.Diagnostics;
using System.ServiceProcess;
using System.Configuration;
using System.Reflection;
using System.Collections;
using System.IO;
using WanerDaoDBService;

namespace WanerDaoPollingService
{
    public partial class PollingService : ServiceBase
    {
        #region Field
        private ArrayList plugsArrOfDay;
        private ArrayList plugsArrOfHalfHour;

        /// <summary>
        /// 声明一个计时器用来触发
        /// </summary>
        private System.Timers.Timer m_IntervalTimer = null;
        private System.Timers.Timer m_DayTimer = null;
        private readonly string m_DayBeginTime;
        private readonly TimeSpan m_HalfHourInterval;

        #endregion

        #region 构造函数
        public PollingService()
        {
            InitializeComponent();

            //配置文件中配置的每天轮询开始执行的时间(00:00:00)

            m_DayBeginTime = ConfigurationManager.AppSettings["WanerDaoPollingDayOfBeginTime"].ToString();
            //配置文件中配置的每隔半小时执行的时间(00:30:00)
            
            m_HalfHourInterval = DateTime.Parse(ConfigurationManager.AppSettings["WanerDaoPollingIntervalByHalfHour"]).TimeOfDay;
            
            if (!EventLog.SourceExists("WanerDaoPollingServiceSource"))
            {
                EventLog.CreateEventSource("WanerDaoPollingServiceSource", "WanerDaoPollingLog");
            }
            this.eventLog1.Log = "WanerDaoPollingLog";
            this.eventLog1.Source = "WanerDaoPollingServiceSource";
        }
        #endregion

        #region 启动服务
        protected override void OnStart(string[] args)
        {
            if (plugsArrOfDay == null)
            {
                plugsArrOfDay = new ArrayList();
                LoadAllPlugs("IPollingByDay");
            }

            if (plugsArrOfHalfHour == null)
            {
                plugsArrOfHalfHour = new ArrayList();
                LoadAllPlugs("IPollingByHalfHour");
                
            }

            //Add code here to start your service
            if (this.m_IntervalTimer == null)
            {

                eventLog1.WriteEntry("WanerDaoPollingService Start");

                //初始化Timer 使其开始进行计时
                m_IntervalTimer = new System.Timers.Timer();
                m_IntervalTimer.Interval = m_HalfHourInterval.TotalMilliseconds; //半小时请求一次
                m_IntervalTimer.Enabled = true;
                m_IntervalTimer.Elapsed += new System.Timers.ElapsedEventHandler(timer_Elapsed);
                m_IntervalTimer.Start();
                //--------------------------每天执行的------------------------------
                m_DayTimer = new System.Timers.Timer();
                m_DayTimer.Interval = 1000 * 60;//1分钟请求一次,判断当前时间是不是配置文件中配置的轮询开始执行时间
                m_DayTimer.Enabled = true;
                m_DayTimer.Elapsed += new System.Timers.ElapsedEventHandler(m_DayTimer_Elapsed);
                m_DayTimer.Start();
            }
        }
        #endregion

        #region 时间到达事件
        /// <summary>
        /// 每天执行一次的
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        void m_DayTimer_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            //每秒请求一次和系统时间对照
            if (e.SignalTime.ToShortTimeString() == m_DayBeginTime)
            {
                this.m_IntervalTimer.Stop();
                try
                {
                    for (int i = 0; i < plugsArrOfDay.Count; i++)
                    {
                        object obj = plugsArrOfDay[i];
                        Type t = obj.GetType();
                        MethodInfo methonInfo = t.GetMethod("RunByDay");
                        methonInfo.Invoke(obj, null);
                    }
                }
                catch (Exception ex)
                {
                    eventLog1.Log = ex.Message;
                }
                this.m_IntervalTimer.Start();
            }
        }

        /// <summary>
        /// 每半小时执行一次的
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        void timer_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            this.m_IntervalTimer.Stop();
            try
            {
                for (int i = 0; i < plugsArrOfHalfHour.Count; i++)
                {
                    object obj = plugsArrOfHalfHour[i];
                    Type t = obj.GetType();
                    MethodInfo methonInfo = t.GetMethod("RunByHalfHour");
                    methonInfo.Invoke(obj, null);
                }
                
            }
            catch (Exception ex)
            {
                eventLog1.Log = ex.Message;
            }
            this.m_IntervalTimer.Start();
        }
        #endregion

        #region 停止服务
        /// <summary>
        /// 停止服务
        /// </summary>
        protected override void OnStop()
        {
            if (this.m_IntervalTimer != null)
            {
                this.m_IntervalTimer.Enabled = false;
                this.m_IntervalTimer.Stop();
                this.m_IntervalTimer.Dispose();
                eventLog1.WriteEntry("WanerDaoPollingService Stop");
            }
        }
        #endregion

        #region 加载插件DLL
        public void LoadAllPlugs(string methodName)
        {
            //获取插件目录(plugins)下所有文件
            string[] files = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory + @"\plugsins");
            foreach (string file in files)
            {
                if (file.ToUpper().EndsWith(".DLL"))
                {
                    try
                    {
                        //载入dll
                        Assembly ab = Assembly.LoadFrom(file);
                        Type[] types = ab.GetTypes();
                        foreach (Type t in types)
                        {
                            try
                            {
                                //如果某些类实现了预定义的IMsg.IMsgPlug接口，则认为该类适配与主程序(是主程序的插件)
                                if (t.GetInterface(methodName) != null)
                                {
                                    if (methodName == "IPollingByDay")
                                    {
                                        plugsArrOfDay.Add(ab.CreateInstance(t.FullName));
                                    }
                                    else
                                    {
                                        plugsArrOfHalfHour.Add(ab.CreateInstance(t.FullName));
                                    }
                                }
                            }
                            catch (Exception ex)
                            {
                                eventLog1.Log = ex.Message;
                            }
                            
                        }
                    }
                    catch (Exception ex)
                    {
                        eventLog1.Log = ex.Message;
                    }
                }
            }

        }
        #endregion

        private void eventLog1_EntryWritten(object sender, EntryWrittenEventArgs e)
        {

        }
    }
}
