using System;
using System.Xml;
using Efsframe.cn.declare;
using Efsframe.cn.func;

namespace Efsframe.cn.baseCls
{
  /// <summary>
  /// 统一封装各种对 XMLDocument对象 的处理操作
  /// </summary>
  public static class XmlFun
  {
    /// <summary>
    /// 创建一个dom对象
    /// </summary>
    /// <returns>返回一个dom对象</returns>
    public static XmlDocument CreateNewDoc()
    {
      XmlDocument doc = new XmlDocument();

      return doc;
    }

    public static XmlDocument CreateNewDoc(string strXML)
    {
      try
      {
        XmlDocument doc = new XmlDocument();
        doc.LoadXml(strXML);
        return doc;
      }
      catch (Exception e)
      {
        return null;
      }
    }

    /// <summary>
    /// 功能：将一段XML信息添加到一个Dom对象中去
    /// 时间：20060722
    /// 编写：Enjsky@163.com
    /// </summary>
    /// <param name="doc">Dom对象</param>
    /// <param name="parentNode">待加入的父节点</param>
    /// <param name="dataInfo">待加入的XML信息</param>
    /// <returns></returns>
    public static Boolean setNodeDOM(XmlDocument doc, string parentNode, string dataInfo)
    {
      try
      {
        string strFirstNodeName;
        string strTmpData;
        XmlNode node;
        try
        {
          XmlDocument docTmp = CreateNewDoc();
          docTmp.LoadXml(dataInfo);
          strFirstNodeName = docTmp.DocumentElement.Name;
          strTmpData = docTmp.DocumentElement.InnerXml;
          docTmp = null;
        }
        catch (Exception ex)
        {
          throw ex;
        }

        node = doc.SelectSingleNode(parentNode);

        XmlElement elem = doc.CreateElement(strFirstNodeName);
        elem.InnerXml = strTmpData;

        node.AppendChild(elem);

        return true;
      }
      catch (Exception ae)
      {
        return false;
      }
    }


    /// <summary>
    /// 获得一个默认的Dom对象
    /// </summary>
    /// <returns></returns>
    public static XmlDocument getDefaultDoc()
    {
      try
      {
        string strXML = Common.XML_HEADINFO + "<" + Common.XDOC_ROOT + "/>";
        XmlDocument doc = new XmlDocument();
        doc.LoadXml(strXML);

        XmlElement el = doc.DocumentElement;

        el.SetAttribute(Common.XML_PROP_SOURCE, Common.PVAL_SOURCE);
        el.SetAttribute(Common.XML_PROP_VERSION, Common.PVAL_VERSION);

        return doc;
      }
      catch (Exception ex)
      {
        return null;
      }
    }

    public static string addXDocHead(string strXml)
    {
      return Common.XML_HEADINFO + "<" + Common.XDOC_ROOT + ">" + strXml + "</" + Common.XDOC_ROOT + ">";
    }


    public static XmlNode getNode(XmlDocument doc,string sPath)
    {
      try
      {
        return doc.SelectSingleNode(sPath);
      }
      catch (Exception e)
      {
        return null;
      }
    }

    public static XmlNode getNode(XmlElement el, string sPath)
    {
      try
      {
        return el.SelectSingleNode(sPath);
      }
      catch (Exception e)
      {
        return null;
      }
    }

    public static XmlNode getNode(XmlDocument doc, string sPath,int i)
    {
      try
      {
        return doc.SelectNodes(sPath).Item(i);
      }
      catch (Exception e)
      {
        return null;
      }
    }

    public static XmlElement getElement(XmlDocument doc,string sPath)
    {
      return (XmlElement)getNode(doc,sPath);
    }


    /// <summary>
    /// 功能：获得dom对象指定节点的值
    /// 时间：20060723
    /// 编写：Enjsky@163.com
    /// </summary>
    /// <param name="doc"></param>
    /// <param name="nodePath"></param>
    /// <returns></returns>
    public static string getNodeValue(XmlDocument doc, string nodePath)
    {
      try
      {
        return doc.SelectSingleNode(nodePath).InnerText;
      }
      catch (Exception e)
      {
        return "";
      }

    }



    public static string getNodeValue(XmlElement el, string nodePath)
    {
      try
      {
        return el.SelectSingleNode(nodePath).InnerText;
      }
      catch (Exception e)
      {
        return "";
      }
    }

    public static string getNodeValue(XmlNode node, string nodePath)
    {
      try
      {
        return node.SelectSingleNode(nodePath).InnerText;
      }
      catch (Exception e)
      {
        return "";
      }
    }


    /// <summary>
    /// 功能：获得dom对象指定节点的值
    /// 时间：20060723
    /// 编写：Enjsky@163.com
    /// </summary>
    /// <param name="strXml"></param>
    /// <param name="nodePath"></param>
    /// <returns></returns>
    public static string getNodeValue(string strXml, string nodePath)
    {
      try
      {
        XmlDocument doc = new XmlDocument();
        doc.LoadXml(strXml);
        return doc.SelectSingleNode(nodePath).InnerText;
      }
      catch (Exception e)
      {
        return "";
      }
    }

    /// <summary>
    /// 获得dom对象指定的第i个节点的值
    /// </summary>
    /// <param name="doc"></param>
    /// <param name="nodePath"></param>
    /// <param name="i"></param>
    /// <returns></returns>
    public static string getNodeValue(XmlDocument doc, string nodePath, int i)
    {
      return doc.SelectNodes(nodePath).Item(i).InnerText;
    }


    public static string getNodeValue(string strXml, string nodePath, int i)
    {
      try
      {
        XmlDocument doc = new XmlDocument();
        doc.LoadXml(strXml);
        return getNodeValue(doc, nodePath, i);
      }
      catch (Exception e)
      {
        return "";
      }
    }

    /// <summary>
    /// 设置document对象节点的值
    /// </summary>
    /// <param name="doc">XmlDocument对象</param>
    /// <param name="nodePath">节点路径</param>
    /// <param name="i">节点索引</param>
    /// <param name="sValue">节点值</param>
    /// <returns>Boolean   成功 true 失败 false</returns>
    public static Boolean setNodeValue(XmlDocument doc, string nodePath, int i, string sValue)
    {
      try
      {
        doc.SelectNodes(nodePath).Item(i).InnerText = sValue;
        return true;
      }
      catch (Exception e)
      {
        return false;
      }
    }


    public static Boolean setNodeValue(XmlNode node, string sValue)
    {
      node.InnerText = sValue;
      return true;
    }


    public static Boolean setNodeValue(XmlDocument doc, string nodePath,string sValue)
    {
      return setNodeValue(doc, nodePath, 0, sValue);
    }

    public static Boolean setNodeValue(string strXML, string nodePath, string sValue)
    {
      XmlDocument doc = XmlFun.CreateNewDoc(strXML);

      return setNodeValue(doc, nodePath, sValue);
    }

    public static Boolean setNodeValue(string strXML, string nodePath, int i,string sValue)
    {
      XmlDocument doc = XmlFun.CreateNewDoc(strXML);

      return setNodeValue(doc, nodePath,i, sValue);
    }

    /// <summary>
    /// 获得dom对象节点的属性值
    /// </summary>
    /// <param name="doc">XmlDocument对象</param>
    /// <param name="nodePath">节点路径</param>
    /// <param name="i">节点索引</param>
    /// <param name="svName">属性名称</param>
    /// <returns>string 属性值</returns>
    public static string getAttributValue(XmlDocument doc, string nodePath, int i,string svName)
    {
      try
      {
        return getNodeValue(doc, nodePath + "/@" + svName, i);
      }
      catch (Exception e)
      {
        return "";
      }
    }

    public static string getAttributValue(XmlDocument doc, string nodePath, string svName)
    {
      return getAttributValue(doc, nodePath, 0, svName);
    }

    public static string getAttributValue(string strXML, string nodePath, string svName)
    {
      XmlDocument doc = XmlFun.CreateNewDoc(strXML);
      return getAttributValue(doc, nodePath, 0, svName);
    }

    public static string getAttributValue(string strXML, string nodePath,int i, string svName)
    {
      XmlDocument doc = XmlFun.CreateNewDoc(strXML);
      return getAttributValue(doc, nodePath, i, svName);
    }


    public static string getAttributValue(XmlElement el, string svName)
    {
      try
      {
        return el.Attributes[svName].Value.ToString();
      }
      catch (Exception e)
      {
        return null;
      }
    }


    public static string getAttributValue(XmlNode node, string svName)
    {
      try
      {
        return node.Attributes[svName].Value.ToString();
      }
      catch (Exception e)
      {
        return null;
      }
    }



    /// <summary>
    /// 设置XmlElement对象属性值
    /// </summary>
    /// <param name="el">XmlElement对象</param>
    /// <param name="svName">属性名</param>
    /// <param name="sValue">属性值</param>
    /// <returns>Boolean  true成功   false 失败</returns>
    public static Boolean setAttributeValue(XmlElement el, string svName, string sValue)
    {
      try
      {
        el.SetAttribute(svName, sValue);
        return true;
      }
      catch (Exception e)
      {
        return false;
      }
    }


    public static Boolean setAttributeValue(XmlNode node, string svName, string sValue)
    {
      XmlElement el = (XmlElement)node;
      return setAttributeValue(el, svName, sValue);
    }

    public static Boolean setAttributeValue(XmlDocument doc,string sPath, string svName, string sValue)
    {
      try
      {
        return setAttributeValue(doc.SelectSingleNode(sPath), svName, sValue);
      }
      catch (Exception e)
      {
        return false;
      }
    }

    /// <summary>
    /// 为制定的Node创建子节点
    /// </summary>
    /// <param name="doc">XmlDocument对象</param>
    /// <param name="parentNode">指定父节点路径</param>
    /// <param name="nodeName">创建节点名称</param>
    /// <param name="nodeValue">创建节点值</param>
    /// <returns>Boolean  true成功   false 失败</returns>
    public static Boolean CreateDocNode(XmlDocument doc, string parentNode, string nodeName, string nodeValue)
    {
      XmlNode node = doc.SelectSingleNode(parentNode);

      XmlElement elem = doc.CreateElement(nodeName);
      elem.InnerText = nodeValue;

      node.AppendChild(elem);

      return true;
    }

    public static Boolean CreateDocNode(XmlDocument doc, string parentNode, string nodeName)
    {
      return CreateDocNode(doc, parentNode, nodeName, "");
    }


    public static string test()
    {
      try
      {
        string strXML = "<root><a></a></root>";
        XmlDocument doc = XmlFun.CreateNewDoc(strXML);

        setAttributeValue(doc, "//a", "sv", "1");
        CreateDocNode(doc, "root/a", "a1", "heihei");
        return doc.InnerXml;
      }
      catch (Exception e)
      {
        return e.Message;
      }
    }

  }
}
