import { Value } from '../values';

/**
 * Represents a keyframe in the timeline with the frame number and associated property value.
 */
export class KeyFrame {
  public frame = 0;
  public value: number | number[] | Value = 0;
  public frameInTangent?: [number, number] = [0, 0];
  public frameOutTangent?: [number, number] = [1, 1];
  public valueInTangent?: [number, number];
  public valueOutTangent?: [number, number];
  public hold = false;

  public constructor(frame = 0, value: number | number[] | Value = 0) {
    this.frame = frame;
    this.value = value;
  }

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       KeyFrame instance
   */
  public fromJSON(json: Record<string, any>, valueClass: any = undefined): KeyFrame {
    this.frame = json.t;

    if (valueClass === undefined) this.value = json.s;
    else this.value = valueClass.fromJSON(json.s);

    const hasFrameTangents = 'i' in json && 'o' in json;
    const hasValueTangents = 'ti' in json && 'to' in json;

    this.frameInTangent = hasFrameTangents ? [json.i.x, json.i.y] : undefined;
    this.frameOutTangent = hasFrameTangents ? [json.o.x, json.o.y] : undefined;

    if (hasValueTangents) {
      if ('x' in json.ti && 'y' in json.ti) {
        this.valueInTangent = [json.ti.x, json.ti.y];
      } else {
        this.valueInTangent = json.ti;
      }

      if ('x' in json.to && 'y' in json.to) {
        this.valueOutTangent = [json.to.x, json.to.y];
      } else {
        this.valueOutTangent = json.to;
      }
    }

    // this.valueOutTangent = hasValueTangents
    //   ? ['x' in json.to ? json.to.x : json.to[0], 'y' in json.to ? json.to.y : json.to[1]]
    //   : undefined;

    this.hold = 'h' in json && json.h;

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
    const json: Record<string, any> = {
      // This shape
      t: this.frame,
      s: this.value,
    };

    if (this.hold) {
      json.h = 1;
    } else if (this.frameInTangent && this.frameOutTangent) {
      json.i = { x: this.frameInTangent[0], y: this.frameInTangent[1] };
      json.o = { x: this.frameOutTangent[0], y: this.frameOutTangent[1] };
    }

    if (this.valueInTangent && this.valueOutTangent) {
      json.ti = this.valueInTangent;
      json.to = this.valueOutTangent;
    }

    return json;
  }
}
