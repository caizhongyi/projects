using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WanerDao2.WanerDaoModel.Person
{
    public class PersonalVideoSettingsModel
    {
        public PersonalVideoSettingsModel()
        { }

        #region Model
        private string _user_id;
        private string _default_folder_id = string.Empty;
        private string _default_permission = string.Empty;
        private DateTime _update_date;
        private bool _active = true;

        /// <summary>
        /// 用户编号
        /// </summary>
        public string user_id
        {
            get { return _user_id; }
            set { _user_id = value; }
        }

        /// <summary>
        /// 默认视频相册
        /// </summary>
        public string default_folder_id
        {
            get { return _default_folder_id; }
            set { _default_folder_id = value; }
        }

        /// <summary>
        /// 默认权限
        /// </summary>
        public string default_permission
        {
            get { return _default_permission; }
            set { _default_permission = value; }
        }

        /// <summary>
        /// 更新时间
        /// </summary>
        public DateTime update_date
        {
            get { return _update_date; }
            set { _update_date = value; }
        }

        /// <summary>
        /// 是否有效
        /// </summary>
        public bool active
        {
            get { return _active; }
            set { _active = value; }
        }
        #endregion
    }
}
