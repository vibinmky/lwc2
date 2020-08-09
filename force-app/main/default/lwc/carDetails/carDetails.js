import {
  LightningElement,
  wire
} from 'lwc';
import {
  getRecord
} from 'lightning/uiRecordApi';
import {
  registerListener,
  unregisterAllListeners
} from 'c/pubsub';
import {
  CurrentPageReference
} from 'lightning/navigation';
import carId from '@salesforce/schema/Car__c.Id';
import carName from '@salesforce/schema/Car__c.Name';
import carMileage from '@salesforce/schema/Car__c.Mileage__c';
import carPer_Day_Rent from '@salesforce/schema/Car__c.Per_Day_Rent__c';
import carBuild_Year from '@salesforce/schema/Car__c.Build_Year__c';
import carPicture from '@salesforce/schema/Car__c.Picture__c';
import carContactName from '@salesforce/schema/Car__c.Contact__r.Name';
import carContactEmail from '@salesforce/schema/Car__c.Contact__r.Email';
import carContactPhone from '@salesforce/schema/Car__c.Contact__r.Phone';
import carTypeName from '@salesforce/schema/Car__c.Car_Type__r.Name';


const fields = [
  carId,
  carName,
  carMileage,
  carPer_Day_Rent,
  carBuild_Year,
  carPicture,
  carContactName,
  carContactEmail,
  carContactPhone,
  carTypeName
];

export default class CarDetails extends LightningElement {

  carId;
  selectedTab;

  @wire(CurrentPageReference) pageRef;

  @wire(getRecord, {
    recordId: '$carId',
    fields
  })
  car;

  selectedTabHandler(event) {
    this.selectedTab = event.target.value;
  }

  connectedCallback() {
    registerListener('carselect', this.callBackMethod, this)
  }

  callBackMethod(payload) {
    this.carId = payload;
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
  }

  reviewAddedHandler() {
    const carReviewComponent = this.template.querySelector('c-car-reviews');
    if (carReviewComponent) {
      carReviewComponent.carExperienceMethod();
    }
    this.selectedTab = 'viewreviewtab';
  }

  get carFound() {
    if (this.car.data) {
      return true;
    }
    return false;
  }
}