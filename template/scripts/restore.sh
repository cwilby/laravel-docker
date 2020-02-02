#!/bin/bash
mkdir -p /home/$(whoami)/backups/{{APP_NAME}}

if [ -z $1 ]; then
  echo "Specify prod|dev"
  exit;
fi

if [ -z $2 ]; then
  echo "Specify restore directory"
  exit;
fi

echo "Restore started"
pushd $2
  echo "-- Restore env file"
  scp {{APP_NAME}}@{{BACKUP_SSH_HOST}}:backups/.env .env

  latest_backup=$(ssh -t {{APP_NAME}}@{{BACKUP_SSH_HOST}} "ls /home/{{APP_NAME}}/backups/sql | sort -t_ | tail -n1") 2>/dev/null
  latest_backup=${latest_backup%?}
  if [ -f ".docker/percona/docker-entrypoint-initdb.d/$latest_backup" ]; then
    echo "-- Backup exists locally, will restore from local copy"
  else
    echo "-- Download latest database backup from archive"
    scp {{APP_NAME}}@{{BACKUP_SSH_HOST}}:backups/sql/${latest_backup} .docker/percona/docker-entrypoint-initdb.d/${latest_backup}
  fi

  echo "-- Restart and rebuild containers"
  if [ "$1" = "prod" ]; then
    docker-compose -f docker-compose.prod.yml build
    docker-compose -f docker-compose.prod.yml down -v
    docker-compose -f docker-compose.prod.yml up -d
  fi
  if [ "$1" = "dev" ]; then
    docker-compose build
    docker-compose down -v
    docker-compose up -d
  fi
popd

echo "Restore finished"
echo "Run the following command after app is up and running again"
echo "rm -rf .docker/percona/docker-entrypoint-initdb.d/db-backup-*.sql"
