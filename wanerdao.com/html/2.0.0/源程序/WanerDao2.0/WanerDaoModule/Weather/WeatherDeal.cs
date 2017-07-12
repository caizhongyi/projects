#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-23 16:51:05 
* 文件名：WeatherDeal 
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
using System.Xml;
using WanerDao2.WanerDaoModule.Config;
using System.Net;
using WanerDao2.WanerDaoModule.Json;
using System.Text.RegularExpressions;

namespace WanerDao2.WanerDaoModule.Weather
{
    public class WeatherDeal
    {
        public static WeatherInfo GetWeatherInfo(string cityName, string stateName=null)
        {
            if (string.IsNullOrEmpty(cityName))
                return null;
            string[] _codes = GetYahooAddressCode(cityName, stateName);
            if(_codes==null||_codes.Length<1)
                return null;

            foreach (string _item in _codes)
            {
                XmlDocument _xmlDocument = GetHttpXml(string.Format(WanerDaoConfigReader.GetWeatherUrl(), _item));
                

                XmlNamespaceManager nsMgr = new XmlNamespaceManager(_xmlDocument.NameTable);
                nsMgr.AddNamespace("yweather", "http://xml.weather.yahoo.com/ns/rss/1.0");
                XmlNode _conditionNode = _xmlDocument.SelectSingleNode("query/results/item/yweather:condition", nsMgr);
                if (_conditionNode == null)
                {
                    continue;
                }
                XmlNodeList _forecastList = _xmlDocument.SelectNodes("query/results/item/yweather:forecast", nsMgr);
                try
                {
                    return new WeatherInfo
                    {
                        Current = GetCurrentWeather(_conditionNode),
                        Forecasts = GetForecastWeathers(_forecastList)
                    };
                }
                catch
                {
                    return null;
                }
            }
            return null;
        }
        private static Current GetCurrentWeather(XmlNode xn)
        {
            return new Current
            {
                condition = GetXmlNodeAttributes(xn, "text"),
                //humidity = GetXmlNodeAttributes(_xn, "humidity"),
                picPath = GetImageUrl(GetXmlNodeAttributes(xn, "code")),
                temp_c =ConvertTempratrue( GetXmlNodeAttributes(xn, "temp"))
                //temp_f = GetXmlNodeAttributes(_xn, "temp_f"),
                //wind_condition = GetXmlNodeAttributes(xn, "wind_condition")

            };
        }
        private static List<Forecast> GetForecastWeathers(XmlNodeList xns)
        {
            List<Forecast> _list = new List<Forecast>(xns.Count);
            int _count = 0;
            foreach (XmlNode _node in xns)
            {
                if (_node == null)
                {
                    continue;
                }
                Forecast _forecast = new Forecast
                {
                    condition = GetXmlNodeAttributes(_node, "text"),
                    DateTime = DateTime.Now.AddDays(_count).ToShortDateString(),
                    day_of_week = GetXmlNodeAttributes(_node, "day"),
                    high =ConvertTempratrue( GetXmlNodeAttributes(_node, "high")),
                    low =ConvertTempratrue( GetXmlNodeAttributes(_node, "low")),
                    picPath = GetImageUrl(GetXmlNodeAttributes(_node, "code"))
                };
                _list.Add(_forecast);
                _count++;
            }
            return _list;
        }
        private static string GetXmlNodeAttributes(XmlNode xmlNode, string attributesName)
        {
            string _value = "";
            try
            {
                _value = xmlNode.Attributes[attributesName].InnerText;
            }
            catch
            {
            }
            return _value;
        }
        private static XmlDocument GetHttpXml(string baseUrl)
        {
            HttpWebRequest gg_Request; HttpWebResponse gg_Response = null; XmlDocument gg_XMLdoc = null;
            try
            {
                gg_Request = (HttpWebRequest)WebRequest.Create(string.Format(baseUrl));
               // gg_Request.UserAgent = @"Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.4) Gecko/20100413 Firefox/3.6.4";
                gg_Response = (HttpWebResponse)gg_Request.GetResponse(); gg_XMLdoc = new XmlDocument();
                gg_XMLdoc.Load(gg_Response.GetResponseStream());
            }
            catch (Exception ex)
            { }
            gg_Response.Close(); return gg_XMLdoc;
        }

        private const string  AddressFomat="{0}{1}";
        private static string[] GetYahooAddressCode(string cityName, string stateName = null)
        {
            string _address = string.Format(AddressFomat, cityName, string.IsNullOrEmpty(stateName)?"":","+stateName);
            XmlDocument _xmlDocument = GetHttpXml(string.Format(WanerDaoConfigReader.GetWeatherCityCodeUrl(), _address));

            XmlNode _rsultXn= _xmlDocument.SelectSingleNode("/query/results");
            if(_rsultXn==null)
                return null;
            XmlNodeList _xml=_rsultXn.ChildNodes;
            if (_xml == null || _xml.Count < 1)
                return null;

            XmlNamespaceManager nsMgr = new XmlNamespaceManager(_xmlDocument.NameTable);
            nsMgr.AddNamespace("place", _rsultXn.FirstChild.NamespaceURI);
            XmlNodeList _resultNodes = _xmlDocument.SelectNodes("/query/results/place:place/place:postal", nsMgr);

            List<string> _codes = new List<string>(_resultNodes.Count);

            foreach (XmlNode _codeXn in _resultNodes)
            {
                if (_codeXn!=null&&!string.IsNullOrEmpty(_codeXn.InnerText))
                {
                    _codes.Add(_codeXn.InnerText);
                }
            }
            return _codes.ToArray();
        }
        private static string GetImageUrl(string code)
        {
            try
            {
                if (string.IsNullOrEmpty(code))
                    return "";
                return string.Format(WanerDaoConfigReader.GetWeatherImage(), code);
            }
            catch
            {

            }
            return "";
        }

        private static string ConvertTempratrue(string tempF)
        {
            double _tempF=0;
            if(!double.TryParse(tempF,out _tempF))
                return "";

            int _tempC=(int)((_tempF-32)/1.8 );
            return _tempC.ToString();
        }
    }
}
