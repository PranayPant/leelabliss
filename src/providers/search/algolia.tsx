import { ReactNode } from "react";
import { algoliasearch } from "algoliasearch";
import { InstantSearch } from "react-instantsearch";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY,
);

export function SearchProvider({ children }: { children?: ReactNode }) {
  return (
    <InstantSearch
      indexName="leelabliss-images"
      // @ts-expect-error -- types
      searchClient={searchClient}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      {children}
    </InstantSearch>
  );
}
