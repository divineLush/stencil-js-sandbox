import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-sandbox',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    // www type spits out a full project which you could deploy to a static host
    // useful when entire frontend is build from stencil components
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  // bundles is not added by default
  // allows to define how components are bundled together
  // dependencies analysis etc.
  // allows to load components only where they are attached to DOM
  // bundles: []
};
