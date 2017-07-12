using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoDALFactory;

namespace WanerDao2.WanerDaoBLL.Person
{
    /// <summary>
    /// 描述:个人相关配置（积分，经验等）接口实现
    /// 描述：xux
    /// 时间：2011-10-25
    /// </summary>
   public class WanerDaoPersonConfig : IWanerDaoPersonConfig
    {
       /// <summary>
        /// 增加经验积分。
       /// </summary>
        /// <param name="dic">用户id，要加的分数</param>
       /// <returns></returns>
        public int AddExperienceByUserId(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalExperience", dic);
        }

        public string SubExperienceByUserId(Dictionary<string, object> dic)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 增加个人活跃度积分
        /// </summary>
        /// <param name="dic">用户id，要加的分数</param>
        /// <returns></returns>
        public int AddActivityScoreByUserId(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateActivityScoreExperience", dic);
        }
        /// <summary>
        /// 增加活动活跃度积分
        /// </summary>
        /// <param name="dic">活动id，要加的分数</param>
        /// <returns></returns>
        public int AddActivityScoreByActivityId(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().ExecuteNonQuery("ActivitySQL", "UpdateActivityScoreExperience", dic);
        }
       /// <summary>
        /// 增加圈子活跃度积分
        /// </summary>
        /// <param name="dic">圈子id，要加的分数</param>
        /// <returns></returns>
       public int AddActivityScoreByGroupId(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().ExecuteNonQuery("GroupSQL", "UpdateActivityScoreExperience", dic);
        }
        public string AddFollowScore(Dictionary<string, object> dic)
        {
            throw new NotImplementedException();
        }

        public string SubFollowScore(Dictionary<string, object> dic)
        {
            throw new NotImplementedException();
        }

        public string AddCreditScore(Dictionary<string, object> dic)
        {
            throw new NotImplementedException();
        }

        public string SubCreditScore(Dictionary<string, object> dic)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 增加爱心度积分
        /// </summary>
        /// <param name="dic">用户id，要加的分数</param>
        /// <returns></returns>
        public int AddShareScore(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateShareScoreExperience", dic);
        }

        public string SubShareScore(Dictionary<string, object> dic)
        {
            throw new NotImplementedException();
        }

        public string AddGoldCount(Dictionary<string, object> dic)
        {
            throw new NotImplementedException();
        }

        public string SubGoldCount(Dictionary<string, object> dic)
        {
            throw new NotImplementedException();
        }

        public string UpdateIntegrityScore(Dictionary<string, object> dic)
        {
            throw new NotImplementedException();
        }
    }
}
