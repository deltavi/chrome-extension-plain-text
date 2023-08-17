IF "%1"=="" ( SET "version=x" ) ELSE ( SET "version=%1" )

rd /s /q tmp
del /s /q chrome-extension-plain-text-V.%version%.zip
mkdir tmp
xcopy /y *.js tmp
xcopy /y *.html tmp
xcopy /y *.json tmp
xcopy /y *.md tmp
xcopy /y LICENSE tmp
xcopy /s/y/i ico tmp\ico
xcopy /s/y/i doc\*.png tmp\doc
CScript  zip.vbs  ./tmp  ./chrome-extension-plain-text-V.%version%.zip
rd /s /q tmp