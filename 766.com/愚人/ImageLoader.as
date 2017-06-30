package  {
	 import flash.display.*;
     import flash.events.Event;
     import flash.net.URLRequest;
     import flash.sampler.Sample;
     import flash.system.LoaderContext;
		
	public class ImageLoader {
		
		var obj ;
		public function ImageLoader(object) {
			// constructor code
			obj = object;
		}
		
		public function load(url){
			var loader:Loader = new Loader();
			var req:URLRequest = new URLRequest(url);
			loader.load(req,new LoaderContext(true));
			loader.contentLoaderInfo.addEventListener(Event.COMPLETE,completeHandler);
			//addChild(loader);这里也可以自己显示,
			function completeHandler(event:Event):void {
				
        		var bmpData:BitmapData=new BitmapData(loader.width,loader.height);
        		bmpData.draw(loader);
				
        		var bmp:Bitmap=new Bitmap(bmpData);
        		obj.addChild(bmp);
				//return bmp; 
			}

		}

	}
	
}
