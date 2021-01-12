import { LightningElement, track, wire, api } from 'lwc';
import searchProviders from "@salesforce/apex/ProviderSearchController.searchProviders";
import { NavigationMixin } from 'lightning/navigation';


const DELAY = 350;

const COLS = [
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

export default class ProviderList extends LightningElement {
  @track providers = [];
  @track searchTerm;
  @track error;
  @track cols = COLS;

  handleSearchTermChange(event) {
      this.searchTerm = event.target.value;
      if (this.providers) {
          const selectedEvent = new CustomEvent('newsearch', {detail: this.searchTerm});
          window.clearTimeout(this.delayTimeout);
          this.delayTimeout = setTimeout(() => {
              this.dispatchEvent(selectedEvent);
          }, DELAY)
      }
  }

  @wire(searchProviders, {
    searchTerm: "$searchTerm"
  })
  loadProviders({ error, data }) {
    if (data) {
      this.providers = data;
      const selectedEvent = new CustomEvent("searchcomplete", {
        detail: this.searchTerm
      });
      this.dispatchEvent(selectedEvent);
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.providers = undefined;
    }
  }

    handleRowAction(event) {
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
}