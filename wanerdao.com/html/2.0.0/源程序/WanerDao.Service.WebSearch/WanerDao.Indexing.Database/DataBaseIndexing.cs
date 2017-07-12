#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/5/6 14:17:12 
* 文件名：DataBaseIndexing 
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
using Lucene.Net.Index;
using Lucene.Net.Analysis.PanGu;
using Lucene.Net.Documents;
using Lucene.Net.Store;
using SpellChecker.Net.Search.Spell;
using Lucene.Net.Search;
using Lucene.Net.QueryParsers;
using System.Collections;
using System.Reflection;
using Lucene.Net.Util;
using PanGu;
using Ionic.Zip;
using System.Configuration;
using MySql.Data.MySqlClient;

namespace WanerDao.Indexing.Database
{
    public class DataBaseIndexing : IWanerDaoIndexing
    {
        private string m_DicRootPath = System.Configuration.ConfigurationManager.AppSettings["IndexRootPath"];
        private string m_BackupRootPath = System.Configuration.ConfigurationManager.AppSettings["BakRootPath"];
        private IndexWriter indexWriter = null;
        IndexWriter.MaxFieldLength maxLength = IndexWriter.MaxFieldLength.LIMITED;

        private void CreateIndex(string language)
        {
            string path = m_DicRootPath + "/" + language;//语言号为索引文件夹名
            SimpleFSDirectory sFsDir = new SimpleFSDirectory(System.IO.Directory.CreateDirectory(path));
            indexWriter = new IndexWriter(sFsDir, new PanGuAnalyzer(), true, maxLength);//现在的表设计无法建立增量索引

            var tbSecCollection = CommonHelper.GetSQLConfigList("SQLIndexingConfig.xml");
            try
            {
                MySqlParameter param = new MySqlParameter();
                param.DbType = System.Data.DbType.String;
                param.ParameterName = "language_id";
                param.Value = language;
                Field field = null;
                string SQL = string.Empty;
                foreach (SQLTable sqlTab in tbSecCollection)
                {
                    //判断是不是单表名  如果单表不需要括号
                    if (sqlTab.tableName.IndexOf(" ") != -1)
                        SQL = "select * from (" + sqlTab.tableName + ") as query_table";
                    else
                        SQL = "select * from " + sqlTab.tableName + " as query_table";
                   
                    using (var dr = DBHelper.GetReader(SQL,param))
                    {
                        try
                        {
                            while (dr.Read())
                            {
                                Document doc = new Document();
                                string[] indexColumns = sqlTab.indexColumn.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                                string[] otherColumns = sqlTab.otherColumn.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                                string category = sqlTab.tableCategory.ToLower();
                                //Add the index columns as stored but not indexed field, not used to query on
                                for (int i = 0; i < indexColumns.Length; i++)
                                {
                                    field = new Field(indexColumns[i], dr[indexColumns[i]].ToString(), Field.Store.YES, Field.Index.ANALYZED, Field.TermVector.NO);
                                    doc.Add(field);
                                }

                                for (int i = 0; i < otherColumns.Length; i++)
                                {
                                    string otherColumn = otherColumns[i];
                                    if ("id" == otherColumn || "user_id" == otherColumn)
                                    {
                                        field = new Field(otherColumn, dr[otherColumn].ToString(), Field.Store.YES, Field.Index.NO, Field.TermVector.NO);
                                    }
                                    else
                                    {
                                        field = new Field(otherColumn, dr[otherColumn].ToString(), Field.Store.YES, Field.Index.NOT_ANALYZED, Field.TermVector.NO);
                                    }
                                    doc.Add(field);
                                }
                                doc.Add(new Field("tableCategory", category, Field.Store.YES, Field.Index.NOT_ANALYZED, Field.TermVector.NO));
                                indexWriter.AddDocument(doc);
                            }
                        }
                        catch (Exception ex) { CommonHelper.WriteLog("索引异常: " + ex.Message, LogEnum.Error); }
                        finally { dr.Close(); }
                    }
                }

                // make lucene fast
                indexWriter.Optimize();
            }
            finally
            {
                // close the index writer
                indexWriter.Close();
            }


        }

        private void backupIndex(string sDirName)
        {
            using (ZipFile zip = new ZipFile())
            {
                zip.AddDirectory(sDirName);
                zip.Comment = "This zip was created at " + System.DateTime.Now.ToString("G");
                System.IO.Directory.CreateDirectory(m_BackupRootPath);
                zip.Save(m_BackupRootPath + @"\" + "indexBak" + System.DateTime.Now.ToString("yyyy-MM-dd") + ".zip");
            }
        }

        /// <summary>
        /// 数据库创建索引库
        /// </summary>
        /// <param name="indexPath">索引文件路径</param>
        public void IndexDatabase()
        {
            DateTime startIndexing = DateTime.Now;
            
            //backupIndex(indexPath);
            
            CommonHelper.WriteLog("开始建立索引．", LogEnum.Message);

            //获取语言编号，编号是以逗号隔开
            string language = ConfigurationManager.AppSettings["Language"];
            
            if (!string.IsNullOrEmpty(language))
            { 
                //用逗号分隔符取出语言编号，循环建立索引。规则为文件夹名是语言号。
                string[] languages = language.Split(',');
                string path = string.Empty;
                foreach (string l in languages)
                {
                    CreateIndex(l);//创建索引
                }
            }

            DateTime endIndexing = DateTime.Now;
            CommonHelper.WriteLog("建立索引结束．", LogEnum.Message);
            CommonHelper.WriteLog("本次建立索引耗时: " + (endIndexing - startIndexing).Seconds + " 秒. 索引的Document个数: " + indexWriter.MaxDoc(), LogEnum.Message);
        }

        /// <summary>
        /// 创建拼写检查索引库
        /// </summary>
        /// <param name="indexPath">索引文件路径</param>
        /// <param name="spellPath">拼写检查索引路径</param>
        public void IndexWords(string indexPath, string spellPath)
        {
            // open the index reader          
            System.IO.DirectoryInfo dirInfo = new System.IO.DirectoryInfo(indexPath);
            Directory dir = FSDirectory.Open(dirInfo);
            IndexReader indexReader = IndexReader.Open(dir, true);

            // create the spell checker
            System.IO.DirectoryInfo spellDirInfo = new System.IO.DirectoryInfo(spellPath);
            Directory spellDir = FSDirectory.Open(spellDirInfo);
            var spell = new SpellChecker.Net.Search.Spell.SpellChecker(spellDir);

            // add all the words in the field description to the spell checker
            spell.IndexDictionary(new LuceneDictionary(indexReader, "description"));
        }

        /// <summary>
        /// 搜索全部
        /// </summary>
        /// <param name="indexPath">索引文件路径</param>
        /// <param name="term">搜索关键字</param>
        public string Search(string indexPath, string term, string languageId)
        {
            Directory dir = null;
            Searcher searcher = null;
            int resultCount = 0;
            try
            {
                // create searcher
                System.IO.DirectoryInfo dirInfo = new System.IO.DirectoryInfo(indexPath);
                dir = FSDirectory.Open(dirInfo);
                searcher = new IndexSearcher(dir, true);

                List<string> strList = new List<string>();//构造需要索引的字段
                ReadConfigToList(strList, null);

                //声明BooleanClause.Occur[]数组,它表示多个条件之间的关系,与strList相对应
                //BooleanClause.Occur.MUST表示and,BooleanClause.Occur.MUST_NOT表示not,BooleanClause.Occur.SHOULD表示or. 
                BooleanClause.Occur[] occurArr = new BooleanClause.Occur[strList.Count];
                for (int i = 0; i < occurArr.Length; i++)
                    occurArr[i] = BooleanClause.Occur.SHOULD;

                //搜索
                Query searchQuery = MultiFieldQueryParser.Parse(Lucene.Net.Util.Version.LUCENE_29,
                    term, strList.ToArray(), occurArr, new PanGuAnalyzer());

                //多语言过滤
                QueryFilter filter = new QueryFilter(MultiFieldQueryParser.Parse(Lucene.Net.Util.Version.LUCENE_29,
                    languageId, new string[] { "language_id" }, occurArr, new PanGuAnalyzer()));

                // perform the search
                TopDocs topDocs = searcher.Search(searchQuery, filter, searcher.MaxDoc());
                resultCount = topDocs.totalHits;//获取命中数

                ScoreDoc[] scoreDocs = topDocs.scoreDocs;  //获取命中的文档信息对象    

                string result = "{\"result\":true,\"total\":" + resultCount + ",\"data\":[";

                // loop through all the hits and show their title
                for (int i = 0; i < scoreDocs.Length; i++)
                {
                    // get the corresponding document
                    Document hitDoc = searcher.Doc(scoreDocs[i].doc); //根据命中的文档的内部编号获取该文档     
                    //  System.out.println(hitDoc.getField("contents" ).stringValue());  //输出该文档指定域的值  

                    // hitDoc.GetField("").StringValue();
                    IList fieldArr = hitDoc.GetFields();
                    BuildResult(ref result, hitDoc);
                }
                if (result.LastIndexOf(",") == result.Length - 1) result = result.Remove(result.Length - 1);
                result += "]}";
                return result;
            }
            catch (Exception ex) { CommonHelper.WriteLog(ex.Message, LogEnum.Error); resultCount = 0; return null; }
            finally
            {
                if (searcher != null)
                    searcher.Close(); //关闭搜索器    
                if (dir != null)
                    dir.Close(); //关闭索引存放目录     
            }

        }

        /// <summary>
        /// 建议搜索列表
        /// </summary>
        /// <param name="spellPath">拼写检查索引库</param>
        /// <param name="term">搜索关键字</param>
        public IList<string> SuggestSimilar(string spellPath, string term)
        {
            System.IO.DirectoryInfo dirInfo = new System.IO.DirectoryInfo(spellPath);
            FSDirectory dir = FSDirectory.Open(dirInfo);
            var spell = new SpellChecker.Net.Search.Spell.SpellChecker(dir);

            // get 2 similar words
            string[] similarWords = spell.SuggestSimilar(term, 2);

            //// show the similar words
            //for (int wordIndex = 0; wordIndex < similarWords.Length; wordIndex++)
            //    Console.WriteLine(similarWords[wordIndex] + " is similar to " + term);

            return similarWords.ToList();
        }

        /// <summary>
        /// 按类别搜索
        /// </summary>
        /// <param name="indexPath">索引文件路径</param>
        /// <param name="genre">类别分类</param>
        /// <param name="term">搜索关键字</param>
        /// <param name="resultCount">结果数量</param>
        public string FacetedSearch(string indexPath, string genre,string languageId, string term)
        {
            IndexSearcher searcher = null;
            Directory dir = null;
            int resultCount = 0;

            // create searcher
            System.IO.DirectoryInfo dirInfo = new System.IO.DirectoryInfo(indexPath);
            dir = FSDirectory.Open(dirInfo);
            searcher = new IndexSearcher(dir, true);

            List<string> strList = new List<string>();//构造需要索引的字段
            ReadConfigToList(strList, null);
            strList = strList.Distinct().ToList();
            //声明BooleanClause.Occur[]数组,它表示多个条件之间的关系,与strList相对应
            //BooleanClause.Occur.MUST表示and,BooleanClause.Occur.MUST_NOT表示not,BooleanClause.Occur.SHOULD表示or. 
            BooleanClause.Occur[] occurArr = new BooleanClause.Occur[strList.Count];
            for (int i = 0; i < occurArr.Length; i++)
                occurArr[i] = BooleanClause.Occur.SHOULD;

            Query searchQuery = MultiFieldQueryParser.Parse(Lucene.Net.Util.Version.LUCENE_29,
                   term, strList.ToArray(), occurArr, new PanGuAnalyzer());

            var genreQuery = new TermQuery(new Term("tableCategory", genre));

            Query lanQuery1 = new TermQuery(new Term("language_id", languageId));
            Query lanQuery2 = new TermQuery(new Term("language_id", string.Empty));
            BooleanQuery lanQuery = new BooleanQuery();
            lanQuery.Add(lanQuery1, BooleanClause.Occur.SHOULD);
            lanQuery.Add(lanQuery2, BooleanClause.Occur.SHOULD);


            BooleanQuery typeQuery = new BooleanQuery();
            typeQuery.Add(genreQuery, BooleanClause.Occur.MUST);
            typeQuery.Add(searchQuery, BooleanClause.Occur.MUST);
            typeQuery.Add(lanQuery1, BooleanClause.Occur.MUST);

            //var genreQueryFilter = new QueryWrapperFilter(typeQuery);

            //BitArray genreBitArray = genreQueryFilter.Bits(searcher.G//etIndexReader());//用次函数因为此函数查询速度回快点,否则可用下面注释的
            //DocIdSetIterator termIterator = genreQueryFilter.GetDocIdSet(searcher.GetIndexReader()).Iterator();
            //var productsDISI = new OpenBitSetDISI(termIterator, 25000);          
            //var total = productsDISI.Cardinality();


            //全部中工有几条数据符合条件%
            // Console.WriteLine("There are " + GetCardinality(genreBitArray) + " document with the genre " + genre);

            TopDocs topDocs = searcher.Search(typeQuery, null, searcher.MaxDoc());
            resultCount = topDocs.totalHits;
            ScoreDoc[] scoreDocs = topDocs.scoreDocs;
            string result = "{\"result\":true,\"total\":" + resultCount + ",\"data\":[";
            for (int i = 0; i < scoreDocs.Length; i++)
            {
                // get the corresponding document
                Document hitDoc = searcher.Doc(scoreDocs[i].doc); //根据命中的文档的内部编号获取该文档     
                // hitDoc.GetField("").StringValue();
                IList fieldArr = hitDoc.GetFields();
                BuildResult(ref result, hitDoc);
            }
            if (result.LastIndexOf(",") == result.Length - 1) result = result.Remove(result.Length - 1);
            result += "]}";

            HighLightResult(term, ref result);
            return CleanString(result);

            //// Next perform a regular search and get its BitArray result
            //Query searchQuery = MultiFieldQueryParser.Parse(term, new[] { "title", "description" }, new[] { BooleanClause.Occur.SHOULD, BooleanClause.Occur.SHOULD }, new PanGuAnalyzer());
            //var searchQueryFilter = new QueryFilter(searchQuery);
            //BitArray searchBitArray = searchQueryFilter.Bits(searcher.GetIndexReader());
            //Console.WriteLine("There are " + GetCardinality(searchBitArray) + " document containing the term " + term);

            //// Now do the faceted search magic, combine the two bit arrays using a binary AND operation
            //BitArray combinedResults = searchBitArray.And(genreBitArray);
            //Console.WriteLine("There are " + GetCardinality(combinedResults) + " document containing the term " + term + " and which are in the genre " + genre);

        }

        /// <summary>
        /// 清理字符串格式，去掉\n
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        private string CleanString(string input)
        {
            return input.Replace("\n", string.Empty);
        }

        /// <summary>
        /// 按类别搜索
        /// </summary>
        /// <param name="genre">类别分类</param>
        /// <param name="term">搜索关键字</param>
        /// <param name="term">语言编号</param>
        /// <param name="pageNo">第几页</param>
        /// <param name="PageSize">页大小</param>
        /// <param name="resultCount">结果数量</param>
        public string FacetedSearch(string genre, string term, string language, int pageNo, int PageSize)
        {
            int resultCount = 0;
            string indexPath = m_DicRootPath;
            if (PageSize < 1) PageSize = 10;
            if (pageNo < 1) pageNo = 1;
            int beginIndex = (pageNo - 1) * PageSize;
            int endIndex = pageNo * PageSize;

            //默认搜索索引
            IndexSearcher searcher = GetDefaultIndexSearcher(language);
            //查询
            Query searchQuery = GetSearchQuery(term);

            BooleanQuery typeQuery = new BooleanQuery();

            ConceiveCondition(typeQuery, genre);
            //组合为一个搜索,条件为AND         
            //  typeQuery.Add(genreQuery, BooleanClause.Occur.MUST);
            typeQuery.Add(searchQuery, BooleanClause.Occur.MUST);

            //将条件加入过滤列表
            var genreQueryFilter = new QueryWrapperFilter(typeQuery);

            TopDocs topDocs = searcher.Search(typeQuery, genreQueryFilter, searcher.MaxDoc());
            resultCount = topDocs.totalHits;
            ScoreDoc[] scoreDocs = topDocs.scoreDocs;

            if (endIndex >= scoreDocs.Length) endIndex = scoreDocs.Length;

            string result = "{\"result\":true,\"total\":" + resultCount + ",\"data\":[";
            for (int i = beginIndex; i < endIndex; i++)
            {
                // get the corresponding document
                Document hitDoc = searcher.Doc(scoreDocs[i].doc); //根据命中的文档的内部编号获取该文档     
                // hitDoc.GetField("").StringValue();
                BuildResult(ref result, hitDoc);
            }
            if (result.LastIndexOf(",") == result.Length - 1) result = result.Remove(result.Length - 1);
            result += "]}";
            searcher.Close();
            HighLightResult(term, ref result);
            return result;
        }

        /// <summary>
        /// 传入关键词与搜索类型，可以返回此搜索类型的结果总数
        /// </summary>
        /// <param name="term">关键词</param>
        /// <param name="category">搜索类型，单个类型包括person、group、activity、posts、other、all。多个搜索类型用逗号隔开</param>
        /// <param name="language">语言编号</param>
        /// <returns>返回为json格式数据，建议格式为{result:true,data:{person:1,group:2}}</returns>
        public string GetSearchCount(string term, string category, string language)
        {
            BooleanQuery boolQuery = null;

            //默认搜索索引
            IndexSearcher searcher = GetDefaultIndexSearcher(language);
            //查询
            Query searchQuery = GetSearchQuery(term);

            string[] categorys = category.Split(',');

            string result = "{\"result\":true,\"data\":{";
            foreach (string item in categorys)
            {
                boolQuery = new BooleanQuery();
                boolQuery.Add(searchQuery, BooleanClause.Occur.MUST);
                //构造查询条件
                ConceiveCondition(boolQuery, item);
                var genreQueryFilter = new QueryWrapperFilter(boolQuery);
                //获取命中的记录数
                int resultCont = GetTotalsHit(searcher, genreQueryFilter);
                result += "\"" + item + "\":" + resultCont + ",";
            }
            //移除尾部逗号
            result = result.EndsWith(",") ? result.TrimEnd(',') : result;
            result += "}}";
            searcher.Close();
            return result;
        }

        private int GetTotalsHit(IndexSearcher searcher, Filter genreQueryFilter)
        {

            BitArray genreBitArray = genreQueryFilter.Bits(searcher.GetIndexReader());//用次函数因为此函数查询速度回快点
            return GetCardinality(genreBitArray);

            //DocIdSetIterator termIterator = genreQueryFilter.GetDocIdSet(searcher.GetIndexReader()).Iterator();
            //var productsDISI = new OpenBitSetDISI(termIterator, 25000);
            //var total = productsDISI.Cardinality();
            //return Convert.ToInt32(total);
        }

        private Query GetSearchQuery(string term)
        {
            List<string> strList = new List<string>();//构造需要索引的字段
            ReadConfigToList(strList, null);
            strList = strList.Distinct().ToList();
            //声明BooleanClause.Occur[]数组,它表示多个条件之间的关系,与strList相对应
            //BooleanClause.Occur.MUST表示and,BooleanClause.Occur.MUST_NOT表示not,BooleanClause.Occur.SHOULD表示or. 
            BooleanClause.Occur[] occurArr = new BooleanClause.Occur[strList.Count];
            for (int i = 0; i < occurArr.Length; i++)
                occurArr[i] = BooleanClause.Occur.SHOULD;

            Query searchQuery = MultiFieldQueryParser.Parse(Lucene.Net.Util.Version.LUCENE_29,
                   term, strList.ToArray(), occurArr, new PanGuAnalyzer());
            return searchQuery;
        }

        private IndexSearcher GetDefaultIndexSearcher(string language)
        {
            System.IO.DirectoryInfo dirInfo = new System.IO.DirectoryInfo(m_DicRootPath + "/" + language);
            Directory dir = FSDirectory.Open(dirInfo);
            IndexSearcher searcher = new IndexSearcher(dir, true);
            dir.Close();
            return searcher;
        }

        private void ConceiveCondition(BooleanQuery boolQuery, string categoryTerm)
        {
            if (string.IsNullOrEmpty(categoryTerm) || categoryTerm.Trim() == "") return;
            categoryTerm = categoryTerm.ToLower().Trim();

            string[] categorys = new string[] { "person", "group", "activity", "posts" };

            //传进来的参数,可能是数组
            string[] categorys2 = categoryTerm.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            for (int i = 0; i < categorys2.Length; i++)
            {
                //如果有查询全部 则不需要条件 直接返回
                if ("all" == categorys2[i].Trim()) return;
                //不是已知类型就返回
                if (!categorys.Contains(categorys2[i].Trim()) && categorys2[i].Trim() != "other") return;
            }

            if (categorys2.Length == 1 && "other" != categoryTerm)
            {
                var genreQuery = new TermQuery(new Term("tableCategory", categoryTerm));
                boolQuery.Add(genreQuery, BooleanClause.Occur.MUST);
            }
            else
            {
                foreach (string item in categorys)
                {
                    if (!categorys2.Contains(item))
                    {
                        var genreQuery = new QueryParser(Lucene.Net.Util.Version.LUCENE_29, "tableCategory", new PanGuAnalyzer()).Parse(item);

                        boolQuery.Add(genreQuery, BooleanClause.Occur.MUST_NOT);
                    }
                }
            }
        }


        private string BuildResult(ref string result, Document hitDoc)
        {
            IList fieldArr = hitDoc.GetFields();

            result += "{";
            foreach (Field item in fieldArr)
            {
                result += "\"" + item.Name() + "\":\"" + item.StringValue() + "\",";
            }
            if (result.LastIndexOf(",") == result.Length - 1) result = result.Remove(result.Length - 1);
            result += "},";
            return result;
        }

        private void ReadConfigToList(List<string> strList, List<string> otherTerm)
        {
            List<SQLTable> tableColl = CommonHelper.GetSQLConfigList("SQLIndexingConfig.xml");
            for (int k = 0; k < tableColl.Count; k++)
            {
                string[] strArr = tableColl[k].indexColumn.Split(new char[] { ',' });
                strList.AddRange(strArr);

                if (otherTerm != null)
                {
                    string tableCategory = tableColl[k].tableCategory.ToLower();
                    if (tableCategory != "person" && tableCategory != "group" && tableCategory != "activity" && tableCategory != "posts")
                    {
                        otherTerm.Add(tableColl[k].tableCategory);
                    }
                }
            }
        }

        public int GetCardinality(BitArray bitArray)
        {
            var _bitsSetArray256 = new byte[] { 0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8 };
            var array = (uint[])bitArray.GetType().GetField("m_array", BindingFlags.NonPublic | BindingFlags.Instance).GetValue(bitArray);
            int count = 0;

            for (int index = 0; index < array.Length; index++)
                count += _bitsSetArray256[array[index] & 0xFF] + _bitsSetArray256[(array[index] >> 8) & 0xFF] + _bitsSetArray256[(array[index] >> 16) & 0xFF] + _bitsSetArray256[(array[index] >> 24) & 0xFF];

            return count;
        }

        private string HighLightResult(string keywords, ref string result)
        {
            PanGu.HighLight.SimpleHTMLFormatter simpleHTMLFormatter =
                 new PanGu.HighLight.SimpleHTMLFormatter("<font color='red'>", "</font>");

            PanGu.HighLight.Highlighter highlighter =
                new PanGu.HighLight.Highlighter(simpleHTMLFormatter,
                new Segment());

            highlighter.FragmentSize = 50000;
            result = highlighter.GetBestFragment(keywords, result);
            if (result == "") result = "{\"result\":true,\"total\":0,\"data\":[]}";
            return result;
        }

        public string ReplaceChar(string strKeyWord)
        {
            strKeyWord = strKeyWord.Replace(@"\", @"\\");
            string strFilter = ":*?~!@^-+'\"\\{}[]()";
            char[] arrFilterChar = strFilter.ToCharArray();
            foreach (char c in arrFilterChar)
            {
                strKeyWord = strKeyWord.Replace("" + c, @"\" + c);
            }
            return strKeyWord;
        } 
    }
}
