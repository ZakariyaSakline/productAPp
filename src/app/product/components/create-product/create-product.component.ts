import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ShareDataService } from '../../../services/share-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventEmitterService} from '../../../services/event-emitter.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  signupForm: FormGroup;
  localJsonData;
  constructor(
    private _formbilder: FormBuilder,
    private _shareDataService: ShareDataService,
    private _snackBar: MatSnackBar,
    public _dialogRef: MatDialogRef<CreateProductComponent>,
    private _eventEmitterService:EventEmitterService

  ) { }


  EmployeeInputData(): void {
    this.signupForm = this._formbilder.group({
      productCode: ['', Validators.required],
      productName: ['', Validators.required],
      productBrand: ['', Validators.required],
      productPrice: ['', Validators.required],
      productDescription: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.EmployeeInputData();
  }

  productSubmit(signupForm: any): any {
    this.getEmployeeInputData(signupForm);
    // this.resetFrom();
  }

  getEmployeeInputData(signupForm: any): any {
    this.localJsonData=this._shareDataService.getLocalProduct();
    let data = {
      'productCode': signupForm.controls.productCode.value,
      'productName': signupForm.controls.productName.value,
      'productBrand': signupForm.controls.productBrand.value,
      'productPrice': signupForm.controls.productPrice.value,
      'productDescription': signupForm.controls.productDescription.value
      }
    this.localJsonData.push(data);
    this._eventEmitterService.emitTableSubmitEvent(this.localJsonData);
    localStorage.setItem('ProductInfo', JSON.stringify(this.localJsonData));
}

  // for snackbar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  onNoClick(): void {
    this._dialogRef.close();
  }


}
