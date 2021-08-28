import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GraphDashboardComponent } from './graph-dashboard.component';

describe('GraphDashboardComponent', () => {
  let component: GraphDashboardComponent;
  let fixture: ComponentFixture<GraphDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
