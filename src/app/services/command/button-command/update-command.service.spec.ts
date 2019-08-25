import { TestBed } from '@angular/core/testing';

import { UpdateCommandService } from './update-command.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('UpdateCommandService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule ],
  }));

  it('should be created', () => {
    const service: UpdateCommandService = TestBed.get(UpdateCommandService);
    expect(service).toBeTruthy();
  });
});
