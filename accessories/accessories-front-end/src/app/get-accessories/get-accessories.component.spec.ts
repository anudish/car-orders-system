import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAccessoriesComponent } from './get-accessories.component';

describe('GetAccessoriesComponent', () => {
  let component: GetAccessoriesComponent;
  let fixture: ComponentFixture<GetAccessoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAccessoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
