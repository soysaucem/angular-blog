import { ID } from '@datorama/akita';

export interface Comment {
  postId: ID;
  id: ID;
  email: string;
  body: string;
}
