var twidth = 61;
var theight = 41;

var hmargine = 40;
var hem;

var vmargine = 118;
var vem = 53;


var teasing = 'easeOutQuad';
var speed = 500; // spped of the animations in miliseconds
var delayoft = 50; //delay of next thumb

$(document).ready(function()
    {
        $.ajax(
            {
                type : "GET",
                url : "/js/timeline.xml",
                dataType:"xml",
                success : function(xml)
                {
                    parseXml(xml);
                }
            }
        );


    }
);

var titleArray = new Array;

function parseXml(xml)
{

    var thumbArray = new Array;

    var imageArray = new Array;
    var captionArray= new Array;

    var thumbLength = $(xml).find("tab").length;


    /*$(xml).find("tab").each(function()
     {
     thumbArray.push($(this).find("Thumbnail").text());
     titleArray.push($(this).find("Title").text());
     imageArray.push($(this).find("Image").text());
     captionArray.push($(this).find("Description").text());

     })
     */
    var tn = 0;
    var cpn = 0;

    $('#timelineContainer').append('<div class="timelineContainerIn"/>');
    $('#timelineContainer').append('<div class="timelineContainerIn"/>');
    $('.timelineContainerIn').eq(1).append('<div id="toolTip"><div id="toolTipIn"/></div>')

    $(xml).find("tab").each(function()
    {


        tn = 0;
        hem =  (95-($(this).find("item").length*hmargine)/2) ;


        $(this).find("item").each(function()
        {
            //trace( $(this).text());
            // trace(((tn*hmargine)+hem))

            $('.timelineContainerIn').eq(0).append('<div class="timeButton" style="margin-top:'+((tn*hmargine)+hem)+'px; margin-Left:'+((cpn*vmargine)+vem)+'px;"><img src="/Images/timeBall.png" width="32" height="31"></div>');

            $('.timelineContainerIn').eq(1).append('<div des="'+$(this).text()+'" class="timeButtonRoll" style="margin-top:'+((tn*hmargine)+hem)+'px; margin-Left:'+((cpn*vmargine)+vem)+'px;"></div>');

            titleArray.push($(this).text())

            $('#toolTipIn').append('<div class="toolTipText">'+$(this).text()+'</div>');

            tn++;

            if(tn <= 3)
            {
                $('.toolTipText').css('margin',"0px 20px 0px 30px");
            }
            else
            {
                $('.toolTipText').css('margin',"0px 30px 0px 20px");
            }

        })
        cpn++;
    })
    Cufon.replace('.toolTipText', { fontFamily: 'Proxima Nova 300'});



    $('.timeButtonRoll').mouseover(function() {

        //  tn = $(this).attr('des');
        //$('#toolTip').html(tn);
        tipit($(this).prevAll().length-1);

    })

    var oldn = 0;

    function tipit(n)
    {
        // tn = $(this).attr('des');
        // $('#toolTipIn').html(titleArray[n]);

        // Cufon.replace('#toolTip', { fontFamily: 'Proxima Nova 300'});

        var ml = ( $('.timeButtonRoll').eq(n).css('marginLeft'));
        var ms = ml.split("px");
        var mln = Math.abs(ms[0]);

        var ml2 = ( $('.timeButtonRoll').eq(n).css('marginTop'));
        var ms2 = ml2.split("px");
        var mln2 = Math.abs(ms2[0]);


        $('.timeButton img').eq(oldn).animate({opacity:1}, 300);
        $('.timeButton img').eq(n).stop().animate({opacity:0}, 300);

        if ( $.browser.msie ) {
            $('#toolTipIn').html(titleArray[n]);
            Cufon.replace('#toolTip', { fontFamily: 'Proxima Nova 300'});

            if(410 > mln)
            {
                $('#toolTip').css('backgroundImage','url(/Images/tipBack.png)');
                $('#toolTipIn').css('margin',"0px 20px 0px 30px");
                $('#toolTipIn').css('margin-top',((116-$('#toolTipIn').height())/2)+"px");



                $('#toolTip').animate({marginLeft:mln+10,marginTop:mln2-43}, 300);


            }

            else
            {

                $('#toolTip').css('backgroundImage','url(/Images//tipBack2.png)');
                $('#toolTipIn').css('margin',"0px 30px 0px 20px");
                $('#toolTipIn').css('margin-top',((116-$('#toolTipIn').height())/2)+"px");

                $('#toolTip').animate({marginLeft:mln-424,marginTop:mln2-43}, 300);


            }
        }

        else
        {
            if(410 > mln)
            {
                $('#toolTip').css('backgroundImage','url(/Images/tipBack.png)');
                $('#toolTip').animate({marginLeft:mln+10,marginTop:mln2-43}, 300);
            }

            else
            {
                $('#toolTip').css('backgroundImage','url(/Images/tipBack2.png)');
                $('#toolTip').animate({marginLeft:mln-424,marginTop:mln2-43}, 300);
            }


            var mt = 	(116-$('.toolTipText').eq(n).height())/2;
            $('.toolTipText').css('marginTop',"120px");
            $('.toolTipText').eq(n).css('marginTop',mt+"px");

        }




        oldn = n;
        cpage = n;

        window.clearInterval(timer);
        timer = window.setInterval(function(){
            cpage++;
            if(cpage == $('.timeButtonRoll').length) cpage = 0;
            tipit(cpage)
        }, 3000);
        //$('#toolTip').({marginTop:0	}, 0);
    }
    tipit(0);

    // $(".timeButton").tooltip({ position: "bottom left", opacity: 0.7});
}

var cpage=0;
var timer;

function trace(m) {
    console.log(m);
}