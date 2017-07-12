#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 计算器操作数类型
* 作者：吴志斌   时间：2011/11/19 22:37:54 
* 文件名：WanerDaoOperandType
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
    /// 运算目数
    /// </summary>
    public enum WanerDaoOperandType:int
    {
        O0,		//0目运算
        O1,		//1目运算
        O2,		//2目运算
        Unknown	
    }
}
