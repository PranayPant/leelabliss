import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";

export function useFetch<T extends Record<string, string | number | boolean>[]>(
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
      setData(
        data.map((item: Record<string, string>) => ({ ...item, id: nanoid() })),
      );
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

  return { isError, isLoading, data, refetch: handleFetch };
}
