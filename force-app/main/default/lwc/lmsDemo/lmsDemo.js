import {
  LightningElement,
  track,
  wire
}
from 'lwc';
import msgService from '@salesforce/messageChannel/lmsDemoChannel__c';

import {
  MessageContext,
  publish,
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE
} from 'lightning/messageService';
import hasAccess from "@salesforce/customPermission/send_button";


export default class LmsDemo extends LightningElement {

  @track messages = [];
  @wire(MessageContext) msgContext;

  subscription = null;

  connectedCallback() {
    if (!this.subscription) {
      this.subscription = subscribe(this.msgContext, msgService, (msg) => {
        this.msgHandler(msg);
      });
    }
  }

  disconnectedCallback() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  addMessage() {
    const inputElement = this.template.querySelector("lightning-input");
    const msg = inputElement.value;
    this.messages.push({
      id: this.messages.length,
      value: msg,
      from: "LWC"
    });
    //publish message
    const messagePayload = {
      message: msg,
      from: "LWC"
    };

    publish(this.msgContext, msgService, messagePayload);

    inputElement.value = '';
  }

  msgHandler(msg) {

    if (msg.from !== 'LWC') {
      this.messages.push({
        id: this.messages.length,
        value: msg.message,
        from: "AURA"
      });
    }
  }

  get isDisable() {
    return !hasAccess;
  }
}