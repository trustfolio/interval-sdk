import Logger from './Logger';
import Interval, { IntervalActionDefinition, Page, QueuedAction } from '..';
import { Ctx } from 'evt';
/**
 * This is effectively a namespace inside of Interval with a little bit of its own state.
 */
export default class Routes {
    #private;
    protected interval: Interval;
    constructor(interval: Interval, endpoint: string, logger: Logger, ctx: Ctx<void>, apiKey?: string);
    /**
     * @deprecated Use `interval.enqueue()` instead.
     */
    enqueue(slug: string, args?: Pick<QueuedAction, 'assignee' | 'params'>): Promise<QueuedAction>;
    /**
     * @deprecated Use `interval.dequeue()` instead.
     */
    dequeue(id: string): Promise<QueuedAction>;
    add(slug: string, route: IntervalActionDefinition | Page): void;
    remove(slug: string): void;
}
