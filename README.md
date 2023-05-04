# PlayKit JS Image Player - Image Player plugin for the [PlayKit JS Player]

[![Build Status](https://github.com/kaltura/playkit-js-image-player/actions/workflows/run_canary_full_flow.yaml/badge.svg)](https://github.com/kaltura/playkit-js-image-player/actions/workflows/run_canary_full_flow.yaml)
[![](https://img.shields.io/npm/v/@playkit-js/image-player/latest.svg)](https://www.npmjs.com/package/@playkit-js/image-player)
[![](https://img.shields.io/npm/v/@playkit-js/image-player/canary.svg)](https://www.npmjs.com/package/@playkit-js/image-player/v/canary)

playkit-js-image-player is a [kaltura player] engine enabling [kaltura player] to play an image

playkit-js-image-player is written in [ECMAScript6] (`*.js`) and [TypeScript] (`*.ts`) (strongly typed superset of ES6), 
and transpiled in ECMAScript5 using [Babel](https://babeljs.io/) and the [TypeScript compiler].

[Webpack] is used to build the distro bundle and serve the local development environment.

[kaltura player]: https://github.com/kaltura/kaltura-player-js.
[ecmascript6]: https://github.com/ericdouglas/ES6-Learning#articles--tutorials
[typescript]: https://www.typescriptlang.org/
[typescript compiler]: https://www.typescriptlang.org/docs/handbook/compiler-options.html
[webpack]: https://webpack.js.org/

## Features

There are two modes an image playback can be played in the Kaltura player

image can be played as one of the following modes

- **Non-Durational Image**
- **Durational image**

Non-Durational Images will be displayed by the player without a seek bar and the standard player controls (except the full-screen button)

Durational Images will be played by the player as if it is a video,
with seek bar and all standard player controls
In fact it will behave just like a video for everything

If the image is played as part of a playlist, it will automatically play as a **Durational Image** with a default duration of 5 seconds

The image mode will be determined according to the duration configured with the entry
    
## Getting started with development

```sh
# First, checkout the repository and install the required dependencies
git clone https://github.com/kaltura/playkit-js-image-player.git

# Navigate to the repo dir
cd playkit-js-image-player

# Run dev-server for demo page (recompiles on file-watch, and write to actual dist fs artifacts)
npm run dev

# Before submitting a PR - Run the pre commit command
npm run pre:commit

# this command will run:

# 1. types check
# 2. lint check
# 3. generate/update types
# 4. generate/update docs
```

The dev server will host files on port 8000. Once started, the demo can be found running at http://localhost:8000/.

Before submitting a PR, please see our [contribution guidelines](CONTRIBUTING.md).


### Linter (ESlint)

Run linter:

```
npm run lint:check
```

Run linter with auto-fix mode:

```
npm run lint:fix
```

### Formatting Code

Run prettier to format code

```
npm run prettier:fix
```

### Type Check

Run type-check to verify TypeScript types

```
npm run types:check
```

### Automated tests (Mocha/Karma)

Run all tests at once:

```
npm test
```

Run unit tests in watch mode:

```
npm run test:watch
```

## Design

An overview of this project's design, can be found [here](https://kaltura.atlassian.net/wiki/spaces/PROD/pages/3554412657/Side+Panel+Manager+-+Design+Document).

## API docs

[API docs](https://kaltura.github.io/playkit-js-image-player/docs/api/index.html)

## Usage guide

[usage guide](./docs/guide.md)

## Demo

[https://kaltura.github.io/playkit-js-image-player/demo/index.html](https://kaltura.github.io/playkit-js-image-player/demo/index.html)


## Compatibility

playkit-js-image-player is supported on:

- Chrome 39+ for Android
- Chrome 39+ for Desktop
- Firefox 41+ for Android
- Firefox 42+ for Desktop
- IE11 for Windows 8.1+
- Edge for Windows 10+
- Safari 8+ for MacOS 10.10+
- Safari for ipadOS 13+

## License

playkit-js-image-player is released under [Apache 2.0 License](LICENSE)
