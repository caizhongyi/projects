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
  /// 事务类型处理
  /// </summary>
  public class AffairType
  {
    public static string affairTypeList(string strXML)
    {
      QueryDoc obj_Query = new QueryDoc(strXML);
      int int_PageSize = obj_Query.getIntPageSize();

      int int_CurrentPage = obj_Query.getIntCurrentPage();

      string str_Select = Table.S + Common.DOT + Field.AFFAIRTYPEID + Common.SPACE + Field.AFFAIRTYPEID + Common.COMMA +
                          Table.S + Common.DOT + Field.AFFAIRTYPENAME + Common.SPACE + Field.AFFAIRTYPENAME + Common.COMMA +
                          Table.S + Common.DOT + Field.AFFAIRTYPEMODE + Common.SPACE + Field.AFFAIRTYPEMODE + Common.COMMA +
                          Table.S + Common.DOT + Field.AFFAIRTYPEDES + Common.SPACE + Field.AFFAIRTYPEDES;

      string str_From = Table.AFFAIRTYPE + Common.SPACE + Table.S;

      string str_Where = obj_Query.getConditions();

      str_Where = General.empty(str_Where) ? str_Where : Common.WHERE + str_Where;

      return CommonQuery.basicListQuery(str_Select,
                                  str_From,
                                  str_Where,
                                  Field.AFFAIRTYPEID,
                                  int_PageSize,
                                  int_CurrentPage);
    }

    /// <summary>
    /// 查询事务类型详细信息
    /// </summary>
    /// <param name="affairTypeid">事务类型编号</param>
    /// <returns>标准查询返回结构</returns>
    public static string affairTypeDetail(string affairTypeid)
    {

      string str_Select = Table.S + Common.DOT + Field.AFFAIRTYPEID + Common.SPACE + Field.AFFAIRTYPEID + Common.COMMA +
                          Table.S + Common.DOT + Field.AFFAIRTYPENAME + Common.SPACE + Field.AFFAIRTYPENAME + Common.COMMA +
                          Table.S + Common.DOT + Field.AFFAIRTYPEMODE + Common.SPACE + Field.AFFAIRTYPEMODE + Common.COMMA +
                          Table.S + Common.DOT + Field.AFFAIRTYPEDES + Common.SPACE + Field.AFFAIRTYPEDES;

      string str_From = Table.AFFAIRTYPE + Common.SPACE + Table.S;

      string str_Where = Common.WHERE + Field.AFFAIRTYPEID + Common.EQUAL + General.addQuotes(affairTypeid);

      string[] str_DicFieldList = { Field.AFFAIRTYPEMODE };
      string[] str_DicNameList = { Table.DIC_AFFAIRTYPEMODE };

      return CommonQuery.basicListQuery(str_Select,
                                        str_From,
                                        str_Where,
                                        Field.AFFAIRTYPEID,
                                        str_DicFieldList,
                                        str_DicNameList,
                                        null,
                                        1,
                                        1,
                                        1,
                                        1,
                                        0,
                                        true,
                                        Table.AFFAIRTYPE);
    }

    public static string addOrEdit(string strXml)
    {
      string xml = Operation.dealWithXml(strXml);
      DicCache.getInstance().refresh("AFFAIRTYPE");
      return xml;
    }


      public static string drop(string strAffairTypeID)
      {
          DataStorage storage = new DataStorage();
          // 删除角色权限
          string strSQL = "DELETE FROM ROLEPOWER WHERE EVENTTYPEID IN (SELECT EVENTTYPEID FROM EVENTTYPE WHERE AFFAIRTYPEID='" + strAffairTypeID + "')";
          storage.addSQL(strSQL);

          // 删除对应的事件
          strSQL = "DELETE FROM EVENTTYPE WHERE AFFAIRTYPEID='" + strAffairTypeID + "'";
          storage.addSQL(strSQL);

          // 删除对应的事务
          strSQL = "DELETE FROM AFFAIRTYPE WHERE AFFAIRTYPEID='" + strAffairTypeID + "'";
          storage.addSQL(strSQL);
          // 执行
          string strReturn = storage.runSQL();
          ReturnDoc returndoc = new ReturnDoc();
          if (!General.empty(strReturn))
          {
              returndoc.addErrorResult(Common.RT_FUNCERROR);
              returndoc.setFuncErrorInfo(strReturn);
          }
          else
          {
              returndoc.addErrorResult(Common.RT_SUCCESS);
          }
          return returndoc.getXml();

      }

  }
}
