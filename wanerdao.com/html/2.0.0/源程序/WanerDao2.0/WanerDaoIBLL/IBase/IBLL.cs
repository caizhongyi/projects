#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-13 23:24:37 
* 文件名：IBLL 
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
using WanerDao2.WanerDaoModel.SqlKey;
using System.Data.Common;

namespace WanerDao2.WanerDaoIBLL.IBase
{
    public interface IBLL<TModel>
    {

        #region select
        TModel GetModel(string id);
        List<TModel> GetList();
        #endregion

        #region update
        bool UpdateModel(TModel model, string sqlKey = SqlKeyBase.Insert);
        bool UpdateModel(List<TModel> list, string sqlKey = SqlKeyBase.Insert, bool isTransaction = false);
        KeyValuePair<string, DbParameter[]> GetUpdateDbParameter(TModel model, string sqlKey = SqlKeyBase.Insert);
        List<KeyValuePair<string, DbParameter[]>> GetUpdateDbParameter(List<TModel> list, string sqlKey);
        #endregion

        #region insert
        bool InsertModel(TModel model, string sqlKey = SqlKeyBase.Insert);
        bool InsertModel(List<TModel> list, string sqlKey = SqlKeyBase.Insert, bool isTransaction = false);
        KeyValuePair<string, DbParameter[]> GetInsertDbParameter(TModel model, string sqlKey = SqlKeyBase.Insert);
        List<KeyValuePair<string, DbParameter[]>> GetInsertDbParameter(List<TModel> list, string sqlKey = SqlKeyBase.Insert);
        #endregion

        #region delete
        bool Delete(string id);
        bool Delete(TModel model, string sqlKey = SqlKeyBase.DeleteByID);
        bool Delete(List<TModel> list, string sqlKey = SqlKeyBase.DeleteByID, bool isTransaction = false);
        KeyValuePair<string, DbParameter[]> GetDeleteDbParameter(TModel model, string sqlKey = SqlKeyBase.DeleteByID);
        List<KeyValuePair<string, DbParameter[]>> GetDeleteDbParameter(List<TModel> list, string sqlKey = SqlKeyBase.DeleteByID);
        #endregion
    }
}
