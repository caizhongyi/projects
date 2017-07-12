#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-02-03 9:39:53 
* 文件名：ActivityCreateMain 
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
using WanerDao2.WanerDaoModel.Activity.ActivitySignUp;

namespace WanerDao2.WanerDaoModel.Activity.ActivityCreate
{
    public class ActivityCreateMain
    {
        private string _activityid;
        private string _createtype;
        private string _telephone;
        private string _email;
        private bool _activityvisible;
        private PlaceSet _placeset;
        private string _activitybegintime;
        private string _activityendtime;
        private List<activitytags> _activitytags;
        private string _activityname;
        private string _activitydesc;
        private List<plan> _plan;
        private int _activitylimit;
        private string _activityovertime;
        private string _signuptype;
        private string _signuppass;
        private int _protectpeople;
        private decimal _activitycost;
        private activityschedule _activityschedule;

        private string _activitysubsistdesc;
        private List<limitcondition> _limitcondition;
        private List<budget> _budget;
        private invite _invite;
        private vehicletype _vehicletype;
        private string _archivesname;
        private int _committype;

        private List<paymethods> _paymethodsinfo;

        
        /// <summary>
        /// 活动ID
        /// </summary>
        public string activityid
        {
            get { return _activityid; }
            set { _activityid = value; }
        }
        /// <summary>
        /// 发起活动者，如果XX为个人xx字符串就创建类型ID，如果为圈子创建，就是 创建类型 +|+圈子ID
        /// </summary>
        public string createtype
        {
            get { return _createtype; }
            set { _createtype = value; }
        }
        /// <summary>
        /// 创建者电话
        /// </summary>
        public string telephone
        {
            get { return _telephone; }
            set { _telephone = value; }
        }
        /// <summary>
        /// 创建者邮箱
        /// </summary>
        public string email
        {
            get { return _email; }
            set { _email = value; }
        }
        /// <summary>
        /// 活动公开让所有人可见
        /// </summary>
        public bool activityvisible
        {
            get { return _activityvisible; }
            set { _activityvisible = value; }
        }
        /// <summary>
        /// 活动周期
        /// </summary>
        public activityschedule activityschedule
        {
            get { return _activityschedule; }
            set { _activityschedule = value; }
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
        /// 活动开始时间
        /// </summary>
        public string activitybegintime
        {
            get { return _activitybegintime; }
            set { _activitybegintime = value; }
        }
        /// <summary>
        /// 活动结束时间
        /// </summary>
        public string activityendtime
        {
            get { return _activityendtime; }
            set { _activityendtime = value; }
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
        /// 活动名字
        /// </summary>
        public string activityname
        {
            get { return _activityname; }
            set { _activityname = value; }
        }
        /// <summary>
        /// 活动描述
        /// </summary>
        public string activitydesc
        {
            get { return _activitydesc; }
            set { _activitydesc = value; }
        }
        /// <summary>
        /// 计划拟定
        /// </summary>
        public List<plan> plan
        {
            get { return _plan; }
            set { _plan = value; }
        }
        /// <summary>
        /// 人数限制
        /// </summary>
        public int activitylimit
        {
            get { return _activitylimit; }
            set { _activitylimit = value; }
        }
        /// <summary>
        /// 报名结束日期
        /// </summary>
        public string activityovertime
        {
            get { return _activityovertime; }
            set { _activityovertime = value; }
        }
        /// <summary>
        /// 报名方式  
        /// </summary>
        public string signuptype
        {
            get { return _signuptype; }
            set { _signuptype = value; }
        }
        /// <summary>
        /// 报名密码  
        /// </summary>
        public string signuppass
        {
            get { return _signuppass; }
            set { _signuppass = value; }
        }
        /// <summary>
        /// 启动踢人保护   xx(如果xx为0标识不启用，否则xx就是启动踢人保护的天数)
        /// </summary>
        public int protectpeople
        {
            get { return _protectpeople; }
            set { _protectpeople = value; }
        }
        /// <summary>
        /// 报名费用
        /// </summary>
        public decimal activitycost
        {
            get { return _activitycost; }
            set { _activitycost = value; }
        }
        
        /// <summary>
        /// 预计费用说明
        /// </summary>
        public string activitysubsistdesc
        {
            get { return _activitysubsistdesc; }
            set { _activitysubsistdesc = value; }
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
        /// 预算拟定
        /// </summary>
        public List<budget> budget
        {
            get { return _budget; }
            set { _budget = value; }
        }
        /// <summary>
        /// 发送邀请
        /// </summary>
        public invite invite
        {
            get { return _invite; }
            set { _invite = value; }
        }
        /// <summary>
        /// 乘车信息
        /// </summary>
        public vehicletype vehicletype
        {
            get { return _vehicletype; }
            set { _vehicletype = value; }
        }
        /// <summary>
        /// 保存活动设置
        /// </summary>
        public string archivesname
        {
            get { return _archivesname; }
            set { _archivesname = value; }
        }
        /// <summary>
        /// 提交保存方式 0 只保存活动 1 只保存参数 2都保存
        /// </summary>
        public int committype
        {
            get { return _committype; }
            set { _committype = value; }
        }
        /// <summary>
        /// 付款方式
        /// </summary>
        public List<paymethods> paymethodsinfo
        {
            get { return _paymethodsinfo; }
            set { _paymethodsinfo = value; }
        }

        /// <summary>
        /// 缴费说明
        /// </summary>
        public string pay_description
        {
            get;
            set;
        }

        /// <summary>
        /// 报名时必须缴费
        /// </summary>
        public bool is_pay_need
        {
            get;
            set;
        }

        /// <summary>
        /// 缴费金额
        /// </summary>
        public decimal pay_nbr
        {
            get;
            set;
        }
    }
}
