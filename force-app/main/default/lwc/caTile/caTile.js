import {
  LightningElement,
  api,
  wire
} from 'lwc';
import {
  fireEvent
} from 'c/pubsub';
import {
  CurrentPageReference
} from 'lightning/navigation';
export default class CaTile extends LightningElement {
  @api car;
  @api selectedCarId;

  @wire(CurrentPageReference) pageRef;

  handleCarSelect(event) {
    //prevent the default function of anchor tag ie)redirecting to other page
    event.preventDefault();
    const carId = this.car.Id;

    const carSelect = new CustomEvent('carselect', {
      detail: carId
    });
    this.dispatchEvent(carSelect);
    fireEvent(this.pageRef, 'carselect', this.car.Id);
  }

  get selected() {
    if (this.selectedCarId === this.car.Id) {

      return 'tile selected';
    }
    return 'tile';
  }
}