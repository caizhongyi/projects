using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IPerson;
using System.ServiceModel;
using WanerDao2.WanerDaoModel.Person;

namespace WanerDaoPluginService.IService.IPerson
{
    
    /// <summary>
    /// 描述：个人日历服务接口
    /// 创建者：徐蓓
    /// 创建时间：2011-11-18 20:33:33
    /// 修改者：
    /// 修改时间：
    /// 修改原因：
    /// </summary>
    [ServiceContract]
    public interface IPersonalCalendar
    {
        /// <summary>
        /// 描述：创建个人日历
        /// 创建者：徐蓓
        /// 创建时间：2011-11-18 20:33:33
        /// 修改者：
        /// 修改时间：
        /// 修改原因
        /// </summary>
        /// <param name="modal">个人日历实体</param>
        /// <returns></returns>
        [OperationContract]
        string CreatePersonalCalendar(PersonalCalendarModal modal);
        /// <summary>
        /// 描述：创建简单个人日历
        /// 创建者：徐蓓
        /// 创建时间：2011-12-4 14:33:33
        /// 修改者：
        /// 修改时间：
        /// 修改原因
        /// </summary>
        /// <param name="modal">需传入sort_id,affair,begin_date,end_date,user_id</param>
        /// <returns></returns>
        [OperationContract]
        string CreateSimplePersonalCalendar(PersonalCalendarModal modal);
        /// <summary>
        /// 描述：更新个人日历
        /// 创建者：徐蓓
        /// 创建时间：2011-11-18 20:33:33
        /// 修改者：
        /// 修改时间：
        /// 修改原因
        /// </summary>
        /// <param name="modal"></param>
        /// <returns></returns>
        [OperationContract]
        string UpdatePersonalCalendar(PersonalCalendarModal modal);
        /// <summary>
        /// 描述：更新个人简单日历
        /// 创建者：徐蓓
        /// 创建时间：2011-11-18 20:33:33
        /// 修改者：
        /// 修改时间：
        /// 修改原因
        /// </summary>
        /// <param name="modal">需传入affair,begin_date,end_date</param>
        /// <returns></returns>
        [OperationContract]
        string UpdateSimplePersonalCalendar(PersonalCalendarModal modal);
        /// <summary>
        /// 描述：删除个人日历
        /// 创建者：徐蓓
        /// 创建时间：2011-11-18 20:33:33
        /// 修改者：
        /// 修改时间：
        /// 修改原因
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [OperationContract]
        string DeletePersonalCalendar(string id);
        /// <summary>
        /// 描述：通过用户ID获取个人日历
        /// 创建者：徐蓓
        /// 创建时间：2011-12-4 14:33:33
        /// 修改者：
        /// 修改时间：
        /// 修改原因
        /// </summary>
        /// <param name="userId">用户ID</param>
        /// <returns></returns>
        [OperationContract]
        string GetPersonalCalendarByUserId(string userId);

        [OperationContract]
        string GetPersonalCalendarAgenda(string userId);
    }
}
