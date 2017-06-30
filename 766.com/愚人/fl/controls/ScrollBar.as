package fl.controls
{
    import fl.core.*;
    import fl.events.*;
    import flash.events.*;

    public class ScrollBar extends UIComponent
    {
        private var _direction:String = "vertical";
        protected var inDrag:Boolean = false;
        protected var upArrow:BaseButton;
        private var _pageScrollSize:Number = 0;
        protected var downArrow:BaseButton;
        private var _pageSize:Number = 10;
        private var thumbScrollOffset:Number;
        private var _maxScrollPosition:Number = 0;
        private var _scrollPosition:Number = 0;
        protected var track:BaseButton;
        private var _minScrollPosition:Number = 0;
        private var _lineScrollSize:Number = 1;
        protected var thumb:LabelButton;
        private static var defaultStyles:Object = {downArrowDisabledSkin:"ScrollArrowDown_disabledSkin", downArrowDownSkin:"ScrollArrowDown_downSkin", downArrowOverSkin:"ScrollArrowDown_overSkin", downArrowUpSkin:"ScrollArrowDown_upSkin", thumbDisabledSkin:"ScrollThumb_upSkin", thumbDownSkin:"ScrollThumb_downSkin", thumbOverSkin:"ScrollThumb_overSkin", thumbUpSkin:"ScrollThumb_upSkin", trackDisabledSkin:"ScrollTrack_skin", trackDownSkin:"ScrollTrack_skin", trackOverSkin:"ScrollTrack_skin", trackUpSkin:"ScrollTrack_skin", upArrowDisabledSkin:"ScrollArrowUp_disabledSkin", upArrowDownSkin:"ScrollArrowUp_downSkin", upArrowOverSkin:"ScrollArrowUp_overSkin", upArrowUpSkin:"ScrollArrowUp_upSkin", thumbIcon:"ScrollBar_thumbIcon", repeatDelay:500, repeatInterval:35};
        static const THUMB_STYLES:Object = {disabledSkin:"thumbDisabledSkin", downSkin:"thumbDownSkin", overSkin:"thumbOverSkin", upSkin:"thumbUpSkin", icon:"thumbIcon", textPadding:0};
        public static const WIDTH:Number = 15;
        static const DOWN_ARROW_STYLES:Object = {disabledSkin:"downArrowDisabledSkin", downSkin:"downArrowDownSkin", overSkin:"downArrowOverSkin", upSkin:"downArrowUpSkin", repeatDelay:"repeatDelay", repeatInterval:"repeatInterval"};
        static const UP_ARROW_STYLES:Object = {disabledSkin:"upArrowDisabledSkin", downSkin:"upArrowDownSkin", overSkin:"upArrowOverSkin", upSkin:"upArrowUpSkin", repeatDelay:"repeatDelay", repeatInterval:"repeatInterval"};
        static const TRACK_STYLES:Object = {disabledSkin:"trackDisabledSkin", downSkin:"trackDownSkin", overSkin:"trackOverSkin", upSkin:"trackUpSkin", repeatDelay:"repeatDelay", repeatInterval:"repeatInterval"};

        public function ScrollBar()
        {
            _pageSize = 10;
            _pageScrollSize = 0;
            _lineScrollSize = 1;
            _minScrollPosition = 0;
            _maxScrollPosition = 0;
            _scrollPosition = 0;
            _direction = ScrollBarDirection.VERTICAL;
            inDrag = false;
            setStyles();
            focusEnabled = false;
            return;
        }// end function

        public function get minScrollPosition() : Number
        {
            return _minScrollPosition;
        }// end function

        public function set minScrollPosition(param1:Number) : void
        {
            setScrollProperties(_pageSize, param1, _maxScrollPosition);
            return;
        }// end function

        public function setScrollPosition(param1:Number, param2:Boolean = true) : void
        {
            var _loc_3:Number = NaN;
            _loc_3 = scrollPosition;
            _scrollPosition = Math.max(_minScrollPosition, Math.min(_maxScrollPosition, param1));
            if (_loc_3 == _scrollPosition)
            {
                return;
            }
            if (param2)
            {
                dispatchEvent(new ScrollEvent(_direction, scrollPosition - _loc_3, scrollPosition));
            }
            updateThumb();
            return;
        }// end function

        public function set scrollPosition(param1:Number) : void
        {
            setScrollPosition(param1, true);
            return;
        }// end function

        public function get pageScrollSize() : Number
        {
            return _pageScrollSize == 0 ? (_pageSize) : (_pageScrollSize);
        }// end function

        public function set pageSize(param1:Number) : void
        {
            if (param1 > 0)
            {
                _pageSize = param1;
            }
            return;
        }// end function

        public function setScrollProperties(param1:Number, param2:Number, param3:Number, param4:Number = 0) : void
        {
            this.pageSize = param1;
            _minScrollPosition = param2;
            _maxScrollPosition = param3;
            if (param4 >= 0)
            {
                _pageScrollSize = param4;
            }
            enabled = _maxScrollPosition > _minScrollPosition;
            setScrollPosition(_scrollPosition, false);
            updateThumb();
            return;
        }// end function

        override public function set enabled(param1:Boolean) : void
        {
            super.enabled = param1;
            var _loc_2:* = enabled && _maxScrollPosition > _minScrollPosition;
            upArrow.enabled = enabled && _maxScrollPosition > _minScrollPosition;
            var _loc_2:* = _loc_2;
            thumb.enabled = _loc_2;
            var _loc_2:* = _loc_2;
            track.enabled = _loc_2;
            downArrow.enabled = _loc_2;
            updateThumb();
            return;
        }// end function

        protected function updateThumb() : void
        {
            var _loc_1:Number = NaN;
            _loc_1 = _maxScrollPosition - _minScrollPosition + _pageSize;
            if (track.height <= 12 || _maxScrollPosition <= _minScrollPosition || (_loc_1 == 0 || isNaN(_loc_1)))
            {
                thumb.height = 12;
                thumb.visible = false;
            }
            else
            {
                thumb.height = Math.max(13, _pageSize / _loc_1 * track.height);
                thumb.y = track.y + (track.height - thumb.height) * ((_scrollPosition - _minScrollPosition) / (_maxScrollPosition - _minScrollPosition));
                thumb.visible = enabled;
            }
            return;
        }// end function

        protected function thumbPressHandler(event:MouseEvent) : void
        {
            inDrag = true;
            thumbScrollOffset = mouseY - thumb.y;
            thumb.mouseStateLocked = true;
            mouseChildren = false;
            stage.addEventListener(MouseEvent.MOUSE_MOVE, handleThumbDrag, false, 0, true);
            stage.addEventListener(MouseEvent.MOUSE_UP, thumbReleaseHandler, false, 0, true);
            return;
        }// end function

        protected function thumbReleaseHandler(event:MouseEvent) : void
        {
            inDrag = false;
            mouseChildren = true;
            thumb.mouseStateLocked = false;
            stage.removeEventListener(MouseEvent.MOUSE_MOVE, handleThumbDrag);
            stage.removeEventListener(MouseEvent.MOUSE_UP, thumbReleaseHandler);
            return;
        }// end function

        public function set pageScrollSize(param1:Number) : void
        {
            if (param1 >= 0)
            {
                _pageScrollSize = param1;
            }
            return;
        }// end function

        protected function handleThumbDrag(event:MouseEvent) : void
        {
            var _loc_2:Number = NaN;
            _loc_2 = Math.max(0, Math.min(track.height - thumb.height, mouseY - track.y - thumbScrollOffset));
            setScrollPosition(_loc_2 / (track.height - thumb.height) * (_maxScrollPosition - _minScrollPosition) + _minScrollPosition);
            return;
        }// end function

        public function set direction(param1:String) : void
        {
            var _loc_2:Boolean = false;
            if (_direction == param1)
            {
                return;
            }
            _direction = param1;
            if (isLivePreview)
            {
                return;
            }
            setScaleY(1);
            _loc_2 = _direction == ScrollBarDirection.HORIZONTAL;
            if (_loc_2 && componentInspectorSetting)
            {
                if (rotation == 90)
                {
                    return;
                }
                setScaleX(-1);
                rotation = -90;
            }
            if (!componentInspectorSetting)
            {
                if (_loc_2 && rotation == 0)
                {
                    rotation = -90;
                    setScaleX(-1);
                }
                else if (!_loc_2 && rotation == -90)
                {
                    rotation = 0;
                    setScaleX(1);
                }
            }
            invalidate(InvalidationType.SIZE);
            return;
        }// end function

        public function set lineScrollSize(param1:Number) : void
        {
            if (param1 > 0)
            {
                _lineScrollSize = param1;
            }
            return;
        }// end function

        override public function get height() : Number
        {
            return _direction == ScrollBarDirection.HORIZONTAL ? (super.width) : (super.height);
        }// end function

        protected function scrollPressHandler(event:ComponentEvent) : void
        {
            var _loc_2:Number = NaN;
            var _loc_3:Number = NaN;
            event.stopImmediatePropagation();
            if (event.currentTarget == upArrow)
            {
                setScrollPosition(_scrollPosition - _lineScrollSize);
            }
            else if (event.currentTarget == downArrow)
            {
                setScrollPosition(_scrollPosition + _lineScrollSize);
            }
            else
            {
                _loc_2 = track.mouseY / track.height * (_maxScrollPosition - _minScrollPosition) + _minScrollPosition;
                _loc_3 = pageScrollSize == 0 ? (pageSize) : (pageScrollSize);
                if (_scrollPosition < _loc_2)
                {
                    setScrollPosition(Math.min(_loc_2, _scrollPosition + _loc_3));
                }
                else if (_scrollPosition > _loc_2)
                {
                    setScrollPosition(Math.max(_loc_2, _scrollPosition - _loc_3));
                }
            }
            return;
        }// end function

        public function get pageSize() : Number
        {
            return _pageSize;
        }// end function

        public function set maxScrollPosition(param1:Number) : void
        {
            setScrollProperties(_pageSize, _minScrollPosition, param1);
            return;
        }// end function

        public function get scrollPosition() : Number
        {
            return _scrollPosition;
        }// end function

        override public function get enabled() : Boolean
        {
            return super.enabled;
        }// end function

        override protected function draw() : void
        {
            var _loc_1:Number = NaN;
            if (isInvalid(InvalidationType.SIZE))
            {
                _loc_1 = super.height;
                downArrow.move(0, Math.max(upArrow.height, _loc_1 - downArrow.height));
                track.setSize(WIDTH, Math.max(0, _loc_1 - (downArrow.height + upArrow.height)));
                updateThumb();
            }
            if (isInvalid(InvalidationType.STYLES, InvalidationType.STATE))
            {
                setStyles();
            }
            downArrow.drawNow();
            upArrow.drawNow();
            track.drawNow();
            thumb.drawNow();
            validate();
            return;
        }// end function

        override protected function configUI() : void
        {
            super.configUI();
            track = new BaseButton();
            track.move(0, 14);
            track.useHandCursor = false;
            track.autoRepeat = true;
            track.focusEnabled = false;
            addChild(track);
            thumb = new LabelButton();
            thumb.label = "";
            thumb.setSize(WIDTH, 15);
            thumb.move(0, 15);
            thumb.focusEnabled = false;
            addChild(thumb);
            downArrow = new BaseButton();
            downArrow.setSize(WIDTH, 14);
            downArrow.autoRepeat = true;
            downArrow.focusEnabled = false;
            addChild(downArrow);
            upArrow = new BaseButton();
            upArrow.setSize(WIDTH, 14);
            upArrow.move(0, 0);
            upArrow.autoRepeat = true;
            upArrow.focusEnabled = false;
            addChild(upArrow);
            upArrow.addEventListener(ComponentEvent.BUTTON_DOWN, scrollPressHandler, false, 0, true);
            downArrow.addEventListener(ComponentEvent.BUTTON_DOWN, scrollPressHandler, false, 0, true);
            track.addEventListener(ComponentEvent.BUTTON_DOWN, scrollPressHandler, false, 0, true);
            thumb.addEventListener(MouseEvent.MOUSE_DOWN, thumbPressHandler, false, 0, true);
            enabled = false;
            return;
        }// end function

        public function get direction() : String
        {
            return _direction;
        }// end function

        public function get lineScrollSize() : Number
        {
            return _lineScrollSize;
        }// end function

        override public function setSize(param1:Number, param2:Number) : void
        {
            if (_direction == ScrollBarDirection.HORIZONTAL)
            {
                super.setSize(param2, param1);
            }
            else
            {
                super.setSize(param1, param2);
            }
            return;
        }// end function

        public function get maxScrollPosition() : Number
        {
            return _maxScrollPosition;
        }// end function

        override public function get width() : Number
        {
            return _direction == ScrollBarDirection.HORIZONTAL ? (super.height) : (super.width);
        }// end function

        protected function setStyles() : void
        {
            copyStylesToChild(downArrow, DOWN_ARROW_STYLES);
            copyStylesToChild(thumb, THUMB_STYLES);
            copyStylesToChild(track, TRACK_STYLES);
            copyStylesToChild(upArrow, UP_ARROW_STYLES);
            return;
        }// end function

        public static function getStyleDefinition() : Object
        {
            return defaultStyles;
        }// end function

    }
}
