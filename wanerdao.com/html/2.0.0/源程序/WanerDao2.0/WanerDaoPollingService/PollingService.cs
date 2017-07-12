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

namespace WanerDaoPollingService
{
    public partial class PollingService : ServiceBase
    {
        #region Field
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

            //记录日志
            if (!EventLog.Exists("WanerDaoPollingLog"))
            {
                EventLog.CreateEventSource("WanerDaoPollingService", "WanerDaoPollingLog");
            }
            this.eventLog1.Log = "WanerDaoPollingLog";
            this.eventLog1.Source = "WanerDaoPollingService";
        }
        #endregion

        #region 启动服务
        protected override void OnStart(string[] args)
        {
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
                    RunByDay day = new RunByDay();                    
                    MethodInfo[] methonInfo = day.GetType().GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly);
                    foreach (var item in methonInfo)
                    {
                        item.Invoke(day, null);
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
                RunByHalfHour halfHour = new RunByHalfHour();
                MethodInfo[] methonInfo = halfHour.GetType().GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly);
                foreach (var item in methonInfo)
                {
                    item.Invoke(halfHour, null);
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
    }
}
