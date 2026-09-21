@echo off
rem Builds all four sites and serves them locally.
rem   .com    http://localhost:8610
rem   .in     http://localhost:8611
rem   .de     http://localhost:8612
rem   .co.uk  http://localhost:8613
cd /d "%~dp0"
python gen_pages.py
python build.py
python qa.py
start "smartqrcraft.com  :8610" cmd /k python -m http.server 8610 --directory dist\smartqrcraft.com
start "smartqrcraft.in   :8611" cmd /k python -m http.server 8611 --directory dist\smartqrcraft.in
start "smartqrcraft.de   :8612" cmd /k python -m http.server 8612 --directory dist\smartqrcraft.de
start "smartqrcraft.co.uk :8613" cmd /k python -m http.server 8613 --directory dist\smartqrcraft.co.uk
timeout /t 2 >nul
start http://localhost:8610
start http://localhost:8611
start http://localhost:8612
start http://localhost:8613
