using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Amazon.S3.Model;
using Amazon.S3;
using WanerDao2WanerDaoUtility;
using WanerDao2.WanerDaoExceptionManager;
using System.Net;
using System.IO;

#region 【本类功能概述】
/* ======================================================================== *  
* 功能说明：
* 此类库封装亚马逊的云文件服务
* 作者：金广亮
* 时间：2012-3-9 0:45:18 
* 文件名：WanerDaoFileService 
* 版本：V0.0.1
* 
* 修改者： 
* 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion
namespace WanerDao2.WanerDaoFileCloudService
{
    public class WanerDaoFileService
    {

        private static AmazonS3 client = null;
        static WanerDaoFileService()
        {
            if (client == null)
            {
                client = WanerDaoMail.GetAmazonFileServer();
            }
        }
        #region 浏览
        /// <summary>
        /// 描述：列出bucket表
        /// 作者：金广亮
        /// 时间：2012-3-9 1:13:30
        /// </summary>
        /// <returns>如果亚马逊云文件服务器有值返回列表，否则返回null</returns>
        public static List<S3Bucket> GetBucketsList()
        {
            List<S3Bucket> response = null;
            try
            {
                ListBucketsResponse resp = client.ListBuckets();
                if (resp != null)
                {
                    response = resp.Buckets;
                }
                WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 获取云服务器上面的文件列表", WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null &&
                    (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") ||
                    amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 出错信息：Please check the provided AWS Credentials.", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
                else
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 错误代码:" + amazonS3Exception.ErrorCode, WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
            }
            return response;
        }
        /// <summary>
        /// 描述：列出bucket表
        /// 作者：金广亮
        /// 时间：2012-3-9 1:22:31
        /// </summary>
        /// <param name="request">发出获取bucket表的请求</param>
        /// <returns>如果亚马逊云文件服务器有值返回列表，否则返回null</returns>
        public static List<S3Bucket> GetBucketsList(ListBucketsRequest request)
        {
            List<S3Bucket> response = null;
            try
            {
                ListBucketsResponse resp = client.ListBuckets(request);
                if (resp != null)
                {
                    response = resp.Buckets;
                }
                WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 获取云服务器上面的文件列表", WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null &&
                    (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") ||
                    amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 出错信息：Please check the provided AWS Credentials.", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
                else
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 错误代码:" + amazonS3Exception.ErrorCode, WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
            }
            return response;
        }
        #endregion

        #region 创建桶表
        /// <summary>
        /// 描述：创建一般的桶表
        /// 作者：金广亮
        /// 时间：2012-3-9
        /// </summary>
        /// <param name="bucketName">桶名</param>
        /// <returns>成功返回true，否则false</returns>
        public static bool CreateBucket(string bucketName)
        {
            bool flg = true;
            try
            {
                if (!IsExistBucket(bucketName))
                {
                    PutBucketRequest request = new PutBucketRequest();
                    request.BucketName = bucketName;
                    PutBucketResponse response = client.PutBucket(request);
                }
                WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 创建云服务器上面的桶表", WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                flg = false;
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 出错信息：Please check the provided AWS Credentials.", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
                else
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 错误代码:" + amazonS3Exception.ErrorCode, WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
            }
            return flg;
        }
        /// <summary>
        /// 描述：创建具有策略的桶表
        /// 作者：金广亮
        /// 时间：2012-3-9
        /// </summary>
        /// <param name="bucketName">桶名</param>
        /// <param name="policy">策略</param>
        /// <returns>成功返回true，否则false</returns>
        public static bool CreateBucket(string bucketName, string policy)
        {
            bool flg = true;
            try
            {
                if (!IsExistBucket(bucketName))
                {
                    PutBucketPolicyRequest request = new PutBucketPolicyRequest();
                    request.BucketName = bucketName;
                    request.Policy = policy;
                    PutBucketPolicyResponse response = client.PutBucketPolicy(request);
                }
                WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 创建云服务器上面的策略桶表", WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                flg = false;
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 出错信息：Please check the provided AWS Credentials.", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
                else
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 错误代码:" + amazonS3Exception.ErrorCode, WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
            }
            return flg;
        }
        /// <summary>
        /// 描述：创建网站的桶表
        /// 作者：金广亮
        /// 时间：2012-3-9
        /// </summary>
        /// <param name="bucketName">桶名</param>
        /// <param name="errorDocument">错误文档</param>
        /// <param name="indexDocumentSuffix">索引文档</param>
        /// <returns>成功返回true，否则false</returns>
        public static bool CreateBucket(string bucketName, string errorDocument, string indexDocumentSuffix)
        {
            bool flg = true;
            try
            {
                if (!IsExistBucket(bucketName))
                {
                    PutBucketWebsiteRequest request = new PutBucketWebsiteRequest();
                    request.BucketName = bucketName;
                    request.WebsiteConfiguration = new WebsiteConfiguration() { ErrorDocument = errorDocument, IndexDocumentSuffix = indexDocumentSuffix };
                    PutBucketWebsiteResponse response = client.PutBucketWebsite(request);
                }
                WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 创建云服务器上面的网站桶表", WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                flg = false;
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 出错信息：Please check the provided AWS Credentials.", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
                else
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 错误代码:" + amazonS3Exception.ErrorCode, WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
            }
            return flg;
        }
        #endregion

        #region 写入内容
        /// <summary>
        /// 描述:写入简单信息到桶表里
        /// </summary>
        /// <param name="bucketName">桶表</param>
        /// <param name="keyName">文件名等关键字</param>
        /// <param name="content">内容体</param>
        public static void WriteObject(PutObjectRequest request)
        {
            try
            {
                S3Response response = client.PutObject(request);
                response.Dispose();
                WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 创建云服务器上面桶表的内容", WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 出错信息：Please check the provided AWS Credentials.", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
                else
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 错误信息: An error occurred with the message " + amazonS3Exception.Message + " when writing an object", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
            }
        }
        //public static void WriteObject(string bucketName, string keyName, string content, Stream stream)
        //{
        //    try
        //    {
        //        // simple object put
        //        PutObjectRequest request = new PutObjectRequest();
        //        request.WithAutoCloseStream(true).WithContentBody(content)
        //            .WithBucketName(bucketName)
        //            .WithKey(keyName)
        //            .WithServerSideEncryptionMethod(ServerSideEncryptionMethod.AES256)
        //            .WithInputStream(stream);
        //        S3Response response = client.PutObject(request);
        //        response.Dispose();
        //        WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 创建云服务器上面桶表的内容", WanerDaoLog4Net.LogMessageType.Info);
        //    }
        //    catch (AmazonS3Exception amazonS3Exception)
        //    {
        //        if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
        //        {
        //            WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 出错信息：Please check the provided AWS Credentials.", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
        //        }
        //        else
        //        {
        //            WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 错误信息: An error occurred with the message " + amazonS3Exception.Message + " when writing an object", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
        //        }
        //    }
        //}

        //public static void WriteObject(string bucketName, string keyName, string content, Stream stream,string filePath)
        //{
        //    try
        //    {
        //        // simple object put
        //        PutObjectRequest request = new PutObjectRequest();
        //        request.WithAutoCloseStream(true)
        //            .WithContentBody(content)
        //            .WithFilePath(filePath)
        //            .WithBucketName(bucketName)
        //            .WithKey(keyName)
        //            .WithServerSideEncryptionMethod(ServerSideEncryptionMethod.AES256)
        //            .WithInputStream(stream);
        //        S3Response response = client.PutObject(request);
        //        response.Dispose();
        //        WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 创建云服务器上面桶表的内容", WanerDaoLog4Net.LogMessageType.Info);
        //    }
        //    catch (AmazonS3Exception amazonS3Exception)
        //    {
        //        if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
        //        {
        //            WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 出错信息：Please check the provided AWS Credentials.", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
        //        }
        //        else
        //        {
        //            WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 错误信息: An error occurred with the message " + amazonS3Exception.Message + " when writing an object", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
        //        }
        //    }
        //}
        //public static void WriteObject(string bucketName, string keyName, string content, Stream stream, string filePath,string metaKeyData, string metaValueData)
        //{
        //    try
        //    {
        //        // simple object put
        //        PutObjectRequest request = new PutObjectRequest();
        //        request.WithAutoCloseStream(true)
        //            .WithContentBody(content)
        //            .WithFilePath(filePath)
        //            .WithBucketName(bucketName)
        //            .WithKey(keyName)
        //            .WithMetaData(metaKeyData,metaValueData)
        //            .WithServerSideEncryptionMethod(ServerSideEncryptionMethod.AES256)
        //            .WithInputStream(stream);
        //        S3Response response = client.PutObject(request);
        //        response.Dispose();
        //        WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 创建云服务器上面桶表的内容", WanerDaoLog4Net.LogMessageType.Info);
        //    }
        //    catch (AmazonS3Exception amazonS3Exception)
        //    {
        //        if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
        //        {
        //            WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 出错信息：Please check the provided AWS Credentials.", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
        //        }
        //        else
        //        {
        //            WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 错误信息: An error occurred with the message " + amazonS3Exception.Message + " when writing an object", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
        //        }
        //    }
        //}
        #endregion

        #region 读取内容
        public static GetObjectResponse ReadObject(GetObjectRequest request)
        {
            GetObjectResponse response = null;
            try
            {
                response = client.GetObject(request);
                WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 读取云服务器上面桶表的内容", WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 出错信息：Please check the provided AWS Credentials.", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
                else
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 错误信息: An error occurred with the message " + amazonS3Exception.Message + " when reading an object", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
            }
            return response;
        }
        #endregion

        #region 删除内容
        public static void DeleteObject(DeleteObjectRequest request)
        {
            try
            {
                using (DeleteObjectResponse response = client.DeleteObject(request))
                {
                }
                WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 删除云服务器上面桶表的内容", WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 出错信息：Please check the provided AWS Credentials.", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
                else
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 错误信息: An error occurred with the message " + amazonS3Exception.Message + " when deleting an object", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
            }
        }
        #endregion

        #region 列举已写入的内容
        public static ListObjectsResponse GetObjects(ListObjectsRequest request)
        {
            ListObjectsResponse response = null;
            try
            {
                response = client.ListObjects(request);
                WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 列举云服务器上面桶表的内容", WanerDaoLog4Net.LogMessageType.Info);
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 出错信息：Please check the provided AWS Credentials.", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
                else
                {
                    WanerDaoLog4Net.Write("调用亚马逊云文件服务器时间：" + DateTime.Now.ToShortDateString() + " 错误信息: An error occurred with the message " + amazonS3Exception.Message + " when listing an object", WanerDaoLog4Net.LogMessageType.Error, amazonS3Exception);
                }
            }
            return response;
        }
        #endregion
        #region 私有函数
        private static bool IsExistBucket(string bucketName)
        {
            bool flg = false;
            List<S3Bucket> list = GetBucketsList();
            foreach (S3Bucket bucket in list)
            {
                if (bucket.BucketName == bucketName)
                {
                    flg = true;
                    break;
                }
            }
            return flg;
        }
        #endregion
    }
}
