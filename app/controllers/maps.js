import Controller from '@ember/controller';

export default class MapsController extends Controller {
  lat = -1.286389;
  lng = 36.817223;
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
}
