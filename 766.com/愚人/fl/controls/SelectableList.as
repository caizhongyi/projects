package fl.controls
{
    import fl.containers.*;
    import fl.controls.listClasses.*;
    import fl.core.*;
    import fl.data.*;
    import fl.events.*;
    import flash.display.*;
    import flash.events.*;
    import flash.ui.*;
    import flash.utils.*;

    public class SelectableList extends BaseScrollPane implements IFocusManagerComponent
    {
        protected var invalidItems:Dictionary;
        protected var renderedItems:Dictionary;
        protected var listHolder:Sprite;
        protected var _allowMultipleSelection:Boolean = false;
        protected var lastCaretIndex:int = -1;
        protected var _selectedIndices:Array;
        protected var availableCellRenderers:Array;
        protected var list:Sprite;
        protected var caretIndex:int = -1;
        protected var updatedRendererStyles:Object;
        protected var preChangeItems:Array;
        protected var activeCellRenderers:Array;
        protected var rendererStyles:Object;
        protected var _verticalScrollPosition:Number;
        protected var _dataProvider:DataProvider;
        protected var _horizontalScrollPosition:Number;
        private var collectionItemImport:SimpleCollectionItem;
        protected var _selectable:Boolean = true;
        private static var defaultStyles:Object = {skin:"List_skin", cellRenderer:CellRenderer, contentPadding:null, disabledAlpha:null};
        public static var createAccessibilityImplementation:Function;

        public function SelectableList()
        {
            _allowMultipleSelection = false;
            _selectable = true;
            caretIndex = -1;
            lastCaretIndex = -1;
            activeCellRenderers = [];
            availableCellRenderers = [];
            invalidItems = new Dictionary(true);
            renderedItems = new Dictionary(true);
            _selectedIndices = [];
            if (dataProvider == null)
            {
                dataProvider = new DataProvider();
            }
            verticalScrollPolicy = ScrollPolicy.AUTO;
            rendererStyles = {};
            updatedRendererStyles = {};
            return;
        }// end function

        protected function drawList() : void
        {
            return;
        }// end function

        public function set allowMultipleSelection(param1:Boolean) : void
        {
            if (param1 == _allowMultipleSelection)
            {
                return;
            }
            _allowMultipleSelection = param1;
            if (!param1 && _selectedIndices.length > 1)
            {
                _selectedIndices = [_selectedIndices.pop()];
                invalidate(InvalidationType.DATA);
            }
            return;
        }// end function

        public function sortItemsOn(param1:String, param2:Object = null)
        {
            return _dataProvider.sortOn(param1, param2);
        }// end function

        public function removeItemAt(param1:uint) : Object
        {
            return _dataProvider.removeItemAt(param1);
        }// end function

        public function get selectedItem() : Object
        {
            return _selectedIndices.length == 0 ? (null) : (_dataProvider.getItemAt(selectedIndex));
        }// end function

        override protected function keyDownHandler(event:KeyboardEvent) : void
        {
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
                    event.stopPropagation();
                    break;
                }
                case Keyboard.LEFT:
                case Keyboard.RIGHT:
                {
                    moveSelectionHorizontally(event.keyCode, event.shiftKey && _allowMultipleSelection, event.ctrlKey && _allowMultipleSelection);
                    event.stopPropagation();
                    break;
                }
                default:
                {
                    break;
                }
            }
            return;
        }// end function

        public function get selectable() : Boolean
        {
            return _selectable;
        }// end function

        public function itemToCellRenderer(param1:Object) : ICellRenderer
        {
            var _loc_2:* = undefined;
            var _loc_3:ICellRenderer = null;
            if (param1 != null)
            {
                for (_loc_2 in activeCellRenderers)
                {
                    
                    _loc_3 = activeCellRenderers[_loc_2] as ICellRenderer;
                    if (_loc_3.data == param1)
                    {
                        return _loc_3;
                    }
                }
            }
            return null;
        }// end function

        public function getNextIndexAtLetter(param1:String, param2:int = -1) : int
        {
            var _loc_3:int = 0;
            var _loc_4:Number = NaN;
            var _loc_5:Number = NaN;
            var _loc_6:Object = null;
            var _loc_7:String = null;
            if (length == 0)
            {
                return -1;
            }
            param1 = param1.toUpperCase();
            _loc_3 = length - 1;
            _loc_4 = 0;
            while (_loc_4 < _loc_3)
            {
                
                _loc_5 = (param2 + 1) + _loc_4;
                if (_loc_5 > (length - 1))
                {
                    _loc_5 = _loc_5 - length;
                }
                _loc_6 = getItemAt(_loc_5);
                if (_loc_6 == null)
                {
                    break;
                }
                _loc_7 = itemToLabel(_loc_6);
                if (_loc_7 == null)
                {
                }
                else if (_loc_7.charAt(0).toUpperCase() == param1)
                {
                    return _loc_5;
                }
                _loc_4 = _loc_4 + 1;
            }
            return -1;
        }// end function

        public function invalidateList() : void
        {
            _invalidateList();
            invalidate(InvalidationType.DATA);
            return;
        }// end function

        override public function set enabled(param1:Boolean) : void
        {
            super.enabled = param1;
            list.mouseChildren = _enabled;
            return;
        }// end function

        public function get selectedIndices() : Array
        {
            return _selectedIndices.concat();
        }// end function

        public function set selectable(param1:Boolean) : void
        {
            if (param1 == _selectable)
            {
                return;
            }
            if (!param1)
            {
                selectedIndices = [];
            }
            _selectable = param1;
            return;
        }// end function

        public function itemToLabel(param1:Object) : String
        {
            return param1["label"];
        }// end function

        public function addItemAt(param1:Object, param2:uint) : void
        {
            _dataProvider.addItemAt(param1, param2);
            invalidateList();
            return;
        }// end function

        public function replaceItemAt(param1:Object, param2:uint) : Object
        {
            return _dataProvider.replaceItemAt(param1, param2);
        }// end function

        protected function handleDataChange(event:DataChangeEvent) : void
        {
            var _loc_2:int = 0;
            var _loc_3:int = 0;
            var _loc_4:String = null;
            var _loc_5:uint = 0;
            _loc_2 = event.startIndex;
            _loc_3 = event.endIndex;
            _loc_4 = event.changeType;
            if (_loc_4 == DataChangeType.INVALIDATE_ALL)
            {
                clearSelection();
                invalidateList();
            }
            else if (_loc_4 == DataChangeType.INVALIDATE)
            {
                _loc_5 = 0;
                while (_loc_5 < event.items.length)
                {
                    
                    invalidateItem(event.items[_loc_5]);
                    _loc_5 = _loc_5 + 1;
                }
            }
            else if (_loc_4 == DataChangeType.ADD)
            {
                _loc_5 = 0;
                while (_loc_5 < _selectedIndices.length)
                {
                    
                    if (_selectedIndices[_loc_5] >= _loc_2)
                    {
                        _selectedIndices[_loc_5] = _selectedIndices[_loc_5] + (_loc_2 - _loc_3);
                    }
                    _loc_5 = _loc_5 + 1;
                }
            }
            else if (_loc_4 == DataChangeType.REMOVE)
            {
                _loc_5 = 0;
                while (_loc_5 < _selectedIndices.length)
                {
                    
                    if (_selectedIndices[_loc_5] >= _loc_2)
                    {
                        if (_selectedIndices[_loc_5] <= _loc_3)
                        {
                            delete _selectedIndices[_loc_5];
                        }
                        else
                        {
                            _selectedIndices[_loc_5] = _selectedIndices[_loc_5] - (_loc_2 - _loc_3 + 1);
                        }
                    }
                    _loc_5 = _loc_5 + 1;
                }
            }
            else if (_loc_4 == DataChangeType.REMOVE_ALL)
            {
                clearSelection();
            }
            else if (_loc_4 == DataChangeType.REPLACE)
            {
            }
            else
            {
                selectedItems = preChangeItems;
                preChangeItems = null;
            }
            invalidate(InvalidationType.DATA);
            return;
        }// end function

        protected function _invalidateList() : void
        {
            availableCellRenderers = [];
            while (activeCellRenderers.length > 0)
            {
                
                list.removeChild(activeCellRenderers.pop() as DisplayObject);
            }
            return;
        }// end function

        protected function updateRendererStyles() : void
        {
            var _loc_1:Array = null;
            var _loc_2:uint = 0;
            var _loc_3:uint = 0;
            var _loc_4:String = null;
            _loc_1 = availableCellRenderers.concat(activeCellRenderers);
            _loc_2 = _loc_1.length;
            _loc_3 = 0;
            while (_loc_3 < _loc_2)
            {
                
                if (_loc_1[_loc_3].setStyle == null)
                {
                }
                else
                {
                    for (_loc_4 in updatedRendererStyles)
                    {
                        
                        _loc_1[_loc_3].setStyle(_loc_4, updatedRendererStyles[_loc_4]);
                    }
                    _loc_1[_loc_3].drawNow();
                }
                _loc_3 = _loc_3 + 1;
            }
            updatedRendererStyles = {};
            return;
        }// end function

        public function set selectedItem(param1:Object) : void
        {
            var _loc_2:int = 0;
            _loc_2 = _dataProvider.getItemIndex(param1);
            selectedIndex = _loc_2;
            return;
        }// end function

        public function sortItems(... args)
        {
            return _dataProvider.sort.apply(_dataProvider, args);
        }// end function

        public function removeAll() : void
        {
            _dataProvider.removeAll();
            return;
        }// end function

        protected function handleCellRendererChange(event:Event) : void
        {
            var _loc_2:ICellRenderer = null;
            var _loc_3:uint = 0;
            _loc_2 = event.currentTarget as ICellRenderer;
            _loc_3 = _loc_2.listData.index;
            _dataProvider.invalidateItemAt(_loc_3);
            return;
        }// end function

        protected function moveSelectionVertically(param1:uint, param2:Boolean, param3:Boolean) : void
        {
            return;
        }// end function

        override protected function setHorizontalScrollPosition(param1:Number, param2:Boolean = false) : void
        {
            var _loc_3:Number = NaN;
            if (param1 == _horizontalScrollPosition)
            {
                return;
            }
            _loc_3 = param1 - _horizontalScrollPosition;
            _horizontalScrollPosition = param1;
            if (param2)
            {
                dispatchEvent(new ScrollEvent(ScrollBarDirection.HORIZONTAL, _loc_3, param1));
            }
            return;
        }// end function

        public function scrollToSelected() : void
        {
            scrollToIndex(selectedIndex);
            return;
        }// end function

        public function invalidateItem(param1:Object) : void
        {
            if (renderedItems[param1] == null)
            {
                return;
            }
            invalidItems[param1] = true;
            invalidate(InvalidationType.DATA);
            return;
        }// end function

        protected function handleCellRendererClick(event:MouseEvent) : void
        {
            var _loc_2:ICellRenderer = null;
            var _loc_3:uint = 0;
            var _loc_4:int = 0;
            var _loc_5:int = 0;
            var _loc_6:uint = 0;
            if (!_enabled)
            {
                return;
            }
            _loc_2 = event.currentTarget as ICellRenderer;
            _loc_3 = _loc_2.listData.index;
            if (!dispatchEvent(new ListEvent(ListEvent.ITEM_CLICK, false, true, _loc_2.listData.column, _loc_2.listData.row, _loc_3, _loc_2.data)) || !_selectable)
            {
                return;
            }
            _loc_4 = selectedIndices.indexOf(_loc_3);
            if (!_allowMultipleSelection)
            {
                if (_loc_4 != -1)
                {
                    return;
                }
                _loc_2.selected = true;
                _selectedIndices = [_loc_3];
                var _loc_7:* = _loc_3;
                caretIndex = _loc_3;
                lastCaretIndex = _loc_7;
            }
            else if (event.shiftKey)
            {
                _loc_6 = _selectedIndices.length > 0 ? (_selectedIndices[0]) : (_loc_3);
                _selectedIndices = [];
                if (_loc_6 > _loc_3)
                {
                    _loc_5 = _loc_6;
                    while (_loc_5 >= _loc_3)
                    {
                        
                        _selectedIndices.push(_loc_5);
                        _loc_5 = _loc_5 - 1;
                    }
                }
                else
                {
                    _loc_5 = _loc_6;
                    while (_loc_5 <= _loc_3)
                    {
                        
                        _selectedIndices.push(_loc_5);
                        _loc_5++;
                    }
                }
                caretIndex = _loc_3;
            }
            else if (event.ctrlKey)
            {
                if (_loc_4 != -1)
                {
                    _loc_2.selected = false;
                    _selectedIndices.splice(_loc_4, 1);
                }
                else
                {
                    _loc_2.selected = true;
                    _selectedIndices.push(_loc_3);
                }
                caretIndex = _loc_3;
            }
            else
            {
                _selectedIndices = [_loc_3];
                var _loc_7:* = _loc_3;
                caretIndex = _loc_3;
                lastCaretIndex = _loc_7;
            }
            dispatchEvent(new Event(Event.CHANGE));
            invalidate(InvalidationType.DATA);
            return;
        }// end function

        public function get length() : uint
        {
            return _dataProvider.length;
        }// end function

        public function get allowMultipleSelection() : Boolean
        {
            return _allowMultipleSelection;
        }// end function

        protected function onPreChange(event:DataChangeEvent) : void
        {
            switch(event.changeType)
            {
                case DataChangeType.REMOVE:
                case DataChangeType.ADD:
                case DataChangeType.INVALIDATE:
                case DataChangeType.REMOVE_ALL:
                case DataChangeType.REPLACE:
                case DataChangeType.INVALIDATE_ALL:
                {
                    break;
                }
                default:
                {
                    preChangeItems = selectedItems;
                    break;
                    break;
                }
            }
            return;
        }// end function

        public function getRendererStyle(param1:String, param2:int = -1) : Object
        {
            return rendererStyles[param1];
        }// end function

        override protected function setVerticalScrollPosition(param1:Number, param2:Boolean = false) : void
        {
            var _loc_3:Number = NaN;
            if (param1 == _verticalScrollPosition)
            {
                return;
            }
            _loc_3 = param1 - _verticalScrollPosition;
            _verticalScrollPosition = param1;
            if (param2)
            {
                dispatchEvent(new ScrollEvent(ScrollBarDirection.VERTICAL, _loc_3, param1));
            }
            return;
        }// end function

        protected function moveSelectionHorizontally(param1:uint, param2:Boolean, param3:Boolean) : void
        {
            return;
        }// end function

        public function set selectedIndices(param1:Array) : void
        {
            if (!_selectable)
            {
                return;
            }
            _selectedIndices = param1 == null ? ([]) : (param1.concat());
            invalidate(InvalidationType.SELECTED);
            return;
        }// end function

        public function get selectedIndex() : int
        {
            return _selectedIndices.length == 0 ? (-1) : (_selectedIndices[(_selectedIndices.length - 1)]);
        }// end function

        override protected function draw() : void
        {
            super.draw();
            return;
        }// end function

        override protected function configUI() : void
        {
            super.configUI();
            listHolder = new Sprite();
            addChild(listHolder);
            listHolder.scrollRect = contentScrollRect;
            list = new Sprite();
            listHolder.addChild(list);
            return;
        }// end function

        public function addItem(param1:Object) : void
        {
            _dataProvider.addItem(param1);
            invalidateList();
            return;
        }// end function

        protected function handleCellRendererMouseEvent(event:MouseEvent) : void
        {
            var _loc_2:ICellRenderer = null;
            var _loc_3:String = null;
            _loc_2 = event.target as ICellRenderer;
            _loc_3 = event.type == MouseEvent.ROLL_OVER ? (ListEvent.ITEM_ROLL_OVER) : (ListEvent.ITEM_ROLL_OUT);
            dispatchEvent(new ListEvent(_loc_3, false, false, _loc_2.listData.column, _loc_2.listData.row, _loc_2.listData.index, _loc_2.data));
            return;
        }// end function

        public function clearRendererStyle(param1:String, param2:int = -1) : void
        {
            delete rendererStyles[param1];
            updatedRendererStyles[param1] = null;
            invalidate(InvalidationType.RENDERER_STYLES);
            return;
        }// end function

        protected function handleCellRendererDoubleClick(event:MouseEvent) : void
        {
            var _loc_2:ICellRenderer = null;
            var _loc_3:uint = 0;
            if (!_enabled)
            {
                return;
            }
            _loc_2 = event.currentTarget as ICellRenderer;
            _loc_3 = _loc_2.listData.index;
            dispatchEvent(new ListEvent(ListEvent.ITEM_DOUBLE_CLICK, false, true, _loc_2.listData.column, _loc_2.listData.row, _loc_3, _loc_2.data));
            return;
        }// end function

        public function get rowCount() : uint
        {
            return 0;
        }// end function

        public function isItemSelected(param1:Object) : Boolean
        {
            return selectedItems.indexOf(param1) > -1;
        }// end function

        public function set dataProvider(param1:DataProvider) : void
        {
            if (_dataProvider != null)
            {
                _dataProvider.removeEventListener(DataChangeEvent.DATA_CHANGE, handleDataChange);
                _dataProvider.removeEventListener(DataChangeEvent.PRE_DATA_CHANGE, onPreChange);
            }
            _dataProvider = param1;
            _dataProvider.addEventListener(DataChangeEvent.DATA_CHANGE, handleDataChange, false, 0, true);
            _dataProvider.addEventListener(DataChangeEvent.PRE_DATA_CHANGE, onPreChange, false, 0, true);
            clearSelection();
            invalidateList();
            return;
        }// end function

        override protected function drawLayout() : void
        {
            super.drawLayout();
            contentScrollRect = listHolder.scrollRect;
            contentScrollRect.width = availableWidth;
            contentScrollRect.height = availableHeight;
            listHolder.scrollRect = contentScrollRect;
            return;
        }// end function

        public function getItemAt(param1:uint) : Object
        {
            return _dataProvider.getItemAt(param1);
        }// end function

        override protected function initializeAccessibility() : void
        {
            if (SelectableList.createAccessibilityImplementation != null)
            {
                SelectableList.createAccessibilityImplementation(this);
            }
            return;
        }// end function

        public function scrollToIndex(param1:int) : void
        {
            return;
        }// end function

        public function removeItem(param1:Object) : Object
        {
            return _dataProvider.removeItem(param1);
        }// end function

        public function get dataProvider() : DataProvider
        {
            return _dataProvider;
        }// end function

        public function set maxHorizontalScrollPosition(param1:Number) : void
        {
            _maxHorizontalScrollPosition = param1;
            invalidate(InvalidationType.SIZE);
            return;
        }// end function

        public function setRendererStyle(param1:String, param2:Object, param3:uint = 0) : void
        {
            if (rendererStyles[param1] == param2)
            {
                return;
            }
            updatedRendererStyles[param1] = param2;
            rendererStyles[param1] = param2;
            invalidate(InvalidationType.RENDERER_STYLES);
            return;
        }// end function

        public function invalidateItemAt(param1:uint) : void
        {
            var _loc_2:Object = null;
            _loc_2 = _dataProvider.getItemAt(param1);
            if (_loc_2 != null)
            {
                invalidateItem(_loc_2);
            }
            return;
        }// end function

        public function set selectedItems(param1:Array) : void
        {
            var _loc_2:Array = null;
            var _loc_3:uint = 0;
            var _loc_4:int = 0;
            if (param1 == null)
            {
                selectedIndices = null;
                return;
            }
            _loc_2 = [];
            _loc_3 = 0;
            while (_loc_3 < param1.length)
            {
                
                _loc_4 = _dataProvider.getItemIndex(param1[_loc_3]);
                if (_loc_4 != -1)
                {
                    _loc_2.push(_loc_4);
                }
                _loc_3 = _loc_3 + 1;
            }
            selectedIndices = _loc_2;
            return;
        }// end function

        public function clearSelection() : void
        {
            selectedIndex = -1;
            return;
        }// end function

        override public function get maxHorizontalScrollPosition() : Number
        {
            return _maxHorizontalScrollPosition;
        }// end function

        public function get selectedItems() : Array
        {
            var _loc_1:Array = null;
            var _loc_2:uint = 0;
            _loc_1 = [];
            _loc_2 = 0;
            while (_loc_2 < _selectedIndices.length)
            {
                
                _loc_1.push(_dataProvider.getItemAt(_selectedIndices[_loc_2]));
                _loc_2 = _loc_2 + 1;
            }
            return _loc_1;
        }// end function

        public function set selectedIndex(param1:int) : void
        {
            selectedIndices = param1 == -1 ? (null) : ([param1]);
            return;
        }// end function

        public static function getStyleDefinition() : Object
        {
            return mergeStyles(defaultStyles, BaseScrollPane.getStyleDefinition());
        }// end function

    }
}
