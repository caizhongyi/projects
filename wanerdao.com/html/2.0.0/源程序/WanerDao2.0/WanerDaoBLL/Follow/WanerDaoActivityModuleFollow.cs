using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IFollow;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.Json;
using System.Data;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoIBLL.ICommon;
using WanerDao2.WanerDaoBLL.Common;
using WanerDao2.WanerDaoModel.Follow;

namespace WanerDao2.WanerDaoBLL.Follow
{
    public class WanerDaoActivityModuleFollow : WanerDaoPersonalModuleFollow
    {
        override
        public string CancelPersonalModuleFollow(string userId, string attentionId)
        {
            string msg = string.Empty;
            if (HasPersonalModuleFollow(userId, attentionId))
            {
                PersonalModuleFollowModel module = new PersonalModuleFollowModel() { user_id = userId, attention_id = attentionId, source_type_id = WanerDaoPersonalModuleFollow.ACTIVITY_SOURCE_TYPE };
                bool isSuccess = base.CancelPersonalModuleFollow(module);
                if (isSuccess)
                    msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowSuccessInfo"), MessageType.success);
                else
                    msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("CancelFollowFailInfo"), MessageType.error);
            }
            else
                msg = Message(WanerDaoGlobalTip.GetInternationalizationTip("FollowModuleNotExistInfo"), MessageType.success);
            
            return msg;
        }

        override
        public bool HasPersonalModuleFollow(string userId, string attentionId)
        {
            PersonalModuleFollowModel module = new PersonalModuleFollowModel() { user_id = userId, attention_id = attentionId, source_type_id = WanerDaoPersonalModuleFollow.ACTIVITY_SOURCE_TYPE };
            return base.HasPersonalModuleFollow(module);
        }

        override
        public string CreatePersonalModuleFollow(PersonalModuleFollowModel modal)
        {
            modal.source_type_id = WanerDaoPersonalModuleFollow.ACTIVITY_SOURCE_TYPE;
            return base.CreatePersonalModuleFollow(modal);
        }

        override
        public string GetPersonalModuleFollowCount(string attentionId)
        {
            return GetPersonalModuleFollowCount(attentionId, WanerDaoPersonalModuleFollow.ACTIVITY_SOURCE_TYPE);
        }

        override
        public string GetPersonalModuleFollow(int pageCurrent, int pageSize, string userId, string searchTitle)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("sourceTypeId", WanerDaoPersonalModuleFollow.ACTIVITY_SOURCE_TYPE);
            param.Add("userId", userId);
            param.Add("searchTitle", searchTitle);
            return GetPersonalModuleFollow(pageCurrent, pageSize, param);
        }
    }
}
