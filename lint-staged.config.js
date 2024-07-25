export default {
  "*": ["prettier --ignore-unknown --write"],
  "*.{ts,tsx}": () => ["eslint --fix", "pnpm tsc --noEmit -p ./tsconfig.json"],
};
