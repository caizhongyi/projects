#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 用户日志实体
* 作者：杨晓东   时间：2011/10/2 1:48:13 
* 文件名：PersonalBlogModel 
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
    /// 日志
    /// </summary>
    [Serializable]
    public partial class PersonalBlogModel
    {
        public PersonalBlogModel()
        { }
        #region Model
        private string _id;
        private int _sort_id;
        private string _user_id;
        private bool? _is_transmit;
        private string _transmit_id;
        private string _category_id;
        private string _title;
        private string _content;
        private DateTime? _post_date;
        private string _weather;
        private string _location;
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
        /// 是否转发
        /// </summary>
        public bool? is_transmit
        {
            set { _is_transmit = value; }
            get { return _is_transmit; }
        }
        /// <summary>
        /// 来源号
        /// </summary>
        public string transmit_id
        {
            set { _transmit_id = value; }
            get { return _transmit_id; }
        }
        /// <summary>
        /// 分类号
        /// </summary>
        public string category_id
        {
            set { _category_id = value; }
            get { return _category_id; }
        }
        /// <summary>
        /// 标题
        /// </summary>
        public string title
        {
            set { _title = value; }
            get { return _title; }
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
        /// 天气
        /// </summary>
        public string weather
        {
            set { _weather = value; }
            get { return _weather; }
        }
        /// <summary>
        /// 地点
        /// </summary>
        public string location
        {
            set { _location = value; }
            get { return _location; }
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
        /// 访问权限
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
