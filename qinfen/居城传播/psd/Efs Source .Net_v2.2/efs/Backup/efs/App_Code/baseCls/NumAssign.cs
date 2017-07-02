using System;
using System.Data;
using System.Data.OleDb;
using Efsframe.cn.db;
using Efsframe.cn.func;

namespace Efsframe.cn.baseCls
{
  /// <summary>
  /// 根据数据库中的MAXIDTYPE的配置，自动完成各种编码分配
  /// 关联的数据库表： MAXIDTYPE，MAXID
  /// 关联的存储过程： pMaxID_A，pMaxID_B
  /// </summary>
  public class NumAssign
  {

    /// <summary>
    /// 分配一级编码
    /// </summary>
    /// <param name="strIDType">编码规则编号</param>
    /// <returns>分配有效的编号</returns>
    public static string assignID_A(string strIDType)
    {
      OleDbConnection m_Conn = Conn.getConn();
      try
      {

        OleDbCommand m_Command = new OleDbCommand("pMaxID_A", m_Conn);

        m_Command.CommandType = CommandType.StoredProcedure;

        OleDbParameter param;

        param = m_Command.Parameters.Add("t", OleDbType.VarChar, 1);
        param.Direction = ParameterDirection.Input;
        param.Value = "";

        param = m_Command.Parameters.Add("strIDType", OleDbType.VarChar, 6);
        param.Direction = ParameterDirection.Input;
        param.Value = strIDType;

        param = m_Command.Parameters.Add("strMaxID", OleDbType.VarChar, 200);
        param.Direction = ParameterDirection.Output;

        m_Command.ExecuteNonQuery();

        string strRet = m_Command.Parameters["strMaxID"].Value.ToString();

        m_Command.Cancel();

        return strRet;

      }
      catch (Exception e)
      {
        throw e;
      }
      finally
      {
        m_Conn.Close();
      }
    }

    /// <summary>
    /// 二级编号分配
    /// </summary>
    /// <param name="strIDType">编码规则编号</param>
    /// <param name="strMaxID1">传入的编码规则头</param>
    /// <returns>已分配有效的编码</returns>
    public static string assignID_B(string strIDType,
                                  string strMaxID1)
    {
      OleDbConnection m_Conn = Conn.getConn();
      try
      {

        OleDbCommand m_Command = new OleDbCommand("pMaxID_B", m_Conn);

        m_Command.CommandType = CommandType.StoredProcedure;

        OleDbParameter param;

        param = m_Command.Parameters.Add("t", OleDbType.VarChar, 1);
        param.Direction = ParameterDirection.Input;
        param.Value = "";

        param = m_Command.Parameters.Add("strIDType", OleDbType.VarChar, 6);
        param.Direction = ParameterDirection.Input;
        param.Value = strIDType;

        param = m_Command.Parameters.Add("strMaxID1", OleDbType.VarChar, 200);
        param.Direction = ParameterDirection.Input;
        param.Value = strMaxID1;

        param = m_Command.Parameters.Add("strMaxID", OleDbType.VarChar, 200);
        param.Direction = ParameterDirection.Output;

        m_Command.ExecuteNonQuery();

        string strRet = m_Command.Parameters["strMaxID"].Value.ToString();

        m_Command.Cancel();

        return strRet;

      }
      catch (Exception e)
      {
        throw e;
      }
      finally
      {
        m_Conn.Close();
      }
    }



  }
}
