using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Activity.ActivitySignUp;

#region 【本类功能概述】
/* ======================================================================== *  
* 功能说明：
* 
* 作者：金广亮
* 时间：2012-11-18 15:11:52 
* 文件名：ActivityMain 
* 版本：V0.0.1
* 
* 修改者： 
* 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion
namespace WanerDao2.WanerDaoModel.Activity.ActivityCreate
{
    /// <summary>
    /// 活动创建主体类
    /// </summary>
    public class ActivityMain
    {
        /// <summary>
        /// 活动ID
        /// </summary>
        public string activityid { get; set; }
        /// <summary>
        /// 发起活动者，如果XX为个人xx字符串就创建类型ID，如果为圈子创建，就是 创建类型 +|+圈子ID
        /// </summary>
        public string createtype { get; set; }
        /// <summary>
        /// 创建者电话
        /// </summary>
        public string telephone { get; set; }
        /// <summary>
        /// 创建者邮箱
        /// </summary>
        public string email { get; set; }
        /// <summary>
        /// 活动公开让所有人可见
        /// </summary>
        public bool activityvisible { get; set; }
        /// <summary>
        /// 活动周期
        /// </summary>
        public activityschedule activityschedulelist { get; set; }
        /// <summary>
        /// 地址设定
        /// </summary>
        public PlaceSet placesets { get; set; }
        /// <summary>
        /// 活动开始时间
        /// </summary>
        public string activitybegintime { get; set; }
        /// <summary>
        /// 活动结束时间
        /// </summary>
        public string activityendtime { get; set; }
        /// <summary>
        /// 分类标记
        /// </summary>
        public List<activitytags> activitytagslist { get; set; }
        /// <summary>
        /// 活动标题
        /// </summary>
        public string activityname { get; set; }
        /// <summary>
        /// 活动描述
        /// </summary>
        public string activitydesc { get; set; }
        /// <summary>
        /// 活动计划
        /// </summary>
        public List<plan> plans { get; set; }
        /// <summary>
        /// 活动限定人数
        /// </summary>
        public int activitylimit { get; set; }
        /// <summary>
        /// 报名结束日期
        /// </summary>
        public string activityovertime { get; set; }
        /// <summary>
        /// 报名方式
        /// </summary>
        public string signuptype { get; set; }
        /// <summary>
        /// 报名密码，如果报名方式为 密码验证加入此字段不可为空
        /// </summary>
        public string signuppass { get; set; }
        /// <summary>
        /// 启动踢人保护   xx(如果xx为0标识不启用，否则xx就是启动踢人保护的天数)
        /// </summary>
        public int protectpeople { get; set; }
        /// <summary>
        /// 报名费用
        /// </summary>
        public decimal activitycost { get; set; }
        /// <summary>
        /// 预计费用说明
        /// </summary>
        public string activitysubsistdesc { get; set; }
        /// <summary>
        /// 支持缴费方式以及账号或支付地址
        /// </summary>
        public List<paymethods> paymethodsinfo { get; set; }
        /// <summary>
        /// 门槛条件
        /// </summary>
        public List<limitcondition> limitcondition { get; set; }
        /// <summary>
        /// 财务预算
        /// </summary>
        public List<budget> activtiybudget { get; set; }
        /// <summary>
        /// 活动邀请
        /// </summary>
        public invite activtiyinvite { get; set; }
        /// <summary>
        /// 乘车信息
        /// </summary>
        public vehicletype activtiyvehicletype { get; set; }
        /// <summary>
        /// 保存活动设置
        /// </summary>
        public string archivesname { get; set; }
        /// <summary>
        /// 提交保存方式 0 创建活动1 只保存参数
        /// </summary>
        public int committype { get; set; }

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
