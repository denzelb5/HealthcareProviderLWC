import { LightningElement, track } from 'lwc';

export default class ProviderView extends LightningElement {
  @track searchTerm;
  @track ipdSearchTerm;
  @track searchInput;
  @track ipdSearchInput;
  @track searchComplete = false;
  @track ipdSearchComplete = false;
  

  handleNewSearch(event) {
    this.searchTerm = event.target.value;
  }

  handleNewIpdSearch(event) {
    this.ipdSearchTerm = event.target.value;
  }

  handleSearchComplete(event) {
    this.searchInput = event.detail;
    this.searchComplete = true;
  }

  handleIpdSearchComplete(event) {
    this.ipdSearchInput = event.detail;
    this.ipdSearchComplete  = true;
  }
}