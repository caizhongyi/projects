del  jquery.plugin.js
del  jquery.plugin.min.js

for /f %%i in (plugin.txt)  do type %%i >> jquery.plugin.js

java -jar yuicompressor.jar  --type js --charset utf-8  jquery.plugin.js -o jquery.plugin.min.js
