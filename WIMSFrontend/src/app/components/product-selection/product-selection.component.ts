import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

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
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    console.log("1");
  }

  ngOnInit(): void {
    this.productSelectionForm = this.formBuilder.group({
      productId: [''],
      storageLocation: ['']
    });
  }

  onSubmit(): void {
    const productId = this.productSelectionForm.get('productId')?.value;
    const storageLocation = this.productSelectionForm.get('storageLocation')?.value;

    this.http.post('http://localhost:8080/warehouse/selectProduct', { productId, storageLocation }).subscribe(
      response => {
        console.log('Success', response);
      },
      error => {
        console.log('Error', error);
      }
    );
  }
}
