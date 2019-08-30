import { TestBed } from '@angular/core/testing';

import { GraphQLService } from './graph-ql.service';
import { configureTestSuite } from 'ng-bullet';
import { API } from 'aws-amplify';

describe('GraphQlService', () => {
  let service: GraphQLService;
  let serviceSpy: jasmine.Spy;

  configureTestSuite(() => {
    TestBed.configureTestingModule({ providers: [GraphQLService] });
  });

  beforeEach(() => {
    service = TestBed.get(GraphQLService);
    serviceSpy = spyOn(API, 'graphql');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query()', () => {
    const query = 'query';
    const params = { foo: 'bar' };

    it('should create and send query with params', () => {
      const response = service.query(query, params);
      expect(service.query).toHaveBeenCalled();
      expect(response).toBeDefined();
    });

    it('should return the response matching with query', (done: DoneFn) => {
      const testValue = { foo: 'bar' };
      serviceSpy.and.returnValue(Promise.resolve(testValue));
      service.query(query, params).then(value => {
        expect(value).toEqual(testValue);
        done();
      });
    });
  });

  // describe('subscribeData()', () => {
  //   it('', () => {

  //   });
  // });
});
