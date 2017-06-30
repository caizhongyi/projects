package FOOL_fla
{
    import fl.controls.*;
    import flash.display.*;
    import flash.events.*;
    import flash.filters.*;
    import flash.media.*;
    import flash.net.*;
    import flash.text.*;
    import flash.ui.*;
    import flash.utils.*;
    import gs.*;
    import gs.easing.*;

    dynamic public class MainTimeline extends MovieClip
    {
        public var bar:MovieClip;
        public var thef:MovieClip;
        public var mute:MovieClip;
        public var FloadedImages:Number;
        public var imagePathArray:Array;
        public var tempTitArr:Array;
        public var stBtn:MovieClip;
        public var randTitArray:Array;
        public var tempLoaders:Array;
        public var nameText:TextField;
        public var pop:MovieClip;
        public var arr:Array;
        public var Loaderlogo:MovieClip;
        public var cn:Number;
        public var moreGames:SimpleButton;
        public var tw:MovieClip;
        public var bool1:Boolean;
        public var playAgain:SimpleButton;
        public var playBtn:SimpleButton;
        public var bool2:Boolean;
        public var tempImgArr:Array;
        public var contestMenu:ContextMenu;
        public var percentage:Number;
        public var sinc:Number;
        public var sx:Number;
        public var preloader:StarPreloader;
        public var bgs:bg;
        public var titleArray:Array;
        public var myLoader:URLLoader;
        public var FimgInd:Number;
        public var bool:Boolean;
        public var total_txt:TextField;
        public var checkVal:Boolean;
        public var randTarArray:Array;
        public var count:Number;
        public var Mclip:MovieClip;
        public var scoreText3:TextField;
        public var help:SimpleButton;
        public var instruct:SimpleButton;
        public var loaderArr:Array;
        public var targetArray:Array;
        public var soundToggle:Boolean;
        public var dTime:Number;
        public var submitScore:SimpleButton;
        public var tempTarArr:Array;
        public var face1:MovieClip;
        public var ItxtMc:MovieClip;
        public var msg:MovieClip;
        public var congmc:MovieClip;
        public var load_txt:TextField;
        public var countryCombo:ComboBox;
        public var mc:MovieClip;
        public var mo:SimpleButton;
        public var randImgArray:Array;
        public var logo:SimpleButton;
        public var soundChannel1:SoundChannel;
        public var contextmenuItem:ContextMenuItem;
        public var refMc1:MovieClip;
        public var refMc2:MovieClip;
        public var refMc3:MovieClip;
        public var noThanks:SimpleButton;
        public var ran1:Object;
        public var ran2:Number;
        public var backBtn:SimpleButton;
        public var pa:SimpleButton;
        public var levelXML:XML;

        public function MainTimeline()
        {
            addFrameScript(0, frame1, 4, frame5, 9, frame10, 14, frame15, 19, frame20, 24, frame25);
            return;
        }// end function

        public function tw1(event:MouseEvent) : void
        {
            navigateToURL(new URLRequest("http://www.twitter.com/123beecom"), "_blank");
            return;
        }// end function

        public function moregmbtfn(event:MouseEvent)
        {
            navigateToURL(new URLRequest("http://www.123bee.com"), "_blank");
            return;
        }// end function

        public function gotoBee(event:MouseEvent) : void
        {
            navigateToURL(new URLRequest("http://www.123bee.com"), "_blank");
            return;
        }// end function

        public function removeGlow(event:MouseEvent)
        {
            event.currentTarget.filters = [];
            ItxtMc.x = -250;
            ItxtMc.y = -250;
            return;
        }// end function

        public function sdrg(event:MouseEvent)
        {
            TweenLite.to(pop, 1, {x:853, y:245, ease:Back.easeInOut});
            return;
        }// end function

        public function playSound(param1:String)
        {
            var _loc_2:Class = null;
            var _loc_3:Object = null;
            if (soundToggle)
            {
                _loc_2 = getDefinitionByName(param1) as Class;
                _loc_3 = new _loc_2;
                _loc_3.play();
            }
            return;
        }// end function

        public function showGlow(event:MouseEvent)
        {
            var _loc_2:GlowFilter = null;
            var _loc_3:Array = null;
            _loc_2 = new GlowFilter();
            _loc_2.color = 16763904;
            _loc_2.alpha = 1;
            _loc_2.blurX = 15;
            _loc_2.blurY = 15;
            _loc_3 = new Array(_loc_2);
            event.currentTarget.filters = _loc_3;
            ItxtMc.x = event.currentTarget.x;
            ItxtMc.y = refMc1.y - 60;
            ItxtMc.imgTxt.text = String(randTitArray[event.currentTarget.num]);
            return;
        }// end function

        function frame10()
        {
            stop();
            backBtn.addEventListener(MouseEvent.CLICK, backFun);
            return;
        }// end function

        public function msgHide(event:MouseEvent)
        {
            msg.visible = false;
            return;
        }// end function

        public function startApp(event:Event)
        {
            var _loc_2:XML = null;
            levelXML = XML(myLoader.data);
            for each (_loc_2 in levelXML.item)
            {
                
                titleArray.push(_loc_2.title);
                imagePathArray.push(_loc_2.image_path);
                targetArray.push(_loc_2.target_url);
            }
            getRandomNum();
            return;
        }// end function

        function frame15()
        {
            MochiBot.track(this, "bdc2f2b9");
            soundChannel1 = new SoundChannel();
            bgs = new bg();
            soundChannel1 = bgs.play(0, int.MAX_VALUE);
            if (!soundToggle)
            {
                mute.gotoAndStop(2);
                SoundMixer.stopAll();
            }
            else
            {
                mute.gotoAndStop(1);
                soundChannel1 = bgs.play(0, int.MAX_VALUE);
            }
            mute.buttonMode = true;
            mute.addEventListener(MouseEvent.CLICK, getSound);
            stop();
            help.addEventListener(MouseEvent.CLICK, helpfi1);
            pop.cl.addEventListener(MouseEvent.CLICK, sdrg);
            stBtn.buttonMode = true;
            bool = false;
            bool1 = false;
            bool2 = false;
            count = 0;
            stBtn.gotoAndStop(1);
            logo.addEventListener(MouseEvent.CLICK, gotoBee);
            stBtn.addEventListener(MouseEvent.MOUSE_DOWN, init);
            return;
        }// end function

        public function f(event:MouseEvent) : void
        {
            navigateToURL(new URLRequest("http://www.facebook.com/pages/123beecom/100396170010752"), "_blank");
            return;
        }// end function

        function frame5()
        {
            stop();
            soundToggle = true;
            playBtn.addEventListener(MouseEvent.CLICK, playFun);
            return;
        }// end function

        function frame25()
        {
            stop();
            titleArray = new Array("");
            imagePathArray = new Array("");
            targetArray = new Array("");
            tempLoaders = new Array("");
            FloadedImages = 1;
            sx = 50;
            sinc = 0;
            loaderArr = new Array("");
            tempImgArr = new Array("");
            tempTarArr = new Array("");
            tempTitArr = new Array("");
            randImgArray = new Array("");
            randTarArray = new Array("");
            randTitArray = new Array("");
            Main();
            pa.addEventListener(MouseEvent.CLICK, playAgainFun);
            mo.addEventListener(MouseEvent.CLICK, mo1);
            face1.buttonMode = true;
            face1.addEventListener(MouseEvent.CLICK, f);
            tw.buttonMode = true;
            tw.addEventListener(MouseEvent.CLICK, tw1);
            return;
        }// end function

        function frame1()
        {
            stop();
            contestMenu = new ContextMenu();
            contestMenu.hideBuiltInItems();
            contextmenuItem = new ContextMenuItem("www.123bee.com");
            contextmenuItem.addEventListener(ContextMenuEvent.MENU_ITEM_SELECT, Site);
            contestMenu.customItems.push(contextmenuItem);
            this.contextMenu = contestMenu;
            percentage = 0;
            total_txt.text = String(100) + "%";
            stage.addEventListener(Event.ENTER_FRAME, BeeMoving);
            Loaderlogo.buttonMode = true;
            Loaderlogo.addEventListener(MouseEvent.CLICK, Loaderlogo_Bee123);
            return;
        }// end function

        function frame20()
        {
            stop();
            SoundMixer.stopAll();
            if (myvar1.sco <= 1000)
            {
                congmc.gotoAndStop(2);
            }
            else if (myvar1.sco >= 1000)
            {
                thef.gotoAndStop(2);
                trace("ININ");
            }
            scoreText3.selectable = false;
            scoreText3.text = myvar1.sco.toString();
            countryCombo = new ComboBox();
            addChild(countryCombo);
            countryCombo.height = mc.height;
            countryCombo.width = mc.width;
            countryCombo.x = mc.x;
            countryCombo.y = mc.y;
            this.setChildIndex(msg, (numChildren - 1));
            playAgain.addEventListener(MouseEvent.CLICK, gotoPlay5);
            moreGames.addEventListener(MouseEvent.CLICK, moregmbtfn);
            submitScore.addEventListener(MouseEvent.CLICK, submitMyScore);
            noThanks.addEventListener(MouseEvent.CLICK, noFun);
            nameText.restrict = "a-z A-Z 0-9\\ .";
            nameText.maxChars = 12;
            cn = 0;
            msg.visible = false;
            msg.x = 375.3;
            msg.y = 100;
            arr = new Array("Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Darussalam", "Bulgaria", "Burkina", "Faso", "Burma (Myanmar)", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape", "Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "East", "Timor", "Egypt", "Salvador", "England", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Great Britain", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (North)", "Korea (South)", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Northern Ireland", "Oman", "Pakistan", "Palau", "Palestinian", "Panama", "Papua new Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Nevis", "Lucia Vincent", "Arabia", "Scotland", "Senegal", "Serbia", "Seychelles", "Sierra", "Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad", "Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican", "Venezuela", "Vietnam", "Western Sahara*", "Wales", "Yemen", "Zaire", "Zambia", "Zimbabwe");
            arr = arr.sort();
            countryCombo.addItem({label:"All Countries"});
            cn = 0;
            while (cn < arr.length)
            {
                
                countryCombo.addItem({label:arr[cn]});
                var _loc_2:* = cn + 1;
                cn = _loc_2;
            }
            msg.okBtn.addEventListener(MouseEvent.CLICK, msgHide);
            return;
        }// end function

        public function initGlow(param1)
        {
            var _loc_2:GlowFilter = null;
            var _loc_3:Array = null;
            _loc_2 = new GlowFilter();
            _loc_2.color = 16764108;
            _loc_2.alpha = 1;
            _loc_2.blurX = 15;
            _loc_2.blurY = 15;
            _loc_3 = new Array(_loc_2);
            param1.filters = _loc_3;
            return;
        }// end function

        public function mo1(event:MouseEvent) : void
        {
            navigateToURL(new URLRequest("http://www.123bee.com"), "_blank");
            return;
        }// end function

        public function helpfi1(event:MouseEvent)
        {
            TweenLite.to(pop, 0.7, {x:314, y:245, ease:Back.easeInOut});
            return;
        }// end function

        public function removeClips()
        {
            var _loc_1:* = undefined;
            var _loc_2:* = undefined;
            var _loc_3:MovieClip = null;
            clearInterval(dTime);
            _loc_1 = 1;
            while (_loc_1 < loaderArr.length)
            {
                
                _loc_3 = MovieClip(loaderArr[_loc_1]);
                if (_loc_3 != null)
                {
                    _loc_3.removeEventListener(Event.ENTER_FRAME, rotatePreloader);
                }
                _loc_1 = _loc_1 + 1;
            }
            _loc_2 = 1;
            while (_loc_2 < tempLoaders.length)
            {
                
                if (tempLoaders[_loc_2] != null)
                {
                    tempLoaders[_loc_2].parent.removeChild(tempLoaders[_loc_2]);
                }
                _loc_2 = _loc_2 + 1;
            }
            return;
        }// end function

        public function getRandomNum()
        {
            var _loc_1:* = undefined;
            var _loc_2:* = undefined;
            var _loc_3:* = undefined;
            var _loc_4:Number = NaN;
            var _loc_5:Number = NaN;
            _loc_1 = 1;
            while (_loc_1 < tempLoaders.length)
            {
                
                if (tempLoaders[_loc_1] != null)
                {
                    tempLoaders[_loc_1].parent.removeChild(tempLoaders[_loc_1]);
                }
                _loc_1 = _loc_1 + 1;
            }
            clearInterval(dTime);
            randImgArray = new Array("");
            randTarArray = new Array("");
            randTitArray = new Array("");
            tempImgArr = new Array("");
            tempTarArr = new Array("");
            tempTitArr = new Array("");
            loaderArr = new Array("");
            _loc_2 = 1;
            while (_loc_2 < imagePathArray.length)
            {
                
                tempImgArr.push(imagePathArray[_loc_2]);
                tempTarArr.push(targetArray[_loc_2]);
                tempTitArr.push(titleArray[_loc_2]);
                _loc_2 = _loc_2 + 1;
            }
            FimgInd = 1;
            _loc_3 = 1;
            while (_loc_3 <= 3)
            {
                
                _loc_4 = tempImgArr.length - 1;
                _loc_5 = Math.ceil(Math.random() * _loc_4);
                randImgArray.push(tempImgArr[_loc_5]);
                randTarArray.push(tempTarArr[_loc_5]);
                randTitArray.push(tempTitArr[_loc_5]);
                tempTarArr.splice(_loc_5, 1);
                tempImgArr.splice(_loc_5, 1);
                tempTitArr.splice(_loc_5, 1);
                _loc_3 = _loc_3 + 1;
            }
            Limages();
            return;
        }// end function

        public function submitMyScore(event:MouseEvent) : void
        {
            if (nameText.text != "" && countryCombo.selectedItem.label != "All Countries")
            {
                event.target.mouseEnabled = false;
                ScoreSubmit.sendMyScore(nameText.text, String(countryCombo.selectedItem.label), myvar1.sco, 18976, "http://www.123bee.com", "1/1");
                submitScore.removeEventListener(MouseEvent.CLICK, submitMyScore);
                countryCombo.removeAll();
                countryCombo.editable = false;
                countryCombo.parent.removeChild(countryCombo);
                myvar1.Life = 5;
                myvar1.sco = 0;
                gotoAndStop("Nothanks");
            }
            else
            {
                msg.visible = true;
                msg.x = 373.9;
                msg.y = 97;
                if (nameText.text == "")
                {
                    msg.tex.text = "Enter your name";
                }
                else if (countryCombo.selectedItem.label == "All Countries")
                {
                    msg.tex.text = "Select your country";
                }
            }
            return;
        }// end function

        public function init(event:MouseEvent)
        {
            bool = true;
            stBtn.gotoAndStop(2);
            stBtn.removeEventListener(MouseEvent.MOUSE_DOWN, init);
            checkVal = true;
            ran1 = Math.ceil(Math.random() * 9);
            if (bool1)
            {
                Mclip.gotoAndPlay(ran1 + 10);
                trace("ran num" + ran1);
            }
            else if (bool2)
            {
                Mclip.gotoAndPlay(ran1 + 20);
            }
            else
            {
                Mclip.gotoAndPlay((ran1 + 1));
                trace("ran num" + ran1);
            }
            return;
        }// end function

        public function backFun(event:MouseEvent)
        {
            gotoAndStop("game");
            return;
        }// end function

        public function BeeMoving(event:Event) : void
        {
            var _loc_2:Number = NaN;
            var _loc_3:Number = NaN;
            _loc_2 = loaderInfo.bytesLoaded;
            _loc_3 = loaderInfo.bytesTotal;
            percentage = Math.round(_loc_2 / _loc_3 * 100);
            load_txt.text = String(percentage) + "%";
            bar.maskbar.gotoAndStop(percentage);
            if (_loc_2 == _loc_3)
            {
                gotoAndStop("start");
                stage.removeEventListener(Event.ENTER_FRAME, BeeMoving);
            }
            return;
        }// end function

        public function playAgainFun(event:MouseEvent)
        {
            removeClips();
            pa.removeEventListener(MouseEvent.CLICK, playAgainFun);
            gotoAndStop("start");
            return;
        }// end function

        public function rotatePreloader(event:Event)
        {
            event.currentTarget.rotation = event.currentTarget.rotation + 5;
            return;
        }// end function

        public function Site(event:Event) : void
        {
            var _loc_2:URLRequest = null;
            _loc_2 = new URLRequest("http://www.123bee.com");
            navigateToURL(_loc_2, "_blank");
            return;
        }// end function

        public function getSound(event:MouseEvent) : void
        {
            if (event.currentTarget.currentFrame == 1)
            {
                soundToggle = false;
                soundChannel1.stop();
                SoundMixer.stopAll();
                event.currentTarget.gotoAndStop(2);
            }
            else
            {
                soundToggle = true;
                soundChannel1.stop();
                soundChannel1 = bgs.play(0, int.MAX_VALUE);
                event.currentTarget.gotoAndStop(1);
            }
            return;
        }// end function

        public function FimageLoaded(event:Event)
        {
            var _loc_2:* = undefined;
            var _loc_3:MovieClip = null;
            var _loc_5:* = FimgInd + 1;
            FimgInd = _loc_5;
            if (FimgInd <= 3)
            {
                FloadIntroImage();
            }
            else
            {
                _loc_2 = 1;
                while (_loc_2 < loaderArr.length)
                {
                    
                    _loc_3 = loaderArr[_loc_2];
                    if (_loc_3 != null)
                    {
                        _loc_3.visible = false;
                        _loc_3.parent.removeChild(_loc_3);
                        _loc_3.removeEventListener(Event.ENTER_FRAME, rotatePreloader);
                    }
                    _loc_2 = _loc_2 + 1;
                }
                clearInterval(dTime);
                dTime = setInterval(getRandomNum, 8000);
            }
            return;
        }// end function

        public function Loaderlogo_Bee123(event:MouseEvent) : void
        {
            navigateToURL(new URLRequest("http://www.123bee.com"), "_blank");
            return;
        }// end function

        public function FloadIntroImage()
        {
            var _loc_1:Loader = null;
            var _loc_2:URLRequest = null;
            var _loc_3:MovieClip = null;
            _loc_1 = new Loader();
            _loc_2 = new URLRequest(randImgArray[FimgInd]);
            _loc_1.load(_loc_2);
            _loc_3 = tempLoaders[FimgInd];
            _loc_3.addChild(_loc_1);
            _loc_3.num = FimgInd;
            _loc_3.buttonMode = true;
            _loc_3.addEventListener(MouseEvent.CLICK, selectImage);
            _loc_3.addEventListener(MouseEvent.MOUSE_OVER, showGlow);
            _loc_3.addEventListener(MouseEvent.MOUSE_OUT, removeGlow);
            _loc_1.contentLoaderInfo.addEventListener(Event.COMPLETE, FimageLoaded);
            return;
        }// end function

        public function playFun(event:MouseEvent)
        {
            gotoAndStop("ins");
            return;
        }// end function

        public function selectImage(event:MouseEvent)
        {
            var _loc_2:MovieClip = null;
            var _loc_3:String = null;
            var _loc_4:URLRequest = null;
            _loc_2 = MovieClip(event.currentTarget);
            _loc_3 = randTarArray[String(_loc_2.num)];
            _loc_4 = new URLRequest(_loc_3);
            navigateToURL(_loc_4, "_blank");
            return;
        }// end function

        public function Main()
        {
            var _loc_1:String = null;
            _loc_1 = "http://www.123bee.com/game-banner/braintwister.xml";
            myLoader = new URLLoader(new URLRequest(_loc_1));
            myLoader.addEventListener(Event.COMPLETE, startApp);
            return;
        }// end function

        public function gotoPlay5(event:MouseEvent) : void
        {
            playAgain.removeEventListener(MouseEvent.CLICK, gotoPlay5);
            countryCombo.removeAll();
            countryCombo.editable = false;
            countryCombo.parent.removeChild(countryCombo);
            myvar1.Life = 5;
            myvar1.sco = 0;
            gotoAndStop("start");
            return;
        }// end function

        public function Limages()
        {
            var _loc_1:* = undefined;
            var _loc_2:MovieClip = null;
            var _loc_3:MovieClip = null;
            tempLoaders = new Array("");
            sx = 50;
            sinc = 0;
            _loc_1 = 1;
            while (_loc_1 < randImgArray.length)
            {
                
                _loc_2 = new MovieClip();
                _loc_3 = this["refMc" + _loc_1];
                _loc_2.x = _loc_3.x;
                _loc_2.y = _loc_3.y;
                preloader = new StarPreloader();
                _loc_2.addChild(preloader);
                preloader.x = sx + sinc;
                preloader.y = _loc_3.y - 80;
                sinc = sinc + 15;
                loaderArr.push(preloader);
                preloader.addEventListener(Event.ENTER_FRAME, rotatePreloader);
                addChild(_loc_2);
                tempLoaders.push(_loc_2);
                _loc_1 = _loc_1 + 1;
            }
            FloadIntroImage();
            return;
        }// end function

        public function noFun(event:MouseEvent)
        {
            countryCombo.removeAll();
            countryCombo.editable = false;
            countryCombo.parent.removeChild(countryCombo);
            myvar1.Life = 5;
            myvar1.sco = 0;
            gotoAndStop("Nothanks");
            return;
        }// end function

    }
}
