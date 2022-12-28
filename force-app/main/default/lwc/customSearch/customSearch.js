import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { refreshApex } from '@salesforce/apex';
// import { fireEvent, registerListener, unregisterAllListeners } from 'c/pubsub';
import { publish, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';
import getAccountList2 from '@salesforce/apex/DataController.getAccount';
import addAccount from '@salesforce/apex/GetAccountList.addAccount';
import getAccountList from '@salesforce/apex/GetAccountList.getAccount';
import deleteAccount from '@salesforce/apex/GetAccountList.deleteAccount';
import getAccountSearch from '@salesforce/apex/GetAccountList.getAccountSearch';


   
    const actions = [
        { label: 'Edit', name: 'Edit' },
        { label: 'Delete', name: 'Delete' },
        

    ];
    const cols = [
        {label: 'Name', fieldName: 'Name', type: 'text', sortable: "true", wrapText: true },
        {label: 'Website', fieldName: 'Website', type: 'url', sortable: "true", wrapText: true },
        {label: 'BillingCity', fieldName: 'BillingCity', type: 'text', sortable: "true", wrapText: true },
        {label: 'Phone', fieldName: 'Phone', type: 'phone', sortable: true, wrapText: "true" },
        {label: 'Edit', type: "button", typeAttributes: {
            label: 'Edit',
            name: 'Edit',
            title: 'Edit',
            disabled: false,
            value: 'edit',
            iconPosition: 'left'
        }},
        {label: 'Delete', type: "button", typeAttributes: {
            label: 'Delete',
            name: 'Delete',
            title: 'Delete',
            disabled: false,
            value: 'delete',
            iconPosition: 'left'
        }},
    
    ];
    
export default class accountDataTable extends LightningElement {
    @api lstAccount= [];
   @api currentpage;
   @api startpage;
    @api account;
    @track columns  = cols;
    @track startPage = 0;
    @track endPage;
    @api accountId=''; 
    refreshTable;
    searchKey = '';
    @api record;
    @track visible = false;
    @track openmodel = false;
    @track filterVal='';
    @track allData=[];
    accId='';
    @track filterVisible= false;
    @track sortBy;
    @track sortDirection;
    @track error;
    recordName='';
    
    @wire(getAccountSearch, { searchKey: '$searchKey' }) 
    wiredAccount(result){
        this.refreshTable = result;
        const { error, data } = result;
        if(data){ 
            console.log('data', data);
            this.lstAccount = data ;
        }
        if(error){
            console.error(error)
        }
    }
    handelSearchKey(event){
        this.searchKey = event.target.value;
       this.currentpage = 1;
       console.log('startpage',this.startPage);
    }
    doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortlstAccount(this.sortBy, this.sortDirection);
    }

    sortlstAccount(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.lstAccount));
        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1: -1;
        // sorting data
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });
        this.lstAccount = parseData;
    } 
    updateDataHandler(event) {
        this.account=[...event.detail.records]
        console.log(JSON.parse(JSON.stringify(event.detail.records)))
        console.log(JSON.parse(JSON.stringify(this.account)))
       console.log('current',event.detail.currentpage)
       this.currentpage = event.detail.currentpage;
       this.startpage = event.detail.startpage;

    }
    @wire(MessageContext)
    messageContext;

    async handleAccountAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.record = row;
        this.accountId= this.record.Id;
        console.log('record id', this.accountId);
        console.log('handleAccountAction', JSON.parse(JSON.stringify(this.record)));

        switch (actionName) {
            case 'Delete':
                this.template.querySelector('c-delete-model-pop-up').openmodal();
                break;
            case 'Edit':
                this.template.querySelector('c-model-pop-up').openmodal();
                break;
            default:
        }
        console.log('account testing',this.accountId);
    }
    handleRefresh(){
        const evnt = new ShowToastEvent({
            title: "Success!",
            message: 'Record Updated',
            variant:'success',
        });
        console.log('event', evnt);
        this.dispatchEvent(evnt);
        refreshApex(this.refreshTable);
    }
    handleDelete(){
            console.log('delete popup1',this.accountId);
            
            deleteAccount({ accId : this.accountId })
                .then(() =>{
                        const toastEvent = new ShowToastEvent({
                            title:'Record Deleted',
                            message:'Record deleted successfully',
                            variant:'success',
                        })
                            this.dispatchEvent(toastEvent);
                            refreshApex(this.refreshTable);
                })
                .catch(error => { 
                    window.console.log('Error ==> '+JSON.stringify(error));

                    const showError = new ShowToastEvent({
                        title: 'Error deleting record',
                        message:  'Deletion Failed',
                        variant: 'error'
                    });
                    this.dispatchEvent(showError); 
                });
        }
}

