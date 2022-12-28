import { LightningElement } from 'lwc';

export default class Parentapexhours extends LightningElement {
    //message = 'Tesing Message';

    handleClick(){
        this.message = 'I am FRom Parent';
        this.template.querySelector('c-childapexhours').Childcomp(this.message);
    }

    handleEvent(event){
        let key = event.detail.key;
        let value = event.detail.value;
        this.message = key+' + '+value;
        alert(this.message);
    }
}
