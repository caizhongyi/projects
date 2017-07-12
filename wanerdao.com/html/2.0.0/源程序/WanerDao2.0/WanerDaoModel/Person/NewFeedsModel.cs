#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 新鲜事信息实体
* 作者：杨晓东   时间：2011/10/1 18:56:57 
* 文件名：NewFeedsModel 
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

namespace WanerDao2.WanerDaoModel.Person
{
    /// <summary>
    /// 新鲜事信息
    /// </summary>
    [Serializable]
    public partial class NewFeedsModel
    {
        public NewFeedsModel()
        { }
        #region Model
        private string _id;
        private int _sort_id;
        private string _user_id;
        private string _content;
        private DateTime? _post_date;
        private int? _counter;
        private string _permission;
        private bool? _active = true;
        /// <summary>
        /// 序列号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 排序ID
        /// </summary>
        public int sort_id
        {
            set { _sort_id = value; }
            get { return _sort_id; }
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
        /// 发布时间
        /// </summary>
        public DateTime? post_date
        {
            set { _post_date = value; }
            get { return _post_date; }
        }
        /// <summary>
        /// 点击率
        /// </summary>
        public int? counter
        {
            set { _counter = value; }
            get { return _counter; }
        }
        /// <summary>
        /// 其他用户对该资料模块的浏览权限
        /// </summary>
        public string permission
        {
            set { _permission = value; }
            get { return _permission; }
        }
        /// <summary>
        /// 是否有效
        /// </summary>
        public bool? active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }
}
