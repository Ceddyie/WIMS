import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {WebSocketAPI} from "../../WebSocketAPI";
import {ProductSelectionDialogComponent} from "../product-selection-dialog/product-selection-dialog.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {CommonModule, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";


@Component({
  selector: 'app-product-selection',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    CommonModule,
    MatButton,
    MatGridList,
    MatGridTile,
    RouterLink,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './product-selection.component.html',
  styleUrl: './product-selection.component.css'
})
export class ProductSelectionComponent implements OnInit, OnDestroy {
  productSelectionForm!: FormGroup;
  webSocketAPI!: WebSocketAPI;
  products: any = [];
  otherImage: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAACDCAMAAAAETlHcAAAAflBMVEX///8AAAD8/Pz5+fkEBAQKCgr09PTy8vIMDAzu7u4QEBDOzs4ZGRlWVlYXFxfs7OxqamqQkJAeHh7e3t7m5uajo6Obm5u5ublRUVGLi4t9fX1KSkrFxcWzs7MkJCReXl7V1dU/Pz9vb2+AgIBjY2M6OjozMzMqKiq0tLTAwMB+TlukAAAE40lEQVR4nO2Y53bjOAxGSZCiWtxLLMttkuzOzPu/4KLQEh058yvS7tmDGzmJTcr6AAJgMUZRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEVRlP8JAHR9hcPLSbcvO4FzX3/BeCRPfS4O5GPsByRycD9wn/vn/4IJLgQwouJJK5BAF4wY8lweNThHFk4tfxGAdcdBGDyeoypGxnNxD5qn977Ij88dBkdUHTh4hvIcWwY4gu7p/WPjovvl11AeBAycvDQS5n+S59z06cu+Q8/l7rl8LjoY+gvHWTBoz51UnQVnxwSCP3Fb/fBZ22xK1jYU4KhD0e5P4Qt5rm7aub02p3xC/ZCDCQbONuLtGV2JP3cCOdW4/c97u92ZkmYA0hjY7fQNrrlYj432xfozBiKY8o/zwzdRYsiYzbKynf7suEnKOkpHHae3NTagvsz7yl4XLB6DiCKGYt1sZhc2DV+F929bKgJhZOkMmMXmmnXq56hgti17+eTh7QyVFZlYh7+uiy1wDgC9UP3tih3I+aierDgsTA45jdrY8vEZHx6H/O58jwYsk8fSfx+ZzTzLy8SCD/QtdKUW3JLahcoWOJRLl5sYYCOrd7vK+s77+Hjv/a6Xj87fk0/Fu6iswr/ZLlk3BFit5RuohUYgK+yeWp5UqO8HH9rLRy/iVXVxiynoXuRTzkxPwY8DEDh20PsB05zVe4Hj39u1M1tM6bGDJ5iafNqnrvXk6bqTD+aVM4LcmhUxwKw/0fqCvIsCb2JWvL2SGKu59IysHmeivaRjVzgzTISsSeSvCtLDQ5RxZaG/qzLOvtjhnYpSjC4OHvynWOUmKb+jyTethHQfPmTOrJMfzIcI6+p+Qe//IufjnIEVxhxodD7TUuRMEfoFyu38L9n34rtmAByNxLxMSmSRc91xVPbtJc39WAGyBW9vRpcfcy2NH7Tg3oqlWxzeDw4WFpRf8tqIcrOMsfNI4SQxxgWgjeX8IX4OnXyAmZjU2cb2tY43jrS/cofP9xMHqsnjT7zQPAYPZ2fV9O3mOE+c62UCqxoObFmevr8MnT9flVPUfYBX8nbvPp9RdP/u1VOHRB7WVT/3tubNI68+3evQ99bSynT8yMfZ5e8HeVwcL13Jw7UkrJPcoPqO9q2B4wZkXlsP1V+2mBdh9OBxRtzfiacsxTVB0sHsisfUrOz8HMuKbNvPw9R9/XLb873yweTv3lYxJ3nar942XTvuXo07JrGFNcVXxy4sZOZt5FbqVtDljyPL7h+f42I9WfPgdd2k8yUaWH9UshymyMEes7q/n6/TMhpYVJhHWXHYPHnUKPJNHsy2wXkpq0T++njjnEz1394LGzME1xQNbnmTRiygcLv+FMtohiuWt4nUxwOQ/NzSvI/P97NXZ9J6LTGe/7oWvNrxvv21SFYDvK2id7sfHDqFzZa/g5lkp2Vi5cYKEep9a/1hVTscDnDJXtfJa1HjVv3lsN8MT6l46e/CbT+b23ZfhwmPSbD8Bd6XShSIRQ8FW07XuC1goJU5VfyQNsfzTwi8O+Qt5GTyc3FuPH6lVKajknSpC2KPy/kgS3qmrfF0kSOOz+DcNLt0IrB6OjOA/nQzDY/ALXdznJHTqDQ8+MwBXFyA5nK2MpF8RVEURVEURVEURVEURVEURVEURVEURVEURVEU5b/HP1IiI1l1zwhoAAAAAElFTkSuQmCC';
  selectedProductId!: string | null;
  productId!: string;
  amount: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private _matDialog: MatDialog, private router: Router,
              private productService: ProductService, private route: ActivatedRoute) {
    console.log("1");
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.productSelectionForm = this.formBuilder.group({
      productId: [''],
      amount: ['']
    });
    this.route.paramMap.subscribe(params => {
      this.selectedProductId = params.get('id')
    })
    this.webSocketAPI = new WebSocketAPI(new ProductSelectionComponent(this.http, this.formBuilder, this._snackBar, this._matDialog, this.router, this.productService, this.route))
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
      duration: 3000
    });
  }

  private getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response;
    },
        (error) => {
      console.error('Error fetching products: ', error)
        })
  }

  pickProduct(productId: any) {
    this.router.navigateByUrl("/selectProduct")
  }
}
