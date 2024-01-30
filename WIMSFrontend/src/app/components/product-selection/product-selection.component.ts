import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-selection',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-selection.component.html',
  styleUrl: './product-selection.component.css'
})
export class ProductSelectionComponent implements OnInit{
  productSelectionForm!: FormGroup;
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
    console.log("1");
  }

  ngOnInit(): void {
    this.productSelectionForm = this.formBuilder.group({
      productId: [''],
      amount: ['']
    });
  }
  showLabel = false;
  onSubmit(): void {
    const productId = this.productSelectionForm.get('productId')?.value;
    const amount = this.productSelectionForm.get('amount')?.value;

    this.http.post('http://localhost:8080/warehouse/selectProduct', { productId, amount }, {observe: "response"}).subscribe(
      response => {
        console.log(response.body);
        if(response.ok) {
          this.showLabel = true;
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
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
