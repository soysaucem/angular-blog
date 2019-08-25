import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphQLService {

  constructor() { }

  async query(query: string, params: any) {
    try {
      return await API.graphql(graphqlOperation(query, params));
    } catch (err) {
      return Promise.reject(Error(`[GraphQLService] Failed to send query: ${err.errors[0].message}`));
    }
  }

  subscribeData(subscription: string, params: any): Observable<any> {
    const response = API.graphql(graphqlOperation(subscription, params));
    const subscriptionData = new BehaviorSubject<any>(null);

    response.subscribe(data => subscriptionData.next(data));

    return subscriptionData;
  }
}
