using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Configuration;
using WanerDao.Indexing.Database;

namespace WanerDao.Service.WebSearch
{
    public partial class IndexingService : ServiceBase
    {
        public IndexingService()
        {
            InitializeComponent();

            try
            {
                if (!EventLog.Exists("Lucene.Net索引同步"))
                {
                    if (EventLog.SourceExists("Lucene.Net索引同步服务"))
                    {
                        EventLog.DeleteEventSource("Lucene.Net索引同步服务");
                    }
                    EventLog.CreateEventSource("Lucene.Net索引同步服务", "Lucene.Net索引同步");
                }
                this.eventLog.Log = "Lucene.Net索引同步";
                this.eventLog.Source = "Lucene.Net索引同步服务";

            }
            catch (Exception ex)
            {
                this.eventLog.Log = ex.Message;
            }
        }

        protected override void OnStart(string[] args)
        {
            //Add code here to start your service
            if (this.timer == null)
            {
                eventLog.WriteEntry("Lucene.Net索引同步服务启动");
                timer = new System.Timers.Timer();
                timer.Interval = int.Parse(ConfigurationManager.AppSettings["IntervalTime"]) * 60 * 1000;
                timer.Enabled = true;
                timer.Start();
                timer.Elapsed += new System.Timers.ElapsedEventHandler(timer_Elapsed);
            }
        }

        void timer_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            try
            {
                IWanerDaoIndexing Iindex = new WanerDao.Indexing.Database.DataBaseIndexing();
                Iindex.IndexDatabase();
            }
            catch (Exception ex)
            {
                CommonHelper.WriteLog(ex.Message, LogEnum.Error);
            }
        }

        protected override void OnStop()
        {
            if (this.timer != null)
            {
                this.timer.Enabled = false;
                this.timer.Stop();
                this.timer.Dispose();
                eventLog.WriteEntry("Lucene.Net索引同步服务停止");
            }
        }

        private void eventLog_EntryWritten(object sender, EntryWrittenEventArgs e)
        {

        }
    }
}
