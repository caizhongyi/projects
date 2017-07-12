#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 计算器辅助类
* 作者：吴志斌   时间：2011/11/23 22:37:54 
* 文件名：WanerDaoCalculationContext
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
using WanerDao2.WanerDaoPlugInManager.Calculate.Phrase;
using WanerDao2.WanerDaoPlugInManager.Calculate.Exceptions;

namespace WanerDao2.WanerDaoPlugInManager.Calculate
{
    public class WanerDaoCalculationContext : IDisposable
    {
        WanerDaoCalculationVariables _variables = null;
        WanerDaoPhraseStorage _ps = null;
        string _expr = null;

        public WanerDaoCalculationContext()
        {
            _ps = new WanerDaoPhraseStorage();
            _variables = new WanerDaoCalculationVariables();
        }

        public WanerDaoCalculationContext(string expression)
        {
            _expr = expression;
            _ps = new WanerDaoPhraseStorage();
            _variables = new WanerDaoCalculationVariables();
            Analyze(expression);
        }

        /// <summary>
        /// 变量列表
        /// </summary>
        public WanerDaoCalculationVariables VarsList
        {
            get
            {
                return _variables;
            }
        }

        public string Expression
        {
            get { return _expr; }
        }

        public void SetVariable(string name, double value)
        {
            _variables.Set(name, value);
        }
        public double GetVariable(string name)
        {
            return _variables.Get(name);
        }

        WanerDaoCalculationMode _cm = WanerDaoCalculationMode.Degree;

        /// <summary>
        /// Calculation Mode: Degree/Radius
        /// </summary>
        public WanerDaoCalculationMode Mode
        {
            get { return _cm; }
            set { _cm = value; }
        }

        /// <summary>
        /// Calculation phrases parsed by Phrase Analyzer
        /// </summary>
        public WanerDaoPhraseStorage Phrases
        {
            get { return _ps; }
            set { _ps = value; }
        }

        /// <summary>
        /// Result
        /// </summary>
        public double ANS
        {
            get
            {
                if (VarsList.ANS.CompareTo(double.NaN) == 0		//none-number
                    || VarsList.ANS.CompareTo(double.PositiveInfinity) == 0	//positive infinity
                    || VarsList.ANS.CompareTo(double.NegativeInfinity) == 0)	//negitive infinity
                    throw new WanerDaoCalculationException("计算失败");

                return VarsList.ANS;
            }
        }

        public void Analyze(string expression)
        {
            _ps.ClearResult();
            WanerDaoPhraseAnalyzer.Analyze(expression, _ps);
        }

        public void ClearANS()
        {
            VarsList.ANS = 0;
        }
        #region IDisposable Members

        public void Dispose()
        {
            if (_ps != null)
                _ps.Dispose();
        }

        #endregion
    }
}
