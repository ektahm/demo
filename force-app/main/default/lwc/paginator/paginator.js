import { LightningElement, api } from 'lwc';

export default class Pagination extends LightningElement {
    currentPage =1;
    totalRecords;
    @api recordSize = 9;
    totalPage = 0;
    visibleRecords;
    get records(){
        return this.visibleRecords
    }
    @api 
    set records(data){
        if(data){ 
            this.totalRecords = data
            this.recordSize = Number(this.recordSize)
            this.totalPage = Math.ceil(data.length/this.recordSize)
            this.updateRecords()
        }
    }

    get disablePrevious(){ 
        return this.currentPage<=1
    }
    get disabletwo(){ 
        return this.currentPage == 2
    }
    
    get disableNext(){ 
        return this.currentPage>=this.totalPage
    }
    previousHandler(){ 
        if(this.currentPage>1){
            this.currentPage = this.currentPage-1
            this.updateRecords()
        }
    }
    firstHandler(){ 
            this.currentPage = 1
            this.updateRecords()
    }
    lastHandler(){ 
            this.currentPage = this.totalPage
            this.updateRecords()
    }
    CenterHandler(){ 
            this.currentPage = Math.round(this.totalPage / 2)
            this.updateRecords()
    }
    nextHandler(){
        if(this.currentPage < this.totalPage){
            this.currentPage = this.currentPage+1
            this.updateRecords()
        }
    }
    updateRecords(){ 
        const start = (this.currentPage-1)*this.recordSize
        const end = this.recordSize*this.currentPage
        this.visibleRecords = this.totalRecords.slice(start, end)
        this.dispatchEvent(new CustomEvent('update',{ 
            detail:{ 
                records:this.visibleRecords,
                currentpage: this.currentPage,
                startpage : this.start
            }
        }))
    }
}