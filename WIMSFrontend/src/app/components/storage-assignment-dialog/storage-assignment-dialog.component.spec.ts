import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageAssignmentDialogComponent } from './storage-assignment-dialog.component';

describe('StorageAssignmentDialogComponent', () => {
  let component: StorageAssignmentDialogComponent;
  let fixture: ComponentFixture<StorageAssignmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageAssignmentDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StorageAssignmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
