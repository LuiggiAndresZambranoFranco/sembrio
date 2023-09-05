import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graficos2Component } from './graficos2.component';

describe('Graficos2Component', () => {
  let component: Graficos2Component;
  let fixture: ComponentFixture<Graficos2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Graficos2Component]
    });
    fixture = TestBed.createComponent(Graficos2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
