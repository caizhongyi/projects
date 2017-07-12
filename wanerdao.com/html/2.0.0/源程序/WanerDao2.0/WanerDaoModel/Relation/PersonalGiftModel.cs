#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/4/9 23:23:05 
* 文件名：PersonalGiftModel 
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

namespace WanerDao2.WanerDaoModel.Relation
{
    /// <summary>
    /// 个人礼品
    /// </summary>
    [Serializable]
    public class PersonalGiftModel
    {
        public PersonalGiftModel()
        { }
        #region Model
        private string _id;
        private string _user_id;
        private string _gift_id;
        private string _content;
        private int _is_receive;
        private string _action_id;
        private DateTime? _action_date;
        private bool _active = true;

        /// <summary>
        /// 序列号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 用户号
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 礼物号
        /// </summary>
        public string gift_id
        {
            set { _gift_id = value; }
            get{return _gift_id;}
        }
        /// <summary>
        /// 送礼描述
        /// </summary>
        public string content
        {
            set { _content = value; }
            get { return _content; }
        }
        /// <summary>
        /// 是接受还是发送的礼品(1表示接收,0表示发送的,2表示发送好友还未收到的)
        /// </summary>
        public int is_receive
        {
            set { _is_receive = value; }
            get { return _is_receive; }
        }
        /// <summary>
        /// 送礼人
        /// </summary>
        public string action_id
        {
            set { _action_id = value; }
            get { return _action_id; }
        }
        /// <summary>
        /// 发送时间
        /// </summary>
        public DateTime? action_date
        {
            set { _action_date = value; }
            get { return _action_date; }
        }
        /// <summary>
        /// 是否有效
        /// </summary>
        public bool active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }
}
