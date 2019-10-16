import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareDataService} from '../../../services/share-data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product;
  rowProduct = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _shareDataService:ShareDataService
  ) { }

  ngOnInit() {

    this._activatedRoute.paramMap.subscribe(params => {
      this.product = params.get('productCode');
    });

    this.productDataInfo(this.product);


}


productDataInfo(product):any{
  debugger;
  let dataTable=this._shareDataService.getLocalProduct();
    for(let i=0; i<dataTable.length; i++){
      if(dataTable[i].productCode == product){
         this.rowProduct.push(dataTable[i]);
    }
  }
}



}
