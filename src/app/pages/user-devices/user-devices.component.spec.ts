import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserDevicesComponent } from './user-devices.component';

describe('UserDevicesComponent', () => {
  let component: UserDevicesComponent;
  let fixture: ComponentFixture<UserDevicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
