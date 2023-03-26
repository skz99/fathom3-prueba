import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OCSpinnerComponent } from './oc-spinner.component';

describe('OCSpinnerComponent', () => {
  let component: OCSpinnerComponent;
  let fixture: ComponentFixture<OCSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OCSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OCSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
