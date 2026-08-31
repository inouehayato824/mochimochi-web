# もちもち（デモ版）— 公開用

インスタレーション作品「もちもち」のデモを、iPad で全画面で動かすための置き場です。

- `index.html` … 作品本体（1枚で完結）
- `sw.js` … 一度開けば、そのあとは電波が無くても動くようにするもの

**制作用のリポジトリは別です**（`D:\99_MyProject\Mochimochi`）。
収録音・調査ノート・設計メモはそちらにあり、ここには置きません。

## 更新するとき

制作用のフォルダで、これを走らせます。

```
powershell -ExecutionPolicy Bypass -File "D:\99_MyProject\Mochimochi\tools\publish.ps1"
```

`mochimochi_demo.html` が `index.html` として写されるので、そのあと commit / push。

作品の中身を変えたら、`sw.js` の `CACHE = "mochimochi-v1"` の数字を上げてください。
**上げないと、iPad が古いものを掴んだままになります。**
