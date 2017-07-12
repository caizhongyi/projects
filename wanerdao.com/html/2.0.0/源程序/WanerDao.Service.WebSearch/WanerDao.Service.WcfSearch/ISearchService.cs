using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace WanerDao.Service.WcfSearch
{

    [ServiceContract]
    public interface ISearchService
    {

        /// <summary>
        /// 全站搜索服务接口
        /// </summary>
        /// <param name="searchStr">搜索的字符串</param>
        /// <param name="categroy">搜索类别(person, group,activity,posts)</param>
        /// <param name="language">语言编号</param>
        /// <param name="pageCount">每页的显示的记录数</param>
        /// <param name="pageNum">当前页数</param>
        /// <param name="resultCount">返回总记录条数</param>
        /// <returns>搜索结果</returns>
        [OperationContract]
        string GetSearchResult(string searchStr, string category, string language, int pageNum, int pageCount);

        /// <summary>
        /// 传入关键词与搜索类型，可以返回此搜索类型的结果总数
        /// </summary>
        /// <param name="term">关键词</param>
        /// <param name="category">搜索类型，单个类型包括person、group、activity、posts、other、all。多个搜索类型用逗号隔开</param>
        /// <param name="language">语言编号</param>
        /// <returns>返回为json格式数据，建议格式为{result:true,data:{person:1,group:2}}</returns>
        [OperationContract]
        string GetSearchCount(string term, string category, string language);
    }


}
