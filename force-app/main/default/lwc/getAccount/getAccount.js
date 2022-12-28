/*import { LightningElement, track, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from "@salesforce/apex";
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class GetAccount extends LightningElement {
    @track data;
    @track columns = [{label: 'Name' , fieldName: 'Name' , type: 'text' , editable: true},
                    {label: 'Phone' , fieldName: 'Phone' , type: 'phone', editable: true}];

    @wire (getAccountList) 
    accountRecord({error,data}){
        if(data){
            this.data =  data;
        }
        else if(error){
            this.data = 'undefined';
        } 
        
    } ;
    handleSave(event) {
        const recordInputs = event.detail.draftValues.slice().map(draft => {
          const fields = Object.assign({}, draft);
          return { fields };
        });
    
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises)
          .then(accounts => {
            this.showToast("Success", "Accounts Updated", "success");
            // Clear all draft values
            this.draftValues = [];
            // Display fresh data in the datatable
            return refreshApex(accounts);
          })
          .catch(error => {
            this.showToast("Error", error.body.message, "error");
          });
    }
    
      showToast(title, message, variant) {
        const evt = new ShowToastEvent({
          title: title,
          message: message,
          variant: variant
        });
        this.dispatchEvent(evt);
      }
    
   
              
}*/
import { LightningElement, wire, api } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccountList';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FIRSTNAME_FIELD from '@salesforce/schema/Account.Name';

import PHONE_FIELD from '@salesforce/schema/Account.Phone';

import ID_FIELD from '@salesforce/schema/Account.Id';

const COLS = [
    {
        label: 'Name',
        fieldName: FIRSTNAME_FIELD.fieldApiName,
        editable: true
    },
   
    {
        label: 'Phone',
        fieldName: PHONE_FIELD.fieldApiName,
        type: 'phone',
        editable: true
    }
];
export default class getAccount extends LightningElement {
    @api recordId;
    columns = COLS;
    draftValues = [];

    @wire(getAccounts)
    accounts;

    async handleSave(event) {
        // Convert datatable draft values into record objects
        const records = event.detail.draftValues.slice().map((draftValue) => {
            const fields = Object.assign({}, draftValue);
            return { fields };
        });

        // Clear all datatable draft values
        this.draftValues = [];

        try {
            // Update all records in parallel thanks to the UI API
            const recordUpdatePromises = records.map((record) =>
                updateRecord(record)
            );
            await Promise.all(recordUpdatePromises);

            // Report success with a toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Accounts updated',
                    variant: 'success'
                })
            );

            // Display fresh data in the datatable
            await refreshApex(this.accounts);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or reloading contacts',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }
}


