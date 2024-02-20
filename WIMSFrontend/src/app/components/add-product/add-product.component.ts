import {Component, OnInit} from '@angular/core';
import {Product} from "../../entities/Product";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {HttpClient} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ProductsComponent} from "../products/products.component";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  product!: Product;
  productId!: string;
  productName!: string;
  productAddForm!: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private productService: ProductService, private router: Router, public dialogRef: MatDialogRef<AddProductComponent>, private matSnackBar: MatSnackBar) {}

  ngOnInit(): void {
        this.productAddForm = this.formBuilder.group({
          productId: [''],
          productName: [''],
          imageUrl: ['']
        })
    }

  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const productId = this.productAddForm.get('productId')?.value;
    const productName = this.productAddForm.get('productName')?.value;
    let imageUrl = this.productAddForm.get('imageUrl')?.value;

    if (imageUrl == '') {
      imageUrl = 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg';
    }

    this.http.post('http://localhost:8080/warehouse/addProduct', {productId, productName, imageUrl }, { observe: "response" }).subscribe(
        response => {
          console.log(response.body);
          if (response.ok) {
            this.openSnack("Add request sent", "Okay");
            this.onNoClick();
          }
        },
        error => {
          console.log('Error', error.message);
        }
    )

    //this.addProduct(this.product);
  }

  openSnack(message: string, action: string): void {
    this.matSnackBar.open(message, action, {
      duration: 3000,
    })
  }
}
