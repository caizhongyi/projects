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
  /// 拼音数据缓存，将数据库中的所有汉字都缓存到内存中
  /// </summary>
  public class SpellCache
  {
    
    private static SpellCache obj_SpellCache;

    static Hashtable ht_Spell = null;
    /// <summary>
    /// 构造函数
    /// </summary>
    private SpellCache()
    {
      try
      {
        if(obj_SpellCache==null)
          init();
      }
      catch(Exception e)
      {
        obj_SpellCache = null;
      }
    }
    
    /// <summary>
    /// 获得拼音缓存的实例
    /// </summary>
    /// <returns>返回拼音缓存实例</returns>
    public static SpellCache getInstance()
    {
      if(obj_SpellCache == null)
      {
        obj_SpellCache = new SpellCache();
      }

      return obj_SpellCache;
    }

    /// <summary>
    /// 初始化所有的汉字拼音
    /// </summary>
    private void init()
    {
      OleDbDataReader rst = null;
      try
      {
          // 查询出拼音内容
          string str_SQL = Common.SELECT  + Field.WORD   + Common.COMMA +
                                            Field.SPELL  + Common.COMMA +
                                            Field.ASPELL +
                           Common.S_FROM  + Table.SPELL  +
                           Common.S_ORDER + Field.WORD;

          // 查询
          string strRet = CommonQuery.qryRst(str_SQL,ref rst);

          // 初始化 arr_Spell
          ht_Spell = new Hashtable();

          while(rst.Read())
          {
            string chr_Word = rst[Field.WORD].ToString();
            string chr_Spell = rst[Field.SPELL].ToString();
            string str_ASpell = rst[Field.ASPELL].ToString();

            ArrayList arr_Spell = new ArrayList();

            arr_Spell.Add(new string[] { chr_Word, chr_Spell, str_ASpell });

            ht_Spell.Add(chr_Word, arr_Spell);
          }
          
          rst.Close();

          General.TracePrint("缓存中已载入" + ht_Spell.Count + "个拼音");
        }
        catch(Exception e)
        {
          throw e;
        }
    }

    /// <summary>
    /// 返回缓存汉字个数
    /// </summary>
    /// <returns></returns>
    public int getCount()
    {
      return ht_Spell.Count;
    }


    public ArrayList getObject(string strWord)
    {
      return (ArrayList)ht_Spell[strWord];
    }

    /// <summary>
    /// 获得字符的拼音头
    /// </summary>
    /// <param name="chrWord">字符</param>
    /// <returns>拼音头</returns>
    public string getSpell(char chrWord)
    {
      ArrayList obj_Spell = getObject(chrWord.ToString());

      if (obj_Spell == null) return "";

      string[] str_SpellItem = (string[])obj_Spell[0];

      return str_SpellItem[1].ToString();
    }

    /// <summary>
    /// 获得字符的全拼
    /// </summary>
    /// <param name="chrWord">字符</param>
    /// <returns>全拼</returns>
    public string getASpell(char chrWord)
    {
      ArrayList obj_Spell = getObject(chrWord.ToString());

      if (obj_Spell == null) return "";

      string[] str_SpellItem = (string[])obj_Spell[0];

      return str_SpellItem[2].ToString();
    }

    /// <summary>
    /// 获得字符串的拼音头
    /// </summary>
    /// <param name="strWord">字符串</param>
    /// <returns>拼音头</returns>
    public string getSpell(string strWord)
    {
      if (strWord == null) return null;
      if (strWord.Equals("")) return null;

      char[] chr_Single = strWord.ToCharArray();

      string str_Spell = "";

      for (int i = 0; i < chr_Single.Length; i++)
      {
        str_Spell += getSpell(chr_Single[i]);
      }

      return str_Spell;
    }

    /// <summary>
    /// 获得字符串的全拼
    /// </summary>
    /// <param name="strWord">字符串</param>
    /// <returns>全拼</returns>
    public string getASpell(string strWord)
    {
      if (strWord == null) return null;
      if (strWord.Equals("")) return null;

      char[] chr_Single = strWord.ToCharArray();

      string str_ASpell = "";

      for (int i = 0; i < chr_Single.Length; i++)
      {
        str_ASpell += getASpell(chr_Single[i]);
      }

      return str_ASpell;
    }

    /// 相关拼音更新的操作，此处省略了
  }






}
