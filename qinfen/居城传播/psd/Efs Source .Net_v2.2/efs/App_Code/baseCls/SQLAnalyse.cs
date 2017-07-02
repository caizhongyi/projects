using System;
using System.Data;
using System.Xml;
using Efsframe.cn.declare;
using Efsframe.cn.func;

namespace Efsframe.cn.baseCls
{
    /// <summary>
    /// 操作型XML处理成标准的T-SQL语句
    /// </summary>
    public static class SQLAnalyse
    {

        public static String analyseXMLSQL(XmlElement eleSQL)
        {
          /// 获得 SQL 的类型
          int int_WriteEvent = 0;
          int int_Operation = Convert.ToInt32(eleSQL.Attributes[Common.XML_PROP_OPERATION].Value);
          try
          {
              int_WriteEvent = Convert.ToInt32(eleSQL.Attributes[Common.XML_PROP_WRITEEVENT].Value);
          }
          catch (Exception e) {
          }

          string str_SQL = "";

          switch (int_Operation)
          {
            case Common.IOP_INSERT:
              str_SQL = parseInsert(eleSQL);
              break;
            case Common.IOP_UPDATE:
              str_SQL = parseUpdate(eleSQL);
              break;
            case Common.IOP_DELETE:
              str_SQL = parseDelete(eleSQL);
              break;
          }

          // 操作历史表信息
          if (int_WriteEvent == 1)
          {
              str_SQL = str_SQL + ";" + parseWriteEventH(eleSQL);
          }

          return str_SQL;
        }


        /// <summary>
        /// 将标准的添加操作XmlElement对象转化为T-SQL语句
        /// </summary>
        /// <param name="eleSQL">业务操作型 XmlElement 对象</param>
        /// <returns>T-SQL语句</returns>
        private static string parseInsert(XmlElement eleSQL)
        {
          XmlNodeList it_Temp = eleSQL.ChildNodes;

          string str_FieldList = "";                  /// 字段列表
          string str_ValueList = "";                  /// 字段值列表
          string str_TableName = eleSQL.Name;    /// 表名

          for (int k = 0; k < it_Temp.Count;k++ )
          {
            XmlNode ele_Field = it_Temp[k];

            String str_State = XmlFun.getAttributValue(ele_Field,Common.XML_PROP_STATE);
            String str_FieldName = ele_Field.Name;
            String str_FieldValue = ele_Field.InnerText;

            if (General.empty(str_State)) continue;

            if (str_State.Equals(Common.ST_NORMAL))
            {
              str_FieldList += str_FieldName + Common.COMMA;

              string str_DataType = XmlFun.getAttributValue(ele_Field, Common.XML_PROP_DATATYPE);

              if (General.empty(str_DataType)) continue;

              int int_DataType = Convert.ToInt32(str_DataType);

              str_ValueList += General.converType(int_DataType, str_FieldValue, str_FieldName) + Common.COMMA;
            } /// if(str_State.equals(Common.DT_STRING))
          } /// for~~~~~~~

          if (General.empty(str_FieldList)) return null;

          return Common.INSERT + str_TableName + Common.SPACE +
                    General.addBracket(str_FieldList.Substring(0, str_FieldList.Length - 1)) +
                    Common.S_VALUES +
                    General.addBracket(str_ValueList.Substring(0, str_ValueList.Length - 1));
        }


        /// <summary>
        /// 通过传入的 XML 结构，组织返回 UPDATE 类型的 SQL 语句
        /// </summary>
        /// <param name="eleSQL">业务操作型 XmlElement 对象</param>
        /// <returns>T-SQL语句</returns>
        private static String parseUpdate(XmlElement eleSQL)
        {
          XmlNodeList it_Temp = eleSQL.ChildNodes;

          string str_EditList = "";                   /// 字段值列表
          string str_WhereList = "";                  /// 条件列表
          string str_TableName = eleSQL.Name;   // 表名

          for (int k = 0; k < it_Temp.Count; k++)
          {
            XmlNode ele_Field = it_Temp[k];

            string str_State = XmlFun.getAttributValue(ele_Field, Common.XML_PROP_STATE);
            string str_FieldName = ele_Field.Name;
            string str_FieldValue = ele_Field.InnerText;

            if (General.empty(str_State)) continue;

            int int_State = Convert.ToInt32(str_State);
            string str_DataType;
            int int_DataType;

            str_DataType = XmlFun.getAttributValue(ele_Field, Common.XML_PROP_DATATYPE);
            int_DataType = General.empty(str_DataType) ? Convert.ToInt32(Common.DT_STRING) : Convert.ToInt32(str_DataType);
            switch (int_State)
            {
              case Common.IST_NORMAL:

                str_EditList += str_FieldName + Common.EQUAL + General.converType(int_DataType, str_FieldValue, str_FieldName) + Common.COMMA;

                break;

              case Common.IST_QUERY:
                if(int_DataType==Common.IDT_BINARY)
                {
                  throw new Exception("查询字句中不能以二进制流字段类型作为查询字句的内容!");
                }
                
                str_WhereList += str_FieldName + Common.EQUAL + General.converType(int_DataType, str_FieldValue, str_FieldName) + Common.S_AND;

                break;
            } /// switch (int_State)
          } /// for~~~~~~~~~~

          if (General.empty(str_EditList)) return null;
          
          if (!General.empty(str_WhereList))
            str_WhereList = Common.S_WHERE + str_WhereList.Substring(0, str_WhereList.Length - 5);

          return Common.UPDATE + str_TableName +
                 Common.S_SET + str_EditList.Substring(0, str_EditList.Length - 1) +
                 str_WhereList;
        }

        /// <summary>
        /// 通过传入的 XML 结构，组织返回 Delete 类型的 SQL 语句
        /// </summary>
        /// <param name="eleSQL">业务操作型 XmlElement 对象</param>
        /// <returns>T-SQL语句</returns>
        private static string parseDelete(XmlElement eleSQL)
        {
          XmlNodeList it_Temp = eleSQL.ChildNodes;

          string str_WhereList = "";                  /// 条件列表
          string str_TableName = eleSQL.Name;   // 表名

          for (int k = 0; k < it_Temp.Count; k++)
          {
            XmlNode ele_Field = it_Temp[k];

            string str_State = XmlFun.getAttributValue(ele_Field, Common.XML_PROP_STATE);
            string str_FieldName = ele_Field.Name;
            string str_FieldValue = ele_Field.InnerText;

            if (General.empty(str_State)) continue;

            int int_State = Convert.ToInt32(str_State);

            String str_DataType;
            int int_DataType;

            switch (int_State)
            {
              case Common.IST_QUERY:
                str_DataType = XmlFun.getAttributValue(ele_Field, Common.XML_PROP_DATATYPE);
                int_DataType = General.empty(str_DataType) ? Convert.ToInt32(Common.DT_STRING) : Convert.ToInt32(str_DataType);

                if (int_DataType!=Common.IDT_BINARY)
                {
                  str_WhereList += str_FieldName + Common.EQUAL + General.converType(int_DataType, str_FieldValue, str_FieldName) + Common.S_AND;
                } /// if (int_DataType==Common.IDT_BINARY)

                break;
            } /// switch ~~~~~~~~~~
          } /// for~~~~~~~~

          if (!General.empty(str_WhereList))
            str_WhereList = Common.S_WHERE + str_WhereList.Substring(0, str_WhereList.Length - 5);

          return Common.DELETE + str_TableName + str_WhereList;
        }





        /// <summary>
        /// 将标准的添加操作XmlElement对象转化为对历史表的操作T-SQL语句
        /// </summary>
        /// <param name="eleSQL">业务操作型 XmlElement 对象</param>
        /// <returns>T-SQL语句</returns>
        private static string parseWriteEventH(XmlElement eleSQL)
        {
            XmlNodeList it_Temp = eleSQL.ChildNodes;

            string str_FieldList = "";                  /// 字段列表
            string str_ValueList = "";                  /// 字段值列表
            string str_TableName = eleSQL.Name;    /// 表名

            for (int k = 0; k < it_Temp.Count; k++)
            {
                XmlNode ele_Field = it_Temp[k];

                String str_State = XmlFun.getAttributValue(ele_Field, Common.XML_PROP_STATE);
                String str_FieldName = ele_Field.Name;
                String str_FieldValue = ele_Field.InnerText;

                if (General.empty(str_State)) continue;

                if (str_State.Equals(Common.ST_NORMAL) || str_State.Equals(Common.ST_QUERY))  // 操作历史表的时候，所有有效字段都写入
                {
                    str_FieldList += str_FieldName + Common.COMMA;

                    string str_DataType = XmlFun.getAttributValue(ele_Field, Common.XML_PROP_DATATYPE);

                    if (General.empty(str_DataType)) continue;

                    int int_DataType = Convert.ToInt32(str_DataType);

                    str_ValueList += General.converType(int_DataType, str_FieldValue, str_FieldName) + Common.COMMA;
                } /// if(str_State.equals(Common.DT_STRING))
            } /// for~~~~~~~

            if (General.empty(str_FieldList)) return null;

            return Common.INSERT + str_TableName + "_H" + Common.SPACE +
                      General.addBracket(str_FieldList.Substring(0, str_FieldList.Length - 1)) +
                      Common.S_VALUES +
                      General.addBracket(str_ValueList.Substring(0, str_ValueList.Length - 1));
        }


    }



        


}
