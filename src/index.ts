// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { registerEngine } from '@playkit-js/playkit-js';
import { ImagePlayer } from './image-player';

registerEngine(ImagePlayer.id, ImagePlayer);
