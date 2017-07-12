#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 计算器功能辅助类
* 作者：吴志斌   时间：2011/11/24 22:37:54 
* 文件名：WanerDaoCalculationUtility
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
    public class WanerDaoCalculationUtility
    {
        const double PiDividedBy180 = Math.PI / 180;
        /// <summary>
        /// 将角度转换为弧度
        /// </summary>
        /// <param name="degrees">角度值</param>
        /// <returns>角度对应的弧度</returns>
        public static double DegreesToRadians(double degrees)
        {
            return degrees * PiDividedBy180;
        }

        /// <summary>
        /// 将弧度转换为角度
        /// </summary>
        /// <param name="radians">弧度值</param>
        /// <returns>弧度对应的角度</returns>
        public static double RadiansToDegrees(double radians)
        {
            return radians / PiDividedBy180;
        }
    }
}
