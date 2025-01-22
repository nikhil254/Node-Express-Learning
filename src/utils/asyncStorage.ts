import { AsyncLocalStorage } from 'async_hooks';

// Create a reusable AsyncLocalStorage instance for managing context.
export const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();