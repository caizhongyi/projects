using System;
using System.Data;
using System.Xml;
using Efsframe.cn.baseCls;
using Efsframe.cn.declare;
using Efsframe.cn.baseManage;

namespace Efsframe.cn.func
{
  /// <summary>
  /// 对于页面同步提交或者返回的XML进行初步的分析处理
  /// </summary>
  public class PageCommon
  {
    /// <summary>
    /// 在标准的操作型XML中添加用户节点信息，以便能做一些操作日志的处理
    /// </summary>
    /// <param name="strDataInfo">标准操作型xml</param>
    /// <param name="userSession">当前用户的session</param>
    /// <returns>处理后的xml字符串</returns>
    public static string setOpDocXML(string strDataInfo, UserSession userSession)
    {
      try
      {
        XmlDocument doc = XmlFun.getDefaultDoc();

        string nodePath = Common.XDOC_ROOT;

        XmlFun.setNodeDOM(doc, nodePath, strDataInfo);

        
        // 设置用户节点
        string strNodeData = "<USERINFO><USERID>" + userSession.getUserID() +
                             "</USERID><USERTITLE>" + userSession.getUserTitle() +
                             "</USERTITLE><USERNAME>" + userSession.getUserName() +
                             "</USERNAME><UNITID>" + userSession.getUnitID() +
                             "</UNITID><UNITNAME>" + userSession.getUnitName() +
                             "</UNITNAME><MTYPE>" + userSession.getMType() +
                             "</MTYPE><LOGID>" + userSession.getLogID() +
                             "</LOGID><USERTYPE>" + userSession.getUserType() +
                             "</USERTYPE></USERINFO>";

        XmlFun.setNodeDOM(doc, nodePath, strNodeData);

        return doc.InnerXml;
      }
      catch (Exception e)
      {
        return null;
      }
    }

    /// <summary>
    /// 获得返回节点的错误描述信息
    /// </summary>
    /// <param name="doc">XmlDocument对象</param>
    /// <returns>错误描述</returns>
    public static string getErrInfo(XmlDocument doc)
    {
      try
      {
        string nodePath = Common.XDOC_ROOT + Common.BAR + Common.XDOC_ERRORINFO + Common.BAR + Common.XDOC_FUNCERROR;
        return XmlFun.getNodeValue(doc, nodePath);
      }
      catch (Exception e)
      {
        return "";
      }
    }
    /// <summary>
    /// 获得返回节点的错误描述信息
    /// </summary>
    /// <param name="strXML">xml字符串</param>
    /// <returns>错误描述</returns>
    public static string getErrInfo(String strXML)
    {
      try
      {
        XmlDocument doc = XmlFun.CreateNewDoc(strXML);
        return getErrInfo(doc);
      }
      catch (Exception e)
      {
        return "";
      }
    }

    /// <summary>
    /// 根据标准返回的xml判断是否执行成功
    /// </summary>
    /// <param name="doc">XmlDocument对象</param>
    /// <returns>是否成功</returns>
    public static Boolean IsSucceed(XmlDocument doc)
    {
      try
      {
        string strRet = XmlFun.getNodeValue(doc, Common.BAR2 + Common.XDOC_ERRORINFO + Common.BAR + Common.XDOC_ERRORRESULT);
        if (strRet != null)
        {
          if (strRet.Equals(Common.SRT_SUCCESS) || strRet.Equals(Common.RT_QUERY_SUCCESS))
            return true;
          else
            return false;
        }
        else
        {
          return false;
        }
      }
      catch (Exception e)
      {
        return false;
      }
    }
    /// <summary>
    /// 根据标准返回的xml判断是否执行成功
    /// </summary>
    /// <param name="strXML">标准返回xml字符串</param>
    /// <returns>是否成功</returns>
    public static Boolean IsSucceed(string strXML)
    {
      try
      {
        XmlDocument doc = XmlFun.CreateNewDoc(strXML);
        return IsSucceed(doc);
      }
      catch (Exception e)
      {
        return false;
      }
    }


    /// <summary>
    /// 功能：组织提示信息
    /// </summary>
    /// <param name="strMsg">提示信息</param>
    /// <param name="strNextUrl">下一个链接地址</param>
    /// <returns></returns>
    public static string showMsg(string strMsg, string strNextUrl)
    {
      string strScript;

      if (strNextUrl.ToLower() == "back")        // 后退操作
      {
        strScript = "<script language=javascript>\n";

        if (!General.empty(strMsg))                  // 提示信息不为空
          strScript = strScript + "alert('" + strMsg + "');\n";

        strScript = strScript + "history.back();\n";
        strScript = strScript + "</script>";
      }
      else                                     // 跳到下一个地址
      {
        strScript = "<script language=javascript>\n";

        if (!General.empty(strMsg))                 // 提示信息不为空
          strScript = strScript + "alert('" + strMsg + "');\n";
        
        if (!General.empty(strNextUrl))
          strScript = strScript + "window.open('" + strNextUrl + "','_self');\n";

        strScript = strScript + "</script>";
      }
      return strScript;
    }

  }
}
