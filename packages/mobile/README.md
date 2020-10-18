# transaction-mobile

![App Version](https://img.shields.io/badge/version-0.0.1-green.svg)
![React Version](https://img.shields.io/badge/react-16.13.1-blue.svg)
![React Native Version](https://img.shields.io/badge/react_native-0.62.2-black.svg)

Mobile application for transactions, developed using React Native. UI components are from the [`components-library`](../components-library).

## Development

- Follow the steps for React Native Environment setup, found [here](https://reactnative.dev/docs/environment-setup).

- Ensure that the packages in the component library is compiled. Visit the `components-library` and run the following:

  ```bash
  $ yarn prepare
  ```

### iOS development.

- For iOS developmennt, MacOS is required to run this. XCode is also required to set the project up.
- Install all pods. To do this, run the following commands

  ```bash
  $ cd ios
  $ pod install
  ```

- Start the metro server.

  ```bash
  $ yarn start
  ```

- Start the iOS development server by opening another terminal.

  ```bash
  $ yarn ios
  ```

### Android development

For android development, a similar approach for iOS is used. Start the metro server, open another terminal, and then run the following:

```bash
$ yarn android
```

## Testing

For unit tests, simply run the following:

```
$ yarn test
```

> All tests reside in the `tests` folder

## Folder Structure

```bash
├─ android
├─ ios
├─ src
│    ├─ components  # All common components used in this package
│    ├─ redux
│    ├─ screens
│    └─ App.tsx     # Application start point
├─ app.json
├─ babel.config.js
└─ index.js         # Application bootstrapping point
```
