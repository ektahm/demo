import {LightningElement, api} from 'lwc';

export default class DeleteModelPopUp extends LightningElement {
    @api isopenmodel = false;
    @api recordId='';
    

    @api openmodal() {
        console.log('in open model block:');
        this.isopenmodel = true;
    }
    closeModal() {
        this.isopenmodel = false;
    } 

    deleterecord(){
        this.isopenmodel = false;
        const selectEvent = new CustomEvent('deleteevent', {
        });
       this.dispatchEvent(selectEvent);   
        
    }
    
}