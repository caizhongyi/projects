using System;
using System.Data;
using System.Data.OleDb;
using System.Collections.Generic;
using Efsframe.cn.declare;
using Efsframe.cn.func;
using Efsframe.cn.baseCls;

namespace Efsframe.cn.db
{
  /// <summary>
  /// 数据处理层，将对数据库的数据处理封装到一个标准事务中，同时对错误进行有效记录，便于分析处理
  /// </summary>
  public class DataStorage
  {

    private List<string> m_lst_SQL = null;  /// 存储 SQL 语句
    
    public DataStorage()
    {
       this.m_lst_SQL = new List<string>();
    }

    /// <summary>
    /// 将一个 SQL 语句添加到存储对象中
    /// </summary>
    /// <param name="strSQL">待加入集合的 SQL 语句</param>
    /// <returns>int 在存储集合中的索引</returns>
    public int addSQL(string strSQL)
    {
      m_lst_SQL.Add(strSQL);
      
      return m_lst_SQL.Count;
    }

    /// <summary>
    /// 清除所有sql
    /// </summary>
    public void clear()
    {
      m_lst_SQL.Clear();
    }

    /// <summary>
    /// 执行存储中的 SQL 语句
    /// </summary>
    /// <returns>空    函数执行成功   其他  返回错误信息</returns>
    public string runSQL()
    {
      try
      {

        OleDbConnection m_Conn = Conn.getConn();
        OleDbTransaction m_Trans;
        OleDbCommand m_Command = m_Conn.CreateCommand();

        m_Trans = m_Conn.BeginTransaction(IsolationLevel.ReadCommitted);

        m_Command.Connection = m_Conn;
        m_Command.Transaction = m_Trans;

        try
        {
          foreach(string strSQL in this.m_lst_SQL)
          {
            m_Command.CommandText = strSQL;
            m_Command.ExecuteNonQuery();
          }

          m_Trans.Commit();
        }
        catch(Exception eT)
        {
          m_Trans.Rollback();

          // 记录错误SQL，便于分析处理
          ErrorLog.addErrorLog(m_lst_SQL);
          throw eT;
        }
        finally 
        {
          m_Conn.Close();
        }

        return "";
      }
      catch(Exception e)
      {
        return e.Message;
      }
    }
  }

  /// <summary>
  /// 记录数据库错误操作日志
  /// </summary>
  public static class ErrorLog
  {
    /// <summary>
    /// 添加数据库操作错误日志
    /// </summary>
    /// <param name="lst_SQL">错误的sqlList</param>
    public static void addErrorLog(List<string> lst_SQL)
    {
      DataStorage obj_Storage = new DataStorage();
      foreach (string strSQL in lst_SQL)
      {
        string strPre = General.curYear2() + General.curMonth() + General.curDay();
        string strObjID = NumAssign.assignID_B("000011", strPre);
        string str_SQL = "INSERT INTO SQLSTORAGE(OBJID,SQLSCRIPT) VALUES ('" + strObjID + "','" + strSQL.Replace(Common.QUOTE, Common.MARK) + "')";
        obj_Storage.addSQL(str_SQL);
      }

      obj_Storage.runSQL();

    }
  }
}
