using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceProcess;

namespace WanerDao2.WanerDaoEmail
{
    class Program
    {
        static void Main(string[] args)
        {
            ServiceBase[] ServicesToRun;
            ServicesToRun = new ServiceBase[] 
			{ 
				new WanerDaoMailService() 
			};
            ServiceBase.Run(ServicesToRun);
        }
    }
}
