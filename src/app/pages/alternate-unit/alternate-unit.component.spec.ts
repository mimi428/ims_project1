import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateUnitComponent } from './alternate-unit.component';

describe('AlternateUnitComponent', () => {
  let component: AlternateUnitComponent;
  let fixture: ComponentFixture<AlternateUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlternateUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlternateUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
