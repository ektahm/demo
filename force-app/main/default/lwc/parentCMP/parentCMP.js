import { LightningElement,track } from 'lwc';

export default class ParentCMP extends LightningElement {
    @track searchvalue;
    handlesearchvalue(event){
        this.searchvalue = event.detail;
       
    }
}