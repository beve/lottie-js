import { LayerType, PropertyType } from '../constants';
import { Property } from '../properties';
import { Layer } from '.';

export class PrecompositionLayer extends Layer {
  public readonly type = LayerType.PRECOMPOSITION;

  public refId?: string;

  public timeRemap: any;

  public static fromJSON(json: Record<string, any>): PrecompositionLayer {
    const layer = new PrecompositionLayer();

    // Base layer props
    layer.autoOrient = json.ao === 1;
    layer.blendMode = json.bm;
    layer.classNames = json.cl;
    layer.effects = json.ef;
    layer.height = json.h;
    layer.id = json.ld;
    layer.index = json.ind;
    layer.inPoint = json.ip;
    layer.is3D = json.ddd;
    layer.name = json.nm;
    layer.outPoint = json.op;
    layer.parent = json.parent;
    layer.startTime = json.st;
    layer.timeStretch = json.sr;
    layer.width = json.w;

    // Transforms
    layer.opacity = Property.fromJSON(PropertyType.OPACITY, json.ks.o);
    layer.rotation = Property.fromJSON(PropertyType.ROTATION, json.ks.r);
    layer.position = Property.fromJSON(PropertyType.POSITION, json.ks.p);
    layer.anchor = Property.fromJSON(PropertyType.ANCHOR, json.ks.a);
    layer.scale = Property.fromJSON(PropertyType.SCALE, json.ks.s);

    // This layer props
    layer.refId = json.refId;

    return layer;
  }

  public toJSON(): Record<string, any> {
    return {
      ao: this.autoOrient ? 1 : 0,
      bm: this.blendMode,
      cl: this.classNames,
      ddd: this.is3D ? 1 : 0,
      ef: this.effects,
      h: this.height,
      ind: this.index,
      ip: this.inPoint,
      ks: {
        a: this.anchor,
        o: this.opacity,
        p: this.position,
        r: this.rotation,
        s: this.scale,
      },
      ln: this.id,
      nm: this.name,
      op: this.outPoint,
      parent: this.parent,
      refId: this.refId,
      sr: this.timeStretch,
      st: this.startTime,
      ty: this.type,
      w: this.width,
    };
  }
}
