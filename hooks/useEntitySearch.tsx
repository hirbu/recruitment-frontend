import Entity from "@/interfaces/Entity";
import { useCallback, useState } from "react";

interface EntitySearchProps {
  endpoint: string;
  queryParam: string;
}

export function useEntitySearch<T extends Entity>({
  endpoint,
  queryParam,
}: EntitySearchProps): [
  T[],
  boolean,
  (query: string) => Promise<T[]>,
  () => void,
] {
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(
    async (query: string): Promise<T[]> => {
      if (!query) {
        setResults([]);
        return [];
      }

      setLoading(true);

      try {
        const url = new URL(endpoint, window.location.origin);
        url.search = `${queryParam}=${query}`;

        const response = await fetch(url.toString(), {
          headers: {
            Accept: "application/json",
          },
        });
        const data = (await response.json()) as T[];
        setResults(data);
        return data;
      } catch (error) {
        return [];
      } finally {
        setLoading(false);
      }
    },
    [endpoint, queryParam],
  );

  const reset = useCallback(() => {
    setResults([]);
    setLoading(false);
  }, []);

  return [results, loading, search, reset];
}
