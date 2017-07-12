#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
*  插件类型信息 实体
* 作者：吴志斌   时间：2011/11/3 21:25:32 
* 文件名：ToolCategory 
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
    /// 插件类型
    /// </summary>
    [Serializable]
    public partial class ToolCategoryModel
    {
        public ToolCategoryModel()
        { }

        #region Model
        private string _category_id;
        private string _parent_id;
        private string _category_name;
        private string _description;
        private DateTime? _update_time;
        private bool? _active;

        /// <summary>
        /// 类型ID
        /// </summary>
        public string category_id
        {
            set { _category_id = value; }
            get { return _category_id; }
        }

        public string parent_id
        {
            set { _parent_id = value; }
            get { return _parent_id; }
        }

        /// <summary>
        /// 类型名称
        /// </summary>
        public string category_name
        {
            set { _category_name = value; }
            get { return _category_name; }
        }

        /// <summary>
        /// 类型描述
        /// </summary>
        public string description
        {
            set { _description = value; }
            get { return _description; }
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
