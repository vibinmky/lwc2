import {
  LightningElement,
  api
} from 'lwc';
import {
  ShowToastEvent
} from 'lightning/platformShowToastEvent';
import {
  NavigationMixin
} from 'lightning/navigation';
import getReviews from '@salesforce/apex/carReviewController.getReview'

export default class CarReviews extends NavigationMixin(LightningElement) {

  privateCarId;
  carExperience = [];

  @api
  get carId() {
    return this.privateCarId;
  }

  set carId(value) {
    this.privateCarId = value;
    this.carExperienceMethod();
  }

  connectedCallback() {
    this.carExperienceMethod();
  }

  @api
  carExperienceMethod() {
    getReviews({
      carId: this.privateCarId
    }).then((experiences) => {
      this.carExperience = experiences;
    }).catch((error) => {
      this.showToast("ERROR", error.body.message, 'error');
    });
  }

  userViewHandler(event) {
    const userId = event.target.getAttribute('data-userId')
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: userId,
        objectApiName: 'User', // objectApiName is optional
        actionName: 'view'
      },
    });
  }
  showToast(title, message, variant) {
    const evt = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant,
    });
    this.dispatchEvent(evt);
  }

  get review() {
    if (this.carExperience.length > 0) {
      return true;
    }
    return false;
  }
}