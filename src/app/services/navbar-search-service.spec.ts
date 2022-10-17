import { TestBed } from '@angular/core/testing';

import { NavbarSearchService } from './navbar-search-service.service';

describe('NavbarSearchServiceService', () => {
  let service: NavbarSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
