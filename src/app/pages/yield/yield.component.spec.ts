import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YieldComponent } from './yield.component';

describe('YieldComponent', () => {
  let component: YieldComponent;
  let fixture: ComponentFixture<YieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
