#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-16 18:43:57 
* 文件名：ActivityImageFolderBLL 
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
using WanerDao2.WanerDaoModel.SqlKey;
using System.Data.Common;
using WanerDao2.WanerDaoModule.WanerDaoGuid;

namespace WanerDao2.WanerDaoBLL.Activity
{
    public class ActivityImageFolderBLL : WanerDaoBLL.Base.ActivityBLLBase<ActivityImageFolderBLL, ActivityImageFolderModel>, WanerDaoIBLL.IActivity.IActivityImageFolderBLL
    {
        public ActivityImageFolderBLL()
            : base("ActivityImageFolder")
        {
        }

        public ActivityImageFolderModel GetModelActivityFolder(string activity_id)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("activity_id", activity_id);
            _dic.Add("is_system", true);
            return DBHelper.GetModel<ActivityImageFolderModel>(_dic, ActivityImageFolderKey.SelectActivityFolder);
        }

        public bool UpdateBlockState(string id, bool is_block)
        {
            return DBHelper.ExecuteNonQuery(GetUpdateBlockStateDbParameter(id, is_block));
        }
        public KeyValuePair<string, DbParameter[]> GetUpdateBlockStateDbParameter(string id, bool is_block)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("id", id);
            _dic.Add("is_block", is_block);
            return DBHelper.GetDBParam(ActivityImageFolderKey.UpdateBlockState, _dic);
        }

        /// <summary>
        /// 分享活动相册及下面的相片
        /// </summary>
        /// <param name="folder_id">活动相册ID</param>
        /// <param name="user_id">用户ID</param>
        /// <param name="image_name">图片名字</param>
        /// <param name="description">描述</param>
        /// <returns></returns>
        public bool ShareActivityFolder(string folder_id, string user_id)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("newfolderid", WanerDaoGuid.GetGuid());
            _dic.Add("folder_id", folder_id);
            _dic.Add("user_id", user_id);

            return DBHelper.ExecuteNonQuery(ActivityImageFolderKey.ShareActivityFolder,_dic);
        }
    }
}
