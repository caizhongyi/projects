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
  /// 角色权限分配管理
  /// </summary>
  public class RoleBO
  {
    /// <summary>
    /// 添加角色
    /// </summary>
    /// <param name="strXml"></param>
    /// <returns></returns>
    public static string addRole(string strXml)
    {
      DataDoc doc = new DataDoc(strXml);
      // 创建执行对象
      DataStorage storage = new DataStorage();
      int size = doc.getDataNum(Table.ROLEBASIC);
      // 解析sql语句
      for (int i = 0; i < size; i++)
      {
        XmlElement ele = (XmlElement)doc.getDataNode(Table.ROLEBASIC, i);
        string strId = NumAssign.assignID_A("000001");
        XmlFun.getNode(ele, Field.ROLEID).InnerText = strId;

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
    /// 删除角色
    /// </summary>
    /// <param name="strRoleID"></param>
    /// <returns></returns>
    public static string DropRole(string strRoleID)
    {
      DataStorage storage = new DataStorage();
      string str_SQL = "DELETE FROM ROLEBASIC WHERE ROLEID='" + strRoleID + "'";
      storage.addSQL(str_SQL);

      str_SQL = "DELETE FROM ROLEPOWER WHERE ROLEID='" + strRoleID + "'";
      storage.addSQL(str_SQL);

      str_SQL = "DELETE FROM ROLEUSER WHERE ROLEID='" + strRoleID + "'";
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
    /// 查询角色列表
    /// </summary>
    /// <param name="strXML"></param>
    /// <returns></returns>
    public static string roleList(string strXML)
    {
      QueryDoc obj_Query = new QueryDoc(strXML);
      int int_PageSize = obj_Query.getIntPageSize();

      int int_CurrentPage = obj_Query.getIntCurrentPage();

      string str_Select = Table.S + Common.DOT + Field.ROLEID + Common.SPACE + Field.ROLEID + Common.COMMA +
                          Table.S + Common.DOT + Field.ROLENAME + Common.SPACE + Field.ROLENAME + Common.COMMA +
                          Table.S + Common.DOT + Field.ROLEDES + Common.SPACE + Field.ROLEDES;

      string str_From = Table.ROLEBASIC + Common.SPACE + Table.S;

      string str_Where = obj_Query.getConditions();

      str_Where = General.empty(str_Where) ? str_Where : Common.WHERE + str_Where;

      return CommonQuery.basicListQuery(str_Select,
                                  str_From,
                                  str_Where,
                                  Field.ROLEID,
                                  int_PageSize,
                                  int_CurrentPage);
    }

    /// <summary>
    /// 查询角色权限信息列表（列表返回）
    /// </summary>
    /// <param name="roleid"></param>
    /// <returns></returns>
    public static string roleRightList(string roleid)
    {

      string str_Select = Table.S + Common.DOT + Field.ROLEID + Common.SPACE + Field.ROLEID + Common.COMMA +
                          Table.S + Common.DOT + Field.ROLENAME + Common.SPACE + Field.ROLENAME + Common.COMMA +
                          Table.S + Common.DOT + Field.EVENTTYPEID + Common.SPACE + Field.EVENTTYPEID + Common.COMMA +
                          Table.S + Common.DOT + Field.EVENTTYPENAME + Common.SPACE + Field.EVENTTYPENAME + Common.COMMA +
                          Table.S + Common.DOT + Field.DISABLED + Common.SPACE + Field.DISABLED + Common.COMMA +
                          Table.S + Common.DOT + Field.SHORTCUT + Common.SPACE + Field.SHORTCUT + Common.COMMA +
                          Table.S + Common.DOT + Field.VISIBLE + Common.SPACE + Field.VISIBLE;
      string str_From = Table.VW_ROLEPOWER + Common.SPACE + Table.S;

      string str_Where = Common.WHERE + Field.ROLEID + Common.EQUAL + General.addQuotes(roleid);

      return CommonQuery.basicListQuery(str_Select,
                                        str_From,
                                        str_Where,
                                        Field.EVENTTYPEID,
                                        99999,
                                        1);
    }

    /// <summary>
    /// 查询角色用户信息列表（列表返回）
    /// </summary>
    /// <param name="roleid">角色编号</param>
    /// <returns></returns>
    public static string roleUserList(string roleid)
    {
      string str_Select = Table.S + Common.DOT + Field.ROLEID + Common.SPACE + Field.ROLEID + Common.COMMA +
                          Table.S + Common.DOT + Field.ROLENAME + Common.SPACE + Field.ROLENAME + Common.COMMA +
                          Table.S + Common.DOT + Field.USERID + Common.SPACE + Field.USERID + Common.COMMA +
                          Table.S + Common.DOT + Field.USERTITLE + Common.SPACE + Field.USERTITLE + Common.COMMA +
                          Table.S + Common.DOT + Field.USERNAME + Common.SPACE + Field.USERNAME + Common.COMMA +
                          Table.S + Common.DOT + Field.UNITNAME + Common.SPACE + Field.UNITNAME + Common.COMMA +
                          Table.S + Common.DOT + Field.DISABLED + Common.SPACE + Field.DISABLED + Common.COMMA +
                          Table.S + Common.DOT + Field.CANEDITPASSWORD + Common.SPACE + Field.CANEDITPASSWORD + Common.COMMA +
                          Table.S + Common.DOT + Field.USERTYPE + Common.SPACE + Field.USERTYPE;
      string str_From = Table.VW_ROLEUSER + Common.SPACE + Table.S;

      string str_Where = Common.WHERE + Field.ROLEID + Common.EQUAL + General.addQuotes(roleid);

      return CommonQuery.basicListQuery(str_Select,
                                  str_From,
                                  str_Where,
                                  Field.USERID,
                                  99999,
                                  1);
    }

    /// <summary>
    /// 角色详细信息
    /// </summary>
    /// <param name="roleid"></param>
    /// <returns></returns>
    public static string roleDetail(string roleid)
    {

      string str_Select = Table.S + Common.DOT + Field.ROLEID + Common.SPACE + Field.ROLEID + Common.COMMA +
                          Table.S + Common.DOT + Field.ROLENAME + Common.SPACE + Field.ROLENAME + Common.COMMA +
                          Table.S + Common.DOT + Field.ROLEDES + Common.SPACE + Field.ROLEDES;

      string str_From = Table.ROLEBASIC + Common.SPACE + Table.S;

      string str_Where = Common.WHERE + Field.ROLEID + Common.EQUAL + General.addQuotes(roleid);

      return CommonQuery.basicListQuery(str_Select,
                                        str_From,
                                        str_Where,
                                        Field.ROLEID,
                                        1,
                                        1,
                                        Table.ROLEBASIC);
    }

    /// <summary>
    /// 查询角色中不包含的事件类型
    /// </summary>
    /// <param name="roleid"></param>
    /// <returns></returns>
    public static string eventTypeList_AddToRole(string roleid)
    {

      string str_Select = Table.S + Common.DOT + Field.EVENTTYPEID + Common.SPACE + Field.EVENTTYPEID + Common.COMMA +
                          Table.S + Common.DOT + Field.EVENTTYPENAME + Common.SPACE + Field.EVENTTYPENAME + Common.COMMA +
                          Table.S + Common.DOT + Field.AFFAIRTYPENAME + Common.SPACE + Field.AFFAIRTYPENAME + Common.COMMA +
                          Table.S + Common.DOT + Field.DISABLED + Common.SPACE + Field.DISABLED + Common.COMMA +
                          Table.S + Common.DOT + Field.SHORTCUT + Common.SPACE + Field.SHORTCUT + Common.COMMA +
                          Table.S + Common.DOT + Field.VISIBLE + Common.SPACE + Field.VISIBLE;

      string str_From = Table.VW_EVENTTYPE + Common.SPACE + Table.S;

      string str_Where = Common.SELECT + Field.EVENTTYPEID +
                         Common.S_FROM + Table.ROLEPOWER +
                         Common.S_WHERE + Field.ROLEID + Common.EQUAL + General.addQuotes(roleid);

      str_Where = Common.WHERE + Field.EVENTTYPEID + Common.NOT_IN + General.addBracket(str_Where) +
                  Common.S_AND + Field.AFFAIRTYPEID + Common.N_EQUAL + General.addQuotes("000100");

      return CommonQuery.basicListQuery(str_Select,
                                        str_From,
                                        str_Where,
                                        Field.EVENTTYPEID,
                                        99999,
                                        1);
    }

    /// <summary>
    /// 查询添加到指定角色中的用户信息列表（列表返回）
    ///    该查询只查询出未添加到该角色中的用户信息列表
    /// </summary>
    /// <param name="strXML"></param>
    /// <returns></returns>
    public static string userList_AddToRole(string strXML)
    {
      QueryDoc obj_Query = new QueryDoc(strXML);
      int int_PageSize = obj_Query.getIntPageSize();

      int int_CurrentPage = obj_Query.getIntCurrentPage();

      string str_Select = Table.S + Common.DOT + Field.USERID + Common.SPACE + Field.USERID + Common.COMMA +
                          Table.S + Common.DOT + Field.USERTITLE + Common.SPACE + Field.USERTITLE + Common.COMMA +
                          Table.S + Common.DOT + Field.USERNAME + Common.SPACE + Field.USERNAME + Common.COMMA +
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


  }
}
