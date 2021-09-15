import { User } from './User.models';

export class Like {
    like: number | boolean;
    User: User;
    userId: number;
}