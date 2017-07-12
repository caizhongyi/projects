del  jquery.plus.js
del  jquery.plus.min.js

for /f %%i in (plus.txt)  do type %%i >> jquery.plus.js

java -jar yuicompressor.jar  --type js --charset utf-8  jquery.plus.js -o jquery.plus.min.js
