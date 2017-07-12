#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人日志设定模型
* 作者：杨晓东   时间：2011/10/2 18:35:24 
* 文件名：PersonalBlogSettingsModel 
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
    /// 个人日志设定
    /// </summary>
    [Serializable]
    public partial class PersonalBlogSettingsModel
    {
        public PersonalBlogSettingsModel()
        { }
        #region Model
        private string _user_id;
        private string _blog_name;
        private string _blog_description;
        private string _default_category_id;
        private string _default_permission;
        private bool? _active = true;
        /// <summary>
        /// 用户号
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 主页名字
        /// </summary>
        public string blog_name
        {
            set { _blog_name = value; }
            get { return _blog_name; }
        }
        /// <summary>
        /// 主页描述
        /// </summary>
        public string blog_description
        {
            set { _blog_description = value; }
            get { return _blog_description; }
        }
        /// <summary>
        /// 默认分类号
        /// </summary>
        public string default_category_id
        {
            set { _default_category_id = value; }
            get { return _default_category_id; }
        }
        /// <summary>
        /// 默认权限号
        /// </summary>
        public string default_permission
        {
            set { _default_permission = value; }
            get { return _default_permission; }
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
