#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 系统日志错误记录
* 作者：杨晓东   时间：2011/10/5 1:24:24 
* 文件名：WanerDaoLog4Net 
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

namespace WanerDao2.WanerDaoExceptionManager
{
    public class WanerDaoLog4Net
    {
        private static log4net.ILog m_log;
        private static string m_logger_name = "";
        /// <summary>
        /// 写入日志
        /// </summary>
        /// <param name="message">日志信息</param>
        /// <param name="messageType">日志信息类型</param>
        public static void Write(object message, LogMessageType messageType)
        {
            DoLog(message, messageType, null, Type.GetType("System.Object"));
        }

        /// <summary>
        /// 写入轮询日志
        /// </summary>
        /// <param name="message">日志信息</param>
        /// <param name="messageType">日志信息类型</param>
        public static void WritePolling(object message, LogMessageType messageType)
        {
            m_logger_name = "PollingLog";
            DoLog(message, messageType, null, Type.GetType("System.Object"));
            m_logger_name = "";
        }

        /// <summary>
        /// 写入日志
        /// </summary>
        /// <param name="message">日志信息</param>
        /// <param name="messageType">日志信息类型</param>
        /// <param name="type">日志类型</param>
        public static void Write(object message, LogMessageType messageType, Type type)
        {
            DoLog(message, messageType, null, type);
        }

        /// <summary>
        /// 写入日志
        /// </summary>
        /// <param name="message">日志信息</param>
        /// <param name="messageType">日志信息类型</param>
        /// <param name="ex">异常对象</param>
        public static void Write(object message, LogMessageType messageType, Exception ex)
        {
            DoLog(message, messageType, ex, Type.GetType("System.Object"));
        }

        /// <summary>
        /// 写入日志
        /// </summary>
        /// <param name="message">日志信息</param>
        /// <param name="messageType">日志信息类型</param>
        /// <param name="ex">异常对象</param>
        /// <param name="type">日志类型</param>
        public static void Write(object message, LogMessageType messageType, Exception ex, Type type)
        {
            DoLog(message, messageType, ex, type);
        }
        /// <summary>
        /// 断言，日志消息类型为Debug(LogMessageType.Debug)
        /// </summary>
        /// <param name="condition">条件为真时</param>
        /// <param name="message">日志信息</param>
        public static void Assert(bool condition, object message)
        {
            Assert(condition, message, Type.GetType("System.Object"));
        }

        /// <summary>
        /// 断言，日志消息类型为Debug(LogMessageType.Debug)
        /// </summary>
        /// <param name="condition">条件为真时</param>
        /// <param name="message">日志信息</param>
        /// <param name="type">日志类型</param>
        public static void Assert(bool condition, object message, Type type)
        {
            if (condition == true)
            {
                //Write(message, LogMessageType.Info);
                Write(message, LogMessageType.Debug, type);
            }
        }

        /// <summary>
        /// 保存日志
        /// </summary>
        /// <param name="message">日志信息</param>
        /// <param name="messageType">日志信息类型</param>
        /// <param name="ex">异常</param>
        /// <param name="type">日志类型</param>
        private static void DoLog(object message, LogMessageType messageType, Exception ex, Type type)
        {
            //m_log = log4net.LogManager.GetLogger(type);

            m_log = log4net.LogManager.GetLogger(m_logger_name);
            switch (messageType)
            {
                case LogMessageType.Debug:
                    m_log.Debug(message, ex);
                    break;
                case LogMessageType.Info:
                    m_log.Info(message, ex);
                    break;
                case LogMessageType.Warn:
                    m_log.Warn(message, ex);
                    break;
                case LogMessageType.Error:
                    m_log.Error(message, ex);
                    break;
                case LogMessageType.Fatal:
                    m_log.Fatal(message, ex);
                    break;
            }
        }

        /// <summary>
        /// 日志类型
        /// </summary>
        public enum LogMessageType
        {
            /// <summary>
            /// 写入一条调试信息
            /// </summary>
            Debug,

            /// <summary>
            /// 写入一条日志信息
            /// </summary>
            Info,

            /// <summary>
            /// 写入一条警告信息
            /// </summary>
            Warn,

            /// <summary>        
            /// 写入一条错误信息
            /// </summary>
            Error,

            /// <summary>
            /// 致命错误
            /// </summary>
            Fatal
        }

    }
}
