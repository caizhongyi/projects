del zero.js
del zero.min.js

for /f %%i in (zero.ini) do type %%i >> zero.js
java -jar yuicompressor.jar  --type js --charset utf-8  zero.js -o zero.min.js

