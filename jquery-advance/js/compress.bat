del  jquery.advance.js
del  jquery.advance.min.js

for /f %%i in (compress.ini) do type %%i >> jquery.advance.js
java -jar yuicompressor.jar  --type js --charset utf-8  jquery.advance.js -o jquery.advance.min.js
