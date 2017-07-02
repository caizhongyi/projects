using System;
using System.Data;
using System.Data.OleDb;
using System.Configuration;

namespace Efsframe.cn.db
{
  /// <summary>
  /// 统一获取数据库链接的类
  /// </summary>
  public class Conn
  {


    public static OleDbConnection getConn()
    {
      string strConn = System.Configuration.ConfigurationSettings.AppSettings["ConnectionString"];
      OleDbConnection m_Conn = new OleDbConnection(strConn);
      m_Conn.Open();
      return m_Conn;
    }

    public static OleDbConnection getConn(string connString)
    {
      OleDbConnection m_Conn = new OleDbConnection(connString);
      m_Conn.Open();
      return m_Conn;
    }
  }
}
