#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-08-12 18:54:44 
* 文件名：MapHelper 
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
using GMap.NET;
using GMap.NET.MapProviders;

namespace WanerDao2.WanerDaoModule.GoogleMap
{
    public  class MapHelper
    {
        private const double EARTH_RADIUS = 6378245.0; //地球半径
        public static MapPoint? GetMapPoint(string address)
        {
            try
            {
                string addr = address;
                GeoCoderStatusCode unknow = GeoCoderStatusCode.Unknow;
                PointLatLng? latLngFromGeocoder = GMapProviders.GoogleMap.GetPoint(addr, out unknow);
                if (latLngFromGeocoder.HasValue && (unknow == GeoCoderStatusCode.G_GEO_SUCCESS))
                {
                    PointLatLng latLng = latLngFromGeocoder.Value;

                    return new MapPoint { Lat = latLng.Lat, Lng = latLng.Lng };
                }
                else
                {
                    return null;
                }
            }
            catch (Exception _e)
            {
                throw _e;
            }
        }
        public static double? DistanceOfTwoPoints(MapPoint p1, MapPoint p2)
        {
            return DistanceOfTwoPoints(p1.Lat,p1.Lng,p2.Lat,p2.Lng);
        }
        public static double? DistanceOfTwoPoints(MapPoint point, string address)
        {
            string _errorMsg = "";
            MapPoint? _point2 = GetMapPoint(address);
            if (!_point2.HasValue)
                return null;
            return DistanceOfTwoPoints(point.Lat, point.Lng, _point2.Value.Lat, _point2.Value.Lng);
        }
        public static double? DistanceOfTwoPoints(string address1, string address2)
        {
            MapRoute _mr = GMapProviders.GoogleMap.GetRoute( address1, address2, false, false, 0);
            if (_mr != null)
                return _mr.Distance * 1000;
            else
                return null;
        }
        public static double? DistanceOfTwoPoints(double lat1, double lng1, double lat2, double lng2)
        {

            //方法一
            MapRoute _mr = GMapProviders.GoogleMap.GetRoute(new PointLatLng(lat1, lng1), new PointLatLng(lat2, lng2), false, false, 0);
            if(_mr!=null)
                return _mr.Distance*1000;
            else
                return null;
            #region other method
            //方法二
            //double radLat1 = Rad(lat1);
            //double radLat2 = Rad(lat2);
            //double a = radLat1 - radLat2;
            //double b = Rad(lng1) - Rad(lng2);
            //double s = 2 * Math.Asin(Math.Sqrt(Math.Pow(Math.Sin(a / 2), 2) +Math.Cos(radLat1) * Math.Cos(radLat2)* Math.Pow(Math.Sin(b / 2), 2)));
            ////s = s * (gs == GaussSphere.WGS84 ? 6378137.0 : (gs == GaussSphere.Xian80 ? 6378140.0 :6378245.0));
            //s = s * EARTH_RADIUS;
            //s = Math.Round(s * 10000) / 10000;
            //return s;

            ////方法三
            //double radLat1 = Rad(lat1);
            //double radLat2 = Rad(lat2);
            //double a = radLat1 - radLat2;
            //double b = Rad(lng1) - Rad(lng2);
            //double s = 2 * Math.Asin(Math.Sqrt(Math.Pow(Math.Sin(a / 2), 2) +
            // Math.Cos(radLat1) * Math.Cos(radLat2) * Math.Pow(Math.Sin(b / 2), 2)));
            //s = s * EARTH_RADIUS;
            //s = Math.Round(s * 10000) / 10000;
            //return s;
            #endregion
        }

        private static double Rad(double d)
        {
            return d * Math.PI / 180.0;
        }

        public static double GetDegreeByRoute(double route)
        {
            return  route/((40075.04*10000)/360);
        }

    }
    public struct MapPoint
    {
        public double Lat;
        public double Lng;
    }
}
