// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IEngine, FakeEventTarget, FakeEvent, EventManager, getLogger, Utils } from '@playkit-js/playkit-js';

export class ImagePlayer extends FakeEventTarget implements IEngine {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(source: any, config: any) {
    super();
    this.eventManager = new EventManager();
    this.createVideoElement();
    this.init(source, config);
    // setTimeout(() => this.load(0));
  }

  private eventManager: EventManager;
  private el!: HTMLImageElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private source: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private config: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static _logger: any = getLogger('image');
  public static id = 'image';

  public static isSupported(): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
  public static createEngine(source: any, config: any): IEngine {
    return new this(source, config);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
  public static canPlaySource(source: any): boolean {
    return true;
  }

  public static runCapabilities(): void {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getCapabilities(): Promise<any> {
    const capabilities = {
      [ImagePlayer.id]: {
        autoplay: true
      }
    };
    return Promise.resolve(capabilities);
  }

  public static prepareVideoElement(): void {
    ImagePlayer._logger.debug('Prepare the video element for playing not supported');
  }

  public attach(): void {
    return;
  }

  public attachMediaSource(): void {
    return;
  }

  public destroy(): void {
    return;
  }

  public detach(): void {
    return;
  }

  public detachMediaSource(): void {
    return;
  }

  public enableAdaptiveBitrate(): void {
    return;
  }

  public enterPictureInPicture(): void {
    return;
  }

  public exitPictureInPicture(): void {
    return;
  }

  public getStartTimeOfDvrWindow(): number {
    return 0;
  }

  public getVideoElement(): HTMLImageElement {
    return this.el;
  }

  public hideTextTrack(): void {
    return;
  }

  public isAdaptiveBitrateEnabled(): boolean {
    return false;
  }

  public isLive(): boolean {
    return false;
  }

  public isPictureInPictureSupported(): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
  public load(startTime: number): Promise<{ tracks: [] }> {
    this.el.src = this.source.url;
    this.play();
    // return this.play().then(() => ({ tracks: [] }));
    return Promise.resolve({ tracks: [] });
  }

  public pause(): void {
    return;
  }

  public play(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.dispatchEvent(new FakeEvent('play', '121'));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.dispatchEvent(new FakeEvent('playing', '121'));
    return Promise.resolve(undefined);
  }

  public reset(): void {
    return;
  }

  public resetAllCues(): void {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
  public restore(source: any, config: any): void {
    return;
  }

  public seekToLiveEdge(): void {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
  public selectAudioTrack(audioTrack: any): void {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public selectTextTrack(textTrack: TextTrack): void {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
  public selectVideoTrack(videoTrack: any): void {
    return;
  }

  private createVideoElement() {
    this.el = document.createElement('img');
    this.el.id = Utils.Generator.uniqueId(5);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private init(source: any, config: any) {
    this.source = source;
    this.config = config;
  }

  public get playbackRates(): number[] {
    return [1];
  }
}
