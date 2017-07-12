#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 计算器词存储类
* 作者：吴志斌   时间：2011/11/21 22:37:54 
* 文件名：WanerDaoPhraseStorage
* 版本：V1.0.0 
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

namespace WanerDao2.WanerDaoPlugInManager.Calculate.Phrase
{
    /// <summary>
    /// 词存储单元
    /// </summary>
    public class WanerDaoPhraseStorage : IDisposable
    {
        List<KeyValuePair<string, WanerDaoPhraseType>> _store = null;
        public WanerDaoPhraseStorage()
        {
            _store = new List<KeyValuePair<string, WanerDaoPhraseType>>();
        }

        /// <summary>
        /// 词的数量
        /// </summary>
        public int Length
        {
            get { return _store.Count; }
        }

        /// <summary>
        /// 清除存储的结果
        /// </summary>
        public void ClearResult()
        {
            _store.Clear();
        }

        /// <summary>
        /// 添加一个词和它对应的词类
        /// </summary>
        /// <param name="phrase">词</param>
        /// <param name="phraseType">词类</param>
        public void AddPhraseResult(string phrase, WanerDaoPhraseType phraseType)
        {
            _store.Add(new KeyValuePair<string, WanerDaoPhraseType>(phrase, phraseType));
        }

        /// <summary>
        /// 获得数字的浮点值
        /// </summary>
        /// <param name="index">索引</param>
        /// <returns></returns>
        public double GetNumberValue(int index)
        {
            string temp_str = _store[index].Key;
            if (temp_str[0] == '@')
                temp_str = temp_str.Replace('@', '-');//把'@'转换为负号
            return Convert.ToDouble(temp_str);
        }

        /// <summary>
        /// 输出分词结果
        /// </summary>
        public List<string> PhraseResult
        {
            get
            {
                List<string> temp = new List<string>();
                List<KeyValuePair<string, WanerDaoPhraseType>>.Enumerator e = _store.GetEnumerator();
                while (e.MoveNext())
                {
                    temp.Add(e.Current.Key);
                }
                return temp;
            }
        }

        /// <summary>
        /// 输出分词类型结果
        /// </summary>
        public List<WanerDaoPhraseType> PhraseTypeResult
        {
            get
            {
                List<WanerDaoPhraseType> temp = new List<WanerDaoPhraseType>();
                List<KeyValuePair<string, WanerDaoPhraseType>>.Enumerator e = _store.GetEnumerator();
                while (e.MoveNext())
                {
                    temp.Add(e.Current.Value);
                }
                return temp;
            }
        }

        public KeyValuePair<string, WanerDaoPhraseType> this[int index]
        {
            get { return _store[index]; }
            set { _store[index] = value; }
        }

        #region IDisposable Members
        public void Dispose()
        {
            _store.Clear();
        }
        #endregion
    }
}
