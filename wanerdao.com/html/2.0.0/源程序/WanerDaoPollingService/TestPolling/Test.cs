using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDaoPollingInterface;
using WanerDaoDBService;

namespace TestPolling
{
    public class Test : IPollingByHalfHour
    {
        public void RunByHalfHour()
        {
            CommonHelper.WriteLog("1", LogEnum.Info);
        }
    }
}
