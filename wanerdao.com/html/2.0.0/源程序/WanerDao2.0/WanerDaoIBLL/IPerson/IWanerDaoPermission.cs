using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Person;

namespace WanerDao2.WanerDaoIBLL.IPerson
{
     /// <summary>
    /// 描述:权限类接口
    /// 描述：xux
    /// 时间：2011-10-25
    /// </summary>
   public interface IWanerDaoPermission
    {
       /// <summary>
        /// 判断是否在黑名单中
       /// </summary>
        /// <param name="dic">第一个用户ID,第二个权限ID</param>
       /// <returns></returns>
       Boolean SelectSingle_Permission_Black(Dictionary<string, object> dic);

       /// <summary>
       /// 判断是否在允许的个人、好友分组、圈子的中
       /// </summary>
       /// <param name="dic">第一个用户ID,第二个权限ID</param>
       /// <returns></returns>
       Boolean SelectPermissionAllowArray(Dictionary<string, object> dic);

       /// <summary>
       /// 判断是否有允许的全部好友、圈子
       /// </summary>
       /// <param name="dic">第一个用户ID,第二个类型</param>
       /// <returns></returns>
       IList<string> SelectPermissionAllAllowArray(Dictionary<string, object> dic);

       /// <summary>
       /// 查询个人全部权限
       /// </summary>
       /// <param name="dic">用户ID</param>
       /// <returns></returns>
       IList<PersonalPermissionModel> SelectAll_propertyPermission(Dictionary<string, object> dic);

       /// <summary>
       /// 查询个人自定义权限数量
       /// </summary>
       /// <param name="dic">用户ID</param>
       /// <returns></returns>
       IList<string> SelectCount_propertyDefaultPermission(Dictionary<string, object> dic);
    }
}
