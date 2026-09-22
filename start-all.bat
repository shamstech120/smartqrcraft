@echo off
rem Runs THE SmartQRCraft app: one server for every domain, one database.
rem   US (.com)     http://localhost:8700
rem   UK (.co.uk)   http://uk.localhost:8700
rem   India (.in)   http://in.localhost:8700
rem   Germany (.de) http://de.localhost:8700
rem   Sign in       http://localhost:8700/login   (works on every domain)
cd /d "%~dp0"
python gen_pages.py
node --test --no-warnings "apps/app/test/*.test.mjs"
start "SmartQRCraft :8700" cmd /k node apps\app\server.mjs
timeout /t 2 >nul
start http://localhost:8700
start http://de.localhost:8700
