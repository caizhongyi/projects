#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 计算器变量
* 作者：吴志斌   时间：2011/11/18 22:37:54 
* 文件名：WanerDaoCalculationVariables
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
using WanerDao2.WanerDaoPlugInManager.Calculate.Exceptions;

namespace WanerDao2.WanerDaoPlugInManager.Calculate
{
    /// <summary>
    /// 常量和变量列表
    /// </summary>
    public class WanerDaoCalculationVariables
    {
        Dictionary<string, double> _variable = new Dictionary<string, double>();

        public WanerDaoCalculationVariables()
        {
        }
        public double PI
        {
            get { return Math.PI; }
        }
        public double EXP
        {
            get { return Math.Exp(1); }
        }
        public double ANS
        {
            get
            {
                if (_variable.ContainsKey("ans"))
                    return _variable["ans"];
                else
                    return 0.0;
            }
            set
            {
                if (_variable.ContainsKey("ans"))
                    _variable["ans"] = value;
                else
                    _variable.Add("ans", value);
            }
        }
        /// <summary>
        /// 保存变量到变量列表
        /// </summary>
        /// <param name="x">变量名</param>
        /// <param name="Value">变量值</param>
        public void Set(string x, double value)
        {
            x = x.ToLower();
            if (x == "pi" || x == "e")
                throw new ArgumentException("不能设置变量PI或E");

            if (!_variable.ContainsKey(x))
                _variable.Add(x, value);
            else
                _variable[x] = value;
        }
        /// <summary>
        /// 从变量列表中获得变量值
        /// </summary>
        /// <param name="x">变量名</param>
        public double Get(string x)
        {
            x = x.ToLower();
            if (x == "pi")
            {
                return Math.PI;
            }
            else if (x == "e")
            {
                return Math.Exp(1);
            }
            else if (_variable.ContainsKey(x))
                return _variable[x];

            throw new WanerDaoCalculationException(string.Format("无法在变量列表中找到变量 '{0}'", x));
        }
        /// <summary>
        /// 清除所有的变量，除了PI和E
        /// </summary>
        public void ClearAll()
        {
            _variable.Clear();
        }
    }
}
