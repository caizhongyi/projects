using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using WanerDao2.WanerDaoPlugInManager.Calculate.Phrase;

namespace WanerDao2.WanerDaoPlugInManager.Calculate.Syntax
{
    public class WanerDaoSemanticAnalyzer
    {
        private Stack _optr;		//运算符栈
        private Stack _opnd;		//数符栈
        private Stack _op;			//符号栈（包括运算符和数符的栈）
        private WanerDaoPhraseStorage _ps = null;
        private WanerDaoPhraseType _lastOpForError;	//可能引起错误的那个运算符

        public WanerDaoSemanticAnalyzer(WanerDaoPhraseStorage ps)
        {
            _optr = new Stack();
            _opnd = new Stack();
            _op = new Stack();
            _ps = ps;
        }
        public WanerDaoPhraseType ErrorOperator
        {
            get { return _lastOpForError; }
        }
        public string ErrorTip
        {
            get
            {
                //错误信息处理（UI错误提示优化）
                if (_lastOpForError == WanerDaoPhraseType.unknown)
                    return "计算表达式出现未知错误";
                else if (_lastOpForError == WanerDaoPhraseType.sharp)
                    return "计算表达式出错";
                else if (_lastOpForError == WanerDaoPhraseType.plus)
                    return "在\'+\'附近存在错误";
                else if (_lastOpForError == WanerDaoPhraseType.minus)
                    return "在\'-\'附近存在错误";
                else if (_lastOpForError == WanerDaoPhraseType.mutiple)
                    return "在\'*\'附近存在错误";
                else if (_lastOpForError == WanerDaoPhraseType.divide)
                    return "在\'/\'附近存在错误";
                else if (_lastOpForError == WanerDaoPhraseType.rightbracket)
                    return "在\')\'附近存在错误";
                else if (_lastOpForError == WanerDaoPhraseType.leftbracket)
                    return "在\'(\'附近存在错误";
                else if (_lastOpForError == WanerDaoPhraseType.pow)
                    return "在\'^\'附近存在错误";
                else if (_lastOpForError == WanerDaoPhraseType.fact)
                    return "在\'!\'附近存在错误";
                else if (_lastOpForError == WanerDaoPhraseType.mod)
                    return "在\'%\'附近存在错误";
                else if (_lastOpForError == WanerDaoPhraseType.negative)
                    return "在\'@\'附近存在错误";
                else if (_lastOpForError == WanerDaoPhraseType.number)
                    return "在某个数字附近存在错误";
                else
                    return "在\'" + _lastOpForError.ToString() + "\'附近可能存在错误";
            }
        }
        /// <summary>
        /// 虚拟运算（不进行真实的计算）
        /// </summary>
        /// <returns>是否有错误发生</returns>
        private bool FakeCalculate()
        {
            WanerDaoPhraseType pt = (WanerDaoPhraseType)_optr.Pop();
            WanerDaoOperandType oc = WanerDaoOperator.OperandCount(pt);	//栈顶运算符目数

            WanerDaoPhraseType temp_pt;	//存储_op中pop出的一个符号

            switch (oc)
            {
                case WanerDaoOperandType.O0:	//0目运算符，不存在
                    _lastOpForError = pt;
                    return false;
                case WanerDaoOperandType.O1:	//1目运算符
                    if (_opnd.Count >= 1)
                    {
                        _opnd.Pop();
                        _op.Pop();	//抛出数符
                    }
                    else
                    {	//没有足够的数符用于匹配运算符，出错
                        _lastOpForError = pt;
                        return false;
                    }
                    temp_pt = (WanerDaoPhraseType)_op.Pop();
                    //抛出运算符，邻近符号检查
                    if (WanerDaoOperator.OperatorCmp((WanerDaoPhraseType)_op.Peek(), temp_pt) == WanerDaoPriorityCmpType.Unknown)
                    {
                        _lastOpForError = pt;
                        return false;
                    }
                    _opnd.Push(WanerDaoPhraseType.number);
                    _op.Push(WanerDaoPhraseType.number);
                    break;
                case WanerDaoOperandType.O2:	//2目运算符
                    if (_opnd.Count >= 2)
                    {
                        _opnd.Pop();
                        _opnd.Pop();
                        _op.Pop();	//抛出数符
                    }
                    else
                    {
                        _lastOpForError = pt;
                        return false;
                    }
                    temp_pt = (WanerDaoPhraseType)_op.Pop();
                    //抛出数符，邻近符号检查
                    if (WanerDaoOperator.OperatorCmp((WanerDaoPhraseType)_op.Peek(), temp_pt) == WanerDaoPriorityCmpType.Unknown)
                    {
                        _lastOpForError = pt;
                        return false;
                    }
                    temp_pt = (WanerDaoPhraseType)_op.Pop();
                    //抛出运算符，邻近符号检查
                    if (WanerDaoOperator.OperatorCmp((WanerDaoPhraseType)_op.Peek(), temp_pt) == WanerDaoPriorityCmpType.Unknown)
                    {
                        _lastOpForError = pt;
                        return false;
                    }

                    _opnd.Push(WanerDaoPhraseType.number);
                    _op.Push(WanerDaoPhraseType.number);
                    break;
            }
            return true;
        }
        /// <summary>
        /// 检查文法
        /// </summary>
        /// <returns>是否正确</returns>
        public bool Check()
        {
            _optr.Clear();
            _optr.Push(WanerDaoPhraseType.sharp);	//将#作为栈操作结束标志
            _opnd.Clear();
            _op.Clear();
            _op.Push(WanerDaoPhraseType.sharp);		//将#作为栈操作结束标志

            int i = 0;
            while (i < _ps.Length)
            {
                WanerDaoPhraseType temp_pt = _ps.PhraseTypeResult[i];
                //运算前算符相邻检查
                WanerDaoPriorityCmpType temp_pct = (WanerDaoPriorityCmpType)WanerDaoOperator.OperatorCmp((WanerDaoPhraseType)_op.Peek(), temp_pt);
                if (temp_pct == WanerDaoPriorityCmpType.Unknown)
                {
                    _lastOpForError = temp_pt;
                    return false;
                }
                //假运算处理
                if (temp_pt == WanerDaoPhraseType.number ||
                    temp_pt == WanerDaoPhraseType.e ||
                    temp_pt == WanerDaoPhraseType.pi ||
                    temp_pt == WanerDaoPhraseType.ans ||
                    temp_pt == WanerDaoPhraseType.variable)
                {	//是数
                    _opnd.Push(WanerDaoPhraseType.number);
                    _op.Push(WanerDaoPhraseType.number);
                }
                else	//是运算符
                {
                    //运算结束
                    if ((WanerDaoPhraseType)_optr.Peek() == WanerDaoPhraseType.sharp && temp_pt == WanerDaoPhraseType.sharp)
                        break;

                    temp_pct = (WanerDaoPriorityCmpType)WanerDaoOperator.OperatorCmp2((WanerDaoPhraseType)_optr.Peek(), temp_pt);
                    if (temp_pct == WanerDaoPriorityCmpType.Higher)
                    {
                        do
                        {
                            if (this.FakeCalculate() == false)	//虚拟运算
                                return false;
                        } while ((WanerDaoPriorityCmpType)WanerDaoOperator.OperatorCmp2((WanerDaoPhraseType)_optr.Peek(), temp_pt) == WanerDaoPriorityCmpType.Higher);
                        //当相邻PhraseType优先级相等时
                        if ((WanerDaoPriorityCmpType)WanerDaoOperator.OperatorCmp2((WanerDaoPhraseType)_optr.Peek(), temp_pt) == WanerDaoPriorityCmpType.Equal)
                        {
                            _optr.Pop();	//抛出相等的prePhraseType
                            //对类似于(number)的情况做处理
                            WanerDaoPhraseType pt1 = (WanerDaoPhraseType)_op.Pop();
                            _op.Pop();
                            _op.Push(pt1);
                        }
                        else
                        {
                            _optr.Push(temp_pt);
                            _op.Push(temp_pt);
                        }
                    }
                    else if (temp_pct == WanerDaoPriorityCmpType.Lower)
                    {
                        _optr.Push(temp_pt);
                        _op.Push(temp_pt);
                    }
                    else if (temp_pct == WanerDaoPriorityCmpType.Equal)
                    {
                        _optr.Pop();
                        WanerDaoPhraseType pt1 = (WanerDaoPhraseType)_op.Pop();
                        _op.Pop();
                        _op.Push(pt1);
                    }
                    else
                    {
                        //出现了不允许相邻的符号
                        _lastOpForError = (WanerDaoPhraseType)_optr.Peek();
                        return false;
                    }
                }
                i++;
            }
            //数栈检查，如果并非只剩一个元素报错
            if (_opnd.Count != 1)
            {
                _lastOpForError = WanerDaoPhraseType.unknown;
                return false;
            }
            return true;
        }
    }
}
