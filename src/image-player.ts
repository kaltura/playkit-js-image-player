// These lint rules are temporarily disabled until our fully typescript support is added
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

// @ts-ignore
import { IEngine, FakeEventTarget, FakeEvent, EventManager, EventType, getLogger, Utils } from '@playkit-js/playkit-js';
import { defaultThumbnailApiParams, ThumbnailApiParams } from './default-thumbnail-api-params';
import { Timer } from './timer';

export class ImagePlayer extends FakeEventTarget implements IEngine {
  public static _logger: any = getLogger('image');
  public static id = 'image';
  private eventManager: EventManager;
  private el!: HTMLImageElement;
  private source: any;
  private config: any;
  private imageLoaded!: Promise<{ tracks: [] }>;
  public _currentTime: number;
  private _playbackRate: number;
  private timer: Timer;
  private isFirstPlay: boolean;

  constructor(source: any, config: any) {
    super();
    this.eventManager = new EventManager();
    this.source = source;
    this.config = config;
    this.config.sources.duration = 100;
    this._currentTime = 0;
    this._playbackRate = 1;
    this.timer = new Timer(this);
    this.isFirstPlay = true;
    this.init(source);
  }

  private init(source: any): void {
    this.setDefaultConfig();
    this.createVideoElement();
    this.concatenateThumbnailParams(source);
  }

  private setDefaultConfig(): void {
    this.config.playback.autoplay = true;
  }

  private createVideoElement(): void {
    this.el = document.createElement('img');
    this.el.id = Utils.Generator.uniqueId(5);
  }

  public load(startTime: number): Promise<{ tracks: [] }> {
    this.imageLoaded = new Promise((resolve, reject) => {
      this.el.addEventListener('load', () => {
        this.onImageLoaded(resolve);
      });
      // @ts-ignore
      this.dispatchEvent(new FakeEvent(EventType.LOAD_START));
      this.el.src = this.source.url;
    });
    return this.imageLoaded;
  }

  public play(): Promise<void> {
    if (this.config.sources.duration > 0) this.timer.on(this.playbackRate);
    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.PLAYBACK_START));

    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.PLAY));

    if (this.isFirstPlay) {
      // @ts-ignore
      this.dispatchEvent(new FakeEvent(EventType.FIRST_PLAY));
      this.isFirstPlay = false;
    }
    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.DURATION_CHANGE));
    return Promise.resolve(undefined);
  }

  private onImageLoaded(resolve: (value: { tracks: [] }) => void): void {
    resolve({ tracks: [] });
    setTimeout(() => {
      // @ts-ignore
      this.dispatchEvent(new FakeEvent(EventType.LOADED_METADATA));
      // @ts-ignore
      this.dispatchEvent(new FakeEvent(EventType.LOADED_DATA));
      // @ts-ignore
      this.dispatchEvent(new FakeEvent(EventType.PLAYING));
      // @ts-ignore
      this.dispatchEvent(new FakeEvent(EventType.FIRST_PLAYING));
    });
  }

  private concatenateThumbnailParams(source: any): void {
    const thumbnailAPIParams: ThumbnailApiParams = {
      width: this.getPlayerWidth(),
      ...(!this.config.session.isAnonymous && { ks: this.config.session.ks }),
      ...defaultThumbnailApiParams,
      ...this.config?.imageSourceOptions?.thumbnailAPIParams
    };

    Object.keys(thumbnailAPIParams).forEach((parmaName: string) => {
      source.url += `/${parmaName}/${thumbnailAPIParams[parmaName as keyof ThumbnailApiParams]}`;
    });
  }

  private getPlayerWidth(): number {
    return document.getElementById(this.config.targetId)!.offsetWidth;
  }

  public static isSupported(): boolean {
    return true;
  }

  public static createEngine(source: any, config: any): IEngine {
    return new this(source, config);
  }

  public static canPlaySource(source: any): boolean {
    return true;
  }

  public static runCapabilities(): void {
    return;
  }

  public static getCapabilities(): Promise<any> {
    const capabilities = {
      [ImagePlayer.id]: {
        autoplay: true
      }
    };
    return Promise.resolve(capabilities);
  }

  public static prepareVideoElement(): void {
    ImagePlayer._logger.debug('Prepare the Image element for playing not supported');
  }

  public attach(): void {}

  public attachMediaSource(): void {}

  public destroy(): void {
    this.reset();
    this.el.remove();
  }

  public detach(): void {}

  public detachMediaSource(): void {}

  public enableAdaptiveBitrate(): void {}

  public enterPictureInPicture(): void {}

  public exitPictureInPicture(): void {}

  public getStartTimeOfDvrWindow(): number {
    return 0;
  }

  public getVideoElement(): HTMLImageElement {
    return this.el;
  }

  public hideTextTrack(): void {}

  public isAdaptiveBitrateEnabled(): boolean {
    return false;
  }

  public isLive(): boolean {
    return false;
  }

  public isPictureInPictureSupported(): boolean {
    return false;
  }

  public pause(): void {
    this.timer.off();
    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.PAUSE));
  }

  public reset(): void {
    this.el.setAttribute('src', '');
    this.timer.off();
    this.isFirstPlay = true;
    this._currentTime = 0;
  }

  public resetAllCues(): void {}

  public restore(source: any, config: any): void {}

  public seekToLiveEdge(): void {}

  public selectAudioTrack(audioTrack: any): void {}

  public selectTextTrack(textTrack: TextTrack): void {}

  public selectVideoTrack(videoTrack: any): void {}

  public get playbackRates(): number[] {
    return [0.5, 1, 1.5, 2];
  }

  public set playbackRate(playbackRate: number) {
    this._playbackRate = playbackRate;
    this.timer.speed(playbackRate);
    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.RATE_CHANGE));
  }

  public get playbackRate(): number {
    return this._playbackRate;
  }

  public get duration(): number {
    return this.config.sources.duration;
  }

  public get currentTime(): number {
    return this._currentTime;
  }

  public set currentTime(to: number) {
    this._currentTime = to;
    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.SEEKED));
  }

  public get buffered(): TimeRanges {
    return {
      start(index: number): number {
        return 0;
      },
      end(index: number): number {
        return 0;
      },
      length: 0
    };
  }

  private getThumbnail(time: number): null {
    return null;
  }
}
