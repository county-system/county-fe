import Model, { attr } from '@ember-data/model';

export default class DownloadsModel extends Model {
  @attr name;
  @attr email;
  @attr message;
}
