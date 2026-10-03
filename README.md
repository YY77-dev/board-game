# board-game

Laravel の API バックエンドと Next.js のフロントエンドをまとめたモノレポです。

| フォルダ | 内容 |
|---|---|
| `backend/` | Laravel 13 の API。Docker Compose で動かす |
| `frontend/` | Next.js 16。ホストで `pnpm dev` を実行して動かす |
| `docker/` | backend と nginx のコンテナ設定 |

## 接続先

| サービス | URL | ポートの変え方 |
|---|---|---|
| Laravel API | http://localhost:8000/api/ | 環境変数 `BACKEND_PORT` |
| MySQL | localhost:3307 | 環境変数 `DB_PORT` |
| Next.js | http://localhost:3000 | なし |

MySQL の DB 名とユーザー名は `laravel`、パスワードは `secret` です。root のパスワードは `root` です。どちらも手元の開発専用の値です。

## 作業環境の準備

Windows では Windows 上で、Mac では macOS 上で作業します。どちらも、バックエンドは Docker Desktop で、フロントエンドはホストの Node.js で動かします。

### Windows

PowerShell で、Git、GitHub CLI、Docker Desktop、Node.js を入れます。Node.js は `.tool-versions` と同じバージョンを指定します。

```powershell
winget install --id Git.Git --exact
winget install --id GitHub.cli --exact
winget install --id Docker.DockerDesktop --exact
winget install --id OpenJS.NodeJS.22 --exact --version 22.19.0
```

Docker Desktop は内部で WSL2 を使います。初回の起動で WSL の更新を求められたら、案内に従います。

続けて Git Bash を開き、pnpm を入れて GitHub にログインします。

```sh
# pnpm のバージョンは package.json の packageManager に合わせる
npm install -g pnpm@9.12.1

# GitHub にログインする
gh auth login
```

Windows では次の点に気をつけます。

- この README のコマンドは Git Bash で実行します。PowerShell 5.1 では `&&` やサブシェルが動きません。VS Code のターミナルも、既定のプロファイルを Git Bash にしておくと便利です。
- リポジトリは `C:\board-game` のような短いパスに置きます。深いフォルダに置くと、Windows のパスの長さの上限（260 文字）を超えて、テストなどが動かなくなります。
- リポジトリのフォルダを移動したり名前を変えたりしたら、`frontend` とリポジトリ直下の `node_modules` を消して、`pnpm install` をやり直します。Windows の pnpm は、パッケージへのリンクを絶対パスで作るためです。
- PHP と Composer は Windows には入れません。エディタの補完に使う `backend/vendor` は、コンテナからコピーして作ります。
- Docker は C ドライブのファイルを共有して動くので、Laravel の応答に時間がかかることがあります。

### Mac

Homebrew の公式サイトの手順で入れ、インストーラーが最後に表示するコマンドを実行して PATH を通します。Docker Desktop も公式サイトから入れます。

続けて、ターミナルで次を実行します。

```sh
# asdf、補完用の PHP と Composer、GitHub CLI を入れる
brew install asdf php composer gh

# PHP が 8.6 以降に自動で上がらないように固定する
brew pin php

# asdf の shims を PATH に通す
echo 'export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"' >> ~/.zshrc
source ~/.zshrc

# GitHub にログインする
gh auth login
```

## 初回のセットアップ

Windows では Git Bash で、Mac ではターミナルで実行します。

### 1. リポジトリを取得する

```sh
# Windows では、C ドライブ直下などの短いパスで実行する（Git Bash なら cd /c）
gh repo clone <GitHub のユーザー名>/board-game
cd board-game

# 公開されるコミットのメールアドレスを GitHub の noreply にする
git config user.email "<GitHub の noreply アドレス>"
```

### 2. Node.js を入れる（Mac だけ）

Windows では「作業環境の準備」で入れたので不要です。

```sh
# Node.js 22.19.0 を .tool-versions に従って入れ、pnpm を有効にする
asdf plugin add nodejs
asdf install
corepack enable
asdf reshim nodejs
```

### 3. バックエンドとフロントエンドを準備する

```sh
# フロントエンドの環境変数ファイルを作る
cp frontend/.env.example frontend/.env.local

# バックエンドを起動して、テーブルを作る
docker compose up -d --build
docker compose exec backend php artisan migrate

# フロントエンドの依存パッケージを入れる
cd frontend
pnpm install
```

### 4. エディタの補完用に、ホスト側の backend/vendor を作る

リポジトリ直下で実行します。3. の続きなら、先に `cd ..` で戻ります。

```sh
# Mac
(cd backend && composer install)

# Windows。PHP を入れていないので、コンテナの vendor をコピーする
docker compose cp backend:/app/vendor/. backend/vendor
```

初回の起動では、backend コンテナの中でも `composer install` が自動で実行されます。コンテナの `vendor/` はコンテナ側のボリュームに置かれ、ホスト側の `backend/vendor` とは別物です。ホスト側の `vendor/` は、エディタの補完にだけ使います。

## よく使うコマンド

### 起動と停止

```sh
# バックエンドを起動する
docker compose up -d --build

# フロントエンドを起動する
cd frontend
pnpm dev

# バックエンドを停止する。DB のデータは残る
docker compose down

# DB のデータも含めて消す
docker compose down -v
```

### migrate

```sh
docker compose exec backend php artisan migrate
```

### phpunit

```sh
docker compose exec backend composer test
```

### pnpm test

```sh
cd frontend
pnpm test

# ファイルの変更を監視しながら実行する
pnpm test:watch
```

## そのほかのコマンド

### バックエンド

```sh
# コードの書き方をチェックする。直すときは format
docker compose exec backend composer lint
docker compose exec backend composer format

# PHPStan で静的解析する
docker compose exec backend composer analyse

# Composer のパッケージを追加する
docker compose exec backend composer require パッケージ名

# 補完用に、ホスト側の vendor も更新する。Mac は 1 行目、Windows は 2 行目
(cd backend && composer install)
docker compose cp backend:/app/vendor/. backend/vendor
```

### フロントエンド

```sh
cd frontend
pnpm lint
pnpm type-check
pnpm build
```

### E2E テスト

```sh
# リポジトリ直下で実行する。ブラウザの取得は初回だけ
pnpm install
pnpm exec playwright install chromium
pnpm exec playwright test
```

テストは `e2e/` フォルダに置きます。実行前にフロントエンドとバックエンドを起動しておきます。
