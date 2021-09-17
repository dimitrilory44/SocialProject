import { User } from './User.models';

export class Like {
    like: number | boolean;
    isLike: boolean;
    User: User;
    userId: number;
}