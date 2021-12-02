import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { throttle } from '@ember/runloop';
export default class MapsController extends Controller {
  @tracked maps = true;
  @tracked mapData = this.model;

  @tracked
  mapTooltipOpen = false;

  @tracked
  markerTooltipOpen = false;

  @tracked mapBounds;
  @tracked mapZoom;

  get myStyle() {
    return 'padding: 0 !important;margin-right: 1px;';
  }

  london = {
    lat: -2.5201429,
    lng: 34.0149256,
  };

  @action
  filterBy(filters) {
    const newMapData = this.model.filter((data) => {
      return data.type == filters[0];
    });
    this.mapData = newMapData;
  }

  get filteredRentals() {
    return this.mapData.filter((rental) => {
      let { mapBounds } = this;

      if (mapBounds) {
        let { lat, lng } = rental;
        console.log(lat, lng);

        // TODO: Look into this again...
        let northEast = mapBounds.getNorthEast(),
          southWest = mapBounds.getSouthWest(),
          distance = 10000 / this.mapZoom,
          newNorthEast =
            this.googleMapsApi.google.maps.geometry.spherical.computeOffset(
              northEast,
              distance,
              45
            ),
          newSouthWest =
            this.googleMapsApi.google.maps.geometry.spherical.computeOffset(
              southWest,
              distance,
              -135
            ),
          extendedBounds = mapBounds.extend(newNorthEast).extend(newSouthWest);

        return extendedBounds.contains(
          new this.googleMapsApi.google.maps.LatLng(lat, lng)
        );
      } else {
        return true;
      }
    });
  }


  @action
  saveBounds({ map }) {
    throttle(this, this._saveBounds, map, 30);
  }

  @action
  handleMouseEnter(rental) {
    rental.active = true;
  }

  @action
  handleMouseLeave(rental) {
    rental.active = false;
  }

  _saveBounds(map) {
    this.mapBounds = map.getBounds();
    this.mapZoom = map.getZoom();
  }
}
