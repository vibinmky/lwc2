import {
  LightningElement
} from 'lwc';

export default class FamilyMembers extends LightningElement {
  family = [{
      Name: "Baskaran",
      Title: "Father",
      Attitude: "Calm"
    },
    {
      Name: "Gnana Pappa",
      Title: "Mother",
      Attitude: "Love"
    },
    {
      Name: "Stalin",
      Title: "Brother",
      Attitude: "Wise"
    },
    {
      Name: "Me",
      Title: "Me",
      Attitude: "Yet to find"
    }
  ]
}