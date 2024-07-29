import { useCallback, useEffect, useState } from "react";

export function useFetch<T>(
  url: string | URL | Request,
  options?: RequestInit,
) {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await (await fetch(url, options)).json();
      setData(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
    // Treat args as static
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { isError, isLoading, data };
}
