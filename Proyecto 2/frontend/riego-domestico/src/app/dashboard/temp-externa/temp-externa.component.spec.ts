import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempExternaComponent } from './temp-externa.component';

describe('TempExternaComponent', () => {
  let component: TempExternaComponent;
  let fixture: ComponentFixture<TempExternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempExternaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
