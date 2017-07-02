using System;
using System.Data;
using System.Data.OleDb;
using System.Xml;
using Efsframe.cn.declare;

namespace Efsframe.cn.baseCls
{

  /// <summary>
  /// 构造标准的返回成功与否的XML结构文档
  /// </summary>
  public class ReturnDoc
  {
    private XmlDocument m_doc_Self = null;

    public ReturnDoc(XmlDocument objDoc)
    {
      m_doc_Self = objDoc;
    }

    public ReturnDoc(String strXML)
    {
      m_doc_Self = new XmlDocument();
      m_doc_Self.LoadXml(strXML);
    }

    public ReturnDoc()
    {
      m_doc_Self = XmlFun.getDefaultDoc();
    }

    public XmlDocument getDocument()
    {
      return m_doc_Self;
    }

    public int getQueryNum(string strNodeName)
    {
      return m_doc_Self.SelectNodes(Common.XDOC_ROOT + Common.BAR +
                                             Common.XDOC_QUERYINFO + Common.BAR + strNodeName).Count;
    }

    public string getErrorValue(string strNodeName)
    {
      return XmlFun.getNodeValue(m_doc_Self,
                                  Common.XDOC_ROOT + Common.BAR +
                                  Common.XDOC_ERRORINFO + Common.BAR + strNodeName);
    }

    public string getNodeValue(string sPath)
    {
      try{
        return m_doc_Self.SelectSingleNode(sPath).InnerText;
      }
        catch(Exception e)
      {
          return "";
      }
    }

    /// <summary>
    /// 创建标准XML结构的错误信息跟节点
    /// </summary>
    /// <returns>Boolean true成功,false失败</returns>
    public Boolean createErrorInfoNode()
    {
      try
      {
        XmlNodeList nodeList = m_doc_Self.SelectNodes(Common.XDOC_ROOT + Common.BAR + Common.XDOC_ERRORINFO);

        int int_Size = nodeList.Count;

        if(int_Size==0)
        {
          XmlFun.CreateDocNode(m_doc_Self, Common.XDOC_ROOT, Common.XDOC_ERRORINFO);
        }
        return true;
      }
      catch(Exception e)
      {
        
      }
      return false;
    }

    /// <summary>
    /// 为标准的返回XML结构创建错误信息节点并赋值
    /// </summary>
    /// <param name="strNodeName">节点名称</param>
    /// <param name="strResult">节点值</param>
    /// <returns>Boolean true成功,false失败</returns>
    public Boolean setErrorNodeChild(String strNodeName, String strResult)
    {
      try
      {
        if (!createErrorInfoNode())
          throw new Exception("ReturnDoc.setErrorNodeChild.创建返回节点时发生错误");

        XmlNode nod_Temp = m_doc_Self.SelectSingleNode(Common.XDOC_ROOT + Common.BAR + Common.XDOC_ERRORINFO);

        if (nod_Temp==null)
          throw new Exception("ReturnDoc.setErrorNodeChild.获取错误根节点时发生错误");

        XmlNode nod_Child = m_doc_Self.SelectSingleNode(
                                         Common.XDOC_ROOT      + Common.BAR +
                                         Common.XDOC_ERRORINFO + Common.BAR + strNodeName);

        if (nod_Child==null)
        {
          XmlFun.CreateDocNode(m_doc_Self, Common.XDOC_ROOT + Common.BAR + Common.XDOC_ERRORINFO, strNodeName, strResult);
        }
        else
        {
          nod_Child.InnerText = strResult;
        }
        return true;
      }
      catch(Exception e)
      {
        return false;
      }
    }


    public Boolean setErrorResult(string strResult)
    {
      return setErrorNodeChild(Common.XDOC_ERRORRESULT, strResult);
    }


    public Boolean addErrorResult(string strResult)
    {
      return setErrorResult(strResult);
    }

    public Boolean addErrorResult(int intResult)
    {
      return setErrorResult(intResult.ToString());
    }


    public Boolean setFuncErrorInfo(string strResult)
    {
      return setErrorNodeChild(Common.XDOC_FUNCERROR, strResult);
    }

    public Boolean addFuncErrorInfo(string strResult)
    {
      return setFuncErrorInfo(strResult);
    }


    /// <summary>
    /// 向查询返回数据节点中，添加属性
    ///    *        在本函数中，如果原来已经存在同名节点，则会删除原节点
    ///        例如：<EFSFRAME>
    ///                <QUERYINFO> <--  PropInfo
    ///                 </QUERYINFO> 
    ///              </EFSFRAME>
    /// </summary>
    /// <param name="strPropName">属性名称</param>
    /// <param name="strPropValue">属性值</param>
    /// <returns>是否成功</returns>
    public Boolean addPropToQueryInfo(String strPropName, String strPropValue)
    {
      try
      {
        XmlElement ele_Query = XmlFun.getElement(m_doc_Self, Common.XDOC_ROOT + Common.BAR + Common.XDOC_QUERYINFO);

        if (ele_Query==null)
          XmlFun.CreateDocNode(m_doc_Self, Common.XDOC_ROOT, Common.XDOC_QUERYINFO, "");

        ele_Query = XmlFun.getElement(m_doc_Self, Common.XDOC_ROOT + Common.BAR + Common.XDOC_QUERYINFO);

        ele_Query.SetAttribute(strPropName,strPropValue);

        return true;
      }
      catch(Exception e)
      {
        return false;
      }
    }


    /// <summary>
    /// 获取标准的返回XML字符串
    /// </summary>
    /// <returns>返回XML字符串</returns>
    public string getXml()
    {
      return m_doc_Self.InnerXml;
    }

    /// <summary>
    /// 将查询返回的结果集拼装成需要的 XML 的结构
    /// </summary>
    /// <param name="rst">返回的结果集</param>
    /// <param name="strListName">QUERY 子节点下的节点名称</param>
    /// <returns>是否成功</returns>
    public Boolean getQueryInfo(OleDbDataReader rst, string strListName)
    {
      string listXml = OrgReturnNode(Common.XDOC_QUERYINFO, strListName, rst);

      if (XmlFun.setNodeDOM(this.m_doc_Self, Common.XDOC_ROOT, listXml))
        return true;
      else
        return false;
    }

    public Boolean getQueryInfo(OleDbDataReader rst)
    {
      return getQueryInfo(rst, Common.XDOC_ROW);
    }

    public static string OrgReturnNode(string subNodeName,string sNodeName,OleDbDataReader rst)
    {
      XmlDocument doc = XmlFun.CreateNewDoc("<" + subNodeName + "/>");
      XmlElement el_row = null;
      XmlElement elem = null;

      while (rst.Read()) // 循环获取记录集的值
      {
        el_row = doc.CreateElement(sNodeName);

        for (int i = 0; i < rst.FieldCount; i++)
        {
          string strFieldName = rst.GetName(i).ToUpper();
          string sValue = rst[i].ToString();

          elem = doc.CreateElement(strFieldName);
          elem.InnerText = sValue;

          el_row.AppendChild(elem);
        }
        doc.DocumentElement.AppendChild(el_row);
      }

      el_row = null;
      elem = null;
      return doc.InnerXml;
    }


    public XmlNode getQueryInfoNode()
    {
      return XmlFun.getNode(m_doc_Self,
                             Common.XDOC_ROOT + Common.BAR + Common.XDOC_QUERYINFO);
    }


    public Boolean createQueryInfoNode()
    {
      try
      {
        XmlNode node = XmlFun.getNode(m_doc_Self,Common.XDOC_ROOT + Common.BAR + Common.XDOC_QUERYINFO);

        if (node == null)
        {
          XmlFun.CreateDocNode(m_doc_Self, Common.XDOC_ROOT, Common.XDOC_QUERYINFO, "");
        }

        return true;
      }
      catch (Exception e)
      {
        return false;
      }

      return false;
    }


  }
}
