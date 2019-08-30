import { GraphQLService } from './graph-ql.service';
import { TestBed } from '@angular/core/testing';

describe('Integration GraphQLService Test', () => {

  let service: GraphQLService;

  TestBed.configureTestingModule({});

  beforeEach(() => {
    service = TestBed.get(GraphQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
