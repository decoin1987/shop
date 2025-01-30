@echo on
for /f "tokens=1* delims==" %%a in (.env) do set "%%a=%%b"
node .output\server\index.mjs