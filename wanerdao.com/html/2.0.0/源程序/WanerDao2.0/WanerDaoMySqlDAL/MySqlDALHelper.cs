using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MySql.Data.MySqlClient;
using System.Data.Common;
using WanerDao2.WanerDaoModule.DbUtil;
using WanerDao2.WanDaoIDAL;
using System.Data;

namespace WanerDao2.WanDaoMySqlDAL
{
    public class MySqlDALHelper : BaseDbHelper, IDbHelper
    {
        public MySqlConnection connection = new MySqlConnection();
        public MySqlCommand command = new MySqlCommand();
        public MySqlDataAdapter dataAdapter = new MySqlDataAdapter();
        public MySqlTransaction transaction;

        public override DbProviderFactory GetInstance()
        {
            return MySqlClientFactory.Instance;
        }

        /// <summary>
        /// 当前数据库类型
        /// </summary>
        public DataBaseType CurrentDataBaseType
        {
            get
            {
                return DataBaseType.MySql;
            }
        }

        #region public MySqlHelper()
        /// <summary>
        /// 构造方法
        /// </summary>
        public MySqlDALHelper()
        {
            //FileName = "MySqlHelper.txt";   // sql查询句日志
        }
        #endregion

        #region public MySqlHelper(string connectionString)
        /// <summary>
        /// 设定软件名称
        /// </summary>
        /// <param name="connectionString">数据连接</param>
        public MySqlDALHelper(string connectionString)
            : this()
        {
            this.ConnectionString = connectionString;
        }
        #endregion

        #region public string GetDBNow()
        /// <summary>
        /// 获得数据库日期时间
        /// </summary>
        /// <returns>日期时间</returns>
        public string GetDBNow()
        {
            return " now() ";
        }
        #endregion

        #region public string GetDBDateTime()
        /// <summary>
        /// 获得数据库日期时间
        /// </summary>
        /// <returns>日期时间</returns>
        public string GetDBDateTime()
        {
            string commandText = " SELECT " + this.GetDBNow();
            this.Open();
            string dateTime = this.ExecuteScalar(CommandType.Text, commandText, new DbParameter[0]).ToString();
            this.Close();
            return dateTime;
        }
        #endregion


        #region public string SqlSafe(string value) 检查参数的安全性
        /// <summary>
        /// 检查参数的安全性
        /// </summary>
        /// <param name="value">参数</param>
        /// <returns>安全的参数</returns>
        public string SqlSafe(string value)
        {
            value = value.Replace("'", "\'");
            // value = value.Replace("%", "'%");
            return value;
        }
        #endregion

        #region public DbParameter MakeInParam(string targetFiled, object targetValue)
        /// <summary>
        /// 获取参数
        /// </summary>
        /// <param name="targetFiled">目标字段</param>
        /// <param name="targetValue">值</param>
        /// <returns>参数</returns>
        public DbParameter MakeInParam(string targetFiled, object targetValue)
        {
            return new MySqlParameter(targetFiled, targetValue);
        }
        #endregion

        #region public DbParameter[] MakeParameters(string targetFiled, object targetValue)
        /// <summary>
        /// 获取参数
        /// </summary>
        /// <param name="targetFiled">目标字段</param>
        /// <param name="targetValue">值</param>
        /// <returns>参数集</returns>
        public DbParameter[] MakeParameters(string targetFiled, object targetValue)
        {
            DbParameter[] dbParameters = null;
            if (targetFiled != null && targetValue != null)
            {
                dbParameters = new DbParameter[1];
                dbParameters[0] = this.MakeInParam(targetFiled, targetValue);
            }
            return dbParameters;
        }
        #endregion

        #region public DbParameter[] MakeParameters(string[] targetFileds, Object[] targetValues)
        /// <summary>
        /// 获取参数
        /// </summary>
        /// <param name="targetFiled">目标字段</param>
        /// <param name="targetValue">值</param>
        /// <returns>参数集</returns>
        public DbParameter[] MakeParameters(string[] targetFileds, Object[] targetValues)
        {
            DbParameter[] dbParameters = new DbParameter[0];
            if (targetFileds != null && targetValues != null)
            {
                dbParameters = new DbParameter[targetFileds.Length];
                for (int i = 0; i < targetFileds.Length; i++)
                {
                    if (targetFileds[i] != null && targetValues[i] != null)
                    {
                        dbParameters[i] = this.MakeInParam(targetFileds[i], targetValues[i]);
                    }
                }
            }
            return dbParameters;
        }
        #endregion

        public DbParameter MakeOutParam(string paramName, DbType DbType, int Size)
        {
            return MakeParam(paramName, DbType, Size, ParameterDirection.Output, null);
        }

        public DbParameter MakeInParam(string paramName, DbType DbType, int Size, object Value)
        {
            return MakeParam(paramName, DbType, Size, ParameterDirection.Input, Value);
        }

        public DbParameter MakeParam(string paramName, DbType DbType, Int32 Size, ParameterDirection Direction, object Value)
        {
            MySqlParameter param;

            if (Size > 0)
            {
                param = new MySqlParameter(paramName, (MySqlDbType)DbType, Size);
            }
            else
            {
                param = new MySqlParameter(paramName, (MySqlDbType)DbType);
            }

            param.Direction = Direction;
            if (!(Direction == ParameterDirection.Output && Value == null))
                param.Value = Value;

            return param;
        }


        #region public string GetParameter(string parameter) 获得参数Sql表达式
        /// <summary>
        /// 获得参数Sql表达式
        /// </summary>
        /// <param name="parameter">参数名称</param>
        /// <returns>字符串</returns>
        public string GetParameter(string parameter)
        {
            return " ?" + parameter;
        }
        #endregion

        #region string PlusSign(params string[] values)
        /// <summary>
        ///  获得Sql字符串相加符号
        /// </summary>
        /// <param name="values">参数值</param>
        /// <returns>字符加</returns>
        public string PlusSign(params string[] values)
        {
            string returnValue = string.Empty;
            returnValue = " CONCAT(";
            for (int i = 0; i < values.Length; i++)
            {
                returnValue += values[i] + " ,";
            }
            returnValue = returnValue.Substring(0, returnValue.Length - 2);
            returnValue += ")";
            return returnValue;
        }
        #endregion
    }
}
