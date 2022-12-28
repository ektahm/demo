import { LightningElement , api } from 'lwc';

export default class Childapexhours extends LightningElement {
    @api message;
    @api

    Childcomp(name){
        alert(name);
        this.message = name;

    }

    handleClick(){
        const event = new CustomEvent('btnclick', {
            detail: { 
                key: '001EK',
                value : 'Apex Hours'
             }
        });
        this.dispatchEvent(event);
    }
}