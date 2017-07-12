#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-02-5 9:59:46 
* 文件名：groupinvite 
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

namespace WanerDao2.WanerDaoModel.Activity.ActivityCreate
{
    /// <summary>
    /// 圈子邀请
    /// </summary>
    public class groupinvite
    {
        private string _id;
        private string _name;
        /// <summary>
        /// ID
        /// </summary>
        public string id
        {
            get { return _id; }
            set { _id = value; }
        }
        /// <summary>
        /// 名字
        /// </summary>
        public string name
        {
            get { return _name; }
            set { _name = value; }
        }
    }
}
