const path = require('path');
const fs = require('fs');
/* eslint-disable import/no-extraneous-dependencies */
const escape = require('escape-string-regexp');
const blacklist = require('metro-config/src/defaults/blacklist');
/* eslint-enable import/no-extraneous-dependencies */

const root = path.resolve(__dirname, '../..');
const packages = path.resolve(root, 'packages');

const workspaces = fs
  // List all packages under `packages/`
  .readdirSync(packages)
  // Ignore hidden files such as .DS_Store
  .filter((p) => !p.startsWith('.'))
  .map((p) => path.join(packages, p));

// Get the list of dependencies for all packages in the monorepo
const modules = []
  .concat(
    ...workspaces.map((it) => {
      const pak = JSON.parse(
        fs.readFileSync(path.join(it, 'package.json'), 'utf8'),
      );

      // We need to make sure that only one version is loaded for peerDependencies
      // So we blacklist them at the root, and alias them to the versions in example's node_modules
      return pak.peerDependencies ? Object.keys(pak.peerDependencies) : [];
    }),
  )
  .sort()
  .filter(
    (m, i, self) =>
      // Remove duplicates and package names of the packages in the monorepo
      self.lastIndexOf(m) === i,
  );

module.exports = {
  projectRoot: __dirname,

  // We need to watch the root of the monorepo
  // This lets Metro find the monorepo packages automatically using haste
  // This also lets us import modules from monorepo root
  watchFolders: [root],

  resolver: {
    // We need to blacklist the peerDependencies we've collected in packages' node_modules
    blacklistRE: blacklist(
      [].concat(
        ...workspaces.map((it) =>
          modules.map(
            (m) =>
              new RegExp(`^${escape(path.join(it, 'node_modules', m))}\\/.*$`),
          ),
        ),
      ),
    ),

    // When we import a package from the monorepo, metro won't be able to find their deps
    // We need to specify them in `extraNodeModules` to tell metro where to find them
    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(root, 'node_modules', name);
      return acc;
    }, {}),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
