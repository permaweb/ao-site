import { persistentAtom } from '@nanostores/persistent';

export const $myFlps = persistentAtom<string[]>('my-flps', [], {
	encode: JSON.stringify,
	decode: JSON.parse,
});
