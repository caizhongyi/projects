#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-08-12 19:48:11 
* 文件名：MapSearch 
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
using WanerDao2.WanerDaoModel.Activity.ActivityCreate;

namespace WanerDao2.WanerDaoModel.Activity.ActivitySearch
{
    public class MapSearch
    {
        /// <summary>
        /// 查询的用户编号
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// 当前位置
        /// </summary>
        public Place CurrLatLng { get; set; }

        /// <summary>
        /// /离家距离，单位为米
        /// </summary>
        public double FromHomeDistance { get; set; }
        /// <summary>
        /// 分类ID  多个，用‘,’逗号隔开
        /// </summary>
        public string Category { get; set; }
        /// <summary>
        /// 所有好友参加的活动
        /// </summary>
        public bool AllFriendAttend { get; set; }
        /// <summary>
        /// 所有圈子参加的活动
        /// </summary>
        public bool AllGroupAttend { get; set; }
        /// <summary>
        /// 自定义好友，好友主键以逗号隔开
        /// </summary>
        public string FriendAttend { get; set; }
        /// <summary>
        /// 自定义圈子，圈子主键以逗号隔开
        /// </summary>
        public string GroupAttend { get; set; }
        /// <summary>
        /// filterBeenPlace
        /// </summary>
        public bool FilterBeenPlace { get; set; }
    }


    public class Place
    {
        public Place()
        { 
        
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="latLng">经纬度字符串，以逗号隔开。例如：经度,纬度</param>
        public Place(string latLng)
        {
            string[] latLngs=latLng.Split(',');
            if(latLng.Length==2)
            {
                double lng = 0;
                double lat = 0;

                double.TryParse(latLngs[0], out lng);
                double.TryParse(latLngs[0], out lat);

                this.Lng = lng;
                this.Lat = lat;
            }
            

        }

        public double Lat { get; set; }
        public double Lng { get; set; }
    }
}
