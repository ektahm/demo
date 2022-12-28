import { LightningElement, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import getCases from '@salesforce/apex/AccountContactController.getCases';
import getOpps from '@salesforce/apex/AccountContactController.getOpps';

export default class MySubscriberOne extends LightningElement {
//Get current page reference, wire it with imported variable.
@wire(CurrentPageReference) pageRef;
@track data = [];
@track error;
@track accountId;

connectedCallback() {
	// subscribe to eventdetails event
	
    registerListener("pubsubevent", this.oppDetails, this);
}
 
disconnectedCallback() {
	// unsubscribe from eventdetails event
	unregisterAllListeners(this);
}


oppDetails(accountId){
	this.accountId = accountId;
	//call wire method once accoundId is fetched.
	this.opp();
}

//Pass accountId to apex & fetch case details 


@wire(getOpps, {accountId: '$accountId'})
opp(result) {
	if (result.data) {
		this.data = result.data;
		this.error = undefined;

	} else if (result.error) {
		this.error = result.error;
		console.log('error: '+error);
		this.data = undefined;
	}
}
}