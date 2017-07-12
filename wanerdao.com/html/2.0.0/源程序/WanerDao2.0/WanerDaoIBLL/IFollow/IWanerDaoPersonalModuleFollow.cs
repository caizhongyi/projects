using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Follow;

namespace WanerDao2.WanerDaoIBLL.IFollow
{
    public interface IWanerDaoPersonalModuleFollow
    {        
        /// <summary>
        /// 个人关注模块，必须填充user_id、attention_id，可填充attention_datetime、is_email、email_duration
        /// </summary>
        /// <param name="model">关注实体</param>
        /// <returns></returns>
        string CreatePersonalModuleFollow(PersonalModuleFollowModel model);
        
        /// <summary>
        /// 取消关注模块
        /// </summary>
        /// <param name="userId">用户主键</param>
        /// <param name="attentionId">被关注的模块主键</param>
        /// <returns></returns>
        string CancelPersonalModuleFollow(string userId, string attentionId);

        /// <summary>
        /// 判断是否已经关注模块
        /// </summary>
        /// <param name="userId">关注人主键</param>
        /// <param name="moduleId">被关注模块主键</param>
        /// <returns></returns>
        bool HasPersonalModuleFollow(string userId, string attentionId);

        /// <summary>
        /// 获取关注模块分页
        /// </summary>
        /// <param name="pageCurrent">当前页数</param>
        /// <param name="pageSize">每页条数</param>
        /// <param name="userId">用户主键</param>
        /// <param name="searchTitle">搜索标题，包括活动标题，活动模块标题</param>
        /// <returns></returns>
        string GetPersonalModuleFollow(int pageCurrent, int pageSize, string userId, string searchTitle);
        /// <summary>
        /// 修改关注模块更新时间
        /// </summary>
        /// <param name="id">关注模块主键</param>
        /// <param name="isEmail">是否需要email通知</param>
        /// <param name="emailDuration">通知频率</param>
        /// <returns></returns>
        string UpdatePersonalModuleFollowDuration(string id, bool isEmail, int emailDuration);

        /// <summary>
        /// 通过关注主键获取模块关注总数
        /// </summary>
        /// <param name="attentionId">关注主键</param>
        /// <returns></returns>
        string GetPersonalModuleFollowCount(string attentionId);
    }
}
