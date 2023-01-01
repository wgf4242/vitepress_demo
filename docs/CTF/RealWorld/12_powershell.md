
## bypass strict

```shell
type xxx.ps1 | PowerShell.exe -noprofile -
get-content xxx.ps1 | PowerShell.exe -noprofile -
Get-Content xxx.ps1 | Invoke-Expression
Get-Content xxx.ps1 | iex
```