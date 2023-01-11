// These lint rules are temporarily disabled until our fully typescript support is added
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

// @ts-ignore
import { IEngine, FakeEventTarget, FakeEvent, EventManager, EventType, getLogger, Utils } from '@playkit-js/playkit-js';
import { defaultThumbnailApiParams, ThumbnailApiParams } from './default-thumbnail-api-params';

export class ImagePlayer extends FakeEventTarget implements IEngine {
  constructor(source: any, config: any) {
    super();
    this.eventManager = new EventManager();
    this.source = source;
    this.config = config;
    this.init(source);
  }

  public static _logger: any = getLogger('image');
  public static id = 'image';
  private eventManager: EventManager;
  private el!: HTMLImageElement;
  private source: any;
  private config: any;
  private imageLoaded!: Promise<{ tracks: [] }>;

  private createVideoElement(): void {
    this.el = document.createElement('img');
    this.el.id = Utils.Generator.uniqueId(5);
  }

  private init(source: any): void {
    this.setDefaultConfig();
    this.createVideoElement();
    this.concatenateThumbnailParams(source);
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
    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.PLAYBACK_START));
    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.PLAY));
    // @ts-ignore
    this.dispatchEvent(new FakeEvent(EventType.FIRST_PLAY));
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

  public destroy(): void {}

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

  public pause(): void {}

  public reset(): void {}

  public resetAllCues(): void {}

  public restore(source: any, config: any): void {}

  public seekToLiveEdge(): void {}

  public selectAudioTrack(audioTrack: any): void {}

  public selectTextTrack(textTrack: TextTrack): void {}

  public selectVideoTrack(videoTrack: any): void {}

  public get playbackRates(): number[] {
    return [1];
  }

  public get duration(): number {
    return 0;
  }

  public get currentTime(): number {
    return 0;
  }

  public set currentTime(to: number) {}

  private setDefaultConfig(): void {
    this.config.playback.autoplay = true;
  }
}
