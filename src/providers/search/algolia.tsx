import { ReactNode } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch";

// @ts-expect-error -- algolia types
const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY,
);

export function SearchProvider({ children }: { children?: ReactNode }) {
  return (
    <InstantSearch indexName="leelabliss-images" searchClient={searchClient}>
      {children}
    </InstantSearch>
  );
}
