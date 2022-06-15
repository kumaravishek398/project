import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoantrackingComponent } from './loantracking.component';

describe('LoantrackingComponent', () => {
  let component: LoantrackingComponent;
  let fixture: ComponentFixture<LoantrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoantrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoantrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
