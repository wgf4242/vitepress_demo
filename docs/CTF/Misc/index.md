[Wireshark](./wireshark.md)

[tshark](./tshark.md)

[[toc]]

## 文件头
字符串 PK是 zip的开头,  5d480506xxxxx 为尾部

|                ext                 |               header               |                end                 |
| ---------------------------------- | ---------------------------------- | ---------------------------------- |
|                jpg                 |              FFD8                  |              FFD9                  |
|                png                 |              89504E47              |      0000000049454E44AE426082      |
|                zlib                |              789C                  |                                    |
|                zip                 |              504B0304              |              00000000              |
|                rar                 |              52617221              |
|                gif                 |              47494638              |
|                tif                 |              49492A00              |
|                bmp                 |                424D                |
|                dwg                 |              41433130              |
|                psd                 |              38425053              |
|                rtf                 |             7B5C727466             |
|                xml                 |             3C3F786D6C             |
|                html                |             68746D6C3E             |
|                eml                 |    44656C69766572792D646174653A    |
|                dbx                 |          CFAD12FEC5FD746F          |
|                pst                 |              2142444E              |
|              xls/doc               |              D0CF11E0              |
|                mdb                 |        5374616E64617264204A        |
|                wpd                 |              FF575043              |
|                pdf                 |           255044462D312E           |
|                qdf                 |              AC9EBD8F              |
|                pwl                 |              E3828596              |
|                wav                 |              57415645              |
|                avi                 |              41564920              |
|                ram                 |              2E7261FD              |
|                 rm                 |              2E524D46              |
|                mpg                 |              000001BA              |
|                mpg                 |              000001B3              |
|                mov                 |              6D6F6F76              |
|                asf                 |          3026B2758E66CF11          |
|                mid                 |              4D546864              |
