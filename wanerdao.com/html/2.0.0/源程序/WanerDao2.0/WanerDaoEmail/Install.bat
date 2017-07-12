@ECHO OFF
echo.
echo Press any key to start the installation of wanerdao email service. 
pause
echo.
echo Cleaning up the former service items. . .
%SystemRoot%\Microsoft.NET\Framework\v2.0.50727\installutil /U /LogFile="" D:\个人项目\wanerdao2.0\源程序\WanerDao2.0\WanerDaoEmail\bin\Debug\WanerDaoEmail.exe > InstallService.log
echo.
echo Complete, to start the installation of service. . .
echo.
%SystemRoot%\Microsoft.NET\Framework\v2.0.50727\installutil /LogFile="" D:\个人项目\wanerdao2.0\源程序\WanerDao2.0\WanerDaoEmail\bin\Debug\WanerDaoEmail.exe >> InstallService.log
echo Service installation finishes, starting service. . .
echo.
net start "WanerDaoMailService" >> InstallService.log
if errorlevel 0 (echo Service start-up succeeds) else (echo Service start-up fails)
echo.
echo Installation is over, please check in "InstallService. Log" to view log.
echo.
pause
start %cd%\InstallService.log