/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { GetPostQueryVariables, CreatePostInput } from '../../API';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class GraphQLService {

  constructor() { }

  async query(query: string, params: any) {
    try {
      return await API.graphql(graphqlOperation(query, params));
    } catch (err) {
      console.log(err.errors[0].message);
    }
  }

  // getListPosts(): Subject<any> {
  //   const response$ = API.graphql(graphqlOperation(queries.listPosts));
  //   const subject = new Subject();
  //   response$.subscribe(
  //     (response) => subject.next(response)
  //   );
  //   return subject;
  // }
}
