import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class MapsController extends Controller {
  @tracked maps = true;

  lat = 3.2416605;
  lng = 34.6609485;
  zoom = 6;

  emberConfLocation = [3.0947667, 35.6155151];
  emberConfLocationData =
    'The Oregon Convention Center 777 NE Martin Luther King Jr Blvd Portland, OR 97232';

  full = [
    [3.0947667, 35.5155151],
    [3.0948866, 35.3155183],
    [3.0946566, 35.4155232],
    [3.0948979, 35.7156474],
    [3.120818, 35.6046763],
    [3.0947407, 35.7156056],
  ];

  get myStyle() {
    return 'padding: 20px 1px !important;';
  }
}
