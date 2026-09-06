import { NextResponse } from 'next/server';

/** Every protected response, including authentication errors, bypasses caches. */
export const privateResponse = {
  json(body: unknown, init: ResponseInit = {}) {
    const headers = new Headers(init.headers);
    headers.set('Cache-Control', 'no-store');
    return NextResponse.json(body, { ...init, headers });
  },
};
