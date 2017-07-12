#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 计算器语法分析类
* 作者：吴志斌   时间：2011/11/20 22:37:54 
* 文件名：WanerDaoPhraseAnalyzer
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
using WanerDao2.WanerDaoPlugInManager.Calculate.Exceptions;

namespace WanerDao2.WanerDaoPlugInManager.Calculate.Phrase
{
    public class WanerDaoPhraseAnalyzer
    {

        private static WanerDaoDFAState _prestate;			//DFA的前一个状态
        private static char[] _chArray = null;		//句子变量的字符串形式

        private static void SavePhrase(WanerDaoPhraseStorage _ps, int startpos, int endpos, WanerDaoDFAState prestate, WanerDaoDFAState curstate, string _sentence)
        {
            string temp = null;
            //处理'@'
            if (startpos == endpos && _chArray[startpos] == '@')
            {
                _ps.AddPhraseResult("@", WanerDaoPhraseType.negative);
                return;
            }
            //处理其他词元
            if (endpos >= 0 && startpos >= 0 && endpos >= startpos)
            {
                //trim()，以防止在startpos到endpos头尾出现空格
                temp = _sentence.Substring(startpos, endpos - startpos + 1).Trim().ToLower();
                if (curstate == WanerDaoDFAState.S17)
                    _ps.AddPhraseResult(temp, WanerDaoPhraseType.dataprovider);
                else if (curstate == WanerDaoDFAState.S18)
                    _ps.AddPhraseResult(temp, WanerDaoPhraseType.fieldname);
                else if (curstate == WanerDaoDFAState.S16)
                    _ps.AddPhraseResult(temp, WanerDaoPhraseType.variable);
                else
                    _ps.AddPhraseResult(temp, WanerDaoPhraseAnalyzer.StrToType(temp));
            }
        }

        public static WanerDaoPhraseType StrToType(string str)
        {
            switch (str)
            {
                case "sin": return WanerDaoPhraseType.sin;
                case "cos": return WanerDaoPhraseType.cos;
                case "ln": return WanerDaoPhraseType.ln;
                case "lg": return WanerDaoPhraseType.lg;
                case "log": return WanerDaoPhraseType.log;
                case "^": return WanerDaoPhraseType.pow;
                case "cbrt": return WanerDaoPhraseType.cbrt;
                case "sbrt": return WanerDaoPhraseType.sbrt;
                case "sinh": return WanerDaoPhraseType.sinh;
                case "cosh": return WanerDaoPhraseType.cosh;
                case "!": return WanerDaoPhraseType.fact;
                case "tg": return WanerDaoPhraseType.tan;
                case "ctg": return WanerDaoPhraseType.ctg;
                case "tanh": return WanerDaoPhraseType.tanh;
                case "ctgh": return WanerDaoPhraseType.ctgh;
                case "+": return WanerDaoPhraseType.plus;
                case "-": return WanerDaoPhraseType.minus;
                case "*": return WanerDaoPhraseType.mutiple;
                case "/": return WanerDaoPhraseType.divide;
                case "%": return WanerDaoPhraseType.mod;
                case "(": return WanerDaoPhraseType.leftbracket;
                case ")": return WanerDaoPhraseType.rightbracket;
                case "#": return WanerDaoPhraseType.sharp;
                case "ans": return WanerDaoPhraseType.ans;
                case "sto": return WanerDaoPhraseType.sto;
                case "clr": return WanerDaoPhraseType.clr;
                case "e": return WanerDaoPhraseType.e;
                case "pi": return WanerDaoPhraseType.pi;
                case "@": return WanerDaoPhraseType.negative;
                default:
                    double a;
                    bool isnum = double.TryParse(str, out a);
                    if (isnum)
                        return WanerDaoPhraseType.number;

                    throw new WanerDaoPhraseException(string.Format("不可识别的符号：{0}", str));
            }
        }
        public static string TypeToStr(WanerDaoPhraseType type)
        {
            switch (type)
            {
                case WanerDaoPhraseType.sin:
                case WanerDaoPhraseType.cos:
                case WanerDaoPhraseType.ln:
                case WanerDaoPhraseType.lg:
                case WanerDaoPhraseType.log:
                case WanerDaoPhraseType.cbrt:
                case WanerDaoPhraseType.sbrt:
                case WanerDaoPhraseType.sinh:
                case WanerDaoPhraseType.cosh:
                case WanerDaoPhraseType.tan:
                case WanerDaoPhraseType.ctg:
                case WanerDaoPhraseType.tanh:
                case WanerDaoPhraseType.ctgh:
                case WanerDaoPhraseType.ans:
                case WanerDaoPhraseType.sto:
                case WanerDaoPhraseType.clr:
                case WanerDaoPhraseType.e:
                case WanerDaoPhraseType.pi:
                    return type.ToString();

                case WanerDaoPhraseType.pow: return "^";
                case WanerDaoPhraseType.fact: return "!";
                case WanerDaoPhraseType.plus: return "+";
                case WanerDaoPhraseType.minus: return "-";
                case WanerDaoPhraseType.mutiple: return "*";
                case WanerDaoPhraseType.divide: return "/";
                case WanerDaoPhraseType.mod: return "%";
                case WanerDaoPhraseType.leftbracket: return "(";
                case WanerDaoPhraseType.rightbracket: return ")";
                case WanerDaoPhraseType.sharp: return "#";
                case WanerDaoPhraseType.negative: return "- (negative)";
                default:
                    return null;
            }
        }
        /// <summary>
        /// 字符串类型检查
        /// </summary>
        /// <param name="startpos">字符串开始位置</param>
        /// <param name="endpos">字符串结束位置</param>
        /// <returns>字符串是否匹配规定范围内容的类型</returns>
        private static bool CheckString(int startpos, int endpos, string _sentence)
        {
            //trim()，以防止在startpos到endpos头尾出现空格
            string temp = _sentence.Substring(startpos, endpos - startpos + 1).Trim().ToLower();
            int len = temp.Length;	//这里的temp.length不一定等于endpos-startpos+1
            if (len == 1)
            {
                switch (temp)
                {
                    case "e":
                        //BUGFIX:处理ex
                        //向后看一个字符，如果为x，就认为是ex
                        if (_chArray.Length > endpos + 1 && _chArray[endpos + 1] == 'x')
                        {
                            return false;
                        }
                        return true;
                }
            }
            else if (len == 2)
            {
                switch (temp)
                {
                    case "ln":
                    case "lg":
                    case "tg":
                    case "pi":
                        return true;
                }
            }
            else if (len == 3)
            {
                switch (temp)
                {
                    case "cos":
                    case "sin":
                    case "ctg":
                    case "ans":
                    case "clr":
                    case "sto":
                    case "log":
                        return true;
                }
            }
            else if (len == 4)
            {
                switch (temp)
                {
                    case "cosh":
                    case "sinh":
                    case "tanh":
                    case "ctgh":
                    case "sbrt":
                    case "cbrt":
                        return true;
                }
            }
            return false;
        }
        /// <summary>
        /// run phrase analysis
        /// </summary>
        public static void Analyze(string _sentence, WanerDaoPhraseStorage _ps)
        {
            _chArray = _sentence.ToLower().ToCharArray();

            int i = 0;
            int startpos = 0, endpos = 0;
            //设置初态
            _prestate = WanerDaoDFAState.S0;
            while (i < _chArray.Length)
            {
                if (Char.IsLetter(_chArray[i]))
                {
                    if (_prestate == WanerDaoDFAState.S0)
                    {
                        //初始化状态为字符串状态
                        _prestate = WanerDaoDFAState.S3;
                    }
                    else if (_prestate == WanerDaoDFAState.S3)  //前一次状态是字符串状态
                    {
                        endpos = i - 1;

                        //判断字符串是否在预先定义的列表中
                        if (CheckString(startpos, endpos, _sentence) == true)
                        {
                            SavePhrase(_ps, startpos, endpos, _prestate, WanerDaoDFAState.SX, _sentence);
                            startpos = i;
                        }
                    }
                    else if (_prestate == WanerDaoDFAState.S16 || _prestate == WanerDaoDFAState.S17 || _prestate == WanerDaoDFAState.S18)
                    {
                        //do nothing
                    }
                    else
                    {
                        //处理前一个字符串
                        endpos = i - 1;

                        SavePhrase(_ps, startpos, endpos, _prestate, WanerDaoDFAState.S3, _sentence);

                        _prestate = WanerDaoDFAState.S3;

                        startpos = i;
                    }
                }
                else if (Char.IsDigit(_chArray[i]))
                {
                    if (_prestate == WanerDaoDFAState.S0)
                    {
                        //初始化状态
                        _prestate = WanerDaoDFAState.S1;
                        startpos = i;
                    }
                    else if (_prestate == WanerDaoDFAState.S1)
                    {

                    }
                    else if (_prestate == WanerDaoDFAState.S3)
                    {
                        endpos = i - 1;

                        if (CheckString(startpos, endpos, _sentence) == true)
                        {
                            SavePhrase(_ps, startpos, endpos, _prestate, WanerDaoDFAState.S1, _sentence);
                            _prestate = WanerDaoDFAState.S1;
                            startpos = i;
                        }
                    }
                    else if (_prestate == WanerDaoDFAState.S2)
                    {
                        _prestate = WanerDaoDFAState.S2;
                    }
                    else if (_prestate == WanerDaoDFAState.S17 || _prestate == WanerDaoDFAState.S18 || _prestate == WanerDaoDFAState.S16)
                    {
                        //varialbe/dataprovider state, do nothing
                    }
                    else
                    {
                        //处理前一个字符
                        endpos = i - 1;

                        SavePhrase(_ps, startpos, endpos, _prestate, WanerDaoDFAState.S1, _sentence);

                        //由非数字变为整数串
                        _prestate = WanerDaoDFAState.S1;

                        startpos = i;
                    }
                }
                else if (_chArray[i] == '.')
                {
                    //小数点
                    if (_prestate == WanerDaoDFAState.S1 || _prestate == WanerDaoDFAState.S0)
                        _prestate = WanerDaoDFAState.S2;	//由整数串或初态变为浮点数串
                    else
                    {	//未知态
                        // 需要讨论: 是否保存前一个词
                        _prestate = WanerDaoDFAState.SX;
                    }
                }
                else if (Char.IsWhiteSpace(_chArray[i]))
                {
                    //跳过空格
                }
                else if (_chArray[i] == '_')
                {
                    if (_prestate != WanerDaoDFAState.S16 && _prestate != WanerDaoDFAState.S17 && _prestate != WanerDaoDFAState.S18)
                    {
                        throw new WanerDaoPhraseException("'_' 附近有不正确的语法");
                    }
                }
                else if (_chArray[i] == '[')
                {
                    if (_prestate != WanerDaoDFAState.S0)
                    {
                        //处理前一个词法
                        endpos = i - 1;
                        SavePhrase(_ps, startpos, endpos, _prestate, WanerDaoDFAState.SX, _sentence);
                    }
                    startpos = i + 1;
                    _prestate = WanerDaoDFAState.S16;   //变为变量状态
                }
                else if (_chArray[i] == ']')
                {
                    //处理前一个词法
                    endpos = i - 1;

                    if (_prestate == WanerDaoDFAState.S17)  
                    {
                        SavePhrase(_ps, startpos, endpos, _prestate, WanerDaoDFAState.S18, _sentence);
                        _prestate = WanerDaoDFAState.S18;
                    }
                    else if (_prestate == WanerDaoDFAState.S16)
                    {
                        SavePhrase(_ps, startpos, endpos, _prestate, WanerDaoDFAState.S16, _sentence);
                    }
                    else
                    {
                        throw new WanerDaoPhraseException("']' 附近有不正确的语法");
                    }
                    startpos = i + 1;
                }
                else if (_chArray[i] == ':')
                {
                    if (_prestate == WanerDaoDFAState.S16)  //变量状态
                    {
                        endpos = i - 1;
                        SavePhrase(_ps, startpos, endpos, _prestate, WanerDaoDFAState.S17, _sentence);
                        _prestate = WanerDaoDFAState.S17;
                        startpos = i + 1;
                    }
                    else
                    {
                        throw new WanerDaoPhraseException("':' 附近有不正确的语法");
                    }
                }
                else if (_chArray[i] == '+' || _chArray[i] == '-' || _chArray[i] == '*' || _chArray[i] == '/' || _chArray[i] == '^'
                    || _chArray[i] == '%' || _chArray[i] == '(' || _chArray[i] == ')' || _chArray[i] == '!' || _chArray[i] == '#'
                    || _chArray[i] == '@' || _chArray[i] == '=')
                {
                    if (_prestate != WanerDaoDFAState.S0)
                    {
                        endpos = i - 1;
                        SavePhrase(_ps, startpos, endpos, _prestate, WanerDaoDFAState.SX, _sentence);
                    }
                    if (_chArray[i] == '-')
                    {
                        if (_ps.PhraseTypeResult.Count > 0)
                        {
                            WanerDaoPhraseType prept = _ps.PhraseTypeResult[_ps.PhraseTypeResult.Count - 1];
                            if (prept != WanerDaoPhraseType.variable && prept != WanerDaoPhraseType.clr && prept != WanerDaoPhraseType.sto && prept != WanerDaoPhraseType.rightbracket && prept != WanerDaoPhraseType.number)
                            {
                                _chArray[i] = '@';
                            }
                        }
                        else
                        {
                            _chArray[i] = '@';
                        }
                    }
                    if (_chArray[i] == '+')
                        _prestate = WanerDaoDFAState.S4;
                    else if (_chArray[i] == '-')
                        _prestate = WanerDaoDFAState.S5;
                    else if (_chArray[i] == '*')
                        _prestate = WanerDaoDFAState.S6;
                    else if (_chArray[i] == '/')
                        _prestate = WanerDaoDFAState.S7;
                    else if (_chArray[i] == '=')    
                        _prestate = WanerDaoDFAState.S11;
                    else if (_chArray[i] == '%')
                        _prestate = WanerDaoDFAState.S8;
                    else if (_chArray[i] == '^')
                        _prestate = WanerDaoDFAState.S10;
                    else if (_chArray[i] == '(')
                        _prestate = WanerDaoDFAState.S12;
                    else if (_chArray[i] == ')')
                        _prestate = WanerDaoDFAState.S13;
                    else if (_chArray[i] == '!')
                        _prestate = WanerDaoDFAState.S9;
                    else if (_chArray[i] == '#')
                        _prestate = WanerDaoDFAState.S14;
                    else if (_chArray[i] == '@')
                        _prestate = WanerDaoDFAState.S15;

                    startpos = i;
                }
                else
                {
                    throw new WanerDaoPhraseException(string.Format("未知字符: {0}", _chArray[i]));
                }
                i++;
            }
        }
    }
}
