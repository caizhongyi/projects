#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 计算器功能实现类
* 作者：吴志斌   时间：2011/11/18 22:37:54 
* 文件名：WanerDaoCalculationEngine
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
using System.Collections;
using WanerDao2.WanerDaoPlugInManager.Calculate.Phrase;
using WanerDao2.WanerDaoPlugInManager.Calculate.Syntax;
using WanerDao2.WanerDaoPlugInManager.Calculate.Exceptions;

namespace WanerDao2.WanerDaoPlugInManager.Calculate
{
    public class WanerDaoCalculationEngine : IDisposable, IWanerDaoCalculationEngine
    {
        Stack _optr = null;	//Operator Stack
        Stack _opnd = null;	//Number Stack
        WanerDaoCalculationContext _context = null;

        public WanerDaoCalculationEngine(WanerDaoCalculationContext context)
        {
            _optr = new Stack();
            _opnd = new Stack();
            _context = context;
            if (context.Phrases.PhraseTypeResult[context.Phrases.Length - 1] != WanerDaoPhraseType.sharp)
                context.Phrases.AddPhraseResult("#", WanerDaoPhraseType.sharp);
        }
        public void Dispose()
        {
            if (_optr != null)
                _optr.Clear();
            if (_opnd != null)
                _opnd.Clear();

        }
        /// <summary>
        /// Factorial
        /// </summary>
        /// <param name="i">Floor</param>
        /// <returns></returns>
        private double Factorial(double i)
        {
            return ((i <= 1) ? 1 : (i * Factorial(i - 1)));
        }
        /// <summary>
        /// Calculate by phrase type
        /// </summary>
        /// <param name="a">Operator 1</param>
        /// <param name="b">Operator 2</param>
        /// <param name="pt">Phrase Type</param>
        /// <returns>Result</returns>
        private double Calculate(WanerDaoPhraseType pt)
        {
            //get the operators
            double a, b;
            a = b = 0.0;
            WanerDaoOperandType ot = WanerDaoOperator.OperandCount(pt);
            switch (ot)
            {
                case WanerDaoOperandType.O2:	//双目运算
                    if (_opnd.Count < 2)
                        throw new WanerDaoSyntaxException("没有足够的操作数来完成计算 " + pt.ToString());
                    b = (double)_opnd.Pop();
                    a = (double)_opnd.Pop();
                    break;
                case WanerDaoOperandType.O1:	//单目运算
                    if (_opnd.Count < 1)
                        throw new WanerDaoSyntaxException("没有足够的操作数来完成计算 " + pt.ToString());

                    a = (double)_opnd.Pop();
                    b = 0.0;
                    break;
                case WanerDaoOperandType.O0:	//零目运算
                    return 0.0;
            }
            //Let's calculate!!!
            double tmp = 0.0;
            switch (pt)
            {
                //四则运算
                case WanerDaoPhraseType.plus:
                    return a + b;
                case WanerDaoPhraseType.minus:
                    return a - b;
                case WanerDaoPhraseType.mutiple:
                    return a * b;
                case WanerDaoPhraseType.divide:
                    return a / b;
                case WanerDaoPhraseType.mod:
                    return a % b;
                case WanerDaoPhraseType.negative:
                    return 0.0 - a;
                case WanerDaoPhraseType.fact:
                    return Factorial(a);
                //三角函数
                case WanerDaoPhraseType.sin:
                    if (_context.Mode == WanerDaoCalculationMode.Degree)
                    {
                        a = WanerDaoCalculationUtility.DegreesToRadians(a);
                    }
                    return Math.Sin(a);
                case WanerDaoPhraseType.cos:
                    if (_context.Mode == WanerDaoCalculationMode.Degree)
                    {
                        a = WanerDaoCalculationUtility.DegreesToRadians(a);
                    }
                    return Math.Cos(a);
                case WanerDaoPhraseType.tan:
                    if (_context.Mode == WanerDaoCalculationMode.Degree)
                    {
                        a = WanerDaoCalculationUtility.DegreesToRadians(a);
                    }
                    return Math.Tan(a);
                case WanerDaoPhraseType.ctg:
                    if (_context.Mode == WanerDaoCalculationMode.Degree)
                    {
                        a = WanerDaoCalculationUtility.DegreesToRadians(a);
                    }
                    return 1.0 / Math.Tan(a);
                case WanerDaoPhraseType.cosh:
                    tmp = Math.Cosh(a);
                    if (_context.Mode == WanerDaoCalculationMode.Degree)
                    {
                        tmp = WanerDaoCalculationUtility.RadiansToDegrees(tmp);
                    }
                    return tmp;
                case WanerDaoPhraseType.sinh:
                    tmp = Math.Sinh(a);
                    if (_context.Mode == WanerDaoCalculationMode.Degree)
                    {
                        tmp = WanerDaoCalculationUtility.RadiansToDegrees(tmp);
                    }
                    return tmp;
                case WanerDaoPhraseType.tanh:
                    tmp = Math.Tanh(a);
                    if (_context.Mode == WanerDaoCalculationMode.Degree)
                    {
                        tmp = WanerDaoCalculationUtility.RadiansToDegrees(tmp);
                    }
                    return tmp;
                case WanerDaoPhraseType.ctgh:
                    tmp = Math.Tanh(1.0 / a);
                    if (_context.Mode == WanerDaoCalculationMode.Degree)
                    {
                        tmp = WanerDaoCalculationUtility.RadiansToDegrees(tmp);
                    }
                    return tmp;
                //乘方
                case WanerDaoPhraseType.pow:
                    return Math.Pow(a, b);
                case WanerDaoPhraseType.sbrt:
                    return Math.Pow(a, 1.0 / 3.0);
                case WanerDaoPhraseType.cbrt:
                    return Math.Sqrt(a);
                //log series
                case WanerDaoPhraseType.ln:
                    return Math.Log(a, _context.VarsList.Get("e"));
                case WanerDaoPhraseType.log:
                    return Math.Log(b, a);		//a log b
                case WanerDaoPhraseType.lg:
                    return Math.Log10(a);
                default:
                    return 0.0;
            }
        }
        /// <summary>
        /// Run the calculation
        /// </summary>
        public void Run()
        {
            //把所有的词压入栈中
            int i = 0;
            _optr.Clear();
            _optr.Push(WanerDaoPhraseType.sharp);	//将#作为栈操作结束标志

            _opnd.Clear();

            while (i < _context.Phrases.Length)
            {
                WanerDaoPhraseType temp_pt = _context.Phrases.PhraseTypeResult[i];
                if (temp_pt == WanerDaoPhraseType.number)
                    _opnd.Push(_context.Phrases.GetNumberValue(i));
                else if (temp_pt == WanerDaoPhraseType.e)
                    _opnd.Push(_context.VarsList.EXP);
                else if (temp_pt == WanerDaoPhraseType.pi)
                    _opnd.Push(_context.VarsList.PI);
                else if (temp_pt == WanerDaoPhraseType.ans)
                    _opnd.Push(_context.VarsList.ANS);
                else if (temp_pt == WanerDaoPhraseType.variable)
                    _opnd.Push(_context.VarsList.Get(_context.Phrases.PhraseResult[i] as string));
                else	//is operator
                {
                    //calculation stop
                    if ((WanerDaoPhraseType)_optr.Peek() == WanerDaoPhraseType.sharp && temp_pt == WanerDaoPhraseType.sharp)
                        break;

                    WanerDaoPriorityCmpType temp_pct = (WanerDaoPriorityCmpType)WanerDaoOperator.OperatorCmp2((WanerDaoPhraseType)_optr.Peek(), temp_pt);
                    if (temp_pct == WanerDaoPriorityCmpType.Higher)
                    {
                        do
                        {
                            //calculate the previous operator
                            if (WanerDaoOperator.OperandCount((WanerDaoPhraseType)_optr.Peek()) != WanerDaoOperandType.O0)	//不是零目运算符
                                _opnd.Push(Calculate((WanerDaoPhraseType)_optr.Pop()));

                        } while ((WanerDaoPriorityCmpType)WanerDaoOperator.OperatorCmp2((WanerDaoPhraseType)_optr.Peek(), temp_pt) == WanerDaoPriorityCmpType.Higher);
                        //当相邻PhraseType优先级相等时
                        if ((WanerDaoPriorityCmpType)WanerDaoOperator.OperatorCmp2((WanerDaoPhraseType)_optr.Peek(), temp_pt) == WanerDaoPriorityCmpType.Equal)
                        {
                            _optr.Pop();	//pop same prePhraseType
                        }
                        else
                        {
                            _optr.Push(temp_pt);
                        }
                    }
                    else if (temp_pct == WanerDaoPriorityCmpType.Lower)
                    {
                        _optr.Push(temp_pt);
                    }
                    else if (temp_pct == WanerDaoPriorityCmpType.Equal)
                    {
                        _optr.Pop();
                    }
                }
                i++;
            }
            //save result to ans
            _context.VarsList.ANS = (double)_opnd.Peek();
        }
    }
}
