import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { throttle } from '@ember/runloop';
import { inject as service } from '@ember/service';
// import { load } from '../helpers/load';
// import config from 'county-fe/config/environment';

export default class MapsController extends Controller {
  @service flashMessages;
  @service googleMapsApi;

  @tracked maps = true;
  @tracked mapData = this.model;
  @tracked buttonGroupValue;
  @tracked markerTooltipOpen = false;
  @tracked mapBounds;
  @tracked mapZoom;
  @tracked searchLoading = false;
  @tracked searchQuery = '';

  @action
  async change(evt) {
    this.searchQuery = evt;
  }

  get filterFunction() {
    // let url = `${config.backend.BACKEND_API}/api/v2/search/chapter?q=${this.searchQuery}`;
    // return load(fetch(url).then((data) => data.json()));
    // const results = this.model.filter(this.searchQuery);
    return this.model.filter((x) =>
      x.type.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  @action
  flashMessage(message) {
    this.flashMessages.info(message);
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
  handleOnClick(id) {
    return this.mapData.forEach((data) => {
      if (data.id == id) {
        data.active = true;
      }
    });
  }

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
