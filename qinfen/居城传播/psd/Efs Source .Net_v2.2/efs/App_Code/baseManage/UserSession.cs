using System;
using System.Xml;
using System.Data.OleDb;
using Efsframe.cn.func;
using Efsframe.cn.baseCls;
using Efsframe.cn.db;
using Efsframe.cn.declare;

namespace Efsframe.cn.baseManage
{
  /// <summary>
  /// 登陆用户Session对象类
  /// </summary>
  public class UserSession
  {
    private string UserID;
    private string UserTitle;
    private string UserName;
    private string UnitID;
    private string UnitName;
    private string MType;
    private string UserType;
    private string LogID;


    public UserSession(string strXml)
    {
      
      try
      {
        XmlDocument doc = XmlFun.CreateNewDoc(strXml);
        
        this.setUserID(doc.SelectSingleNode("//QUERYINFO/ROW/USERID").InnerText);
        this.setUserTitle(doc.SelectSingleNode("//QUERYINFO/ROW/USERTITLE").InnerText);
        this.setUserName(doc.SelectSingleNode("//QUERYINFO/ROW/USERNAME").InnerText);
        this.setUnitID(doc.SelectSingleNode("//QUERYINFO/ROW/UNITID").InnerText);
        this.setUnitName(doc.SelectSingleNode("//QUERYINFO/ROW/UNITNAME").InnerText);
        this.setMType(doc.SelectSingleNode("//QUERYINFO/ROW/MTYPE").InnerText);
        this.setUserType(doc.SelectSingleNode("//QUERYINFO/ROW/USERTYPE").InnerText);
      }
      catch(Exception ex)
      {
        General.TracePrint("LoginUser.Error.001:" + ex.Message);
      }
    }

    public string getUserID()
    {
      return this.UserID;
    }

    private void setUserID(string sUserID)
    {
      this.UserID = sUserID;
    }


    public string getUserTitle()
    {
      return this.UserTitle;
    }

    private void setUserTitle(string sUserTitle)
    {
      this.UserTitle = sUserTitle;
    }

    public string getUserName()
    {
      return this.UserName;
    }

    private void setUserName(string sUserName)
    {
      this.UserName = sUserName;
    }

    public string getUnitID()
    {
      return this.UnitID;
    }

    private void setUnitID(string sUnitID)
    {
      this.UnitID = sUnitID;
    }

    public string getUnitName()
    {
      return this.UnitName;
    }

    private void setUnitName(string sUnitName)
    {
      this.UnitName = sUnitName;
    }

    public string getMType()
    {
      return this.MType;
    }

    private void setMType(string sMType)
    {
      this.MType = sMType;
    }

    public string getUserType()
    {
      return this.UserType;
    }

    private void setUserType(string sUserType)
    {
      this.UserType = sUserType;
    }


    public string getLogID()
    {
      return this.LogID;
    }

    public void setLogID(string sLogID)
    {
      this.LogID = sLogID;
    }

    public string getUserRightsByUserID()
    {
      /// 查询出该用户的权限信息
      string str_SQL = Common.SELECT + Common.DISTINCT + Common.ALL +
                       Common.S_FROM + Table.VW_USERRIGHTTREE +
                       Common.S_WHERE + Field.USERID + Common.EQUAL + General.addQuotes(this.getUserID()) +
                       Common.S_ORDER + Field.AFFAIRTYPEID + Common.COMMA + Field.EVENTTYPEID;


      OleDbDataReader rst_UserRight = null;
      try
      {
        string strRet = CommonQuery.qryRst(str_SQL,ref rst_UserRight);

        if (strRet != "0")
        {
          throw new Exception("获得用户权限失败");
        }

        string str_PreAffairTypeID = "";
        string str_PreEventTypeID = "";

        ReturnDoc doc_RightTree = new ReturnDoc();

        XmlDocument doc_tmp = doc_RightTree.getDocument();

        XmlElement ele_Root = null;
        XmlElement ele_Query = null;
        XmlElement ele_AffairType = null;

        /// 对结果集进行遍历，用来生成功能树
        while (rst_UserRight.Read())
        {
          /// 创建查询返回节点
          if (!doc_RightTree.createQueryInfoNode())
          {
            throw new Exception("UserCache.setUserRightsByUserID.创建查询返回节点时发生错误");
          } /// if (!doc_RightTree.createQueryInfoNode())

          ele_Root = ele_Root == null ? (XmlElement)doc_RightTree.getQueryInfoNode() : ele_Root;

          string str_AffairTypeID = rst_UserRight[Field.AFFAIRTYPEID].ToString();
          string str_AffairTypeName = rst_UserRight[Field.AFFAIRTYPENAME].ToString();
          string str_EventTypeID = rst_UserRight[Field.EVENTTYPEID].ToString();
          string str_EventTypeName = rst_UserRight[Field.EVENTTYPENAME].ToString();
          string str_OpURL = rst_UserRight[Field.OPURL].ToString();

          int int_AffairTypeID = Convert.ToInt32(str_AffairTypeID);

          XmlElement ele_EventType = null;

          /// 查询事务
          if (int_AffairTypeID == 4)
          {
            ele_AffairType = doc_tmp.CreateElement(Common.XDOC_OPERATION);
            ele_AffairType.SetAttribute(Common.XML_PROP_AFFAIRTYPEID, str_AffairTypeID);
            ele_AffairType.SetAttribute(Common.XML_PROP_NAME, str_AffairTypeName);

            ele_Query = ele_AffairType;
            ele_Root.AppendChild(ele_AffairType);
          } /// if (int_AffairTypeID==4)
          else
          {
            if (!str_PreAffairTypeID.EndsWith(str_AffairTypeID))
            {
              ele_AffairType = doc_tmp.CreateElement(Table.AFFAIRTYPE);
              ele_AffairType.SetAttribute(Common.XML_PROP_AFFAIRTYPEID, str_AffairTypeID);
              ele_AffairType.SetAttribute(Common.XML_PROP_TEXT, str_AffairTypeName);

              str_PreAffairTypeID = str_AffairTypeID;
              ele_Root.AppendChild(ele_AffairType);
            }
          }

          /// 相同的事件类型，则不用重复创建
          if (!str_PreEventTypeID.Equals(str_EventTypeID))
          {
            ele_EventType = doc_tmp.CreateElement(Table.EVENTTYPE);
            ele_EventType.SetAttribute(Common.XML_PROP_EVENTTYPEID, str_EventTypeID);
            ele_EventType.SetAttribute(Common.XML_PROP_TEXT, str_EventTypeName);
            ele_EventType.SetAttribute(Common.XML_PROP_OPURL, str_OpURL);
            ele_AffairType.AppendChild(ele_EventType);
            str_PreEventTypeID = str_EventTypeID;
          } /// if (!str_PreEventTypeID.equals(str_EventTypeID))
        } /// while (rst_UserRight.next())



        /// 将查询事务节点，追加到权限功能树的最后
        if (ele_Query != null)
        {
          XmlElement ele_TempQuery = (XmlElement)ele_Query.Clone();
          XmlElement ele_QueryInfo = (XmlElement)doc_RightTree.getQueryInfoNode();
          ele_QueryInfo.RemoveChild(ele_Query);
          ele_QueryInfo.AppendChild(ele_TempQuery);
        } /// if (ele_Query!=null)

        if (!doc_RightTree.addErrorResult(Common.RT_QUERY_SUCCESS))
        {
          throw new Exception("添加函数返回结果失败");
        } /// if (!doc_RightTree.addErrorResult(Common.RT_QUERY_SUCCESS))

        return doc_RightTree.getXml();
      }
      catch (Exception e)
      {
        return e.Message;
      }
      finally
      {
        rst_UserRight.Close();
      }
    }

  }
}
