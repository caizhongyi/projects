#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 计算器自动机状态枚举
* 作者：吴志斌   时间：2011/11/19 22:37:54 
* 文件名：WanerDaoDFAState
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
    /// 计算语句的有限自动机状态
    /// </summary>
    public enum WanerDaoDFAState
    {
        S0 = 0,	///初态
        S1 = 1,	///整数串，不带小数点
        S2 = 2,	///浮点数串
        S3 = 3,	///字母串
        S4 = 4,	/// +
        S5 = 5,	/// -
        S6 = 6,	/// *
        S7 = 7,	/// /
        S8 = 8,	/// %
        S9 = 9,	/// !
        S10 = 10, /// ^
        S11 = 11, /// =
        S12 = 12, /// (
        S13 = 13, /// )
        S14 = 14, /// #
        S15 = 15, /// @
        S16 = 16,  /// 变量 [...]
        S17 = 17,  /// dataprovider [<dataprovider>:field]
        S18 = 18,  /// fieldname [dataprovider:<field>]
        SX = 50,	/// 未知态
    }
}
