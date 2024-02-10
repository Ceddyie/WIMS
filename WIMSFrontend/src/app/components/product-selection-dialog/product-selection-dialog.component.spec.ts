import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectionDialogComponent } from './product-selection-dialog.component';

describe('ProductSelectionDialogComponent', () => {
  let component: ProductSelectionDialogComponent;
  let fixture: ComponentFixture<ProductSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSelectionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
