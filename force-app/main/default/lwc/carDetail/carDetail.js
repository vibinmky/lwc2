import {
  LightningElement,
  api
} from 'lwc';
import {
  NavigationMixin
} from 'lightning/navigation';

export default class CarDetail extends NavigationMixin(LightningElement) {

  @api car;
  fullDetails() {
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: this.car.data.fields.Id.value,
        objectApiName: 'Car__c', // objectApiName is optional
        actionName: 'view'
      },
    });
  }


  get carName() {
    try {
      return this.car.data.fields.Name.value;
    } catch (error) {
      return 'NA';
    }
  }

  get carMileage() {
    try {
      return this.car.data.fields.Mileage__c.value;
    } catch (error) {
      return 'NA';
    }
  }

  get carPer_Day_Rent() {
    try {
      return this.car.data.fields.Per_Day_Rent__c.value;
    } catch (error) {
      return 'NA';
    }
  }

  get carBuild_Year() {
    try {
      return this.car.data.fields.Build_Year__c.value;
    } catch (error) {
      return 'NA';
    }
  }

  get carPicture() {
    try {
      return this.car.data.fields.Picture__c.value;
    } catch (error) {
      return 'NA';
    }
  }

  get carContactName() {
    try {
      return this.car.data.fields.Contact__r.value.fields.Name.value;
    } catch (error) {
      return 'NA';
    }
  }


  get carTypeName() {
    try {
      return this.car.data.fields.Car_Type__r.value.fields.Name.value;
    } catch (error) {
      return 'NA';
    }
  }
}