#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/4/22 15:10:24 
* 文件名：InfoActivityRecordsCommentsModel 
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
    /// 资道活动模块讨论回复表，记录资道模块活动子模块的信息回复
    /// </summary>
    [Serializable]
    public class InfoActivityRecordsCommentsModel
    {
        public InfoActivityRecordsCommentsModel()
        { }
        #region Model
        private string _id;
        private string _record_id;
        private string _follow_id;
        private string _user_id;
        private string _content;
        private DateTime _comments_date;
        private int _positive;
        private int _negative;
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
        /// 记录号
        /// </summary>
        public string record_id
        {
            set { _record_id = value; }
            get { return _record_id; }
        }
        /// <summary>
        /// 回帖号
        /// </summary>
        public string follow_id
        {
            set { _follow_id = value; }
            get { return _follow_id; }
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
        /// 内容
        /// </summary>
        public string content
        {
            set { _content = value; }
            get { return _content; }
        }
        /// <summary>
        /// 回复时间
        /// </summary>
        public DateTime comments_date
        {
            set { _comments_date = value; }
            get { return _comments_date; }
        }
        /// <summary>
        /// 正面评价
        /// </summary>
        public int positive
        {
            set { _positive = value; }
            get { return _positive; }
        }
        /// <summary>
        /// 负面评价
        /// </summary>
        public int negative
        {
            set { _negative = value; }
            get { return _negative; }
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
