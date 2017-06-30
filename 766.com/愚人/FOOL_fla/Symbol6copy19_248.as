package FOOL_fla
{
    import flash.display.*;
    import flash.events.*;

    dynamic public class Symbol6copy19_248 extends MovieClip
    {
        public var o:Object;
        public var V3:MovieClip;
        public var V1:MovieClip;
        public var V2:MovieClip;

        public function Symbol6copy19_248()
        {
            addFrameScript(0, frame1, 93, frame94);
            return;
        }// end function

        function frame94()
        {
            stop();
            o = 1;
            while (o <= 3)
            {
                
                this["V" + o].buttonMode = true;
                var _loc_2:* = o + 1;
                o = _loc_2;
            }
            V1.addEventListener(MouseEvent.MOUSE_DOWN, onV1Down);
            V2.addEventListener(MouseEvent.MOUSE_DOWN, onV2Down);
            V3.addEventListener(MouseEvent.MOUSE_DOWN, onV3Down);
            return;
        }// end function

        function frame1()
        {
            stop();
            return;
        }// end function

        public function onV1Down(event:MouseEvent)
        {
            V3.gotoAndStop(3);
            MovieClip(parent).scrdec();
            V1.removeEventListener(MouseEvent.MOUSE_DOWN, onV1Down);
            V2.removeEventListener(MouseEvent.MOUSE_DOWN, onV2Down);
            V3.removeEventListener(MouseEvent.MOUSE_DOWN, onV3Down);
            V1.gotoAndStop(2);
            return;
        }// end function

        public function onV3Down(event:MouseEvent)
        {
            MovieClip(parent).scrin();
            V1.removeEventListener(MouseEvent.MOUSE_DOWN, onV1Down);
            V2.removeEventListener(MouseEvent.MOUSE_DOWN, onV2Down);
            V3.removeEventListener(MouseEvent.MOUSE_DOWN, onV3Down);
            V3.gotoAndStop(2);
            return;
        }// end function

        public function onV2Down(event:MouseEvent)
        {
            V3.gotoAndStop(3);
            MovieClip(parent).scrdec();
            V1.removeEventListener(MouseEvent.MOUSE_DOWN, onV1Down);
            V2.removeEventListener(MouseEvent.MOUSE_DOWN, onV2Down);
            V3.removeEventListener(MouseEvent.MOUSE_DOWN, onV3Down);
            V2.gotoAndStop(2);
            return;
        }// end function

    }
}
