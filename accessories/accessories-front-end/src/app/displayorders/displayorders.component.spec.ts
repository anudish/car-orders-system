import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayordersComponent } from './displayorders.component';

describe('DisplayordersComponent', () => {
  let component: DisplayordersComponent;
  let fixture: ComponentFixture<DisplayordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
