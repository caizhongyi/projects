#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 计算器事件类
* 作者：吴志斌   时间：2011/11/22 22:37:54 
* 文件名：WanerDaoEventArgs
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
    public class WanerDaoCalculationEventArgs : EventArgs
    {
        WanerDaoCalculationContext _context;
        int _index;
        string _expr;

        public WanerDaoCalculationEventArgs(WanerDaoCalculationContext context, string expr)
            : this(context, -1, expr)
        {
        }

        public WanerDaoCalculationEventArgs(WanerDaoCalculationContext context, int index, string expr)
        {
            this._index = index;
            this._expr = expr;
            this._context = context;
        }

        public string Expression
        {
            get { return this._expr; }
        }
        public int Index
        {
            get { return this._index; }
        }
        public double Result
        {
            get { return _context.ANS; }
        }
    }
}
