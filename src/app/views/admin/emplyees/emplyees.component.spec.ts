import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplyeesComponent } from './emplyees.component';

describe('EmplyeesComponent', () => {
  let component: EmplyeesComponent;
  let fixture: ComponentFixture<EmplyeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmplyeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplyeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
