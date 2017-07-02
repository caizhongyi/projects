using System;
using System.Data;
using System.Data.OleDb;
using Efsframe.cn.db;
using Efsframe.cn.func;

namespace Efsframe.cn.baseCls
{
  /// <summary>
  /// 通过调用数据库存储过程，获得汉字的全拼和简拼
  /// </summary>
  public static class Spell
  {
    /// <summary>
    /// 获得汉字的全拼和简拼
    /// </summary>
    /// <param name="strWord">汉字</param>
    /// <param name="sSpell">传递出来的简拼</param>
    /// <param name="sAllSpell">传递出来的全拼</param>
    /// <returns>是否成功</returns>
    public static Boolean getAllSpell(string strWord,ref string sSpell,ref string sAllSpell)
    {
      OleDbConnection m_Conn = Conn.getConn();
      try
      {

        OleDbCommand m_Command = new OleDbCommand("GetAllSpell", m_Conn);

        m_Command.CommandType = CommandType.StoredProcedure;

        OleDbParameter param;

        param = m_Command.Parameters.Add("strRSpell", OleDbType.VarChar, 500);
        param.Direction = ParameterDirection.Output;

        param = m_Command.Parameters.Add("strRASpell", OleDbType.VarChar, 3000);
        param.Direction = ParameterDirection.Output;

        param = m_Command.Parameters.Add("strString", OleDbType.VarChar, 1000);
        param.Direction = ParameterDirection.Input;
        param.Value = strWord;

        m_Command.ExecuteNonQuery();

        sSpell = m_Command.Parameters["strRSpell"].Value.ToString();
        sAllSpell = m_Command.Parameters["strRASpell"].Value.ToString();

        m_Command.Cancel();
        return true;

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
