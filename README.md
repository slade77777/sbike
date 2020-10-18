# One-H Prototype

Prototype for the 1H Prototype. This project is set up using the [Yarn workspaces](https://github.com/jamiebuilds/rfcs-1/blob/workspaces/accepted/0000-workspaces.md) feature, maintaining the various prototypes (called packages) in the same repo. This allows for these projects to share common components, such as utility methods, UI components and API calls.

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
│ └─ mock.tsx       # Contains the mocks for `components-library`. Explained in 1.
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

> 1 - Since we do not want to test the components inside the `components-library` outside its package, i.e. since we do not want to test components that are found in `components-library` outside this package, we mock mock the libraries for use inside tests.

### Packages

The packages involved in the project are found in the [`packages`](./packages/) directory and are as follows:

- [`agent-business-logic`](./packages/agent-business-logic): Contains the business logic shared across the `agent-web` and the `agent-mobile` packages.

- [`agent-mobile`](./packages/agent-mobile): Contains the mobile application for agents.

- [`agent-web`](./packages/agent-web): Contains the web application for agents.

- [`components-library`](./packages/components-library): Contains the UI componennt library that is shared across both mobile and web versions of either the agent or the transaction.

- [`shared-logic`](./packages/shared-logic): Contains the business logic shared across `transaction-web` and `transaction-mobile` packages.

- [`transaction-mobile`](./packages/transaction-mobile): Contains the mobile application for transactions.

- [`transaction-web`](./packages/transaction-web): Contains the web application for transactions.

### Common libraries

As a way to utilize the full power of Yarn workspaces, certain packages have been moved to the project root and are shared across the entire monorepository. There are also configurations such as a root `tsconfig` for Typescript configuration (this is inherited by most packages and certain details are included)
