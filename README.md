# S-BIKE

This project is set up using the [Yarn workspaces](https://github.com/jamiebuilds/rfcs-1/blob/workspaces/accepted/0000-workspaces.md) feature, maintaining the various prototypes (called packages) in the same repo. This allows for these projects to share common components, such as utility methods, UI components and API calls.

## Setup

- To begin, ensure that yarn is globally installed on the computer you are working on. If you have NPM installed, simply run `npm install --global yarn`.

- Clone the repository from the Gitlab account.

- Copy the `.env.example` file and paste it, renaming the copied version to `.env`. this can be done on UNIX-based systems by running `cp .env.example .env`

- Insert the correct environment variables as described

- Navigate into the directory and run `yarn install`. This installs the dependencies that are shared across the various packages, as well as the packages that are specific to each package.

- Visit each of the individual packages and run `yarn prepare`. You can optionally run `yarn prepare` in the project root to achieve the same result. Read [this section](./CONTRIBUTING.md#additional-comments) for more details.

## Development

### Folder structure

```bash
├─ config
│ └─ mock.tsx       # Contains the mocks for `shared-ui`. Explained in 1.
│
├─ packages         # Explained below
├─ .env.example     # Sample Environment variables
├─ .eslintignore
├─ .eslintrc
├─ .gitignore
├─ .prettierrc.js
├─ package.json     # Global packages
└─ tsconfig.json    # Global Typescript configuration
```

### Packages

The packages involved in the project are found in the [`packages`](./packages/) directory and are as follows:

- [`shared-logic`](./packages/shared-logic): Contains the business logic shared across the `web` and the `mobile` packages.

- [`mobile`](./packages/mobile): Contains the mobile application.

- [`web`](./packages/web): Contains the web application.

- [`shared-ui`](./packages/shared-ui): Contains the UI component library that is shared across both mobile and web.

