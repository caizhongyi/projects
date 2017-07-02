using System;
using System.Xml;
using System.Data;
using System.Data.OleDb;
using System.Collections;
using Efsframe.cn.db;
using Efsframe.cn.declare;
using Efsframe.cn.func;

namespace Efsframe.cn.baseCls
{
  /// <summary>
  /// 字典缓存类
  /// </summary>
  public class DicCache
  {
    /// <summary>
    /// 私有类对象
    /// </summary>
    private static DicCache m_obj_DicCache;
    /// <summary>
    /// 利用hastable缓存字典
    /// </summary>
    private static Hashtable m_htb_Dic;

    /// <summary>
    /// 字典路径
    /// </summary>
    private static string m_str_DicPath = "";

    public DicCache()
    {
      try
      {
        if (m_obj_DicCache == null)
          init();
      }
      catch (Exception e)
      {
        m_obj_DicCache = null;
      }
    }

    /// <summary>
    /// 获得字典缓存的实例
    /// </summary>
    /// <returns>字典缓存的实例</returns>
    public static DicCache getInstance()
    {
      if (m_obj_DicCache==null)
      {
        m_obj_DicCache = new DicCache();
      }

      return m_obj_DicCache;
    }

    /// <summary>
    /// 设置字典文件保存的路径
    /// </summary>
    /// <param name="strPath">字典文件保存的路径</param>
    public void setDicPath(string strPath)
    {
      m_str_DicPath = strPath;
    }

    public string getDicPath()
    {
      return m_str_DicPath;
    }

    /// <summary>
    /// 初始化所有字典数据，进行数据缓存
    /// </summary>
    private void init()
    {
      OleDbDataReader rst = null;
      try
      {
        m_htb_Dic = new Hashtable();

        /// 首先查询出所有字典的名称
        string str_SQL = Common.SELECT + Field.DICNAME +
                         Common.S_FROM + Table.DICLIST;
        if (CommonQuery.qryRst(str_SQL, ref rst) == "0")
        {
          while (rst.Read())
          {
            refresh(rst[Field.DICNAME].ToString());
          }
        }
        rst.Close();

        /// 载入系统特殊字典
        refresh(Table.MANAGEUNIT);
        refresh(Table.AFFAIRTYPE);
        refresh(Table.EVENTTYPE);
        refresh(Table.USERLIST);


      }
      catch (Exception e)
      {

      }
      finally
      {
      }
     
    }

    /// <summary>
    /// 对单个量表进行数据缓存，放入hastable中
    /// </summary>
    /// <param name="strDicName">字典名称</param>
    public void refresh(String strDicName)
    {
      /// 组织查询字典的 SQL 语句
      string str_SQL = "";

      /// 对系统特殊字典进行处理
      if (strDicName.Equals(Table.MANAGEUNIT))
      {
        str_SQL = Common.SELECT + Field.MUNITID + Common.SPACE + Field.DIC_CODE + Common.COMMA +
                                   Field.MUNITNAME + Common.SPACE + Field.DIC_TEXT + Common.COMMA +
                                   Field.VALID + Common.SPACE + Field.DIC_VALID +
                  Common.S_FROM + Table.MANAGEUNIT +
                  Common.S_WHERE + Field.MTYPE + Common.N_EQUAL + General.addQuotes(Common.USERTYPE_SP) +
                  Common.S_ORDER + Field.MUNITID;
      }
      else if (strDicName.Equals(Table.AFFAIRTYPE))
        str_SQL = Common.SELECT + Field.AFFAIRTYPEID + Common.SPACE + Field.DIC_CODE + Common.COMMA +
                                   Field.AFFAIRTYPENAME + Common.SPACE + Field.DIC_TEXT + Common.COMMA +
                                  General.addQuotes(Common.FLG_TRUE) + Common.SPACE + Field.DIC_VALID +
                  Common.S_FROM + Table.AFFAIRTYPE +
                  Common.S_ORDER + Field.AFFAIRTYPEID;

      else if (strDicName.Equals(Table.EVENTTYPE))
        str_SQL = Common.SELECT + Field.EVENTTYPEID + Common.SPACE + Field.DIC_CODE + Common.COMMA +
                                   Field.EVENTTYPENAME + Common.SPACE + Field.DIC_TEXT + Common.COMMA +
                                   General.addQuotes(Common.FLG_TRUE) + Common.SPACE + Field.DIC_VALID +
                  Common.S_FROM + Table.EVENTTYPE +
                  Common.S_ORDER + Field.EVENTTYPEID;

      else if (strDicName.Equals(Table.USERLIST))
        str_SQL = Common.SELECT + Field.USERID + Common.SPACE + Field.DIC_CODE + Common.COMMA +
                                  Field.USERNAME + Common.SPACE + Field.DIC_TEXT + Common.COMMA +
                                  General.addQuotes(Common.FLG_TRUE) + Common.SPACE + Field.DIC_VALID +
                  Common.S_FROM + Table.USERLIST +
                  Common.S_WHERE + Field.USERTYPE + Common.NOT_IN + General.addBracket(Common.FLG_TRUE + Common.COMMA + Common.FLG_FALSE) +
                  Common.S_ORDER + Field.USERID;
      else
        str_SQL = Common.SELECT + Field.DIC_CODE + Common.COMMA +
                                   Field.DIC_TEXT + Common.COMMA +
                                   Field.DIC_VALID +
                  Common.S_FROM + Table.DICDATA +
                  Common.S_WHERE + Field.DICNAME + Common.EQUAL + General.addQuotes(strDicName) +
                  Common.S_ORDER + Field.DIC_CODE;

      OleDbDataReader rst = null;
      if (CommonQuery.qryRst(str_SQL, ref rst) == "0")
      {
        ArrayList arr_DicContent = new ArrayList();
        while (rst.Read())
        {
          string str_DicCode = rst[Field.DIC_CODE].ToString();
          string str_DicText = rst[Field.DIC_TEXT].ToString();
          string str_DicVaild = rst[Field.DIC_VALID].ToString();

          arr_DicContent.Add(new string[] { str_DicCode, str_DicText, str_DicVaild });

        }
        
        // 先删除，避免重复刷新错误
        m_htb_Dic.Remove(strDicName);

        m_htb_Dic.Add(strDicName, arr_DicContent);
        General.TracePrint("已将[" + strDicName + "]字典载入到缓存中");
      }
      rst.Close();

    }

    /// <summary>
    /// 根据指定字典名称获得字典缓存对象
    /// </summary>
    /// <param name="strDicName">字典名称</param>
    /// <returns>字典数组</returns>
    public ArrayList getDicByName(string strDicName)
    {
      return (ArrayList)m_htb_Dic[strDicName];
    }


    /// <summary>
    /// 获得指定字典中的字典内容对应的字典编码
    /// </summary>
    /// <param name="strDicName">字典名称</param>
    /// <param name="strDicText">字典内容</param>
    /// <returns>字典编码</returns>
    public string getCode(string strDicName, string strDicText)
    {
      ArrayList arr_DicContent = (ArrayList)m_htb_Dic[strDicName];

      /// 发现指定的字典名称并不存在
      if (arr_DicContent==null)
        return null;

      foreach (object dicObj in arr_DicContent)
      {
        string[] str_DicItem = (string[])dicObj;

        if (strDicText == str_DicItem[1])
        {
          return str_DicItem[0];
        }
      }
      /// 未查找到对应字典内容
      return null;
    }

    /// <summary>
    /// 获得指定字典中的字典编码对应的字典内容
    /// </summary>
    /// <param name="strDicName">字典名称</param>
    /// <param name="strDicCode">字典编码</param>
    /// <returns>字典内容</returns>
    public String getText(String strDicName, String strDicCode)
    {
      ArrayList arr_DicContent = (ArrayList)m_htb_Dic[strDicName];

      /// 发现指定的字典名称并不存在
      if (arr_DicContent == null)
        return null;

      foreach (object dicObj in arr_DicContent)
      {
        string[] str_DicItem = (string[])dicObj;

        if (strDicCode == str_DicItem[0])
        {
          return str_DicItem[1];
        }
      }
      /// 未查找到对应字典内容
      return null;
    }

    /// <summary>
    /// 生成字典文件
    /// </summary>
    /// <param name="dicname">字典名称</param>
    public void createDicFile(string dicname)
    {
      //先刷新字典缓存
      this.refresh(dicname);

      string strXML = Common.XML_HEADINFO + "<data/>";
      XmlDocument doc = new XmlDocument();
      doc.LoadXml(strXML);

      ArrayList arr_DicContent = (ArrayList)m_htb_Dic[dicname];

      SpellCache spellcache = SpellCache.getInstance();

      foreach (object dicObj in arr_DicContent)
      {
        string[] str_DicItem = (string[])dicObj;
        string sCode  = str_DicItem[0];
        string sText  = str_DicItem[1];
        string sValid = str_DicItem[2];

        // 从拼音缓存中做拼音翻译
        string spell = spellcache.getSpell(sText);
        string aspell = spellcache.getASpell(sText);

        // 拼音翻译
        // Spell.getAllSpell(sText, ref spell, ref aspell);

        if (sValid.Equals("1"))
        {
          XmlElement el = doc.CreateElement("row");
          doc.DocumentElement.AppendChild(el);
          el.SetAttribute(Field.DIC_CODE, sCode);
          el.SetAttribute(Field.DIC_TEXT, sText);
          el.SetAttribute(Field.DIC_SPELL, spell);
          el.SetAttribute(Field.DIC_ASPELL, aspell);

          el = null;
        }

      }

      string sPath = getDicPath() + "\\" + dicname + ".xml";

      doc.Save(sPath);
    }


    /// <summary>
    /// 根据表结构需要动态创建字典
    /// </summary>
    /// <param name="dicname">字典名称</param>
    /// <param name="sql">查询sql语句
    /// （如：select gid,gname from gtable order by gid）
    /// select语句只需要查询出编码和描述就可以了
    /// </param>
    public void createDicFile(string dicname,string sql)
    {
        OleDbDataReader rst = null;
        int rs_open = 0;
        if (CommonQuery.qryRst(sql, ref rst) == "0")
        {
            rs_open = 1;
            SpellCache spellcache = SpellCache.getInstance();
            string strXML = Common.XML_HEADINFO + "<data/>";
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(strXML);

            while (rst.Read())
            {
                string str_DicCode = rst[0].ToString();
                string str_DicText = rst[1].ToString();

                // 从拼音缓存中做拼音翻译
                string spell = spellcache.getSpell(str_DicText);
                string aspell = spellcache.getASpell(str_DicText);

                XmlElement el = doc.CreateElement("row");
                doc.DocumentElement.AppendChild(el);
                el.SetAttribute(Field.DIC_CODE, str_DicCode);
                el.SetAttribute(Field.DIC_TEXT, str_DicText);
                el.SetAttribute(Field.DIC_SPELL, spell);
                el.SetAttribute(Field.DIC_ASPELL, aspell);

                el = null;
            }
            string sPath = getDicPath() + "\\" + dicname + ".xml";

            doc.Save(sPath);
        }
        if (rs_open == 1)
          rst.Close();
    }

  }
}
