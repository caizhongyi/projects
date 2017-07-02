using System;
using System.Xml;
using System.Data;
using Efsframe.cn.declare;
using Efsframe.cn.baseCls;
using Efsframe.cn.baseManage;
using Efsframe.cn.func;
using Efsframe.cn.db;

namespace Efsframe.cn.baseManage
{
  /// <summary>
  /// 日志处理
  /// </summary>
  public class SysLog
  {
    /// <summary>
    /// 查询日志列表
    /// </summary>
    /// <param name="strXML"></param>
    /// <returns></returns>
    public static string sysLogList(string strXML)
    {
      QueryDoc obj_Query = new QueryDoc(strXML);
      int int_PageSize = obj_Query.getIntPageSize();

      int int_CurrentPage = obj_Query.getIntCurrentPage();

      string str_Select = Table.S + Common.DOT + Field.LOGID + Common.SPACE + Field.LOGID + Common.COMMA +
                          Table.S + Common.DOT + Field.USERID + Common.SPACE + Field.USERID + Common.COMMA +
                          Table.S + Common.DOT + Field.USERNAME + Common.SPACE + Field.USERNAME + Common.COMMA +
                          Table.S + Common.DOT + Field.UNITNAME + Common.SPACE + Field.UNITNAME + Common.COMMA +
                          Table.S + Common.DOT + Field.LOGINIP + Common.SPACE + Field.LOGINIP + Common.COMMA +
                          Table.S + Common.DOT + Field.ENTERTIME + Common.SPACE + Field.ENTERTIME + Common.COMMA +
                          Table.S + Common.DOT + Field.LEAVETIME + Common.SPACE + Field.LEAVETIME + Common.COMMA +
                          Table.S + Common.DOT + Field.MAC + Common.SPACE + Field.MAC;

      string str_From = Table.SYSLOG + Common.SPACE + Table.S;

      string str_Where = obj_Query.getConditions();

      str_Where = General.empty(str_Where) ? str_Where : Common.WHERE + str_Where;


      return CommonQuery.basicListQuery(str_Select,
                                  str_From,
                                  str_Where,
                                  Field.LOGID + Common.SPACE + Common.S_DESC,
                                  int_PageSize,
                                  int_CurrentPage);
    }
  }
}
