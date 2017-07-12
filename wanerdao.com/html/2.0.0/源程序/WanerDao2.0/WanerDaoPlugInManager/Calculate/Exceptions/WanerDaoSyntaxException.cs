#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 计算器语法异常处理类
* 作者：吴志斌   时间：2011/11/18 22:37:54 
* 文件名：WanerDaoSyntaxException
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
using WanerDao2.WanerDaoPlugInManager.Calculate.Phrase;

namespace WanerDao2.WanerDaoPlugInManager.Calculate.Exceptions
{
    public class WanerDaoSyntaxException : Exception
    {
        public WanerDaoSyntaxException()
            : base()
        {
        }

        public WanerDaoSyntaxException(string msg)
            : base(msg)
        {

        }

        public WanerDaoSyntaxException(WanerDaoPhraseType phraseType)
            : this(string.Format("'{0}' 附近有语法错误", WanerDaoPhraseAnalyzer.TypeToStr(phraseType)))
        {

        }

        public WanerDaoSyntaxException(double phraseValue)
            : this(string.Format("'{0}' 附近有语法错误", phraseValue))
        {

        }

        public WanerDaoSyntaxException(string msg, Exception innerException)
            : base(msg, innerException)
        {

        }
    }
}
