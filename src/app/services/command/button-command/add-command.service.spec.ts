import { TestBed } from '@angular/core/testing';

import { AddCommandService } from './add-command.service';

describe('AddCommandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddCommandService = TestBed.get(AddCommandService);
    expect(service).toBeTruthy();
  });
});
