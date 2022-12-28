
import { LightningElement, track,wire} from 'lwc';

// Importing Apex Class method
import saveAccount from '@salesforce/apex/LWCExampleController.saveAccountRecord';

// importing to show toast notifictions
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

// importing Account fields
import NAME_FIELD from '@salesforce/schema/Account.Name';
import Phone_FIELD from '@salesforce/schema/Account.Phone';
import Industry_FIELD from '@salesforce/schema/Account.Industry';
import Type_FIELD from '@salesforce/schema/Account.Type';
import { NavigationMixin } from 'lightning/navigation';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import industry from '@salesforce/schema/Account.industry';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
 
 

export default class helloworld extends NavigationMixin(LightningElement) {
    Industry = '';
    @track error;

    // this object have record information
    @track accRecord = {
        Name : NAME_FIELD,
        Industry : Industry_FIELD,
        Phone : Phone_FIELD,
        Type : Type_FIELD
    };
    @track picklistVal;

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountInfo;

    @wire(getPicklistValues,
        {
            recordTypeId: '$accountInfo.data.defaultRecordTypeId',
            fieldApiName: industry
        }
    )
    industryValues;

    handleNameChange(event) {
        this.accRecord.Name = event.target.value;
        window.console.log('Name ==> '+this.accRecord.Name);
    }

    handlePhoneChange(event) {
        this.accRecord.Phone = event.target.value;
        window.console.log('Phone ==> '+this.accRecord.Phone);
    }

    handleTypeChange(event) {
        this.accRecord.Type = event.target.value;
        window.console.log('Type ==> '+this.accRecord.Type);
    }

    handleIndustryChange(event) {
        this.picklistVal = event.target.value;
        this.accRecord.Industry = this.picklistVal;
    window.console.log('Industry ==> '+this.accRecord.Industry);
    }

/*    selectOptionChanveValue(event){       
        this.picklistVal = event.target.value;
        this.accRecord.Industry = event.target.value;
    } */


    handleSave() {
        console.log('create data',this.accRecord);
        let editedid = this.recordId;
        console.log('id',editedid);
        saveAccount({objAcc: this.accRecord})
        .then(result => {
            // Clear the user enter values
            this.accRecord = {};
            
            window.console.log('result ===> '+result);
            // Show success messsage
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: 'Account Created Successfully!!',
                variant: 'success'
            })
            );
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'Account',
                    actionName: 'home'
                },
            });
        })
        
        .catch(error => {
            this.error = error.message;
        });
    }
}