package FOOL_fla
{
    import flash.display.*;
    import flash.events.*;
    import flash.text.*;
    import flash.utils.*;

    dynamic public class Symbol7_197 extends MovieClip
    {
        public var sct:TextField;
        public var delayed:Number;
        public var checks:Boolean;
        public var congDelay:Number;
        public var li:TextField;
        public var Mclip1:MovieClip;

        public function Symbol7_197()
        {
            addFrameScript(0, frame1, 1, frame2, 2, frame3, 3, frame4, 4, frame5, 5, frame6, 6, frame7, 7, frame8, 8, frame9, 9, frame10, 10, frame11, 11, frame12, 12, frame13, 13, frame14, 14, frame15, 15, frame16, 16, frame17, 17, frame18, 18, frame19, 19, frame20, 20, frame21, 21, frame22, 22, frame23, 23, frame24, 24, frame25, 25, frame26, 26, frame27, 27, frame28);
            return;
        }// end function

        public function delayFun()
        {
            if (checks)
            {
                checks = false;
                clearInterval(delayed);
                trace("k123");
                MovieClip(this.parent).gotoAndStop("game");
            }
            return;
        }// end function

        public function congFun()
        {
            MovieClip(this.parent).soundChannel1.stop();
            clearInterval(congDelay);
            MovieClip(this.parent).stBtn.removeEventListener(MouseEvent.MOUSE_DOWN, MovieClip(this.parent).init);
            MovieClip(parent).gotoAndStop("cong");
            return;
        }// end function

        function frame10()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame14()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame18()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame12()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame3()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame7()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame6()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame13()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame17()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame4()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame9()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame1()
        {
            stop();
            var _loc_1:* = MovieClip(this.parent);
            var _loc_2:* = MovieClip(this.parent).count + 1;
            _loc_1.count = _loc_2;
            trace(MovieClip(this.parent).count);
            if (MovieClip(this.parent).count == 10)
            {
                MovieClip(this.parent).bool1 = true;
            }
            if (MovieClip(this.parent).count == 20)
            {
                MovieClip(this.parent).bool2 = true;
            }
            if (MovieClip(this.parent).bool)
            {
                MovieClip(this.parent).stBtn.gotoAndStop(3);
            }
            MovieClip(this.parent).stBtn.addEventListener(MouseEvent.MOUSE_DOWN, MovieClip(this.parent).init);
            checks = false;
            return;
        }// end function

        function frame16()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame8()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame2()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame5()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame23()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame24()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame28()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame15()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame20()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame21()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame22()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame25()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame27()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame11()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        public function scrdec()
        {
            if (myvar1.sco > 0)
            {
                sct.text = String(myvar1.sco);
            }
            trace("wrong");
            MovieClip(parent).playSound("wsnd");
            myvar1.Life = (myvar1.Life - 1);
            li.text = String(myvar1.Life);
            if (myvar1.Life == 0)
            {
                trace("ININM");
                congDelay = setInterval(congFun, 1500);
            }
            return;
        }// end function

        function frame19()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        function frame26()
        {
            stop();
            if (MovieClip(this.parent).checkVal)
            {
                trace("two");
                MovieClip(this.parent).checkVal = false;
                Mclip1.gotoAndPlay(2);
            }
            return;
        }// end function

        public function scrin()
        {
            myvar1.sco = myvar1.sco + 50;
            sct.text = String(myvar1.sco);
            trace("correct");
            MovieClip(parent).playSound("csnd");
            return;
        }// end function

    }
}
