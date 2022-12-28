import { LightningElement, wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import REVENUE_FIELD from '@salesforce/schema/Contact.LastName';
import INDUSTRY_FIELD from '@salesforce/schema/Contact.Email';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { reduceErrors } from 'c/ldsUtils';
const COLUMNS = [
    { label: 'First Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Last Name', fieldName: REVENUE_FIELD.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: INDUSTRY_FIELD.fieldApiName, type: 'email' }
];
export default class contactList extends LightningElement {
    columns = COLUMNS;
    errors;
    @wire(getContacts)
    contacts;

    get errors() {
        return (this.contacts.error) ?
            reduceErrors(this.contacts.error) : [];
    }
}    