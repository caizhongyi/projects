using System;
using System.Xml;
using System.Data;
using System.Data.OleDb;
using Efsframe.cn.declare;
using Efsframe.cn.baseCls;
using Efsframe.cn.func;

namespace Efsframe.cn.db
{
  /// <summary>
  /// 封装各种数据库查询操作，select查询，分页数据查询的统一接口
  /// </summary>
  public class CommonQuery
  {

    /// <summary>
    /// 根据T-SQL获得记录集对象
    /// </summary>
    /// <param name="strSQL">T-SQL(SELECT)语句</param>
    /// <param name="rst">OleDbDataReader记录集对象</param>
    /// <returns>string 0 成功，其他为错误描述</returns>
    public static string qryRst(string strSQL,ref OleDbDataReader rst)
    {
      OleDbConnection m_Conn = Conn.getConn();

      try
      {
        OleDbCommand mdo = new OleDbCommand(strSQL, m_Conn);
        rst = mdo.ExecuteReader();
        if (rst.HasRows)
        {
          return "0";
        }
        return "1";
      }
      catch (Exception e)
      {
        return e.Message;
      }
    }


    /// <summary>
    /// 分页查询，返回标准的查询XML
    /// </summary>
    /// <param name="strFieldList">查询字段列表</param>
    /// <param name="strTableList">查询表列表</param>
    /// <param name="strOtherClause">Where条件</param>
    /// <param name="strOrdFld">排序字段 例如：PERSONID DESC</param>
    /// <param name="strDicFieldList">待翻译字典字段列表  例如：SEX,NATION </param>
    /// <param name="strDicNameList">待翻译字典名称列表 例如：DIC_SEX,DIC_NATIVE 注意：strDicFieldList和strDicNameList必须一一对应 </param>
    /// <param name="strDateFieldList">待处理的日期型字段列表 例如：BIRTHDAY,COMEDATE</param>
    /// <param name="intTotalRecords">记录总数</param>
    /// <param name="intTotalPages">总页数</param>
    /// <param name="intPageSize">每页记录数</param>
    /// <param name="intCurrentPage">待查询的页数</param>
    /// <param name="intCountTotal">是否需要统计记录总数</param>
    /// <param name="blnDicInSv">字典翻译方式</param>
    /// <param name="strListName">生成列表名称</param>
    /// <returns>标准的查询 XML 返回结构的字符串</returns>
    public static string basicListQuery(string strFieldList,
                                      string strTableList,
                                      string strOtherClause,
                                      string strOrdFld,
                                      string[] strDicFieldList,
                                      string[] strDicNameList,
                                      string[] strDateFieldList,
                                      int intTotalRecords,
                                      int intTotalPages,
                                      int intPageSize,
                                      int intCurrentPage,
                                      int intCountTotal,
                                      Boolean blnDicInSv,
                                      String strListName)
    {
      OleDbConnection m_Conn = Conn.getConn();
      try
      {
        string str_FieldList = strFieldList.Replace(Common.MARK, Common.QUOTE);
        string str_TableList = strTableList.Replace(Common.MARK, Common.QUOTE);

        string str_OtherClause = null;
        string str_OrdFld = null;

        if (!General.empty(strOtherClause))
        {
          str_OtherClause = strOtherClause.Replace(Common.MARK, Common.QUOTE);
        }

        if (!General.empty(strOrdFld))
        {
          str_OrdFld = strOrdFld.Replace(Common.MARK, Common.QUOTE);
        }

        int int_TotalRecords = intTotalRecords;
        int int_TotalPages = intTotalPages;

        OleDbDataReader rst = null;

        OleDbCommand m_Command = new OleDbCommand("QueryPagination", m_Conn);

        m_Command.CommandType = CommandType.StoredProcedure;

        OleDbParameter param;

        param = m_Command.Parameters.Add("t", OleDbType.VarChar, 1000);
        param.Direction = ParameterDirection.Input;
        param.Value = "";

        param = m_Command.Parameters.Add("strFieldList", OleDbType.VarChar, 1000);
        param.Direction = ParameterDirection.Input;
        param.Value = str_FieldList;

        param = m_Command.Parameters.Add("strTableList", OleDbType.VarChar, 300);
        param.Direction = ParameterDirection.Input;
        param.Value = str_TableList;

        param = m_Command.Parameters.Add("strWhereClause", OleDbType.VarChar, 1000);
        param.Direction = ParameterDirection.Input;
        param.Value = str_OtherClause;

        param = m_Command.Parameters.Add("strOrderFld", OleDbType.VarChar, 100);
        param.Direction = ParameterDirection.Input;
        param.Value = str_OrdFld;

        param = m_Command.Parameters.Add("intCurrentPage", OleDbType.Integer, 4);
        param.Direction = ParameterDirection.Input;
        param.Value = intCurrentPage;

        param = m_Command.Parameters.Add("intPageSize", OleDbType.Integer, 4);
        param.Direction = ParameterDirection.Input;
        param.Value = intPageSize;

        param = m_Command.Parameters.Add("intCountToto", OleDbType.Integer, 4);
        param.Direction = ParameterDirection.Input;
        param.Value = intCountTotal;

        param = m_Command.Parameters.Add("intTotoRecords", OleDbType.Integer, 10);
        param.Direction = ParameterDirection.Output;

        param = m_Command.Parameters.Add("intTotoPages", OleDbType.Integer, 10);
        param.Direction = ParameterDirection.Output;
        m_Command.ExecuteNonQuery();

        int_TotalRecords = Convert.ToInt32(m_Command.Parameters["intTotoRecords"].Value);
        int_TotalPages = Convert.ToInt32(m_Command.Parameters["intTotoPages"].Value);

        rst = m_Command.ExecuteReader();

        string strReturnXml = getQueryXml(rst,
                                          strDicFieldList,
                                          strDicNameList,
                                          strDateFieldList,
                                          int_TotalRecords,
                                          int_TotalPages,
                                          blnDicInSv,
                                          strListName);


        rst.Close();
        return strReturnXml;

      }
      catch (Exception e)
      {
        return e.Message;
      }
      finally
      {
        m_Conn.Close();
      }
    }

    public static string basicListQuery(string strFieldList,
                                  string strTableList,
                                  string strOtherClause,
                                  string strOrdFld,
                                  string[] strDicFieldList,
                                  string[] strDicNameList,
                                  string[] strDateFieldList,
                                  int intTotalRecords,
                                  int intTotalPages,
                                  int intPageSize,
                                  int intCurrentPage,
                                  int intCountTotal)
    {
      return basicListQuery(strFieldList,
                            strTableList,
                            strOtherClause,
                            strOrdFld,
                            strDicFieldList,
                            strDicNameList,
                            strDateFieldList,
                            intTotalRecords,
                            intTotalPages,
                            intPageSize,
                            intCurrentPage,
                            intCountTotal,
                            false,
                            Common.XDOC_ROW);

    }

    /// <summary>
    /// 分页查询，返回标准的查询XML
    /// </summary>
    /// <param name="strFieldList">字段列表</param>
    /// <param name="strTableList">表名称</param>
    /// <param name="strOtherClause">Where条件</param>
    /// <param name="strOrdFld">排序字段及排序方式</param>
    /// <param name="strDateFieldList">待处理的时间字段</param>
    /// <param name="intPageSize">每页多少条</param>
    /// <param name="intCurrentPage">第几页</param>
    /// <returns>返回标准的查询XML</returns>
    public static string basicListQuery(string strFieldList,
                              string strTableList,
                              string strOtherClause,
                              string strOrdFld,
                              string[] strDateFieldList,
                              int intPageSize,
                              int intCurrentPage)
    {
      return basicListQuery(strFieldList,
                            strTableList,
                            strOtherClause,
                            strOrdFld,
                            null,
                            null,
                            strDateFieldList,
                            0,
                            0,
                            intPageSize,
                            intCurrentPage,
                            0,
                            false,
                            Common.XDOC_ROW);
    }

    public static string basicListQuery(string strFieldList,
                          string strTableList,
                          string strOtherClause,
                          string strOrdFld,
                          int intPageSize,
                          int intCurrentPage,
                          string strListName)
    {
      return basicListQuery(strFieldList,
                            strTableList,
                            strOtherClause,
                            strOrdFld,
                            null,
                            null,
                            null,
                            0,
                            0,
                            intPageSize,
                            intCurrentPage,
                            0,
                            false,
                            strListName);
    }


    public static string basicListQuery(string strFieldList,
                                        string strTableList,
                                        string strOtherClause,
                                        string strOrdFld,
                                        string[] strDateFieldList,
                                        int intPageSize,
                                        int intCurrentPage,
                                        string strListName)
    {
      return basicListQuery(strFieldList,
                            strTableList,
                            strOtherClause,
                            strOrdFld,
                            null,
                            null,
                            strDateFieldList,
                            0,
                            0,
                            intPageSize,
                            intCurrentPage,
                            0,
                            false,
                            strListName);
    }


    /// <summary>
    /// 分页查询，返回标准的查询XML
    /// </summary>
    /// <param name="strFieldList">字段列表</param>
    /// <param name="strTableList">表名称</param>
    /// <param name="strOtherClause">Where条件</param>
    /// <param name="strOrdFld">排序字段及排序方式</param>
    /// <param name="intPageSize">每页多少条</param>
    /// <param name="intCurrentPage">第几页</param>
    /// <returns>返回标准的查询XML</returns>
    public static string basicListQuery(string strFieldList,
                              string strTableList,
                              string strOtherClause,
                              string strOrdFld,
                              int intPageSize,
                              int intCurrentPage)
    {
      return basicListQuery(strFieldList,
                            strTableList,
                            strOtherClause,
                            strOrdFld,
                            null,
                            null,
                            null,
                            0,
                            0,
                            intPageSize,
                            intCurrentPage,
                            0,
                            false,
                            Common.XDOC_ROW);
    }


    public static string getQueryXml(OleDbDataReader rst,
                                    string[] strDicFieldList,
                                    string[] strDicNameList,
                                    string[] strDateFieldList,
                                    int int_TotalRecords,
                                    int int_TotalPages,
                                    Boolean blnDicInSv,
                                    string strListName)
    {
      strListName = strListName==null ? Common.XDOC_ROW : strListName;

      ReturnDoc docReturn = new ReturnDoc();
        try
        {
          if (docReturn.getQueryInfo(rst, strListName))
          {  
            XmlDocument doc = docReturn.getDocument();
            XmlNodeList nodeList = doc.SelectNodes(Common.BAR2 + strListName);

            for (int k = 0; k < nodeList.Count;k++ )
            {
              XmlNode node = (XmlElement)nodeList.Item(k);

              XmlElement node_Temp;
              /// 处理字典的翻译
              DicCache obj_DicCache = DicCache.getInstance();
              if (strDicFieldList != null)
              {
                for (int i = 0; i < strDicFieldList.Length; i++)
                {
                  node_Temp = (XmlElement)node.SelectSingleNode(strDicFieldList[i]);
                  string str_Text = node_Temp.InnerText;

                  if (General.empty(str_Text)) continue;

                  string str_SV = obj_DicCache.getText(strDicNameList[i], str_Text);


                  if (!blnDicInSv)
                  {
                    if (str_SV != null) node_Temp.InnerText = str_SV;
                  }
                  else
                  {
                    if (str_SV != null)
                      node_Temp.SetAttribute(Common.XML_PROP_SV, str_SV);
                  }
                }
              }

              /// 处理日期类型的字段
              if (strDateFieldList != null)
              {
                for (int i = 0; i < strDateFieldList.Length; i++)
                {
                  node_Temp = (XmlElement)node.SelectSingleNode(strDateFieldList[i]);
                  string str_Text = node_Temp.InnerText;

                  if (General.empty(str_Text)) continue;

                  string str_SV = General.cDateStr(str_Text);
                  str_Text = General.strToDate(str_SV);
                  node_Temp.InnerText = str_Text;

                  if (blnDicInSv)
                  {

                    if (str_SV != null)
                      node_Temp.SetAttribute(Common.XML_PROP_SV, str_SV);
                  }
                }
              }
            }
	          docReturn.addErrorResult(Common.RT_QUERY_SUCCESS);
	        }
	        else
	        {
	          docReturn.addErrorResult(Common.RT_QUERY_NOTHING);
	        }
	        docReturn.addPropToQueryInfo(Common.XML_PROP_TOTALPAGES, int_TotalPages.ToString());
	        docReturn.addPropToQueryInfo(Common.XML_PROP_RECORDS, int_TotalRecords.ToString());
  	      
        }
        catch(Exception e)
        {
    	    
        }
        return docReturn.getXml();
    }


  }
}
