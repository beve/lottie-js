import { Asset } from './asset';

/**
 * Image asset type.
 */
export class ImageAsset extends Asset {
  public data?: string;

  public id?: string;

  public height!: number;

  public path?: string;

  public width!: number;

  public embedded?: number;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       ImageAsset instance
   */
  public fromJSON(json: Record<string, any>): ImageAsset {
    this.data = json.p;
    this.id = json.id;
    this.height = json.h;
    this.path = json.u;
    this.width = json.w;
    this.embedded = json.e;

    return this;
  }

  /**
   * Convert the class instance to Lottie JSON object.
   *
   * Called by Javascript when serializing object with JSON.stringify()
   *
   * @returns       JSON object
   */
  public toJSON(): Record<string, any> {
    return {
      h: this.height,
      id: this.id,
      p: this.data,
      u: this.path,
      w: this.width,
      e: this.embedded,
    };
  }
}
