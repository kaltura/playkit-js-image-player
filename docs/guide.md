# usage guide

- [Getting started](#getting-started)
- [Setup](#setup)
- [Full working example](https://github.com/kaltura/playkit-js-image-player/tree/master/demo)

## Getting started

### Setup

First include `playkit-image-player.js` **after** kaltura-player script in your web page.

```html
  <script src="https://raw.githack.com/kaltura/kaltura-player-js/master/dist/kaltura-ovp-player.js"></script>
  <script src="./playkit-image-player.js"></script>
```

Load an image entry, and add your (optional) configuration

The only configuration image player gets is the Thumbnail API configuration Parameters (relevant only when your load your entry from kaltura cdn)

You can see [here](https://developer.kaltura.com/api-docs/Engage_and_Publish/kaltura-thumbnail-api.html) the full Thumbnail API configuration Parameters options

```js
    const config = {
      targetId: 'player-placeholder',
      provider: {
        partnerId: '<YOUR_PARTNERI_ID>',
      },
      imageSourceOptions: {
          thumbnailAPIParams: {
            // Put here the Thumbnail API configuration Parameters
      }
    };

    const player = KalturaPlayer.setup(config);

    player.loadMedia({ entryId: '1_ktrfo5hl' });
```

### Configuration

You can see the full Thumbnail API configuration Parameters options [here](https://developer.kaltura.com/api-docs/Engage_and_Publish/kaltura-thumbnail-api.html)

## Full working example

You can find Full working example [here](https://github.com/kaltura/playkit-js-image-player/blob/master/demo/index.html)

## Demo

[demo](https://kaltura.github.io/playkit-js-image-player/demo/index.html)