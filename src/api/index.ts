import { HB } from 'helpers/config';

export async function readProcess(args: any) {
  const node = args.node?.url ?? HB.defaultNode;
  let url = `${node}/${args.processId}~process@1.0/${args.hydrate ? 'now' : 'compute'}`;
  if (args.path && args.appendPath) url += `/${args.path}`;

  try {
    const headers: HeadersInit = {};

    headers['require-codec'] = 'application/json';
    headers['accept-bundle'] = 'true';

    const res = await fetch(url, { headers });
    if (res.ok) {
      const parsed = await res.json();

      if (args.path && !args.appendPath) {
        try {
          return JSON.parse(parsed[args.path]);
        } catch {
          return parsed[args.path];
        }
      }

      return parsed['body'] ?? parsed;
    }

    throw new Error('Error getting state from HyperBEAM.');
  } catch (e: any) {
    throw new Error(e);
  }
}
