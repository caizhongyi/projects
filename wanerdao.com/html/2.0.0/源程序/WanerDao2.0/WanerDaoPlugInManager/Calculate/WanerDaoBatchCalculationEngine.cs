#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 批量处理计算功能实现类
* 作者：吴志斌   时间：2011/11/18 22:37:54 
* 文件名：WanerDaoBatchCalculationEngine
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

namespace WanerDao2.WanerDaoPlugInManager.Calculate
{
    public class WanerDaoBatchCalculationEngine : IWanerDaoCalculationEngine
    {
        List<double> _batchResults = null;
        WanerDaoCalculationContext _global;

        public WanerDaoBatchCalculationEngine(WanerDaoCalculationContext globalcontext)
        {
            this._global = globalcontext;
            _batchResults = new List<double>();
        }
        public event BeforeCalculationHandler BeforeCalculation;
        public event CalculationCompleteHandler CalculationComplete;

        /// <summary>
        /// 批处理模式下计算结果
        /// </summary>
        public List<double> Results
        {
            get
            {
                return _batchResults;
            }
        }
        List<string> _expressions = new List<string>(2);

        public List<string> Expressions
        {
            get
            {
                return _expressions;
            }
        }
        public WanerDaoCalculationContext GlobalContext
        {
            get { return this._global; }
        }
        protected virtual void OnBeforeCalculation(WanerDaoCalculationEventArgs e)
        {
            if (BeforeCalculation != null)
                BeforeCalculation(this, e);
        }

        protected virtual void OnCalculationComplete(WanerDaoCalculationEventArgs e)
        {
            if (CalculationComplete != null)
                CalculationComplete(this, e);
        }

        public void Run()
        {
            _batchResults.Clear();
            for (int i = 0; i < _expressions.Count; i++)
            {
                string expr = this._expressions[i];
                WanerDaoCalculationContext context = new WanerDaoCalculationContext(expr);
                WanerDaoCalculationEngine ce = new WanerDaoCalculationEngine(context);

                WanerDaoCalculationEventArgs args = new WanerDaoCalculationEventArgs(context, i, expr);
                OnBeforeCalculation(args);
                ce.Run();
                OnCalculationComplete(args);
                _batchResults.Add(context.ANS);
            }
        }
    }
}
