using System;
using System.Data;
using System.Xml;
using Efsframe.cn.declare;
using Efsframe.cn.func;


namespace Efsframe.cn.baseCls
{
  /// <summary>
  /// 对标准的查询操作XML进行分析处理
  /// </summary>
  public class QueryDoc
  {
    private XmlDocument m_doc_Self = null;
    private int intPageSize;  // 每页显示多少条数据
    private int intCurrentPage;  // 当前查询第几页

    public QueryDoc(XmlDocument objDoc)
    {
      this.m_doc_Self = objDoc;
    }

    /// <summary>
    /// 根据xml初始化构造函数
    /// </summary>
    /// <param name="strXML">查询型的xml字符串</param>
    public QueryDoc(string strXML)
    {
      m_doc_Self = new XmlDocument();
      m_doc_Self.LoadXml(strXML);


      XmlElement ele_Condition = this.getCondition();
      string str_Return = XmlFun.getAttributValue(ele_Condition, Common.XML_PROP_RECORDSPERPAGE);
      int int_PageSize = str_Return == null ? 10 : Convert.ToInt32(str_Return);

      setIntPageSize(int_PageSize);

      ///  获得当前待查询页码
      str_Return = XmlFun.getAttributValue(ele_Condition, Common.XML_PROP_CURRENTPAGENUM);
      int int_CurrentPage = str_Return == null ? 1 : Convert.ToInt32(str_Return);
      setIntCurrentPage(int_CurrentPage);
      
    }

    /// <summary>
    /// 设置每页查询条数
    /// </summary>
    /// <param name="pageSizs">条数</param>
    private void setIntPageSize(int pageSizs)
    {
      intPageSize = pageSizs;
    }

    /// <summary>
    /// 获得每页查询条数
    /// </summary>
    /// <returns>每页条数</returns>
    public int getIntPageSize()
    {
      return intPageSize;
    }

    /// <summary>
    /// 设置当前查询的是第几页
    /// </summary>
    /// <param name="cPage">页码</param>
    private void setIntCurrentPage(int cPage)
    {
      intCurrentPage = cPage;
    }

    /// <summary>
    /// 获得当前查询页码
    /// </summary>
    /// <returns>当前查询页码</returns>
    public int getIntCurrentPage()
    {
      return intCurrentPage;
    }

    /// <summary>
    /// 获得解析好的T-SQL查询Where语句
    /// </summary>
    /// <returns>解析好的T-SQL查询Where语句</returns>
    public string getConditions() 
    {
      XmlElement ele_Conditions = XmlFun.getElement(m_doc_Self,Common.XDOC_ROOT + Common.BAR + Common.XDOC_QUERYCONDITION);
      if(ele_Conditions==null)
      {
        return null;
      }
      return parseConditions(ele_Conditions);
    }

    /// <summary>
    /// 根据 XML 文档解析得到T-SQL查询Where语句
    /// </summary>
    /// <param name="ele">XmlElement节点对象</param>
    /// <returns>解析好的T-SQL查询Where语句</returns>
    private string parseConditions(XmlElement ele)
    {
      XmlNodeList it_Condition = ele.SelectNodes(Common.BAR2 + Common.XDOC_CONDITION);
      XmlNodeList it_Conditions = ele.SelectNodes(Common.BAR2 + Common.XDOC_CONDITIONS);
      
      string str_Where = "";
      string str_Type = "";

      for (int k = 0; k < it_Condition.Count; k++ )
      {
        if (k > 0)
        {
          str_Type = XmlFun.getNodeValue(it_Conditions.Item(k-1), Common.XDOC_TYPE);
          str_Type = General.empty(str_Type) ? "" : str_Type.Trim().ToUpper();
        }

        /// 获得查询节点
        if (!General.empty(str_Where))
        {
          if (General.empty(str_Type)) throw new Exception("QueryDoc.parseConditions.77.未提供类型");

          str_Where += Common.SPACE + str_Type + Common.SPACE;
        }

        XmlNode ele_Condition = it_Condition.Item(k);

        string str_Alias = XmlFun.getAttributValue(ele_Condition,Common.XML_PROP_ALIAS);
        string str_DataType = XmlFun.getAttributValue(ele_Condition,Common.XML_PROP_DATATYPE);
        int int_DataType = General.empty(str_DataType) ? 0 : Convert.ToInt32(str_DataType);

        string str_FieldName = XmlFun.getNodeValue(ele_Condition,Common.XDOC_FIELDNAME);
        str_FieldName = General.empty(str_Alias) ? str_FieldName : str_Alias + Common.DOT + str_FieldName;

        /// +
        /// 如果是查询出生日期，则获得该字典的 sv 属性，用来确定是否是按照年龄来查询的
        /// 如果是 AGERANGE 则说明是按照年龄来查询
        /// 如果是 空，则说明是按照出生日期来查询
        string str_Sv = XmlFun.getNodeValue(ele_Condition,Common.XDOC_FIELDNAME + Common.BAR + "@" + Common.XML_PROP_SV);
        string str_Operation = XmlFun.getNodeValue(ele_Condition, Common.XDOC_OPERATION);
        string str_DataValue = XmlFun.getNodeValue(ele_Condition, Common.XDOC_VALUE);

        str_Operation = str_Operation.Trim().ToUpper();

        /// 单独处理日期类型的字段
        if (int_DataType == 3)
        {
          /// 按年龄来进行查询
          if (str_Sv.Equals(Common.XML_AGERANGE))
          {
            str_Where += General.opYearDate(str_FieldName, str_DataValue, str_Operation);
          }
          else
          {
            str_Where += General.opDate(str_FieldName, str_DataValue, str_Operation);
          }
        }
        else
        {
          if (int_DataType == Common.IDT_BINARY)
            throw new Exception("QueryDoc.parseConditions.函数不能处理二进制类型的数据");

          if (str_Operation.ToUpper().Equals("NOT IN") || str_Operation.ToUpper().Equals("IS") || str_Operation.ToUpper().Equals("IS NOT"))
          {
            str_Where += str_FieldName + Common.SPACE +
                          str_Operation + Common.SPACE +
                          str_DataValue;
          }
          else
          {
            str_Where += str_FieldName + Common.SPACE +
                          str_Operation + Common.SPACE +
                          General.converType(int_DataType, str_DataValue, str_FieldName);
          }

        }
      }

      return str_Where;
    }

    /// <summary>
    /// 返回文档的 XML 字符串
    /// </summary>
    /// <returns>当前Document文档的XML 字符串</returns>
    public String getXml()
    {
      return m_doc_Self.InnerXml;
    }

    /// <summary>
    /// 返回文档的XML文档对象
    /// </summary>
    /// <returns>当前文档的XML文档对象</returns>
    public XmlDocument getDocument()
    {
      return this.m_doc_Self;
    }

     /// <summary>
    /// 从文档中获得查询节点
     /// </summary>
    /// <returns>查询节点</returns>
    public XmlElement getCondition()
    {
      XmlElement ele_Condition = (XmlElement)this.m_doc_Self.SelectSingleNode(Common.XDOC_ROOT + Common.BAR +
                                                                        Common.XDOC_QUERYCONDITION);
      return ele_Condition;
    }


  }
}
