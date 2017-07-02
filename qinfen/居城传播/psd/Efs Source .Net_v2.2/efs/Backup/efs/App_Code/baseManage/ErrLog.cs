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
  /// 错误日志
  /// </summary>
  public class ErrLog
  {
    public static string ErrLogList(string strXML)
    {
      QueryDoc obj_Query = new QueryDoc(strXML);
      int int_PageSize = obj_Query.getIntPageSize();

      int int_CurrentPage = obj_Query.getIntCurrentPage();

      string str_Select = Table.S + Common.DOT + Field.SQLID        + Common.SPACE + Field.SQLID      + Common.COMMA +
                          Table.S + Common.DOT + Field.APPLYDATE    + Common.SPACE + Field.APPLYDATE  + Common.COMMA +
                          Table.S + Common.DOT + Field.OBJID        + Common.SPACE + Field.OBJID      + Common.COMMA +
                          Table.S + Common.DOT + Field.ERRDES1      + Common.SPACE + Field.ERRDES1    + Common.COMMA +
                          Table.S + Common.DOT + Field.SQLSCRIPT    + Common.SPACE + Field.SQLSCRIPT;
      string str_From = Table.SQLSTORAGE + Common.SPACE + Table.S;

      string str_Where = obj_Query.getConditions();

      str_Where = General.empty(str_Where) ? str_Where : Common.WHERE + str_Where;

      return CommonQuery.basicListQuery(str_Select,
                                        str_From,
                                        str_Where,
                                        Field.SQLID + Common.S_DESC,
                                        int_PageSize,
                                        int_CurrentPage);
    }
  }
}
