using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Messaging;
using WanerDao2.WanerDaoModule.Config;

namespace WanerDao2.WanerDaoEmailQueue
{
    public class WanerDaoMessageQueue
    {
        //public static MessageQueue mq = null;
        /// <summary>
        /// 初始化Message Queue
        /// </summary>
        /// <returns></returns>
        private static MessageQueue EnsureQueueExists()
        {
            MessageQueue mq = null;
            if (MessageQueue.Exists(".\\Private$\\wanerdao2"))
            {
                mq = new MessageQueue(".\\Private$\\wanerdao2");
            }
            else
            {
                mq = MessageQueue.Create(".\\Private$\\wanerdao2");
            }

            return mq;
        }

        /// <summary>
        /// 初始化Message Queue
        /// </summary>
        /// <param name="mqName"></param>
        /// <returns></returns>
        public static MessageQueue EnsureQueueExists(string mqName)
        {
            MessageQueue mq = null;

            if (MessageQueue.Exists(".\\Private$\\" + mqName))
            {
                mq = new MessageQueue(".\\Private$\\" + mqName);
            }
            else
            {
                mq = MessageQueue.Create(".\\Private$\\" + mqName);
            }

            return mq;
        }
        /// <summary>
        /// 描述：发送复杂邮件
        /// 作者：金广亮
        /// 时间：2012-2-23
        /// </summary>
        /// <param name="mailSchema">复杂邮件格式</param>
        public static void SendEmail(WanerDaoMailComplexitySchema mailSchema)
        {
            foreach (string mail in mailSchema.EmailAddress)
            {
                WanerDaoMailSimpleSchema simpleMail = new WanerDaoMailSimpleSchema();
                simpleMail.Content = mailSchema.Content;
                simpleMail.EmailAddress = mail;
                simpleMail.Subject = mailSchema.Subject;
                simpleMail.MailEnum = mailSchema.MailEnum;
                SendMsgQueue<WanerDaoMailSimpleSchema>(simpleMail);
            }
        }
        /// <summary>
        /// 描述：发送简单邮件
        /// 作者：金广亮
        /// 时间：2012-2-23
        /// </summary>
        /// <param name="mailSchema">简单邮件格式</param>
        public static void SendEmail(WanerDaoMailSimpleSchema mailSchema)
        {
            SendMsgQueue<WanerDaoMailSimpleSchema>(mailSchema);
        }
        /// <summary>
        /// 描述：从邮件模版里面读取邮件格式并发送
        /// 作者：金广亮
        /// 时间：2012-2-23
        /// </summary>
        /// <param name="mailSchema">邮件模版格式</param>
        public static void SendEmail(WanerDaoMailConfigSchema mailSchema)
        {
            string mailContent = string.Empty;
            switch (mailSchema.MailEnum)
            {
                case WanerDaoMailEnum.CONFIGHTMLMAIL:
                    mailContent = WanerDaoConfigReader.GetConfigXml("MailConfig", "WanerDaoMailHtmlConfig", "Mail", mailSchema.MailKey);
                    break;
                case WanerDaoMailEnum.CONFIGTEXTMAIL:
                    mailContent = WanerDaoConfigReader.GetConfigXml("MailConfig", "WanerDaoMailTextConfig", "Mail", mailSchema.MailKey);
                    break;
            }

            foreach (string mail in mailSchema.EmailAddress)
            {
                WanerDaoMailSimpleSchema simpleMail = new WanerDaoMailSimpleSchema();
                if (mailSchema != null && mailSchema.Content.Count > 0)
                {
                    simpleMail.Content = string.Format(mailContent, mailSchema.Content.ToArray());
                }
                else
                {
                    simpleMail.Content = mailContent;
                }
                simpleMail.EmailAddress = mail;
                simpleMail.Subject = mailSchema.Subject;
                simpleMail.MailEnum = mailSchema.MailEnum;
                SendMsgQueue<WanerDaoMailSimpleSchema>(simpleMail);
            }
        }
        /// <summary>
        /// 描述：发送到信息队列
        /// 作者：金广亮
        /// 时间：2012-2-23
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        private static void SendMsgQueue<T>(T t)
        {
            //open queue
            MessageQueue mq = EnsureQueueExists(); //new MessageQueue(".\\Private$\\wanerdao");
            //create message
            Message m = new Message();
            m.Body = t;
            m.Formatter = new XmlMessageFormatter(new Type[] { typeof(T) });
            m.Recoverable = true;
            mq.Send(m);
        }
        /// <summary>
        /// 接收队列数据
        /// </summary>
        /// <returns></returns>
        public static WanerDaoMailSimpleSchema Receive()
        {
            WanerDaoMailSimpleSchema message = null;
            MessageQueue queue = EnsureQueueExists(); //new MessageQueue(".\\Private$\\wanerdao");
            Message msg = null;
            msg = queue.Receive();
            msg.Formatter = new XmlMessageFormatter(new Type[] { typeof(WanerDaoMailSimpleSchema) });
            message = (WanerDaoMailSimpleSchema)msg.Body;
            return message;
        }
        //public static WanerDaoMailSimpleSchema Receive()
        //{
        //    WanerDaoMailSimpleSchema message = null;
        //    MessageQueue queue = EnsureQueueExists(); //new MessageQueue(".\\Private$\\wanerdao");
        //    Message msg = null;
        //    using (MessageEnumerator messages = queue.GetMessageEnumerator2())
        //    {
        //        while (messages.MoveNext())//0.5秒TimeSpan.FromMilliseconds(30000)
        //        {
        //            msg = messages.Current;
        //            msg = queue.Receive();

        //        }
        //    }
        //    if (msg!=null)
        //    {
        //        msg.Formatter = new XmlMessageFormatter(new Type[] { typeof(WanerDaoMailSimpleSchema) });
        //        message = (WanerDaoMailSimpleSchema)msg.Body;
        //    }
        //    return message;
        //}
        /// <summary>
        /// 描述：获取队列里面的所有消息
        /// </summary>
        /// <returns></returns>
        public static Message[] ReceiveMessage()
        {
            MessageQueue queue = EnsureQueueExists();
            return queue.GetAllMessages();
        }
    }
}
