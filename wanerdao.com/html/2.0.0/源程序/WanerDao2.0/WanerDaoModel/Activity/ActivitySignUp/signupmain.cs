#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-02-25
* 文件名：signupmain 
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
using WanerDao2.WanerDaoModel.Activity.ActivityCreate;

namespace WanerDao2.WanerDaoModel.Activity.ActivitySignUp
{
    public class signupmain
    {
        private string _id;
        private string _activityid;
        private string _userid;
        private string _username;
        private string _roleid;
        private string _rolename;
        private vehicletype _vehicletype;
        private startaddress _startaddress;
        private contact _contact;
        private string _paystatus;
        private invite _invite;
        public string id
        {
            get { return _id; }
            set { _id = value; }
        }
        /// <summary>
        /// 推荐人ID
        /// </summary>
        public string recommenduserid;
        public string activityid
        {
            get { return _activityid; }
            set { _activityid = value; }
        }
        public string userid
        {
            get { return _userid; }
            set { _userid = value; }
        }
        public string username
        {
            get { return _username; }
            set { _username = value; }
        }
        public string roleid
        {
            get { return _roleid; }
            set { _roleid = value; }
        }
        public string rolename
        {
            get { return _rolename; }
            set { _rolename = value; }
        }
        
        public vehicletype vehicletype
        {
            get { return _vehicletype; }
            set { _vehicletype = value; }
        }
        
        public startaddress startaddress
        {
            get { return _startaddress; }
            set { _startaddress = value; }
        }
        
        public contact contact
        {
            get { return _contact; }
            set { _contact = value; }
        }
        
        public string paystatus
        {
            get { return _paystatus; }
            set { _paystatus = value; }
        }
        
        public invite invite
        {
            get { return _invite; }
            set { _invite = value; }
        }

        /// <summary>
        /// 付款方式
        /// </summary>
        public List<paymethods> paymethodsinfo
        {
            get;
            set;
        }
    }
}
