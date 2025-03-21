import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchwisePriceComponent } from './batchwise-price.component';

describe('BatchwisePriceComponent', () => {
  let component: BatchwisePriceComponent;
  let fixture: ComponentFixture<BatchwisePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchwisePriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchwisePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
