#!/bin/bash
mkdir -p /home/{{PRODUCTION_USER}}/backups/{{APP_NAME}}

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
  scp {{BACKUP_USER}}@{{BACKUP_HOST}}:{{APP_NAME}}/.env .env

  latest_backup=$(ssh -t {{BACKUP_USER}}@{{BACKUP_HOST}} "ls /home/{{BACKUP_USER}}/{{APP_NAME}}/sql | sort -t_ | tail -n1") 2>/dev/null
  latest_backup=${latest_backup%?}
  
  if [ -f "docker/percona/docker-entrypoint-initdb.d/$latest_backup" ]; then
    echo "-- Backup exists locally, will restore from local copy"
  else
    echo "-- Download latest database backup from archive"
    scp {{BACKUP_USER}}@{{BACKUP_HOST}}:{{APP_NAME}}/sql/${latest_backup} docker/percona/docker-entrypoint-initdb.d/${latest_backup}
  fi

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
echo "rm -rf docker/percona/docker-entrypoint-initdb.d/db-backup-*.sql"
