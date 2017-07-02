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
  /// Field 的摘要说明
  /// </summary>
  public class Field
  {
    public const string STATUS = "STATUS";                       /// 管理状态
    public const string CORTABLENAME = "CORTABLENAME";                 /// 对应表名


    public const string IDTYPE = "IDTYPE";                       /// 最大编号类型
    public const string IDNAME = "IDNAME";                       /// 编号类型名称
    public const string IDSIZE = "IDSIZE";                       /// 编码长度
    public const string IDPARA = "IDPARA";                       /// 编号是否叠加种子
    public const string IDLOOP = "IDLOOP";                       /// 是否循环编码
    public const string IDMIN = "IDMIN";                        /// 起始编码
    public const string IDMAX = "IDMAX";                        /// 最大编码
    public const string IDDES = "IDDES";                        /// 编码类型描述
    public const string MAXID = "MAXID";                        /// 最大编号
    public const string MAXID1 = "MAXID1";                       /// 最大编号1
    public const string MAXID2 = "MAXID2";                       /// 最大编号2
    public const string MAXID3 = "MAXID3";                       /// 最大编号3
    public const string ID1 = "ID1";                          /// 最大编号3
    public const string ID2 = "ID2";                          /// 最大编号3

    public const string WORD = "WORD";                         /// 字符
    public const string SPELL = "SPELL";                        /// 拼音头
    public const string ASPELL = "ASPELL";                       /// 全拼

    public const string AFFAIRTYPEID = "AFFAIRTYPEID";                 /// 事务类型编号
    public const string AFFAIRTYPENAME = "AFFAIRTYPENAME";               /// 事件类型编号
    public const string AFFAIRTYPEMODE = "AFFAIRTYPEMODE";               /// 事务类型模式
    public const string AFFAIRTYPEDES = "AFFAIRTYPEDES";                /// 事务类型描述

    public const string EVENTTYPEID = "EVENTTYPEID";                  /// 事件类型编号
    public const string EVENTTYPENAME = "EVENTTYPENAME";                /// 事件类型编号
    public const string OPURL = "OPURL";                        /// 操作URL
    public const string EVENTTYPEDES = "EVENTTYPEDES";                 /// 事件类型描述
    public const string SHORTCUT = "SHORTCUT";                     /// 是否为快捷方式
    public const string VISIBLE = "VISIBLE";                      /// 是否显示
    public const string BEGINEVENT = "BEGINEVENT";                   /// 是否为起始事件类型
    public const string DISABLED = "DISABLED";                     /// 是否禁用

    public const string GROUPID = "GROUPID";                      /// 工作流组号
    public const string GROUPNAME = "GROUPNAME";                    /// 工作流组名

    public const string WFID = "WFID";                         /// 工作流编号
    public const string WFNAME = "WFNAME";                       /// 工作流名称
    public const string WFDES = "WFDES";                        /// 工作流描述
    public const string UNITLEVEL = "UNITLEVEL";                    /// 已完成事件单位级别
    public const string UNITTYPE = "UNITTYPE";                     /// 已完成事件单位类型

    public const string STREAMCONDITION = "STREAMCONDITION";              /// 工作流条件
    public const string NEXTEVENTTYPEID = "NEXTEVENTTYPEID";              /// 下一事件类型编号
    public const string NEXTUNITLEVEL = "NEXTUNITLEVEL";                /// 下一用户单位级别
    public const string NEXTUNITTYPE = "NEXTUNITTYPE";                 /// 下一用户单位类型
    public const string STREAMDES = "STREAMDES";                    /// 工作流描述
    public const string STREAMTYPE = "STREAMTYPE";                   /// 工作流类型

    public const string EVENTSTREAMID = "EVENTSTREAMID";                /// 事务事件流编号
    public const string STREAMSTATE = "STREAMSTATE";                  /// 工作流状态
    public const string NEXTEVENTTYPENAME = "NEXTEVENTTYPENAME";            /// 下一事件类型名称
    public const string NEXTEVENTTYPESTATE = "NEXTEVENTTYPESTATE";           /// 下一事件类型状态
    public const string MSGEVENTTYPEID = "MSGEVENTTYPEID";               /// 消息事件类型编号
    public const string MSGID = "MSGID";                        /// 消息编号
    public const string MSGCONTENT = "MSGCONTENT";                   /// 消息正文
    public const string ISREAD = "ISREAD";                       /// 是否阅读消息
    public const string MSGEVENTTYPENAME = "MSGEVENTTYPENAME";             /// 消息事件类型名称
    public const string MSGUNITID = "MSGUNITID";                    /// 接收单位编号
    public const string MSGUNITNAME = "MSGUNITNAME";                  /// 接收单位名称
    public const string NEXTUNITID = "NEXTUNITID";                   /// 下一用户单位编号
    public const string NEXTUNITNAME = "NEXTUNITNAME";                 /// 下一用户单位名称
    public const string NEXTUNITMODE = "NEXTUNITMODE";                 /// 下一用户单位模式

    public const string TASKTITLE = "TASKTITLE";                    /// 任务标题
    public const string TASKSTATE = "TASKSTATE";                    /// 任务状态
    public const string TASKTYPE = "TASKTYPE";                     /// 任务类型
    public const string RELATIONDATA = "RELATIONDATA";                 /// 关联数据

    public const string ROLEID = "ROLEID";                       /// 角色编号
    public const string ROLENAME = "ROLENAME";                     /// 角色名称
    public const string ROLEDES = "ROLEDES";                      /// 角色描述

    public const string USERID = "USERID";                       /// 用户编号
    public const string PERSONID = "PERSONID";                     /// 用户人要素ID
    public const string USERTYPE = "USERTYPE";                     /// 用户类型
    public const string USERTITLE = "USERTITLE";                    /// 用户名称
    public const string USERNAME = "USERNAME";                     /// 用户姓名
    public const string USERPASSWORD = "USERPASSWORD";                 /// 用户口令
    public const string UNITID = "UNITID";                       /// 用户单位编号
    public const string UNITNAME = "UNITNAME";                     /// 用户单位名称
    public const string USERDES = "USERDES";                      /// 用户描述
    public const string OLDPASSWORD = "OLDPASSWORD";                  /// 用户原口令
    public const string CANEDITPASSWORD = "CANEDITPASSWORD";              /// 用户能够修改口令
    public const string DUTY = "DUTY";                         /// 职务
    public const string SEX = "SEX";                          /// 性别
    public const string IDCARD = "IDCARD";                       /// 公民身份号码
    public const string CONTACT = "CONTACT";                      /// 联系方式
    public const string SMSTEL = "SMSTEL";                       /// 短信手机
    public const string DCNO = "DCNO";                         /// 数字证书编号
    public const string NATIVEPLACE = "NATIVEPLACE";                  /// 籍贯
    public const string EDUCATION = "EDUCATION";                    /// 文化程度
    public const string ADDRESS = "ADDRESS";                      /// 家庭住址
    public const string TEMPADDRESS = "TEMPADDRESS";                  /// 暂住地址
    public const string MARRIAGE = "MARRIAGE";                     /// 婚姻状况
    public const string BIRTHDAY = "BIRTHDAY";                     /// 出生日期
    public const string NATION = "NATION";                       /// 民族

    public const string MUNITID = "MUNITID";                      /// 管理单位编号
    public const string MUNITNAME = "MUNITNAME";                    ///
    public const string MTYPE = "MTYPE";                        /// 单位类型
    public const string MDES = "MDES";                         ///
    public const string MSUNITID = "MSUNITID";                     ///
    public const string MLEVEL = "MLEVEL";                       ///
    public const string MUNITIDS = "MUNITIDS";                     ///
    public const string MUNITNAMES = "MUNITNAMES";                   ///

    public const string FIELDNAME = "FIELDNAME";                    ///

    public const string ERRID = "ERRID";                        /// 错误编号
    public const string AFFAIRID = "AFFAIRID";                     /// 事务编号
    public const string AFFAIRSTATE = "AFFAIRSTATE";                  /// 事务状态
    public const string EVENTID = "EVENTID";                      /// 事件编号
    public const string TASKID = "TASKID";                       /// 任务编号
    public const string OPID = "OPID";                         /// 原操作编号
    public const string OPTIME = "OPTIME";                       /// 操作时间
    public const string ERRDES1 = "ERRDES";                      /// 错误描述1
    public const string ERRDES2 = "ERRDES2";                      /// 错误描述2

    public const string LOGID = "LOGID";                        /// 日志编号
    public const string LOGINIP = "LOGINIP";                      /// 登录IP
    public const string MAC = "MAC";                          /// 网卡MAC地址 
    public const string ENTERTIME = "ENTERTIME";                    /// 登录时间
    public const string LEAVETIME = "LEAVETIME";                    /// 离开时间

    public const string OBJID = "OBJID";                        /// 对象标识
    public const string OPXML = "OPXML";                        /// 事件 XML 数据

    public const string SQLID = "SQLID";                        /// SQL 编号
    public const string SQLSCRIPT = "SQLSCRIPT";                    /// SQL 脚本

    public const string DICNAME = "DICNAME";                      ///
    public const string DICDES = "DICDES";
    public const string CODELEN = "CODELEN";
    public const string TEXTLEN = "TEXTLEN";
    public const string EDITABLE = "EDITABLE";

    public const string DIC_CODE = "DIC_CODE";                     /// 字典编码
    public const string DIC_TEXT = "DIC_TEXT";                     /// 字典描述
    public const string DIC_VALID = "DIC_VALID";                    /// 字典是否有效
    public const string DIC_SPELL = "DIC_SPELL";                    /// 简拼
    public const string DIC_ASPELL = "DIC_ASPELL";                   /// 全拼

    public const string RANGEID = "RANGEID";                      ///
    public const string RANGENAME = "RANGENAME";                    ///
    public const string VALID = "VALID";                        ///

    public const string APPLYDATE = "APPLYDATE";                        ///
  }
}