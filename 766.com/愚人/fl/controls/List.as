package fl.controls
{
    import fl.controls.listClasses.*;
    import fl.core.*;
    import flash.display.*;
    import flash.events.*;
    import flash.geom.*;
    import flash.ui.*;
    import flash.utils.*;

    public class List extends SelectableList implements IFocusManagerComponent
    {
        protected var _labelField:String = "label";
        protected var _rowHeight:Number = 20;
        protected var _cellRenderer:Object;
        protected var _iconField:String = "icon";
        protected var _labelFunction:Function;
        protected var _iconFunction:Function;
        private static var defaultStyles:Object = {focusRectSkin:null, focusRectPadding:null};
        public static var createAccessibilityImplementation:Function;

        public function List()
        {
            _rowHeight = 20;
            _labelField = "label";
            _iconField = "icon";
            return;
        }// end function

        public function get iconField() : String
        {
            return _iconField;
        }// end function

        protected function doKeySelection(param1:int, param2:Boolean, param3:Boolean) : void
        {
            var _loc_4:Boolean = false;
            var _loc_5:int = 0;
            var _loc_6:Array = null;
            var _loc_7:int = 0;
            var _loc_8:int = 0;
            _loc_4 = false;
            if (param2)
            {
                _loc_6 = [];
                _loc_7 = lastCaretIndex;
                _loc_8 = param1;
                if (_loc_7 == -1)
                {
                    _loc_7 = caretIndex != -1 ? (caretIndex) : (param1);
                }
                if (_loc_7 > _loc_8)
                {
                    _loc_8 = _loc_7;
                    _loc_7 = param1;
                }
                _loc_5 = _loc_7;
                while (_loc_5 <= _loc_8)
                {
                    
                    _loc_6.push(_loc_5);
                    _loc_5++;
                }
                selectedIndices = _loc_6;
                caretIndex = param1;
                _loc_4 = true;
            }
            else
            {
                selectedIndex = param1;
                var _loc_9:* = param1;
                lastCaretIndex = param1;
                caretIndex = _loc_9;
                _loc_4 = true;
            }
            if (_loc_4)
            {
                dispatchEvent(new Event(Event.CHANGE));
            }
            invalidate(InvalidationType.DATA);
            return;
        }// end function

        override protected function drawList() : void
        {
            var _loc_1:Rectangle = null;
            var _loc_2:uint = 0;
            var _loc_3:uint = 0;
            var _loc_4:uint = 0;
            var _loc_5:Object = null;
            var _loc_6:ICellRenderer = null;
            var _loc_7:Dictionary = null;
            var _loc_8:Dictionary = null;
            var _loc_9:Boolean = false;
            var _loc_10:String = null;
            var _loc_11:Object = null;
            var _loc_12:Sprite = null;
            var _loc_13:String = null;
            var _loc_14:* = contentPadding;
            listHolder.y = contentPadding;
            listHolder.x = _loc_14;
            _loc_1 = listHolder.scrollRect;
            _loc_1.x = _horizontalScrollPosition;
            _loc_1.y = Math.floor(_verticalScrollPosition) % rowHeight;
            listHolder.scrollRect = _loc_1;
            listHolder.cacheAsBitmap = useBitmapScrolling;
            _loc_2 = Math.floor(_verticalScrollPosition / rowHeight);
            _loc_3 = Math.min(length, _loc_2 + rowCount + 1);
            var _loc_14:* = new Dictionary(true);
            renderedItems = new Dictionary(true);
            _loc_7 = _loc_14;
            _loc_4 = _loc_2;
            while (_loc_4 < _loc_3)
            {
                
                _loc_7[_dataProvider.getItemAt(_loc_4)] = true;
                _loc_4 = _loc_4 + 1;
            }
            _loc_8 = new Dictionary(true);
            while (activeCellRenderers.length > 0)
            {
                
                _loc_6 = activeCellRenderers.pop() as ICellRenderer;
                _loc_5 = _loc_6.data;
                if (_loc_7[_loc_5] == null || invalidItems[_loc_5] == true)
                {
                    availableCellRenderers.push(_loc_6);
                }
                else
                {
                    _loc_8[_loc_5] = _loc_6;
                    invalidItems[_loc_5] = true;
                }
                list.removeChild(_loc_6 as DisplayObject);
            }
            invalidItems = new Dictionary(true);
            _loc_4 = _loc_2;
            while (_loc_4 < _loc_3)
            {
                
                _loc_9 = false;
                _loc_5 = _dataProvider.getItemAt(_loc_4);
                if (_loc_8[_loc_5] != null)
                {
                    _loc_9 = true;
                    _loc_6 = _loc_8[_loc_5];
                    delete _loc_8[_loc_5];
                }
                else if (availableCellRenderers.length > 0)
                {
                    _loc_6 = availableCellRenderers.pop() as ICellRenderer;
                }
                else
                {
                    _loc_6 = getDisplayObjectInstance(getStyleValue("cellRenderer")) as ICellRenderer;
                    _loc_12 = _loc_6 as Sprite;
                    if (_loc_12 != null)
                    {
                        _loc_12.addEventListener(MouseEvent.CLICK, handleCellRendererClick, false, 0, true);
                        _loc_12.addEventListener(MouseEvent.ROLL_OVER, handleCellRendererMouseEvent, false, 0, true);
                        _loc_12.addEventListener(MouseEvent.ROLL_OUT, handleCellRendererMouseEvent, false, 0, true);
                        _loc_12.addEventListener(Event.CHANGE, handleCellRendererChange, false, 0, true);
                        _loc_12.doubleClickEnabled = true;
                        _loc_12.addEventListener(MouseEvent.DOUBLE_CLICK, handleCellRendererDoubleClick, false, 0, true);
                        if (_loc_12["setStyle"] != null)
                        {
                            for (_loc_13 in rendererStyles)
                            {
                                
                                var _loc_16:* = _loc_12;
                                _loc_16._loc_12["setStyle"](_loc_13, rendererStyles[_loc_13]);
                            }
                        }
                    }
                }
                list.addChild(_loc_6 as Sprite);
                activeCellRenderers.push(_loc_6);
                _loc_6.y = rowHeight * (_loc_4 - _loc_2);
                _loc_6.setSize(availableWidth + _maxHorizontalScrollPosition, rowHeight);
                _loc_10 = itemToLabel(_loc_5);
                _loc_11 = null;
                if (_iconFunction != null)
                {
                    _loc_11 = _iconFunction(_loc_5);
                }
                else if (_iconField != null)
                {
                    _loc_11 = _loc_5[_iconField];
                }
                if (!_loc_9)
                {
                    _loc_6.data = _loc_5;
                }
                _loc_6.listData = new ListData(_loc_10, _loc_11, this, _loc_4, _loc_4, 0);
                _loc_6.selected = _selectedIndices.indexOf(_loc_4) != -1;
                if (_loc_6 is UIComponent)
                {
                    (_loc_6 as UIComponent).drawNow();
                }
                _loc_4 = _loc_4 + 1;
            }
            return;
        }// end function

        public function get iconFunction() : Function
        {
            return _iconFunction;
        }// end function

        public function set iconField(param1:String) : void
        {
            if (param1 == _iconField)
            {
                return;
            }
            _iconField = param1;
            invalidate(InvalidationType.DATA);
            return;
        }// end function

        override protected function keyDownHandler(event:KeyboardEvent) : void
        {
            var _loc_2:int = 0;
            if (!selectable)
            {
                return;
            }
            switch(event.keyCode)
            {
                case Keyboard.UP:
                case Keyboard.DOWN:
                case Keyboard.END:
                case Keyboard.HOME:
                case Keyboard.PAGE_UP:
                case Keyboard.PAGE_DOWN:
                {
                    moveSelectionVertically(event.keyCode, event.shiftKey && _allowMultipleSelection, event.ctrlKey && _allowMultipleSelection);
                    break;
                }
                case Keyboard.LEFT:
                case Keyboard.RIGHT:
                {
                    moveSelectionHorizontally(event.keyCode, event.shiftKey && _allowMultipleSelection, event.ctrlKey && _allowMultipleSelection);
                    break;
                }
                case Keyboard.SPACE:
                {
                    if (caretIndex == -1)
                    {
                        caretIndex = 0;
                    }
                    doKeySelection(caretIndex, event.shiftKey, event.ctrlKey);
                    scrollToSelected();
                    break;
                }
                default:
                {
                    _loc_2 = getNextIndexAtLetter(String.fromCharCode(event.keyCode), selectedIndex);
                    if (_loc_2 > -1)
                    {
                        selectedIndex = _loc_2;
                        scrollToSelected();
                    }
                    break;
                    break;
                }
            }
            event.stopPropagation();
            return;
        }// end function

        override public function itemToLabel(param1:Object) : String
        {
            if (_labelFunction != null)
            {
                return String(_labelFunction(param1));
            }
            return param1[_labelField] != null ? (String(param1[_labelField])) : ("");
        }// end function

        public function get labelField() : String
        {
            return _labelField;
        }// end function

        override protected function moveSelectionVertically(param1:uint, param2:Boolean, param3:Boolean) : void
        {
            var _loc_4:int = 0;
            var _loc_5:int = 0;
            var _loc_6:int = 0;
            _loc_4 = Math.max(Math.floor(calculateAvailableHeight() / rowHeight), 1);
            _loc_5 = -1;
            _loc_6 = 0;
            switch(param1)
            {
                case Keyboard.UP:
                {
                    if (caretIndex > 0)
                    {
                        _loc_5 = caretIndex - 1;
                    }
                    break;
                }
                case Keyboard.DOWN:
                {
                    if (caretIndex < (length - 1))
                    {
                        _loc_5 = caretIndex + 1;
                    }
                    break;
                }
                case Keyboard.PAGE_UP:
                {
                    if (caretIndex > 0)
                    {
                        _loc_5 = Math.max(caretIndex - _loc_4, 0);
                    }
                    break;
                }
                case Keyboard.PAGE_DOWN:
                {
                    if (caretIndex < (length - 1))
                    {
                        _loc_5 = Math.min(caretIndex + _loc_4, (length - 1));
                    }
                    break;
                }
                case Keyboard.HOME:
                {
                    if (caretIndex > 0)
                    {
                        _loc_5 = 0;
                    }
                    break;
                }
                case Keyboard.END:
                {
                    if (caretIndex < (length - 1))
                    {
                        _loc_5 = length - 1;
                    }
                    break;
                }
                default:
                {
                    break;
                }
            }
            if (_loc_5 >= 0)
            {
                doKeySelection(_loc_5, param2, param3);
                scrollToSelected();
            }
            return;
        }// end function

        public function set labelField(param1:String) : void
        {
            if (param1 == _labelField)
            {
                return;
            }
            _labelField = param1;
            invalidate(InvalidationType.DATA);
            return;
        }// end function

        public function set rowCount(param1:uint) : void
        {
            var _loc_2:Number = NaN;
            var _loc_3:Number = NaN;
            _loc_2 = Number(getStyleValue("contentPadding"));
            _loc_3 = _horizontalScrollPolicy == ScrollPolicy.ON || _horizontalScrollPolicy == ScrollPolicy.AUTO && _maxHorizontalScrollPosition > 0 ? (15) : (0);
            height = rowHeight * param1 + 2 * _loc_2 + _loc_3;
            return;
        }// end function

        override protected function setHorizontalScrollPosition(param1:Number, param2:Boolean = false) : void
        {
            list.x = -param1;
            super.setHorizontalScrollPosition(param1, true);
            return;
        }// end function

        public function set iconFunction(param1:Function) : void
        {
            if (_iconFunction == param1)
            {
                return;
            }
            _iconFunction = param1;
            invalidate(InvalidationType.DATA);
            return;
        }// end function

        public function get labelFunction() : Function
        {
            return _labelFunction;
        }// end function

        override protected function moveSelectionHorizontally(param1:uint, param2:Boolean, param3:Boolean) : void
        {
            return;
        }// end function

        override protected function setVerticalScrollPosition(param1:Number, param2:Boolean = false) : void
        {
            invalidate(InvalidationType.SCROLL);
            super.setVerticalScrollPosition(param1, true);
            return;
        }// end function

        protected function calculateAvailableHeight() : Number
        {
            var _loc_1:Number = NaN;
            _loc_1 = Number(getStyleValue("contentPadding"));
            return height - _loc_1 * 2 - (_horizontalScrollPolicy == ScrollPolicy.ON || _horizontalScrollPolicy == ScrollPolicy.AUTO && _maxHorizontalScrollPosition > 0 ? (15) : (0));
        }// end function

        override protected function draw() : void
        {
            var _loc_1:Boolean = false;
            _loc_1 = contentHeight != rowHeight * length;
            contentHeight = rowHeight * length;
            if (isInvalid(InvalidationType.STYLES))
            {
                setStyles();
                drawBackground();
                if (contentPadding != getStyleValue("contentPadding"))
                {
                    invalidate(InvalidationType.SIZE, false);
                }
                if (_cellRenderer != getStyleValue("cellRenderer"))
                {
                    _invalidateList();
                    _cellRenderer = getStyleValue("cellRenderer");
                }
            }
            if (isInvalid(InvalidationType.SIZE, InvalidationType.STATE) || _loc_1)
            {
                drawLayout();
            }
            if (isInvalid(InvalidationType.RENDERER_STYLES))
            {
                updateRendererStyles();
            }
            if (isInvalid(InvalidationType.STYLES, InvalidationType.SIZE, InvalidationType.DATA, InvalidationType.SCROLL, InvalidationType.SELECTED))
            {
                drawList();
            }
            updateChildren();
            validate();
            return;
        }// end function

        override protected function configUI() : void
        {
            useFixedHorizontalScrolling = true;
            _horizontalScrollPolicy = ScrollPolicy.AUTO;
            _verticalScrollPolicy = ScrollPolicy.AUTO;
            super.configUI();
            return;
        }// end function

        override public function get rowCount() : uint
        {
            return Math.ceil(calculateAvailableHeight() / rowHeight);
        }// end function

        override protected function initializeAccessibility() : void
        {
            if (List.createAccessibilityImplementation != null)
            {
                List.createAccessibilityImplementation(this);
            }
            return;
        }// end function

        override public function scrollToIndex(param1:int) : void
        {
            var _loc_2:uint = 0;
            var _loc_3:uint = 0;
            drawNow();
            _loc_2 = Math.floor((_verticalScrollPosition + availableHeight) / rowHeight) - 1;
            _loc_3 = Math.ceil(_verticalScrollPosition / rowHeight);
            if (param1 < _loc_3)
            {
                verticalScrollPosition = param1 * rowHeight;
            }
            else if (param1 > _loc_2)
            {
                verticalScrollPosition = (param1 + 1) * rowHeight - availableHeight;
            }
            return;
        }// end function

        public function get rowHeight() : Number
        {
            return _rowHeight;
        }// end function

        public function set labelFunction(param1:Function) : void
        {
            if (_labelFunction == param1)
            {
                return;
            }
            _labelFunction = param1;
            invalidate(InvalidationType.DATA);
            return;
        }// end function

        public function set rowHeight(param1:Number) : void
        {
            _rowHeight = param1;
            invalidate(InvalidationType.SIZE);
            return;
        }// end function

        public static function getStyleDefinition() : Object
        {
            return mergeStyles(defaultStyles, SelectableList.getStyleDefinition());
        }// end function

    }
}
