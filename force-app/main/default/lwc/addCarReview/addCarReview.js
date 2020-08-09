import {
  LightningElement,
  api
} from 'lwc';
import {
  ShowToastEvent
} from 'lightning/platformShowToastEvent';
import {
  createRecord
} from 'lightning/uiRecordApi';
import Title from '@salesforce/schema/Car_Experience__c.Name';
import Experience from '@salesforce/schema/Car_Experience__c.Experience__c';
import car_ID from '@salesforce/schema/Car_Experience__c.Car__c';
import review_Object from '@salesforce/schema/Car_Experience__c';

export default class AddCarReview extends LightningElement {

  reviewTitle = '';
  review = '';
  @api carId;

  titleHandler(event) {
    this.reviewTitle = event.target.value;
  }

  reviewHandler(event) {
    this.review = event.target.value;
  }

  addReviewHandler(event) {
    const fields = {};

    fields[Title.fieldApiName] = this.reviewTitle;
    fields[Experience.fieldApiName] = this.review;
    fields[car_ID.fieldApiName] = this.carId;

    const inputRecord = {
      apiName: review_Object.objectApiName,
      fields
    };

    createRecord(inputRecord).then(() => {
      this.showToast('SUCCESS', 'Review Added Successfully', 'success');
      const reviewAdded = new CustomEvent('reviewadded');
      this.dispatchEvent(reviewAdded);
    }).catch(error => {
      this.showToast('ERROR', error.body.message, 'error');
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

}