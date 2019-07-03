/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Funeral_arragementComponent } from './Funeral_arragement.component';

describe('Funeral_arragementComponent', () => {
  let component: Funeral_arragementComponent;
  let fixture: ComponentFixture<Funeral_arragementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Funeral_arragementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Funeral_arragementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
