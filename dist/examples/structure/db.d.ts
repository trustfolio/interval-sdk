export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
}
export declare function getUsers(): User[];
export declare function getUser(id: string): User | null;
/**
 * Comments
 */
export interface Comment {
    id: string;
    userId: string;
    createdAt: Date;
    message: string;
}
export declare function getComments(): Comment[];
export declare function getComment(id: string): Comment | null;
/**
 * Subscriptions
 */
export interface Subscription {
    id: string;
    userId: string;
    createdAt: Date;
    plan: string;
    status: 'active' | 'canceled' | 'past_due';
}
export declare function getSubscriptions(): Subscription[];
export declare function getSubscription(id: string): Subscription | null;
