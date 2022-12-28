import { LightningElement ,wire} from 'lwc';
import { subscribe, MessageContext} from 'lightning/messageService';
import COUNTING_UPDATE_CHANNEL from "@salesforce/messageChannel/countingUpdateMessageChannel__c";
export default class Subscriber extends LightningElement {

    counter = 0;
    subscription = null;
    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscribeToMessageChannel();
    }
    subscribeToMessageChannel(){
        this.subscription = subscribe(this.messageContext,
                                      COUNTING_UPDATE_CHANNEL,
                                      (message) => this.handleMessage(message)
                                      );
    }
    handleMessage(message){
        //console.log('message',message);
      //  alert("message:"+JSON.stringify(message));

        if(message.operator == 'Add'){
            this.counter += message.constant;
        }
        if(message.operator == 'subtract'){
            this.counter -= message.constant;
        }
        if(message.operator == 'multiply'){
            this.counter *= message.constant;
        }
    }
}