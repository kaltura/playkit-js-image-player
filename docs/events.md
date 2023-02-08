# Image Events

- [Events](#Events)
  - [Non-Durational Image Events](#Non-Durational-Image-Events)
  - [Durational Image Events](#Durational-Image-Events)
- [Kava Analytics Events](#Kava-Analytics-Events)
  - [Non-Durational Image Analytics Events](#Non-Durational-Image-Analytics-Events)
  - [Durational Image Analytics Events](#Durational-Image-Analytics-Eventss)

## Events

You can find  [here](https://github.com/kaltura/playkit-js/blob/master/src/event/event-type.js) the full list of player events

Of these, the following are supported in an image entry:

### Non-Durational Image Events

- CHANGE_SOURCE_STARTED
- SOURCE_SELECTED
- CHANGE_SOURCE_ENDED
- PLAYBACK_START
- PLAYER_STATE_CHANGED
- RESIZE
- VISIBILITY_CHANGE
- LOADED_METADATA
- LOADED_DATA
- MEDIA_LOADED
- PLAY
- FIRST_PLAY
- PLAYING
- FIRST_PLAYING

### Durational Image Events

All of the above and in addition:

- DURATION_CHANGE
- PAUSE
- SEEKED
- RATECHANGE
- USER_GESTURE
- ENDED
- PLAYBACK_ENDED


## Kava Analytics Events

The following [Analytics events](https://github.com/kaltura/playkit-js-kava/blob/master/docs/kava-events.md) supported in Image Entry playback:

### Non-Durational Image Analytics Events

- IMPRESSION
- PLAY_REQUEST
- PLAY
- ERROR

### Durational Image Analytics Events

- VIEW
- IMPRESSION
- PLAY_REQUEST
- PLAY
- RESUME
- PAUSE
- REPLAY
- SEEK
- PLAY_REACHED_25_PERCENT
- PLAY_REACHED_50_PERCENT
- PLAY_REACHED_75_PERCENT
- PLAY_REACHED_100_PERCENT
- ERROR