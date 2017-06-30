package FOOL_fla
{
    import flash.display.*;
    import flash.events.*;

    dynamic public class Symbol6copy13_242 extends MovieClip
    {
        public var T1:MovieClip;
        public var T3:MovieClip;
        public var T2:MovieClip;
        public var o:Object;

        public function Symbol6copy13_242()
        {
            addFrameScript(0, frame1, 91, frame92);
            return;
        }// end function

        public function onT1Down(event:MouseEvent)
        {
            MovieClip(parent).scrin();
            T1.removeEventListener(MouseEvent.MOUSE_DOWN, onT1Down);
            T2.removeEventListener(MouseEvent.MOUSE_DOWN, onT2Down);
            T3.removeEventListener(MouseEvent.MOUSE_DOWN, onT3Down);
            T1.gotoAndStop(2);
            return;
        }// end function

        function frame1()
        {
            stop();
            return;
        }// end function

        function frame92()
        {
            stop();
            o = 1;
            while (o <= 3)
            {
                
                this["T" + o].buttonMode = true;
                var _loc_2:* = o + 1;
                o = _loc_2;
            }
            T1.addEventListener(MouseEvent.MOUSE_DOWN, onT1Down);
            T2.addEventListener(MouseEvent.MOUSE_DOWN, onT2Down);
            T3.addEventListener(MouseEvent.MOUSE_DOWN, onT3Down);
            return;
        }// end function

        public function onT3Down(event:MouseEvent)
        {
            T1.gotoAndStop(3);
            MovieClip(parent).scrdec();
            T1.removeEventListener(MouseEvent.MOUSE_DOWN, onT1Down);
            T2.removeEventListener(MouseEvent.MOUSE_DOWN, onT2Down);
            T3.removeEventListener(MouseEvent.MOUSE_DOWN, onT3Down);
            T3.gotoAndStop(2);
            return;
        }// end function

        public function onT2Down(event:MouseEvent)
        {
            T1.gotoAndStop(3);
            MovieClip(parent).scrdec();
            T1.removeEventListener(MouseEvent.MOUSE_DOWN, onT1Down);
            T2.removeEventListener(MouseEvent.MOUSE_DOWN, onT2Down);
            T3.removeEventListener(MouseEvent.MOUSE_DOWN, onT3Down);
            T2.gotoAndStop(2);
            return;
        }// end function

    }
}
