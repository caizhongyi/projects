package FOOL_fla
{
    import flash.display.*;
    import flash.events.*;
    import flash.net.*;

    dynamic public class tweeClip_186 extends MovieClip
    {
        public var btn_tweet:SimpleButton;

        public function tweeClip_186()
        {
            addFrameScript(0, frame1);
            return;
        }// end function

        function frame1()
        {
            btn_tweet.addEventListener(MouseEvent.CLICK, clickTweet);
            return;
        }// end function

        public function clickTweet(event:Event)
        {
            var _loc_2:URLRequest = null;
            var _loc_3:URLVariables = null;
            _loc_2 = new URLRequest("http://twitter.com/home");
            _loc_2.method = URLRequestMethod.GET;
            _loc_3 = new URLVariables();
            _loc_3.status = "http://www.123bee.com/play/fools_day_fun/18976.html";
            _loc_2.data = _loc_3;
            navigateToURL(_loc_2, "_blank");
            return;
        }// end function

    }
}
