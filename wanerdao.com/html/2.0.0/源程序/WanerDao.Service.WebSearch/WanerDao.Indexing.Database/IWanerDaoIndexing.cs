#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/5/6 13:51:38 
* 文件名：IIndexing 
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

namespace WanerDao.Indexing.Database
{
    public interface IWanerDaoIndexing
    {
        /// <summary>
        /// 数据库创建索引库
        /// </summary>
        void IndexDatabase();

        /// <summary>
        /// 创建拼写检查索引库
        /// </summary>
        /// <param name="indexPath">索引文件路径</param>
        /// <param name="spellPath">拼写检查索引路径</param>
        void IndexWords(string indexPath, string spellPath);

        /// <summary>
        /// 搜索全部
        /// </summary>
        /// <param name="indexPath">索引文件路径</param>
        /// <param name="term">搜索关键字</param>
        string Search(string indexPath, string term, string languageId);

        /// <summary>
        /// 建议搜索列表
        /// </summary>
        /// <param name="spellPath">拼写检查索引库</param>
        /// <param name="term">搜索关键字</param>
        IList<string> SuggestSimilar(string spellPath, string term);

        /// <summary>
        /// 按类别搜索
        /// </summary>
        /// <param name="indexPath">索引文件路径</param>
        /// <param name="genre">类别分类</param>
        /// <param name="term">搜索关键字</param>
        /// <param name="resultCount">结果数量</param>
        string FacetedSearch(string indexPath, string genre,string languageId, string term);
        /// <summary>
        /// 按类别搜索
        /// </summary>
        /// <param name="genre">类别分类</param>
        /// <param name="term">搜索关键字</param>
        /// <param name="term">语言编号</param>
        /// <param name="pageNo">第几页</param>
        /// <param name="PageSize">页大小</param>
        /// <param name="resultCount">结果数量</param>
        string FacetedSearch(string genre,string language, string term, int pageNo, int PageSize);

        /// <summary>
        /// 传入关键词与搜索类型，可以返回此搜索类型的结果总数
        /// </summary>
        /// <param name="term">关键词</param>
        /// <param name="category">搜索类型，单个类型包括person、group、activity、posts、other、all。多个搜索类型用逗号隔开</param>
        /// <param name="language">语言编号</param>
        /// <returns>返回为json格式数据，建议格式为{result:true,data:{person:1,group:2}}</returns>
        string GetSearchCount(string term, string category,string language);
    }
}
