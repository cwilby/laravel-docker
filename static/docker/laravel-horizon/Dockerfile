FROM php:7.4-alpine

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
  git \
  build-base \
  libmemcached-dev \
  libmcrypt-dev \
  libxml2-dev \
  zlib-dev \
  autoconf \
  cyrus-sasl-dev \
  libgsasl-dev \
  supervisor \
  oniguruma-dev\
  procps
  
RUN docker-php-ext-install mysqli mbstring pdo pdo_mysql tokenizer xml pcntl bcmath

RUN pecl channel-update pecl.php.net && pecl install memcached mcrypt-1.0.1 && docker-php-ext-enable memcached

ARG PUID=1000
ENV PUID ${PUID}
ARG PGID=1000
ENV PGID ${PGID}

RUN addgroup --gid ${PGID} horizon && \
    adduser -D -G horizon -u ${PUID} horizon

COPY ./xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

RUN if [ "${APP_DEBUG}" = "true" ]; then \
    pecl install xdebug && docker-php-ext-enable xdebug \
; else \
    rm /usr/local/etc/php/conf.d/xdebug.ini \
; fi

COPY ./opcache.ini /usr/local/etc/php/conf.d/opcache.ini

WORKDIR /usr/src

RUN rm /var/cache/apk/* && mkdir -p /var/www

COPY supervisord.conf /etc/supervisord.conf

ENTRYPOINT ["/usr/bin/supervisord", "-n", "-c",  "/etc/supervisord.conf"]

WORKDIR /etc/supervisor/conf.d/
