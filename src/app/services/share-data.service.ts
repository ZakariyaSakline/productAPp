import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }

  getLocalProduct():any{
    let localParseArray = JSON.parse(localStorage.getItem('ProductInfo'));
      if (localParseArray) {
        return localParseArray;
      } else {
        return [];
        }
   }
  


}
