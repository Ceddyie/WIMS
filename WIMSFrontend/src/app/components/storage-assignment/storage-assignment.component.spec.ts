import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageAssignmentComponent } from './storage-assignment.component';

describe('StorageAssignmentComponent', () => {
  let component: StorageAssignmentComponent;
  let fixture: ComponentFixture<StorageAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageAssignmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StorageAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
