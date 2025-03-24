import Entity from "@/entities/Entity";
import { useCallback, useState } from "react";

interface EntityCreateProps {
  endpoint: string;
}

export function useEntityCreate<T extends Entity>({
  endpoint,
}: EntityCreateProps): [
  T | null,
  boolean,
  (data: Partial<T>) => Promise<T | null>,
  () => void,
] {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const create = useCallback(
    async (data: Partial<T>): Promise<T | null> => {
      setLoading(true);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const newEntity = (await response.json()) as T;
        setResult(newEntity);
        return newEntity;
      } catch (_) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [endpoint],
  );

  const reset = useCallback(() => {
    setResult(null);
  }, []);

  return [result, loading, create, reset];
}
