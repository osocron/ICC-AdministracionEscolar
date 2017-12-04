import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Formulario911Component } from './formulario911.component';

describe('Formulario911Component', () => {
  let component: Formulario911Component;
  let fixture: ComponentFixture<Formulario911Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Formulario911Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Formulario911Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
