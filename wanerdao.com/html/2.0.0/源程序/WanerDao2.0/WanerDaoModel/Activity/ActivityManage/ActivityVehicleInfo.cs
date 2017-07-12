#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-04-026 20:13:02 
* 文件名：ActivityVehicleInfo 
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
using WanerDao2.WanerDaoModel.Activity.ActivitySignUp;

namespace WanerDao2.WanerDaoModel.Activity.ActivityManage
{
    public class ActivityVehicleInfo
    {
        private string _userId;
        private string _activityId;
        private vehicletype _vehicletype;

        public string UserId
        {
            get { return _userId; }
            set { _userId = value; }
        }
        public vehicletype Vehicletype
        {
            get { return _vehicletype; }
            set { _vehicletype = value; }
        }
        public string ActivityId
        {
            get { return _activityId; }
            set { _activityId = value; }
        }

    }
}
