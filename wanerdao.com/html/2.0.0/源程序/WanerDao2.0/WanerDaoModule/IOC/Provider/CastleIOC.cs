
#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-16 14:33:04 
* 文件名：IOCContainer 
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
using Castle.Windsor;
using System.Web;
using Castle.Windsor.Configuration.Interpreters;
using Castle.Core.Resource;

namespace WanerDao2.WanerDaoModule.IOC.Provider
{
    public class CastleIOC : WindsorContainer, IIOCProvider
    {
        public T GetObject<T>(string serviceName)
        {
            return (T)Container[serviceName];
        }
        public T GetObject<T>()
        {
            return Container.GetService<T>();
        }

        private static IWindsorContainer s_Container;
		public static IWindsorContainer Container
		{
			get
			{
                if (CastleIOC.s_Container == null)
                {
                    CastleIOC.s_Container = new CastleIOC();
                }
                return CastleIOC.s_Container;
                //IContainerAccessor containerAccessor = HttpContext.Current.ApplicationInstance as IContainerAccessor;
                //if (containerAccessor == null)
                //{
                //    throw new Exception("You must extend the HttpApplication in your web project and implement the IContainerAccessor to properly expose your container instance");
                //}
                //return containerAccessor.Container;
			}
		}
        public CastleIOC()
            : base(new XmlInterpreter(new ConfigResource()))
		{
			//this.AddTransComponent();
		}
		private void AddTransComponent()
		{
			//this.AddComponent("transaction.manager", typeof(ITransactionManager), typeof(DefaultTransactionManager));
		}
    }
}
