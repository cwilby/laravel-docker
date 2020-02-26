# Laravel Jeeves

A tool to automate new Laravel projects from the CLI.  Create a new Laravel project with minimal Docker config, or extend an existing Laravel project.

## Usage

To clone the latest version of Laravel then add Docker configuration:
```bash
$ yarn start create my-awesome-project
```

To add Docker configuration to an existing project:
```bash
$ yarn start add ./my-awesome-project
```

To enter a list of models and automatically generate Laravel components for each:
```bash
$ yarn start model ./my-awesome-project
```