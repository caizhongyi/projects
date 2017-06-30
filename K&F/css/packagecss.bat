for /f %%i in (dir.txt) do type %%i >> base.css

java -jar yuicompressor.jar --type css --charset utf-8  base.css -o base-min.css
