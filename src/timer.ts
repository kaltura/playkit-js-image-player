/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { FakeEvent, FakeEventTarget, EventType } from '@playkit-js/playkit-js';

export class Timer extends FakeEventTarget {
  private intervalID: NodeJS.Timeout | undefined | null;
  private readonly TIME_UPDATE_RATE: number = 250;
  private _currentTime: number;
  private playbackRate: number;
  private duration: number;

  constructor() {
    super();
    this._currentTime = 0;
    this.playbackRate = 1;
    this.duration = 0;
  }

  public start(duration: number): void {
    this.duration = duration;
    this.handleRestart();
    this.intervalID = setInterval(() => {
      this._currentTime += this.TIME_UPDATE_RATE / 1000;
      // @ts-ignore
      this.dispatchEvent(new FakeEvent(EventType.TIME_UPDATE));
      if (this.isTimeUp()) this.onTimeIsUp();
    }, this.TIME_UPDATE_RATE / this.playbackRate);
  }

  public end(): void {
    clearInterval(this.intervalID!);
    this.intervalID = null;
  }

  private handleRestart(): void {
    if (this.isTimeUp()) this.reset();
  }

  public seek(to: number): void {
    this._currentTime = to;
  }

  public speed(playbackRate: number): void {
    this.playbackRate = playbackRate;

    if (this.intervalID) {
      this.end();
      this.start(this.duration);
    }
  }

  public get currentTime(): number {
    return this._currentTime;
  }

  private isTimeUp(): boolean {
    return this._currentTime >= this.duration;
  }

  private onTimeIsUp(): void {
    this.end();
    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.ENDED));
  }

  public reset(): void {
    this.end();
    this._currentTime = 0;
  }
}
