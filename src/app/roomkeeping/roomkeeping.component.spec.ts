import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomkeepingComponent } from './roomkeeping.component';

describe('RoomkeepingComponent', () => {
  let component: RoomkeepingComponent;
  let fixture: ComponentFixture<RoomkeepingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomkeepingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomkeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
