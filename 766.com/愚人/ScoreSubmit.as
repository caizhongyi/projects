package 
{
    import flash.display.*;
    import flash.events.*;
    import flash.net.*;
    import flash.system.*;

    public class ScoreSubmit extends Sprite
    {

        public function ScoreSubmit()
        {
            return;
        }// end function

        public static function sendMyScore(param1:String, param2:String, param3:Number, param4:Number, param5:String, param6:String) : void
        {
            var receivedData:String;
            var processedData:String;
            var addressRequest:URLRequest;
            var dataObject:URLVariables;
            var addressLoader:URLLoader;
            var callMe:Function;
            var myName:* = param1;
            var myCountry:* = param2;
            var myScore:* = param3;
            var myGameId:* = param4;
            var mySite:* = param5;
            var myLevels:* = param6;
            callMe = function (event:Event) : void
            {
                var _loc_2:Number = NaN;
                var _loc_3:Number = NaN;
                receivedData = event.target.data;
                if (receivedData.match("success=0"))
                {
                }
                else if (receivedData.match("success=1"))
                {
                    trace(receivedData);
                    _loc_2 = receivedData.indexOf("scoreid");
                    _loc_3 = receivedData.indexOf("&");
                    if (_loc_2 == 0)
                    {
                        processedData = receivedData.substring(_loc_2, _loc_3);
                    }
                    else
                    {
                        processedData = receivedData.substring(_loc_2);
                    }
                    if (mySite.match("123bee"))
                    {
                        navigateToURL(new URLRequest("http://www.123bee.com/highscores?gameid=" + myGameId + "&" + processedData));
                    }
                    else if (mySite.match("123peppy"))
                    {
                        navigateToURL(new URLRequest("http://www.123peppy.com/highscore?gameid=" + myGameId + "&" + processedData));
                    }
                }
                return;
            }// end function
            ;
            Security.allowDomain("*");
            Security.allowInsecureDomain("*");
            if (mySite.match("123bee"))
            {
                addressRequest = new URLRequest("http://www.123bee.com/scores/saveScore.php");
            }
            else if (mySite.match("123peppy"))
            {
                addressRequest = new URLRequest("http://www.123peppy.com/score/saveScore.php");
            }
            dataObject = new URLVariables();
            dataObject.fname = myName;
            dataObject.country = myCountry;
            dataObject.score = myScore;
            dataObject.Levels = myLevels;
            dataObject.gameid = myGameId;
            addressRequest.data = dataObject;
            addressLoader = new URLLoader();
            addressLoader.dataFormat = URLLoaderDataFormat.VARIABLES;
            addressLoader.addEventListener(Event.COMPLETE, callMe);
            addressLoader.load(addressRequest);
            return;
        }// end function

    }
}
