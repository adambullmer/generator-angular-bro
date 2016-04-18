# Generator Angular-Bro
Angular app scaffolding and build chain

## Installation

First, install [Yeoman](http://yeoman.io) and generator-angular-bro using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-angular-bro
```

Then generate your new project:

```bash
yo angular-bro
```

## Commands
Below is a list of commands and a brief description of what they do

- `yo angular-bro` Shows a wizard for generating a new generator
- `yo angular-bro:module <name>` Generates a `module.js` file inside the module folder `<name>`
- `yo angular-bro:template <name>` Generates a `template.html` file inside the module folder `<name>`
- `yo angular-bro:controller <name>` Generates a `controller.js` file in the module folder `<name>` along with the following things.
  - `module.js` file
  	- Adds module imports and controller defintion on the module
- `yo angular-bro:directive <name>`
  - `template.html` for this module
    - Template is included in the directive file
  - `controller.js` for this module
  - `module.js` file
    - Adds the controller and directive definitions on the module
- `yo angular-bro:factory <name>` Generates a `factory.js` file in the module folder `<name>` along with the following things.
  - `module.js` file
    - Adds the factory definitions on the module
- `yo angular-bro:provider <name>` Generates a `provider.js` file in the module folder `<name>` along with the following things.
  - `module.js` file
    - Adds the provider definitions on the module
- `yo angular-bro:service <name>`Generates a `service.js` file in the module folder `<name>` along with the following things.
  - `module.js` file
    - Adds the service definitions on the module
- `yo angular-bro:state <name>` Generates a `state.js` file in the module folder `<name>` along with the following things.
  - `template.html` for this module
    - Template is included in the state file
  - `module.js` file
    - Adds the state and controller definitions on the module
- `yo angular-bro:server` Generates a mock server in the root of your project
  - Installs required npm dependencies. These are only dev dependencies and will not be included in the final application
- `yo angular-bro:mock <path/to/url>` Generates a mock for the relative path `<path/to/url>`
  - If you have a common api base path, you should omit it in the above command, and add it to the resulting file
    - e.x. `/api/v1/users` should just be `/users` in the above command
- `yo angular-bro:proxy <path/to/url> <http://domain.com/path/to/proxy>` Generates a server proxy to send requests from `<path/to/url>` to `<http://domain.com/path/to/proxy>`
  - If you have a common api base path, you should omit it in the above command, and add it to the resulting file
    - e.x. `/api/v1/users` should just be `/users` in the above command


## Project Structure

```
.
├── app/
│   ├── app.js
│   ├── router.js
│   └── project-name.js
├── tests/
│   ├── e2e.js
│   ├── helpers
│   └── unit/
│       ├──
├── .jscsrc
├── bower.json
├── Brocfile.js
├── circle.yml
├── Gruntfile.js
├── index.html
├── karma.conf.js
└── package.json
```

### Module-Related Generation
Angular-Bro has adopted a pod structure, or feature based structure, for better generation of files and tests.
Each file is a generic name describing it's purpose, inside of it's pod or feature name.

```
.
├── app/
│   ├── a-module-name/
│   │   └── module.js
│   ├── a-template-name/
│   │   └── template.html
│   ├── example-controller/
│   │   ├── controller.js
│   │   └── module.js
│   ├── example-directive/
│   │   ├── controller.js
│   │   ├── directive.js
│   │   ├── module.js
│   │   └── template.html
│   ├── example-factory/
│   │   ├── factory.js
│   │   └── module.js
│   ├── example-provider/
│   │   ├── provider.js
│   │   └── module.js
│   ├── example-service/
│   │   ├── service.js
│   │   └── module.js
│   └── example-state/
│       ├── controller.js
│       ├── module.js
│       ├── state.js
│       └── template.html
└── tests/
    └── unit/
        ├── a-module-name/
        └── example-controller/

```

### Server-Related Generation
Example directory sirectory structure of server-related generated files

```
.
├── app/
└── server/
    ├── mocks/
    │   ├── my-mock.js
    │   └── my-other-mock.js
    ├── proxies/
    │   ├── my-other-proxy.js
    │   └── my-proxy.js
    └── index.js
```

