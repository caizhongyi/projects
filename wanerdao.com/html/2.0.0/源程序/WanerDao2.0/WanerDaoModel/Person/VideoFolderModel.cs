#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 视频文件夹模型
* 作者：杨晓东   时间：2011/10/2 23:29:32 
* 文件名：VideoFolderModel 
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
    /// 视频文件夹
    /// </summary>
    [Serializable]
    public partial class VideoFolderModel
    {
        public VideoFolderModel()
        { }
        #region Model
        private string _id;
        private string _user_id;
        private string _folder_name;
        private DateTime _create_date;
        private string _description;
        private bool _is_system;
        private string _permission;
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
        /// 用户名
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 视频夹名字
        /// </summary>
        public string folder_name
        {
            set { _folder_name = value; }
            get { return _folder_name; }
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
        /// 描述
        /// </summary>
        public string description
        {
            set { _description = value; }
            get { return _description; }
        }
        /// <summary>
        /// 是否系统自建
        /// </summary>
        public bool is_system
        {
            set { _is_system = value; }
            get { return _is_system; }
        }
        /// <summary>
        /// 视频夹权限
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
