using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Xml;
using System.Collections;
using WanerDao2.WanerDaoModule.Config;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.String;
using WanerDao2.WanerDaoModule.RegexWapper;
using System.Text.RegularExpressions;

namespace WanerDao2.WanerDaoComponent
{
    /// <summary>
    /// 描述:打印类
    /// 作者：xux
    /// 时间：2012-2-20
    /// </summary>
    public class WanerDaoPrint
    {
        public static string getPrintTemplete(String param, DataSet DS)
        {
            
            param = WanerDaoString.UrlDecode(param);
            List<object> printfileString = WanerDaoFilterReader.GetInValidList("printfile");
            List<object> printdatafileString = WanerDaoFilterReader.GetInValidList("printdatafile");
            List<object> printdataString = WanerDaoFilterReader.GetInValidList("printdata");
            string pattern = string.Empty;
            string printfile = string.Empty;
            string printdatafile = string.Empty;
            List<string> printdata = new List<string>();
            Dictionary<string, object> dic = new Dictionary<string, object>();
            if (WanerDaoRegex.DecideArrayParam(param))
                pattern = WanerDaoRegex.UrlArrayPattern;
            else
                pattern = WanerDaoRegex.UrlPattern;

            if (!string.IsNullOrEmpty(pattern))
            {
                Regex reg = new Regex(pattern, RegexOptions.IgnoreCase);
                MatchCollection matches = reg.Matches(param);

                foreach (Match match in matches)
                {
                    GroupCollection gc = match.Groups;
                 
                    if (printfileString.Contains(gc[1].Value))
                    {
                        printfile = gc[2].Value;
                    }else if (printdatafileString.Contains(gc[1].Value)){
                        printdatafile = gc[2].Value;
                    }
                    else if (gc[1].Value.IndexOf(printdataString[0].ToString())!=-1)
                    {
                        string[] filterArray = WanerDaoString.ParseArray(gc[1].Value, '_');
                        printdata.Add(filterArray[1] + "-" + gc[2].Value);
                    }
                    else {
                         string v= gc[2].Value.Replace("fuzque", "%");
                        dic.Add(gc[1].Value, v);
                    }
                   
                }
            }
            if (DS ==null)
            {
                DS = new DataSet();
                foreach (string pd in printdata)
                {
                    string[] filterArray = WanerDaoString.ParseArray(pd, '-');
                    DataTable DAT = DbHelperFactory.SingleInstance().GetDataTableBasedOnSql(printdatafile, filterArray[1], dic);
                    DAT.TableName = filterArray[0];
                    DS.Merge(DAT);
                }
            }


            XmlNodeList xnl = WanerDaoFilterReader.GetPrintTemplete(printfile);
             string reHtml = "";
            foreach (XmlNode xn in xnl)
            {
 
                 string k =  xn.Name;
               string v = xn.InnerText;
               bool hasData = false;
               if (DS != null)
               {
                   foreach (DataTable DT in DS.Tables)
                   {
                       if (k.ToLower() == DT.TableName.ToLower())
                       {
                           hasData = true;
                           foreach (DataRow DR in DT.Rows)
                           {
                               string tempV = v;
                               for(int i=0;i<DR.Table.Columns.Count;i++){
                                   DataColumn DC = DR.Table.Columns[i];
                                   tempV = tempV.Replace("$WD" + DC.ColumnName + "$WD", DR[i].ToString());
                               }
                             
                               reHtml += tempV;
                           }
                       }
                   }
               }
               if (!hasData) {
                   reHtml += v;
               }
            }

            return reHtml;
        }

        /// <summary>
        /// 描述:解析
        /// </summary>
        /// <param name="text"></param>
        /// <param name="args"></param>
        /// <returns></returns>
        public static Dictionary<string, object> PaserPattern(string text, List<object> args)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            string pattern = string.Empty;
            if (WanerDaoRegex.DecideArrayParam(text))
                pattern = WanerDaoRegex.UrlArrayPattern;
            else
                pattern = WanerDaoRegex.UrlPattern;
            if (!string.IsNullOrEmpty(pattern))
            {
                Regex reg = new Regex(pattern, RegexOptions.IgnoreCase);
                MatchCollection matches = reg.Matches(text);
                int len = args.Count;
                foreach (Match match in matches)
                {
                    GroupCollection gc = match.Groups;
                    if (len > 0 && gc.Count > 0)
                    {
                        if (!args.Contains(gc[1].Value))
                        {
                            dic.Add(gc[1].Value, gc[2].Value);
                        }
                    }
                    if (len == 0 && gc.Count > 0)
                    {
                        if (!args.Contains(gc[1].Value))
                        {
                            dic.Add(gc[1].Value, gc[2].Value);
                        }
                    }
                }
            }
            return dic;
        }

       
    }
}
