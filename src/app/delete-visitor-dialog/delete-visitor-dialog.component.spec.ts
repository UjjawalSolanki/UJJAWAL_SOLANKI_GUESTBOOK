import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVisitorDialogComponent } from './delete-visitor-dialog.component';

describe('DeleteVisitorDialogComponent', () => {
  let component: DeleteVisitorDialogComponent;
  let fixture: ComponentFixture<DeleteVisitorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteVisitorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteVisitorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
