package fl.managers
{
    import fl.controls.*;
    import flash.display.*;

    public interface IFocusManager
    {

        public function IFocusManager();

        function getFocus() : InteractiveObject;

        function deactivate() : void;

        function set defaultButton(param1:Button) : void;

        function set showFocusIndicator(param1:Boolean) : void;

        function get defaultButtonEnabled() : Boolean;

        function get nextTabIndex() : int;

        function get defaultButton() : Button;

        function get showFocusIndicator() : Boolean;

        function setFocus(param1:InteractiveObject) : void;

        function activate() : void;

        function showFocus() : void;

        function set defaultButtonEnabled(param1:Boolean) : void;

        function hideFocus() : void;

        function findFocusManagerComponent(param1:InteractiveObject) : InteractiveObject;

        function getNextFocusManagerComponent(param1:Boolean = false) : InteractiveObject;

    }
}
