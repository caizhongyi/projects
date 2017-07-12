#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
*  插件审批信息 实体
* 作者：吴志斌   时间：2011/11/3 21:18:10 
* 文件名：ToolApproval 
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
    /// 插件审批
    /// </summary>
    [Serializable]
    public partial class ToolApprovalModel
    {
        public ToolApprovalModel()
        { }

        #region Model
        private string _id;
        private string _tool_id;
        private int? _status;
        private string _approval_id;
        private DateTime? _approval_date;
        private string _memo;
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
        /// 插件ID
        /// </summary>
        public string tool_id
        {
            set { _tool_id = value; }
            get { return _tool_id; }
        }

        /// <summary>
        /// 审批状态
        /// </summary>
        public int? status
        {
            set { _status = value; }
            get { return _status; }
        }

        /// <summary>
        /// 审批人ID
        /// </summary>
        public string approval_id
        {
            set { _approval_id = value; }
            get { return _approval_id; }
        }

        /// <summary>
        /// 审批时间
        /// </summary>
        public DateTime? approval_date
        {
            set { _approval_date = value; }
            get { return _approval_date; }
        }

        /// <summary>
        /// 审批备注
        /// </summary>
        public string memo
        {
            set { _memo = value; }
            get { return _memo; }
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
