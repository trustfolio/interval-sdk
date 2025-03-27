import { AccessControlDefinition } from '../internalRpcSchema';
import { ExplicitIntervalActionDefinition, IntervalActionDefinition, IntervalActionHandler } from '../types';
export default class Action implements ExplicitIntervalActionDefinition {
    handler: IntervalActionHandler;
    backgroundable?: boolean;
    unlisted?: boolean;
    warnOnClose?: boolean;
    name?: string;
    description?: string;
    access?: AccessControlDefinition;
    constructor(def: ExplicitIntervalActionDefinition | IntervalActionDefinition);
}
