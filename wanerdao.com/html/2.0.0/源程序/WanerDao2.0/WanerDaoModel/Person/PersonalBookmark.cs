#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 用户收藏夹实体
* 作者：吴志斌   时间：2011/12/5 22:48:00 
* 文件名：IWanerDaoPersonalBookMark 
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
    /// 收藏夹
    /// </summary>
    [Serializable]
    public class PersonalBookmark
    {
        public PersonalBookmark()
        { }

        #region Model
        private string _id;
        private string _user_id;
        private string _category_id;
        private int? _sequence;
        private string _link_content;
        private string _desctription;
        private DateTime? _mark_time;
        private bool? _active;

        /// <summary>
        /// 序号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }

        /// <summary>
        /// 用户名
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }

        /// <summary>
        /// 分类号
        /// </summary>
        public string category_id
        {
            set { _category_id = value; }
            get { return _category_id; }
        }

        public int? sequence
        {
            set { _sequence = value; }
            get { return _sequence; }
        }

        /// <summary>
        /// 连接内容
        /// </summary>
        public string link_content
        {
            set { _link_content = value; }
            get { return _link_content; }
        }

        /// <summary>
        /// 描述
        /// </summary>
        public string description
        {
            set { _desctription = value; }
            get { return _desctription; }
        }

        /// <summary>
        /// 收藏时间
        /// </summary>
        public DateTime? mark_time
        {
            set { _mark_time = value; }
            get { return _mark_time; }
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
