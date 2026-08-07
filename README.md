# DOI Column for Zotero

[English](#english) | [繁體中文](#繁體中文) | [日本語](#日本語)

---

<a id="english"></a>

## English

Adds a **DOI** column to Zotero's items list (the centre panel).

Zotero stores DOI as a real item field — since Zotero 8 on nearly every item
type — but the column picker does not offer it. This plugin adds it, so DOIs
can be scanned and compared across a list without opening each item in turn.

### Why

For many researchers the DOI is the working handle on a reference, not a
cosmetic detail. Two habits depend on being able to see DOIs across a list
rather than one item at a time.

**Verifying citations.** When reviewing a manuscript, a reader can walk the
reference list DOI by DOI and confirm that each cited work exists and says
what it is claimed to say. This has long been standard practice in some
fields, and it has become more routine since fabricated or mismatched
references became easier to produce. Maintaining a personal library that
supports this work means being able to see, at a glance, which records carry
a resolvable identifier and which do not.

**Manual deduplication.** Zotero's built-in **Duplicate Items** view matches
on DOI first, but it can only show the pairs it already matched. It cannot
show the ones it missed — records with poor source metadata, or a pair where
one side has a DOI and the other does not. Those are exactly the cases that
need a human, and they stay invisible until the DOIs are side by side.

An unexpected side effect: sorting by DOI groups the library by publisher,
since the DOI prefix identifies the registrant. This is often cleaner than
sorting by Publisher, where the same press arrives from different sources as
"Springer", "Springer-Verlag" and "Springer International Publishing".

### Install

1. Download `doi-column.xpi` from the
   [Releases](https://github.com/anfang886/zotero-doi-column/releases) page.
   (In Firefox, right-click the link and choose *Save Link As…* so the browser
   does not try to install it itself.)
2. In Zotero: **Tools → Plugins**, click the gear icon, choose
   **Install Plugin From File…**, and select the `.xpi`.
3. Right-click the column headers in the items list and enable **DOI** under
   *More Columns*.

Requires Zotero 7.0 or later. Built and tested against Zotero 9.

Note on compatibility: `strict_max_version` is deliberately set to `99.*`.
Zotero now ships a new major version roughly every 6–10 weeks, so pinning a
narrow ceiling would make the plugin refuse to install within a couple of
months. The plugin only touches the documented `ItemTreeManager` API, so a
permissive ceiling is the right trade-off; if a future release does break it,
the fix belongs in the code, not in an install-time block.

### Behaviour

- Reads the item's `DOI` field.
- Falls back to parsing `DOI: 10.xxxx/yyyy` out of **Extra**, for libraries not
  yet migrated to Zotero 8's fields and for item types that lack the field on
  Zotero 7. The Extra field is never written to.
- Displays a bare DOI: a leading `https://doi.org/` or `doi:` is stripped so
  the column stays narrow.
- Sortable, and the column's width and visibility persist across restarts.

### Build

No dependencies and no build step beyond zipping:

```sh
./build.sh
```

This produces `build/doi-column.xpi`. The archive must be zipped from *inside*
the source directory, with `manifest.json` at the archive root — a zip of the
containing folder will not load.

### Development

To iterate without reinstalling, point Zotero at the source directory:

1. Find your [Zotero profile directory](https://www.zotero.org/support/kb/profile_directory).
2. Create `extensions/doi-column@anfang886.github.io` (no extension) inside it,
   containing the absolute path to this source directory.
3. Set `extensions.lastAppBuildId` and `extensions.lastAppVersion` to empty
   strings in `prefs.js` while Zotero is closed, then start Zotero.

See the [Zotero plugin development docs](https://www.zotero.org/support/dev/zotero_7_for_developers)
for details.

### Status

This exists because the feature was requested on the Zotero forums and
declined — the stated objection was that a DOI is a long random-looking string
that does not sort meaningfully. In practice it sorts by publisher, as noted
above, which is more useful than the objection assumed. And the objection was
about *sorting*, while the request was about *display*: the column picker
already offers Extra and Attachments, which nobody sorts by either.

Two things have changed since that decision. Zotero 8 made DOI a field on
nearly every item type, so the picker's omission now sits oddly next to the
more obscure fields it does offer (Court, System, Medium, Loc. in Archive).
And Zotero 9 added "Added By" and "Modified By" as items-list columns, so
there is no standing principle against adding columns.

If upstream ever adds the column, this plugin becomes unnecessary, which would
be the better outcome.

### Prior discussion

The request has come up on the Zotero forums more than once. Links here for
anyone who wants the history:

- [Unable to locate DOI field](https://forums.zotero.org/discussion/30325/unable-to-locate-doi-field) (2013) — where a DOI column was first proposed and declined
- [Add columns to view](https://forums.zotero.org/discussion/76014/add-columns-to-view)
- [DOI column in Zotero](https://forums.zotero.org/discussion/119038/doi-column-in-zotero) (2024)
- [Missing option to add DOI field to columns in main window](https://forums.zotero.org/discussion/131362/missing-option-to-add-doi-field-to-columns-in-main-window)
- [Feature Request: Option to display DOI column in central panel](https://forums.zotero.org/discussion/132957/feature-request-option-to-display-doi-column-in-central-panel) (2026)

### Licence

MIT

---

<a id="繁體中文"></a>

## 繁體中文

在 Zotero 的項目清單（中央面板）加入 **DOI** 欄位。

Zotero 會將 DOI 儲存為正式的項目欄位；自 Zotero 8 起，幾乎所有項目類型
都具備這個欄位，但欄位選擇器並未提供 DOI 選項。本外掛補上這項功能，
讓使用者不必逐一開啟項目，便能在清單中快速檢視與比較 DOI。

### 為什麼需要這個外掛？

對許多研究者而言，DOI 是實際用來追查文獻的識別碼，不只是裝飾性的
資訊。以下兩項研究工作，都需要同時查看整份清單中的 DOI，而不能只逐筆
檢視單一項目。

**查核引文。** 審閱稿件時，讀者可依序核對參考文獻中的 DOI，確認每篇
被引用的著作確實存在，而且內容符合稿件對它的陳述。這在某些領域早已是
標準作法；隨著虛構或錯置的參考文獻更容易出現，這項工作也日益普遍。
若要讓個人文獻庫支援這種查核工作，研究者就必須能一眼辨識哪些紀錄具有
可解析的識別碼，哪些紀錄沒有。

**手動排除重複項目。** Zotero 內建的 **Duplicate Items（重複項目）**
檢視會優先依 DOI 進行配對，但它只能顯示系統已成功配對的項目，無法呈現
被遺漏的紀錄，例如來源後設資料品質不佳，或兩筆紀錄中只有一筆具備 DOI。
這些情況最需要人工判斷，然而，除非將 DOI 並列顯示，否則它們仍會隱藏在
文獻庫中。

另一項意外的效果是：依 DOI 排序時，文獻庫會大致按照出版商分組，因為
DOI 前綴代表註冊機構。這通常比依 Publisher（出版商）欄位排序更整齊；
同一家出版社從不同來源匯入時，名稱可能分別顯示為「Springer」、
「Springer-Verlag」與「Springer International Publishing」。

### 安裝方式

1. 前往 [Releases](https://github.com/anfang886/zotero-doi-column/releases)
   頁面下載 `doi-column.xpi`。（若使用 Firefox，請在連結上按滑鼠右鍵，
   選擇 *Save Link As…（另存連結為……）*，以免瀏覽器嘗試自行安裝。）
2. 在 Zotero 中開啟 **Tools（工具）→ Plugins（外掛程式）**，按一下齒輪
   圖示，選擇 **Install Plugin From File…（從檔案安裝外掛程式……）**，
   再選取 `.xpi` 檔案。
3. 在項目清單的欄位標題上按滑鼠右鍵，並在 *More Columns（更多欄位）*
   中啟用 **DOI**。

需要 Zotero 7.0 或更新版本。本外掛以 Zotero 9 建置並完成測試。

相容性說明：`strict_max_version` 刻意設定為 `99.*`。Zotero 現在大約每
6–10 週就會推出一個主要版本；若將版本上限設得過窄，外掛可能在幾個月內
便拒絕安裝。本外掛只使用已有正式文件的 `ItemTreeManager` API，因此採用
寬鬆的版本上限是較合理的權衡。若未來版本確實造成外掛失效，應在程式碼中
修正，而不是在安裝階段直接阻擋。

### 運作方式

- 讀取項目的 `DOI` 欄位。
- 若文獻庫尚未移轉至 Zotero 8 的欄位格式，或某些 Zotero 7 項目類型沒有
  DOI 欄位，則改從 **Extra** 欄位解析 `DOI: 10.xxxx/yyyy`。本外掛絕不會
  寫入 Extra 欄位。
- 僅顯示 DOI 本身：移除開頭的 `https://doi.org/` 或 `doi:`，避免欄位
  過寬。
- 支援排序；重新啟動 Zotero 後，欄位寬度與顯示狀態仍會保留。

### 建置

無須安裝相依套件，除了壓縮封裝之外也沒有其他建置步驟：

```sh
./build.sh
```

執行後會產生 `build/doi-column.xpi`。壓縮時必須從原始碼目錄的*內部*
進行，並確保 `manifest.json` 位於壓縮檔根目錄；若直接壓縮外層資料夾，
Zotero 將無法載入。

### 開發

若要反覆測試而不重新安裝，可讓 Zotero 直接指向原始碼目錄：

1. 找到您的 [Zotero 設定檔目錄](https://www.zotero.org/support/kb/profile_directory)。
2. 在其中建立名為 `extensions/doi-column@anfang886.github.io` 的檔案
   （不加副檔名），其內容為這個原始碼目錄的絕對路徑。
3. 關閉 Zotero，在 `prefs.js` 中將 `extensions.lastAppBuildId` 與
   `extensions.lastAppVersion` 設為空字串，再啟動 Zotero。

詳情請參閱 [Zotero 外掛程式開發文件](https://www.zotero.org/support/dev/zotero_7_for_developers)。

### 目前狀態

之所以開發這個外掛，是因為 Zotero 論壇曾有人提出這項功能，但未獲採納。
當時的理由是：DOI 是一串看似隨機的長字串，依它排序沒有實際意義。然而，
如上所述，實際依 DOI 排序時會大致按照出版商分組，其用途超出當時反對理由
的預期。況且，當時的反對意見針對的是*排序*，使用者提出的需求卻是*顯示*；
欄位選擇器本來就提供 Extra 與 Attachments，而使用者通常也不會依這些
欄位排序。

自當時的決定以來，已有兩項改變。第一，Zotero 8 已將 DOI 設為幾乎所有
項目類型的欄位；相較於欄位選擇器已提供的 Court、System、Medium 與
Loc. in Archive 等較少使用的欄位，唯獨遺漏 DOI 顯得不甚合理。第二，
Zotero 9 已在項目清單中加入「Added By」與「Modified By」欄位，因此並
不存在一項持續有效、足以反對新增欄位的原則。

若 Zotero 官方日後加入 DOI 欄位，本外掛便不再需要；那其實會是更理想的
結果。

### 過往討論

Zotero 論壇曾多次出現這項需求。以下連結供希望瞭解其歷史的讀者參考：

- [Unable to locate DOI field](https://forums.zotero.org/discussion/30325/unable-to-locate-doi-field)（2013）— 首次提議 DOI 欄位但未獲採納的討論
- [Add columns to view](https://forums.zotero.org/discussion/76014/add-columns-to-view)
- [DOI column in Zotero](https://forums.zotero.org/discussion/119038/doi-column-in-zotero)（2024）
- [Missing option to add DOI field to columns in main window](https://forums.zotero.org/discussion/131362/missing-option-to-add-doi-field-to-columns-in-main-window)
- [Feature Request: Option to display DOI column in central panel](https://forums.zotero.org/discussion/132957/feature-request-option-to-display-doi-column-in-central-panel)（2026）

### 授權條款

MIT

---

<a id="日本語"></a>

## 日本語

Zotero のアイテム一覧（中央ペイン）に **DOI** 列を追加します。

Zotero は DOI を正式なアイテムフィールドとして保存しています。Zotero 8
以降ではほぼすべてのアイテムタイプに DOI フィールドがありますが、列の
選択メニューには DOI が用意されていません。このプラグインは DOI 列を追加し、
各アイテムを一つずつ開かなくても、一覧上で DOI を確認・比較できるようにします。

### このプラグインが必要な理由

多くの研究者にとって、DOI は単なる表示上の情報ではなく、文献を扱う際の
実用的な識別子です。次の二つの作業では、一件ずつではなく、一覧全体の DOI
を同時に確認できることが重要です。

**引用文献の検証。** 原稿を査読するとき、参考文献リストの DOI を順番に
確認すれば、引用された文献が実在し、原稿に記された内容を実際に述べているか
を確かめられます。これは一部の分野では以前から標準的な作業であり、架空の
文献や内容と一致しない文献が生成されやすくなった現在、さらに日常的な作業に
なっています。この検証を個人の文献ライブラリで支援するには、有効な識別子を
持つレコードと持たないレコードを一目で区別できる必要があります。

**手動での重複整理。** Zotero 標準の **Duplicate Items（重複アイテム）**
ビューは DOI を優先して照合しますが、表示できるのは Zotero がすでに重複と
判断した組み合わせだけです。取得元のメタデータに不備があるレコードや、片方
にだけ DOI がある組み合わせなど、照合から漏れたものは表示できません。こうした
事例こそ人の判断が必要ですが、DOI を横に並べて表示しない限り見つけにくいまま
です。

もう一つ、予想外の利点があります。DOI のプレフィックスは登録機関を示すため、
DOI で並べ替えるとライブラリがおおむね出版社ごとにまとまります。同じ出版社が
取得元によって「Springer」「Springer-Verlag」「Springer International
Publishing」と異なる名称で登録される Publisher（出版社）フィールドより、
整然と並ぶことがあります。

### インストール

1. [Releases](https://github.com/anfang886/zotero-doi-column/releases)
   ページから `doi-column.xpi` をダウンロードします。（Firefox では、リンクを
   右クリックして *Save Link As…（名前を付けてリンク先を保存）* を選び、
   ブラウザーが直接インストールしないようにしてください。）
2. Zotero で **Tools（ツール）→ Plugins（プラグイン）** を開き、歯車アイコンを
   クリックして **Install Plugin From File…（ファイルからプラグインをインストール）**
   を選択し、`.xpi` ファイルを指定します。
3. アイテム一覧の列見出しを右クリックし、*More Columns（その他の列）* から
   **DOI** を有効にします。

Zotero 7.0 以降が必要です。Zotero 9 を対象にビルドおよびテストしています。

互換性について：`strict_max_version` は意図的に `99.*` に設定しています。
現在の Zotero は約 6～10 週間ごとに新しいメジャーバージョンを公開するため、
上限を狭く設定すると、数か月でプラグインをインストールできなくなる可能性が
あります。このプラグインが使用するのは、正式に文書化された `ItemTreeManager`
API だけです。そのため、広いバージョン上限を設定することが適切な判断です。
将来のリリースで実際に動作しなくなった場合は、インストール時に遮断するのでは
なく、コードを修正して対応すべきです。

### 動作

- アイテムの `DOI` フィールドを読み取ります。
- Zotero 8 のフィールド形式へまだ移行していないライブラリや、Zotero 7 で DOI
  フィールドを持たないアイテムタイプでは、**Extra** から
  `DOI: 10.xxxx/yyyy` を解析します。Extra フィールドへの書き込みは一切行いません。
- 先頭の `https://doi.org/` または `doi:` を取り除き、DOI 本体だけを表示する
  ことで、列が広くなりすぎないようにします。
- 並べ替えに対応し、Zotero を再起動しても列の幅と表示状態が維持されます。

### ビルド

依存パッケージはなく、ZIP 圧縮以外のビルド工程もありません。

```sh
./build.sh
```

実行すると `build/doi-column.xpi` が生成されます。ソースディレクトリの*内側*
から圧縮し、`manifest.json` がアーカイブのルートに置かれるようにしてください。
ソースを含む外側のフォルダーごと圧縮したファイルは読み込めません。

### 開発

再インストールせずに反復テストするには、Zotero からソースディレクトリを直接
参照させます。

1. [Zotero のプロファイルディレクトリ](https://www.zotero.org/support/kb/profile_directory)
   を確認します。
2. その中に `extensions/doi-column@anfang886.github.io` というファイルを
   作成します（拡張子は付けません）。ファイルの内容には、このソースディレクトリ
   への絶対パスを記述します。
3. Zotero を終了した状態で、`prefs.js` 内の `extensions.lastAppBuildId` と
   `extensions.lastAppVersion` を空文字列に設定してから Zotero を起動します。

詳しくは [Zotero プラグイン開発ドキュメント](https://www.zotero.org/support/dev/zotero_7_for_developers)
を参照してください。

### 現在の状況

このプラグインを作成したのは、Zotero フォーラムで同様の機能が要望されたものの、
採用されなかったためです。当時は、DOI はランダムに見える長い文字列であり、
並べ替えても意味がないという理由が示されました。しかし実際には、前述のとおり
出版社ごとにまとまるため、当時想定されていた以上に有用です。また、反対意見が
問題にしたのは*並べ替え*でしたが、要望の中心は*表示*でした。列の選択メニューには、
通常は並べ替えに使われない Extra や Attachments もすでに含まれています。

その決定以降、状況は二つ変わりました。第一に、Zotero 8 では DOI がほぼすべての
アイテムタイプのフィールドになりました。そのため、Court、System、Medium、
Loc. in Archive といった、より使用頻度の低いフィールドが選択メニューにある一方で、
DOI がないことは不自然です。第二に、Zotero 9 ではアイテム一覧に「Added By」と
「Modified By」列が追加されました。したがって、新しい列の追加を否定する一貫した
原則があるわけではありません。

将来 Zotero 本体に DOI 列が追加されれば、このプラグインは不要になります。
それが最も望ましい結果です。

### これまでの議論

この要望は Zotero フォーラムで複数回取り上げられています。経緯を確認したい方の
ために、関連するスレッドを掲載します。

- [Unable to locate DOI field](https://forums.zotero.org/discussion/30325/unable-to-locate-doi-field)（2013）— DOI 列が初めて提案され、採用されなかった議論
- [Add columns to view](https://forums.zotero.org/discussion/76014/add-columns-to-view)
- [DOI column in Zotero](https://forums.zotero.org/discussion/119038/doi-column-in-zotero)（2024）
- [Missing option to add DOI field to columns in main window](https://forums.zotero.org/discussion/131362/missing-option-to-add-doi-field-to-columns-in-main-window)
- [Feature Request: Option to display DOI column in central panel](https://forums.zotero.org/discussion/132957/feature-request-option-to-display-doi-column-in-central-panel)（2026）

### ライセンス

MIT
