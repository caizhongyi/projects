using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using WanerDao.Indexing.Database;

namespace WanerDao.Service.WcfSearch
{

    public class SearchService : ISearchService
    {
        public string GetSearchResult(string searchStr, string category, string language, int pageNum, int pageCount)
        {
            try
            {
                IWanerDaoIndexing search = new DataBaseIndexing();
                return search.FacetedSearch(category, searchStr, language, pageNum, pageCount);
            }
            catch (Exception ex)
            {
                CommonHelper.WriteLog(ex.Message, LogEnum.Error);
                return null;
            }
        }


        public string GetSearchCount(string term, string category,string language)
        {
            try
            {
                IWanerDaoIndexing search = new DataBaseIndexing();
                return search.GetSearchCount(term, category, language);
            }
            catch (Exception ex)
            {
                CommonHelper.WriteLog(ex.Message, LogEnum.Error);
                return null;
            }
        }

    }
}
