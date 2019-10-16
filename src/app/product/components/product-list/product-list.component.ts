import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateProductComponent} from '../create-product/create-product.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator} from '@angular/material';
import { ShareDataService } from '../../../services/share-data.service';
import { EventEmitterService} from '../../../services/event-emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  jasonData;
  displayedColumns;
  dataSource;

  constructor(
    public _dialog: MatDialog,
    private _shareDataService:ShareDataService,
    private _eventEmitterService:EventEmitterService,
    private _router:Router
  ) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.jasonData= this._shareDataService.getLocalProduct();
    this.displayedColumns= ['productCode','productName', 'productBrand','productPrice','productDescription', 'productEdit','productDelete'];
    this.dataSource = new MatTableDataSource(this.jasonData);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this._eventEmitterService.getTableUpdateRowEvent().subscribe(newProductInfo=>{
      this.reloadTableForAddRow(newProductInfo);
    });
  }

  openAddProductDialog(): void {
    const dialogRef = this._dialog.open(CreateProductComponent, {
      width: '650px',height:'600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The AddEmployee dialog was closed');
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadTableForAddRow(newProductInfo){
    this.jasonData= newProductInfo;
    this.displayedColumns= ['productCode','productName', 'productBrand','productPrice','productDescription', 'productEdit','productDelete'];
    this.dataSource = new MatTableDataSource(this.jasonData);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  detailProduct(x){
    this._router.navigate([`/Product/${x.productCode}`],
    );
  }

}
