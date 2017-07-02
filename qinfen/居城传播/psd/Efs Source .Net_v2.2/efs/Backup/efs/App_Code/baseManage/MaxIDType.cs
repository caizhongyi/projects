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
  /// 编码规则处理
  /// </summary>
  public class MaxIDType
  {
    /// <summary>
    /// 查询编码类型信息列表（列表返回）
    /// </summary>
    /// <param name="strXML"></param>
    /// <returns></returns>
    public static string maxidtypeList(string strXML)
    {
      QueryDoc obj_Query = new QueryDoc(strXML);

      int int_PageSize = obj_Query.getIntPageSize();

      int int_CurrentPage = obj_Query.getIntCurrentPage();

      string str_Select = Table.S + Common.DOT + Field.IDTYPE + Common.SPACE + Field.IDTYPE + Common.COMMA +
                          Table.S + Common.DOT + Field.IDNAME + Common.SPACE + Field.IDNAME + Common.COMMA +
                          Table.S + Common.DOT + Field.IDSIZE + Common.SPACE + Field.IDSIZE + Common.COMMA +
                          Table.S + Common.DOT + Field.IDPARA + Common.SPACE + Field.IDPARA + Common.COMMA +
                          Table.S + Common.DOT + Field.IDLOOP + Common.SPACE + Field.IDLOOP + Common.COMMA +
                          Table.S + Common.DOT + Field.IDMIN  + Common.SPACE + Field.IDMIN  + Common.COMMA +
                          Table.S + Common.DOT + Field.IDMAX  + Common.SPACE + Field.IDMAX  + Common.COMMA +
                          Table.S + Common.DOT + Field.IDDES  + Common.SPACE + Field.IDDES;

      string str_From = Table.MAXIDTYPE + Common.SPACE + Table.S;
      string str_Where = obj_Query.getConditions();

      str_Where = General.empty(str_Where) ? str_Where : Common.WHERE + str_Where;

      return CommonQuery.basicListQuery(str_Select,
                                  str_From,
                                  str_Where,
                                  Field.IDTYPE,
                                  int_PageSize,
                                  int_CurrentPage);
    }

    /// <summary>
    /// 查询编码规则详细信息
    /// </summary>
    /// <param name="idtype"></param>
    /// <returns></returns>
    public static string maxidtypeDetail(string idtype)
    {
      string str_Select = Table.S + Common.DOT + Field.IDTYPE + Common.SPACE + Field.IDTYPE + Common.COMMA +
                          Table.S + Common.DOT + Field.IDNAME + Common.SPACE + Field.IDNAME + Common.COMMA +
                          Table.S + Common.DOT + Field.IDSIZE + Common.SPACE + Field.IDSIZE + Common.COMMA +
                          Table.S + Common.DOT + Field.IDPARA + Common.SPACE + Field.IDPARA + Common.COMMA +
                          Table.S + Common.DOT + Field.IDLOOP + Common.SPACE + Field.IDLOOP + Common.COMMA +
                          Table.S + Common.DOT + Field.IDMIN  + Common.SPACE + Field.IDMIN  + Common.COMMA +
                          Table.S + Common.DOT + Field.IDMAX  + Common.SPACE + Field.IDMAX  + Common.COMMA +
                          Table.S + Common.DOT + Field.IDDES  + Common.SPACE + Field.IDDES;

      string str_From = Table.MAXIDTYPE + Common.SPACE + Table.S;

      string str_Where = Common.WHERE + Common.SPACE + Field.IDTYPE + Common.EQUAL + General.addQuotes(idtype);

      return CommonQuery.basicListQuery(str_Select,
                                        str_From,
                                        str_Where,
                                        Field.IDTYPE,
                                        1, 1,
                                        Table.MAXIDTYPE);
    }

    /// <summary>
    /// 查询编码类型信息列表（列表返回）
    /// </summary>
    /// <param name="strIDType"></param>
    /// <returns></returns>
    public static string maxidList(string strIDType)
    {

      string str_Select = Table.S + Common.DOT + Field.IDTYPE + Common.SPACE + Field.IDTYPE + Common.COMMA +
                          Table.S + Common.DOT + Field.ID1    + Common.SPACE + Field.ID1    + Common.COMMA +
                          Table.S + Common.DOT + Field.ID2    + Common.SPACE + Field.ID2    + Common.COMMA +
                          Table.S + Common.DOT + Field.MAXID  + Common.SPACE + Field.MAXID;

      string str_From = Table.MAXID + Common.SPACE + Table.S;

      string str_Where = Common.WHERE + Field.IDTYPE + Common.EQUAL + General.addQuotes(strIDType);

      return CommonQuery.basicListQuery(str_Select,
                                  str_From,
                                  str_Where,
                                  Field.ID1,
                                  9999,
                                  1);
    } 


  }
}
