import { LightningElement } from 'lwc';
const image_url = 'https://www.google.com/search?q=car+images&rlz=1C1OPNX_enIN1008IN1008&oq=car+image&aqs=chrome.0.0i433i512j69i57j0i131i433i512j0i512l7.6064j0j7&sourceid=chrome&ie=UTF-8#imgrc=OSKdmzb2jX0eMM';
const COLORS = ['red','green','black','blue','white'];
export default class MyResumeComponent extends LightningElement {
    colors = COLORS;
    selectedcolor = this.colors[0];

}