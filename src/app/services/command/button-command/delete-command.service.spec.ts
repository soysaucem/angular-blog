import { TestBed } from '@angular/core/testing';

import { DeleteCommandService } from './delete-command.service';

describe('DeleteCommandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteCommandService = TestBed.get(DeleteCommandService);
    expect(service).toBeTruthy();
  });
});
