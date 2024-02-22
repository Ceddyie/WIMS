import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ProductPipe} from "../../utils/product.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SortableHeaderDirective} from "../../utils/sortable-header.directive";
import {ProductService} from "../../services/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    NgForOf,
    ProductPipe,
    ReactiveFormsModule,
    SortableHeaderDirective,
    FormsModule,
    NgIf,
    MatCheckbox,
    MatIcon,
    NgClass,
    MatSlideToggle
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  orders: any = [];
  checkColor: string = 'red-cross';
  hideShipped: boolean = true;

  constructor(private productService: ProductService, private matSnackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
        this.getAllProducts();
  }

  private getAllProducts() {
    this.productService.getAllOrders().subscribe((response) => {
          this.orders = response;
        },
        (error) => {
          console.error('Error fetching products: ', error)
        })
  }

  pickProduct(productId: any) {
    this.router.navigate(['selectProduct', productId])
  }

  shipOrder(orderId: any) {
    this.productService.shipOrder(orderId).subscribe((response) => {
      /*if (response && response.status === 200) {
        this.openSnackBar("Order shipped", "Okay");
        location.reload();
      }*/
      location.reload();
    }, (error) => {
      /*this.openSnackBar("Error occurred", "Okay");*/
      location.reload();
    })
  }

  private openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 3000,
    });
  }

  toggleCheck() {
    if(this.orders.shipped) {
      this.checkColor = 'green-check';
    } else {
      this.checkColor = 'red-cross';
    }
  }
}
