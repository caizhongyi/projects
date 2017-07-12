#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐蓓   时间：2011/12/15 23:24:33 
* 文件名：PostsModal 
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
using WanerDao2.WanerDaoModule.TipInfo;

namespace WanerDao2.WanerDaoModel.Post
{
    /// <summary>
    /// PostsModal:杂烩实体类
    /// </summary>
    [Serializable]
    public class PostsModel
    {
        public PostsModel()
        { }
        #region Model
        private string _id = string.Empty;
        private int _sort_id = 0;
        private string _post_id = string.Empty;
        private bool? _is_anonymity = false;
        private DateTime? _post_datetime = new DateTime(1999,1,1);
        private string _category_id = string.Empty;
        private string _subject = string.Empty;
        private string _content = string.Empty;
        private int? _counter = 0;
        //private string _page_language_id = WanerDaoGlobalTip.GetClientLanguageGuid();
        private string _page_language_id = string.Empty;
        private bool? _active = true;
        /// <summary>
        /// 
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// auto_increment
        /// </summary>
        public int sort_id
        {
            set { _sort_id = value; }
            get { return _sort_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string post_id
        {
            set { _post_id = value; }
            get { return _post_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public bool? is_anonymity
        {
            set { _is_anonymity = value; }
            get { return _is_anonymity; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? post_datetime
        {
            set { _post_datetime = value; }
            get { return _post_datetime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string category_id
        {
            set { _category_id = value; }
            get { return _category_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string subject
        {
            set { _subject = value; }
            get { return _subject; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string content
        {
            set { _content = value; }
            get { return _content; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? counter
        {
            set { _counter = value; }
            get { return _counter; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string page_language_id
        {
            set { _page_language_id = value; }
            get { return _page_language_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public bool? active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }
}
