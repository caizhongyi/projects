del  base.css

for /f %%i in (dir.txt) do type %%i >> base.css

java -jar compiler.jar --js base.css --create_source_map ./example-map --js_output_file base.min.css --compilation_level ADVANCED_OPTIMIZATIONS
