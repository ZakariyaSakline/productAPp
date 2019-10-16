import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  constructor() { }

  addTableNewRow:EventEmitter<any>= new EventEmitter();
  productDetail:EventEmitter<any>= new EventEmitter();



  emitTableSubmitEvent(productInfo:any){
    this.addTableNewRow.emit(productInfo);
  }
  getTableUpdateRowEvent(){
    return this.addTableNewRow;
  }






}
