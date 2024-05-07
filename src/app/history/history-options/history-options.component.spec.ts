import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOptionsComponent } from './history-options.component';

describe('HistoryOptionsComponent', () => {
  let component: HistoryOptionsComponent;
  let fixture: ComponentFixture<HistoryOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
