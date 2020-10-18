# shared-ui

![App Version](https://img.shields.io/badge/version-0.0.0-green.svg)
![Bob Version](https://img.shields.io/badge/bob_version-0.14.5-yellow.svg)
![React Native Version](https://img.shields.io/badge/react_native-0.62.2-blue.svg)

Core UI package for the web and mobile versions of all other packages that use it. Developed using [`@react-native-community/bob`](https://github.com/react-native-community/bob)

## Development

### Bob configuration

The configuration is found in [`package.json`](./package.json), under `@react-native-community/bob` property

### Project structure

```bash
├─ lib              # Generated once development is done. This is used by all other packages
└─ src              # Development directory
  └─ index.tsx      # All packages are exported here
```
