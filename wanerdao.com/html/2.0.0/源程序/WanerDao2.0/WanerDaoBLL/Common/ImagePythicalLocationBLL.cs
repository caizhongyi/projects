#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-15 21:49:04 
* 文件名：ImagePythicalLocationBLL 
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
using WanerDao2.WanerDaoModel.Common;
using WanerDao2.WanerDaoModel.SqlKey;
using System.Data.Common;

namespace WanerDao2.WanerDaoBLL.Common
{
    public class ImagePythicalLocationBLL :WanerDaoBLL.Base.BLLBase<ImagePythicalLocationBLL, ImagePythicalLocationModel>, WanerDaoIBLL.ICommon.IImagePythicalLocationBLL
    {
        public ImagePythicalLocationBLL()
            : base("CommonSQL", "ImagePythicalLocation")
        {

        }
        public bool AddLinkNuber(string id, int number)
        {
            return DBHelper.ExecuteNonQuery(GetAddLinkNuberDbParameter(id,number));
        }
        public KeyValuePair<string, DbParameter[]> GetAddLinkNuberDbParameter(string id, int number)
        {
            Dictionary<string, object> _dic = new Dictionary<string, object>();
            _dic.Add("id", id);
            _dic.Add("number", number);
            return DBHelper.GetDBParam(ImagePythicalLocationKey.AddLinkNbr, _dic);
        }
    }
}
