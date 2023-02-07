# Usage guide

- [Getting started](#getting-started)
  - [Setup](#setup)
  - [Non Durational Image](#Non-Durational-Image)
  - [Durational Image](#Durational-Image)
  - [Events](#Image-Events)
  - [Configuration](#Configuration)
- [Full working example](https://github.com/kaltura/playkit-js-image-player/tree/master/demo)

[comment]: <> ([PKSourcesConfigObject]&#40;https://github.com/kaltura/playkit-js/blob/master/docs/configuration.md#type-pksourcesconfigobject&#41;)
## Getting started

There are two modes an image playback can be played in the player

image can be played as one of the following modes

- **Non-Durational Image**
- **Durational image**

Non-Durational Image will be displayed by the player without a seek bar and without the standard player controls (except full screen button)

Durational Image will be played by the player as if it is a video, 
with a seek bar and all standard player controls (except volume)
In fact it will behave just like a video for everything

If the image is played as part of a playlist, it will automatically play as a **Durational Image** with a default duration of 5 seconds

The image mode will be determined according to the duration configured with the entry

> Note: The duration is part of [PKSourcesConfigObject](https://github.com/kaltura/playkit-js/blob/master/docs/configuration.md#type-pksourcesconfigobject&#41;) which is come from the kaltura backend unless you use the setMedia API

### Setup

First include `playkit-image-player.js` **after** kaltura-player script in your web page.

```html
  <script src="https://raw.githack.com/kaltura/kaltura-player-js/master/dist/kaltura-ovp-player.js"></script>
  <script src="./playkit-image-player.js"></script>
```

### Non Durational Image
in order to play an image entry as a Non-Durational img the duration must be set to zero 
(which is the default for an img entry loaded from the [KMC](https://kmc.kaltura.com/index.php/kmcng/login))

```js
    const config = {
      targetId: 'player-placeholder',
      provider: {
      partnerId: '<YOUR_PARTNERI_ID>',
      },
    }

    const player = KalturaPlayer.setup(config);

    player.loadMedia({ entryId: '1_ktrfo5hl' });
```

### Durational Image

in order to play an image entry as a Durational img,

All you need to do is to set the source duration

Currently, the duration of an image entry type is not configurable in the [KMC](https://kmc.kaltura.com/index.php/kmcng/login)

so the only way to play an img as a Durational img is to set the duration value using 
the mediaOption parameter of loadMedia()

```js
    const config = {
      targetId: 'player-placeholder',
      provider: {
      partnerId: '<YOUR_PARTNERI_ID>',
      },
    }

    const player = KalturaPlayer.setup(config);

    player.loadMedia({ entryId: '1_ktrfo5hl' }, { duration: 30 });
```
You can do the same with `setMedia API`
```js
  player.setMedia({
    sources: {
      duration: 30,
      image: [{
           id: '1_ktrfo5hl',
           url: 'https://cfvod.kaltura.com/p/2068231/sp/206823100/thumbnail/entry_id/1_jgmxn561',
           mimetype: ''
        }]
    }
  });
```

### Configuration

The only optional configuration image entry can get is the [Thumbnail API Parameters](https://developer.kaltura.com/api-docs/Engage_and_Publish/kaltura-thumbnail-api.html)
(relevant only when your img served from kaltura [Thumbnail API](https://developer.kaltura.com/api-docs/Engage_and_Publish/kaltura-thumbnail-api.html))

And is configured as part of the mediaOptions (loadMedia's second parameter)  which is of type [PKSourcesConfigObject](https://github.com/kaltura/playkit-js/blob/master/docs/configuration.md#type-pksourcesconfigobject)
and under the `imageSourceOptions` configuration option

#### Example:

```js
    player.loadMedia({ entryId: '1_ktrfo5hl' }, {
       imageSourceOptions: {
         thumbnailAPIParams: {
           quality: 100
         }
       }
    });
```

The imageSourceOptions type is [ImageSourceOptions](./https://github.com/kaltura/playkit-js/blob/master/flow-typed/types/image-player-options.js)

And the thumbnailAPIParams type is [ThumbnailApiParams](https://github.com/kaltura/playkit-js-image-player/blob/master/src/default-thumbnail-api-params.ts)

You can read more about The Thumbnail API configuration Parameters options [here](https://developer.kaltura.com/api-docs/Engage_and_Publish/kaltura-thumbnail-api.html)

### Image Events

See [here](./events.md) The full list of image events

## Full working example

You can find Full working example [here](https://github.com/kaltura/playkit-js-image-player/blob/master/demo/index.html)

## Demo

[demo](https://kaltura.github.io/playkit-js-image-player/demo/index.html)