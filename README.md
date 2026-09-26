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

Windows では WSL2 の Ubuntu 26.04 LTS の中で、Mac では macOS 上で作業します。どちらも Homebrew、asdf、GitHub CLI を使うので、準備が済めば手順は共通です。

### Windows: WSL2 の準備

PowerShell で Ubuntu を入れます。

```powershell
wsl --install Ubuntu-26.04
```

続けて、次の設定をします。

- Docker Desktop の設定で、Resources の WSL integration から Ubuntu-26.04 を有効にします。
- VS Code に WSL 拡張を入れます。Ubuntu のターミナルで `code .` を実行すると、Linux 側のフォルダを開けます。
- リポジトリは Ubuntu のホームディレクトリ以下に置きます。C ドライブに置くと、動作が遅くなります。

Ubuntu のターミナルで Homebrew を入れます。

```sh
sudo apt-get update
sudo apt-get install -y build-essential procps curl file git
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bashrc
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```

### Mac: Homebrew の準備

Homebrew の公式サイトの手順で入れ、インストーラーが最後に表示するコマンドを実行して PATH を通します。

### 共通: ツールの準備

Ubuntu と Mac のターミナルで、同じコマンドを実行します。シェルの設定ファイルは、Ubuntu では `~/.bashrc`、Mac では `~/.zshrc` です。

```sh
# asdf、補完用の PHP と Composer、GitHub CLI を入れる
brew install asdf php composer gh

# PHP が 8.6 以降に自動で上がらないように固定する
brew pin php

# asdf の shims を PATH に通す。Mac では ~/.zshrc に書く
echo 'export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"' >> ~/.bashrc
source ~/.bashrc

# GitHub にログインする
gh auth login
```

## 初回のセットアップ

```sh
# リポジトリを取得する
gh repo clone <GitHub のユーザー名>/board-game
cd board-game

# 公開されるコミットのメールアドレスを GitHub の noreply にする
git config user.email "<GitHub の noreply アドレス>"

# Node.js 22.19.0 を .tool-versions に従って入れ、pnpm を有効にする
asdf plugin add nodejs
asdf install
corepack enable
asdf reshim nodejs

# フロントエンドの環境変数ファイルを作る
cp frontend/.env.example frontend/.env.local

# エディタの補完用に、ホスト側の backend/vendor を作る
(cd backend && composer install)

# バックエンドを起動して、テーブルを作る
docker compose up -d --build
docker compose exec backend php artisan migrate

# フロントエンドの依存パッケージを入れる
cd frontend
pnpm install
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

# Composer のパッケージを追加する。補完用にホスト側でも入れ直す
docker compose exec backend composer require パッケージ名
(cd backend && composer install)
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
