using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace WanerDao2.WanerDaoModule.RegexWapper
{
    /// <summary>
    /// 描述：正则相关操作
    /// 创建者：金广亮
    /// 创建时间：2011-9-19
    /// </summary>
    public class WanerDaoRegex
    {
        public static string UrlPattern = @"(\w+)=(\w*[\d\/ \d\:,\-\w\'\?]*)";//@"(\w+)=(\w*)";
        public static string UrlArrayPattern = @"[\[(\d*)\]]*\[(\w+)\]=(\w*)";
        public static string UrlDecidePatten = @"\]*=(\w*)";
        public static string UrlDecideArrayPatten = @"\]=(\w*)&";
        public static string SqlParams = @"\?\w*";

        /// <summary>
        /// 获取SQL中的参数名称（不带问号）
        /// add by xubing
        /// </summary>
        /// <param name="strSql"></param>
        /// <returns></returns>
        public static string[] GetSqlParams(string strSql)
        {
            List<string> list=new List<string>();
            Regex reg = new Regex(WanerDaoRegex.SqlParams, RegexOptions.IgnoreCase);
            MatchCollection matches = reg.Matches(strSql);
            foreach (Match mth in matches)
            {
                string value=mth.Value;
                if (string.IsNullOrEmpty(value))
                {
                    continue;
                }
                value = value.Trim().Trim('?');
                if (!string.IsNullOrEmpty(value))
                {
                    list.Add(value);
                }
            }
            if (list == null || list.Count < 1)
            {
                return null;
            }
            return list.Distinct().ToArray();

        }
        /// <summary>
        /// 描述：判断是否
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public static bool DecideUrlParam(string param)
        {
            bool flg = false;
            Regex reg = new Regex(WanerDaoRegex.UrlDecidePatten, RegexOptions.IgnoreCase);
            MatchCollection matches = reg.Matches(param);
            if (matches.Count > 0)
            {
                flg = true;
            }
            return flg;
        }
        public static bool DecideArrayParam(string param)
        {
            bool flg = false;
            Regex reg = new Regex(WanerDaoRegex.UrlDecideArrayPatten, RegexOptions.IgnoreCase);
            MatchCollection matches = reg.Matches(param);
            if (matches.Count > 0)
            {
                flg = true;
            }
            return flg;
        }
        /// <summary>
        /// 描述：回车换行正则类
        /// 创建者:金广亮
        /// 创建者：2011-9-19
        /// </summary>
        /// <returns>创建回车换行正则类</returns>
        public static Regex GetRegexBr()
        {
            return new Regex(@"(\r\n)", RegexOptions.IgnoreCase);
        }
        /// <summary>
        /// 检测是否有Sql危险字符
        /// </summary>
        /// <param name="str">要判断字符串</param>
        /// <returns>判断结果</returns>
        public static bool IsSafeSqlString(string str)
        {
            return !Regex.IsMatch(str, @"[-|;|,|\/|\(|\)|\[|\]|\}|\{|%|@|\*|!|\']");
        }

        /// <summary>
        /// 检测是否有危险的可能用于链接的字符串
        /// </summary>
        /// <param name="str">要判断字符串</param>
        /// <returns>判断结果</returns>
        public static bool IsSafeUserInfoString(string str)
        {
            return !Regex.IsMatch(str, @"^\s*$|^c:\\con\\con$|[%,\*" + "\"" + @"\s\t\<\>\&]|游客|^Guest");
        }

        /// <summary>
        /// 检测是否符合email格式
        /// </summary>
        /// <param name="strEmail">要判断的email字符串</param>
        /// <returns>判断结果</returns>
        public static bool IsValidEmail(string strEmail)
        {
            return Regex.IsMatch(strEmail, @"^[\w\.]+([-]\w+)*@[A-Za-z0-9-_]+[\.][A-Za-z0-9-_]");
        }

        public static bool IsValidDoEmail(string strEmail)
        {            
            return Regex.IsMatch(strEmail, @"^@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$");
        }

        /// <summary>
        /// 检测是否是正确的Url
        /// </summary>
        /// <param name="strUrl">要验证的Url</param>
        /// <returns>判断结果</returns>
        public static bool IsURL(string strUrl)
        {
            return Regex.IsMatch(strUrl, @"^(http|https)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{1,10}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&%\$#\=~_\-]+))*$");
        }

    }
}
