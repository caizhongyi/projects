#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-15 21:54:38 
* 文件名：IImagePythicalLocationBLL 
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
using WanerDao2.WanerDaoModel.Common;
using System.Data.Common;

namespace WanerDao2.WanerDaoIBLL.ICommon
{
    public interface IImagePythicalLocationBLL : WanerDaoIBLL.IBase.IBLL<ImagePythicalLocationModel>
    {
        bool AddLinkNuber(string id, int number);
        KeyValuePair<string, DbParameter[]> GetAddLinkNuberDbParameter(string id, int number);
    }
}
