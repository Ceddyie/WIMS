import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ProductSelectionComponent} from "../product-selection/product-selection.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-product-selection-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './product-selection-dialog.component.html',
  styleUrl: './product-selection-dialog.component.css'
})
export class ProductSelectionDialogComponent {
  constructor(public dialogRef: MatDialogRef<ProductSelectionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
