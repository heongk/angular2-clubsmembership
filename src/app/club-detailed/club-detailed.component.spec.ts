import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetailedComponent } from './club-detailed.component';

describe('ClubDetailedComponent', () => {
  let component: ClubDetailedComponent;
  let fixture: ComponentFixture<ClubDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
