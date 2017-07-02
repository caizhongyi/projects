using System;
using System.Xml;
using System.Data;
using System.Diagnostics;
using Efsframe.cn.declare;
using Efsframe.cn.baseCls;

namespace Efsframe.cn.func
{
  /// <summary>
  /// 封装各种常用的函数，方便调用
  /// </summary>
  public static class General
  {

    public static Boolean empty(string str)
    {
      if (str == null) return true;
      if (str.Equals("")) return true;
      if (str == "") return true;
      return false;
    }

    public static string dbDatetime()
    {
      return dbDatetime(Common.C_MSSQL);
    }

    public static string dbDatetime(string strDbms)
    {
      if (strDbms.Equals(Common.C_MSSQL))
      {
        return "GETDATE()";
      }
      if (strDbms.Equals(Common.C_ORACLE))
      {
        return "SYSDATE";
      }
      return null;
    }

    public static string addBracket(string value)
    {
      return "(" + value + ")";
    }

    /// <summary>
    /// 格式化日期字符串
    /// </summary>
    /// <param name="value">日期字符串</param>
    /// <param name="strDbms">数据库类型</param>
    /// <returns></returns>
    public static string formatDate(string value, string strDbms)
    {
      if (strDbms.Equals(Common.C_ORACLE)) // oracle 格式
        return "TO_DATE('" + value + "','YYYY-MM-DD')";
      else if (strDbms.Equals(Common.C_MSSQL)) // Ms Sql 格式
        return "Cast('" + value + "' AS DATETIME)";
      else
        return "'" + value + "'";
    }

    /// <summary>
    /// 格式化日期时间字符串
    /// </summary>
    /// <param name="sdate">日期时间字符串</param>
    /// <param name="strDbms">数据库类型</param>
    /// <returns></returns>
    public static string formatDatetime(string sdate,string strDbms)
    {
      if (strDbms.Equals(Common.C_ORACLE)) // oracle 格式
        return "TO_DATE('" + sdate + "','YYYY-MM-DD hh24:mi:ss')";
      else if (strDbms.Equals(Common.C_MSSQL)) // Ms Sql 格式
        return "Cast('" + sdate + "' AS DATETIME)";
      else
        return "'" + sdate + "'";

    }


    public static string strToDate(string value)
    {
      if (empty(value))
      {
        return null;
      }

      if (value.Length < 8)
        return null;

      int iposa = value.IndexOf("-");
      int iposb = value.IndexOf("/");

      if (iposa < 0 && iposb < 0)
      {
        value = value.Substring(0, 4) + "-" + value.Substring(4, 2) + "-" + value.Substring(6, 2);
      }
      return value;
    }


    public static string strToDateTime(string value)
    {
      if (empty(value))
      {
        return null;
      }
      int ipos = value.IndexOf(Common.SPACE);
      if (ipos > 0)
      {
        value = strToDate(value.Substring(0, ipos)) + value.Substring(ipos);
      }
      else
      {
        value = strToDate(value) + Common.SPACE + "00:00:00";
      }
      return value;
    }


     public static string converType(int itype,
                                  string value,
                                  string name)
    {
      try
      {
        switch(itype)
        {
          case 0: return "'" + value.Replace("'","''") + "'";  // 字符串
          case 1: return General.empty(value)?"''":value;         // 数值
          case 2: return General.dbDatetime();                    // 系统时间
          case 3: return General.empty(value) ? "''" : General.formatDate(General.strToDate(value), Common.C_MSSQL);         // 时间
          case 4: return General.empty(value) ? "''" : General.formatDatetime(General.strToDateTime(value), Common.C_MSSQL); // 日期时间型
        }
      }
      catch(Exception e)
      {
        return "";
      }
      return "";
    }

    /// <summary>
    /// 将日期格式化成  20090101
    /// </summary>
    /// <param name="date"></param>
    /// <returns></returns>
    public static string cDateStr(string date)
    {
      try
      {
        DateTime dt = Convert.ToDateTime(date);

        int year = dt.Year;
        int month = dt.Month;
        int day = dt.Day;

        string sMonth = month < 10 ? "0" + month : month.ToString();
        string sday = day < 10 ? "0" + day : day.ToString();
        return year.ToString() + sMonth + sday;
      }
      catch (Exception e)
      {
        return "";
      }
    }

    /// <summary>
    /// 获得当前年的后2位
    /// </summary>
    /// <returns></returns>
    public static string curYear2()
    {
      DateTime dt = new DateTime();
      dt = DateTime.Now;
      string sYear = dt.Year.ToString();
      return sYear.Substring(2);
    }

    /// <summary>
    /// 获得当前日期2为的月
    /// </summary>
    /// <returns></returns>
    public static string curMonth()
    {
      DateTime dt = new DateTime();
      dt = DateTime.Now;
      int month = dt.Month;
      string sMonth = month < 10 ? "0" + month : month.ToString();

      return sMonth;
    }
    /// <summary>
    /// 获得当前2位的日
    /// </summary>
    /// <returns></returns>
    public static string curDay()
    {
      DateTime dt = new DateTime();
      dt = DateTime.Now;
      int day = dt.Day;
      string sday = day < 10 ? "0" + day : day.ToString();

      return sday;
    }

    /// <summary>
    /// 为一个字符串两端加上单引号
    /// </summary>
    /// <param name="value">源字符串</param>
    /// <returns></returns>
    public static string addQuotes(string value)
    {
      return "'" + value + "'";
    }

    /// <summary>
    /// 处理日期类型字段中的年龄类型，
    ///             将其处理成为可以为数据库接收的合法的 SQL 语句
    ///             20              =20
    ///             20-             >=20
    ///             -20             <=20
    ///            20-40           BETWEEN 20 AND 40
    /// </summary>
    /// <param name="name">年龄的值</param>
    /// <param name="value"></param>
    /// <param name="oper"></param>
    /// <returns>分析后的查询字句</returns>
    public static string opYearDate(string name, string value, string oper)
    {
      int ipos = value.IndexOf("-");
      if (ipos != -1)
      {
        /// 分割符在前面
        if (ipos == 0)
        {
          return "YEAROLD(" + name + ")" + "<=" + value.Substring(1);
        }
        else
        {
          /// 分割符在最后
          if (ipos == (value.Length - 1))
          {
            return "YEAROLD(" + name + ")" + ">=" + value.Substring(0, value.Length - 1);
          }
          else
          {
            return "YEAROLD(" + name + ") between " + value.Substring(0, ipos) + " and " + value.Substring(ipos + 1);
          }
        }
      }
      else
      {
        string flags = "=,!=,>,<,>=,<=,LIKE,NOT LIKE";
        if (flags.IndexOf(oper) > -1)
        {
          return "YEAROLD(" + name + ") " + oper + " " + value;
        }
      }
      return "YEAROLD(" + name + ")" + "=" + value;
    }

    /// <summary>
    /// 处理日期类型的成为可以为数据库接收的合法的 SQL 语句
    /// 20010101            =TO_DATE('2001-01-01', 'yyyy-mm-dd')
    /// 20010101-           >=TO_DATE('2001-01-01', 'yyyy-mm-dd')
    /// -20010101           <=TO_DATE('2001-01-01', 'yyyy-mm-dd')
    /// 20010101-20011231   (>=TO_DATE('2001-01-01', 'yyyy-mm-dd') AND <=TO_DATE('2001-12-31', 'yyyy-mm-dd'))
    /// </summary>
    /// <param name="name"></param>
    /// <param name="value"></param>
    /// <param name="oper"></param>
    /// <returns>分析后的查询字句</returns>
    public static string opDate(string name, string value, string oper)
    {
      int ipos = value.IndexOf("-");

      if (ipos != -1)
      {
        ///   分割符在前面
        if (ipos == 0)
        {
          return formatChar(name, "<=", value.Substring(1));
        }
        else
        {
          ///     分割符在后面
          if (ipos == value.Length- 1)
          {
            return formatChar(name, ">=", value.Substring(0, value.Length - 1));
          }
          else
          {
            return "(" + formatChar(name, ">=", value.Substring(0, ipos)) + " and " + formatChar(name, "<=", value.Substring(ipos + 1)) + ")";
          }
        }
      }
      else
      {
        string flags = "=,!=,>,<,>=,<=,LIKE,NOT LIKE";
        if (flags.IndexOf(oper) > -1)
        {
          if (oper.IndexOf(">") > -1)
          {
            oper = oper.Replace(">", "<");
          }
          else
          {
            if (oper.IndexOf("<") > -1)
            {
              oper = oper.Replace("<", ">");
            }
          }
          return formatChar(name, oper, value);
        }
      }
      return name + "=" + addQuotes(value);
    }


    public static string formatChar(string name,
                                  string oper,
                                  string value,
                                  string patter)
    {
      return "Cast('" + value + "' AS DATETIME)";
      // 以下是oracle处理方式
      // return "TO_CHAR" + addBracket(name + Common.COMMA + addQuotes(patter)) + oper + addQuotes(value);
    }

    public static String formatChar(String name,
                                  String oper,
                                  String value)
    {
      return "Cast('" + value + "' AS DATETIME)";
      /*  以下是oracle处理
      if (value.length() == 4)
        return formatChar(name, oper, value, "yyyy");

      if (value.length() == 6)
        return formatChar(name, oper, strMonth(value), "yyyy-mm");

      return formatChar(name, oper, strToDate(value), "yyyy-mm-dd");
       * */
    } 




    /// <summary>
    /// 功能：可以向 Dbgview.exe 中输出调试信息
    /// </summary>
    /// <param name="strMsg">需要输出的信息</param>
    public static void TracePrint(string strMsg)
    {
      Debug.WriteLine(strMsg);
    }

    /// <summary>
    /// 生成字典文件
    /// </summary>
    /// <param name="strDicName">字典名称</param>
    /// <returns>是否成功</returns>
    public static void CreateDicFile(string strDicName)
    {
      try
      {
        DicCache.getInstance().createDicFile(strDicName);
      }
      catch (Exception e)
      {
        throw e;
      }
    }

  }
}
