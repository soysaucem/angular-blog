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
      const result = await API.graphql(graphqlOperation(query, params));
      return result;
    } catch (err) {
      if (err.errors && err.errors.length > 0) {
        const message = err.errors[0].message;
        return Promise.reject(Error(`[GraphQLService] Failed to send query: ${message}`));
      }

      return Promise.reject(err);
    }
  }

  subscribeData(subscription: string, params: any): Observable<any> {
    const response = API.graphql(graphqlOperation(subscription, params));
    const subscriptionData = new BehaviorSubject<any>(null);

    response.subscribe(data => subscriptionData.next(data));

    return subscriptionData;
  }
}
