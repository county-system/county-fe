import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { throttle } from '@ember/runloop';
import { inject as service } from '@ember/service';
export default class MapsController extends Controller {
  @tracked maps = true;
  @tracked mapData = this.model;
  @tracked buttonGroupValue;
  @tracked mapTooltipOpen = false;
  @tracked markerTooltipOpen = false;
  @tracked mapBounds;
  @tracked mapZoom;
  @service flashMessages;
  @service googleMapsApi;

  @action
  flashMessage(message) {
    console.log('message', message);
    // let message = (concat "Clicked: " location.lat ", " location.lng)
    this.flashMessages.info(message);
  }

  get myStyle() {
    return 'padding: 0 !important;margin-right: 1px;';
  }

  london = {
    lat: 3.278959,
    lng: 35.4661995,
  };

  @action
  filterBy(event) {
    this.buttonGroupValue = event;

    if (event == 'all') {
      this.mapData = this.model;
    } else {
      this.mapData = this.model.filter((data) => {
        return data.type == event;
      });
    }
  }

  @action
  scrollToListing(listing) {
    let id = `rental-${listing.id}`;
    let el = document.getElementById(id);

    console.log(el);

    // if (el) {
    //   el.scrollIntoView({ behavior: 'smooth' });
    // }
  }

  // @action
  // flashMessageThrottle(message) {
  //   throttle(this, 'send', 'flashMessage', message, 300, true);
  // }

  get filterOptions() {
    const dropdown = [];
    this.model.forEach((item) => {
      if (!dropdown.includes(item.type)) {
        dropdown.push(item.type);
      }
    });
    return dropdown;
  }

  get filteredLocation() {
    return this.mapData.filter((location) => {
      let { mapBounds } = this;

      if (mapBounds) {
        let { lat, lng } = location;

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
  handleMouseEnter(location) {
    location.active = true;
  }

  @action
  handleMouseLeave(location) {
    location.active = false;
  }

  _saveBounds(map) {
    this.mapBounds = map.getBounds();
    this.mapZoom = map.getZoom();
  }
}
