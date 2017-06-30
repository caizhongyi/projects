<script language="JavaScript" type="text/JavaScript">
function showhide_obj(obj,icon)
{
obj=document.getElementById(obj);
icon=document.getElementById(icon);
 if (obj.style.display=="none") 
  { 
        //指定文档中的对象为div,仅适用于IE;   
        div_list = document.getElementsByTagName("div");
        for (i=0; i< div_list.length;i ++)
        {
          thisDiv = div_list[i]; 
           if(thisDiv.id.indexOf("title")!=-1)//当文档div中的id含有list时,与charAt类似;
           {
            //循环把所有菜单链接都隐躲起来
           thisDiv.style.display="none";
           icon.innerHTML = "+";
           }
        } 
 
   myfont=document.getElementsByTagName("font");
   for(i=0;i<myfont.length;i++)
    {
    thisfont = myfont[i];
   }
    icon.innerHTML="-";
    obj.style.display=""; //只显示当前链接
}
 else
  {
  //当前对象是打开的，就封闭它;
   icon.innerHTML="+";
   obj.style.display="none";
   }
 }

function show_this(obj)
{
    obj=document.getElementById(obj);
    if (obj.id==obj.id) 
     {
       blinkicon=document.getElementsByTagName("font");
       for(x=0;x<blinkicon.length;x++)
        {
           if( blinkicon[x].id.indexOf("select")!=-1 && obj.id!=obj )
            {
               blinkicon[x].innerHTML=" ";
            }
        }
          obj.innerHTML=">"; 
     }
     else
     {
           obj.innerHTML=" ";
     }
}
//-->
</script>