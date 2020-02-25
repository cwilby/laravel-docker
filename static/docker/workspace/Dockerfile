FROM phusion/baseimage:master

ARG PUID=1000
ENV PUID ${PUID}
ARG PGID=1000
ENV PGID ${PGID}
ARG NODE_VERSION=node
ENV NODE_VERSION node
ENV NVM_DIR /home/workspace/.nvm
ENV DEBIAN_FRONTEND noninteractive
RUN locale-gen en_US.UTF-8
ENV LANGUAGE=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8
ENV LC_CTYPE=en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV TERM xterm
ENV PACKAGIST_URL=https://packagist.org
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
ENV PATH $PATH:/home/workspace/.node-bin

RUN apt-get update -yq \
    && apt-get install -y software-properties-common \
    && add-apt-repository -y ppa:ondrej/php \
    && apt-get upgrade -yq -o Dpkg::Options::="--force-confdef" \
    && apt-get install -yq -o Dpkg::Options::="--force-confdef" --allow-change-held-packages \
        php7.4-cli \
        php7.4-common \
        php7.4-curl \
        php7.4-intl \
        php7.4-json \
        php7.4-xml \
        php7.4-mbstring \
        php7.4-mysql \
        php7.4-pgsql \
        php7.4-sqlite \
        php7.4-sqlite3 \
        php7.4-zip \
        php7.4-bcmath \
        php7.4-memcached \
        php7.4-gd \
        php7.4-dev \
        pkg-config \
        libcurl4-openssl-dev \
        libedit-dev \
        libssl-dev \
        libxml2-dev \
        xz-utils \
        libsqlite3-dev \
        sqlite3 \
        git \
        curl \
        vim \
        nano \
        mysql-client \
        php-redis \
        jpegoptim \
        optipng \
        pngquant \
        gifsicle \
        imagemagick \
        php-imagick \
        inetutils-ping \
        apt-utils \
        libzip-dev \
        zip \
        unzip \
        nasm \
    && (curl -s http://getcomposer.org/installer | php) \
    && echo "export PATH=${PATH}:/var/www/vendor/bin" >> ~/.bashrc \
    && mv composer.phar /usr/local/bin/composer

COPY ./composer.json /home/workspace/.composer/composer.json

RUN . ~/.bashrc \
    && apt-get update -yqq \
    && pecl channel-update pecl.php.net \
    && groupadd -g ${PGID} workspace \
    && useradd -u ${PUID} -g workspace -m workspace -G docker_env \
    && usermod -p "*" workspace -s /bin/bash \
    && ln -snf /usr/share/zoneinfo/UTC /etc/localtime && echo UTC > /etc/timezone \
    && chown -R workspace:workspace /home/workspace \
    && echo "" >> ~/.bashrc && echo 'export PATH="$HOME/.composer/vendor/bin:$PATH"' >> ~/.bashrc

##

USER workspace

RUN composer global install \
    && echo "" >> ~/.bashrc \
    && echo 'export PATH="~/.composer/vendor/bin:$PATH"' >> ~/.bashrc \
    && echo "" >> ~/.bashrc && echo 'export PATH="/var/www/vendor/bin:$PATH"' >> ~/.bashrc \
    && mkdir -p $NVM_DIR \
    && curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install node \
    && nvm use node \
    && nvm alias node \
    && ln -s `npm bin --global` /home/workspace/.node-bin \
    && echo "" >> ~/.bashrc \
    && echo "# Load Custom Aliases" >> ~/.bashrc \
    && echo "source ~/aliases.sh" >> ~/.bashrc \
    && echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm' >> ~/.bashrc

##

USER root

COPY ./aliases.sh /root/aliases.sh
COPY ./aliases.sh /home/workspace/aliases.sh
COPY ./crontab /etc/cron.d
COPY ./xdebug.ini /etc/php/7.4/cli/conf.d/xdebug.ini

RUN if [ "${APP_DEBUG}" = "true" ]; then \
    apt-get install -y php7.4-xdebug && \
    sed -i 's/^;//g' /etc/php/7.4/cli/conf.d/20-xdebug.ini \
; else \
    rm /etc/php/7.4/cli/conf.d/xdebug.ini \
; fi

RUN chmod -R 644 /etc/cron.d \
    && pecl install mongodb \
    && echo "extension=mongodb.so" >> /etc/php/7.4/mods-available/mongodb.ini \
    && ln -s /etc/php/7.4/mods-available/mongodb.ini /etc/php/7.4/cli/conf.d/30-mongodb.ini \
    && echo "" >> ~/.bashrc \
    && echo 'export NVM_DIR="/home/workspace/.nvm"' >> ~/.bashrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm' >> ~/.bashrc \
    && find  $NVM_DIR -type f -name node -exec ln -s {} /usr/local/bin/node \; \
    && NODE_MODS_DIR="$NVM_DIR/versions/node/$(node -v)/lib/node_modules" \
    && ln -s $NODE_MODS_DIR/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -s $NODE_MODS_DIR/npm/bin/npx-cli.js /usr/local/bin/npx \
    && ln -s $NODE_MODS_DIR/vue-cli/bin/vue /usr/local/bin/vue \
    && ln -s $NODE_MODS_DIR/vue-cli/bin/vue-init /usr/local/bin/vue-init \
    && ln -s $NODE_MODS_DIR/vue-cli/bin/vue-list /usr/local/bin/vue-list \
    && sed -i 's/\r//' /root/aliases.sh \
    && sed -i 's/\r//' /home/workspace/aliases.sh \
    && chown workspace:workspace /home/workspace/aliases.sh \
    && echo "" >> ~/.bashrc \
    && echo "# Load Custom Aliases" >> ~/.bashrc \
    && echo "source ~/aliases.sh" >> ~/.bashrc \
	&& echo "" >> ~/.bashrc \
    && exec bash \
    && . ~/.bashrc \
    && npm install -g svgo \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && rm /var/log/lastlog /var/log/faillog

ADD docker-entrypoint.sh /home/root/docker-entrypoint.sh

COPY ./opcache.ini /etc/php/7.4/cli/conf.d/opcache.ini

WORKDIR /var/www

##

USER workspace
