package fl.data
{
    import fl.events.*;
    import flash.events.*;

    public class DataProvider extends EventDispatcher
    {
        protected var data:Array;

        public function DataProvider(param1:Object = null)
        {
            if (param1 == null)
            {
                data = [];
            }
            else
            {
                data = getDataFromObject(param1);
            }
            return;
        }// end function

        protected function dispatchPreChangeEvent(param1:String, param2:Array, param3:int, param4:int) : void
        {
            dispatchEvent(new DataChangeEvent(DataChangeEvent.PRE_DATA_CHANGE, param1, param2, param3, param4));
            return;
        }// end function

        public function invalidateItemAt(param1:int) : void
        {
            checkIndex(param1, (data.length - 1));
            dispatchChangeEvent(DataChangeType.INVALIDATE, [data[param1]], param1, param1);
            return;
        }// end function

        public function getItemIndex(param1:Object) : int
        {
            return data.indexOf(param1);
        }// end function

        protected function getDataFromObject(param1:Object) : Array
        {
            var _loc_2:Array = null;
            var _loc_3:Array = null;
            var _loc_4:uint = 0;
            var _loc_5:Object = null;
            var _loc_6:XML = null;
            var _loc_7:XMLList = null;
            var _loc_8:XML = null;
            var _loc_9:XMLList = null;
            var _loc_10:XML = null;
            var _loc_11:XMLList = null;
            var _loc_12:XML = null;
            if (param1 is Array)
            {
                _loc_3 = param1 as Array;
                if (_loc_3.length > 0)
                {
                    if (_loc_3[0] is String || _loc_3[0] is Number)
                    {
                        _loc_2 = [];
                        _loc_4 = 0;
                        while (_loc_4 < _loc_3.length)
                        {
                            
                            _loc_5 = {label:String(_loc_3[_loc_4]), data:_loc_3[_loc_4]};
                            _loc_2.push(_loc_5);
                            _loc_4 = _loc_4 + 1;
                        }
                        return _loc_2;
                    }
                }
                return param1.concat();
            }
            else
            {
                if (param1 is DataProvider)
                {
                    return param1.toArray();
                }
                if (param1 is XML)
                {
                    _loc_6 = param1 as XML;
                    _loc_2 = [];
                    _loc_7 = _loc_6.*;
                    for each (_loc_8 in _loc_7)
                    {
                        
                        param1 = {};
                        _loc_9 = _loc_8.attributes();
                        for each (_loc_10 in _loc_9)
                        {
                            
                            param1[_loc_10.localName()] = _loc_10.toString();
                        }
                        _loc_11 = _loc_8.*;
                        for each (_loc_12 in _loc_11)
                        {
                            
                            if (_loc_12.hasSimpleContent())
                            {
                                param1[_loc_12.localName()] = _loc_12.toString();
                            }
                        }
                        _loc_2.push(param1);
                    }
                    return _loc_2;
                }
            }
            throw new TypeError("Error: Type Coercion failed: cannot convert " + param1 + " to Array or DataProvider.");
        }// end function

        public function removeItemAt(param1:uint) : Object
        {
            var _loc_2:Array = null;
            checkIndex(param1, (data.length - 1));
            dispatchPreChangeEvent(DataChangeType.REMOVE, data.slice(param1, (param1 + 1)), param1, param1);
            _loc_2 = data.splice(param1, 1);
            dispatchChangeEvent(DataChangeType.REMOVE, _loc_2, param1, param1);
            return _loc_2[0];
        }// end function

        public function addItem(param1:Object) : void
        {
            dispatchPreChangeEvent(DataChangeType.ADD, [param1], (data.length - 1), (data.length - 1));
            data.push(param1);
            dispatchChangeEvent(DataChangeType.ADD, [param1], (data.length - 1), (data.length - 1));
            return;
        }// end function

        public function sortOn(param1:Object, param2:Object = null)
        {
            var _loc_3:Array = null;
            dispatchPreChangeEvent(DataChangeType.SORT, data.concat(), 0, (data.length - 1));
            _loc_3 = data.sortOn(param1, param2);
            dispatchChangeEvent(DataChangeType.SORT, data.concat(), 0, (data.length - 1));
            return _loc_3;
        }// end function

        public function sort(... args)
        {
            args = null;
            dispatchPreChangeEvent(DataChangeType.SORT, data.concat(), 0, (data.length - 1));
            args = data.sort.apply(data, args);
            dispatchChangeEvent(DataChangeType.SORT, data.concat(), 0, (data.length - 1));
            return args;
        }// end function

        public function addItems(param1:Object) : void
        {
            addItemsAt(param1, data.length);
            return;
        }// end function

        public function concat(param1:Object) : void
        {
            addItems(param1);
            return;
        }// end function

        public function clone() : DataProvider
        {
            return new DataProvider(data);
        }// end function

        public function toArray() : Array
        {
            return data.concat();
        }// end function

        public function get length() : uint
        {
            return data.length;
        }// end function

        public function addItemAt(param1:Object, param2:uint) : void
        {
            checkIndex(param2, data.length);
            dispatchPreChangeEvent(DataChangeType.ADD, [param1], param2, param2);
            data.splice(param2, 0, param1);
            dispatchChangeEvent(DataChangeType.ADD, [param1], param2, param2);
            return;
        }// end function

        public function getItemAt(param1:uint) : Object
        {
            checkIndex(param1, (data.length - 1));
            return data[param1];
        }// end function

        override public function toString() : String
        {
            return "DataProvider [" + data.join(" , ") + "]";
        }// end function

        public function invalidateItem(param1:Object) : void
        {
            var _loc_2:uint = 0;
            _loc_2 = getItemIndex(param1);
            if (_loc_2 == -1)
            {
                return;
            }
            invalidateItemAt(_loc_2);
            return;
        }// end function

        protected function dispatchChangeEvent(param1:String, param2:Array, param3:int, param4:int) : void
        {
            dispatchEvent(new DataChangeEvent(DataChangeEvent.DATA_CHANGE, param1, param2, param3, param4));
            return;
        }// end function

        protected function checkIndex(param1:int, param2:int) : void
        {
            if (param1 > param2 || param1 < 0)
            {
                throw new RangeError("DataProvider index (" + param1 + ") is not in acceptable range (0 - " + param2 + ")");
            }
            return;
        }// end function

        public function addItemsAt(param1:Object, param2:uint) : void
        {
            var _loc_3:Array = null;
            checkIndex(param2, data.length);
            _loc_3 = getDataFromObject(param1);
            dispatchPreChangeEvent(DataChangeType.ADD, _loc_3, param2, param2 + _loc_3.length - 1);
            data.splice.apply(data, [param2, 0].concat(_loc_3));
            dispatchChangeEvent(DataChangeType.ADD, _loc_3, param2, param2 + _loc_3.length - 1);
            return;
        }// end function

        public function replaceItem(param1:Object, param2:Object) : Object
        {
            var _loc_3:int = 0;
            _loc_3 = getItemIndex(param2);
            if (_loc_3 != -1)
            {
                return replaceItemAt(param1, _loc_3);
            }
            return null;
        }// end function

        public function removeItem(param1:Object) : Object
        {
            var _loc_2:int = 0;
            _loc_2 = getItemIndex(param1);
            if (_loc_2 != -1)
            {
                return removeItemAt(_loc_2);
            }
            return null;
        }// end function

        public function merge(param1:Object) : void
        {
            var _loc_2:Array = null;
            var _loc_3:uint = 0;
            var _loc_4:uint = 0;
            var _loc_5:uint = 0;
            var _loc_6:Object = null;
            _loc_2 = getDataFromObject(param1);
            _loc_3 = _loc_2.length;
            _loc_4 = data.length;
            dispatchPreChangeEvent(DataChangeType.ADD, data.slice(_loc_4, data.length), _loc_4, (this.data.length - 1));
            _loc_5 = 0;
            while (_loc_5 < _loc_3)
            {
                
                _loc_6 = _loc_2[_loc_5];
                if (getItemIndex(_loc_6) == -1)
                {
                    data.push(_loc_6);
                }
                _loc_5 = _loc_5 + 1;
            }
            if (data.length > _loc_4)
            {
                dispatchChangeEvent(DataChangeType.ADD, data.slice(_loc_4, data.length), _loc_4, (this.data.length - 1));
            }
            else
            {
                dispatchChangeEvent(DataChangeType.ADD, [], -1, -1);
            }
            return;
        }// end function

        public function replaceItemAt(param1:Object, param2:uint) : Object
        {
            var _loc_3:Array = null;
            checkIndex(param2, (data.length - 1));
            _loc_3 = [data[param2]];
            dispatchPreChangeEvent(DataChangeType.REPLACE, _loc_3, param2, param2);
            data[param2] = param1;
            dispatchChangeEvent(DataChangeType.REPLACE, _loc_3, param2, param2);
            return _loc_3[0];
        }// end function

        public function invalidate() : void
        {
            dispatchEvent(new DataChangeEvent(DataChangeEvent.DATA_CHANGE, DataChangeType.INVALIDATE_ALL, data.concat(), 0, data.length));
            return;
        }// end function

        public function removeAll() : void
        {
            var _loc_1:Array = null;
            _loc_1 = data.concat();
            dispatchPreChangeEvent(DataChangeType.REMOVE_ALL, _loc_1, 0, _loc_1.length);
            data = [];
            dispatchChangeEvent(DataChangeType.REMOVE_ALL, _loc_1, 0, _loc_1.length);
            return;
        }// end function

    }
}
