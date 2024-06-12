import { TestBed } from '@angular/core/testing';

import { AdminGuardsService } from './admin.guards.service';

describe('AdminGuardsService', () => {
  let service: AdminGuardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGuardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});