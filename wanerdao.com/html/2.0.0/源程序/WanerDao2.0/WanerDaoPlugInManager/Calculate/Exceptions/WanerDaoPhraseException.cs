#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 计算器词法异常处理类
* 作者：吴志斌   时间：2011/11/18 22:37:54 
* 文件名：WanerDaoPhraseException
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

namespace WanerDao2.WanerDaoPlugInManager.Calculate.Exceptions
{
    public class WanerDaoPhraseException : Exception
    {
        public WanerDaoPhraseException()
            : base()
        {
        }

        public WanerDaoPhraseException(string msg)
            : base(msg)
        {

        }

        public WanerDaoPhraseException(string msg, Exception innerException)
            : base(msg, innerException)
        {

        }
    }
}
