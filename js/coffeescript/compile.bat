REM This is a simple batch file that will quickly compile the CoffeeScript in here to
REM JavaScript in the "compiled" directory. You should have installed CoffeeScript's
REM compiler globally with NPM and Node, and without those installed this batch script
REM will not work. So yeah, just install CoffeeScript. Instructions here:
REM http://coffeescript.org/#installation

@echo off
coffee -c -o compiled/ .
