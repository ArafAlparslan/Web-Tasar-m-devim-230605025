@echo off
setlocal EnableExtensions DisableDelayedExpansion
title Mustafa Kaan Aykoc - Kisisel Web Sitesi

rem Tum yollar bu BAT dosyasinin bulundugu klasore gore hesaplanir.
rem Python, Node.js, yonetici izni ve internet baglantisi gerekmez.
echo.
echo Mustafa Kaan Aykoc - Kisisel Web Sitesi
echo Dosyalar kontrol ediliyor...
echo.

for %%F in ("index.html" "style.css" "script.js" "assets\favicon.svg" "assets\portre-renkli.jpg" "assets\portre-siyah-beyaz.jpg" "assets\portre-dis-mekan.jpg") do (
    if not exist "%~dp0%%~F" (
        echo [HATA] Gerekli dosya bulunamadi: %%~F
        echo.
        echo ZIP dosyasina sag tiklayip Tumunu Ayikla secenegini kullanin.
        echo Ardindan cikartilan klasordeki start.bat dosyasini acin.
        echo Klasorun icindeki dosyalari birbirinden ayirmayin.
        echo.
        pause
        exit /b 1
    )
)

echo Tum dosyalar hazir. Kurulum veya indirme gerekmiyor.
echo Web sayfasi varsayilan tarayicinizda aciliyor...

rem Bos ilk tirnak START komutunun pencere basligidir.
rem Tirnakli tam yol, bosluk iceren klasorlerde de calisir.
start "" "%~dp0index.html"
if errorlevel 1 (
    echo.
    echo [HATA] Tarayici otomatik acilamadi.
    echo index.html dosyasina sag tiklayip Birlikte Ac seceneginden
    echo Microsoft Edge, Google Chrome veya Firefox'u secin.
    echo.
    pause
    exit /b 1
)

exit /b 0
