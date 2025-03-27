import { Evt } from 'evt';
import { AccessControlDefinition } from '../internalRpcSchema';
import { IntervalActionDefinition, IntervalPageHandler, IntervalRouteDefinitions } from '../types';
export interface PageConfig {
    name: string;
    description?: string;
    unlisted?: boolean;
    actions?: Record<string, IntervalActionDefinition>;
    groups?: Record<string, Page>;
    routes?: IntervalRouteDefinitions;
    handler?: IntervalPageHandler;
    access?: AccessControlDefinition;
}
export default class Page {
    #private;
    name: string;
    description?: string;
    unlisted?: boolean;
    routes: IntervalRouteDefinitions;
    handler?: IntervalPageHandler;
    access?: AccessControlDefinition;
    onChange: Evt<void>;
    constructor(config: PageConfig);
    add(slug: string, route: IntervalActionDefinition | Page): void;
    remove(slug: string): void;
}
