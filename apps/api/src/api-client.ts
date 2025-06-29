import { hc } from 'hono/client';
import type { Router } from './routes';

// create instance to inline type in build
// https://hono.dev/docs/guides/rpc#compile-your-code-before-using-it-recommended
// eslint-disable-next-line unused-imports/no-unused-vars
const client = hc<Router>('');
export type Client = typeof client;

export default (...args: Parameters<typeof hc>): Client => hc<Router>(...args);
