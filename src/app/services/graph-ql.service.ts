/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
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
}
