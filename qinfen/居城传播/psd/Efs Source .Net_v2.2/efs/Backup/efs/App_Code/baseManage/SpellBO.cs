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
  /// 拼音编码管理
  /// </summary>
  public class SpellBO
  {
    public static string spellList(string strXML)
    {
      QueryDoc obj_Query = new QueryDoc(strXML);
      int int_PageSize = obj_Query.getIntPageSize();

      int int_CurrentPage = obj_Query.getIntCurrentPage();

      string str_Select = Table.S + Common.DOT + Field.WORD    + Common.SPACE + Field.WORD    + Common.COMMA +
                          Table.S + Common.DOT + Field.SPELL   + Common.SPACE + Field.SPELL   + Common.COMMA +
                          Table.S + Common.DOT + Field.ASPELL  + Common.SPACE + Field.ASPELL;
      string str_From = Table.SPELL + Common.SPACE + Table.S;

      string str_Where = obj_Query.getConditions();

      str_Where = General.empty(str_Where) ? str_Where : Common.WHERE + str_Where;

      return CommonQuery.basicListQuery(str_Select,
                                        str_From,
                                        str_Where,
                                        Field.SPELL,
                                        int_PageSize,
                                        int_CurrentPage);
    }
  }
}
