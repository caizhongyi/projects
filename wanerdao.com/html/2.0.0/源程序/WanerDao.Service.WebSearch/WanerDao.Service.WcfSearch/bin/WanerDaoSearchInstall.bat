@ECHO OFF
echo.
echo Press any key to start the installation of wanerdao search service. 
pause
echo.
echo Cleaning up the former service items. . .
%SystemRoot%\Microsoft.NET\Framework\v2.0.50727\installutil /U /LogFile="" %~dp0\WanerDao.Service.WebSearch.exe > InstallService.log
echo.
echo Complete, to start the installation of service. . .
echo.
%SystemRoot%\Microsoft.NET\Framework\v2.0.50727\installutil /LogFile="" %~dp0\WanerDao.Service.WebSearch.exe >> InstallService.log
echo Service installation finishes, starting service. . .
echo.
net start "WanerDao.IndexingService" >> InstallService.log
if errorlevel 0 (echo Service start-up succeeds) else (echo Service start-up fails)
echo.
echo Installation is over, please check in "InstallService. Log" to view log.
echo.
pause
start %cd%\InstallService.log