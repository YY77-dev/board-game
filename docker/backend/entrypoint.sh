#!/bin/sh
set -e

cd /app

# storage/ と bootstrap/cache/ を作り、php-fpm から書き込めるようにする
mkdir -p \
  storage/app/public \
  storage/framework/cache/data \
  storage/framework/sessions \
  storage/framework/views \
  storage/logs \
  bootstrap/cache
chmod -R 777 storage bootstrap/cache

# .env が無ければ .env.example をコピーする
if [ ! -f .env ]; then
  cp .env.example .env
fi

# vendor は匿名ボリュームなので、初回は空になる。空なら依存パッケージを入れる
if [ ! -f vendor/autoload.php ]; then
  composer install --no-interaction --prefer-dist
fi

# APP_KEY が空なら生成する
if ! grep -Eq '^APP_KEY=.+' .env; then
  php artisan key:generate --force
fi

exec php-fpm
