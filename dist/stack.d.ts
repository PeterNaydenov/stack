/**
 * @typedef {Object} StackOptions
 * @property {('FIFO'|'LIFO')}    [type='FIFO']      Stack order. `'FIFO'` (default) or `'LIFO'`. Argument is case-insensitive.
 * @property {number|false}       [limit=false]      Maximum number of items. `false` (default) means no limit.
 * @property {('full'|'update')}  [onLimit='update'] Behaviour when the limit is reached:
 *                                                     - `'full'`:   stop accepting new values once the stack is full.
 *                                                     - `'update'`: drop the oldest items to make room; the evicted items are returned from `push`.
 */
export type StackOptions = {
    /**
     * Stack order. `'FIFO'` (default) or `'LIFO'`. Argument is case-insensitive.
     */
    type?: ('FIFO' | 'LIFO');
    /**
     * Maximum number of items. `false` (default) means no limit.
     */
    limit?: number | false;
    /**
     * Behaviour when the limit is reached:
     *    - `'full'`:   stop accepting new values once the stack is full.
     *    - `'update'`: drop the oldest items to make room; the evicted items are returned from `push`.
     */
    onLimit?: ('full' | 'update');
};
export type Stack = {
    /**
     *   Insert data into the stack. Accepts a single value or an array of values.
     *   - With `onLimit: 'update'`: returns the evicted items (a single value if one was evicted, an array if several, or `[]` if no eviction was needed).
     *   - With `onLimit: 'full'`:   returns `undefined` when the input would overflow the limit.
     *   - Otherwise:                returns `undefined`.
     */
    push: (vals: any | any[]) => any | any[] | undefined;
    /**
     *   Remove and return data from the stack.
     *   - `n = 1` (default): returns a single value, or `undefined` if the stack is empty.
     *   - `n > 1`:          returns an array of up to `n` values in pull order.
     *   - `skip` items are removed first and discarded.
     */
    pull: (n?: number, skip?: number) => any | any[];
    /**
     *   Same as `pull`, but the returned array is reversed.
     */
    pullReverse: (n?: number, skip?: number) => any | any[];
    /**
     *   Return the next value(s) without removing them. Does not modify the stack.
     *   - `n = 1` (default): returns a single value, or `undefined` if the stack is empty.
     *   - `n > 1`:          returns an array of up to `n` values in pull order.
     *   - `skip` walks past elements without returning them.
     */
    peek: (n?: number, skip?: number) => any | any[];
    /**
     *   Same as `peek`, but the returned array is reversed.
     */
    peekReverse: (n?: number, skip?: number) => any | any[];
    /**
     * Returns the current size of the stack.
     */
    getSize: () => number;
    /**
     * Returns `true` if the stack is empty.
     */
    isEmpty: () => boolean;
    /**
     * Empties the stack. Always returns `true`.
     */
    reset: () => true;
    /**
     * Returns a shallow copy of the stack contents.
     */
    debug: () => any[];
};
/**
 * @typedef {Object} Stack
 * @property {(vals: any|any[]) => any|any[]|undefined} push
 *   Insert data into the stack. Accepts a single value or an array of values.
 *   - With `onLimit: 'update'`: returns the evicted items (a single value if one was evicted, an array if several, or `[]` if no eviction was needed).
 *   - With `onLimit: 'full'`:   returns `undefined` when the input would overflow the limit.
 *   - Otherwise:                returns `undefined`.
 * @property {(n?: number, skip?: number) => any|any[]} pull
 *   Remove and return data from the stack.
 *   - `n = 1` (default): returns a single value, or `undefined` if the stack is empty.
 *   - `n > 1`:          returns an array of up to `n` values in pull order.
 *   - `skip` items are removed first and discarded.
 * @property {(n?: number, skip?: number) => any|any[]} pullReverse
 *   Same as `pull`, but the returned array is reversed.
 * @property {(n?: number, skip?: number) => any|any[]} peek
 *   Return the next value(s) without removing them. Does not modify the stack.
 *   - `n = 1` (default): returns a single value, or `undefined` if the stack is empty.
 *   - `n > 1`:          returns an array of up to `n` values in pull order.
 *   - `skip` walks past elements without returning them.
 * @property {(n?: number, skip?: number) => any|any[]} peekReverse
 *   Same as `peek`, but the returned array is reversed.
 * @property {() => number}   getSize   Returns the current size of the stack.
 * @property {() => boolean}  isEmpty   Returns `true` if the stack is empty.
 * @property {() => true}     reset     Empties the stack. Always returns `true`.
 * @property {() => any[]}    debug     Returns a shallow copy of the stack contents.
 */
/**
 * Create a FIFO or LIFO stack with an optional size limit.
 *
 * @param {StackOptions} [inOptions]
 * @returns {Stack}
 */
declare function stack(inOptions?: StackOptions): Stack;
export default stack;
