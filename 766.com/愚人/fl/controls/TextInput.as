package fl.controls
{
    import fl.core.*;
    import fl.events.*;
    import fl.managers.*;
    import flash.display.*;
    import flash.events.*;
    import flash.text.*;
    import flash.ui.*;

    public class TextInput extends UIComponent implements IFocusManagerComponent
    {
        protected var _html:Boolean = false;
        protected var _savedHTML:String;
        protected var background:DisplayObject;
        protected var _editable:Boolean = true;
        public var textField:TextField;
        private static var defaultStyles:Object = {upSkin:"TextInput_upSkin", disabledSkin:"TextInput_disabledSkin", focusRectSkin:null, focusRectPadding:null, textFormat:null, disabledTextFormat:null, textPadding:0, embedFonts:false};
        public static var createAccessibilityImplementation:Function;

        public function TextInput()
        {
            _editable = true;
            _html = false;
            return;
        }// end function

        override public function drawFocus(param1:Boolean) : void
        {
            if (focusTarget != null)
            {
                focusTarget.drawFocus(param1);
                return;
            }
            super.drawFocus(param1);
            return;
        }// end function

        public function set imeMode(param1:String) : void
        {
            _imeMode = param1;
            return;
        }// end function

        override protected function isOurFocus(param1:DisplayObject) : Boolean
        {
            return param1 == textField || super.isOurFocus(param1);
        }// end function

        protected function handleKeyDown(event:KeyboardEvent) : void
        {
            if (event.keyCode == Keyboard.ENTER)
            {
                dispatchEvent(new ComponentEvent(ComponentEvent.ENTER, true));
            }
            return;
        }// end function

        public function set text(param1:String) : void
        {
            textField.text = param1;
            _html = false;
            invalidate(InvalidationType.DATA);
            invalidate(InvalidationType.STYLES);
            return;
        }// end function

        protected function updateTextFieldType() : void
        {
            textField.type = enabled && editable ? (TextFieldType.INPUT) : (TextFieldType.DYNAMIC);
            textField.selectable = enabled;
            return;
        }// end function

        public function get selectionEndIndex() : int
        {
            return textField.selectionEndIndex;
        }// end function

        public function get editable() : Boolean
        {
            return _editable;
        }// end function

        override protected function focusInHandler(event:FocusEvent) : void
        {
            var _loc_2:IFocusManager = null;
            if (event.target == this)
            {
                stage.focus = textField;
            }
            _loc_2 = focusManager;
            if (editable && _loc_2)
            {
                _loc_2.showFocusIndicator = true;
                if (textField.selectable && textField.selectionBeginIndex == textField.selectionBeginIndex)
                {
                    setSelection(0, textField.length);
                }
            }
            super.focusInHandler(event);
            if (editable)
            {
                setIMEMode(true);
            }
            return;
        }// end function

        public function get selectionBeginIndex() : int
        {
            return textField.selectionBeginIndex;
        }// end function

        public function set alwaysShowSelection(param1:Boolean) : void
        {
            textField.alwaysShowSelection = param1;
            return;
        }// end function

        override public function set enabled(param1:Boolean) : void
        {
            super.enabled = param1;
            updateTextFieldType();
            return;
        }// end function

        protected function setEmbedFont()
        {
            var _loc_1:Object = null;
            _loc_1 = getStyleValue("embedFonts");
            if (_loc_1 != null)
            {
                textField.embedFonts = _loc_1;
            }
            return;
        }// end function

        public function get horizontalScrollPosition() : int
        {
            return textField.scrollH;
        }// end function

        public function set condenseWhite(param1:Boolean) : void
        {
            textField.condenseWhite = param1;
            return;
        }// end function

        public function set displayAsPassword(param1:Boolean) : void
        {
            textField.displayAsPassword = param1;
            return;
        }// end function

        public function set horizontalScrollPosition(param1:int) : void
        {
            textField.scrollH = param1;
            return;
        }// end function

        public function get restrict() : String
        {
            return textField.restrict;
        }// end function

        public function get textWidth() : Number
        {
            return textField.textWidth;
        }// end function

        public function get textHeight() : Number
        {
            return textField.textHeight;
        }// end function

        public function set editable(param1:Boolean) : void
        {
            _editable = param1;
            updateTextFieldType();
            return;
        }// end function

        public function get maxChars() : int
        {
            return textField.maxChars;
        }// end function

        public function get length() : int
        {
            return textField.length;
        }// end function

        public function getLineMetrics(param1:int) : TextLineMetrics
        {
            return textField.getLineMetrics(param1);
        }// end function

        public function get imeMode() : String
        {
            return _imeMode;
        }// end function

        override protected function focusOutHandler(event:FocusEvent) : void
        {
            super.focusOutHandler(event);
            if (editable)
            {
                setIMEMode(false);
            }
            return;
        }// end function

        public function set htmlText(param1:String) : void
        {
            if (param1 == "")
            {
                text = "";
                return;
            }
            _html = true;
            _savedHTML = param1;
            textField.htmlText = param1;
            invalidate(InvalidationType.DATA);
            invalidate(InvalidationType.STYLES);
            return;
        }// end function

        public function get text() : String
        {
            return textField.text;
        }// end function

        override public function get enabled() : Boolean
        {
            return super.enabled;
        }// end function

        public function get condenseWhite() : Boolean
        {
            return textField.condenseWhite;
        }// end function

        public function get alwaysShowSelection() : Boolean
        {
            return textField.alwaysShowSelection;
        }// end function

        override protected function draw() : void
        {
            var _loc_1:Object = null;
            if (isInvalid(InvalidationType.STYLES, InvalidationType.STATE))
            {
                drawTextFormat();
                drawBackground();
                _loc_1 = getStyleValue("embedFonts");
                if (_loc_1 != null)
                {
                    textField.embedFonts = _loc_1;
                }
                invalidate(InvalidationType.SIZE, false);
            }
            if (isInvalid(InvalidationType.SIZE))
            {
                drawLayout();
            }
            super.draw();
            return;
        }// end function

        protected function handleTextInput(event:TextEvent) : void
        {
            event.stopPropagation();
            dispatchEvent(new TextEvent(TextEvent.TEXT_INPUT, true, false, event.text));
            return;
        }// end function

        override protected function configUI() : void
        {
            super.configUI();
            tabChildren = true;
            textField = new TextField();
            addChild(textField);
            updateTextFieldType();
            textField.addEventListener(TextEvent.TEXT_INPUT, handleTextInput, false, 0, true);
            textField.addEventListener(Event.CHANGE, handleChange, false, 0, true);
            textField.addEventListener(KeyboardEvent.KEY_DOWN, handleKeyDown, false, 0, true);
            return;
        }// end function

        public function setSelection(param1:int, param2:int) : void
        {
            textField.setSelection(param1, param2);
            return;
        }// end function

        public function get displayAsPassword() : Boolean
        {
            return textField.displayAsPassword;
        }// end function

        public function appendText(param1:String) : void
        {
            textField.appendText(param1);
            return;
        }// end function

        public function set restrict(param1:String) : void
        {
            if (componentInspectorSetting && param1 == "")
            {
                param1 = null;
            }
            textField.restrict = param1;
            return;
        }// end function

        public function get htmlText() : String
        {
            return textField.htmlText;
        }// end function

        protected function drawBackground() : void
        {
            var _loc_1:DisplayObject = null;
            var _loc_2:String = null;
            _loc_1 = background;
            _loc_2 = enabled ? ("upSkin") : ("disabledSkin");
            background = getDisplayObjectInstance(getStyleValue(_loc_2));
            if (background == null)
            {
                return;
            }
            addChildAt(background, 0);
            if (_loc_1 != null && _loc_1 != background && contains(_loc_1))
            {
                removeChild(_loc_1);
            }
            return;
        }// end function

        override public function setFocus() : void
        {
            stage.focus = textField;
            return;
        }// end function

        protected function drawLayout() : void
        {
            var _loc_1:Number = NaN;
            _loc_1 = Number(getStyleValue("textPadding"));
            if (background != null)
            {
                background.width = width;
                background.height = height;
            }
            textField.width = width - 2 * _loc_1;
            textField.height = height - 2 * _loc_1;
            var _loc_2:* = _loc_1;
            textField.y = _loc_1;
            textField.x = _loc_2;
            return;
        }// end function

        public function set maxChars(param1:int) : void
        {
            textField.maxChars = param1;
            return;
        }// end function

        public function get maxHorizontalScrollPosition() : int
        {
            return textField.maxScrollH;
        }// end function

        protected function drawTextFormat() : void
        {
            var _loc_1:Object = null;
            var _loc_2:TextFormat = null;
            var _loc_3:TextFormat = null;
            _loc_1 = UIComponent.getStyleDefinition();
            _loc_2 = enabled ? (_loc_1.defaultTextFormat as TextFormat) : (_loc_1.defaultDisabledTextFormat as TextFormat);
            textField.setTextFormat(_loc_2);
            _loc_3 = getStyleValue(enabled ? ("textFormat") : ("disabledTextFormat")) as TextFormat;
            if (_loc_3 != null)
            {
                textField.setTextFormat(_loc_3);
            }
            else
            {
                _loc_3 = _loc_2;
            }
            textField.defaultTextFormat = _loc_3;
            setEmbedFont();
            if (_html)
            {
                textField.htmlText = _savedHTML;
            }
            return;
        }// end function

        protected function handleChange(event:Event) : void
        {
            event.stopPropagation();
            dispatchEvent(new Event(Event.CHANGE, true));
            return;
        }// end function

        public static function getStyleDefinition() : Object
        {
            return defaultStyles;
        }// end function

    }
}
