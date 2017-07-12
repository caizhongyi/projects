#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-16 18:40:12 
* 文件名：IActivityImageFolderBLL 
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
using WanerDao2.WanerDaoModel.Activity;
using System.Data.Common;

namespace WanerDao2.WanerDaoIBLL.IActivity
{
    public interface IActivityImageFolderBLL : WanerDaoIBLL.IBase.IBLL<WanerDaoModel.Activity.ActivityImageFolderModel>
    {
        ActivityImageFolderModel GetModelActivityFolder(string activity_id);

        bool UpdateBlockState(string id, bool is_block);
        KeyValuePair<string, DbParameter[]> GetUpdateBlockStateDbParameter(string id, bool is_block);

        /// <summary>
        /// 分享活动相册及下面的相片
        /// </summary>
        /// <param name="folder_id">活动相册ID</param>
        /// <param name="user_id">用户ID</param>
        /// <param name="image_name">图片名字</param>
        /// <param name="description">描述</param>
        /// <returns></returns>
        bool ShareActivityFolder(string folder_id, string user_id);
    }
}
