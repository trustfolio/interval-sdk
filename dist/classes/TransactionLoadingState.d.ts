import { BackwardCompatibleLoadingOptions, BackwardCompatibleLoadingState } from '../internalRpcSchema';
import Logger from './Logger';
export interface TransactionLoadingStateConfig {
    logger: Logger;
    send: (loadingState: BackwardCompatibleLoadingState) => Promise<void>;
}
export default class TransactionLoadingState {
    #private;
    constructor(config: TransactionLoadingStateConfig);
    get state(): {
        label?: string | undefined;
        description?: string | undefined;
        title?: string | undefined;
        itemsInQueue?: number | undefined;
        itemsCompleted?: number | undefined;
    };
    /**
     * Kicks off a loading spinner to provide context during any long-running action work. Can also be called with a single string argument as the label, or with no arguments to display only a spinner.
     *
     * **Usage:**
     *
     *```typescript
     * await ctx.loading.start({
     *   label: "Reticulating splines...",
     * });
     *
     * await ctx.loading.start("Label only shorthand");
     *```
     */
    start(options?: string | BackwardCompatibleLoadingOptions): Promise<void>;
    /**
     * Updates any existing loading spinner initated with `ctx.loading.start` to dynamically provide new loading information to the action runner.
     *
     * **Usage:**
     *
     *```typescript
     * await ctx.loading.start({
     *   label: "Something is loading",
     *   description: "Mapping all the things",
     * });
     *
     * await ctx.loading.update({
     *   label: "Something is loading",
     *   description: "Now reducing all the things",
     * });
     *```
     */
    update(options?: string | BackwardCompatibleLoadingOptions): Promise<void>;
    /**
     * Marks a chunk of work as completed to dynamically provide granular loading progress. Can only be used after `ctx.loading.start` was called with `itemsInQueue`.
     *
     * **Usage:**
     *
     *```typescript
     * await ctx.loading.start({
     *   label: "Migrating users",
     *   description: "Enabling edit button for selected users",
     *   itemsInQueue: 100,
     * });
     *
     * for (const user of users) {
     *   migrateUser(user);
     *   await ctx.loading.completeOne();
     * }
     *```
     */
    completeOne(): Promise<void>;
}
