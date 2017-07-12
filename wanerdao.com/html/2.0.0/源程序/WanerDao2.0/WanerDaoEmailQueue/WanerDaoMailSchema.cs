using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

#region 【本类功能概述】
/* ======================================================================== *  
* 功能说明：
* 
* 作者：金广亮
* 时间：2012-2-22 23:00:35 
* 文件名：WanerDaoMailSchema 
* 版本：V0.0.1
* 
* 修改者： 
* 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion
namespace WanerDao2.WanerDaoEmailQueue
{
    /// <summary>
    /// 描述：简单Email结构体
    /// 作者：金广亮
    /// 时间：2012-2-16
    /// </summary>
    [Serializable]
    public class WanerDaoMailSimpleSchema
    {
        public WanerDaoMailSimpleSchema()
        {

        }
        /// <summary>
        /// 要发送的邮箱地址列表
        /// </summary>
        public string EmailAddress { get; set; }
        /// <summary>
        /// 邮件标题
        /// </summary>
        public string Subject { get; set; }
        /// <summary>
        /// 邮件内容
        /// </summary>
        public string Content { get; set; }
        /// <summary>
        /// 邮件格式
        /// </summary>
        public WanerDaoMailEnum MailEnum { get; set; }
    }
    /// <summary>
    /// 描述：复杂Email结构体
    /// 作者：金广亮
    /// 时间：2012-2-16
    /// </summary>
    [Serializable]
    public class WanerDaoMailComplexitySchema
    {
        /// <summary>
        /// 要发送的邮箱地址列表
        /// </summary>
        public List<string> EmailAddress { get; set; }
        /// <summary>
        /// 邮件标题
        /// </summary>
        public string Subject { get; set; }
        /// <summary>
        /// 邮件内容
        /// </summary>
        public string Content { get; set; }
        /// <summary>
        /// 邮件格式
        /// </summary>
        public WanerDaoMailEnum MailEnum { get; set; }
    }
    /// <summary>
    /// 描述：当从配置文件读取的时候所用的邮件结构体
    /// 作者：金广亮
    /// 时间：2012-2-22
    /// </summary>
    public class WanerDaoMailConfigSchema
    {
        ///// <summary>
        ///// 配置文件名
        ///// </summary>
        //public string FileName { get; set; }
        /// <summary>
        /// 配置文件中的节点属性名
        /// </summary>
        public string MailKey { get; set; }
        /// <summary>
        /// 要发送的邮箱地址
        /// </summary>
        public List<string> EmailAddress { get; set; }
        /// <summary>
        /// 邮件标题
        /// </summary>
        public string Subject { get; set; }
        /// <summary>
        /// 邮件内容，此处可以为空(NULL)，配置文件里面的body有多少个参数{0}...{n}，对应的Content就应该有几个
        /// </summary>
        public List<string> Content { get; set; }
        /// <summary>
        /// 邮件格式
        /// </summary>
        public WanerDaoMailEnum MailEnum { get; set; }
    }
}
