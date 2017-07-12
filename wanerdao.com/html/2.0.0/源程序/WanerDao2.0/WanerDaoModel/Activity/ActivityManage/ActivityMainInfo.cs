#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-03-16
* 文件名：ActivityMainInfo 
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

namespace WanerDao2.WanerDaoModel.Activity.ActivityManage
{
    public class ActivityMainInfo
    {
        private string _activityid;
        private string _activityname;
        private string _createuserid;
        private string _creategroupid;
        private string _createusername;
        private string _creategroupname;

        private List<activitytags> _activitytags;
        private PlaceSet _placeset;

        private string _reportdatetime;
        private string _begintime;
        private string _endtime;

        private List<OperationManager> _operationmanager;
        private List<FinancialManager> _financialmanager;

        private string _desc;
        private ActivitySignUpInfo signupInfo;


        private List<limitcondition> _limitcondition;

        private bool _iskick;
        private double _kickduration;

        private string _remark;
       

        /// <summary>
        /// 活动ID
        /// </summary>
        public string activityid
        {
            get { return _activityid; }
            set { _activityid = value; }
        }
        /// <summary>
        /// 发起活动者
        /// </summary>
        public string createuserid
        {
            get { return _createuserid; }
            set { _createuserid = value; }
        }
        /// <summary>
        /// 发起活动圈子
        /// </summary>
        public string creategroupid
        {
            get { return _creategroupid; }
            set { _creategroupid = value; }
        }

        /// <summary>
        /// 发起活动者名
        /// </summary>
        public string createusername
        {
            get { return _createusername; }
            set { _createusername = value; }
        }
        /// <summary>
        /// 创建人电话
        /// </summary>
        public string createuserphone;
        /// <summary>
        /// 创建人邮件地址
        /// </summary>
        public string createuseremail;
        /// <summary>
        /// 发起活动圈子名
        /// </summary>
        public string creategroupname
        {
            get { return _creategroupname; }
            set { _creategroupname = value; }
        }

        /// <summary>
        /// 活动名字
        /// </summary>
        public string activityname
        {
            get { return _activityname; }
            set { _activityname = value; }
        }
        /// <summary>
        /// 分类标记
        /// </summary>
        public List<activitytags> activitytags
        {
            get { return _activitytags; }
            set { _activitytags = value; }
        }
        /// <summary>
        /// 地址设定
        /// </summary>
        public PlaceSet placeset
        {
            get { return _placeset; }
            set { _placeset = value; }
        }
        /// <summary>
        /// 活动管理人员
        /// </summary>
        public List<OperationManager> operationmanager
        {
            get { return _operationmanager; }
            set { _operationmanager = value; }
        }
        /// <summary>
        /// 活动财务人员
        /// </summary>
        public List<FinancialManager> financialmanager
        {
            get { return _financialmanager; }
            set { _financialmanager = value; }
        }
        /// <summary>
        /// 活动创建时间
        /// </summary>
        public string createdatetime;

        /// <summary>
        /// 活动开始时间
        /// </summary>
        public string begintime
        {
            get { return _begintime; }
            set { _begintime = value; }
        }
        /// <summary>
        /// 活动结束时间
        /// </summary>
        public string endtime
        {
            get { return _endtime; }
            set { _endtime = value; }
        }

        /// <summary>
        /// 活动描述
        /// </summary>
        public string desc
        {
            get { return _desc; }
            set { _desc = value; }
        }
        
        /// <summary>
        /// 报名开始日期
        /// </summary>
        public string reportdatetime
        {
            get { return _reportdatetime; }
            set { _reportdatetime = value; }
        }
        /// <summary>
        /// 报名结束时间
        /// </summary>
        public string reportenddatetime;

        public ActivitySignUpInfo SignupInfo
        {
            get { return signupInfo; }
            set { signupInfo = value; }
        }
        
        /// <summary>
        /// 门槛条件
        /// </summary>
        public List<limitcondition> limitcondition
        {
            get { return _limitcondition; }
            set { _limitcondition = value; }
        }

        /// <summary>
        /// 启动踢人保护
        /// </summary>
        public bool iskick
        {
            get { return _iskick; }
            set { _iskick = value; }
        }
        /// <summary>
        /// 启动踢人保护天数
        /// </summary>
        public double kickduration
        {
            get { return _kickduration; }
            set { _kickduration = value; }
        }
        /// <summary>
        /// 修改备注
        /// </summary>
        public string remark
        {
            get { return _remark; }
            set { _remark = value; }
        }
        /// <summary>
        /// 人数上限
        /// </summary>
        public int max_nbr;
        /// <summary>
        /// 实际参加人数
        /// </summary>
        public int join_member_nbr;

        /// <summary>
        /// 是否已经 0：未关注 1：已经关注
        /// </summary>
        public int isfollow;
    }
}
