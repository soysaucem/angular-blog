import { GraphQLService } from './graph-ql.service';
import { TestBed } from '@angular/core/testing';
import { CreatePostInput, DeletePostInput } from '../../API';
import { guid } from '@datorama/akita';
import { createPost, deletePost } from 'src/graphql/mutations';
import { configureTestSuite } from 'ng-bullet';

describe('Integration GraphQLService Test', () => {

  let service: GraphQLService;
  let createPostInput: CreatePostInput;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [ GraphQLService ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(GraphQLService);

    createPostInput = {
      id: guid(),
      title: 'Test post',
      body: 'Test content'
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create and delete post', done => {
    let deletePostInput: DeletePostInput;

    service.query(createPost, { input: createPostInput }).then(
      (response) => {
        console.log(response);
        deletePostInput = { id: response.data.createPost.id };
        expect(response.data.createPost).toEqual(createPostInput);
        return service.query(deletePost, { deletePostInput });
      }
    ).then(
      (response) => {
        expect(response.data.deletePost).toEqual(deletePostInput);
        done();
      }
    ).catch(error => { fail(error); done(); });
  });
});
