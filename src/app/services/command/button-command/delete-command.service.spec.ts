import { TestBed } from '@angular/core/testing';

import { DeleteCommandService } from './delete-command.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DeleteCommandService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule ],
  }));

  it('should be created', () => {
    const service: DeleteCommandService = TestBed.get(DeleteCommandService);
    expect(service).toBeTruthy();
  });
});
