using System;
using System.Data;
using System.Xml;
using Efsframe.cn.declare;
using Efsframe.cn.func;

namespace Efsframe.cn.baseCls
{
  /// <summary>
    /// 标准操作型XML数据分析处理类
  /// </summary>
  public class DataDoc
  {
    private XmlDocument m_doc_Self = null;

    /// <summary>
    /// 根据DOM对象来初始化类
    /// </summary>
    /// <param name="objDoc">XmlDocument 对象</param>
    public DataDoc(XmlDocument objDoc)
    {
      m_doc_Self = new XmlDocument();
      m_doc_Self = objDoc;
    }
    
    /// <summary>
    /// 根据XML字符串来初始化类
    /// </summary>
    /// <param name="strXML">xml字符串</param>
    public DataDoc(string strXML)
    {
      m_doc_Self = new XmlDocument();
      m_doc_Self.LoadXml(strXML);
    }

    public DataDoc()
    {
      m_doc_Self = XmlFun.getDefaultDoc();
    }

    /// <summary>
    /// 获得某数据节点的个数
    /// </summary>
    /// <param name="strNodeName">节点名称</param>
    /// <returns>该节点个数</returns>
    public int getDataNum(string strNodeName)
    {
      return m_doc_Self.SelectNodes(Common.XDOC_ROOT + Common.BAR + Common.XDOC_DATAINFO + Common.BAR + strNodeName).Count;
    }

    /// <summary>
    /// 获得查询节点个数
    /// </summary>
    /// <param name="strNodeName">节点名称</param>
    /// <returns>该节点的个数</returns>
    public int getQueryNum(string strNodeName)
    {
      return m_doc_Self.SelectNodes(Common.XDOC_ROOT + Common.BAR +
                                         Common.XDOC_QUERYINFO + Common.BAR + strNodeName).Count;
    }

    /// <summary>
    /// 获得数据节点下指定节点的内容
    /// </summary>
    /// <param name="strNodeName">节点名称</param>
    /// <returns>数据节点下指定节点的内容</returns>
    public string getDataValue(string strNodeName)
    {
      return XmlFun.getNodeValue(m_doc_Self,
                                  Common.XDOC_ROOT + Common.BAR +
                                  Common.XDOC_DATAINFO + Common.BAR + strNodeName);
    }

    public XmlNode getDataNode(string strNodeName,int i)
    {
      return XmlFun.getNode(m_doc_Self,
                                  Common.XDOC_ROOT + Common.BAR +
                                  Common.XDOC_DATAINFO + Common.BAR + strNodeName, i);
    }

    /// <summary>
    /// 获得用户信息节点下指定节点的内容
    /// </summary>
    /// <param name="strNodeName">节点名称</param>
    /// <returns>用户信息节点下指定节点的内容</returns>
    public string gettUserValue(string strNodeName)
    {
      return XmlFun.getNodeValue(m_doc_Self,
                                  Common.XDOC_ROOT + Common.BAR +
                                  Common.XDOC_USERINFO + Common.BAR + strNodeName);
    }

    /// <summary>
    /// 设置数据节点下指定节点的内容
    /// </summary>
    /// <param name="strNodeName">节点名称</param>
    /// <param name="strValue">待设置的节点内容</param>
    /// <returns>是否设置成功</returns>
    public Boolean setDataValue(string strNodeName, string strValue)
    {
      try
      {
        if (!strNodeName.StartsWith(Common.BAR2))
          strNodeName = Common.XDOC_ROOT + Common.BAR + Common.XDOC_DATAINFO + Common.BAR + strNodeName;
        XmlFun.setNodeValue(m_doc_Self, strNodeName, strValue);

        return true;
      }
      catch (Exception e)
      {
        return false;
      }
    }

    /// <summary>
    /// 获得用户信息节点
    /// </summary>
    /// <returns>XmlNode 用户信息节点</returns>
    public XmlNode getUserNode()
    {
      return m_doc_Self.SelectSingleNode(
                             Common.XDOC_ROOT + Common.BAR + Common.XDOC_USERINFO);
    }

    /// <summary>
    /// 在文档数据节点下添加一个 SQL 脚本的子节点
    ///        例如：<EFSFRAME>
    ///                <DATAINFO>
    ///                  <SQLSCRIPT operation="5"/>          * 将该节点添加到文档根节点中
    ///                </DATAINFO>
    ///              </EFSFRAME>
    /// </summary>
    /// <param name="strSQL">待插入节点的 SQL 语句</param>
    /// <returns>是否成功</returns>
    public Boolean addSQLScript(string strSQL)
    {
      return XmlFun.CreateDocNode(m_doc_Self, Common.XDOC_ROOT + Common.BAR + Common.XDOC_DATAINFO, Common.XDOC_SQLSCRIPT, strSQL);
    }

    /// <summary>
    /// 获取标准的返回XML字符串
    /// </summary>
    /// <returns>返回XML字符串</returns>
    public string getXML()
    {
      return m_doc_Self.InnerXml;
    }

  }
}
