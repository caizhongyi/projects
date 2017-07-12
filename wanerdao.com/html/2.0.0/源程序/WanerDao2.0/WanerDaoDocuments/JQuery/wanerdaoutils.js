/*

       名字：Common.js

       功能：通用javascript脚本函数库

       包括：

            1.Trim(str)－－去除字符串两边的空格

            2.XMLEncode(str)－－对字符串进行XML编码

            3.ShowLabel(str,str)－－鼠标提示功能（显示字符，提示字符）

            4.IsEmpty(obj)－－验证输入框是否为空

            5.IsInt(objStr,sign,zero)－－验证是否为整数

            6.IsFloat(objStr,sign,zero)－－验证是否为浮点数

*/

/*字符串操作

Trim(string):去除字符串两边的空格

*/

/*
　　１．LTrim(string):去除左边的空格
*/

function LTrim(str)

{
    var whitespace = new String(" \t\n\r");
    var s = new String(str);

    if (whitespace.indexOf(s.charAt(0)) != -1)
    {
        var j=0, i = s.length;

        while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
        {
            j++;
        }

        s = s.substring(j, i);
    }

    return s;
}

 

/*
　　２．RTrim(string):去除右边的空格
*/

function RTrim(str)

{

    var whitespace = new String(" \t\n\r");

    var s = new String(str);

 

    if (whitespace.indexOf(s.charAt(s.length-1)) != -1)

    {

        var i = s.length - 1;

        while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)

        {

            i--;

        }

        s = s.substring(0, i+1);

    }

    return s;

}

 

/*
　　３．Trim(string):去除前后空格
*/

function Trim(str)

{

    return RTrim(LTrim(str));

}

/*

　　XMLEncode(string):对字符串进行XML编码

*/

function XMLEncode(str)

{

       str=Trim(str);

       str=str.replace("&","&amp;");

       str=str.replace("<","&lt;");

       str=str.replace(">","&gt;");

       str=str.replace("'","&apos;");

       str=str.replace("\"","&quot;");

       return str;

}

/*
验证类函数
*/

function IsEmpty(obj)

{

    obj=document.getElementsByName(obj).item(0);

    if(Trim(obj.value)=="")

    {

        alert("字段不能为空。");        

        if(obj.disabled==false && obj.readOnly==false)

        {

            obj.focus();

        }

    }

}

 

/*
　　IsInt(string,string,int or string):(测试字符串,+ or - or empty,empty or 0)

　　功能：判断是否为整数、正整数、负整数、正整数+0、负整数+0
*/

function IsInt(objStr,sign,zero)

{

    var reg;    

    var bolzero;    

    

    if(Trim(objStr)=="")

    {

        return false;

    }

    else

    {

        objStr=objStr.toString();

    }    

    

    if((sign==null)||(Trim(sign)==""))
    {
        sign="+-";
    }

    if((zero==null)||(Trim(zero)==""))
    {
        bolzero=false;
    }
    else
    {
        zero=zero.toString();
        if(zero=="0")
        {
            bolzero=true;
        }
        else
        {
            alert("检查是否包含0参数，只可为(空、0)");
        }
    }

    switch(sign)

    {

        case "+-":

            //整数

            reg=/(^-?|^\+?)\d+$/;            

            break;

        case "+": 

            if(!bolzero)           

            {

                //正整数

                reg=/^\+?[0-9]*[1-9][0-9]*$/;

            }

            else

            {

                //正整数+0

                //reg=/^\+?\d+$/;

                reg=/^\+?[0-9]*[0-9][0-9]*$/;

            }

            break;

        case "-":

            if(!bolzero)

            {

                //负整数

                reg=/^-[0-9]*[1-9][0-9]*$/;

            }

            else

            {

                //负整数+0

                //reg=/^-\d+$/;

                reg=/^-[0-9]*[0-9][0-9]*$/;

            }            

            break;

        default:

            alert("检查符号参数，只可为(空、+、-)");

            return false;

            break;

    }

    var r=objStr.match(reg);

    if(r==null)

    {

        return false;

    }

    else

    {        

        return true;     

    }

}

/*

　　IsFloat(string,string,int or string):(测试字符串,+ or - or empty,empty or 0)

　　功能：判断是否为浮点数、正浮点数、负浮点数、正浮点数+0、负浮点数+0

*/

function IsFloat(objStr,sign,zero)

{

    var reg;    

    var bolzero;    

    

    if(Trim(objStr)=="")

    {

        return false;

    }

    else

    {

        objStr=objStr.toString();

    }    

    

    if((sign==null)||(Trim(sign)==""))

    {

        sign="+-";

    }

    

    if((zero==null)||(Trim(zero)==""))

    {

        bolzero=false;

    }
    else
    {

        zero=zero.toString();

        if(zero=="0")
        {

            bolzero=true;

        }
        else
        {

            alert("检查是否包含0参数，只可为(空、0)");

        }

    }

    switch(sign)

    {

        case "+-":

            //浮点数

            reg=/^((-?|\+?)\d+)(\.\d+)?$/;

            break;

        case "+": 

            if(!bolzero)           

            {

                //正浮点数

                reg=/^\+?(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;

            }

            else

            {

                //正浮点数+0

                reg=/^\+?\d+(\.\d+)?$/;

            }

            break;

        case "-":

            if(!bolzero)

            {

                //负浮点数

                reg=/^-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;

            }

            else

            {

                //负浮点数+0

                reg=/^((-\d+(\.\d+)?)|(0+(\.0+)?))$/;

            }            

            break;

        default:

            alert("检查符号参数，只可为(空、+、-)");

            return false;

            break;

    }

    

    var r=objStr.match(reg);

    if(r==null)
    {
        return false;
    }
    else
    {
        return true;
    }
}

