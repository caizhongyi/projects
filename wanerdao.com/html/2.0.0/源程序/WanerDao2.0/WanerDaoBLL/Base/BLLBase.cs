using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoCacheManager;
using WanerDao2.WanerDaoModel.Base;
using System.Data.Common;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoModel.SqlKey;
using WanerDao2.WanerDaoBLL.Tool;
using WanerDao2.WanerDaoIBLL.IBase;

namespace WanerDao2.WanerDaoBLL.Base
{
    public class BLLBase<TBLL, TModel>:IBLL<TModel>
        where TModel : ModelBase,new()
        where TBLL:new()
    {
        public DBHelper DBHelper;
        public static object objLock = new object();

        protected BLLBase(string configName,string moduleName=null)
        {
            DBHelper = DBHelper.CreateSingleInstance(configName, moduleName);
        }

        #region singleton
        private static TBLL _instance = default(TBLL);
        public static TBLL SingleInstance
        {
            get 
            {
                if (_instance == null)
                {
                    lock (objLock)
                    {
                        if (_instance==null)
                            _instance=new TBLL();
                    }
                }
                return _instance;
            }
        }
        #endregion

        #region select
        public virtual TModel GetModel(string id)
        {
            return DBHelper.GetModel<TModel>(id,SqlKeyBase.SelectByID);
        }
        public virtual List<TModel> GetList()
        {
            return DBHelper.GetListModel<TModel>(SqlKeyBase.SelectAll);
        }
        #endregion

        #region update
        public virtual bool UpdateModel(TModel model, string sqlKey = SqlKeyBase.Insert)
        {
            return DBHelper.ExecuteNonQuery(GetUpdateDbParameter(model, sqlKey));
        }
        public virtual bool UpdateModel(List<TModel> list, string sqlKey = SqlKeyBase.Insert, bool isTransaction = false)
        {
            if (!isTransaction)
            {
                return DBHelper.ExecuteNonQuery(GetUpdateDbParameter(list, sqlKey));
            }
            else
            {
                return DBHelper.ExecuteNonQueryForTrans(GetUpdateDbParameter(list, sqlKey));
            }
        }
        public virtual KeyValuePair<string, DbParameter[]> GetUpdateDbParameter(TModel model, string sqlKey = SqlKeyBase.Insert)
        {
            return DBHelper.GetDBParam(sqlKey, model);
        }
        public virtual List<KeyValuePair<string, DbParameter[]>> GetUpdateDbParameter(List<TModel> list, string sqlKey)
        {
            return GetDbParameter(list,sqlKey, GetUpdateDbParameter);
        }
        #endregion

        #region insert
        public virtual bool InsertModel(TModel model, string sqlKey = SqlKeyBase.Insert)
        {
            return DBHelper.ExecuteNonQuery(GetInsertDbParameter(model, sqlKey));
        }
        public virtual bool InsertModel(List<TModel> list, string sqlKey = SqlKeyBase.Insert, bool isTransaction = false)
        {
            if (!isTransaction)
            {
                return DBHelper.ExecuteNonQuery(GetInsertDbParameter(list, sqlKey));
            }
            else
            {
                return DBHelper.ExecuteNonQueryForTrans(GetInsertDbParameter(list, sqlKey));
            }
        }
        public virtual KeyValuePair<string, DbParameter[]> GetInsertDbParameter(TModel model, string sqlKey = SqlKeyBase.Insert)
        {
            if (model == null)
            {
                return new KeyValuePair<string, DbParameter[]>(null, null);
            }
            if (string.IsNullOrEmpty(model.id))
            {
                model.id = WanerDaoGuid.GetGuid();
            }
            return DBHelper.GetDBParam(sqlKey, model);
        }
        public virtual List<KeyValuePair<string, DbParameter[]>> GetInsertDbParameter(List<TModel> list, string sqlKey = SqlKeyBase.Insert)
        {
            return GetDbParameter(list,sqlKey, GetInsertDbParameter);
        }
        #endregion

        #region delete
        public virtual bool Delete(string id)
        {
            return Delete(new TModel { id = id });
        }
        public virtual bool Delete(TModel model, string sqlKey = SqlKeyBase.DeleteByID)
        {
            return DBHelper.ExecuteNonQuery(GetDeleteDbParameter(model, sqlKey));
        }
        public virtual bool Delete(List<TModel> list, string sqlKey = SqlKeyBase.DeleteByID, bool isTransaction = false)
        {
            if (!isTransaction)
            {
                return DBHelper.ExecuteNonQuery(GetDeleteDbParameter(list, sqlKey));
            }
            else
            {
                return DBHelper.ExecuteNonQueryForTrans(GetDeleteDbParameter(list, sqlKey));
            }
        }
        public virtual KeyValuePair<string, DbParameter[]> GetDeleteDbParameter(TModel model, string sqlKey = SqlKeyBase.DeleteByID)
        {
            return DBHelper.GetDBParam(sqlKey, model);
        }
        public virtual List<KeyValuePair<string, DbParameter[]>> GetDeleteDbParameter(List<TModel> list, string sqlKey = SqlKeyBase.DeleteByID)
        {
            return GetDbParameter(list, sqlKey, GetDeleteDbParameter);
        }
        #endregion

        #region help

        private List<KeyValuePair<string, DbParameter[]>> GetDbParameter(List<TModel> list,string key, Func<TModel,string, KeyValuePair<string, DbParameter[]>> func)
        {
            List<KeyValuePair<string, DbParameter[]>> _list = new List<KeyValuePair<string, DbParameter[]>>();

            if (list == null || list.Count < 1)
            {
                return _list;
            }
            foreach (TModel _item in list)
            {
                _list.Add(func(_item, key));
            }
            return _list;
        }
        #endregion

    }
}
