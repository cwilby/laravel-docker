#!/bin/bash
source /home/{{APP_NAME}}/api/.env

pushd /home/{{APP_NAME}}/api
  /usr/bin/docker exec -t {{APP_NAME}}-production-workspace bash -i -c "sqldump"
  scp ./.env {{APP_NAME}}@{{BACKUP_SSH_HOST}}:backups/.env
  rm -rf database/sql/db-backup*.sql
  ssh {{APP_NAME}}@{{BACKUP_SSH_HOST}} "find backups/sql -type f -mtime +7 -name '*.sql' -execdir rm -- '{}' +"
popd
