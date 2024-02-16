import {Component, OnInit} from '@angular/core';
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatTable} from "@angular/material/table";
import {ProductService} from "../../services/product.service";
import {CommonModule, NgIf} from "@angular/common";
import * as console from "console";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    MatTable,
    CommonModule,
    NgIf,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: any = [];
  constructor(private productService: ProductService) {
  }
  private getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
          this.products = response;
        },
        (error) => {
          console.error('Error fetching products: ', error)
        })
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  pickProduct(productId: any) {
    
  }

  storeProduct(productId: any) {
    
  }

  deleteProduct(productId: any) {
    
  }
}
