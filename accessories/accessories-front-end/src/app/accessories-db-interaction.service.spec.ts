import { TestBed } from '@angular/core/testing';

import { AccessoriesDbInteractionService } from './accessories-db-interaction.service';

describe('AccessoriesDbInteractionService', () => {
  let service: AccessoriesDbInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessoriesDbInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
