#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/4/20 20:59:58 
* 文件名：InfoActivityCategoryModel 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion

using System;

namespace WanerDao2.WanerDaoModel.Information
{
    /// <summary>
    /// 活动分类，记录资道活动模块的活动分类
    /// </summary>
    [Serializable]
    public class InfoActivityCategoryModel
    {
        public InfoActivityCategoryModel()
        { }
        #region Model
        private string _id;
        private string _parent_id;
        private string _category_name;
        private DateTime _update_date;
        private string _language_id;
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
        /// 父层号
        /// </summary>
        public string parent_id
        {
            set { _parent_id = value; }
            get { return _parent_id; }
        }
        /// <summary>
        /// 分类名
        /// </summary>
        public string category_name
        {
            set { _category_name = value; }
            get { return _category_name; }
        }
        /// <summary>
        /// 数据更新时间
        /// </summary>
        public DateTime update_date
        {
            set { _update_date = value; }
            get { return _update_date; }
        }
        /// <summary>
        /// 语言号
        /// </summary>
        public string language_id
        {
            set { _language_id = value; }
            get { return _language_id; }
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

