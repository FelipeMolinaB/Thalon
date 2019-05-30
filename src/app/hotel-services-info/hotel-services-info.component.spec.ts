import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelServicesInfoComponent } from './hotel-services-info.component';

describe('HotelServicesInfoComponent', () => {
  let component: HotelServicesInfoComponent;
  let fixture: ComponentFixture<HotelServicesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelServicesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelServicesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
