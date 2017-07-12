#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
*  插件信息 实体
* 作者：吴志斌   时间：2011/11/3 21:13:10 
* 文件名：ToolPackage 
* 版本：V1.0.0
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion

using System;

namespace WanerDao2.WanerDaoModel.Tool
{
    /// <summary>
    /// 插件信息
    /// </summary>
    [Serializable]
    public partial class ToolPackageModel
    {
        public ToolPackageModel()
        { }

        #region Model
        private string _id;
        private int _sort_id;
        private string _tool_key;
        private string _version;
        private string _permission;
        private string _developer_id;
        private string _secrect;
        private string _url;
        private string _logo_location;
        private int? _rate;
        private string _tool_description;
        private string _category_id;
        private string _tool_name;
        private int? _status;
        private string _approval_id;
        private DateTime? _update_time;
        private bool? _active;

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
        /// 插件产品编号
        /// </summary>
        public string tool_key
        {
            set { _tool_key = value; }
            get { return _tool_key; }
        }

        /// <summary>
        /// 版本
        /// </summary>
        public string version
        {
            set { _version = value; }
            get { return _version; }
        }

        /// <summary>
        /// 权限
        /// </summary>
        public string permission
        {
            set { _permission = value; }
            get { return _permission; }
        }

        /// <summary>
        /// 开发者ID
        /// </summary>
        public string developer_id
        {
            set { _developer_id = value; }
            get { return _developer_id; }
        }

        /// <summary>
        /// 插件密钥
        /// </summary>
        public string secrect
        {
            set { _secrect = value; }
            get { return _secrect; }
        }

        /// <summary>
        /// 插件存放的地址
        /// </summary>
        public string url
        {
            set { _url = value; }
            get { return _url; }
        }

        /// <summary>
        /// 插件logo
        /// </summary>
        public string logo_location
        {
            set { _logo_location = value; }
            get { return _logo_location; }
        }

        /// <summary>
        /// 插件好评度
        /// </summary>
        public int? rate
        {
            set { _rate = value; }
            get { return _rate; }
        }

        /// <summary>
        /// 插件描述
        /// </summary>
        public string tool_description
        {
            set { _tool_description = value; }
            get { return _tool_description; }
        }

        /// <summary>
        /// 插件类型编号
        /// </summary>
        public string category_id
        {
            set { _category_id = value; }
            get { return _category_id; }
        }

        /// <summary>
        /// 插件名称
        /// </summary>
        public string tool_name
        {
            set { _tool_name = value; }
            get { return _tool_name; }
        }

        /// <summary>
        /// 插件状态
        /// </summary>
        public int? status
        {
            set { _status = value; }
            get { return _status; }
        }

        /// <summary>
        /// 审批ID
        /// </summary>
        public string approval_id
        {
            set { _approval_id = value; }
            get { return _approval_id; }
        }

        /// <summary>
        /// 更新时间
        /// </summary>
        public DateTime? update_time
        {
            set { _update_time = value; }
            get { return _update_time; }
        }

        /// <summary>
        /// 是否有效
        /// </summary>
        public bool? active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion
    }
}
