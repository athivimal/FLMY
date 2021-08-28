import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DoveSnackbarComponent } from './dove-snackbar.component';

describe('DoveSnackbarComponent', () => {
  let component: DoveSnackbarComponent;
  let fixture: ComponentFixture<DoveSnackbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoveSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoveSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
