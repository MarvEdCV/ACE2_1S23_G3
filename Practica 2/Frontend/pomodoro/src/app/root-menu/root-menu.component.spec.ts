import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootMenuComponent } from './root-menu.component';

describe('RootMenuComponent', () => {
  let component: RootMenuComponent;
  let fixture: ComponentFixture<RootMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
