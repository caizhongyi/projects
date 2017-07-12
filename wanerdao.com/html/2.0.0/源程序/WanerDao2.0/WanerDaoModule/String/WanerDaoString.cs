using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using WanerDao2.WanerDaoModule.RegexWapper;
using System.Drawing;
using Microsoft.VisualBasic;
using System.Collections;
using System.Web;

namespace WanerDao2.WanerDaoModule.String
{
    /// <summary>
    /// 描述：string类型扩展
    /// 创建者：金广亮
    /// 创建时间：2011-9-11
    /// </summary>
    public static class WanerDaoString
    {
        #region String类型扩展
        /// <summary>
        /// 描述：清除给定字符串中的回车及换行符
        /// 创建者：金广亮
        /// 创建时间：2011-9-11
        /// </summary>
        /// <param name="str">要清除的字符串</param>
        /// <returns>清除后返回的字符串</returns>
        public static string ClearBR(this string str)
        {
            Match m = null;

            for (m = WanerDaoRegex.GetRegexBr().Match(str); m.Success; m = m.NextMatch())
            {
                str = str.Replace(m.Groups[0].ToString(), "");
            }
            return str;
        }

        /// <summary>
        /// 解码 特效符号
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string DescapeSpecialchar(this string str)
        {
            return str.Replace(":apos:", "\'").Replace(":quot:", "\"").Replace(":macr:", "-").Replace(":equal:", "=").Replace(":frasl:", "/")
                .Replace(":piv:", "?").Replace(":under:", "_").Replace(":sdot:", ".");
        }

        /// <summary>
        /// 编码 特效符号
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string EscapeSpecialchar(this string str)
        {
            return str.Replace("'", ":apos:").Replace("\"", ":quot:").Replace("-", ":macr:").Replace("=", ":equal:").Replace("/", ":frasl:")
                .Replace("?", ":piv:").Replace("_", ":under:").Replace(".",":sdot:");
        }

        /// <summary>
        /// 描述：返回字符串真实长度, 1个汉字长度为2
        /// 创建者：金广亮
        /// 创建时间：2011-9-11
        /// </summary>
        /// <returns>字符长度</returns>
        public static int GetStringLength(this string str)
        {
            return Encoding.Default.GetBytes(str).Length;
        }

        /// <summary>
        /// 删除字符串尾部的回车/换行/空格
        /// 创建者：金广亮
        /// 创建时间：2011-9-11
        /// </summary>
        /// <param name="str">源字符串</param>
        /// <returns>删除后的字符串</returns>
        public static string RTrim(this string str)
        {
            for (int i = str.Length-1; i >= 0; i--)
            {
                if (str[i].Equals(" ") || str[i].Equals("\r") || str[i].Equals("\n"))
                {
                    str.Remove(i, 1);
                }
            }
            return str;
        }

        /// <summary>
        /// 描述：Json特符字符过滤，参见http://www.json.org/
        /// 创建者：金广亮
        /// 创建时间：2011-9-19
        /// </summary>
        /// <param name="sourceStr">要过滤的源字符串</param>
        /// <returns>返回过滤的字符串</returns>
        public static string JsonCharFilter(this string sourceStr)
        {
            sourceStr = sourceStr.Replace("\\", "\\\\");
            sourceStr = sourceStr.Replace("\b", "\\\b");
            sourceStr = sourceStr.Replace("\t", "\\\t");
            sourceStr = sourceStr.Replace("\n", "\\\n");
            sourceStr = sourceStr.Replace("\n", "\\\n");
            sourceStr = sourceStr.Replace("\f", "\\\f");
            sourceStr = sourceStr.Replace("\r", "\\\r");
            return sourceStr.Replace("\"", "\\\"");
        }

        /// <summary>
        /// 描述：清除UBB标签
        /// 创建者：金广亮
        /// 创建时间：2011-9-19
        /// </summary>
        /// <param name="sDetail">待过滤字符串</param>
        /// <returns>过滤后的字符串</returns>
        public static string ClearUBB(this string sDetail)
        {
            return Regex.Replace(sDetail, @"\[[^\]]*?\]", string.Empty, RegexOptions.IgnoreCase);
        }

        /// <summary>
        /// 描述：将全角数字转换为数字
        /// 创建者：金广亮
        /// 创建时间：2011-9-19
        /// </summary>
        /// <param name="SBCCase">源全角数字字符串</param>
        /// <returns>数字字符串</returns>
        public static string SBCCaseToNumberic(this string SBCCase)
        {
            char[] c = SBCCase.ToCharArray();
            for (int i = 0; i < c.Length; i++)
            {
                byte[] b = System.Text.Encoding.Unicode.GetBytes(c, i, 1);
                if (b.Length == 2)
                {
                    if (b[1] == 255)
                    {
                        b[0] = (byte)(b[0] + 32);
                        b[1] = 0;
                        c[i] = System.Text.Encoding.Unicode.GetChars(b)[0];
                    }
                }
            }
            return new string(c);
        }

        /// <summary>
        /// 描述：将字符串转换为Color
        /// 创建者：金广亮
        /// 创建时间：2011-9-19
        /// </summary>
        /// <param name="color">源颜色字符串</param>
        /// <returns>对应颜色</returns>
        public static Color ToColor(this string color)
        {
            int red, green, blue = 0;
            char[] rgb;
            color = color.TrimStart('#');
            color = Regex.Replace(color.ToLower(), "[g-zG-Z]", "");
            switch (color.Length)
            {
                case 3:
                    rgb = color.ToCharArray();
                    red = Convert.ToInt32(rgb[0].ToString() + rgb[0].ToString(), 16);
                    green = Convert.ToInt32(rgb[1].ToString() + rgb[1].ToString(), 16);
                    blue = Convert.ToInt32(rgb[2].ToString() + rgb[2].ToString(), 16);
                    return Color.FromArgb(red, green, blue);
                case 6:
                    rgb = color.ToCharArray();
                    red = Convert.ToInt32(rgb[0].ToString() + rgb[1].ToString(), 16);
                    green = Convert.ToInt32(rgb[2].ToString() + rgb[3].ToString(), 16);
                    blue = Convert.ToInt32(rgb[4].ToString() + rgb[5].ToString(), 16);
                    return Color.FromArgb(red, green, blue);
                default:
                    return Color.FromName(color);
            }
        }

        /// <summary>
        /// 描述：转换为简体中文
        /// </summary>
        /// <param name="str">待转换源字符串</param>
        /// <returns>返回简体中文</returns>
        public static string ToSChinese(this string str)
        {
            return Strings.StrConv(str, VbStrConv.SimplifiedChinese, 0);
        }

        /// <summary>
        /// 描述：转换为繁体中文
        /// </summary>
        /// <param name="str">待转换源字符串</param>
        /// <returns>返回繁体中文</returns>
        public static string ToTChinese(this string str)
        {
            return Strings.StrConv(str, VbStrConv.TraditionalChinese, 0);
        }
        #endregion        

        /// <summary>
        /// 描述：生成指定个数的HTML格式空格符号
        /// 创建者：金广亮
        /// 创建时间：2011-9-20
        /// </summary>
        /// <param name="spacesCount">指定个数</param>
        /// <returns>返回生成指定个数的HTML格式空格符号</returns>
        public static string GetSpacesString(int spacesCount)
        {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < spacesCount; i++)
            {
                sb.Append(" &nbsp;&nbsp;");
            }
            return sb.ToString();
        }

        /// <summary>
        /// 分割字符串
        /// </summary>
        public static string[] SplitString(string strContent, string strSplit)
        {
            if (!string.IsNullOrEmpty(strContent))
            {
                if (strContent.IndexOf(strSplit) < 0)
                    return new string[] { strContent };

                return Regex.Split(strContent, Regex.Escape(strSplit), RegexOptions.IgnoreCase);
            }
            else
                return new string[0] { };
        }

        /// <summary>
        /// 分割字符串
        /// </summary>
        /// <returns></returns>
        public static string[] SplitString(string strContent, string strSplit, int count)
        {
            string[] result = new string[count];
            string[] splited = SplitString(strContent, strSplit);

            for (int i = 0; i < count; i++)
            {
                if (i < splited.Length)
                    result[i] = splited[i];
                else
                    result[i] = string.Empty;
            }

            return result;
        }
        /// <summary>
        /// 字符串如果操过指定长度则将超出的部分用指定字符串代替
        /// </summary>
        /// <param name="p_SrcString">要检查的字符串</param>
        /// <param name="p_Length">指定长度</param>
        /// <param name="p_TailString">用于替换的字符串</param>
        /// <returns>截取后的字符串</returns>
        public static string GetSubString(string p_SrcString, int p_Length, string p_TailString)
        {
            return GetSubString(p_SrcString, 0, p_Length, p_TailString);
        }

        public static string GetUnicodeSubString(string str, int len, string p_TailString)
        {
            str = str.TrimEnd();
            string result = string.Empty;// 最终返回的结果
            int byteLen = System.Text.Encoding.Default.GetByteCount(str);// 单字节字符长度
            int charLen = str.Length;// 把字符平等对待时的字符串长度
            int byteCount = 0;// 记录读取进度
            int pos = 0;// 记录截取位置
            if (byteLen > len)
            {
                for (int i = 0; i < charLen; i++)
                {
                    if (Convert.ToInt32(str.ToCharArray()[i]) > 255)// 按中文字符计算加2
                        byteCount += 2;
                    else// 按英文字符计算加1
                        byteCount += 1;
                    if (byteCount > len)// 超出时只记下上一个有效位置
                    {
                        pos = i;
                        break;
                    }
                    else if (byteCount == len)// 记下当前位置
                    {
                        pos = i + 1;
                        break;
                    }
                }

                if (pos >= 0)
                    result = str.Substring(0, pos) + p_TailString;
            }
            else
                result = str;

            return result;
        }

        /// <summary>
        /// 取指定长度的字符串
        /// </summary>
        /// <param name="p_SrcString">要检查的字符串</param>
        /// <param name="p_StartIndex">起始位置</param>
        /// <param name="p_Length">指定长度</param>
        /// <param name="p_TailString">用于替换的字符串</param>
        /// <returns>截取后的字符串</returns>
        public static string GetSubString(string p_SrcString, int p_StartIndex, int p_Length, string p_TailString)
        {
            string myResult = p_SrcString;

            Byte[] bComments = Encoding.UTF8.GetBytes(p_SrcString);
            foreach (char c in Encoding.UTF8.GetChars(bComments))
            {    //当是日文或韩文时(注:中文的范围:\u4e00 - \u9fa5, 日文在\u0800 - \u4e00, 韩文为\xAC00-\xD7A3)
                if ((c > '\u0800' && c < '\u4e00') || (c > '\xAC00' && c < '\xD7A3'))
                {
                    //if (System.Text.RegularExpressions.Regex.IsMatch(p_SrcString, "[\u0800-\u4e00]+") || System.Text.RegularExpressions.Regex.IsMatch(p_SrcString, "[\xAC00-\xD7A3]+"))
                    //当截取的起始位置超出字段串长度时
                    if (p_StartIndex >= p_SrcString.Length)
                        return "";
                    else
                        return p_SrcString.Substring(p_StartIndex,
                                                       ((p_Length + p_StartIndex) > p_SrcString.Length) ? (p_SrcString.Length - p_StartIndex) : p_Length);
                }
            }

            if (p_Length >= 0)
            {
                byte[] bsSrcString = Encoding.Default.GetBytes(p_SrcString);

                //当字符串长度大于起始位置
                if (bsSrcString.Length > p_StartIndex)
                {
                    int p_EndIndex = bsSrcString.Length;

                    //当要截取的长度在字符串的有效长度范围内
                    if (bsSrcString.Length > (p_StartIndex + p_Length))
                    {
                        p_EndIndex = p_Length + p_StartIndex;
                    }
                    else
                    {   //当不在有效范围内时,只取到字符串的结尾

                        p_Length = bsSrcString.Length - p_StartIndex;
                        p_TailString = "";
                    }

                    int nRealLength = p_Length;
                    int[] anResultFlag = new int[p_Length];
                    byte[] bsResult = null;

                    int nFlag = 0;
                    for (int i = p_StartIndex; i < p_EndIndex; i++)
                    {
                        if (bsSrcString[i] > 127)
                        {
                            nFlag++;
                            if (nFlag == 3)
                                nFlag = 1;
                        }
                        else
                            nFlag = 0;

                        anResultFlag[i] = nFlag;
                    }

                    if ((bsSrcString[p_EndIndex - 1] > 127) && (anResultFlag[p_Length - 1] == 1))
                        nRealLength = p_Length + 1;

                    bsResult = new byte[nRealLength];

                    Array.Copy(bsSrcString, p_StartIndex, bsResult, 0, nRealLength);

                    myResult = Encoding.Default.GetString(bsResult);
                    myResult = myResult + p_TailString;
                }
            }

            return myResult;
        }
        public static string[] ParseArray(string source, params char[] splitchar)
        {
            return source.Split(splitchar);
        }

        /// <summary>
        /// 描述：把Dic数据类型转成hashtalbe
        /// </summary>
        /// <param name="parames">参数</param>
        /// <returns>hashtalbe方式参数</returns>
        public static Hashtable ParseHashtable(Dictionary<string, object> parames)
        {
            Hashtable ht = new Hashtable();
            if (parames.Count > 0)
            {
                foreach (string key in parames.Keys)
                {
                    ht.Add(key, parames[key]);
                }
            }
            return ht;
        }
        /// <summary>
        /// 描述：URL解码
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="data">传递参数</param>
        /// <returns>解码后的URL参数</returns>
        public static string UrlDecode(string data)
        {
            return HttpUtility.UrlDecode(data);
        }
        /// <summary>
        /// 描述：URL加密
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="data">传递参数</param>
        /// <returns>加密后的字符串</returns>
        public static string UrlEnCode(string data)
        {
            return HttpUtility.UrlEncode(data);
        }
        /// <summary>
        /// 描述：移除引用
        /// 作者：金广亮
        /// 时间：2011-9-24
        /// </summary>
        /// <param name="data">参数</param>
        /// <returns>替换引用</returns>
        public static string RemoveQuotation(string data)
        {
            //return data.Replace("\"", "").Replace("'", "").Trim();
            return data.Trim("\'\"".ToCharArray());
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
