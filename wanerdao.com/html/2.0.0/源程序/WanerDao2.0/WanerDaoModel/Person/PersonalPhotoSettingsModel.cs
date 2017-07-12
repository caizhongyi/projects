#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2011/12/30 0:46:52 
* 文件名：PersonalPhotoSettingsModel 
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
    /// 个人相册设定表，记录个人的相册设定
    /// </summary>
    [Serializable]
    public class PersonalPhotoSettingsModel
    {
        public PersonalPhotoSettingsModel()
        { }
        #region Model
        private string _user_id;
        private string _default_folder_id="";
        private string _default_folder_name="";
        private string _default_permission="";
        private string _default_permission_name="";
        private DateTime _update_date;
        private bool _active = true;
        /// <summary>
        /// 用户id
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 默认相册号
        /// </summary>
        public string default_folder_id
        {
            set { _default_folder_id = value; }
            get { return _default_folder_id; }
        }
        /// <summary>
        /// 默认相册名称
        /// </summary>
        public string default_folder_name
        {
            set { _default_folder_name = value; }
            get { return _default_folder_name; }
        }
        /// <summary>
        /// 默认权限
        /// </summary>
        public string default_permission
        {
            set { _default_permission = value; }
            get { return _default_permission; }
        }
        /// <summary>
        /// 默认权限名称
        /// </summary>
        public string default_permission_name
        {
            set { _default_permission_name = value; }
            get { return _default_permission_name; }
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
