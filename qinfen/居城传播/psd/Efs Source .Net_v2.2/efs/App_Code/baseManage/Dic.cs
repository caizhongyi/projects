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
  /// 字典处理
  /// </summary>
  public class Dic
  {
      public static string dicList(string strXML)
      {
        QueryDoc obj_Query = new QueryDoc(strXML);
        int int_PageSize = obj_Query.getIntPageSize();

        int int_CurrentPage = obj_Query.getIntCurrentPage();

        string str_Select = Table.S + Common.DOT  + Field.DICNAME  + Common.SPACE + Field.DICNAME + Common.COMMA +
                            Table.S + Common.DOT  + Field.DICDES   + Common.SPACE + Field.DICDES  + Common.COMMA +
                            Table.S + Common.DOT  + Field.CODELEN  + Common.SPACE + Field.CODELEN + Common.COMMA +
                            Table.S + Common.DOT  + Field.TEXTLEN  + Common.SPACE + Field.TEXTLEN + Common.COMMA +
                            Table.S + Common.DOT  + Field.EDITABLE + Common.SPACE + Field.EDITABLE;
        string str_From   = Table.DICLIST + Common.SPACE + Table.S;

        string str_Where = obj_Query.getConditions();

        str_Where = General.empty(str_Where) ? str_Where : Common.WHERE + str_Where;

        return CommonQuery.basicListQuery(str_Select,
                                          str_From,
                                          str_Where,
                                          Field.DICNAME,
                                          int_PageSize,
                                          int_CurrentPage);
      }
      
      /// <summary>
      /// 查询字典内容的简单列表
      /// </summary>
      /// <param name="strXML">标准 XML 数据信息</param>
      /// <param name="strDicName">字典名称</param>
      /// <returns></returns>
      public static string dicDataList(string strXML, string strDicName)
      {
        QueryDoc obj_Query = new QueryDoc(strXML);
        XmlElement ele_Condition = obj_Query.getCondition();

        int int_PageSize = obj_Query.getIntPageSize();

        int int_CurrentPage = obj_Query.getIntCurrentPage();

        string str_Select = Table.S + Common.DOT + Field.DICNAME  + Common.SPACE + Field.DICNAME  + Common.COMMA +
                            Table.S + Common.DOT + Field.DIC_CODE + Common.SPACE + Field.DIC_CODE + Common.COMMA +
                            Table.S + Common.DOT + Field.DIC_TEXT + Common.SPACE + Field.DIC_TEXT + Common.COMMA +
                            Table.S + Common.DOT + Field.DIC_VALID + Common.SPACE + Field.DIC_VALID;

        string str_From = Table.DICDATA + Common.SPACE + Table.S;

        string str_Where = obj_Query.getConditions();

        str_Where = General.empty(str_Where) ? str_Where : Common.WHERE + str_Where;
        str_Where = !General.empty(str_Where) ?
                    str_Where +
                    Common.SPACE + Field.DICNAME + Common.EQUAL + General.addQuotes(strDicName) :
                    Common.S_WHERE + Field.DICNAME + Common.EQUAL + General.addQuotes(strDicName);


        return CommonQuery.basicListQuery(str_Select,
                                          str_From,
                                          str_Where,
                                          Field.DIC_CODE,
                                          int_PageSize,
                                          int_CurrentPage);
      }



  }
}
