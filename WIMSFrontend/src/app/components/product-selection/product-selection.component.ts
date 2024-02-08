import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {Subject, takeUntil} from "rxjs";
import {RxStompService} from "@stomp/ng2-stompjs";
import {Message} from "@stomp/stompjs";

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
  messages!: string[];
  private destroy$ = new Subject();
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private _matDialog: MatDialog, private rxStompService: RxStompService) {
    console.log("1");
  }

  ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.unsubscribe();
    }

  ngOnInit(): void {
    this.productSelectionForm = this.formBuilder.group({
      productId: [''],
      amount: ['']
    });
    this.messages = [];
    this.rxStompService.watch('/topic/productSelection').pipe(takeUntil(this.destroy$))
        .subscribe((message: Message) => {
          console.log('Received from websocket: ' + message.body);
          this.messages.push(message.body);
          this.messages = this.messages.slice(-5);
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
      panelClass: ['snackBar'],
      duration: 3000
    });
  }

  private openDialog(message: string): void {
    this._matDialog.open(ProductSelectionComponent, {
      data: { message },
    });
  }
}
