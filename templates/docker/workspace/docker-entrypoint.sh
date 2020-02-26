#!/bin/bash
set -e

function flushAll() {
  if [ "${APP_ENV}" = "production" ]; then
    php artisan clear-compiled || true
    php artisan cache:clear || true
    php artisan config:clear || true
    php artisan clockwork:clean || true
    php artisan event:clear || true
    php artisan optimize:clear || true
    php artisan route:clear || true
    php artisan view:clear || true
    php artisan config:cache || true
    php artisan event:cache || true
    php artisan route:cache || true
    php artisan view:cache || true
  fi
}

if [ ! -z "${PACKAGIST_URL}" ]; then
  echo 'setting packagist url'
  composer config -g repos.packagist composer ${PACKAGIST_URL}
fi

while ! mysqladmin ping -h"${DB_HOST}" -u"root" -p"${ROOT_PASSWORD}" --silent; do
  sleep 1
done

if [ -f /var/www/database/sql/restore.sql ]; then
  mysql -h ${DB_HOST} -u root -p${ROOT_PASSWORD} {{APP_NAME}} < /var/www/database/sql/restore.sql
fi

pushd /var/www
  flushAll

  if [ "${APP_ENV}" = "production" ]; then
    sed -i 's|APP_DEBUG=true|APP_DEBUG=false|g' /var/www/.env
    composer install --no-plugins --no-scripts --no-dev
  else
    composer install --no-plugins --no-scripts
    composer update
  fi

  if [ -z "${APP_KEY}" ]; then
    php artisan key:generate --force

    composer require tymon/jwt-auth:1.0.0-rc.5
    php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
    php artisan jwt:secret --force

    composer require fruitcake/laravel-cors
    php artisan vendor:publish --tag="cors"

    composer require laravel/horizon
    php artisan vendor:publish --provider="Laravel\Horizon\HorizonServiceProvider"
    php artisan horizon:install

    composer require itsgoingd/clockwork

    composer require owen-it/laravel-auditing
    php artisan vendor:publish --provider "OwenIt\Auditing\AuditingServiceProvider" --tag="config"
    php artisan vendor:publish --provider "OwenIt\Auditing\AuditingServiceProvider" --tag="migrations"
  fi

  php artisan migrate --seed --force
  if [ "${APP_ENV}" != "production" ]; then
    php artisan migrate --env=testing --seed
  fi

  flushAll
popd

/bin/bash
