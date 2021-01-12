import { LightningElement, track, wire } from 'lwc';
import searchIPDProviders from "@salesforce/apex/IPDProviderSearchController.searchIPDProviders";
import { NavigationMixin } from 'lightning/navigation';

const DELAY = 350;

const COLS1 = [
    {
      label: "First Name",
      fieldName: "First_Name__c",
      type: "text"
    },
    {
      label: "Last Name",
      fieldName: "Last_Name__c",
      type: "text"
    },
    {
      label: "Gender",
      fieldName: "Gender__c",
      type: "text"
    },
    {
      label: "NPI Number",
      fieldName: "NpiNumber__c",
      type: "text"
    },
    {
      label: "Specialty",
      fieldName: "Spec__c",
      type: "text"
    },
    {
      label: "Type",
      fieldName: "Type__c",
      type: "text"
    },
    {
      label: "View",
      type: "button-icon",
      initialWidth: 75,
      typeAttributes: {
        title: "View Details",
        alternativeText: "View Details",
        iconName: "action:info"
      }
    }
  ];

export default class IpdProviderList extends LightningElement {
  @track ipdProviders = [];
  @track ipdSearchTerm;
  @track error;
  @track cols = COLS1;

  handleIpdSearchTermChange(event) {
      this.ipdSearchTerm = event.target.value;
      if (this.ipdProviders) {
          const selectedEvent = new CustomEvent('newsearch', {detail: this.ipdSearchTerm});
          window.clearTimeout(this.delayTimeout);
          this.delayTimeout = setTimeout(() => {
              this.dispatchEvent(selectedEvent);
          }, DELAY)
      }
  }

  @wire(searchIPDProviders, {
    ipdSearchTerm: "$ipdSearchTerm"
  })
  loadIPDProviders({ error, data }) {
    if (data) {
      this.ipdProviders = data;
      const selectedEvent = new CustomEvent("searchcomplete", {
        detail: this.ipdSearchTerm
      });
      this.dispatchEvent(selectedEvent);
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.ipdProviders = undefined;
    }
  }

  handleIpdRowAction(event) {
    const row = event.detail.row;
    this.record = row;
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: row.Id,
            actionName: 'view',
        },
    });
}

//   ipdProviders = [
//       {
//           "Id": "1",
//           "FirstName": "Mike",
//           "LastName": "Williams",
//           "NpiNumber": "1234567891",
//           "Gender": "Male",
//           "Specialty": "Chiropractor",
//           "Type": "Chiropractor"
//       },
//       {
//           "Id": "2",
//           "FirstName": "Michelle",
//           "LastName": "Wilson",
//           "NpiNumber": "1234567892",
//           "Gender": "Female",
//           "Specialty": "Clinical Neurophysiology",
//           "Type": "Clinical Medical Laboratory"
//       },
//       {
//           "Id": "3",
//           "FirstName": "Steve",
//           "LastName": "Ladd",
//           "NpiNumber": "1234567893",
//           "Gender": "Male",
//           "Specialty": "Dental",
//           "Type": "Dentist"
//       }

//   ];
}