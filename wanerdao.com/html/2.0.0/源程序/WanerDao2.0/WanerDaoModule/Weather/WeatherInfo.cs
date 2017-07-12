#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-04-17 22:16:51 
* 文件名：WeatherInfo 
* 版本：V1.0.1 
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

namespace WanerDao2.WanerDaoModule.Weather
{
    public class WeatherInfo
    {
        public Current Current;
        public List<Forecast> Forecasts;
    }
    public class Current
    {
        /// <summary>
        /// 天气情况
        /// </summary>
        public string condition = string.Empty;
        /// <summary>
        /// ℃
        /// </summary>
        public string temp_c = string.Empty;
        public string temp_f = string.Empty;
        /// <summary>
        /// 湿度
        /// </summary>
        public string humidity = string.Empty;
        /// <summary>
        /// 风向
        /// </summary>
        public string wind_condition = string.Empty;
        public string picPath = string.Empty;
    }
    public class Forecast
    {
        /// <summary>
        /// 天气情况
        /// </summary>
        public string condition = string.Empty;
        public string day_of_week = string.Empty;
        /// <summary>
        /// 最低温度
        /// </summary>
        public string low = string.Empty;
        /// <summary>
        /// 最高温度
        /// </summary>
        public string high = string.Empty;
        public string picPath = string.Empty;
        public string DateTime = string.Empty;
    }
}
