import { GraphQLService } from './graph-ql.service';
import { TestBed } from '@angular/core/testing';
import { CreatePostInput, DeletePostInput, CreateCommentInput, DeleteCommentInput, UpdateCommentInput } from '../../API';
import { guid } from '@datorama/akita';
import { createPost, deletePost, createComment, deleteComment, updateComment } from 'src/graphql/mutations';
import { configureTestSuite } from 'ng-bullet';
import { onCreatePost } from 'src/graphql/subscriptions';

describe('Integration GraphQLService Test', () => {

  let service: GraphQLService;
  let createPostInput: CreatePostInput;
  let createCommentInput: CreateCommentInput;

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

    createCommentInput = {
      id: guid(),
      postId: guid(),
      email: 'test@gmail.com',
      body: 'Test comment'
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create and delete post', done => {
    let deletePostInput: DeletePostInput;

    service.query(createPost, { input: createPostInput }).then(
      (response) => {
        deletePostInput = { id: response.data.createPost.id };
        expect(response.data.createPost).toEqual(createPostInput);
        return service.query(deletePost, { input: deletePostInput });
      }
    ).then(
      (response) => {
        const responseId: DeletePostInput = { id: response.data.deletePost.id };
        expect(responseId).toEqual(deletePostInput);
        done();
      }
    ).catch(error => {
      fail(error);
      done();
    });
  });

  it('should create, update and delete comment', done => {
    let deleteCommentInput: DeleteCommentInput;
    let updateCommentInput: UpdateCommentInput;

    service.query(createComment, { input: createCommentInput }).then(
      (response) => {
        deleteCommentInput = { id: response.data.createComment.id };
        updateCommentInput = {
          id: response.data.createComment.id,
          postId: response.data.createComment.postId,
          email: response.data.createComment.email,
          body: 'Update comment content'
        };
        expect(response.data.createComment).toEqual(createCommentInput);
        return service.query(updateComment, { input: updateCommentInput });
      }
    ).then(
      (response) => {
        expect(response.data.updateComment.body).toEqual('Update comment content');
        return service.query(deleteComment, { input: deleteCommentInput});
      }
    ).then(
      (response) => {
        expect(response.data.deleteComment.id).toEqual(deleteCommentInput.id);
        done();
      }
    ).catch(
      (error) => {
        fail(error);
        done();
      }
    );
  });

  it('should subscribe to any changes of data from server', done => {
    let deletePostInput: DeletePostInput;

    service.subscribeData(onCreatePost, null).subscribe(
      (incomingData) => {
        if (incomingData !== null) {
          const post = incomingData.value.data.onCreatePost;
          expect(post.id).toEqual(createPostInput.id);
          done();
        }
      }, error => {
        fail(error);
        done();
      }
    );

    setTimeout(() => {
      service.query(createPost, { input: createPostInput }).then(
        (response) => {
          deletePostInput = { id: response.data.createPost.id };
          return service.query(deletePost, { input: deletePostInput });
        }
      ).catch(error => {
        fail(error);
        done();
      });
    }, 4000);
  }, 10000);
});
