using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModel.Person;

namespace WanerDao2.WanerDaoBLL.Person
{
    /// <summary>
    /// 描述:权限类接口实现
    /// 描述：xux
    /// 时间：2011-10-25
    /// </summary>
    public class WanerDaoPermission : IWanerDaoPermission
    {
        /// <summary>
        /// 判断是否在黑名单中
        /// </summary>
        /// <param name="dic">第一个用户ID,第二个权限ID</param>
        /// <returns></returns>
        public bool SelectSingle_Permission_Black(Dictionary<string, object> dic)
        {
            string json = DbHelperFactory.SingleInstance().GetDataTable("PermissionSQL", "PermissionBlack", dic);
            Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
            if (param.Values.ToString() == "")
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        /// <summary>
        /// 判断是否在允许的个人、好友分组、圈子的中
        /// </summary>
        /// <param name="dic">第一个用户ID  user_id  ,第二个权限ID  permission_id</param>
        /// <returns></returns>
        public bool SelectPermissionAllowArray(Dictionary<string, object> dic)
        {
            string json = DbHelperFactory.SingleInstance().GetDataTable("PermissionSQL", "PermissionAllowArray", dic);
            Dictionary<string, object> param = WanerDaoJSON.GetContentInfo(json);
            if (param.Values.ToString() == "")
            {
                return false;
            }
            else
            {
                return true;
            }
        }

      

        /// <summary>
        /// 判断是否有允许的全部好友、圈子
        /// </summary>
        /// <param name="dic">第一个用户ID,第二个类型</param>
        /// <returns></returns>
        public IList<string> SelectPermissionAllAllowArray(Dictionary<string, object> dic)
        {

            return DbHelperFactory.SingleInstance().GetGenericModel<string>("PermissionSQL", "PermissionAllAllowArray", dic);
        }


        /// <summary>
        /// 查询个人全部权限
        /// </summary>
        /// <param name="dic">第一个用户ID,第二个类型</param>
        /// <returns></returns>
        public IList<PersonalPermissionModel> SelectAll_propertyPermission(Dictionary<string, object> dic)
        {

            return DbHelperFactory.SingleInstance().GetGenericModel<PersonalPermissionModel>("PermissionSQL", "GetAll_propertyPermission", dic);
        }

        /// <summary>
        /// 查询个人自定义权限数量
        /// </summary>
        /// <param name="dic">用户ID</param>
        /// <returns></returns>
        public IList<string> SelectCount_propertyDefaultPermission(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetGenericModel<string>("PermissionSQL", "GetCount_propertyDefaultPermission", dic);
       
        }
    }
}
