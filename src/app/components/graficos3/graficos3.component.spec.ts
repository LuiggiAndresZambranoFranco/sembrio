import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graficos3Component } from './graficos3.component';

describe('Graficos3Component', () => {
  let component: Graficos3Component;
  let fixture: ComponentFixture<Graficos3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Graficos3Component]
    });
    fixture = TestBed.createComponent(Graficos3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
