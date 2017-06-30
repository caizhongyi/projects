package fl.managers
{
    import fl.controls.*;
    import fl.core.*;
    import flash.display.*;
    import flash.events.*;
    import flash.text.*;
    import flash.ui.*;
    import flash.utils.*;

    public class FocusManager extends Object implements IFocusManager
    {
        private var focusableObjects:Dictionary;
        private var _showFocusIndicator:Boolean = true;
        private var defButton:Button;
        private var focusableCandidates:Array;
        private var _form:DisplayObjectContainer;
        private var _defaultButtonEnabled:Boolean = true;
        private var activated:Boolean = false;
        private var _defaultButton:Button;
        private var calculateCandidates:Boolean = true;
        private var lastFocus:InteractiveObject;
        private var lastAction:String;

        public function FocusManager(param1:DisplayObjectContainer)
        {
            activated = false;
            calculateCandidates = true;
            _showFocusIndicator = true;
            _defaultButtonEnabled = true;
            focusableObjects = new Dictionary(true);
            if (param1 != null)
            {
                _form = param1;
                addFocusables(DisplayObject(param1));
                param1.addEventListener(Event.ADDED, addedHandler);
                param1.addEventListener(Event.REMOVED, removedHandler);
                activate();
            }
            return;
        }// end function

        public function get showFocusIndicator() : Boolean
        {
            return _showFocusIndicator;
        }// end function

        private function getIndexOfNextObject(param1:int, param2:Boolean, param3:Boolean, param4:String) : int
        {
            var _loc_5:int = 0;
            var _loc_6:int = 0;
            var _loc_7:DisplayObject = null;
            var _loc_8:IFocusManagerGroup = null;
            var _loc_9:int = 0;
            var _loc_10:DisplayObject = null;
            var _loc_11:IFocusManagerGroup = null;
            _loc_5 = focusableCandidates.length;
            _loc_6 = param1;
            while (true)
            {
                
                if (param2)
                {
                    param1 = param1 - 1;
                }
                else
                {
                    param1++;
                }
                if (param3)
                {
                    if (param2 && param1 < 0)
                    {
                        break;
                    }
                    if (!param2 && param1 == _loc_5)
                    {
                        break;
                    }
                }
                else
                {
                    param1 = (param1 + _loc_5) % _loc_5;
                    if (_loc_6 == param1)
                    {
                        break;
                    }
                }
                if (isValidFocusCandidate(focusableCandidates[param1], param4))
                {
                    _loc_7 = DisplayObject(findFocusManagerComponent(focusableCandidates[param1]));
                    if (_loc_7 is IFocusManagerGroup)
                    {
                        _loc_8 = IFocusManagerGroup(_loc_7);
                        _loc_9 = 0;
                        while (_loc_9 < focusableCandidates.length)
                        {
                            
                            _loc_10 = focusableCandidates[_loc_9];
                            if (_loc_10 is IFocusManagerGroup)
                            {
                                _loc_11 = IFocusManagerGroup(_loc_10);
                                if (_loc_11.groupName == _loc_8.groupName && _loc_11.selected)
                                {
                                    param1 = _loc_9;
                                    break;
                                }
                            }
                            _loc_9++;
                        }
                    }
                    return param1;
                }
            }
            return param1;
        }// end function

        public function set form(param1:DisplayObjectContainer) : void
        {
            _form = param1;
            return;
        }// end function

        private function addFocusables(param1:DisplayObject, param2:Boolean = false) : void
        {
            var focusable:IFocusManagerComponent;
            var io:InteractiveObject;
            var doc:DisplayObjectContainer;
            var i:int;
            var child:DisplayObject;
            var o:* = param1;
            var skipTopLevel:* = param2;
            if (!skipTopLevel)
            {
                if (o is IFocusManagerComponent)
                {
                    focusable = IFocusManagerComponent(o);
                    if (focusable.focusEnabled)
                    {
                        if (focusable.tabEnabled && isTabVisible(o))
                        {
                            focusableObjects[o] = true;
                            calculateCandidates = true;
                        }
                        o.addEventListener(Event.TAB_ENABLED_CHANGE, tabEnabledChangeHandler);
                        o.addEventListener(Event.TAB_INDEX_CHANGE, tabIndexChangeHandler);
                    }
                }
                else if (o is InteractiveObject)
                {
                    io = o as InteractiveObject;
                    if (io && io.tabEnabled && findFocusManagerComponent(io) == io)
                    {
                        focusableObjects[io] = true;
                        calculateCandidates = true;
                    }
                    io.addEventListener(Event.TAB_ENABLED_CHANGE, tabEnabledChangeHandler);
                    io.addEventListener(Event.TAB_INDEX_CHANGE, tabIndexChangeHandler);
                }
            }
            if (o is DisplayObjectContainer)
            {
                doc = DisplayObjectContainer(o);
                o.addEventListener(Event.TAB_CHILDREN_CHANGE, tabChildrenChangeHandler);
                if (doc is Stage || doc.parent is Stage || doc.tabChildren)
                {
                    i;
                    while (i < doc.numChildren)
                    {
                        
                        try
                        {
                            child = doc.getChildAt(i);
                            if (child != null)
                            {
                                addFocusables(doc.getChildAt(i));
                            }
                        }
                        catch (error:SecurityError)
                        {
                        }
                        i = (i + 1);
                    }
                }
            }
            return;
        }// end function

        private function getChildIndex(param1:DisplayObjectContainer, param2:DisplayObject) : int
        {
            return param1.getChildIndex(param2);
        }// end function

        private function mouseFocusChangeHandler(event:FocusEvent) : void
        {
            if (event.relatedObject is TextField)
            {
                return;
            }
            event.preventDefault();
            return;
        }// end function

        private function focusOutHandler(event:FocusEvent) : void
        {
            var _loc_2:InteractiveObject = null;
            _loc_2 = event.target as InteractiveObject;
            return;
        }// end function

        private function isValidFocusCandidate(param1:DisplayObject, param2:String) : Boolean
        {
            var _loc_3:IFocusManagerGroup = null;
            if (!isEnabledAndVisible(param1))
            {
                return false;
            }
            if (param1 is IFocusManagerGroup)
            {
                _loc_3 = IFocusManagerGroup(param1);
                if (param2 == _loc_3.groupName)
                {
                    return false;
                }
            }
            return true;
        }// end function

        public function findFocusManagerComponent(param1:InteractiveObject) : InteractiveObject
        {
            var _loc_2:InteractiveObject = null;
            _loc_2 = param1;
            while (param1)
            {
                
                if (param1 is IFocusManagerComponent && IFocusManagerComponent(param1).focusEnabled)
                {
                    return param1;
                }
                param1 = param1.parent;
            }
            return _loc_2;
        }// end function

        private function sortFocusableObjectsTabIndex() : void
        {
            var _loc_1:Object = null;
            var _loc_2:InteractiveObject = null;
            focusableCandidates = [];
            for (_loc_1 in focusableObjects)
            {
                
                _loc_2 = InteractiveObject(_loc_1);
                if (_loc_2.tabIndex && !isNaN(Number(_loc_2.tabIndex)))
                {
                    focusableCandidates.push(_loc_2);
                }
            }
            focusableCandidates.sort(sortByTabIndex);
            return;
        }// end function

        private function removeFocusables(param1:DisplayObject) : void
        {
            var _loc_2:Object = null;
            var _loc_3:DisplayObject = null;
            if (param1 is DisplayObjectContainer)
            {
                param1.removeEventListener(Event.TAB_CHILDREN_CHANGE, tabChildrenChangeHandler);
                param1.removeEventListener(Event.TAB_INDEX_CHANGE, tabIndexChangeHandler);
                for (_loc_2 in focusableObjects)
                {
                    
                    _loc_3 = DisplayObject(_loc_2);
                    if (DisplayObjectContainer(param1).contains(_loc_3))
                    {
                        if (_loc_3 == lastFocus)
                        {
                            lastFocus = null;
                        }
                        _loc_3.removeEventListener(Event.TAB_ENABLED_CHANGE, tabEnabledChangeHandler);
                        delete focusableObjects[_loc_2];
                        calculateCandidates = true;
                    }
                }
            }
            return;
        }// end function

        private function addedHandler(event:Event) : void
        {
            var _loc_2:DisplayObject = null;
            _loc_2 = DisplayObject(event.target);
            if (_loc_2.stage)
            {
                addFocusables(DisplayObject(event.target));
            }
            return;
        }// end function

        private function getTopLevelFocusTarget(param1:InteractiveObject) : InteractiveObject
        {
            while (param1 != InteractiveObject(form))
            {
                
                if (param1 is IFocusManagerComponent && IFocusManagerComponent(param1).focusEnabled && IFocusManagerComponent(param1).mouseFocusEnabled && UIComponent(param1).enabled)
                {
                    return param1;
                }
                param1 = param1.parent;
                if (param1 == null)
                {
                    break;
                }
            }
            return null;
        }// end function

        private function tabChildrenChangeHandler(event:Event) : void
        {
            var _loc_2:DisplayObjectContainer = null;
            if (event.target != event.currentTarget)
            {
                return;
            }
            calculateCandidates = true;
            _loc_2 = DisplayObjectContainer(event.target);
            if (_loc_2.tabChildren)
            {
                addFocusables(_loc_2, true);
            }
            else
            {
                removeFocusables(_loc_2);
            }
            return;
        }// end function

        public function sendDefaultButtonEvent() : void
        {
            defButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK));
            return;
        }// end function

        public function getFocus() : InteractiveObject
        {
            var _loc_1:InteractiveObject = null;
            _loc_1 = form.stage.focus;
            return findFocusManagerComponent(_loc_1);
        }// end function

        private function isEnabledAndVisible(param1:DisplayObject) : Boolean
        {
            var _loc_2:DisplayObjectContainer = null;
            var _loc_3:TextField = null;
            var _loc_4:SimpleButton = null;
            _loc_2 = DisplayObject(form).parent;
            while (param1 != _loc_2)
            {
                
                if (param1 is UIComponent)
                {
                    if (!UIComponent(param1).enabled)
                    {
                        return false;
                    }
                }
                else if (param1 is TextField)
                {
                    _loc_3 = TextField(param1);
                    if (_loc_3.type == TextFieldType.DYNAMIC || !_loc_3.selectable)
                    {
                        return false;
                    }
                }
                else if (param1 is SimpleButton)
                {
                    _loc_4 = SimpleButton(param1);
                    if (!_loc_4.enabled)
                    {
                        return false;
                    }
                }
                if (!param1.visible)
                {
                    return false;
                }
                param1 = param1.parent;
            }
            return true;
        }// end function

        public function set defaultButton(param1:Button) : void
        {
            var _loc_2:Button = null;
            _loc_2 = param1 ? (Button(param1)) : (null);
            if (_loc_2 != _defaultButton)
            {
                if (_defaultButton)
                {
                    _defaultButton.emphasized = false;
                }
                if (defButton)
                {
                    defButton.emphasized = false;
                }
                _defaultButton = _loc_2;
                defButton = _loc_2;
                if (_loc_2)
                {
                    _loc_2.emphasized = true;
                }
            }
            return;
        }// end function

        private function deactivateHandler(event:Event) : void
        {
            var _loc_2:InteractiveObject = null;
            _loc_2 = InteractiveObject(event.target);
            return;
        }// end function

        public function setFocus(param1:InteractiveObject) : void
        {
            if (param1 is IFocusManagerComponent)
            {
                IFocusManagerComponent(param1).setFocus();
            }
            else
            {
                form.stage.focus = param1;
            }
            return;
        }// end function

        private function setFocusToNextObject(event:FocusEvent) : void
        {
            var _loc_2:InteractiveObject = null;
            if (!hasFocusableObjects())
            {
                return;
            }
            _loc_2 = getNextFocusManagerComponent(event.shiftKey);
            if (_loc_2)
            {
                setFocus(_loc_2);
            }
            return;
        }// end function

        private function hasFocusableObjects() : Boolean
        {
            var _loc_1:Object = null;
            for (_loc_1 in focusableObjects)
            {
                
                return true;
            }
            return false;
        }// end function

        private function tabIndexChangeHandler(event:Event) : void
        {
            calculateCandidates = true;
            return;
        }// end function

        private function sortFocusableObjects() : void
        {
            var _loc_1:Object = null;
            var _loc_2:InteractiveObject = null;
            focusableCandidates = [];
            for (_loc_1 in focusableObjects)
            {
                
                _loc_2 = InteractiveObject(_loc_1);
                if (_loc_2.tabIndex && !isNaN(Number(_loc_2.tabIndex)) && _loc_2.tabIndex > 0)
                {
                    sortFocusableObjectsTabIndex();
                    return;
                }
                focusableCandidates.push(_loc_2);
            }
            focusableCandidates.sort(sortByDepth);
            return;
        }// end function

        private function keyFocusChangeHandler(event:FocusEvent) : void
        {
            showFocusIndicator = true;
            if ((event.keyCode == Keyboard.TAB || event.keyCode == 0) && !event.isDefaultPrevented())
            {
                setFocusToNextObject(event);
                event.preventDefault();
            }
            return;
        }// end function

        private function getIndexOfFocusedObject(param1:DisplayObject) : int
        {
            var _loc_2:int = 0;
            var _loc_3:int = 0;
            _loc_2 = focusableCandidates.length;
            _loc_3 = 0;
            _loc_3 = 0;
            while (_loc_3 < _loc_2)
            {
                
                if (focusableCandidates[_loc_3] == param1)
                {
                    return _loc_3;
                }
                _loc_3++;
            }
            return -1;
        }// end function

        public function hideFocus() : void
        {
            return;
        }// end function

        private function removedHandler(event:Event) : void
        {
            var _loc_2:int = 0;
            var _loc_3:DisplayObject = null;
            var _loc_4:InteractiveObject = null;
            _loc_3 = DisplayObject(event.target);
            if (_loc_3 is IFocusManagerComponent && focusableObjects[_loc_3] == true)
            {
                if (_loc_3 == lastFocus)
                {
                    IFocusManagerComponent(lastFocus).drawFocus(false);
                    lastFocus = null;
                }
                _loc_3.removeEventListener(Event.TAB_ENABLED_CHANGE, tabEnabledChangeHandler);
                delete focusableObjects[_loc_3];
                calculateCandidates = true;
            }
            else if (_loc_3 is InteractiveObject && focusableObjects[_loc_3] == true)
            {
                _loc_4 = _loc_3 as InteractiveObject;
                if (_loc_4)
                {
                    if (_loc_4 == lastFocus)
                    {
                        lastFocus = null;
                    }
                    delete focusableObjects[_loc_4];
                    calculateCandidates = true;
                }
                _loc_3.addEventListener(Event.TAB_ENABLED_CHANGE, tabEnabledChangeHandler);
            }
            removeFocusables(_loc_3);
            return;
        }// end function

        private function sortByDepth(param1:InteractiveObject, param2:InteractiveObject) : Number
        {
            var _loc_3:String = null;
            var _loc_4:String = null;
            var _loc_5:int = 0;
            var _loc_6:String = null;
            var _loc_7:String = null;
            var _loc_8:String = null;
            var _loc_9:DisplayObject = null;
            var _loc_10:DisplayObject = null;
            _loc_3 = "";
            _loc_4 = "";
            _loc_8 = "0000";
            _loc_9 = DisplayObject(param1);
            _loc_10 = DisplayObject(param2);
            while (_loc_9 != DisplayObject(form) && _loc_9.parent)
            {
                
                _loc_5 = getChildIndex(_loc_9.parent, _loc_9);
                _loc_6 = _loc_5.toString(16);
                if (_loc_6.length < 4)
                {
                    _loc_7 = _loc_8.substring(0, 4 - _loc_6.length) + _loc_6;
                }
                _loc_3 = _loc_7 + _loc_3;
                _loc_9 = _loc_9.parent;
            }
            while (_loc_10 != DisplayObject(form) && _loc_10.parent)
            {
                
                _loc_5 = getChildIndex(_loc_10.parent, _loc_10);
                _loc_6 = _loc_5.toString(16);
                if (_loc_6.length < 4)
                {
                    _loc_7 = _loc_8.substring(0, 4 - _loc_6.length) + _loc_6;
                }
                _loc_4 = _loc_7 + _loc_4;
                _loc_10 = _loc_10.parent;
            }
            return _loc_3 > _loc_4 ? (1) : (_loc_3 < _loc_4 ? (-1) : (0));
        }// end function

        public function get defaultButton() : Button
        {
            return _defaultButton;
        }// end function

        private function activateHandler(event:Event) : void
        {
            var _loc_2:InteractiveObject = null;
            _loc_2 = InteractiveObject(event.target);
            if (lastFocus)
            {
                if (lastFocus is IFocusManagerComponent)
                {
                    IFocusManagerComponent(lastFocus).setFocus();
                }
                else
                {
                    form.stage.focus = lastFocus;
                }
            }
            lastAction = "ACTIVATE";
            return;
        }// end function

        public function showFocus() : void
        {
            return;
        }// end function

        public function set defaultButtonEnabled(param1:Boolean) : void
        {
            _defaultButtonEnabled = param1;
            return;
        }// end function

        public function getNextFocusManagerComponent(param1:Boolean = false) : InteractiveObject
        {
            var _loc_2:DisplayObject = null;
            var _loc_3:String = null;
            var _loc_4:int = 0;
            var _loc_5:Boolean = false;
            var _loc_6:int = 0;
            var _loc_7:int = 0;
            var _loc_8:IFocusManagerGroup = null;
            if (!hasFocusableObjects())
            {
                return null;
            }
            if (calculateCandidates)
            {
                sortFocusableObjects();
                calculateCandidates = false;
            }
            _loc_2 = form.stage.focus;
            _loc_2 = DisplayObject(findFocusManagerComponent(InteractiveObject(_loc_2)));
            _loc_3 = "";
            if (_loc_2 is IFocusManagerGroup)
            {
                _loc_8 = IFocusManagerGroup(_loc_2);
                _loc_3 = _loc_8.groupName;
            }
            _loc_4 = getIndexOfFocusedObject(_loc_2);
            _loc_5 = false;
            _loc_6 = _loc_4;
            if (_loc_4 == -1)
            {
                if (param1)
                {
                    _loc_4 = focusableCandidates.length;
                }
                _loc_5 = true;
            }
            _loc_7 = getIndexOfNextObject(_loc_4, param1, _loc_5, _loc_3);
            return findFocusManagerComponent(focusableCandidates[_loc_7]);
        }// end function

        private function mouseDownHandler(event:MouseEvent) : void
        {
            var _loc_2:InteractiveObject = null;
            if (event.isDefaultPrevented())
            {
                return;
            }
            _loc_2 = getTopLevelFocusTarget(InteractiveObject(event.target));
            if (!_loc_2)
            {
                return;
            }
            showFocusIndicator = false;
            if ((_loc_2 != lastFocus || lastAction == "ACTIVATE") && !(_loc_2 is TextField))
            {
                setFocus(_loc_2);
            }
            lastAction = "MOUSEDOWN";
            return;
        }// end function

        private function isTabVisible(param1:DisplayObject) : Boolean
        {
            var _loc_2:DisplayObjectContainer = null;
            _loc_2 = param1.parent;
            while (_loc_2 && !(_loc_2 is Stage) && !(_loc_2.parent && _loc_2.parent is Stage))
            {
                
                if (!_loc_2.tabChildren)
                {
                    return false;
                }
                _loc_2 = _loc_2.parent;
            }
            return true;
        }// end function

        public function get nextTabIndex() : int
        {
            return 0;
        }// end function

        private function keyDownHandler(event:KeyboardEvent) : void
        {
            if (event.keyCode == Keyboard.TAB)
            {
                lastAction = "KEY";
                if (calculateCandidates)
                {
                    sortFocusableObjects();
                    calculateCandidates = false;
                }
            }
            if (defaultButtonEnabled && event.keyCode == Keyboard.ENTER && defaultButton && defButton.enabled)
            {
                sendDefaultButtonEvent();
            }
            return;
        }// end function

        private function focusInHandler(event:FocusEvent) : void
        {
            var _loc_2:InteractiveObject = null;
            var _loc_3:Button = null;
            _loc_2 = InteractiveObject(event.target);
            if (form.contains(_loc_2))
            {
                lastFocus = findFocusManagerComponent(InteractiveObject(_loc_2));
                if (lastFocus is Button)
                {
                    _loc_3 = Button(lastFocus);
                    if (defButton)
                    {
                        defButton.emphasized = false;
                        defButton = _loc_3;
                        _loc_3.emphasized = true;
                    }
                }
                else if (defButton && defButton != _defaultButton)
                {
                    defButton.emphasized = false;
                    defButton = _defaultButton;
                    _defaultButton.emphasized = true;
                }
            }
            return;
        }// end function

        private function tabEnabledChangeHandler(event:Event) : void
        {
            var _loc_2:InteractiveObject = null;
            var _loc_3:Boolean = false;
            calculateCandidates = true;
            _loc_2 = InteractiveObject(event.target);
            _loc_3 = focusableObjects[_loc_2] == true;
            if (_loc_2.tabEnabled)
            {
                if (!_loc_3 && isTabVisible(_loc_2))
                {
                    if (!(_loc_2 is IFocusManagerComponent))
                    {
                        _loc_2.focusRect = false;
                    }
                    focusableObjects[_loc_2] = true;
                }
            }
            else if (_loc_3)
            {
                delete focusableObjects[_loc_2];
            }
            return;
        }// end function

        public function set showFocusIndicator(param1:Boolean) : void
        {
            _showFocusIndicator = param1;
            return;
        }// end function

        public function get form() : DisplayObjectContainer
        {
            return _form;
        }// end function

        private function sortByTabIndex(param1:InteractiveObject, param2:InteractiveObject) : int
        {
            return param1.tabIndex > param2.tabIndex ? (1) : (param1.tabIndex < param2.tabIndex ? (-1) : (sortByDepth(param1, param2)));
        }// end function

        public function activate() : void
        {
            if (activated)
            {
                return;
            }
            form.stage.addEventListener(FocusEvent.MOUSE_FOCUS_CHANGE, mouseFocusChangeHandler, false, 0, true);
            form.stage.addEventListener(FocusEvent.KEY_FOCUS_CHANGE, keyFocusChangeHandler, false, 0, true);
            form.addEventListener(FocusEvent.FOCUS_IN, focusInHandler, true);
            form.addEventListener(FocusEvent.FOCUS_OUT, focusOutHandler, true);
            form.stage.addEventListener(Event.ACTIVATE, activateHandler, false, 0, true);
            form.stage.addEventListener(Event.DEACTIVATE, deactivateHandler, false, 0, true);
            form.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler);
            form.addEventListener(KeyboardEvent.KEY_DOWN, keyDownHandler, true);
            activated = true;
            if (lastFocus)
            {
                setFocus(lastFocus);
            }
            return;
        }// end function

        public function deactivate() : void
        {
            form.stage.removeEventListener(FocusEvent.MOUSE_FOCUS_CHANGE, mouseFocusChangeHandler);
            form.stage.removeEventListener(FocusEvent.KEY_FOCUS_CHANGE, keyFocusChangeHandler);
            form.removeEventListener(FocusEvent.FOCUS_IN, focusInHandler, true);
            form.removeEventListener(FocusEvent.FOCUS_OUT, focusOutHandler, true);
            form.stage.removeEventListener(Event.ACTIVATE, activateHandler);
            form.stage.removeEventListener(Event.DEACTIVATE, deactivateHandler);
            form.removeEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler);
            form.removeEventListener(KeyboardEvent.KEY_DOWN, keyDownHandler, true);
            activated = false;
            return;
        }// end function

        public function get defaultButtonEnabled() : Boolean
        {
            return _defaultButtonEnabled;
        }// end function

    }
}
