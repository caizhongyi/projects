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
  /// Common 的摘要说明
  /// </summary>
  public class Common
  {
    /// 系统名称
    public const string SYSTEM_NAME = "efs";

    /// 数据库类型定义
    public const string C_ORACLE = "ORACLE";
    public const string C_MSSQL = "MSSQL";
    public const string C_UNSUPPORT = "UNSUPPORT";

    /// SQL语句连接字符、分隔符
    public const string STR_DATE_SYS = "$DATE_SYS_";     /// 系统时间(精确到毫秒)
    public const string STR_DATE = "$DATE_";         /// 录入时间(精确到天)
    public const string STR_DATE_DB = "$DATE_DB";       /// 数据库时间(精确到毫秒)
    public const string STR_COMPAR = "$";              /// 日期分隔
    public const string STR_SEP = "$SEP$";          /// 语句分隔
    public const string MACRO_BLOB = "$BLOB_";         /// 待插入的 BLOB 类型
    public const string MACRO_AT = "@";              /// 字段名的分隔符
    public const string MACRO_AT_ = "@_";
    public const string MACRO_DOLLAR = "$";

    public const string SPACE = " ";
    public const string COMMA = ",";
    public const string SEMICOLON = ";";
    public const string DOT = ".";
    public const string SEP = "▓";
    public const string BAR = "/";
    public const string BAR2 = "//";
    public const string MARK = "°";
    public const string QUOTE = "'";
    public const string RETURN = "\n";

    public const string ON = "ON";
    public const string AS = "AS";
    public const string ALL = "*";

    public const string EQUAL = "=";
    public const string N_EQUAL = "!=";
    public const string BIG = ">";
    public const string BIG_EQUAL = ">=";
    public const string LESS = "<";
    public const string LESS_EQUAL = "<=";
    public const string IS = "IS";
    public const string NOT = "NOT";
    public const string NULL = "NULL";
    public const string LIKE = SPACE + "LIKE" + SPACE;
    public const string N_LIKE = SPACE + NOT + LIKE;
    public const string IN = SPACE + "IN" + SPACE;
    public const string NOT_IN = SPACE + NOT + IN;
    public const string IS_NULL = SPACE + IS + SPACE + NULL;
    public const string IS_NOT_NULL = SPACE + IS + SPACE + NOT + SPACE + NULL;

    public const string LEFT_JOIN = "LEFT JOIN";
    public const string LEFT_OUTER_JOIN = "LEFT OUTER JOIN";
    public const string RIGHT_JOIN = "RIGHT JOIN";
    public const string RIGHT_OUTER_JOIN = "RIGHT OUTER JOIN";
    public const string JOIN = "JOIN";
    public const string INNER_JOIN = "INNER JOIN";

    public const string INSERT = "INSERT" + SPACE +
                                                                "INTO" + SPACE;
    public const string UPDATE = "UPDATE" + SPACE;
    public const string DELETE = "DELETE" + SPACE +
                                                                "FROM" + SPACE;
    public const string VALUES = "VALUES" + SPACE;
    public const string SELECT = "SELECT" + SPACE;
    public const string FROM = "FROM" + SPACE;
    public const string WHERE = "WHERE" + SPACE;
    public const string AND = "AND" + SPACE;
    public const string GROUP = "GROUP BY" + SPACE;
    public const string ORDER = "ORDER BY" + SPACE;
    public const string HAVING = "HAVING" + SPACE;
    public const string SET = "SET" + SPACE;
    public const string OJOIN = "(+)";
    public const string DISTINCT = "DISTINCT" + SPACE;
    public const string RETURNING = "RETURNING" + SPACE;
    public const string DECLARE = "DECLARE";
    public const string BEGIN = "BEGIN";
    public const string END = "END";
    public const string BLOB = "BLOB";
    public const string EMPTY_BLOB = "EMPTY_BLOB()";
    public const string INTO = "INTO" + SPACE;

    public const string DBFUNC_SYSDATE = "SYSDATE";
    public const string DBFUNC_HEXTORAW = "HEXTORAW";
    public const string DBFUNC_DBMS_LOB_WRITE = "DBMS_LOB.WRITE";

    public const string S_FROM = SPACE + FROM;
    public const string S_VALUES = SPACE + VALUES;
    public const string S_SET = SPACE + SET;
    public const string S_WHERE = SPACE + WHERE;
    public const string S_AND = SPACE + AND;
    public const string S_GROUP = SPACE + GROUP;
    public const string S_ORDER = SPACE + ORDER;
    public const string S_HAVING = SPACE + HAVING;
    public const string S_DESC = SPACE + "DESC";
    public const string S_RETURNING = SPACE + RETURNING;
    public const string S_INTO = SPACE + INTO;

    public const string DECLARE_R = DECLARE + RETURN;
    public const string BEGIN_R = BEGIN + RETURN;

    public const string FLG_TRUE = "1";
    public const string FLG_FALSE = "0";

    public const string USERTYPE_SP = "AA";

    /// 不能识别的汉字所获得的拼音信息
    public const string NOT_FOUND_SPELL = "?";

    /// 错误描述定义
    public const string ERR_UNKOWN = "未知错误";
    public const string ERR_QUERYNOTHING = "返回结果为空";
    public const string ERR_QUERYXMLFAILED = "返回结果重组失败";
    public const string ERR_WITHOUTDATASEP = "缺少日期分割标志符";
    public const string ERR_INVALIDDATE = "日期格式不合法";
    public const string ERR_NOTSUPPORTDBMS = "不支持的数据库系统";
    public const string ERR_NOTFOUNDCONFIGFILE = "找不到系统配置文件:";

    /// 操作常数定义
    public const string OP_INSERT = "0";
    public const string OP_UPDATE = "1";
    public const string OP_DELETE = "2";

    public const int IOP_INSERT = 0;
    public const int IOP_UPDATE = 1;
    public const int IOP_DELETE = 2;

    /// 操作常数定义
    public const string OP_READ = "0";
    public const string OP_WRITE = "1";

    public const int IOP_READ = 0;
    public const int IOP_WRITE = 1;

    /// 字段状态定义
    public const string ST_NORMAL = "0";
    public const string ST_QUERY = "5";
    public const string ST_DONOTHING = "9";

    public const int IST_NORMAL = 0;
    public const int IST_QUERY = 5;
    public const int IST_DONOTHING = 9;

    /// 字段类型定义
    public const string DT_STRING = "0";
    public const string DT_NUMBER = "1";
    public const string DT_SYSDATETIME = "2";
    public const string DT_DATE = "3";
    public const string DT_DATETIME = "4";
    public const string DT_BINARY = "5";
    public const string DT_SQLSCRIPT = "5";

    public const int IDT_string = 0;
    public const int IDT_NUMBER = 1;
    public const int IDT_SYSDATETIME = 2;
    public const int IDT_DATE = 3;
    public const int IDT_DATETIME = 4;
    public const int IDT_BINARY = 5;

    /// 函数返回
    public const int RT_SUCCESS = 0;                /// 成功
    public const int RT_FUNCERROR = 1;                /// 失败
    public const int RT_LOGICERROR = 2;                /// 逻辑错误

    public const string SRT_SUCCESS = "0";              /// 成功
    public const string SRT_FUNCERROR = "1";              /// 失败
    public const string SRT_LOGICERROR = "2";              /// 逻辑错误

    public const string RT_QUERY_SUCCESS = "00";             /// 查询返回有记录
    public const string RT_QUERY_NOTHING = "01";             /// 查询返回无记录

    /// 最大编号定义
    public const string MAX_ROLEID = "000001";         /// 角色编号
    public const string MAX_USERID = "000002";         /// 用户编号
    public const string MAX_ERROR_LOGID = "000003";         /// 错误日志编号
    public const string MAX_SYSTEM_LOGID = "000004";         /// 系统日志编号
    public const string MAX_WORKFLOWID = "000010";         /// 工作流编号
    public const string MAX_OBJID = "000011";         /// 对象标识
    public const string MAX_TASKID = "000012";         /// 任务编号

    /// XML 文档节点定义
    public const string XML_HEADINFO = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";

    public const string XML_NODE_ELEMENT = "Element";
    public const string XML_NODE_ATTRIBUTE = "Attribute";

    public const string XDOC_ROOT = "EFSFRAME";
    public const string XDOC_LOGIC_ROOT = "LOGIC";
    public const string XDOC_DATAINFO = "DATAINFO";
    public const string XDOC_USERINFO = "USERINFO";
    public const string XDOC_ERRORINFO = "ERRORINFO";
    public const string XDOC_QUERYINFO = "QUERYINFO";
    public const string XDOC_DATA = "DATA";
    public const string XDOC_SQLSCRIPT = "SQLSCRIPT";

    public const string XDOC_ERRORRESULT = "ERRORRESULT";
    public const string XDOC_FUNCERROR = "FUNCERROR";
    public const string XDOC_ROW = "ROW";

    public const string XDOC_PREDICATE = "PREDICATE";
    public const string XDOC_CONDITIONS = "CONDITIONS";
    public const string XDOC_CONDITION = "CONDITION";
    public const string XDOC_TYPE = "TYPE";
    public const string XDOC_ALIAS = "ALIAS";
    public const string XDOC_FIELDNAME = "FIELDNAME";
    public const string XDOC_OPERATION = "OPERATION";
    public const string XDOC_VALUE = "VALUE";
    public const string XDOC_LOGININFO = "LOGININFO";

    public const string XDOC_QUERYCONDITION = "QUERYCONDITION";
    public const string XDOC_AFFAIREVENT = "AFFAIREVENT";
    public const string XML_AGERANGE = "AGERANGE";

    public const string XML_PROP_SOURCE = "efsframe";
    public const string XML_PROP_VERSION = "version";
    public const string XML_PROP_ROW = "row";
    public const string XML_PROP_ALIAS = "alias";
    public const string XML_PROP_OPERATION = "operation";
    public const string XML_PROP_WRITEEVENT = "writeevent";
    public const string XML_PROP_CHECKNAME = "checkname";
    public const string XML_PROP_STATE = "state";
    public const string XML_PROP_DATATYPE = "datatype";
    public const string XML_PROP_PARENTNODE = "parentnode";
    public const string XML_PROP_PARENTDATAINDEX = "parentdataindex";
    public const string XML_PROP_SV = "sv";
    public const string XML_PROP_AFFAIRTYPEID = "affairtypeid";
    public const string XML_PROP_AFFAIRTYPENAME = "affairtypename";
    public const string XML_PROP_NAME = "name";
    public const string XML_PROP_EVENTTYPEID = "eventtypeid";
    public const string XML_PROP_EVENTTYPENAME = "eventtypename";
    public const string XML_PROP_OPURL = "opurl";
    public const string XML_PROP_TEXT = "text";

    public const string XML_PROP_RECORDSPERPAGE = "recordsperpage";
    public const string XML_PROP_CURRENTPAGENUM = "currentpagenum";
    public const string XML_PROP_TOTALPAGES = "totalpages";
    public const string XML_PROP_RECORDS = "records";
    public const string XML_FILE_SUFFIX = "xml";

    public const string PVAL_SOURCE = "urn=www-efsframe-cn";
    public const string PVAL_VERSION = "1.0";

  }
}
