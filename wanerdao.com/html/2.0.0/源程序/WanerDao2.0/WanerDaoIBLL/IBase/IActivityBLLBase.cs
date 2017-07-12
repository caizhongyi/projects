#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-16 19:14:51 
* 文件名：IActivityBLLBase 
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

namespace WanerDao2.WanerDaoIBLL.IBase
{
    public interface IActivityBLLBase<TModel>:IBLL<TModel>
    {
        #region select
        List<TModel> GetListByUser(string user_id);
        List<TModel> GetListByActivity(string activity_id);
        List<TModel> GetListByActivityAndUser(string activity_id, string user_id);
        #endregion
    }
}
