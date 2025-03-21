import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryControlComponent } from './inventory-control.component';

describe('InventoryControlComponent', () => {
  let component: InventoryControlComponent;
  let fixture: ComponentFixture<InventoryControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
