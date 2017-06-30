package FOOL_fla
{
    import flash.display.*;
    import flash.utils.*;

    dynamic public class fdhjfjjh_229 extends MovieClip
    {
        public var del:Number;

        public function fdhjfjjh_229()
        {
            addFrameScript(0, frame1, 1, frame2);
            return;
        }// end function

        public function Retrieve()
        {
            clearInterval(del);
            MovieClip(this.parent.parent).gotoAndStop(1);
            MovieClip(this.parent.parent).delayed = setInterval(MovieClip(this.parent.parent).delayFun, 1000);
            return;
        }// end function

        function frame1()
        {
            stop();
            return;
        }// end function

        function frame2()
        {
            stop();
            if (!MovieClip(this.parent.parent).checks)
            {
                MovieClip(this.parent.parent).checks = true;
                del = setInterval(Retrieve, 2000);
            }
            return;
        }// end function

    }
}
