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
  /// 用户管理
  /// </summary>
  public class UserOb
  {
    public static string addNew(string strXml)
    {
      DataDoc doc = new DataDoc(strXml);
      // 创建执行对象
      DataStorage storage = new DataStorage();
      int size = doc.getDataNum(Table.USERLIST);
      // 解析sql语句
      for (int i = 0; i < size; i++)
      {
        XmlElement ele = (XmlElement)doc.getDataNode(Table.USERLIST, i);
        string a = ele.InnerXml;

        XmlNode node = XmlFun.getNode(ele, Field.USERID);
        string strId = NumAssign.assignID_A("000002");
        XmlFun.setNodeValue(node,strId);

        storage.addSQL(SQLAnalyse.analyseXMLSQL(ele));
      }
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

    /// <summary>
    /// 删除用户
    /// </summary>
    /// <param name="strUserID">用户编号</param>
    /// <returns></returns>
    public static string dropUser(string strUserID)
    {
      DataStorage storage = new DataStorage();
      string str_SQL = "DELETE FROM USERLIST WHERE USERID='" + strUserID + "'";
      storage.addSQL(str_SQL);

      str_SQL = "DELETE FROM ROLEUSER WHERE USERID='" + strUserID + "'";
      storage.addSQL(str_SQL);
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

    /// <summary>
    /// 用户列表查询
    /// </summary>
    /// <param name="strXML"></param>
    /// <returns></returns>
    public static string userList(string strXML)
    {
      QueryDoc obj_Query = new QueryDoc(strXML);

      int int_PageSize = obj_Query.getIntPageSize();

      int int_CurrentPage = obj_Query.getIntCurrentPage();

      string str_Select = Table.S + Common.DOT + Field.USERID + Common.SPACE + Field.USERID + Common.COMMA +
                          Table.S + Common.DOT + Field.USERTITLE + Common.SPACE + Field.USERTITLE + Common.COMMA +
                          Table.S + Common.DOT + Field.USERNAME + Common.SPACE + Field.USERNAME + Common.COMMA +
                          Table.S + Common.DOT + Field.SEX + Common.SPACE + Field.SEX + Common.COMMA +
                          Table.S + Common.DOT + Field.UNITID + Common.SPACE + Field.UNITID + Common.COMMA +
                          Table.S + Common.DOT + Field.UNITNAME + Common.SPACE + Field.UNITNAME + Common.COMMA +
                          Table.S + Common.DOT + Field.DISABLED + Common.SPACE + Field.DISABLED + Common.COMMA +
                          Table.S + Common.DOT + Field.CANEDITPASSWORD + Common.SPACE + Field.CANEDITPASSWORD + Common.COMMA +
                          Table.S + Common.DOT + Field.USERTYPE + Common.SPACE + Field.USERTYPE;

      string str_From = Table.VW_USERLIST + Common.SPACE + Table.S;
      string str_Where = obj_Query.getConditions();

      str_Where = General.empty(str_Where) ? str_Where : Common.WHERE + str_Where;

      return CommonQuery.basicListQuery(str_Select,
                                  str_From,
                                  str_Where,
                                  Field.USERID,
                                  int_PageSize,
                                  int_CurrentPage);
    }


    public static string userDetail(string userid)
    {

      string str_Select = Table.S + Common.DOT + Field.USERID       + Common.SPACE + Field.USERID         + Common.COMMA +
                          Table.S + Common.DOT + Field.USERTITLE    + Common.SPACE + Field.USERTITLE      + Common.COMMA +
                          Table.S + Common.DOT + Field.USERNAME     + Common.SPACE + Field.USERNAME       + Common.COMMA +
                          Table.S + Common.DOT + Field.SEX          + Common.SPACE + Field.SEX            + Common.COMMA +
                          Table.S + Common.DOT + Field.DUTY         + Common.SPACE + Field.DUTY           + Common.COMMA +
                          Table.S + Common.DOT + Field.NATION       + Common.SPACE + Field.NATION         + Common.COMMA +
                          Table.S + Common.DOT + Field.IDCARD       + Common.SPACE + Field.IDCARD         + Common.COMMA +
                          Table.S + Common.DOT + Field.NATIVEPLACE  + Common.SPACE + Field.NATIVEPLACE    + Common.COMMA +
                          Table.S + Common.DOT + Field.EDUCATION    + Common.SPACE + Field.EDUCATION      + Common.COMMA +
                          Table.S + Common.DOT + Field.ADDRESS      + Common.SPACE + Field.ADDRESS        + Common.COMMA +
                          Table.S + Common.DOT + Field.USERDES      + Common.SPACE + Field.USERDES        + Common.COMMA +
                          Table.S + Common.DOT + Field.TEMPADDRESS  + Common.SPACE + Field.TEMPADDRESS    + Common.COMMA +
                          Table.S + Common.DOT + Field.CONTACT      + Common.SPACE + Field.CONTACT        + Common.COMMA +
                          Table.S + Common.DOT + Field.SMSTEL       + Common.SPACE + Field.SMSTEL         + Common.COMMA +
                          Table.S + Common.DOT + Field.BIRTHDAY     + Common.SPACE + Field.BIRTHDAY       + Common.COMMA +
                          Table.S + Common.DOT + Field.UNITID       + Common.SPACE + Field.UNITID         + Common.COMMA +
                          Table.S + Common.DOT + Field.UNITNAME     + Common.SPACE + Field.UNITNAME       + Common.COMMA +
                          Table.S + Common.DOT + Field.DISABLED     + Common.SPACE + Field.DISABLED       + Common.COMMA +
                          Table.S + Common.DOT + Field.CANEDITPASSWORD + Common.SPACE + Field.CANEDITPASSWORD + Common.COMMA +
                          Table.S + Common.DOT + Field.USERTYPE     + Common.SPACE + Field.USERTYPE;

      string str_From = Table.VW_USERLIST + Common.SPACE + Table.S;

      string str_Where = Common.WHERE + Field.USERID + Common.EQUAL + General.addQuotes(userid);

      string[] str_FieldData = { Field.BIRTHDAY};

      return CommonQuery.basicListQuery(str_Select,
                                        str_From,
                                        str_Where,
                                        Field.USERID,
                                        str_FieldData,
                                        1,
                                        1,
                                        Table.USERLIST);
    }

  }
}
