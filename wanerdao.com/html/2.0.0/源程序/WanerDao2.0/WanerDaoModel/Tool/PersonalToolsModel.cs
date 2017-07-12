#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
*  个人工具设定信息表 实体
* 作者：徐蓓   时间：2012/5/29 21:18:10 
* 文件名：PersonalTools 
* 版本：V1.0.0
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

namespace WanerDao2.WanerDaoModel.Tool
{
    public class PersonalToolsModel
    {
        public PersonalToolsModel()
        { }
        #region Model
        private string _id = string.Empty;
        private string _user_id = string.Empty;
        private string _tool_id = string.Empty;
        private int _sequence = -1;
        private bool _is_onbar = false;
        private bool _active = true;
        /// <summary>
        /// 主键
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 用户主键
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 工具主键
        /// </summary>
        public string tool_id
        {
            set { _tool_id = value; }
            get { return _tool_id; }
        }
        /// <summary>
        /// 顺序
        /// </summary>
        public int sequence
        {
            set { _sequence = value; }
            get { return _sequence; }
        }
        /// <summary>
        /// 是否外放到工具条
        /// </summary>
        public bool is_onbar
        {
            set { _is_onbar = value; }
            get { return _is_onbar; }
        }
        /// <summary>
        /// 是否可用
        /// </summary>
        public bool active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }

}
