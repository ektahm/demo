import { LightningElement , wire , track} from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccountListnew';
import { updateRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import deleteAccount from '@salesforce/apex/GetAccountList.deleteAccount';

import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import industry from '@salesforce/schema/Account.industry';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
let records;
export default class LightningModal extends LightningElement {
    @track accounts = [];
    @track loader = false;
    @track error = null;
    isEdited;
    recordId;
    refreshTable;
    Industry = '';
    value;
    @track pageSize = 5;
    @track pageNumber = 1;
    @track totalRecords = 0;
    @track totalPages = 0;
    @track recordEnd = 0;
    @track recordStart = 1;
    @track isPrev = true;
    @track isNext = true;

    

    @wire(getAccounts,{pageSize: this.pageSize, pageNumber : this.pageNumber}) 
    wiredAccount(result){
        this.refreshTable = result;
        const { error, data } = result;
        if(data){ 
            console.log('data', data);
            this.accounts = data ;
            this.accounts = data.map((acc)=>
            Object.assign({}, acc, {isEdited:false,value:false})
            );
            console.log('record',this.accounts)
           this.totalRecords = this.accounts.length ;
           console.log('totalrecord',this.totalRecords);
           this.totalPages = Math.round(this.totalRecords / this.pageSize);
           console.log('totalpage',this.totalPages)
           //this. isNext = false;
           this.isNext = (this.pageNumber == this.totalPages || this.totalPages == 0);
            this.isPrev = (this.pageNumber == 1 || this.totalRecords < this.pageSize);
        }
        if(error){
            console.error(error);
        }
    }
    handleNext(){
        this.pageNumber = this.pageNumber+1;
       
       /* if(this.pageNumber == this.totalPages){
            this.isNext = true;
            this.isPrev = false;
        }*/

    }
 
    //handle prev
    handlePrev(){
        this.pageNumber = this.pageNumber-1;
      /*  if(this.pageNumber == this.recordStart){
            this.isPrev = true;
            this.isNext = false;
        }*/
    }
    
   /* @wire(pickListValueDynamically, {customObjInfo: {'sobjectType' : 'Account'},
selectPicklistApi: 'Industry'}) selectTargetValues;*/
@wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountInfo;

    @wire(getPicklistValues,
        {
            recordTypeId: '$accountInfo.data.defaultRecordTypeId',
            fieldApiName: industry
        }
    )
    industryValues;

    sortRecs( event ) {
        let colName = event.target.name;
        console.log( 'Column Name is ' + colName );
        if ( this.sortedColumn === colName ) {
            this.sortedDirection = ( this.sortedDirection === 'asc' ? 'desc' : 'asc' );
        }
        else {
            this.sortedDirection = 'asc';
        }
        let isReverse = this.sortedDirection === 'asc' ? 1 : -1;
        this.sortedColumn = colName;

        // sort the data
        this.accounts = JSON.parse( JSON.stringify( this.accounts ) ).sort( ( a, b ) => {
            a = a[ colName ] ? a[ colName ].toLowerCase() : ''; // Handle null values

            b = b[ colName ] ? b[ colName ].toLowerCase() : '';
            return a > b ? 1 * isReverse : -1 * isReverse;
        });;

    }
    onDoubleClickEdit(e){
        records = this.accounts;
        records.map(item =>{
            if(e.currentTarget.dataset.id == item.Id){
                console.log('item.id',item.Id);
                item.IsEdited = true;
            }else{
                item.IsEdited = false;
            }
        });
        //console.log('change value', e.currentTarget.dataset.id);
        this.accounts = records;
        console.log('onDubleClick:', this.accounts);
        this.isEdited = true;
    }
    handleNameChange(event){
       
        records= this.accounts;
        records.forEach(acc => {
            if(acc.Id === event.target.dataset.id ){
                acc.Name = event.target.value;
            }
            return acc;
        });
        this.accounts = records;
        console.log('records in Handler Name', this.accounts);
    
    }
   handleAccountNumberChange(event){
        records= this.accounts;
        records.forEach(acc => {
            if(acc.Id === event.target.dataset.id ){
                acc.AccountNumber = event.target.value;
            }
            return acc;
        });
        this.accounts = records;
        console.log('records in Handler Name', this.accounts);
    }
   
    handleIndustryChange(event){
        //this.Industry = event.target.value;
        //console.log('industry',this.Industry)
        //console.log(this.template.querySelector('select.slds-select').value);
        records= this.accounts;
        records.forEach(acc => {
            if(acc.Id === event.target.dataset.id){
                //console.log('industry1',this.Industry)
                acc.Industry =  event.target.value;
            }
            return acc;
        });
        this.accounts = records;
        console.log('records in Handler Name', this.accounts);
    }
    
    handlePhoneChange(event){
        records= this.accounts;
        records.forEach(acc => {
            if(acc.Id === event.target.dataset.id ){
                acc.Phone = event.target.value;
            }
            return acc;
        });
        this.accounts = records;
        console.log('records in Handler Name', this.accounts);
    
    }
    handleChange(event) {
        records= this.accounts;
        records.forEach(acc => {
            if(acc.Id === event.target.dataset.id ){
                acc.value = true;
            }
            return acc;
        });
        this.accounts = records;
        console.log('records in Handler Name', this.accounts);
                
    }
    handleDelete(){
        console.log('value',this.accounts)
        this.accounts.forEach(acc => {
            if(acc.value == true ){
                
                    deleteAccount({ accId : acc.Id })
                    .then(result =>{
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: "Success",
                                message: "Record Successfully Deletd",
                                variant:"success"
                            })
                        );
                        
                        return refreshApex(this.refreshTable);
                        
                    })
                    .catch (error => {
                    
                        console.log('in catch',error);
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: "Error!!",
                                message: "Error message",
                                variant:"error"
                            })
                        );
                    })
                    
            }
            
        });
        
    }
    handleUpdate(){
        console.log('inside handleUpdate', this.accounts);
        this.accounts.forEach(acc=>{

            let fields = {Id: acc.Id, Name: acc.Name ,AccountNumber: acc.AccountNumber , Industry: acc.Industry , Phone: acc.Phone};
            let recordInput = { fields };
            console.log('element:', recordInput);

            updateRecord(recordInput)
                .then(result =>{
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Success",
                            message: "Record Successfully Updated",
                            variant:"success"
                        })
                    );
                    this.accounts.map(item =>{
                        item.IsEdited = false;
                        this.isEdited = item.IsEdited;
                    });
                    return refreshApex(this.refreshTable);
                    
                })
                .catch (error => {
                   
                    this.error = error;
                    console.log('in catch',this.error);
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Error!!",
                            message: "Error message",
                            variant:"error"
                        })
                    );
                })
        })
    }
   
    handleCancle(){
        this.accounts.map(item =>{                                                   
            item.IsEdited = false;
            item.value = false;
            this.isEdited = item.IsEdited;
            this.value = item.value;
        })
        console.log('value',this.value);
        console.log('value',this.accounts);
        return refreshApex(this.refreshTable);
    }
}