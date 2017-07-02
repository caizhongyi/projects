for /f %%i in (dir.txt) do type %%i >> uiiang-min.css

java -jar yuicompressor.jar --type css --charset utf-8  uiiang-min.css -o base-min.css
