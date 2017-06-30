package fl.events
{
    import flash.events.*;

    public class ScrollEvent extends Event
    {
        private var _position:Number;
        private var _direction:String;
        private var _delta:Number;
        public static const SCROLL:String = "scroll";

        public function ScrollEvent(param1:String, param2:Number, param3:Number)
        {
            super(ScrollEvent.SCROLL, false, false);
            _direction = param1;
            _delta = param2;
            _position = param3;
            return;
        }// end function

        override public function clone() : Event
        {
            return new ScrollEvent(_direction, _delta, _position);
        }// end function

        public function get position() : Number
        {
            return _position;
        }// end function

        override public function toString() : String
        {
            return formatToString("ScrollEvent", "type", "bubbles", "cancelable", "direction", "delta", "position");
        }// end function

        public function get delta() : Number
        {
            return _delta;
        }// end function

        public function get direction() : String
        {
            return _direction;
        }// end function

    }
}
