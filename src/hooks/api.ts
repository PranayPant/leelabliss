import { useCallback, useEffect, useState } from "react";

type RequestConfig = {
  url: string | URL | Request;
  options?: RequestInit;
};

export function useFetch<T extends Record<string, string | number | boolean>>(
  requestConfig?: RequestConfig,
  isManualTrigger?: boolean,
) {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const handleFetch = useCallback(
    async (config?: RequestConfig): Promise<T | undefined> => {
      try {
        setIsLoading(true);
        const data = await (
          await fetch(
            requestConfig?.url ?? config?.url ?? "",
            requestConfig?.options ?? config?.options,
          )
        ).json();
        setData(data);
        return data;
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [requestConfig],
  );

  useEffect(() => {
    if (!isManualTrigger) {
      handleFetch();
    }
  }, [handleFetch, isManualTrigger]);

  return { isError, isLoading, data, trigger: handleFetch };
}

export const useManualFetch = <
  T extends Record<string, string | number | boolean>,
>() => useFetch<T>(undefined, true);
