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
  /// 单位信息处理
  /// </summary>
  public class ManageUnit
  {
    /// <summary>
    /// 查询单位列表
    /// </summary>
    /// <param name="strXML"></param>
    /// <returns></returns>
    public static string munitList(string strXML)
    {
      QueryDoc obj_Query = new QueryDoc(strXML);
      int int_PageSize = obj_Query.getIntPageSize();

      int int_CurrentPage = obj_Query.getIntCurrentPage();

      string str_Select = "s." + Field.MUNITID    + " " + Field.MUNITID     + "," +
                          "s." + Field.MUNITNAME  + " " + Field.MUNITNAME   + "," +
                          "s." + Field.MSUNITID   + " " + Field.MSUNITID    + "," +
                          "s." + Field.MTYPE      + " " + Field.MTYPE       + "," +
                          "s." + Field.MLEVEL     + " " + Field.MLEVEL      + "," +
                          "s." + Field.VALID      + " " + Field.VALID;

      string str_From = Table.MANAGEUNIT + " s";

      string str_Where = obj_Query.getConditions();

      str_Where = General.empty(str_Where) ? str_Where : Common.WHERE + str_Where;

      if (General.empty(str_Where))
      {
        str_Where = " WHERE " + Field.MTYPE + "!=" + General.addQuotes("AA");
      }
      else
      {
        str_Where = str_Where +
                    " AND " + Field.MTYPE + "!=" + General.addQuotes("AA");
      }

      return CommonQuery.basicListQuery(str_Select,
                                  str_From,
                                  str_Where,
                                  Field.MUNITID,
                                  int_PageSize,
                                  int_CurrentPage);
    }

    /// <summary>
    /// 查询单位详细信息
    /// </summary>
    /// <param name="munitid">单位编码</param>
    /// <returns></returns>
    public static string munitDetail(string munitid)
    {
      string str_Select = "s." + Field.MUNITID + " " + Field.MUNITID + "," +
                          "s." + Field.MUNITNAME + " " + Field.MUNITNAME + "," +
                          "s." + Field.MTYPE + " " + Field.MTYPE + "," +
                          "s." + Field.MDES + " " + Field.MDES + "," +
                          "s." + Field.MSUNITID + " " + Field.MSUNITID + "," +
                          "s." + Field.VALID + " " + Field.VALID + "," +
                          "s." + Field.MLEVEL + " " + Field.MLEVEL;

      string str_From = Table.MANAGEUNIT + " s";

      string str_Where = "WHERE " + Field.MUNITID + "=" + General.addQuotes(munitid);

      return CommonQuery.basicListQuery(str_Select,
                                        str_From,
                                        str_Where,
                                        Field.MUNITID,
                                        1,
                                        1,
                                        Table.MANAGEUNIT);
    }
  }
}
