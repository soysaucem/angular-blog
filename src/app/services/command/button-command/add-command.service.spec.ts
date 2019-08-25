import { TestBed } from '@angular/core/testing';

import { AddCommandService } from './add-command.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddCommandService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule ]
  }));

  it('should be created', () => {
    const service: AddCommandService = TestBed.get(AddCommandService);
    expect(service).toBeTruthy();
  });
});
