using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

namespace Efsframe.cn.declare
{
  /// <summary>
  /// Table 的摘要说明
  /// </summary>
  public class Table
  {
    /// 系统字典表名称定义
    /// 
    /// 系统字典都是从系统的相关数据表中虚拟出来的字典表，可以实现普通字典的翻译功能
    public const string DIC_MANAGEUNIT = "MANAGEUNIT";                   /// 管理单位字典
    public const string DIC_AFFAIRTYPE = "AFFAIRTYPE";                   /// 事务类型字典
    public const string DIC_EVENTTYPE = "EVENTTYPE";                     /// 事件类型字典
    public const string DIC_USERLIST = "USERLIST";                       /// 用户姓名字典

    /// 普通字典表名称定义
    public const string DIC_ABLE = "DIC_ABLE";                          /// 能否
    public const string DIC_CODE = "DIC_CODE";                          /// 行政区划
    public const string DIC_DUTY = "DIC_DUTY";                          /// 职务
    public const string DIC_EDUCATION = "DIC_EDUCATION";                /// 文化程度
    public const string DIC_GENDER = "DIC_GENDER";                      /// 性别
    public const string DIC_LOCUSAREA = "DIC_LOCUSAREA";                /// 所在地区
    public const string DIC_LOGOUT_STATUS = "DIC_LOGOUT_STATUS";            /// 注销状态表
    public const string DIC_MARRIAGE = "DIC_MARRIAGE";                 /// 婚姻状况
    public const string DIC_NATIVE = "DIC_NATIVE";                   /// 民族
    public const string DIC_OCCUPATION = "DIC_OCCUPATION";               /// 职业
    public const string DIC_TRUEFALSE = "DIC_TRUEFALSE";                /// 是否
    public const string DIC_TYPE_FLAG = "DIC_TYPE_FLAG";                /// 人员分类表(按区域)
    public const string DIC_USERTYPE = "DIC_USERTYPE";                 /// 用户类型
    public const string DIC_VALID = "DIC_VALID";                    /// 有效
    public const string DIC_YESORNO = "DIC_YESORNO";                  /// 是否
    public const string DIC_CASESTATE = "DIC_CASESTATE";                /// 案件状态
    public const string DIC_CLAN = "DIC_CLAN";                     /// 政治面貌 
    public const string DIC_STREAMTYPE = "DIC_STREAMTYPE";               /// 工作流类型
    public const string DIC_TASKSTATE = "DIC_TASKSTATE";                /// 任务状态
    public const string DIC_AFFAIRTYPEMODE = "DIC_AFFAIRTYPEMODE";           /// 任务状态
    public const string DIC_OPERATIONTYPE = "DIC_OPERATIONTYPE";            /// 任务状态
    public const string DIC_MLEVEL = "DIC_MLEVEL";                   /// 单位级别
    public const string DIC_MTYPE = "DIC_MTYPE";                    /// 单位类型
    public const string DIC_DICEDITABLE = "DIC_DICEDITABLE";              /// 字典是否可修改
    public const string DIC_IDPARA = "DIC_IDPARA";                   /// 编码规则字典

    /// 视图定义
    public const string VW_USERRIGHT = "VW_USERRIGHT";                 /// 用户实际权限视图
    public const string VW_USERRIGHTTREE = "VW_USERRIGHTTREE";             /// 用户功能树视图
    public const string VW_EVENTTYPE = "VW_EVENTTYPE";                 /// 事件类型视图
    public const string VW_ROLEPOWER = "VW_ROLEPOWER";                 /// 角色权限视图
    public const string VW_ROLEUSER = "VW_ROLEUSER";                  /// 角色用户视图
    public const string VW_USERLIST = "VW_USERLIST";                  /// 用户视图
    public const string VW_WF_CONFIG = "VW_WF_CONFIG";                 /// 工作流配置视图
    public const string VW_TASKSTATE = "VW_TASKSTATE";                 /// 任务信息视图


    /// 数据表定义
    public const string MAXID = "MAXID";                        /// 最大编号分配表
    public const string MAXIDTYPE = "MAXIDTYPE";                    /// 最大编号定义表
    public const string SPELL = "SPELL";                        /// 拼音表
    public const string SYSPARA = "SYSPARA";                      /// 系统参数表
    public const string SYSPARA1 = "SYSPARA1";                     /// 系统参数表
    public const string ERRLOG = "ERRLOG";                       /// 错误日志表
    public const string SYSLOG = "SYSLOG";                       /// 系统日志表

    public const string AFFAIRTYPE = "AFFAIRTYPE";                   /// 事务类型
    public const string EVENTTYPE = "EVENTTYPE";                    /// 事件类型
    public const string WF_DEFINE = "WF_DEFINE";                    /// 工作流模板定义表
    public const string WF_TEMPLATE = "WF_TEMPLATE";                  /// 工作流模板表
    public const string WF_CONFIG = "WF_CONFIG";                    /// 工作流配置表

    public const string ROLEBASIC = "ROLEBASIC";                    /// 角色信息表
    public const string USERLIST = "USERLIST";                     /// 用户信息表
    public const string ROLEPOWER = "ROLEPOWER";                    /// 角色权限表
    public const string ROLEUSER = "ROLEUSER";                     /// 角色用户关系表

    public const string AFFAIR = "AFFAIR";                       /// 事务信息表
    public const string EVENT = "EVENT";                        /// 事件信息表
    public const string TASKSTATE = "TASKSTATE";                    /// 任务信息表
    public const string MSGINFO = "MSGINFO";                      /// 用户消息表
    public const string SQLSTORAGE = "SQLSTORAGE";                   /// 事件数据操作语句

    public const string DICLIST = "DICLIST";                      /// 普通字典定义表
    public const string DICDATA = "DICDATA";                      /// 普通字典数据表

    public const string MANAGEUNIT = "MANAGEUNIT";                   /// 管理单位表


    public const string EVENTSTREAM = "EVENTSTREAM";                   ///   事件流
    public const string BAR = "BAR";                           ///   间隔条
    public const string EVENTSTREAMGROUP = "EVENTSTREAMGROUP";              ///   事件流组 

    public const string S = "s";                                      ///   表别名


    public const string PERSON = "PERSON";                        ///  学生档案表

  }
}