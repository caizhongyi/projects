using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

#region 【本类功能概述】
/* ======================================================================== *  
* 功能说明：
* 
* 作者：金广亮
* 时间：2012-10-25 23:26:38 
* 文件名：ActivityShareImageFolder 
* 版本：V0.0.1
* 
* 修改者： 
* 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion
namespace WanerDao2.WanerDaoModel.Activity
{
    [Serializable]
    public class ActivityShareImageFolder : Base.ModelBase
    {
        private string _user_id;
        private string _folder_name;
        private string _description;
        /// <summary>
        /// 创建名
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 相册名
        /// </summary>
        public string folder_name
        {
            set { _folder_name = value; }
            get { return _folder_name; }
        }
        /// <summary>
        /// 描述
        /// </summary>
        public string description
        {
            set { _description = value; }
            get { return _description; }
        }
    }
}
