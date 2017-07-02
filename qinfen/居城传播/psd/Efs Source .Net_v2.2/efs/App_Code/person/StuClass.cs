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
    /// StuClass 的摘要说明
    /// </summary>
    public class StuClass
    {

        /// <summary>
        /// 添加新的班级，并重新生成字典文件
        /// </summary>
        /// <param name="strXml"></param>
        /// <returns></returns>
        public static string ClassAdd(string strXml)
        {
            XmlDocument obj_Doc = XmlFun.CreateNewDoc(strXml);

            // 分配班级编码
            string strClassID = NumAssign.assignID_B("100003", "A");

            XmlFun.setNodeValue(obj_Doc, "//CLASSID", strClassID);

            string op_xml = obj_Doc.InnerXml;

            /// 调用统一的标准操作型xml的处理方法
            string strRetXml = Operation.dealWithXml(op_xml);

            DicCache.getInstance().createDicFile("DIC_STUCLASS","SELECT CLASSID,CLASSNAME FROM STUCLASS ORDER BY CLASSID");

            return strRetXml;
        }

        /// <summary>
        /// 班级修改或者删除
        /// </summary>
        /// <param name="strXml">标准xml</param>
        /// <returns></returns>
        public static string ClassEditOrDel(string strXml)
        {
            /// 调用统一的标准操作型xml的处理方法
            string strRetXml = Operation.dealWithXml(strXml);

            DicCache.getInstance().createDicFile("DIC_STUCLASS", "SELECT CLASSID,CLASSNAME FROM STUCLASS ORDER BY CLASSID");

            return strRetXml;
        }


        /// <summary>
        /// 班级信息查询
        /// </summary>
        /// <param name="strXML"></param>
        /// <returns></returns>
        public static string stuClassList(string strXML)
        {
            QueryDoc obj_Query = new QueryDoc(strXML);
            // 每页查询多少条记录
            int int_PageSize = obj_Query.getIntPageSize();
            // 查询第几页
            int int_CurrentPage = obj_Query.getIntCurrentPage();

            // 将xml分析成标准的where语句
            string str_Where = obj_Query.getConditions();

            str_Where = General.empty(str_Where) ? str_Where : Common.WHERE + str_Where;

            string str_Select = "s.CLASSID,s.CLASSNAME";

            string str_From = "STUCLASS s";


            return CommonQuery.basicListQuery(str_Select,
                                        str_From,
                                        str_Where,
                                        "CLASSID ASC",
                                        int_PageSize,
                                        int_CurrentPage);
        }

        /// <summary>
        ///  查询班级详细信息
        /// </summary>
        /// <param name="strClassID"></param>
        /// <returns></returns>
        public static string stuClassDetail(string strClassID)
        {

            string str_Where = "WHERE CLASSID='" + strClassID + "'";

            string str_Select = "s.CLASSID,s.CLASSNAME,s.CLASSBAK";

            string str_From = "STUCLASS s";


            return CommonQuery.basicListQuery(str_Select,
                                        str_From,
                                        str_Where,
                                        "CLASSID ASC",
                                        1,
                                        1,
                                        "STUCLASS");
        }

    }
}
