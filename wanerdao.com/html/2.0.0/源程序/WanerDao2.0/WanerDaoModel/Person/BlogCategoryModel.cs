#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 日志分类模型
* 作者：杨晓东   时间：2011/10/2 18:10:54 
* 文件名：WanerDaoBlogCategoryModel 
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
    /// 日志分类
    /// </summary>
    [Serializable]
    public partial class BlogCategoryModel
    {
        public BlogCategoryModel()
        { }
        #region Model
        private string _id="";
        private string _user_id="";
        private string _category_name="";
        private DateTime _create_date;
        private string _permission="";
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
        /// 分类名
        /// </summary>
        public string category_name
        {
            set { _category_name = value; }
            get { return _category_name; }
        }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime create_date
        {
            set { _create_date = value; }
            get { return _create_date; }
        }
        /// <summary>
        /// 分类权限
        /// </summary>
        public string permission
        {
            set { _permission = value; }
            get { return _permission; }
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
