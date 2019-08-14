import { TestBed } from '@angular/core/testing';

import { ToggleCommandService } from './toggle-command.service';

describe('ToggleCommandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToggleCommandService = TestBed.get(ToggleCommandService);
    expect(service).toBeTruthy();
  });
});
