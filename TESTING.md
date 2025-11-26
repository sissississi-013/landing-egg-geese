# Testing and linting

## Why `npm run lint` failed before
With Next.js 16, the `next` CLI no longer ships a `lint` subcommand. When the script attempted to run `next lint`, the CLI treated `lint` as a directory argument and crashed with the message:

```
Invalid project directory provided, no such directory: /workspace/landing-egg-geese/lint
```

## How linting works now
The `lint` script now runs a TypeScript type check instead:

```
npm run lint
```

If you want ESLint-based linting, install the dependencies in an environment with registry access and run `eslint . --ext .ts,.tsx`.
