import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresOptionsComponent } from './scores-options.component';

describe('ScoresOptionsComponent', () => {
  let component: ScoresOptionsComponent;
  let fixture: ComponentFixture<ScoresOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoresOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScoresOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
