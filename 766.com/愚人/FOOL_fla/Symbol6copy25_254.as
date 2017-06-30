package FOOL_fla
{
    import flash.display.*;
    import flash.events.*;

    dynamic public class Symbol6copy25_254 extends MovieClip
    {
        public var o:Object;
        public var U1:MovieClip;
        public var U2:MovieClip;
        public var U3:MovieClip;

        public function Symbol6copy25_254()
        {
            addFrameScript(0, frame1, 116, frame117);
            return;
        }// end function

        function frame1()
        {
            stop();
            return;
        }// end function

        public function onU2Down(event:MouseEvent)
        {
            MovieClip(parent).scrin();
            U1.removeEventListener(MouseEvent.MOUSE_DOWN, onU1Down);
            U2.removeEventListener(MouseEvent.MOUSE_DOWN, onU2Down);
            U3.removeEventListener(MouseEvent.MOUSE_DOWN, onU3Down);
            U2.gotoAndStop(2);
            return;
        }// end function

        function frame117()
        {
            stop();
            o = 1;
            while (o <= 3)
            {
                
                this["U" + o].buttonMode = true;
                var _loc_2:* = o + 1;
                o = _loc_2;
            }
            U1.addEventListener(MouseEvent.MOUSE_DOWN, onU1Down);
            U2.addEventListener(MouseEvent.MOUSE_DOWN, onU2Down);
            U3.addEventListener(MouseEvent.MOUSE_DOWN, onU3Down);
            return;
        }// end function

        public function onU1Down(event:MouseEvent)
        {
            U2.gotoAndStop(3);
            MovieClip(parent).scrdec();
            U1.removeEventListener(MouseEvent.MOUSE_DOWN, onU1Down);
            U2.removeEventListener(MouseEvent.MOUSE_DOWN, onU2Down);
            U3.removeEventListener(MouseEvent.MOUSE_DOWN, onU3Down);
            U1.gotoAndStop(2);
            return;
        }// end function

        public function onU3Down(event:MouseEvent)
        {
            U2.gotoAndStop(3);
            MovieClip(parent).scrdec();
            U1.removeEventListener(MouseEvent.MOUSE_DOWN, onU1Down);
            U2.removeEventListener(MouseEvent.MOUSE_DOWN, onU2Down);
            U3.removeEventListener(MouseEvent.MOUSE_DOWN, onU3Down);
            U3.gotoAndStop(2);
            return;
        }// end function

    }
}
