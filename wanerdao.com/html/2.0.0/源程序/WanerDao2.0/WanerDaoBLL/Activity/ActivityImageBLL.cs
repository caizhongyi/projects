#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-16 17:13:09 
* 文件名：ActivityImageBLL 
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
using WanerDao2.WanerDaoBLL.Base;
using WanerDao2.WanerDaoModel.Activity;
using System.Data.Common;
using WanerDao2.WanerDaoModel.SqlKey;
using WanerDao2.WanerDaoModel.Common;
using WanerDao2.WanerDaoBLL.Common;
using WanerDao2.WanerDaoModule.WanerDaoGuid;

namespace WanerDao2.WanerDaoBLL.Activity
{
    public class ActivityImageBLL :WanerDaoBLL.Base.BLLBase<ActivityImageBLL, ActivityImageModel>, WanerDaoIBLL.IActivity.IActivityImageBLL
    {
        public ActivityImageBLL()
            : base("ActivitySQL", "ActivityImage")
        {
        }
        public override ActivityImageModel GetModel(string id)
        {
            return this.GetModel(id);
        }
        public ActivityImageModel GetModel(string id, bool is_block = false, bool is_submit = true)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("id", id);
            _dic.Add("is_block", is_block);
            _dic.Add("is_submit", is_submit);
            return DBHelper.GetModel<ActivityImageModel>(_dic, ActivityImageKey.SelectByID);
        }

        public List<ActivityImageModel> GetListByForderID(string folder_id, bool is_block = false, bool is_submit = true)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("folder_id", folder_id);
            _dic.Add("is_block", is_block);
            _dic.Add("is_submit", is_submit);
            return DBHelper.GetListModel<ActivityImageModel>(_dic, ActivityImageKey.SelectAllByFolderID);
        }

        public override bool InsertModel(ActivityImageModel model, string sqlKey = SqlKeyBase.Insert)
        {
            ImagePythicalLocationModel _phModel = new ImagePythicalLocationModel
            {
                fileSize = model.fileSize,
                image_path = model.image_path,
                image_small_path = model.image_small_path,
                link_nbr = 1,
                upload_date = DateTime.Now,
                user_id = model.create_id,
                id = WanerDaoGuid.GetGuid()
            };
            model.link_id=_phModel.id;

            List<KeyValuePair<string, DbParameter[]>> _listDBParam = new List<KeyValuePair<string, DbParameter[]>>();
            _listDBParam.Add(ImagePythicalLocationBLL.SingleInstance.GetInsertDbParameter(_phModel));
            _listDBParam.Add(GetInsertDbParameter(model));
            return DBHelper.ExecuteNonQueryForTrans(_listDBParam);
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
            return DBHelper.GetDBParam(ActivityImageKey.UpdateBlockState, _dic);
        }

        public bool UpdateSubmitState(string id, bool is_submit)
        {
            return DBHelper.ExecuteNonQuery(GetUpdateSubmitStateDbParameter(id, is_submit));
        }
        public KeyValuePair<string, DbParameter[]> GetUpdateSubmitStateDbParameter(string id, bool is_submit)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("id", id);
            _dic.Add("is_submit", is_submit);
            return DBHelper.GetDBParam(ActivityImageKey.UpdateSubmitState, _dic);
        }

        public bool AddCounterNuber(string id, int number)
        {
            return DBHelper.ExecuteNonQuery(GetAddCounterNuberDbParameter(id, number));
        }
        public KeyValuePair<string, DbParameter[]> GetAddCounterNuberDbParameter(string id, int number)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("id", id);
            _dic.Add("number", number);
            return DBHelper.GetDBParam(ActivityImageKey.AddCounterNuber, _dic);
        }

        /// <summary>
        /// 分享相片给活动
        /// </summary>
        /// <param name="pythicalLocationID">分享相片物理地址ID</param>
        /// <param name="acitivty_id">活动名字</param>
        /// <param name="user_id">用户ID</param>
        /// <param name="image_name">图片名字</param>
        /// <param name="description">描述</param>
        /// <returns></returns>
        public bool SharePersonImageToActivity(string pythicalLocationID, string acitivty_id, string user_id, string image_name, string description="")
        {
            ImagePythicalLocationModel _phModele = ImagePythicalLocationBLL.SingleInstance.GetModel(pythicalLocationID);
            if (_phModele == null)
                throw new Exception("pythicalLocationID have not been found");
            ActivityImageFolderModel _folderModel = ActivityImageFolderBLL.SingleInstance.GetModelActivityFolder(acitivty_id);
            if(_folderModel==null)
                throw new Exception("activityFolder have not been found");
            ActivityImageModel _model = new ActivityImageModel
            {
                activity_id = acitivty_id,
                create_id = user_id,
                description = description,
                fileSize = _phModele.fileSize,
                image_path = _phModele.image_path,
                image_small_path = _phModele.image_small_path,
                link_id = pythicalLocationID,
                is_submit = true,
                upload_date = DateTime.Now,
                folder_id = _folderModel.id,
                image_name = image_name
            };
            List<KeyValuePair<string, DbParameter[]>> _listDBParam = new List<KeyValuePair<string, DbParameter[]>>();
            _listDBParam.Add(GetInsertDbParameter(_model));
            _listDBParam.Add(ImagePythicalLocationBLL.SingleInstance.GetAddLinkNuberDbParameter(pythicalLocationID,1));
            return DBHelper.ExecuteNonQueryForTrans(_listDBParam);
        }
    }
}
