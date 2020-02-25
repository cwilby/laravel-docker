FROM php:7.4-fpm-alpine

ARG APP_DEBUG=true
ENV PHP_OPCACHE_ENABLE="0"
ENV PHP_OPCACHE_REVALIDATE_FREQUENCY="0"
ENV PHP_OPCACHE_VALIDATE_TIMESTAMPS="0"
ENV PHP_OPCACHE_MAX_ACCELERATED_FILES="10000"
ENV PHP_OPCACHE_MEMORY_CONSUMPTION="192"
ENV PHP_OPCACHE_MAX_WASTED_PERCENTAGE="10"
ENV PHP_XDEBUG_DEFAULT_ENABLE="1"
ENV PHP_XDEBUG_REMOTE_HOST="host.docker.internal"
ENV PHP_XDEBUG_REMOTE_CONNECT_BACK="1"
ENV PHP_XDEBUG_REMOTE_PORT="9001"
ENV PHP_XDEBUG_IDE_KEY="VSCODE"
ENV PHP_XDEBUG_REMOTE_AUTOSTART="1"
ENV PHP_XDEBUG_REMOTE_ENABLE="1"
ENV PHP_XDEBUG_PROFILER_ENABLE="0"
ENV PHP_XDEBUG_PROFILER_OUTPUT_DIR="~/xdebug/vscode/tmp/profiling"
ENV PHP_XDEBUG_PROFILE_ENABLE_TRIGGER="0"

RUN apk add --update \
  curl \
  wget \
  g++ \
  zlib-dev \
  libmcrypt-dev \
  libzip-dev \
  make \
  jpegoptim \
  icu-dev \
  jpeg-dev \
  libpng-dev \
  openssl-dev \
  optipng \
  pngquant \
  gifsicle \
  && docker-php-ext-install pdo_mysql opcache mysqli \
  && docker-php-ext-configure gd \
  && docker-php-ext-install gd \
  && docker-php-ext-configure intl \
  && docker-php-ext-install intl \
  && docker-php-ext-configure zip \
  && docker-php-ext-install zip \
  && pecl channel-update pecl.php.net \
  && echo http://dl-2.alpinelinux.org/alpine/edge/community/ >> /etc/apk/repositories \
  && apk add --no-cache --update --virtual buildDeps autoconf shadow \
  && apk add libzip-dev zip unzip imagemagick imagemagick-dev \
  && php -m | grep -q 'zip' \
  && pecl install -o -f redis imagick mcrypt-1.0.3 \
  && pecl install mongodb bcmath opcache \
  && docker-php-ext-enable imagick mcrypt redis mongodb \
  && usermod -u 1000 www-data

COPY ./xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

RUN if [ "${APP_DEBUG}" = "true" ]; then \
    pecl install xdebug && docker-php-ext-enable xdebug \
; else \
    rm /usr/local/etc/php/conf.d/xdebug.ini \
; fi

COPY ./opcache.ini /usr/local/etc/php/conf.d/opcache.ini
COPY ./laravel.ini /usr/local/etc/php/conf.d
COPY ./xlaravel.pool.conf /usr/local/etc/php-fpm.d/

WORKDIR /var/www

USER www-data

CMD ["php-fpm"]

EXPOSE 9000
