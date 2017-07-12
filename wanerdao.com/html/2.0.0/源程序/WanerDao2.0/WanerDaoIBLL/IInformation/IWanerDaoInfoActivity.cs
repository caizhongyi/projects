#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/4/17 23:47:05 
* 文件名：IWanerDaoInfoActivity 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion
using System.Collections.Generic;

namespace WanerDao2.WanerDaoIBLL.IInformation
{
    public interface IWanerDaoInfoActivity : IInfomationCommon
    {
        /// <summary>
        /// 获取下拉框的列表内容
        /// </summary>
        /// <param name="dic">页面语言 string language_id,parent_id</param>
        /// <returns></returns>
        string GetActivityCategoryOfDropList(Dictionary<string, object> dic);

        /// <summary>
        /// 获取某个分类下文章的个数
        /// </summary>
        /// <param name="dic">string category_id</param>
        /// <returns></returns>
        string GetPostsCountByCategoryId(Dictionary<string, object> dic);
    }
}
