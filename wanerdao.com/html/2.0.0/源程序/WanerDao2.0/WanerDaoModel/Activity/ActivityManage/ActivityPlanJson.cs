#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-04-15 18:38:11 
* 文件名：ActivityPlan 
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
using WanerDao2.WanerDaoModel.Activity.ActivityCreate;

namespace WanerDao2.WanerDaoModel.Activity.ActivityManage
{
    public class ActivityPlanJson
    {
        public string AcitivtyId;
        public List<plan> plans; 
    }
}
