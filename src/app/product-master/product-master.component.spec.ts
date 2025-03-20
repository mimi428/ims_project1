import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMasterComponent } from './product-master.component';

describe('ProductMasterComponent', () => {
  let component: ProductMasterComponent;
  let fixture: ComponentFixture<ProductMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
