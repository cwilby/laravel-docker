#!/bin/bash

pushd /home/{{PRODUCTION_USER}}/{{APP_NAME}}/{{APP_NAME}}-api
  /usr/bin/docker exec -t {{APP_NAME}}-production-workspace bash -i -c "sqldump"
  rsync -azP storage/* {{BACKUP_USER}}@{{BACKUP_HOST}}:{{APP_NAME}}/storage
  rsync -azP database/sql/db-backup*.sql {{BACKUP_USER}}@{{BACKUP_HOST}}:{{APP_NAME}}/sql
  scp ./.env {{BACKUP_USER}}@{{BACKUP_HOST}}:{{APP_NAME}}/.env
  ssh {{BACKUP_USER}}@{{BACKUP_HOST}} "find {{APP_NAME}}/sql -type f -mtime +7 -name '*.sql' -execdir rm -- '{}' +"
  rm -rf database/sql/db-backup*.sql
popd
