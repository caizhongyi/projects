#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-02-24
* 文件名：invite 
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
using WanerDao2.WanerDaoModel.Activity.ActivityBase;

namespace WanerDao2.WanerDaoModel.Activity.ActivitySignUp
{
    public class invite
    {
        private List<groupinvite> _groupinvite;
        private List<friendinvite> _friendinvite;
        private bool _isallgroup;
        private bool _isallfriend;
        public bool isallgroup
        {
            get { return _isallgroup; }
            set { _isallgroup = value; }
        }
        public bool isallfriend
        {
            get { return _isallfriend; }
            set { _isallfriend = value; }
        }

        public List<groupinvite> groupinvite
        {
            get { return _groupinvite; }
            set { _groupinvite = value; }
        }
        public List<friendinvite> friendinvite
        {
            get { return _friendinvite; }
            set { _friendinvite = value; }
        }
    }
    /// <summary>
    /// 圈子邀请
    /// </summary>
    public class groupinvite : IdAndName
    {
    }
    /// <summary>
    /// 个人邀请
    /// </summary>
    public class friendinvite : IdAndName
    {
    }
}
