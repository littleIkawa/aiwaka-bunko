# aiwaka-bunko

<a href="https://github.com/littleIkawa">@litteleIkawa</a>が作成した講義板書などの文書制作物をまとめたウェブページです。

ログインすることで文書の閲覧が可能で, 他にも文書別に修正リクエスト等を行うことができます。
アカウント作成には私からアクセスコードを聞いて入力する必要があります。

<a href="https://aiwaka-bunko.web.app">https://aiwaka-bunko.web.app</a>にデプロイしています。

## 技術的概要

<table>
  <tr>
    <th>開発人数</th>
    <td>
      1人<br>
    </td>
  </tr>
  <tr>
    <th>開発期間</th>
    <td>約3日</td>
  </tr>
  <tr>
    <th>使用技術</th>
    <td>
        <ul>
        <li>Vue.js v3 (Composition API)</li>
        <li>Typescript</li>
        <li>SCSS</li>
        <li>Google Firebase (Authentication, Storage, Firestore, Hosting)</li>
        </ul>
    </td>
  </tr>
</table>

## テストサーバー起動方法

```
npm install
```

でセットアップ可能.

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

## メモ

- gsutil を pip で入れ, CORS 設定を行った.
