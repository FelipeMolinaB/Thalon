import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSideNavbarContentComponent } from './user-side-navbar-content.component';

describe('UserSideNavbarContentComponent', () => {
  let component: UserSideNavbarContentComponent;
  let fixture: ComponentFixture<UserSideNavbarContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSideNavbarContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSideNavbarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
