import { LightningElement } from 'lwc';

export default class InputProgressBar extends LightningElement {
    
    progress(event){
        const custEvent = new CustomEvent(
            'callpasstoparent', {
                detail: event.target.value 
            });

            if(event.target.value > 100){
                alert('value is gratter.Value Is '+event.target.value);
                event.target.value = null;
                    
            }
        this.dispatchEvent(custEvent);
    }
}