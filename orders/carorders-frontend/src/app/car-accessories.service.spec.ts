import { TestBed } from '@angular/core/testing';

import { CarAccessoriesService } from './car-accessories.service';

describe('CarAccessoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarAccessoriesService = TestBed.get(CarAccessoriesService);
    expect(service).toBeTruthy();
  });
});
