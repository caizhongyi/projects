#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/4/15 19:05:33 
* 文件名：IInfomationManagement 
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

namespace WanerDao2.WanerDaoIBLL.IInformation
{
    public interface IInfomationCommon
    {
        /// <summary>
        /// 信息搜索
        /// </summary>
        /// <param name="dic">string keyword,string category_id,string pagecurrent,string pageSize</param>
        /// <returns></returns>
        string SearchDealsByKeyword(Dictionary<string, object> dic);

        /// <summary>
        /// 评论帖子
        /// </summary>
        /// <param name="dic">string follow_id(回复号),string record_id(记录号),string content</param>
        /// <returns></returns>
        string ActivityRecordsComment(Dictionary<string, object> dic);

        /// <summary>
        /// 获取某个类别下所有帖子的个数
        /// </summary>
        /// <param name="dic">string source_id</param>
        /// <returns></returns>
        string GetInformationCount(Dictionary<string, object> dic);

        /// <summary>
        /// 共享信息
        /// </summary>
        /// <param name="dic">string source_id,string level_id(第一个分类id),
        /// string category_id(最后一个分类的id),string title,string content
        /// string is_sync_state(是否同步状态 1或0),string is_anonymity(是否匿名 1或0)
        /// string page_language_id
        /// </param>
        /// <returns></returns>
        string SubmitInfomation(Dictionary<string, object> dic);
    }
}
