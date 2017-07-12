using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
using System.IO;
using WanerDao2.WanerDaoModule.String;
using WanerDao2.WanerDaoModule.Config;

namespace WanerDao2.WanerDaoModule.Security
{
    /// <summary> 
    /// 描述：AES加密
    /// 创建者：金广亮
    /// 创建时间：2011-9-20
    /// </summary> 
    public class WanerDaoAES
    {
        //默认密钥向量
        private static byte[] Keys = { 0x41, 0x72, 0x65, 0x79, 0x6F, 0x75, 0x6D, 0x79, 0x53, 0x6E, 0x6F, 0x77, 0x6D, 0x61, 0x6E, 0x3F };
        /// <summary>
        /// 描述：AES加密
        /// 创建者：金广亮
        /// 创建时间：2011-9-20
        /// </summary>
        /// <param name="encryptString">待加密字符串</param>
        /// <returns>加密后的字符串</returns>
        public static string Encode(string encryptString)
        {
            string encryptKey = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerDaoAESSecurityKey");
            encryptKey = WanerDaoString.GetSubString(encryptKey, 32, "");
            encryptKey = encryptKey.PadRight(32, ' ');

            RijndaelManaged rijndaelProvider = new RijndaelManaged();
            rijndaelProvider.Key = Encoding.UTF8.GetBytes(encryptKey.Substring(0, 32));
            rijndaelProvider.IV = Keys;
            ICryptoTransform rijndaelEncrypt = rijndaelProvider.CreateEncryptor();

            byte[] inputData = Encoding.UTF8.GetBytes(encryptString);
            byte[] encryptedData = rijndaelEncrypt.TransformFinalBlock(inputData, 0, inputData.Length);

            return Convert.ToBase64String(encryptedData);
        }
        /// <summary>
        /// 描述：AES解密
        /// 创建者：金广亮
        /// 创建时间：2011-9-20
        /// </summary>
        /// <param name="decryptString">待解密字符串</param>
        /// <returns>成功返回解密后的字符串，否则string.Empty</returns>
        public static string Decode(string decryptString)
        {
            if (decryptString == string.Empty)
            {
                return string.Empty;
            }
            try
            {
                string decryptKey = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerDaoAESSecurityKey");
                decryptKey = WanerDaoString.GetSubString(decryptKey, 32, "");
                decryptKey = decryptKey.PadRight(32, ' ');

                RijndaelManaged rijndaelProvider = new RijndaelManaged();
                rijndaelProvider.Key = Encoding.UTF8.GetBytes(decryptKey);
                rijndaelProvider.IV = Keys;
                ICryptoTransform rijndaelDecrypt = rijndaelProvider.CreateDecryptor();

                byte[] inputData = Convert.FromBase64String(decryptString);
                byte[] decryptedData = rijndaelDecrypt.TransformFinalBlock(inputData, 0, inputData.Length);

                return Encoding.UTF8.GetString(decryptedData);
            }
            catch
            {
                return string.Empty;
            }

        }

    }

    /// <summary> 
    /// 描述：DES加密
    /// 创建者：金广亮
    /// 创建时间：2011-9-20
    /// </summary> 
    public class WanerDaoDES
    {
        //默认密钥向量
        private static byte[] Keys = { 0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF };

        /// <summary>
        /// 描述：DES加密字符串
        /// 创建者：金广亮
        /// 创建时间：2011-9-20
        /// </summary>
        /// <param name="encryptString">待加密的字符串</param>
        /// <returns>加密成功返回加密后的字符串,失败返回源串</returns>
        public static string Encode(string encryptString)
        {
            string encryptKey = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerDaoDESSecurityKey");
            encryptKey = WanerDaoString.GetSubString(encryptKey, 8, "");
            encryptKey = encryptKey.PadRight(8, ' ');
            byte[] rgbKey = Encoding.UTF8.GetBytes(encryptKey.Substring(0, 8));
            byte[] rgbIV = Keys;
            byte[] inputByteArray = Encoding.UTF8.GetBytes(encryptString);
            DESCryptoServiceProvider dCSP = new DESCryptoServiceProvider();
            MemoryStream mStream = new MemoryStream();
            CryptoStream cStream = new CryptoStream(mStream, dCSP.CreateEncryptor(rgbKey, rgbIV), CryptoStreamMode.Write);
            cStream.Write(inputByteArray, 0, inputByteArray.Length);
            cStream.FlushFinalBlock();
            return Convert.ToBase64String(mStream.ToArray());

        }
        /// <summary>
        /// 描述：DES加密字符串
        /// 创建者：金广亮
        /// 创建时间：2011-9-20
        /// </summary>
        /// <param name="encryptString">待加密的字符串</param>
        /// <param name="encryptKey">加密KEY</param>
        /// <returns>加密成功返回加密后的字符串,失败返回源串</returns>
        public static string Encode(string encryptString, string encryptKey)
        {
            encryptKey = WanerDaoString.GetSubString(encryptKey, 8, "");
            encryptKey = encryptKey.PadRight(8, ' ');
            byte[] rgbKey = Encoding.UTF8.GetBytes(encryptKey.Substring(0, 8));
            byte[] rgbIV = Keys;
            byte[] inputByteArray = Encoding.UTF8.GetBytes(encryptString);
            DESCryptoServiceProvider dCSP = new DESCryptoServiceProvider();
            MemoryStream mStream = new MemoryStream();
            CryptoStream cStream = new CryptoStream(mStream, dCSP.CreateEncryptor(rgbKey, rgbIV), CryptoStreamMode.Write);
            cStream.Write(inputByteArray, 0, inputByteArray.Length);
            cStream.FlushFinalBlock();
            return Convert.ToBase64String(mStream.ToArray());

        }
        /// <summary>
        /// 描述：DES解密字符串
        /// 创建者：金广亮
        /// 创建时间：2011-9-20
        /// </summary>
        /// <param name="decryptString">待解密的字符串</param>
        /// <returns>解密成功返回解密后的字符串,失败返源串</returns>
        public static string Decode(string decryptString)
        {
            try
            {
                string decryptKey = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerDaoDESSecurityKey");
                decryptKey = WanerDaoString.GetSubString(decryptKey, 8, "");
                decryptKey = decryptKey.PadRight(8, ' ');
                byte[] rgbKey = Encoding.UTF8.GetBytes(decryptKey);
                byte[] rgbIV = Keys;
                byte[] inputByteArray = Convert.FromBase64String(decryptString);
                DESCryptoServiceProvider DCSP = new DESCryptoServiceProvider();

                MemoryStream mStream = new MemoryStream();
                CryptoStream cStream = new CryptoStream(mStream, DCSP.CreateDecryptor(rgbKey, rgbIV), CryptoStreamMode.Write);
                cStream.Write(inputByteArray, 0, inputByteArray.Length);
                cStream.FlushFinalBlock();
                return Encoding.UTF8.GetString(mStream.ToArray());
            }
            catch
            {
                return "";
            }
        }
    }
    /// <summary>
    /// 描述：MD5加密
    /// 创建者：金广亮
    /// 创建时间：2011-9-20
    /// </summary>
    public class WanerDaoMD5
    {
        /// <summary>
        /// 描述：MD5函数
        /// 创建者：金广亮
        /// 创建时间：2011-9-20
        /// </summary>
        /// <param name="str">原始字符串</param>
        /// <returns>MD5结果</returns>
        public static string MD5(string str)
        {
            byte[] b = Encoding.UTF8.GetBytes(str);
            b = new MD5CryptoServiceProvider().ComputeHash(b);
            string ret = "";
            for (int i = 0; i < b.Length; i++)
                ret += b[i].ToString("x").PadLeft(2, '0');

            return ret;
        }
    }
    /// <summary>
    /// 描述：SHA加密
    /// 创建者：金广亮
    /// 创建时间：2011-9-21
    /// </summary>
    public class SHA
    {
        /// <summary>
        /// 描述：SHA256函数
        /// 创建者：金广亮
        /// 创建时间：2011-9-21
        /// </summary>
        /// /// <param name="str">原始字符串</param>
        /// <returns>SHA256结果</returns>
        public static string SHA256(string str)
        {
            byte[] SHA256Data = Encoding.UTF8.GetBytes(str);
            SHA256Managed Sha256 = new SHA256Managed();
            byte[] Result = Sha256.ComputeHash(SHA256Data);
            return Convert.ToBase64String(Result);  //返回长度为44字节的字符串
        }
    }
}
