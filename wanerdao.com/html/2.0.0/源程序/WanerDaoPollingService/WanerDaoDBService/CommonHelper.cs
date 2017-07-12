#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/5/6 14:26:38 
* 文件名：CommonHelper 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MySql.Data.MySqlClient;
using System.Xml.Linq;
using System.IO;
using Directory = System.IO.Directory;
using System.Data;

namespace WanerDaoDBService
{
 
    public enum LogEnum
    {
        Warning, Error, Info, Message
    }

    public class CommonHelper
    {
        public static void CreateDirectory(string path)
        {
            Directory.CreateDirectory(path);
        }

        public static void WriteLog(string logInfo, LogEnum logenum)
        {
            string filePath = AppDomain.CurrentDomain.BaseDirectory + @"log\log.txt";
            using (FileStream fs = new FileStream(filePath, FileMode.Append))
            {
                using (StreamWriter sw = new StreamWriter(fs, Encoding.UTF8))
                {
                    switch (logenum)
                    {
                        case LogEnum.Warning:
                            sw.WriteLine(DateTime.Now.ToString() + "   " + "Warning: " + logInfo);
                            break;
                        case LogEnum.Error:
                            sw.WriteLine(DateTime.Now.ToString() + "   " + "Error: " + logInfo);
                            break;
                        case LogEnum.Info:
                            sw.WriteLine(DateTime.Now.ToString() + "   " + "Info: " + logInfo);
                            break;
                        case LogEnum.Message:
                            sw.WriteLine(DateTime.Now.ToString() + "   " + "Message: " + logInfo);
                            break;
                        default:
                            break;
                    }
                    sw.Close();
                }
                fs.Close();
            }
        }
    }


   public class DBHelper
    {
        private static string connectingString = System.Configuration.ConfigurationManager.ConnectionStrings["DbConnection"].ConnectionString;
        //引导数据库连接数据库调用Web.Config文件      
        private static MySqlConnection connection;
        //创建连接  
        public static MySqlConnection Connection
        {
            get
            {
                MySqlConnection myConn = new MySqlConnection(connectingString);
                string connectionString = myConn.ConnectionString;
                if (connection == null)
                {
                    connection = new MySqlConnection(connectionString);
                    //打开连接  
                    connection.Open();
                }
                else if (connection.State == System.Data.ConnectionState.Closed)
                {
                    connection.Open();
                }
                else if (connection.State == System.Data.ConnectionState.Broken)
                {
                    connection.Close();
                    connection.Open();
                }
                return connection;
            }
        }
        //（无参）返回执行的行数(删除修改更新)  
        public static int ExecuteCommand(string safeSql)
        {
            MySqlCommand cmd = new MySqlCommand(safeSql, Connection);
            int result = cmd.ExecuteNonQuery();
            return result;
        }
        //（有参）  
        public static int ExecuteCommand(string sql, params MySqlParameter[] values)
        {
            MySqlCommand cmd = new MySqlCommand(sql, Connection);
            cmd.Parameters.AddRange(values);
            return cmd.ExecuteNonQuery();
        }
        //（无参）返回第一行第一列(删除修改更新)  
        public static int GetScalar(string safeSql)
        {
            MySqlCommand cmd = new MySqlCommand(safeSql, Connection);
            int result = Convert.ToInt32(cmd.ExecuteScalar());
            return result;
        }
        //（有参）  
        public static int GetScalar(string sql, params MySqlParameter[] values)
        {
            MySqlCommand cmd = new MySqlCommand(sql, Connection);
            cmd.Parameters.AddRange(values);
            int result = Convert.ToInt32(cmd.ExecuteScalar());
            return result;
        }
        //返回一个DataReader（查询）  
        public static MySqlDataReader GetReader(string safeSql)
        {
            MySqlCommand cmd = new MySqlCommand(safeSql, Connection);
            MySqlDataReader reader = cmd.ExecuteReader();
            return reader;
        }
        public static MySqlDataReader GetReader(string sql, params MySqlParameter[] values)
        {
            MySqlCommand cmd = new MySqlCommand(sql, Connection);
            cmd.Parameters.AddRange(values);
            MySqlDataReader reader = cmd.ExecuteReader();
            return reader;
        }

        //返回一个DataTable  
        public static DataTable GetDataSet(string safeSql)
        {
            DataSet ds = new DataSet();
            MySqlCommand cmd = new MySqlCommand(safeSql, Connection);
            MySqlDataAdapter da = new MySqlDataAdapter(cmd);
            da.Fill(ds);
            return ds.Tables[0];
        }
        public static DataTable GetDataSet(string sql, params MySqlParameter[] values)
        {
            DataSet ds = new DataSet();
            MySqlCommand cmd = new MySqlCommand(sql, Connection);
            cmd.Parameters.AddRange(values);
            MySqlDataAdapter da = new MySqlDataAdapter(cmd);
            da.Fill(ds);
            return ds.Tables[0];
        }
    }
}
