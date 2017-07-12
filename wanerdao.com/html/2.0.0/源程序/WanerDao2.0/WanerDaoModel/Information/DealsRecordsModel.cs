#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/4/15 18:35:45 
* 文件名：DealsRecordsModel 
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

namespace WanerDao2.WanerDaoModel.Information
{
    /// <summary>
    /// 打折记录表，记录资道模块打折模块信息
    /// </summary>
    [Serializable]
    public class DealsRecords
    {
        public DealsRecords()
        { }
        #region Model
        private string _id;
        private string _source_type_id;
        private int _is_anonymity;
        private string _source_id;
        private string _image_link;
        private string _link;
        private int _type;
        private string _goods;
        private string _subject;
        private string _description;
        private string _content;
        private string _money_id;
        private string _money_symbol;
        private string _price;
        private string _expire;
        private DateTime _public_date;
        private int _counter;
        private string _page_language_id;
        private int _active = 1;
        /// <summary>
        /// 序列号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 来源类型号
        /// </summary>
        public string source_type_id
        {
            set { _source_type_id = value; }
            get { return _source_type_id; }
        }
        /// <summary>
        /// 是否匿名
        /// </summary>
        public int is_anonymity
        {
            set { _is_anonymity = value; }
            get { return _is_anonymity; }
        }
        /// <summary>
        /// 来源号
        /// </summary>
        public string source_id
        {
            set { _source_id = value; }
            get { return _source_id; }
        }
        /// <summary>
        /// 图片链接
        /// </summary>
        public string image_link
        {
            set { _image_link = value; }
            get { return _image_link; }
        }
        /// <summary>
        /// 链接
        /// </summary>
        public string link
        {
            set { _link = value; }
            get { return _link; }
        }
        /// <summary>
        /// 属性（买卖）
        /// </summary>
        public int type
        {
            set { _type = value; }
            get { return _type; }
        }
        /// <summary>
        /// 物品名
        /// </summary>
        public string goods
        {
            set { _goods = value; }
            get { return _goods; }
        }
        /// <summary>
        /// 标题
        /// </summary>
        public string subject
        {
            set { _subject = value; }
            get { return _subject; }
        }
        /// <summary>
        /// 描述
        /// </summary>
        public string description
        {
            set { _description = value; }
            get { return _description; }
        }
        /// <summary>
        /// 内容
        /// </summary>
        public string content
        {
            set { _content = value; }
            get { return _content; }
        }
        /// <summary>
        /// 币种
        /// </summary>
        public string money_id
        {
            set { _money_id = value; }
            get { return _money_id; }
        }
        /// <summary>
        /// 货币符号
        /// </summary>
        public string money_symbol
        {
            set { _money_symbol = value; }
            get { return _money_symbol; }
        }
        /// <summary>
        /// 价格
        /// </summary>
        public string price
        {
            set { _price = value; }
            get { return _price; }
        }
        /// <summary>
        /// 时限
        /// </summary>
        public string expire
        {
            set { _expire = value; }
            get { return _expire; }
        }
        /// <summary>
        /// 公布时间
        /// </summary>
        public DateTime public_date
        {
            set { _public_date = value; }
            get { return _public_date; }
        }
        /// <summary>
        /// 点击率
        /// </summary>
        public int counter
        {
            set { _counter = value; }
            get { return _counter; }
        }
        /// <summary>
        /// 页面语言号
        /// </summary>
        public string page_language_id
        {
            set { _page_language_id = value; }
            get { return _page_language_id; }
        }
        /// <summary>
        /// 是否有效
        /// </summary>
        public int active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }
}
