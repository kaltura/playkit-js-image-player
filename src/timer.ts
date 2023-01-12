/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { FakeEvent, EventType } from '@playkit-js/playkit-js';
import { ImagePlayer } from './image-player';

export class Timer {
  private intervalID!: NodeJS.Timeout;

  constructor(private engine: ImagePlayer) {}

  public on(playbackRate: number): void {
    this.intervalID = setInterval(() => {
      this.engine._currentTime++;
      // @ts-ignore
      this.engine.dispatchEvent(new FakeEvent(EventType.TIME_UPDATE));
    }, playbackRate * 1000);
  }

  public off(): void {
    clearInterval(this.intervalID);
  }

  public speed(playbackRate: number): void {
    this.off();
    this.on(playbackRate);
  }
}
