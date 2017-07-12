#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 计算器词类型
* 作者：吴志斌   时间：2011/11/18 22:37:54 
* 文件名：WanerDaoPhraseType
* 版本：V1.0.0 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion
using System;
namespace WanerDao2.WanerDaoPlugInManager.Calculate.Phrase
{
    /// <summary>
    /// 词类型
    /// </summary>
    public enum WanerDaoPhraseType
    {
        unknown = 0,
        ln = 1,
        lg = 2,
        log = 3,
        pow = 4,		//a^b
        cbrt = 6,		//a^-1/2
        sbrt = 7,		//a^-1/3
        fact = 8,
        sin = 10,
        cos = 11,
        sinh = 12,
        cosh = 13,
        tan = 14,
        ctg = 15,
        tanh = 16,
        ctgh = 17,
        plus = 18,
        minus = 19,
        mutiple = 20,
        divide = 21,
        mod = 23,
        leftbracket = 24,   //(
        rightbracket = 25,	//)
        ans = 26,		
        sto = 27,		
        clr = 28,
        e = 35,
        pi = 36,
        number = 37,
        sharp = 38,
        negative = 39,    //negative
        positive = 40,     //positive
        variable = 41,
        dataprovider = 42,
        fieldname = 43,    //dataprovider field id
    }
}
