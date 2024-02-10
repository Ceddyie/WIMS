import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {WebSocketAPI} from "../../WebSocketAPI";
import {ProductSelectionDialogComponent} from "../product-selection-dialog/product-selection-dialog.component";


@Component({
  selector: 'app-product-selection',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-selection.component.html',
  styleUrl: './product-selection.component.css'
})
export class ProductSelectionComponent implements OnInit, OnDestroy {
  productSelectionForm!: FormGroup;
  webSocketAPI!: WebSocketAPI;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private _matDialog: MatDialog) {
    console.log("1");
  }

  ngOnInit(): void {
    this.productSelectionForm = this.formBuilder.group({
      productId: [''],
      amount: ['']
    });
    this.webSocketAPI = new WebSocketAPI(new ProductSelectionComponent(this.http, this.formBuilder, this._snackBar, this._matDialog))
    this.connect();
  }
  ngOnDestroy() {
    this.webSocketAPI._disconnect();
  }

  connect() {
    this.webSocketAPI._connect();
  }

  onSubmit(): void {
    const productId = this.productSelectionForm.get('productId')?.value;
    const amount = this.productSelectionForm.get('amount')?.value;

    this.http.post('http://localhost:8080/warehouse/selectProduct', { productId, amount }, {observe: "response"}).subscribe(
        response => {
          console.log(response.body);
          if(response.ok) {
            this.openSnackBar("Request sent", "Okay");
            this.productSelectionForm.reset();
          }
        },
        error => {
          console.log('Error', error.message);
        }
    );
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  openDialog(message: string) {
    const dialogRef = this._matDialog.open(ProductSelectionDialogComponent, {
      width: '250px',
      data: message
    });
  }

  private _openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: "top",
    });
  }

  /*handleMessage(message: string) {
    console.log("Message received: " + message)
    this.openDialog(message);
  }*/
}
