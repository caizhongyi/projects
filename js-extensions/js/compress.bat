del alinejs.exta.js
del alinejs.exta.min.js


for /f %%i in (compress.ini) do type %%i >> alinejs.exta.js
java -jar yuicompressor.jar  --type js --charset utf-8  alinejs.exta.js -o alinejs.exta.min.js

