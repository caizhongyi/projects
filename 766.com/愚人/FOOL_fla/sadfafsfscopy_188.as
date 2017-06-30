package FOOL_fla
{
    import flash.display.*;
    import flash.events.*;
    import flash.net.*;

    dynamic public class sadfafsfscopy_188 extends MovieClip
    {

        public function sadfafsfscopy_188()
        {
            addFrameScript(0, frame1);
            return;
        }// end function

        public function shareClickHandler(event:MouseEvent) : void
        {
            var _loc_2:URLVariables = null;
            var _loc_3:URLRequest = null;
            _loc_2 = new URLVariables();
            _loc_2.u = "http://www.123bee.com/play/fools_day_fun/18976.html";
            _loc_2.t = "Fool\'s Day Fun";
            _loc_3 = new URLRequest("http://www.facebook.com/sharer.php");
            _loc_3.data = _loc_2;
            _loc_3.method = URLRequestMethod.GET;
            navigateToURL(_loc_3, "_blank");
            return;
        }// end function

        function frame1()
        {
            buttonMode = true;
            addEventListener(MouseEvent.CLICK, shareClickHandler);
            return;
        }// end function

    }
}
