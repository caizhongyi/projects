#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-13 21:15:28 
* 文件名：ActivitySqlKey 
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

namespace WanerDao2.WanerDaoModel.SqlKey
{
    public class ActivitySqlKeyBase:SqlKeyBase
    {
        public const string SelectByActivity = "SelectByActivity";

        public const string SelectByUser = "SelectByUser";

        public const string SelectByActivityAndUser = "SelectByActivityAndUser";
    }

    public class ActivityImageKey : ActivitySqlKeyBase
    {
        /// <summary>
        /// 
        /// </summary>
        public const string UpdateBlockState = "UpdateBlockState";
        /// <summary>
        /// 
        /// </summary>
        public const string UpdateSubmitState = "UpdateSubmitState";

        public const string AddCounterNuber = "AddCounterNuber";

        public const string SelectAllByFolderID = "SelectAllByFolderID";
    }

    public class ActivityImageFolderKey : ActivitySqlKeyBase
    {
        public const string UpdateBlockState = "UpdateFolderBlockState";

        public const string SelectActivityFolder = "SelectActivityFolder";

        public const string ShareActivityFolder = "ShareActivityFolder";

    }
}
