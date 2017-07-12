using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Schema;
using System.Xml;
using System.Collections;
using WanerDao2.WanerDaoCacheManager;
using WanerDao2.WanerDaoModule.Config;

namespace WanerDao2.WanerDaoModule.XML
{
    public class WanerDaoXml
    {
        private static XmlSchemaSet schemaCollection = new XmlSchemaSet();
		/// <summary>
		/// Constructor for WanerDaoXml
		/// </summary>
        static WanerDaoXml()
		{
		}

		/// <summary>
		/// Function to validate an xml file based on the schema file (.xsd file)
		/// </summary>
		/// <param name="schema">Schema (.xsd) file</param>
		/// <param name="xmlFile">XML file to be validated</param>
		/// <returns>If error, return -1, otherwise return 0</returns>
		/// <exception>
		/// 1.	If input param "schema" is null or "", throw application exception.
		/// 2.	If input param "xmlFile" is null or "", throw application exception.
		/// </exception>
		public static int ValidateSchema(string schema, string xmlFile)
		{
			int result = -1;
			//XmlValidatingReader reader = null; 
            XmlReader reader = null;//VT2007Feb28
			XmlTextReader schemaReader = null;
			string path = "";
			
			if (schema == null || schema == "")
				throw new ApplicationException("WanerDaoXml: Schema is null or has no value");
			
			if (xmlFile == null || xmlFile == "")
				throw new ApplicationException("WanerDaoXml: XML file is null or has no value");

			if (xmlFile.LastIndexOf('/') >0 )
				path = xmlFile.Substring(0, xmlFile.LastIndexOf('/') + 1);
			else if (xmlFile.LastIndexOf('\\') > 0)
				path = xmlFile.Substring(0, xmlFile.LastIndexOf('\\') + 1);

			try 
			{
				if (!schemaCollection.Contains(schema))
				{
					schemaReader = new XmlTextReader(path + schema);
					schemaCollection.Add(schema, schemaReader);
				}

				//reader = new XmlValidatingReader(new XmlTextReader(xmlFile));
                //reader.Schemas.Add(schemaCollection);
                //reader.ValidationType = ValidationType.Schema;//VT2007Feb28
                XmlReaderSettings readerSet = new XmlReaderSettings();
                readerSet.Schemas.Add(schemaCollection);
                readerSet.ValidationType = ValidationType.Schema;
                readerSet.ProhibitDtd = false; //VT2007Mar27
                reader = XmlReader.Create(xmlFile, readerSet);
				
				while (reader.Read())
				{}

				result = 0;
			}
			finally
			{
				if (reader != null) 
					reader.Close();
				if (schemaReader != null) 
					schemaReader.Close();
			}

			return result;
		}


		/// <summary>
		/// Return a list of attributes for specified node, and kept in hashtable.
		/// key in hashtable is the attribute name and value in hashtable is the attribute value.
		/// </summary>
		/// <param name="node">specified xmlnode</param>
		/// <returns>hashtable containing all the attributes</returns>
		/// <exception>If input param "node" is null, throw application exception</exception>
		public static Hashtable GetAttribute(XmlNode node)
		{
			
			if (node == null)
				throw new ApplicationException("WanerDaoXml: XML node is null");

			Hashtable attributeValueList = new Hashtable();

			for(int i=0; i<node.Attributes.Count; i++)
			{
				attributeValueList.Add(node.Attributes[i].Name, node.Attributes[i].Value);
			}
 
			return attributeValueList;
		}

		/// <summary>
		/// Return an attribute value as a string for specified node and attribute name
		/// </summary>
		/// <param name="node">specified xmlnode</param>
		/// <param name="attributeName">specified attribute name</param>
		/// <returns>attribute value</returns>
		/// <exception>
		/// 1.	If input param "node" is null, throw application exception.
		/// 2.	If input param "attributeName" is null, throw application exception.
		/// </exception>
		public static string GetAttribute(XmlNode node, string attributeName)
		{
			string attributeValue;

			
			if (node == null)
				throw new ApplicationException("WanerDaoXml: XML node is null");
			
			if (attributeName == null)
				throw new ApplicationException("WanerDaoXml: Attribute name is null");

			try 
			{
				attributeValue = node.Attributes[attributeName].Value;
			}
			catch
			{
				attributeValue = "";
			}

			return attributeValue;
		}

		/// <summary>
		/// return text of specified node. which is actually the child node's innertext.
		/// </summary>
		/// <param name="node">specified xmlnode</param>
		/// <returns>node text</returns>
		/// <exception>If input param "node" is null, throw application exception</exception>
		public static string GetNodeValue(XmlNode node)
		{
			string nodeValue;
			XmlNodeList childList;

			
			if (node == null)
				throw new ApplicationException("WanerDaoXml: XML node is null");

			try
			{
				nodeValue = "";
				childList = node.ChildNodes;
				foreach (XmlNode child in childList)
				{
					if (child.NodeType.ToString()=="Text")
						nodeValue = child.InnerText.Trim();
				}
			}
			catch 
			{
				nodeValue = "";
			}

			return nodeValue;
		}

		/// <summary>
		/// return text based on specified node and path. using selectSingleNode method on the specified node.
		/// </summary>
		/// <param name="node">specified node</param>
		/// <param name="xmlPath">path</param>
		/// <returns>node text</returns>
		/// <example>
		///		string str = GetNodeValue(aNode, "//nmsp:SQL"); //To get SQL node
		///		XPath Reference: http://www.zvon.org/xxl/XPathTutorial/General/examples.html
		/// </example>
		public static string GetNodeValue(XmlNode node, string xmlPath)
		{
			if (node.NamespaceURI == "")
				return GetNodeValue(node, xmlPath, null);
			else
			{
				XmlNamespaceManager nsmgr = new XmlNamespaceManager(new NameTable());
				return GetNodeValue(node, xmlPath, nsmgr);
			}
		}

		/// <summary>
		/// Return text based on specified node and path. using selectSingleNode method on the specified node.
		/// This methods allows to pass in the namespace manager so that it can be reused.
		/// If the node contains NamespaceURI, 
		/// that means the node has applied a schema and required an XPath format to get value.
		/// </summary>
		/// <param name="node">specified node</param>
		/// <param name="xmlPath">path</param>
		/// <param name="nsmgr">Namespace manager</param>
		/// <returns>
		/// (1)	Returns node text if successful.
		/// (2)	If getting node text has exception, return "".
		/// </returns>
		/// <exception>
		/// 1.	If input param "node" is null, throw application exception.
		/// 2.	If input param "xmlPath" is null, throw applicaiton exception.
		/// </exception>
		/// <example>
		///		string str = GetNodeValue(aNode, "//nmsp:SQL", nsmgr); //To get SQL node
		///		XPath Reference: http://www.zvon.org/xxl/XPathTutorial/General/examples.html
		/// </example>
		public static string GetNodeValue(XmlNode node, string xmlPath, XmlNamespaceManager nsmgr)
		{
			string nodeValue;
			XmlNodeList childList;
			XmlNode targetNode;

			
			if (node == null)
				throw new ApplicationException("WanerDaoXml: XML node is null");
			
			if (xmlPath == null)
				throw new ApplicationException("WanerDaoXml: XML path is null");

			if (node.NamespaceURI == "")
				targetNode = node.SelectSingleNode(xmlPath);
			else
			{
				nsmgr.AddNamespace("nmsp", node.NamespaceURI);

				string[] tmp = xmlPath.Split('/');
				string xmlpt = "/";
				foreach(string str in tmp)
					xmlpt = xmlpt + "/nmsp:" + str;
				targetNode = node.SelectSingleNode(xmlpt, nsmgr);				
			}

			try
			{
				nodeValue = "";
				childList = targetNode.ChildNodes;
				foreach (XmlNode child in childList)
				{
					if (child.NodeType.ToString()=="Text")
						nodeValue = child.InnerText.Trim();
				}
			}
			catch 
			{
				nodeValue = "";
			}

			return nodeValue;
		}

		/// <summary>
		/// return arraylist to hold multiple node text based on specified node and path.
		/// instead of using selectSingleNode, this fuction is actually using SelectNodes method
		/// </summary>
		/// <param name="node">specified node</param>
		/// <param name="xmlPath">path</param>
		/// <returns>ArrayList to hold multiple subnode text</returns>
		/// <example>
		///		string str = GetNodeValue(aNode, "//nmsp:SQL"); //To get SQL node
		///		XPath Reference: http://www.zvon.org/xxl/XPathTutorial/General/examples.html
		/// </example>
		public static ArrayList GetNodeValues(XmlNode node, string xmlPath)
		{
			if (node.NamespaceURI == "")
				return GetNodeValues(node, xmlPath, null);
			else
			{
				XmlNamespaceManager nsmgr = new XmlNamespaceManager(new NameTable());
				return GetNodeValues(node, xmlPath, nsmgr);
			}
		}

		/// <summary>
		/// return arraylist to hold multiple node text based on specified node and path.
		/// instead of using selectSingleNode, this fuction is actually using SelectNodes method
		/// This methods allows to pass in the namespace manager so that it can be reused.
		/// If the node contains NamespaceURI, 
		/// that means the node has applied a schema and required an XPath format to get value.
		/// </summary>
		/// <param name="node">specified node</param>
		/// <param name="xmlPath">path</param>
		/// <param name="nsmgr">Namespace manager</param>
		/// <returns>ArrayList to hold multiple subnode text</returns>
		/// <exception>
		/// 1.	If input param "node" is null, throw application exception.
		/// 2.	If input param "xmlPath" is null, throw applicaiton exception.
		/// </exception>
		/// <example>
		///		string str = GetNodeValue(aNode, "//nmsp:SQL", nsmgr); //To get SQL node
		///		XPath Reference: http://www.zvon.org/xxl/XPathTutorial/General/examples.html
		/// </example>
		public static ArrayList GetNodeValues(XmlNode node, string xmlPath, XmlNamespaceManager nsmgr)
		{
			ArrayList nodeValueList = new ArrayList();
			XmlNodeList nodeList, childList;
 
			
			if (node == null)
				throw new ApplicationException("WanerDaoXml: XML node is null");
			
			if (xmlPath == null)
				throw new ApplicationException("WanerDaoXml: XML path is null");

			if (node.NamespaceURI == "")
				nodeList = node.SelectNodes(xmlPath);
			else
			{
				nsmgr.AddNamespace("nmsp", node.NamespaceURI);

				string[] tmp = xmlPath.Split('/');
				string xmlpt = "/";
				foreach(string str in tmp)
					xmlpt = xmlpt + "/nmsp:" + str;
				nodeList = node.SelectNodes(xmlpt, nsmgr);				
			}

			foreach (XmlNode selectedNode in nodeList)
			{
				childList = selectedNode.ChildNodes;
				foreach (XmlNode child in childList)
				{
					if (child.NodeType.ToString()=="Text")
						nodeValueList.Add(child.InnerText.Trim());
				}
			}

			return nodeValueList;
		}

		/// <summary>
		/// Read node attribute to long variable.
		/// </summary>
		/// <param name="node">Xml node</param>
		/// <param name="name">Attribute name</param>
		/// <param name="number">variable to be assign.</param>
		/// <exception>
		/// 1.	If input param "node" is null, throw application exception.
		/// 2.	If input param "name" is null, throw applicaiton exception.
		/// </exception>
		public static void ReadAttribute( XmlNode node, string name, ref long number )
		{
			
			if (node == null)
				throw new ApplicationException("WanerDaoXml: XML node is null");
			
			if (name == null)
				throw new ApplicationException("WanerDaoXml: Attribute name is null");

			XmlAttribute attr = node.Attributes[ name ];
			if ( null != attr )
				number = long.Parse( attr.Value );
		}

		/// <summary>
		/// Read node attribute to int variable.
		/// </summary>
		/// <param name="node">Xml node</param>
		/// <param name="name">Attribute name</param>
		/// <param name="number">variable to be assign.</param>
		/// <exception>
		/// 1.	If input param "node" is null, throw application exception.
		/// 2.	If input param "name" is null, throw applicaiton exception.
		/// </exception>
		public static void ReadAttribute( XmlNode node, string name, ref int number )
		{
			
			if (node == null)
				throw new ApplicationException("WanerDaoXml: XML node is null");
			
			if (name == null)
				throw new ApplicationException("WanerDaoXml: Attribute name is null");

			XmlAttribute attr = node.Attributes[ name ];
			if ( null != attr )
				number = int.Parse( attr.Value );
		}

		/// <summary>
		/// Read node attribute to string variable.
		/// </summary>
		/// <param name="node">Xml node</param>
		/// <param name="name">Attribute name</param>
		/// <param name="number">variable to be assign.</param>
		/// <exception>
		/// 1.	If input param "node" is null, throw application exception.
		/// 2.	If input param "name" is null, throw applicaiton exception.
		/// </exception>
		public static void ReadAttribute( XmlNode node, string name, ref string str )
		{
			
			if (node == null)
				throw new ApplicationException("WanerDaoXml: XML node is null");
			
			if (name == null)
				throw new ApplicationException("WanerDaoXml: Attribute name is null");

			XmlAttribute attr = node.Attributes[ name ];
			if ( null != attr )
				str = attr.Value;
		}

		/// <summary>
		/// Read node attribute to boolean variable.
		/// </summary>
		/// <param name="node">Xml node</param>
		/// <param name="name">Attribute name</param>
		/// <param name="number">variable to be assign.</param>
		/// <exception>
		/// 1.	If input param "node" is null, throw application exception.
		/// 2.	If input param "name" is null, throw applicaiton exception.
		/// </exception>
		public static void ReadAttribute( XmlNode node, string name, ref bool boolean )
		{
			
			if (node == null)
				throw new ApplicationException("WanerDaoXml: XML node is null");
			
			if (name == null)
				throw new ApplicationException("WanerDaoXml: Attribute name is null");

			XmlAttribute attr = node.Attributes[ name ];
			if ( null != attr )
			{
				string str = attr.Value.Trim().ToLower();
				if ( "true" == str || "yes" == str || "y" == str )
					boolean = true;
				else
					boolean = false;
			}
		}

		/// <summary>
		/// Read node attribute to double variable.
		/// </summary>
		/// <param name="node">Xml node</param>
		/// <param name="name">Attribute name</param>
		/// <param name="number">variable to be assign.</param>
		/// <exception>
		/// 1.	If input param "node" is null, throw application exception.
		/// 2.	If input param "name" is null, throw applicaiton exception.
		/// </exception>
		public static void ReadAttribute( XmlNode node, string name, ref double number )
		{
			
			if (node == null)
				throw new ApplicationException("WanerDaoXml: XML node is null");
			
			if (name == null)
				throw new ApplicationException("WanerDaoXml: Attribute name is null");

			XmlAttribute attr = node.Attributes[ name ];
			if ( null != attr )
				number = double.Parse( attr.Value );
		}

		/// <summary>
		/// Read node attribute to DateTime variable.
		/// </summary>
		/// <param name="node">Xml node</param>
		/// <param name="name">Attribute name</param>
		/// <param name="number">variable to be assign.</param>
		/// <exception>
		/// 1.	If input param "node" is null, throw application exception.
		/// 2.	If input param "name" is null, throw applicaiton exception.
		/// </exception>
		public static void ReadAttribute( XmlNode node, string name, ref DateTime datetime )
		{
			
			if (node == null)
				throw new ApplicationException("WanerDaoXml: XML node is null");
			
			if (name == null)
				throw new ApplicationException("WanerDaoXml: Attribute name is null");

			XmlAttribute attr = node.Attributes[ name ];
			if ( null != attr )
				datetime = DateTime.Parse( attr.Value );
		}

		/// <summary>
		/// return the boolean attribute value, default is false.
		/// </summary>
		/// <param name="node">Xml node</param>
		/// <param name="name">Attribute name</param>
		/// <returns>the boolean value</returns>
		/// <exception>
		/// 1.	If input param "node" is null, throw application exception.
		/// 2.	If input param "name" is null, throw applicaiton exception.
		/// </exception>
		public static bool ReadAttributeBool( XmlNode node, string name )
		{
			
			if (node == null)
				throw new ApplicationException("WanerDaoXml: XML node is null");
			
			if (name == null)
				throw new ApplicationException("WanerDaoXml: Attribute name is null");

			XmlAttribute attr = node.Attributes[ name ];
			if ( null != attr )
			{
				name = attr.Value.Trim().ToLower();
				if ( "true" == name || "yes" == name || "y" == name )
					return true;
			}
			return false;
		}

		/// <summary>
		/// Replace the Xml sensitive character
		/// </summary>
		/// <param name="xString">xml string</param>
		/// <returns>
		/// 1.	If input param "xString" is null, return null.
		/// 2.	Else, returns xml string that has xml sensitive character replaced
		/// </returns>
		public static string XmlDoubleString( string xString )
		{
			if ( null == xString )
				return null;
			string ret = xString.Replace( "&", "&amp;amp;" );
			ret = ret.Replace( "<", "&amp;lt;" );
			ret = ret.Replace( ">", "&amp;gt;" );
			ret = ret.Replace( "'", "&amp;apos;" );
			ret = ret.Replace( "\"", "&amp;quot;" );
			return ret;
		}

		/// <summary>
		/// this function is used to convert string (read from xml) to int.
		/// </summary>
		/// <param name="str">string to be converted.</param>
		/// <param name="defint">default value</param>
		/// <param name="refstr">to tell the source of 'str' for rerence</param>
		/// <returns>converted integer</returns>
		public static int StringToInt(string str, int defint, string refstr)
		{
			int test;
			if (str == null || str == "") return defint;
			try
			{
				test = int.Parse(str);
				return test;
			}
			catch (Exception ex)
			{
				throw new ApplicationException("str:" + str + " is not valid integer in "+refstr, ex);
			}
		}

		/// <summary>
		/// this function is used to convert string (read from xml) to double.
		/// </summary>
		/// <param name="str">string to be converted.</param>
		/// <param name="defdbl">default value</param>
		/// <param name="refstr">to tell the source of 'str' for rerence</param>
		/// <returns>converted double</returns>
		public static double StringToInt(string str, double defdbl, string refstr)
		{
			double test;
			if (str==null || str=="") return defdbl;
			try
			{
				test = double.Parse(str);
				return test;
			}
			catch (Exception ex)
			{
				throw new ApplicationException("str:" + str + " is not valid double in "+refstr, ex);
			}
		}
		
		/// <summary>
		/// this function is used to convert string (read from xml) to datetime.
		/// </summary>
		/// <param name="str">string to be converted.</param>
		/// <param name="defdttm">default value</param>
		/// <param name="refstr">to tell the source of 'str' for rerence</param>
		/// <returns>converted datetime</returns>
		public static DateTime StringToDateTime(string str, DateTime defdttm, string refstr)
		{
			DateTime test;
			if (str==null||str=="") return defdttm;
			try
			{
				test = DateTime.Parse(str);
				return test;
			}
			catch (Exception ex)
			{
				throw new ApplicationException("str:" + str + " is not valid DateTime in "+refstr, ex);
			}
		}

		/// <summary>
		/// this function is used to convert string (read from xml) to bool.
		/// </summary>
		/// <param name="str">string to be converted.</param>
		/// <param name="defbool">default value</param>
		/// <param name="refstr">to tell the source of 'str' for rerence</param>
		/// <returns>converted bool</returns>
		public static bool StringToBool(string str, bool defbool, string refstr)
		{
			//bool test;
			if (str==null||str=="") return defbool;
			try
			{
				if (str.ToLower() == "y" || str.ToLower() == "t" || str.ToLower() == "yes" || str.ToLower() == "true")
					return true;
				else if (str.ToLower() == "n" || str.ToLower() == "f" || str.ToLower() == "no" || str.ToLower() == "false")
					return false;
				throw new ApplicationException("invalid boolean data: " + str + "/" + refstr);
			}
			catch (Exception ex)
			{
				throw new ApplicationException("str:" + str + " is not valid bool in "+refstr, ex);
			}
		}

		/// <summary>
		/// this function is used to convert string (read from xml) to system.type.
		/// </summary>
		/// <param name="str">string to be converted.</param>
		/// <param name="deftyp">default value</param>
		/// <param name="refstr">to tell the source of 'str' for rerence</param>
		/// <returns>converted system.type</returns>
		public static System.Type StringToType(string str, System.Type deftyp, string refstr)
		{
			System.Type test;
			if (str=="") return deftyp;
			try
			{
				test = System.Type.GetType(str);
				return test;
			}
			catch (Exception ex)
			{
				throw new ApplicationException("str:" + str + " is not valid System.Type in "+refstr, ex);
			}
		}
    }
}
