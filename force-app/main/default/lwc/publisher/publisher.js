import { LightningElement , wire} from 'lwc';
import { publish,MessageContext} from 'lightning/messageService';
import COUNTING_UPDATE_CHANNEL from "@salesforce/messageChannel/countingUpdateMessageChannel__c";

export default class Publisher extends LightningElement {

    @wire(MessageContext)
    messageContext;

    handleIncrement(){
        const payload = {
            operator: 'Add',
            constant: 1
        };
        console.log('payload',payload);
        publish(this.messageContext,COUNTING_UPDATE_CHANNEL,payload);
        }
    
    handleDecrement(){
        const payload = {
            operator: 'subtract',
            constant: 1
        };    
        publish(this.messageContext,COUNTING_UPDATE_CHANNEL,payload);
    }
    handleMultiply(){
        const payload = {
            operator: 'multiply',
            constant: 2
        }; 
        publish(this.messageContext,COUNTING_UPDATE_CHANNEL,payload);   
    }
}