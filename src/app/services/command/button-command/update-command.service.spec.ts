import { TestBed } from '@angular/core/testing';

import { UpdateCommandService } from './update-command.service';

describe('UpdateCommandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateCommandService = TestBed.get(UpdateCommandService);
    expect(service).toBeTruthy();
  });
});
