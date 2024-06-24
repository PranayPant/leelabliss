export default {
  "*": ["prettier --ignore-unknown --write"],
  "*.{ts,tsx}": ["eslint --fix", "pnpm node_modules/typescript/bin/tsc --noEmit --skipLibCheck"],
};
