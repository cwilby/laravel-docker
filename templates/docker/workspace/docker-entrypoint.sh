#!/bin/bash
set -e

while ! mysqladmin ping -h"${DB_HOST}" -u"root" -p"${MYSQL_ROOT_PASSWORD}" --silent; do
  sleep 1
done

if [ -f /var/www/database/sql/restore.sql ]; then
  mysql -h ${DB_HOST} -u root -p${MYSQL_ROOT_PASSWORD} {{APP_NAME}} < /var/www/database/sql/restore.sql
fi

pushd /var/www
  if [ "${APP_ENV}" = "production" ]; then
    php artisan optimize:clear || true
  fi

  if [ "${APP_ENV}" = "production" ]; then
    sed -i 's|APP_DEBUG=true|APP_DEBUG=false|g' /var/www/.env
    composer install --no-plugins --no-scripts --no-dev
  else
    composer install --no-plugins --no-scripts
  fi

  if [ -z "${APP_KEY}" ]; then
    php artisan key:generate --force
    
    composer require laravel/ui

    composer require laravel/horizon
    php artisan vendor:publish --provider="Laravel\Horizon\HorizonServiceProvider"
    php artisan horizon:install
  fi

  php artisan migrate --seed --force

  if [ "${APP_ENV}" = "production" ]; then
    php artisan optimize || true
  fi
popd

/bin/bash
