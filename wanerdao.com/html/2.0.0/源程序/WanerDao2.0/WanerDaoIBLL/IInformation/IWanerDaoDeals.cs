#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 网上打折信息
* 作者：杨晓东   时间：2012/4/14 21:14:27 
* 文件名：IWanerDaoDeals 
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

namespace WanerDao2.WanerDaoIBLL.IInformation
{
    public interface DealsRecordsModel
    {
        string GetAllDealsCount();
        string GetDealsCategory();
        string GetCurrencyCategory();
        string SubmitSharedInfo(Dictionary<string, object> dic);

    }
}
