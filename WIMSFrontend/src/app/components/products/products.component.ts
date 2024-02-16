import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatTable} from "@angular/material/table";
import {ProductService} from "../../services/product.service";
import {CommonModule, NgIf} from "@angular/common";
import * as console from "console";
import {Router, RouterLink} from "@angular/router";
import {Product} from "../../entities/Product";
import {FormsModule} from "@angular/forms";
import {ProductPipe} from "../../product.pipe";
import {compare, SortableHeaderDirective, SortEvent} from "../../sortable-header.directive";
import {of} from "rxjs";

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
    MatCellDef,
    RouterLink,
    FormsModule,
    ProductPipe,
    SortableHeaderDirective
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: any = [];
  filter!: string;
  filteredProducts: Product[] = [];
  data: Array<Product> = this.products;

  @ViewChildren(SortableHeaderDirective)
  headers!: QueryList<SortableHeaderDirective>;

  constructor(private productService: ProductService, private router: Router) {
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
    this.filteredProducts = this.products;
  }

  pickProduct(productId: any) {
    this.router.navigate(['selectProduct', productId])
  }

  storeProduct(productId: any) {
    
  }

  deleteProduct(productId: any) {
    
  }

  addProduct() {

  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '' || column === '') {
      this.filteredProducts = [...this.data];
    }
    else {
      this.filteredProducts = [...this.data].sort((a,b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  protected readonly of = of;
}
