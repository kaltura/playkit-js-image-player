# Usage guide

- [Overview](#Overview)
  - [Setup](#setup)
  - [Non Durational Image](#Non-Durational-Image)
  - [Durational Image](#Durational-Image)
  - [Size & Quality](#Size-&-Quality)
  - [Configuration](#Configuration)
  - [Image in a Playlist](#Image-in-a-Playlist)
  - [Events](#Image-Events)
  - [Advertisements](#Advertisements)
  - [Analytics](#Analytics)
- [Full working code example](https://github.com/kaltura/playkit-js-image-player/tree/master/demo)

## Overview

The native support for playing images in player V7 was introduced in Player 7.58 (release version 3.10.0)
in order to provide a more comprehensive support for media content types that are managed in Kaltura, 
and in order to provide native support for playing non-video assets

There are two types of image playback supported by player or in other words two modes an image can be played in:

- **Non-Durational Image**
- **Durational image**

The mode an image will be played in, will be determined according to the value of the image duration 
as will be detailed [later](#durational-image) in the guide

**Non-Durational** Image will be displayed by the player without a seek-bar and without the standard player controls (except full screen button)

**Durational Image** will be played by the player as if it is a video, 
with a seek-bar and all standard player controls (except the volume control)
In fact it will behave just like a video for everything

If the image is played as part of a playlist, it will automatically play as a **Durational Image** with a default duration of 5 seconds


### Size & Quality

The image will be aligned to the dimensions of the player, and maintain its aspect ratio.

#### Size 
To improve load time, by default the image will be loaded using the player’s width 
(the height will be automatically calculated in the [Thumbnail API](https://developer.kaltura.com/api-docs/Engage_and_Publish/kaltura-thumbnail-api.html)). 

If you would like to load a higher quality of the image, the **width** param can be set which
will be passed to the [Thumbnail API](https://developer.kaltura.com/api-docs/Engage_and_Publish/kaltura-thumbnail-api.html) while loading the image,
[see here the](#configuration) configuration options.

#### Quality
By default, the image will be loaded at the best possible quality.
But if you prefer to improve load time instead, [this can be configurable](#configuration) (0-100 integer).

#### Full-screen
When the player enters into FullScreen mode, the image will automatically be reloaded
with the new player width to improve the quality of the image being rendered in full screen.

#### Responsiveness

Don't confuse the image aspect ratio with the player aspect ratio
while the image aspect ratio will be kept, the player ratio will not.

Which will sometimes create blank areas around the image as long as their aspect ratio is different

Therefore, if your container size is not set to fixed size but responsive in adapting to the screen size, 
and you want to avoid the blank areas, you can set the player container aspect ratio along with the container size,
with the same aspect ratio as the image, for example, given your original image is -  4 / 3 ratio, 
and you want to set the player size to be - 400px * 300px, then you can do:

```html
  <div id="player-container-id" style="width:50%;aspect-ratio: 4 / 3;"></div>
```
In this way, the player aspect ratio will always be the same as the image aspect ratio on any screen size.


### Setup

First include `playkit-image-player.js` **after** kaltura-player script in your web page.

```html
  <script src="https://raw.githack.com/kaltura/kaltura-player-js/master/dist/kaltura-ovp-player.js"></script>
  <script src="./playkit-image-player.js"></script>
```

### Non Durational Image
In order to play an image entry as a **Non-Durational** image, the duration must be set to zero 
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

In order to play an image entry as a **Durational image**

All you need to do is to set the source duration

The image mode will be determined according to the duration configured with the entry

The duration is part of [PKSourcesConfigObject](https://github.com/kaltura/playkit-js/blob/master/docs/configuration.md#type-pksourcesconfigobject&#41;) which is set by the [KMC](https://kmc.kaltura.com/index.php/kmcng/login) if you use the `loadMedia()` API

Currently, the duration of an image entry type is not configurable in the [KMC](https://kmc.kaltura.com/index.php/kmcng/login)

So the only way to play an img as a **Durational image** is to override the duration value using 
the mediaOption second parameter of `loadMedia()` or pass it through the sources object in case of the `setMedia()` API usage

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

The only optional configuration image entry can get, is the [Thumbnail API Parameters](https://developer.kaltura.com/api-docs/Engage_and_Publish/kaltura-thumbnail-api.html)
(relevant only when your img served from kaltura [Thumbnail API](https://developer.kaltura.com/api-docs/Engage_and_Publish/kaltura-thumbnail-api.html))

The configuration is part of the `mediaOptions` (loadMedia's second parameter)  which is of type [PKSourcesConfigObject](https://github.com/kaltura/playkit-js/blob/master/docs/configuration.md#type-pksourcesconfigobject)
and under the `imageSourceOptions` configuration option

#### Example:

```js
    player.loadMedia({ entryId: '1_ktrfo5hl' }, {
       imageSourceOptions: {
         thumbnailAPIParams: {
           quality: 100,
           width: 1000
         }
       }
    });
```

The `imageSourceOptions` type is [ImageSourceOptions](./https://github.com/kaltura/playkit-js/blob/master/flow-typed/types/image-player-options.js)

And the `thumbnailAPIParams` type is [ThumbnailApiParams](https://github.com/kaltura/playkit-js-image-player/blob/master/src/default-thumbnail-api-params.ts)

You can read more about Thumbnail API configuration Parameters options [here](https://developer.kaltura.com/api-docs/Engage_and_Publish/kaltura-thumbnail-api.html)

### Image in a Playlist

Images played as part of a playlist will always be played in **Durational** mode (with a default duration of 5 second)

The image duration will be the same for all image items in the playlist

If you want to change the default playlist image items duration you can set it through the player options configuration, as in the example below:

```js
player.loadPlaylist({ playlistId: '1_1b6sw5ze' }, { options: { imageDuration: 20 } });
```

### Image Events

See [here](./events.md) The full list of image events

### Advertisements

**Durational Image** is fully supported and integrated with [IMA Plugin](https://github.com/kaltura/playkit-js-ima#readme)  
which means you can configure any type (**pre-roll**,  **mid-roll** and **post-roll**) of ad using the [IMA Plugin](https://github.com/kaltura/playkit-js-ima#readme)

**Non-Durational Image** only **pre-roll** ads are supported

### Analytics

Image entry can be integrated with [Kava](https://github.com/kaltura/playkit-js-kava#readme) and [Youbora](https://github.com/kaltura/playkit-js-youbora#readme) analytics plugins,
In this case the reported **PlaybackType** info will be `'img'` (instead of `'Vod'` or `'Live'`)

You can find [here](./events.md#kava-analytics-events) the full list of Kava Analytics events supported in Image Entry playback.

## Full working code example

You can find full working code example [here](https://github.com/kaltura/playkit-js-image-player/blob/master/demo/index.html)

## Demo

[demo](https://kaltura.github.io/playkit-js-image-player/demo/index.html)