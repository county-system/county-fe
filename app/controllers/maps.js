import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { throttle } from '@ember/runloop';

class Rental {
  @tracked id;
  @tracked lat;
  @tracked lng;
  @tracked type;
  @tracked price;
  @tracked active;

  constructor(args) {
    return Object.assign(this, args);
  }
}
export default class MapsController extends Controller {
  @tracked maps = true;

  @service mapData;

  get myStyle() {
    return 'padding: 0 !important;margin-right: 1px;';
  }
  @service
  googleMapsApi;

  @service
  mapData;

  @tracked
  mapTooltipOpen = false;

  @tracked
  markerTooltipOpen = false;

  @tracked mapBounds;
  @tracked mapZoom;

  @tracked
  rentals = [];

  london = this.mapData.london;
  primaryMapStyle = this.mapData.primaryMapStyle;

  constructor() {
    super(...arguments);

    this.getRentals().then((rentals) => {
      this.rentals = rentals;
    });
  }

  get google() {
    return this.googleMapsApi.google;
  }

  get filteredRentals() {
    return this.rentals.filter((rental) => {
      let { mapBounds } = this;

      if (mapBounds) {
        let { lat, lng } = rental;

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

  getRentals() {
    return this.google.then(() => {
      return this.mapData.londonLocations.map(
        (location) => new Rental({ ...location, active: false })
      );
    });
  }

  @action
  saveBounds({ map }) {
    throttle(this, this._saveBounds, map, 30);
  }

  @action
  scrollToListing(listing) {
    let id = `rental-${listing.id}`,
      el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
