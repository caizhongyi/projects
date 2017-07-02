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
  /// 事件类型处理
  /// </summary>
  public class EventType
  {
    /// <summary>
    /// 添加、修改事件类型
    /// </summary>
    /// <param name="strXml"></param>
    /// <returns></returns>
    public static string addOrEdit(string strXml)
    {
      string xml = Operation.dealWithXml(strXml);
      DicCache.getInstance().refresh("EVENTTYPE");
      return xml;
    }


    public static string eventTypeList(string strXML)
    {
      QueryDoc obj_Query = new QueryDoc(strXML);
      int int_PageSize = obj_Query.getIntPageSize();

      int int_CurrentPage = obj_Query.getIntCurrentPage();

      string str_Select = Table.S + Common.DOT + Field.EVENTTYPEID + Common.SPACE + Field.EVENTTYPEID + Common.COMMA +
                          Table.S + Common.DOT + Field.EVENTTYPENAME + Common.SPACE + Field.EVENTTYPENAME + Common.COMMA +
                          Table.S + Common.DOT + Field.AFFAIRTYPENAME + Common.SPACE + Field.AFFAIRTYPENAME + Common.COMMA +
                          Table.S + Common.DOT + Field.BEGINEVENT + Common.SPACE + Field.BEGINEVENT + Common.COMMA +
                          Table.S + Common.DOT + Field.DISABLED + Common.SPACE + Field.DISABLED + Common.COMMA +
                          Table.S + Common.DOT + Field.SHORTCUT + Common.SPACE + Field.SHORTCUT + Common.COMMA +
                          Table.S + Common.DOT + Field.VISIBLE + Common.SPACE + Field.VISIBLE;

      string str_From = Table.VW_EVENTTYPE + Common.SPACE + Table.S;

      string str_Where = obj_Query.getConditions();

      str_Where = General.empty(str_Where) ? str_Where : Common.WHERE + str_Where;


      return CommonQuery.basicListQuery(str_Select,
                                  str_From,
                                  str_Where,
                                  Field.EVENTTYPEID,
                                  int_PageSize,
                                  int_CurrentPage);
    }


    public static string eventTypeDetail(string eventTypeid)
    {

      string str_Select = Table.S + Common.DOT + Field.EVENTTYPEID + Common.SPACE + Field.EVENTTYPEID + Common.COMMA +
                          Table.S + Common.DOT + Field.EVENTTYPENAME + Common.SPACE + Field.EVENTTYPENAME + Common.COMMA +
                          Table.S + Common.DOT + Field.AFFAIRTYPEID + Common.SPACE + Field.AFFAIRTYPEID + Common.COMMA +
                          Table.S + Common.DOT + Field.OPURL + Common.SPACE + Field.OPURL + Common.COMMA +
                          Table.S + Common.DOT + Field.EVENTTYPEDES + Common.SPACE + Field.EVENTTYPEDES + Common.COMMA +
                          Table.S + Common.DOT + Field.BEGINEVENT + Common.SPACE + Field.BEGINEVENT + Common.COMMA +
                          Table.S + Common.DOT + Field.DISABLED + Common.SPACE + Field.DISABLED + Common.COMMA +
                          Table.S + Common.DOT + Field.SHORTCUT + Common.SPACE + Field.SHORTCUT + Common.COMMA +
                          Table.S + Common.DOT + Field.VISIBLE + Common.SPACE + Field.VISIBLE;

      string str_From = Table.VW_EVENTTYPE + Common.SPACE + Table.S;

      string str_Where = Common.WHERE + Field.EVENTTYPEID + Common.EQUAL + General.addQuotes(eventTypeid);

      string[] str_DicFieldList = {Field.AFFAIRTYPEID,
                                 Field.BEGINEVENT,
                                 Field.DISABLED,
                                 Field.SHORTCUT,
                                 Field.VISIBLE};
      string[] str_DicNameList = {Table.DIC_AFFAIRTYPE,
                                 Table.DIC_TRUEFALSE,
                                 Table.DIC_TRUEFALSE,
                                 Table.DIC_TRUEFALSE,
                                 Table.DIC_TRUEFALSE};

      return CommonQuery.basicListQuery(str_Select,
                                  str_From,
                                  str_Where,
                                  Field.EVENTTYPEID,
                                  str_DicFieldList,
                                  str_DicNameList,
                                  null,
                                  1,
                                  1,
                                  1,
                                  1,
                                  0,
                                  true,
                                  Table.EVENTTYPE);
    }


      public static string drop(string strEventTypeID)
      {
          DataStorage storage = new DataStorage();
          // 删除角色权限
          string strSQL = "DELETE FROM ROLEPOWER WHERE EVENTTYPEID='" + strEventTypeID + "'";
          storage.addSQL(strSQL);

          // 删除对应的事件
          strSQL = "DELETE FROM EVENTTYPE WHERE EVENTTYPEID='" + strEventTypeID + "'";
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