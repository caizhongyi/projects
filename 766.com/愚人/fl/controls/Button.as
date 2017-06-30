package fl.controls
{
    import fl.core.*;
    import flash.display.*;

    public class Button extends LabelButton implements IFocusManagerComponent
    {
        protected var emphasizedBorder:DisplayObject;
        protected var _emphasized:Boolean = false;
        private static var defaultStyles:Object = {emphasizedSkin:"Button_emphasizedSkin", emphasizedPadding:2};
        public static var createAccessibilityImplementation:Function;

        public function Button()
        {
            _emphasized = false;
            return;
        }// end function

        override public function drawFocus(param1:Boolean) : void
        {
            var _loc_2:Number = NaN;
            var _loc_3:* = undefined;
            super.drawFocus(param1);
            if (param1)
            {
                _loc_2 = Number(getStyleValue("emphasizedPadding"));
                if (_loc_2 < 0 || !_emphasized)
                {
                    _loc_2 = 0;
                }
                _loc_3 = getStyleValue("focusRectPadding");
                _loc_3 = _loc_3 == null ? (2) : (_loc_3);
                _loc_3 = _loc_3 + _loc_2;
                uiFocusRect.x = -_loc_3;
                uiFocusRect.y = -_loc_3;
                uiFocusRect.width = width + _loc_3 * 2;
                uiFocusRect.height = height + _loc_3 * 2;
            }
            return;
        }// end function

        public function set emphasized(param1:Boolean) : void
        {
            _emphasized = param1;
            invalidate(InvalidationType.STYLES);
            return;
        }// end function

        override protected function draw() : void
        {
            if (isInvalid(InvalidationType.STYLES) || isInvalid(InvalidationType.SIZE))
            {
                drawEmphasized();
            }
            super.draw();
            if (emphasizedBorder != null)
            {
                setChildIndex(emphasizedBorder, (numChildren - 1));
            }
            return;
        }// end function

        public function get emphasized() : Boolean
        {
            return _emphasized;
        }// end function

        override protected function initializeAccessibility() : void
        {
            if (Button.createAccessibilityImplementation != null)
            {
                Button.createAccessibilityImplementation(this);
            }
            return;
        }// end function

        protected function drawEmphasized() : void
        {
            var _loc_1:Object = null;
            var _loc_2:Number = NaN;
            if (emphasizedBorder != null)
            {
                removeChild(emphasizedBorder);
            }
            emphasizedBorder = null;
            if (!_emphasized)
            {
                return;
            }
            _loc_1 = getStyleValue("emphasizedSkin");
            if (_loc_1 != null)
            {
                emphasizedBorder = getDisplayObjectInstance(_loc_1);
            }
            if (emphasizedBorder != null)
            {
                addChildAt(emphasizedBorder, 0);
                _loc_2 = Number(getStyleValue("emphasizedPadding"));
                var _loc_3:* = -_loc_2;
                emphasizedBorder.y = -_loc_2;
                emphasizedBorder.x = _loc_3;
                emphasizedBorder.width = width + _loc_2 * 2;
                emphasizedBorder.height = height + _loc_2 * 2;
            }
            return;
        }// end function

        public static function getStyleDefinition() : Object
        {
            return UIComponent.mergeStyles(LabelButton.getStyleDefinition(), defaultStyles);
        }// end function

    }
}
