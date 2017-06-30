package fl.controls.listClasses
{
    import fl.core.*;

    public class ListData extends Object
    {
        protected var _index:uint;
        protected var _owner:UIComponent;
        protected var _label:String;
        protected var _icon:Object = null;
        protected var _row:uint;
        protected var _column:uint;

        public function ListData(param1:String, param2:Object, param3:UIComponent, param4:uint, param5:uint, param6:uint = 0)
        {
            _icon = null;
            _label = param1;
            _icon = param2;
            _owner = param3;
            _index = param4;
            _row = param5;
            _column = param6;
            return;
        }// end function

        public function get owner() : UIComponent
        {
            return _owner;
        }// end function

        public function get label() : String
        {
            return _label;
        }// end function

        public function get row() : uint
        {
            return _row;
        }// end function

        public function get index() : uint
        {
            return _index;
        }// end function

        public function get icon() : Object
        {
            return _icon;
        }// end function

        public function get column() : uint
        {
            return _column;
        }// end function

    }
}
