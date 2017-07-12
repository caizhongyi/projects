#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-16 19:08:16 
* 文件名：ActivityBLLBase 
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
using WanerDao2.WanerDaoModel.Base;
using WanerDao2.WanerDaoIBLL.IBase;
using WanerDao2.WanerDaoModel.SqlKey;

namespace WanerDao2.WanerDaoBLL.Base
{
    public class ActivityBLLBase<TBLL, TModel> : Base.BLLBase<TBLL, TModel>, IActivityBLLBase<TModel>
        where TModel : ModelBase, new()
        where TBLL : new()
    {

        protected ActivityBLLBase(string moduleName = null)
            : base("ActivitySQL", moduleName)
        {
        }

        #region IActivityBLLBase<TModel> 成员

        public virtual List<TModel> GetListByUser(string user_id)
        {
            return DBHelper.GetListModel<TModel>("user_id", user_id, ActivitySqlKeyBase.SelectByUser);
        }
        public virtual List<TModel> GetListByActivity(string activity_id)
        {
            return DBHelper.GetListModel<TModel>("activity_id", activity_id, ActivitySqlKeyBase.SelectByActivity);
        }
        public virtual List<TModel> GetListByActivityAndUser(string activity_id, string user_id)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("activity_id", activity_id);
            _dic.Add("user_id", user_id);
            return DBHelper.GetListModel<TModel>(_dic, ActivitySqlKeyBase.SelectByActivityAndUser);
        }

        #endregion
    }
}
