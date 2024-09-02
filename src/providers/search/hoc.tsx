import { SearchProvider } from "./algolia";

export function withSearch(Component: () => JSX.Element) {
  return () => (
    <SearchProvider>
      <Component />
    </SearchProvider>
  );
}
