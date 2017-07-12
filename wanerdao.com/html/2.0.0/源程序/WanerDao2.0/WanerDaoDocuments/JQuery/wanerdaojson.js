function JsonParse(jsonstring)
{
    var returnjson;
    if($.browser.msie)
    {
        if($.browser.version=='6.0'||$.browser.version=='7.0')
        {
            returnjson=eval(jsonstring);
        }
        else
        {
            returnjson=BrowserParse(jsonstring);
        }
    }
    if($.browser.mozilla)
    {
        returnjson=FunctionParse(jsonstring);
    }
    else
    {
        returnjson=eval(jsonstring);
    }
    return returnjson;
}
function BrowserParse(jsonstring)
{
    return Json.parse(jsonstring);
}
function FunctionParse(jsonstring)
{
    return new Function("return "+jsonstring)();
}