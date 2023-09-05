import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumedadsComponent } from './humedads.component';

describe('HumedadsComponent', () => {
  let component: HumedadsComponent;
  let fixture: ComponentFixture<HumedadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HumedadsComponent]
    });
    fixture = TestBed.createComponent(HumedadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
