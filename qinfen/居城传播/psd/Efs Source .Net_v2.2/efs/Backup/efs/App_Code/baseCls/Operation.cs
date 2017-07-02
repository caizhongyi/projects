using System;
using System.Xml;
using System.Data;
using Efsframe.cn.db;
using Efsframe.cn.declare;
using Efsframe.cn.func;

namespace Efsframe.cn.baseCls
{
  /// <summary>
  /// 标准业务操作型XML处理统一接口类
  /// 能方便快捷的将标准的业务操作型XML文档分析处理成T-SQL并封装事务执行
  /// 并按照标准的返回XML结构构造相关处理结果信息
  /// </summary>
  public static class Operation
  {
    /// <summary>
    /// 统一处理标准的业务操作型XML文档，将文档分析称T-SQL封装到DataStorage类中作为一个事务执行
    /// </summary>
    /// <param name="strXML">标准业务操作型XML文档</param>
    /// <returns>标准 XML 返回文档字符串</returns>
    public static string dealWithXml(string strXML)
    {
      /// 创建执行对象
      DataStorage obj_Storage = new DataStorage();
      ReturnDoc obj_ReturnDoc = new ReturnDoc();
      try
      {
        XmlDocument obj_Doc = XmlFun.CreateNewDoc(strXML);
        XmlNodeList nodeLst = obj_Doc.SelectNodes("//*[@operation][@operation!='']");

        for (int i = 0; i < nodeLst.Count; i++ )
        {
          XmlElement ele_Temp = (XmlElement)nodeLst.Item(i);
          //      创建插入数据的XML
          string str_SQL = SQLAnalyse.analyseXMLSQL(ele_Temp);

          obj_Storage.addSQL(str_SQL);
        }
    
        /// 执行
        string str_Return = obj_Storage.runSQL();
    
    
        if (!General.empty(str_Return))
        {
          obj_ReturnDoc.addErrorResult(Common.RT_FUNCERROR);
          obj_ReturnDoc.setFuncErrorInfo(str_Return);
        }
        else
        {
          obj_ReturnDoc.addErrorResult(Common.RT_SUCCESS);
        }
      }
      catch(Exception e)
      {
        obj_ReturnDoc.addErrorResult(Common.RT_FUNCERROR);
        obj_ReturnDoc.setFuncErrorInfo(e.Message);
      }

      return obj_ReturnDoc.getXml();
    }
  }
}
