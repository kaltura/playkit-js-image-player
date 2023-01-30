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
  public static _logger: any = getLogger('Image');
  public static id = 'image';
  private eventManager: EventManager;
  private el!: HTMLImageElement;
  private source: any;
  private config: any;
  private _playbackRate: number;
  private timer: Timer;
  private isFirstPlay: boolean;

  constructor(source: any, config: any) {
    super();
    this.eventManager = new EventManager();
    this._playbackRate = 1;
    this.timer = new Timer();
    this.isFirstPlay = true;
    this.createImageElement();
    this.init(source, config);
  }

  private init(source: any, config: any): void {
    this.source = source;
    this.config = config;
    this.setDefaultConfig();
    this.concatenateThumbnailParams(source);
    this.attach();
  }

  private setDefaultConfig(): void {
    this.config.playback.autoplay = true;
  }

  private createImageElement(): void {
    this.el = document.createElement('img');
    this.el.id = Utils.Generator.uniqueId(5);
  }

  public async load(startTime: number): Promise<{ tracks: [] }> {
    return new Promise((resolve, reject) => {
      this.el.onload = (): void => {
        resolve({ tracks: [] });
        this.onImageLoaded();
      };
      this.el.onerror = (error): void => {
        ImagePlayer._logger.error(`The image failed to load, img url:${this.source.url}`, error);
        reject(error);
      };
      // @ts-ignore
      this.dispatchEvent(new FakeEvent(EventType.LOAD_START));
      this.el.src = this.source.url;
    });
  }

  private attach(): void {
    // @ts-ignore
    this.eventManager.listen(this.timer, EventType.ENDED, (event: FakeEvent) => this.dispatchEvent(event));
    // @ts-ignore
    this.eventManager.listen(this.timer, EventType.TIME_UPDATE, (event: FakeEvent) => this.dispatchEvent(event));
  }

  public play(): Promise<void> {
    if (this.isTimedImage()) this.timer.start(this.duration);
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

    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.PLAYING));
    // @ts-ignore
    if (this.isFirstPlay) this.dispatchEvent(new FakeEvent(EventType.FIRST_PLAYING));
    return Promise.resolve();
  }

  private isTimedImage(): boolean {
    return this.config.sources.duration > 0;
  }

  private onImageLoaded(): void {
    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.LOADED_METADATA));
    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.LOADED_DATA));
  }

  private concatenateThumbnailParams(source: any): void {
    const thumbnailAPIParams: ThumbnailApiParams = {
      width: this.getPlayerWidth(),
      ...(this.shouldAddKs() && { ks: this.config.session.ks }),
      ...defaultThumbnailApiParams,
      ...this.config?.imageSourceOptions?.thumbnailAPIParams
    };

    Object.keys(thumbnailAPIParams).forEach((parmaName: string) => {
      source.url += `/${parmaName}/${thumbnailAPIParams[parmaName as keyof ThumbnailApiParams]}`;
    });
  }

  private shouldAddKs(): boolean {
    return typeof this.config.session?.isAnonymous === 'boolean' && !this.config.session.isAnonymous;
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
    ImagePlayer._logger.debug('Prepare the Image element');
  }

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
    this.timer.pause();
    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.PAUSE));
  }

  public reset(): void {
    this.eventManager.removeAll();
    // this.el.setAttribute('src', '');
    this.isFirstPlay = true;
    this.playbackRate = 1;
    this.timer.reset();
  }

  public resetAllCues(): void {}

  public restore(source: any, config: any): void {
    this.reset();
    this.init(source, config);
  }

  public seekToLiveEdge(): void {}

  public selectAudioTrack(audioTrack: any): void {}

  public selectTextTrack(textTrack: TextTrack): void {}

  public selectVideoTrack(videoTrack: any): void {}

  public get id(): string {
    return ImagePlayer.id;
  }

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
    return this.timer.currentTime;
  }

  public set currentTime(to: number) {
    this.timer.seek(to);
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

  public getThumbnail(time: number): null {
    return null;
  }
}

// https://cfvod.kaltura.com/p/2068231/sp/206823100/thumbnail/entry_id/1_ktrfo5hl/width/640/ks/djJ8MjA2ODIzMXwLffcAwHqdbNRhVIG2jMBjPwllR36gwWC5OcsAQ8g3RVgk-Xt2aOoIaZQ8QWR7MZ4CuY8_Y8zB7EH9j1Mh-ClSxxUP4NP4QM_6LK9sf1cY8A==/quality/90
