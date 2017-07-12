#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-16 17:13:42 
* 文件名：IActivityImageBLL 
* 版本：V2.0 
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
using System.Data.Common;
using WanerDao2.WanerDaoModel.Activity;

namespace WanerDao2.WanerDaoIBLL.IActivity
{
     public interface IActivityImageBLL : WanerDaoIBLL.IBase.IBLL<WanerDaoModel.Activity.ActivityImageModel>
    {
         ActivityImageModel GetModel(string id, bool is_block = false, bool is_submit = true);

         List<ActivityImageModel> GetListByForderID(string folder_id, bool is_block = false, bool is_submit = true);

         bool UpdateBlockState(string id, bool is_block);
         KeyValuePair<string, DbParameter[]> GetUpdateBlockStateDbParameter(string id, bool is_block);

         bool UpdateSubmitState(string id, bool is_submit);
         KeyValuePair<string, DbParameter[]> GetUpdateSubmitStateDbParameter(string id, bool is_submit);

         bool AddCounterNuber(string id, int number);
         KeyValuePair<string, DbParameter[]> GetAddCounterNuberDbParameter(string id, int number);

        /// <summary>
        /// 分享相片给活动
        /// </summary>
        /// <param name="pythicalLocationID">分享相片物理地址ID</param>
        /// <param name="acitivty_id">活动名字</param>
        /// <param name="user_id">用户ID</param>
        /// <param name="image_name">图片名字</param>
        /// <param name="description">描述</param>
        /// <returns></returns>
         bool SharePersonImageToActivity(string pythicalLocationID, string acitivty_id, string user_id, string image_name, string description = "");
    }
}
