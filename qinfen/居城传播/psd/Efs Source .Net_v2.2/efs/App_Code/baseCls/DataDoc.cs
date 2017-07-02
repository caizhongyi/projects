using System;
using System.Data;
using System.Xml;
using Efsframe.cn.declare;
using Efsframe.cn.func;

namespace Efsframe.cn.baseCls
{
  /// <summary>
    /// ��׼������XML���ݷ���������
  /// </summary>
  public class DataDoc
  {
    private XmlDocument m_doc_Self = null;

    /// <summary>
    /// ����DOM��������ʼ����
    /// </summary>
    /// <param name="objDoc">XmlDocument ����</param>
    public DataDoc(XmlDocument objDoc)
    {
      m_doc_Self = new XmlDocument();
      m_doc_Self = objDoc;
    }
    
    /// <summary>
    /// ����XML�ַ�������ʼ����
    /// </summary>
    /// <param name="strXML">xml�ַ���</param>
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
    /// ���ĳ���ݽڵ�ĸ���
    /// </summary>
    /// <param name="strNodeName">�ڵ�����</param>
    /// <returns>�ýڵ����</returns>
    public int getDataNum(string strNodeName)
    {
      return m_doc_Self.SelectNodes(Common.XDOC_ROOT + Common.BAR + Common.XDOC_DATAINFO + Common.BAR + strNodeName).Count;
    }

    /// <summary>
    /// ��ò�ѯ�ڵ����
    /// </summary>
    /// <param name="strNodeName">�ڵ�����</param>
    /// <returns>�ýڵ�ĸ���</returns>
    public int getQueryNum(string strNodeName)
    {
      return m_doc_Self.SelectNodes(Common.XDOC_ROOT + Common.BAR +
                                         Common.XDOC_QUERYINFO + Common.BAR + strNodeName).Count;
    }

    /// <summary>
    /// ������ݽڵ���ָ���ڵ�����ݮ�
    /// </summary>
    /// <param name="strNodeName">�ڵ�����</param>
    /// <returns>���ݽڵ���ָ���ڵ������</returns>
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
    /// ����û���Ϣ�ڵ���ָ���ڵ������
    /// </summary>
    /// <param name="strNodeName">�ڵ�����</param>
    /// <returns>�û���Ϣ�ڵ���ָ���ڵ������</returns>
    public string gettUserValue(string strNodeName)
    {
      return XmlFun.getNodeValue(m_doc_Self,
                                  Common.XDOC_ROOT + Common.BAR +
                                  Common.XDOC_USERINFO + Common.BAR + strNodeName);
    }

    /// <summary>
    /// �������ݽڵ���ָ���ڵ�����ݮ�
    /// </summary>
    /// <param name="strNodeName">�ڵ�����</param>
    /// <param name="strValue">�����õĽڵ�����</param>
    /// <returns>�Ƿ����óɹ�</returns>
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
    /// ����û���Ϣ�ڵ�
    /// </summary>
    /// <returns>XmlNode �û���Ϣ�ڵ�</returns>
    public XmlNode getUserNode()
    {
      return m_doc_Self.SelectSingleNode(
                             Common.XDOC_ROOT + Common.BAR + Common.XDOC_USERINFO);
    }

    /// <summary>
    /// ���ĵ����ݽڵ������һ�� SQL �ű����ӽڵ�
    ///        ���磺<EFSFRAME>
    ///                <DATAINFO>
    ///                  <SQLSCRIPT operation="5"/>          * ���ýڵ���ӵ��ĵ����ڵ���
    ///                </DATAINFO>
    ///              </EFSFRAME>
    /// </summary>
    /// <param name="strSQL">������ڵ�� SQL ���</param>
    /// <returns>�Ƿ�ɹ�</returns>
    public Boolean addSQLScript(string strSQL)
    {
      return XmlFun.CreateDocNode(m_doc_Self, Common.XDOC_ROOT + Common.BAR + Common.XDOC_DATAINFO, Common.XDOC_SQLSCRIPT, strSQL);
    }

    /// <summary>
    /// ��ȡ��׼�ķ���XML�ַ���
    /// </summary>
    /// <returns>����XML�ַ���</returns>
    public string getXML()
    {
      return m_doc_Self.InnerXml;
    }

  }
}
