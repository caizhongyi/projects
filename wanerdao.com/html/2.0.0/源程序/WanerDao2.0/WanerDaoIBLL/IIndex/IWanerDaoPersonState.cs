#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 主页用户状态更新，发表状态等信息接口
* 作者：杨晓东   时间：2011/10/1 19:10:47 
* 文件名：IWanerDaoPersonState 
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
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoModel.Index;


namespace WanerDao2.WanerDaoIBLL.IIndex
{
    public interface IWanerDaoPersonState
    {
        #region 主页状态更新
        /// <summary>
        /// 添加链接
        /// </summary>
        /// <param name="lfmodel"></param>
        /// <returns></returns>
        bool AddLinkFeeds(LinkFeedsModel lfmodel);

        /// <summary>
        /// 添加链接
        /// </summary>
        /// <param name="dic">string link,string description,string permission</param>
        /// <returns></returns>
        String AddLinkFeeds(Dictionary<string, object> dic);

        /// <summary>
        /// 回复链接状态
        /// </summary>
        /// <param name="dic">string id,string content,string followId</param>
        /// <returns></returns>
        string ReplayLinkFeedsComment(Dictionary<string, object> dic);

        /// <summary>
        /// 添加用户状态
        /// </summary>
        /// <param name="nfmodel"></param>
        /// <returns></returns>
        bool AddNewFeeds(NewFeedsModel nfmodel);

        /// <summary>
        /// 添加用户状态
        /// </summary>
        /// <param name="dic">>string coutent,string permission</param>
        /// <returns></returns>
        String AddNewFeeds(Dictionary<string, object> dic);

        /// <summary>
        /// 回复用户状态
        /// </summary>
        /// <param name="dic">string id,followId,content</param>
        /// <returns></returns>
        string ReplayNewFeedsComment(Dictionary<string, object> dic);

        /// <summary>
        /// 删除状态
        /// </summary>
        /// <param name="dic">参数（linkFeedid）</param>
        /// <returns></returns>
        String DeleteLinkFeeds(Dictionary<string, object> dic);

        /// <summary>
        /// 删除链接
        /// </summary>
        /// <param name="dic">参数（NewFeedsid）</param>
        /// <returns></returns>
        String DeleteNewFeeds(Dictionary<string, object> dic);

        #endregion

    }
}
