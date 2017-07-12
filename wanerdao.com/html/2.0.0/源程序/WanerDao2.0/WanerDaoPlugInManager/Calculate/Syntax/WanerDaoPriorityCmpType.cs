using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WanerDao2.WanerDaoPlugInManager.Calculate.Syntax
{
    /// <summary>
    /// 优先级比较类型
    /// </summary>
    public enum WanerDaoPriorityCmpType
    {
        Unknown=0, //无法比较
        Higher=1, //高于
        Lower=2, //低于
        Equal=3 //等于
    }
}
