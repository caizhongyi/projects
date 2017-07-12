#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人相关配置（积分，经验等）
* 作者：杨晓东   时间：2011/10/3 15:15:48 
* 文件名：IWanerDaoPersonConfig 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion
using System;
using System.Collections.Generic;

namespace WanerDao2.WanerDaoIBLL.IPerson
{
    public interface IWanerDaoPersonConfig
    {
        #region 经验积分
        /// <summary>
        /// 增加经验积分。
        /// </summary>
        /// <param name="dic">用户id，要加的分数</param>
        /// <returns></returns>
        int AddExperienceByUserId(Dictionary<string, object> dic);

        /// <summary>
        /// 减少个人经验积分。
        /// </summary>
        /// <param name="dic">用户id，要加的分数</param>
        /// <returns></returns>
        String SubExperienceByUserId(Dictionary<string, object> dic); 
        #endregion

        #region 活跃度积分
        /// <summary>
        /// 增加活跃度积分
        /// </summary>
        /// <param name="dic">用户id，要加的分数</param>
        /// <returns></returns>
        int AddActivityScoreByUserId(Dictionary<string, object> dic);

        /// <summary>
        /// 增加活动活跃度积分
        /// </summary>
        /// <param name="dic">活动id，要加的分数</param>
        /// <returns></returns>
        int AddActivityScoreByActivityId(Dictionary<string, object> dic);

        /// <summary>
        /// 增加圈子活跃度积分
        /// </summary>
        /// <param name="dic">圈子id，要加的分数</param>
        /// <returns></returns>
        int AddActivityScoreByGroupId(Dictionary<string, object> dic); 
        #endregion

        #region 关注度积分
        /// <summary>
        /// 添加关注度积分
        /// </summary>
        /// <param name="dic">用户id，要加的分数</param>
        /// <returns></returns>
        String AddFollowScore(Dictionary<string, object> dic);

        /// <summary>
        /// 减少关注度积分
        /// </summary>
        /// <param name="dic">用户id，要减的分数</param>
        /// <returns></returns>
        String SubFollowScore(Dictionary<string, object> dic); 
        #endregion

        #region 信用度积分
        /// <summary>
        /// 增加信用度积分
        /// </summary>
        /// <param name="dic">用户id，要加的分数</param>
        /// <returns></returns>
        String AddCreditScore(Dictionary<string, object> dic);

        /// <summary>
        /// 增加信用度积分
        /// </summary>
        /// <param name="dic">用户id，要减的分数</param>
        /// <returns></returns>
        String SubCreditScore(Dictionary<string, object> dic); 
        #endregion

        #region 爱心度积分
        /// <summary>
        /// 增加爱心度积分
        /// </summary>
        /// <param name="dic">用户id，要加的分数</param>
        /// <returns></returns>
        int AddShareScore(Dictionary<string, object> dic);

        /// <summary>
        /// 减少爱心度积分
        /// </summary>
        /// <param name="dic">用户id，要加的分数</param>
        /// <returns></returns>
        String SubShareScore(Dictionary<string, object> dic); 
        #endregion
        
        #region 金币
        /// <summary>
        /// 增加金币
        /// </summary>
        /// <param name="dic">用户id，要加的金币数</param>
        /// <returns></returns>
        String AddGoldCount(Dictionary<string, object> dic);

        /// <summary>
        /// 减少金币
        /// </summary>
        /// <param name="dic">用户id，要减的金币数</param>
        /// <returns></returns>
        String SubGoldCount(Dictionary<string, object> dic); 
        #endregion

        #region 资料完成度
        /// <summary>
        /// 修改资料完成度
        /// </summary>
        /// <param name="dic">用户id，完成度%</param>
        /// <returns></returns>
        String UpdateIntegrityScore(Dictionary<string, object> dic); 
        #endregion
    }
}
