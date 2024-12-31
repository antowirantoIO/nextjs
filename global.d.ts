import type { IncomingMessage, ServerResponse } from 'http';

declare global {
    let req: IncomingMessage | undefined;
    let res: ServerResponse | undefined;
}

export {};
