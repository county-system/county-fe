import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class MapsController extends Controller {
  @tracked maps = true;

  @service mapData;

  lat = 3.2416605;
  lng = 34.6609485;
  zoom = 6;

  emberConfLocationData =
    'The Oregon Convention Center 777 NE Martin Luther King Jr Blvd Portland, OR 97232';

  londonLocations = [
    {
      lat: 2.9783772,
      lng: 34.2324817,
      price: 500,
      active: true,
    },
  ];

  get myStyle() {
    console.log(this.mapData);
    return 'padding: 0 !important;margin-right: 1px;';
  }
}
