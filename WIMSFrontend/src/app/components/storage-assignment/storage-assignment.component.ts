import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatDialog} from "@angular/material/dialog";
import {ProductSelectionDialogComponent} from "../product-selection-dialog/product-selection-dialog.component";
import {StorageAssignmentDialogComponent} from "../storage-assignment-dialog/storage-assignment-dialog.component";
import {WsSaAPI} from "../../WsSaAPI";

@Component({
  selector: 'app-storage-assignment',
  standalone: true,
    imports: [
        FormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './storage-assignment.component.html',
  styleUrl: './storage-assignment.component.css'
})
export class StorageAssignmentComponent implements OnInit, OnDestroy {
    storageAssignmentForm!: FormGroup;
    webSocketApi!: WsSaAPI;
    selectedProductId!: any;
    amount: any;
    productId!: string;

    constructor(private http: HttpClient, private formBuilder: FormBuilder, private matSnackBar: MatSnackBar, private matDialog: MatDialog, private route: ActivatedRoute) {
    }

    ngOnDestroy(): void {
        this.webSocketApi._disconnect();
    }

    ngOnInit() {
        this.storageAssignmentForm = this.formBuilder.group({
            productId: [''],
            amount: ['']
        });
        this.route.paramMap.subscribe(params => {
            this.selectedProductId = params.get('id');
        })
        this.webSocketApi = new WsSaAPI(new StorageAssignmentComponent(this.http, this.formBuilder, this.matSnackBar, this.matDialog, this.route));
        this.connect();
    }

    onSubmit() {
        const productId = this.storageAssignmentForm.get('productId')?.value;
        const amount = this.storageAssignmentForm.get('amount')?.value;

        this.http.post('http://localhost:8080/warehouse/assignStorage', {productId, amount}, {observe: "response"}).subscribe(
            response => {
                console.log(response.body);
                if (response.ok) {
                    this.openSnackBar("Request sent", "Okay");
                    this.storageAssignmentForm.reset();
                }
            },
            error => {
                console.log('Error', error.message)
            }
        )
    }

    private openSnackBar(message: string, action: string) {
        this.matSnackBar.open(message, action, {
            duration: 3000
        });
    }

    openDialog(message: any) {
        const dialogRef = this.matDialog.open(StorageAssignmentDialogComponent, {
            width: '250px',
            data: message
        });
    }

    connect() {
        this.webSocketApi._connect();
    }
}
