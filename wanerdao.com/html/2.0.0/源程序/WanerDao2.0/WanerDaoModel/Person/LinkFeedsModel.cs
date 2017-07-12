#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
*  新鲜事链接信息 实体
* 作者：杨晓东   时间：2011/10/1 18:59:10 
* 文件名：LinkFeedsModel 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion

using System;

namespace WanerDao2.WanerDaoModel.Person
{
    /// <summary>
    /// 新鲜事链接信息
    /// </summary>
    [Serializable]
    public partial class LinkFeedsModel
    {
        public LinkFeedsModel()
        { }
        #region Model
        private string _id;
        private string _user_id;
        private string _link;
        private string _description;
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
        /// 用户号
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 连接
        /// </summary>
        public string link
        {
            set { _link = value; }
            get { return _link; }
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
