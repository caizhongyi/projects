package fl.controls
{
    import fl.core.*;
    import fl.events.*;
    import flash.display.*;
    import flash.events.*;
    import flash.utils.*;

    public class BaseButton extends UIComponent
    {
        protected var _selected:Boolean = false;
        private var unlockedMouseState:String;
        protected var pressTimer:Timer;
        protected var mouseState:String;
        protected var background:DisplayObject;
        private var _mouseStateLocked:Boolean = false;
        protected var _autoRepeat:Boolean = false;
        private static var defaultStyles:Object = {upSkin:"Button_upSkin", downSkin:"Button_downSkin", overSkin:"Button_overSkin", disabledSkin:"Button_disabledSkin", selectedDisabledSkin:"Button_selectedDisabledSkin", selectedUpSkin:"Button_selectedUpSkin", selectedDownSkin:"Button_selectedDownSkin", selectedOverSkin:"Button_selectedOverSkin", focusRectSkin:null, focusRectPadding:null, repeatDelay:500, repeatInterval:35};

        public function BaseButton()
        {
            _selected = false;
            _autoRepeat = false;
            _mouseStateLocked = false;
            buttonMode = true;
            mouseChildren = false;
            useHandCursor = false;
            setupMouseEvents();
            setMouseState("up");
            pressTimer = new Timer(1, 0);
            pressTimer.addEventListener(TimerEvent.TIMER, buttonDown, false, 0, true);
            return;
        }// end function

        protected function endPress() : void
        {
            pressTimer.reset();
            return;
        }// end function

        public function set mouseStateLocked(param1:Boolean) : void
        {
            _mouseStateLocked = param1;
            if (param1 == false)
            {
                setMouseState(unlockedMouseState);
            }
            else
            {
                unlockedMouseState = mouseState;
            }
            return;
        }// end function

        public function get autoRepeat() : Boolean
        {
            return _autoRepeat;
        }// end function

        public function set autoRepeat(param1:Boolean) : void
        {
            _autoRepeat = param1;
            return;
        }// end function

        override public function set enabled(param1:Boolean) : void
        {
            super.enabled = param1;
            mouseEnabled = param1;
            return;
        }// end function

        public function get selected() : Boolean
        {
            return _selected;
        }// end function

        protected function mouseEventHandler(event:MouseEvent) : void
        {
            if (event.type == MouseEvent.MOUSE_DOWN)
            {
                setMouseState("down");
                startPress();
            }
            else if (event.type == MouseEvent.ROLL_OVER || event.type == MouseEvent.MOUSE_UP)
            {
                setMouseState("over");
                endPress();
            }
            else if (event.type == MouseEvent.ROLL_OUT)
            {
                setMouseState("up");
                endPress();
            }
            return;
        }// end function

        public function setMouseState(param1:String) : void
        {
            if (_mouseStateLocked)
            {
                unlockedMouseState = param1;
                return;
            }
            if (mouseState == param1)
            {
                return;
            }
            mouseState = param1;
            invalidate(InvalidationType.STATE);
            return;
        }// end function

        protected function startPress() : void
        {
            if (_autoRepeat)
            {
                pressTimer.delay = Number(getStyleValue("repeatDelay"));
                pressTimer.start();
            }
            dispatchEvent(new ComponentEvent(ComponentEvent.BUTTON_DOWN, true));
            return;
        }// end function

        protected function buttonDown(event:TimerEvent) : void
        {
            if (!_autoRepeat)
            {
                endPress();
                return;
            }
            if (pressTimer.currentCount == 1)
            {
                pressTimer.delay = Number(getStyleValue("repeatInterval"));
            }
            dispatchEvent(new ComponentEvent(ComponentEvent.BUTTON_DOWN, true));
            return;
        }// end function

        public function set selected(param1:Boolean) : void
        {
            if (_selected == param1)
            {
                return;
            }
            _selected = param1;
            invalidate(InvalidationType.STATE);
            return;
        }// end function

        override public function get enabled() : Boolean
        {
            return super.enabled;
        }// end function

        override protected function draw() : void
        {
            if (isInvalid(InvalidationType.STYLES, InvalidationType.STATE))
            {
                drawBackground();
                invalidate(InvalidationType.SIZE, false);
            }
            if (isInvalid(InvalidationType.SIZE))
            {
                drawLayout();
            }
            super.draw();
            return;
        }// end function

        protected function setupMouseEvents() : void
        {
            addEventListener(MouseEvent.ROLL_OVER, mouseEventHandler, false, 0, true);
            addEventListener(MouseEvent.MOUSE_DOWN, mouseEventHandler, false, 0, true);
            addEventListener(MouseEvent.MOUSE_UP, mouseEventHandler, false, 0, true);
            addEventListener(MouseEvent.ROLL_OUT, mouseEventHandler, false, 0, true);
            return;
        }// end function

        protected function drawLayout() : void
        {
            background.width = width;
            background.height = height;
            return;
        }// end function

        protected function drawBackground() : void
        {
            var _loc_1:String = null;
            var _loc_2:DisplayObject = null;
            _loc_1 = enabled ? (mouseState) : ("disabled");
            if (selected)
            {
                _loc_1 = "selected" + _loc_1.substr(0, 1).toUpperCase() + _loc_1.substr(1);
            }
            _loc_1 = _loc_1 + "Skin";
            _loc_2 = background;
            background = getDisplayObjectInstance(getStyleValue(_loc_1));
            addChildAt(background, 0);
            if (_loc_2 != null && _loc_2 != background)
            {
                removeChild(_loc_2);
            }
            return;
        }// end function

        public static function getStyleDefinition() : Object
        {
            return defaultStyles;
        }// end function

    }
}
