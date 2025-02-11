import { PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Rectangle shape type.
 */
export class RectangleShape extends Shape {
  /**
   * Rectangle shape type: rc
   */
  public readonly type = ShapeType.RECTANGLE;

  public direction?: number;

  public position: Property = new Property(this, PropertyType.POSITION);

  public roundness: Property = new Property(this, PropertyType.ROUNDNESS);

  public size: Property = new Property(this, PropertyType.SIZE);

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       RectangleShape instance
   */
  public fromJSON(json: Record<string, any>): RectangleShape {
    // Base shape
    this.classNames = json.cl;
    this.id = json.ln;
    this.isHidden = json.hd;
    this.matchName = json.mn;
    this.name = json.nm;

    // This shape
    this.direction = json.d;
    this.position.fromJSON(json.p);
    this.roundness.fromJSON(json.r);
    this.size.fromJSON(json.s);

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
      ty: this.type,

      // Base shape
      cl: this.classNames,
      hd: this.isHidden,
      ln: this.id,
      mn: this.matchName,
      nm: this.name,

      // This shape
      d: this.direction,
      p: this.position,
      r: this.roundness,
      s: this.size,
    };
  }
}
