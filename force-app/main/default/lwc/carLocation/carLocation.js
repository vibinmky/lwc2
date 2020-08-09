import {
  LightningElement,
  wire
} from 'lwc';
import {
  registerListener,
  unregisterAllListeners
} from 'c/pubsub';
import {
  CurrentPageReference
} from 'lightning/navigation';
import getLocation from '@salesforce/apex/CarLocationController.getCarLocation';
import {
  ShowToastEvent
} from 'lightning/platformShowToastEvent';

export default class CarLocation extends LightningElement {
  carId;
  carDetail;
  mapMarkers = [];

  @wire(CurrentPageReference) pageRef;

  connectedCallback() {
    registerListener('carselect', this.callbackMethod, this);
  }

  getCarDetails() {
    getLocation({
      carId: this.carId
    }).then((details) => {
      this.carDetail = details[0];
      const Latitude = this.carDetail.Geolocation__Latitude__s;
      const Longitude = this.carDetail.Geolocation__Longitude__s;
      this.mapMarkers = [{
        location: {
          Latitude,
          Longitude
        }
      }];
    }).catch((error) => {
      this.showToast('ERROR', error.body.message, 'error');
    });
  }

  callbackMethod(payload) {
    this.carId = payload;
    this.getCarDetails();
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
  }

  get location() {
    if (this.carDetail) {
      return true;
    }
    return false;
  }

  showToast(title, message, variant) {
    const evt = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant,
    });
    this.dispatchEvent(evt);
  }
}