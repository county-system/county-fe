import Model, { attr } from '@ember-data/model';

export default class MapsModel extends Model {
  @attr lat;
  @attr lng;
  @attr zoom;

  get lastUpdateTime() {
    if (!this.createdAt) {
      return new Date();
    }

    return new Date(this.updatedAt).toLocaleString();
  }
}
