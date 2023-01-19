/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { FakeEvent, FakeEventTarget, EventType } from '@playkit-js/playkit-js';

export class Timer extends FakeEventTarget {
  private intervalID!: NodeJS.Timeout;
  private readonly TIME_UPDATE_RATE: number = 250;
  private _currentTime: number;
  private duration: number;

  constructor() {
    super();
    this._currentTime = 0;
    this.duration = 0;
  }

  public start(duration: number, playbackRate = 1): void {
    this.duration = duration;
    this.handleRestart();
    this.intervalID = setInterval(() => {
      // setImmediate(() => (this._currentTime += this.TIME_UPDATE_RATE / 1000));
      this._currentTime += this.TIME_UPDATE_RATE / 1000;
      // @ts-ignore
      this.dispatchEvent(new FakeEvent(EventType.TIME_UPDATE));
      if (this.isTimeUp()) this.onTimeIsUp();
    }, this.TIME_UPDATE_RATE / playbackRate);
  }

  private handleRestart() {
    if (this.isTimeUp()) this.reset();
  }

  public pause(): void {
    clearInterval(this.intervalID);
  }

  public seek(to: number): void {
    this._currentTime = to;
  }

  public speed(playbackRate: number): void {
    this.pause();
    this.start(this.duration, playbackRate);
  }

  public get currentTime(): number {
    return this._currentTime;
  }

  private isTimeUp(): boolean {
    return this._currentTime >= this.duration;
  }

  private onTimeIsUp(): void {
    this.pause();
    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.ENDED));
  }

  public reset(): void {
    this.pause();
    this._currentTime = 0;
  }
}
