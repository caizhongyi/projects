using System;
using System.Xml;
using System.Data;
using Efsframe.cn.db;
using Efsframe.cn.declare;
using Efsframe.cn.func;
using Efsframe.cn.baseCls;

namespace Efsframe.cn.person
{
/// <summary>
/// person 的摘要说明
/// </summary>
public class person
{
	public static string addNew(string strXml)
    {
              /// 创建执行对象
      DataStorage obj_Storage = new DataStorage();
      ReturnDoc obj_ReturnDoc = new ReturnDoc();
      try
      {
        XmlDocument obj_Doc = XmlFun.CreateNewDoc(strXml);
        XmlNodeList nodeLst = obj_Doc.SelectNodes("//*[@operation][@operation!='']");

        for (int i = 0; i < nodeLst.Count; i++ )
        {
          XmlElement ele_Temp = (XmlElement)nodeLst.Item(i);

          // 分配学生编码
          string strpersonid = NumAssign.assignID_B("100001", "1007");
          XmlFun.setNodeValue(ele_Temp.SelectSingleNode("//PERSONID"), strpersonid);

          string stT = ele_Temp.InnerXml;

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


    /// <summary>
    /// 更加简洁的添加学生信息代码
    /// </summary>
    /// <param name="strXml"></param>
    /// <returns></returns>
    public static string addNew2(string strXml)
    {
        XmlDocument obj_Doc = XmlFun.CreateNewDoc(strXml);

        // 分配学生编码
        string strpersonid = NumAssign.assignID_B("100002", "1007");

        XmlFun.setNodeValue(obj_Doc,"//PERSONID", strpersonid);

        string op_xml = obj_Doc.InnerXml;

        /// 调用统一的标准操作型xml的处理方法
        return Operation.dealWithXml(op_xml);
    }


    public static string psnDel(string strPersonID)
    {
        /// 创建执行对象
        DataStorage obj_Storage = new DataStorage();
        ReturnDoc obj_ReturnDoc = new ReturnDoc();

        // 手工构造sql语句
        string str_SQL = "DELETE FROM PERSON WHERE PERSONID='" + strPersonID + "'";
        obj_Storage.addSQL(str_SQL);


        /// 执行sql
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

        return obj_ReturnDoc.getXml();
    }



    /// <summary>
    /// 学生查询
    /// </summary>
    /// <param name="strXML">标准的查询型XML</param>
    /// <returns>xml数据</returns>
    public static string personList(string strXML)
    {
        QueryDoc obj_Query = new QueryDoc(strXML);
        // 每页查询多少条记录
        int int_PageSize = obj_Query.getIntPageSize();
        // 查询第几页
        int int_CurrentPage = obj_Query.getIntCurrentPage();

        // 将xml分析成标准的where语句
        string str_Where = obj_Query.getConditions();

        str_Where = General.empty(str_Where) ? str_Where : Common.WHERE + str_Where;

        string str_Select = "s.PERSONID,s.NAME,s.SEX,s.IDCARD,s.YEAROLD";

        string str_From = "PERSON s";


        return CommonQuery.basicListQuery(str_Select,
                                    str_From,
                                    str_Where,
                                    "PERSONID DESC",
                                    int_PageSize,
                                    int_CurrentPage);
    }


    /// <summary>
    /// 学生详细信息查询
    /// </summary>
    /// <param name="strPersonID"></param>
    /// <returns></returns>
    public static string personDetail(string strPersonID)
    {

        string str_Where = "WHERE PERSONID='" + strPersonID + "'";

        string str_Select = "s.PERSONID,s.NAME,s.SEX,s.IDCARD,s.YEAROLD,s.PLACECODE,s.BIRTHDAY,s.BAK";

        string str_From = "PERSON s";


        return CommonQuery.basicListQuery(str_Select,
                                    str_From,
                                    str_Where,
                                    "PERSONID DESC",
                                    1,
                                    1,
                                    "PERSON");
    }




  }



}
