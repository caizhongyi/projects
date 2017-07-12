using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Person;

namespace WanerDao2.WanerDaoIBLL.IPerson
{
    /// <summary>
    /// 描述：个人日历接口
    /// 创建者：徐蓓
    /// 创建时间：2011-11-18 20:33:33
    /// 修改者：
    /// 修改时间：
    /// 修改原因：
    /// </summary>
    public interface IWanerDaoPersonalCalendar
    {

        string GetPersonalCalendarAgenda(string userId);

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
        string CreatePersonalCalendar(PersonalCalendarModal modal);
        /// <summary>
        /// 描述：创建个人日历
        /// 创建者：徐蓓
        /// 创建时间：2011-11-18 20:33:33
        /// 修改者：
        /// 修改时间：
        /// 修改原因
        /// </summary>
        /// <param name="json">需传入除id,update_date,active以外的其他参数</param>
        /// <returns></returns>
        string CreatePersonalCalendar(string json);
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
        string CreateSimplePersonalCalendar(PersonalCalendarModal modal);
        /// <summary>
        /// 描述：创建简单个人日历
        /// 创建者：徐蓓
        /// 创建时间：2011-12-4 14:33:33
        /// 修改者：
        /// 修改时间：
        /// 修改原因
        /// </summary>
        /// <param name="json">需传入sort_id,affair,begin_date,end_date,user_id</param>
        /// <returns></returns>
        string CreateSimplePersonalCalendar(string json);
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
        string UpdateSimplePersonalCalendar(PersonalCalendarModal modal);
        /// <summary>
        /// 描述：更新简单个人日历
        /// 创建者：徐蓓
        /// 创建时间：2011-12-4 14:33:33
        /// 修改者：
        /// 修改时间：
        /// 修改原因
        /// </summary>
        /// <param name="json">需传入affair,begin_date,end_date</param>
        /// <returns></returns>
        string UpdateSimplePersonalCalendar(string json);
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
        string GetPersonalCalendarByUserId(string userId);
    }
}
