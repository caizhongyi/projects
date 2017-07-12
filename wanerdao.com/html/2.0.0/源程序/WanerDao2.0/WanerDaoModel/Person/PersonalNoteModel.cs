#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 用户记事本实体
* 作者：吴志斌   时间：2011/12/4 10:48:13 
* 文件名：PersonalNoteModel 
* 版本：V1.0.0 
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

namespace WanerDao2.WanerDaoModel.Person
{
    /// <summary>
    /// 记事本
    /// </summary>
    [Serializable]
    public class PersonalNoteModel
    {
        public PersonalNoteModel()
        { }

        #region Model
        private string _id;
        private string _user_id;
        private string _content;
        private int? _sequence;
        private int? _page;
        private DateTime? _note_date;
        private bool? _active;

        /// <summary>
        /// 序列号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }

        /// <summary>
        /// 用户Id
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
        /// 顺序
        /// </summary>
        public int? sequence
        {
            set { _sequence = value; }
            get { return _sequence; }
        }

        /// <summary>
        /// 页数
        /// </summary>
        public int? page
        {
            set { _page = value; }
            get { return _page; }
        }

        /// <summary>
        /// 记录时间
        /// </summary>
        public DateTime? note_date
        {
            set { _note_date = value; }
            get { return _note_date; }
        }

        /// <summary>
        /// 是否有效
        /// </summary>
        public bool? active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion
    }
}
