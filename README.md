# Laravel Docker

A CLI tool to automate adding Docker to a new or existing Laravel project.

## Usage

### Create a new Laravel project

```bash
$ yarn start create my-awesome-project
```

### Add Docker to an existing Laravel project

To add Docker configuration to an existing project:
```bash
$ yarn start add ./my-awesome-project
```

## Integrations

### CircleCI

* Create a deploy private/public key: `ssh-keygen -m PEM -t rsa -C "me@gmail.com"`
* Add public key to `~/.ssh/authorized_keys` on production server.
* Add private key to CircleCI project under SSH Permissions.
* Add fingerprint to `.circleci/config.yml` in the `deploy_production` job.