using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;
using WanerDao2.WanerDaoExceptionManager;
using System.Timers;
using System.Configuration;
using WanerDao2.WanerDaoEmailQueue;
namespace WanerDao2.WanerDaoEmail
{
    partial class WanerDaoMailService : ServiceBase
    {
        Timer timer = null;
        private string sourceMail = string.Empty;
        private string returnMail = string.Empty;
        public WanerDaoMailService()
        {
            InitializeComponent();
            sourceMail = ConfigurationManager.AppSettings["sourceMail"].ToString();
            returnMail = ConfigurationManager.AppSettings["returnMail"].ToString();
        }

        protected override void OnStart(string[] args)
        {
            // TODO: 在此处添加代码以启动服务。
            double span = double.Parse(ConfigurationManager.AppSettings["mailspan"].ToString());
            double mailInterval = double.Parse(ConfigurationManager.AppSettings["mailInterval"].ToString());
            timer = new Timer(span);
            timer.Elapsed += new ElapsedEventHandler(WanerDao_TimerElapsed);
            timer.Interval = mailInterval;
            timer.Enabled = true;
        }
        protected void WanerDao_TimerElapsed(object sender, ElapsedEventArgs e)
        {
            WanerDaoMailSimpleSchema mss = WanerDaoMessageQueue.Receive();
            if (mss != null)
            {
                if (mss.MailEnum == WanerDaoMailEnum.TEXTMAIL)
                {
                    SendTextEmail(mss);
                }
                else
                {
                    SendHtmlEmail(mss);
                }
            }
        }
        protected override void OnStop()
        {
            // TODO: 在此处添加代码以执行停止服务所需的关闭操作。
        }
        /// <summary>
        /// 描述：调用亚马逊的云邮件服务发送文本邮件
        /// 作者：金广亮
        /// 时间：2012-2-17
        /// </summary>
        /// <param name="mailSchema">邮件结构</param>
        protected void SendTextEmail(WanerDaoMailSimpleSchema mailSchema)
        {
            AmazonSimpleEmailServiceClient client= WanerDao2WanerDaoUtility.WanerDaoMail.GetAmazonSimpleEmailServiceClient();//new AmazonSimpleEmailServiceClient(WanerDaoMail.GetPublicKey(), WanerDaoMail.GetPrivateKey());
            //make up message
            SendEmailRequest em = new SendEmailRequest()
                .WithDestination(new Destination() { BccAddresses = new List<string>() { mailSchema.EmailAddress } })
                .WithSource(sourceMail)
                .WithReturnPath(returnMail)
                .WithMessage(new Message(new Content(mailSchema.Subject), new Body().WithText(new Content(mailSchema.Content))));
            //send
            try
            {
                client.SendEmail(em);//.SendEmailResult.MessageId;
                WanerDaoLog4Net.Write("邮件发送时间：" + DateTime.Now.ToShortDateString() + " 邮件模版为TEXT 邮件标题：" + mailSchema.Subject, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (MessageRejectedException ex)
            {
                WanerDaoLog4Net.Write("邮件发送时间：" + DateTime.Now.ToShortDateString() + " 邮件模版为TEXT 邮件标题：" + mailSchema.Subject, WanerDaoLog4Net.LogMessageType.Error, ex);
            }
        }
        /// <summary>
        /// 描述：调用亚马逊的云邮件服务发送HTML邮件
        /// 作者：金广亮
        /// 时间：2012-2-17
        /// </summary>
        /// <param name="mailSchema">邮件结构</param>
        protected void SendHtmlEmail(WanerDaoMailSimpleSchema mailSchema)
        {
            AmazonSimpleEmailServiceClient client = WanerDao2WanerDaoUtility.WanerDaoMail.GetAmazonSimpleEmailServiceClient();//new AmazonSimpleEmailServiceClient(WanerDaoMail.GetPublicKey(), WanerDaoMail.GetPrivateKey());
            //make up message
            SendEmailRequest em = new SendEmailRequest()
                .WithDestination(new Destination() { BccAddresses = new List<string>() { mailSchema.EmailAddress } })
                .WithSource(sourceMail)
                .WithReturnPath(returnMail)
                .WithMessage(new Message(new Content(mailSchema.Subject), new Body().WithHtml(new Content(mailSchema.Content))));
            //send
            try
            {
                client.SendEmail(em);//.SendEmailResult.MessageId;
                WanerDaoLog4Net.Write("邮件发送时间：" + DateTime.Now.ToShortDateString() + " 邮件模版为HTML 邮件标题：" + mailSchema.Subject, WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (MessageRejectedException ex)
            {
                WanerDaoLog4Net.Write("邮件发送时间：" + DateTime.Now.ToShortDateString() + " 邮件模版为HTML 邮件标题：" + mailSchema.Subject, WanerDaoLog4Net.LogMessageType.Error, ex);
            }
        }
    }
}
